from fastapi import FastAPI
from pydantic import BaseModel
import json
import numpy as np
import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.ensemble import RandomForestClassifier
from fastapi.middleware.cors import CORSMiddleware

# ------------------------------------------------
# Define FastAPI app with CORS
# ------------------------------------------------
app = FastAPI(title="Student Club Recommendation API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------
# Available clubs
# ------------------------------------------------
AVAILABLE_CLUBS = [
    "ACE", "Computo", "RoboNix", "EcoVision", "Aarohi", 
    "LitSoc", "Dramatics", "Pixel", "IEEE", "IET", 
    "E-Cell", "NSS", "NCC", "Shutterbugs", "FinSights", 
    "GDSC", "AI Nexus", "AstroClub", "GameHub", "Rhythm"
]

# ------------------------------------------------
# Load and train model
# ------------------------------------------------
print("🚀 Loading student data and training model...")

try:
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
    print(f"✅ Loaded {len(df)} students")

    # Feature encoding
    mlb_events = MultiLabelBinarizer()
    events_encoded = mlb_events.fit_transform(df["events_attended"])

    mlb_interests = MultiLabelBinarizer()
    interests_encoded = mlb_interests.fit_transform(df["interests"])

    # Create feature matrix
    X_numeric = df[["cgpa", "avg_marks", "attendance"]].reset_index(drop=True)
    X_events = pd.DataFrame(events_encoded, columns=[f"event_{e}" for e in mlb_events.classes_])
    X_interests = pd.DataFrame(interests_encoded, columns=[f"interest_{i}" for i in mlb_interests.classes_])
    
    X = pd.concat([X_numeric, X_events, X_interests], axis=1)
    print(f"📊 Feature matrix shape: {X.shape}")
    print(f"📋 Features: {list(X.columns)}")

    # Prepare target (clubs)
    mlb_clubs = MultiLabelBinarizer()
    y = mlb_clubs.fit_transform(df["clubs"])
    print(f"🎯 Target clubs: {mlb_clubs.classes_}")
    print(f"🎯 Target matrix shape: {y.shape}")

    # Train model
    model = RandomForestClassifier(n_estimators=100, random_state=42, min_samples_split=2)
    model.fit(X, y)
    print("🤖 ML model trained successfully!")

except Exception as e:
    print(f"❌ Error during model training: {e}")
    model = None
    mlb_events = None
    mlb_interests = None
    mlb_clubs = None
    X = None

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
# Enhanced Prediction Function
# ------------------------------------------------
def recommend_club_ml(student_input: StudentInput):
    """ML-based recommendation with detailed debugging"""
    if model is None:
        print("🤖 ML model not available, using fallback")
        return []
    
    try:
        print(f"🎯 Processing student: {student_input.interests}, {student_input.events_attended}")
        
        # Calculate features
        avg_marks = np.mean([np.mean(list(cia.values())) for cia in student_input.marks.values()])
        features = {
            "cgpa": student_input.cgpa,
            "avg_marks": avg_marks,
            "attendance": float(student_input.attendance.strip("%")),
        }
        print(f"📈 Numeric features: {features}")

        # Create event vector
        event_vector = []
        for event in mlb_events.classes_:
            has_event = 1 if event in student_input.events_attended else 0
            event_vector.append(has_event)
        print(f"📅 Event matches: {sum(event_vector)}/{len(event_vector)}")

        # Create interest vector
        interest_vector = []
        for interest in mlb_interests.classes_:
            has_interest = 1 if interest in student_input.interests else 0
            interest_vector.append(has_interest)
        print(f"❤️ Interest matches: {sum(interest_vector)}/{len(interest_vector)}")

        # Combine all features
        feature_vector = np.array([list(features.values()) + event_vector + interest_vector])
        print(f"🔢 Final feature vector shape: {feature_vector.shape}")
        print(f"🔢 Expected feature shape: {X.shape[1]}")

        # Ensure dimensions match
        if feature_vector.shape[1] != X.shape[1]:
            print(f"⚠️ Dimension mismatch! Got {feature_vector.shape[1]}, expected {X.shape[1]}")
            if feature_vector.shape[1] < X.shape[1]:
                padding = np.zeros((1, X.shape[1] - feature_vector.shape[1]))
                feature_vector = np.hstack([feature_vector, padding])
                print("✅ Added padding to feature vector")
            else:
                feature_vector = feature_vector[:, :X.shape[1]]
                print("✅ Trimmed feature vector")

        # Make prediction
        prediction_proba = model.predict_proba(feature_vector)
        print(f"📊 Prediction probabilities shape: {len(prediction_proba)}")
        
        # Get top 3 clubs with highest probability
        recommended_clubs = []
        for i, club_probs in enumerate(prediction_proba):
            # Get probabilities for this club across all samples (we have only one sample)
            club_prob = club_probs[0][1]  # Probability of belonging to this club
            if club_prob > 0.3:  # Threshold for recommendation
                club_name = mlb_clubs.classes_[i]
                recommended_clubs.append((club_name, club_prob))
                print(f"🎯 Club: {club_name}, Probability: {club_prob:.3f}")
        
        # Sort by probability and return names
        recommended_clubs.sort(key=lambda x: x[1], reverse=True)
        final_recommendations = [club for club, prob in recommended_clubs[:3]]
        
        print(f"🏆 Final ML recommendations: {final_recommendations}")
        return final_recommendations
    
    except Exception as e:
        print(f"❌ ML recommendation error: {e}")
        return []

# ------------------------------------------------
# Enhanced Fallback Logic
# ------------------------------------------------
def get_fallback_recommendations(interests, events_attended):
    """Intelligent fallback recommendations"""
    print("🔄 Using fallback recommendation system")
    
    interest_to_club = {
        "AI": ["Computo", "AI Nexus", "GDSC", "IEEE"],
        "Machine Learning": ["Computo", "AI Nexus", "GDSC"],
        "Web Development": ["Computo", "GDSC", "Pixel"],
        "Coding": ["Computo", "GDSC", "IEEE"],
        "Programming": ["Computo", "GDSC"],
        "Robotics": ["RoboNix", "IEEE", "IET"],
        "Electronics": ["IEEE", "IET"],
        "Music": ["Aarohi"],
        "Dance": ["Rhythm"],
        "Drama": ["Dramatics"],
        "Design": ["Pixel", "Shutterbugs"],
        "Photography": ["Shutterbugs"],
        "Entrepreneurship": ["E-Cell", "FinSights"],
        "Finance": ["FinSights", "E-Cell"],
        "Business": ["E-Cell", "FinSights"],
        "Gaming": ["GameHub"],
        "Astronomy": ["AstroClub"],
        "Environment": ["EcoVision"],
        "Social Service": ["NSS"],
        "Leadership": ["NCC"],
        "Debate": ["LitSoc"],
        "Civil Engineering": ["ACE"]
    }
    
    # Also map events to clubs
    event_to_club = {
        "hackathon": ["Computo", "GDSC"],
        "ai": ["Computo", "AI Nexus"],
        "bootcamp": ["Computo", "GDSC"],
        "coding": ["Computo", "GDSC"],
        "web": ["Computo", "GDSC", "Pixel"],
        "development": ["Computo", "GDSC"]
    }
    
    recommended = set()
    
    # Add clubs based on interests
    for interest in interests:
        interest_lower = interest.lower()
        for key, clubs in interest_to_club.items():
            if key.lower() in interest_lower:
                recommended.update(clubs)
                print(f"🎯 Interest '{interest}' matched clubs: {clubs}")
    
    # Add clubs based on events
    for event in events_attended:
        event_lower = event.lower()
        for key, clubs in event_to_club.items():
            if key in event_lower:
                recommended.update(clubs)
                print(f"🎯 Event '{event}' matched clubs: {clubs}")
    
    # If still no matches, use default based on common interests
    if not recommended:
        print("⚠️ No specific matches found, using default clubs")
        recommended = {"Computo", "GDSC", "IEEE"}
    
    final_list = list(recommended)[:4]
    print(f"🏆 Fallback recommendations: {final_list}")
    return final_list

# ------------------------------------------------
# API Route
# ------------------------------------------------
@app.post("/recommend")
def recommend_api(student: StudentInput):
    print(f"\n🎯 Received recommendation request:")
    print(f"   CGPA: {student.cgpa}")
    print(f"   Interests: {student.interests}")
    print(f"   Events: {student.events_attended}")
    
    try:
        # Try ML recommendation first
        ml_recommendations = recommend_club_ml(student)
        
        # If ML returns empty, use fallback
        if not ml_recommendations:
            print("🤖 ML returned no recommendations, using fallback")
            ml_recommendations = get_fallback_recommendations(
                student.interests, 
                student.events_attended
            )
        else:
            # Combine with fallback to ensure we have enough recommendations
            fallback_recs = get_fallback_recommendations(student.interests, student.events_attended)
            all_recs = list(set(ml_recommendations + fallback_recs))
            ml_recommendations = all_recs[:3]
        
        # Ensure we only return available clubs
        final_recommendations = [club for club in ml_recommendations if club in AVAILABLE_CLUBS]
        
        print(f"🏆 FINAL Recommendations: {final_recommendations}")
        return {"recommended_clubs": final_recommendations}
        
    except Exception as e:
        print(f"❌ Error in recommendation API: {e}")
        fallback = get_fallback_recommendations(student.interests, student.events_attended)
        return {"recommended_clubs": fallback[:3]}

# ------------------------------------------------
# Debug Endpoints
# ------------------------------------------------
@app.get("/")
def home():
    return {"message": "Welcome to the Student Club Recommendation API!"}

@app.get("/debug/features")
def debug_features():
    """Debug endpoint to see feature information"""
    if X is not None:
        return {
            "feature_names": list(X.columns),
            "feature_count": X.shape[1],
            "target_clubs": list(mlb_clubs.classes_) if mlb_clubs else []
        }
    return {"error": "Model not trained"}

@app.get("/debug/students")
def debug_students():
    """Debug endpoint to see sample student data"""
    return {
        "total_students": len(students) if 'students' in locals() else 0,
        "sample_student": students[0] if students else {}
    }