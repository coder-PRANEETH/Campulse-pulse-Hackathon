from fastapi import FastAPI
from pydantic import BaseModel
import json
import numpy as np
import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.ensemble import RandomForestClassifier

# ------------------------------------------------
# Define FastAPI app
# ------------------------------------------------
app = FastAPI(title="Student Club Recommendation API")

# ------------------------------------------------
# Load and train model on startup
# ------------------------------------------------
with open("student.json", "r") as f:
    data = json.load(f)

students = []
for sid, info in data.items():
    avg_marks = np.mean([np.mean(list(cia.values())) for cia in info["marks"].values()])
    student_entry = {
        "cgpa": info["cgpa"],
        "avg_marks": avg_marks,
        "attendance": float(info["attendance"].strip("%")),
        "events_attended": info["events_attended"],
        "interests": info["interests"],
        "clubs": info["clubs"]
    }
    students.append(student_entry)

df = pd.DataFrame(students)

# ---------- Feature encoding ----------
mlb_events = MultiLabelBinarizer()
events_encoded = mlb_events.fit_transform(df["events_attended"])

mlb_interests = MultiLabelBinarizer()
interests_encoded = mlb_interests.fit_transform(df["interests"])

X = pd.concat([
    df[["cgpa", "avg_marks", "attendance"]].reset_index(drop=True),
    pd.DataFrame(events_encoded, columns=mlb_events.classes_),
    pd.DataFrame(interests_encoded, columns=mlb_interests.classes_)
], axis=1)

mlb_clubs = MultiLabelBinarizer()
y = mlb_clubs.fit_transform(df["clubs"])

model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X, y)

# ------------------------------------------------
# Request Model
# ------------------------------------------------
class StudentInput(BaseModel):
    marks: dict
    cgpa: float
    attendance: str
    events_attended: list[str]
    interests: list[str]

# ------------------------------------------------
# Prediction Function
# ------------------------------------------------
def recommend_club(student_input: StudentInput):
    avg_marks = np.mean([np.mean(list(cia.values())) for cia in student_input.marks.values()])
    features = {
        "cgpa": student_input.cgpa,
        "avg_marks": avg_marks,
        "attendance": float(student_input.attendance.strip("%")),
    }

    event_vector = [1 if e in student_input.events_attended else 0 for e in mlb_events.classes_]
    interest_vector = [1 if i in student_input.interests else 0 for i in mlb_interests.classes_]

    feature_vector = np.array([list(features.values()) + event_vector + interest_vector])
    prediction = model.predict(feature_vector)
    recommended_clubs = mlb_clubs.inverse_transform(prediction)[0]
    return recommended_clubs

# ------------------------------------------------
# API Route
# ------------------------------------------------
@app.post("/recommend")
def recommend_api(student: StudentInput):
    rec_clubs = recommend_club(student)
    return {"recommended_clubs": rec_clubs}

# ------------------------------------------------
# Root endpoint
# ------------------------------------------------
@app.get("/")
def home():
    return {"message": "Welcome to the Student Club Recommendation API!"}
