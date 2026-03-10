from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd

print("Loading model...")
model = joblib.load("ridge_model.pkl")
print("Model loaded!")

print("Loading scaler...")
scaler = joblib.load("scaler.pkl")
print("Scaler loaded!")

print("Loading columns...")
columns = joblib.load("columns.pkl")
print("All loaded!")

# Load training data to get median values for missing features
df_train = pd.read_csv("DATA_SET.csv")
train_medians = df_train.select_dtypes(include=[np.number]).median()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class HouseFeatures(BaseModel):
    features: dict

@app.post("/predict")
def predict(data: HouseFeatures):
    df = pd.DataFrame([data.features])
    df = df.reindex(columns=columns, fill_value=0)
    
    # Fill missing numerical features with training medians
    for col in df.columns:
        if df[col].iloc[0] == 0 and col in train_medians:
            df[col] = train_medians[col]
    
    scaled = scaler.transform(df)
    prediction = model.predict(scaled)
    price = np.expm1(prediction[0])
    return {"predicted_price": round(float(price), 2)}

@app.get("/")
def root():
    return {"status": "API is running!"}