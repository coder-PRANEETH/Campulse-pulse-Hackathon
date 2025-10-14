# faq_bot_api.py
from fastapi import FastAPI
from pydantic import BaseModel
import json
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

# ---------- Configuration ----------
FAQ_FILE = "sastra_faqs.json"
STUDENT_FILE = "student.json"
MODEL_NAME = "all-MiniLM-L6-v2"
TOP_K = 3
BUILDINGS = ["vkj", "some", "soc", "sac", "vv", "jvc", "gurunath"]
STUDENT_QUERIES = {
    "mark": "marks",
    "marks": "marks",
    "attendance": "attendance",
    "cgpa": "cgpa",
    "clubs": "clubs",
    "phone": "phone",
    "course": "course",
    "registration": "reg_no",
    "reg no": "reg_no"
}

# ---------- Load FAQs ----------
with open(FAQ_FILE, "r", encoding="utf-8") as f:
    faqs = json.load(f)

questions = [f["question"] for f in faqs]
answers = [f["answer"] for f in faqs]

# ---------- Load student data ----------
with open(STUDENT_FILE, "r", encoding="utf-8") as f:
    students = json.load(f)

# ---------- Load embedding model ----------
print("Loading embedding model...")
model = SentenceTransformer(MODEL_NAME)

# ---------- Encode FAQ questions ----------
print("Encoding FAQ questions...")
faq_embeddings = model.encode(questions, convert_to_numpy=True, normalize_embeddings=True).astype("float32")

# ---------- Build FAISS index ----------
dim = faq_embeddings.shape[1]
index = faiss.IndexFlatIP(dim)
index.add(faq_embeddings)
print(f"FAISS index built with {index.ntotal} questions.")

# ---------- FastAPI setup ----------
app = FastAPI(title="SASTRA Student FAQ Chatbot")

class QueryRequest(BaseModel):
    query: str
    reg_no: str = None  # optional

@app.post("/ask")
def ask_bot(request: QueryRequest):
    query = request.query.strip()
    reg_no = request.reg_no
    student_data = students.get(reg_no) if reg_no else 1001

    q_lower = query.lower()

    # --- Building queries ---
    if any(word in q_lower for word in ["where", "located"]):
     matched_building = next((b for b in BUILDINGS if b.lower() in q_lower), None)
     if matched_building:
        return {
            "query": query,
            "answer": f"{matched_building.upper()} ",
            "score": 1.0
        }


    # --- Student queries only if 'my' is present ---
    if student_data and "my" in q_lower:
     for key, field in STUDENT_QUERIES.items():
        if key in q_lower:
            value = student_data.get(field)

            # Handle marks dictionary
            if field == "marks" and isinstance(value, dict):
                marks_str = "\n".join(
                    f"{exam}: " + ", ".join(f"{sub}: {score}" for sub, score in subjects.items())
                    for exam, subjects in value.items()
                )
                return {
                    "query": query,
                    "answer": f"📊 Your marks:\n{marks_str}",
                    "score": 1.0
                }

            # Handle attendance and other fields gracefully
            elif value is not None:
                return {
                    "query": query,
                    "answer": f"📘 Your {field}: {value}",
                    "score": 1.0
                }

    # --- Fallback to ML FAQ retrieval ---
    q_emb = model.encode([query], convert_to_numpy=True, normalize_embeddings=True).astype("float32")
    D, I = index.search(q_emb, TOP_K)
    results = []
    for score, idx in zip(D[0], I[0]):
        if idx < 0 or idx >= len(questions):
            continue
        results.append({"question": questions[idx], "answer": answers[idx], "score": float(score)})
    
    if results:
        return results[0]  # return best match
    else:
        return {"query": query, "answer": "Sorry, I couldn't find a matching answer.", "score": 0.0}
