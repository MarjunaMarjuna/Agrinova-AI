import os
import io
import base64
import logging
from typing import Optional
from fastapi import FastAPI, UploadFile, File, Form, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from weather_service import fetch_open_meteo_weather, DEFAULT_LAT, DEFAULT_LON
from model_loader import predict_disease, CLASSES
from groq_service import generate_explainable_recommendation

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("agrinova-backend")

app = FastAPI(
    title="Agrinova AI Backend",
    description="Free-tier AI crop disease diagnosis powered by TensorFlow (.keras), Groq API, and Open-Meteo",
    version="1.0.0"
)

# Allow CORS for local frontend (Vite port 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Base64PredictRequest(BaseModel):
    image_base64: str
    crop_hint: Optional[str] = "tomato"
    language: Optional[str] = "en"
    lat: Optional[float] = DEFAULT_LAT
    lon: Optional[float] = DEFAULT_LON

@app.get("/")
def root():
    return {
        "app": "Agrinova AI",
        "status": "online",
        "apis": {
            "model": "TensorFlow (.keras local model)",
            "llm": "Groq API (Free Tier)",
            "weather": "Open-Meteo API (Free, No Key Required)"
        },
        "endpoints": ["/predict", "/weather"]
    }

@app.get("/weather")
async def get_weather(
    lat: float = Query(DEFAULT_LAT, description="Latitude for local farm"),
    lon: float = Query(DEFAULT_LON, description="Longitude for local farm")
):
    """
    Fetches real-time agro-meteorological data directly from Open-Meteo Free API.
    Calculates disease vulnerability based on temperature and humidity.
    """
    try:
        weather_result = await fetch_open_meteo_weather(lat=lat, lon=lon)
        return weather_result
    except Exception as e:
        logger.error(f"Weather error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/predict")
async def predict_leaf_disease(
    file: Optional[UploadFile] = File(None),
    crop_hint: str = Form("tomato"),
    language: str = Form("en"),
    lat: float = Form(DEFAULT_LAT),
    lon: float = Form(DEFAULT_LON)
):
    """
    Analyzes crop leaf image:
    1. Runs local TensorFlow (.keras) classification
    2. Fetches real-time Open-Meteo weather
    3. Calls Groq API (Free Tier) to generate explainable AI reasoning & treatment in Tamil/Hindi/English.
    """
    if file is None:
        raise HTTPException(status_code=400, detail="Image file must be provided")

    try:
        image_bytes = await file.read()
        return await _process_prediction(image_bytes, crop_hint, language, lat, lon)
    except Exception as e:
        logger.error(f"Prediction pipeline error: {e}")
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")


@app.post("/predict/json")
async def predict_leaf_disease_json(req: Base64PredictRequest):
    """
    Alternative endpoint accepting Base64 or Data URI encoded image payload.
    """
    try:
        raw_b64 = req.image_base64
        if "," in raw_b64:
            raw_b64 = raw_b64.split(",")[1]
        
        image_bytes = base64.b64decode(raw_b64)
        return await _process_prediction(
            image_bytes, 
            req.crop_hint or "tomato", 
            req.language or "en", 
            req.lat or DEFAULT_LAT, 
            req.lon or DEFAULT_LON
        )
    except Exception as e:
        logger.error(f"JSON prediction error: {e}")
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")


async def _process_prediction(
    image_bytes: bytes, 
    crop_hint: str, 
    language: str, 
    lat: float, 
    lon: float
):
    # 1. Local TensorFlow .keras inference
    disease_class, confidence = predict_disease(image_bytes, crop_hint=crop_hint)

    # 2. Real-time Open-Meteo agro-weather context
    weather_data = await fetch_open_meteo_weather(lat=lat, lon=lon)

    # 3. Groq API Free Tier explainable AI generation
    crop_display = crop_hint.capitalize()
    disease_display = disease_class["name"]["en"]
    ai_recommendation = await generate_explainable_recommendation(
        crop_name=crop_display,
        predicted_disease=disease_display,
        confidence=confidence,
        weather_data=weather_data,
        language=language
    )

    # Merge into comprehensive response payload
    response_payload = {
        "id": disease_class["id"],
        "cropId": disease_class["cropId"],
        "scientificName": ai_recommendation.get("scientificName", disease_class["scientificName"]),
        "name": disease_class["name"],
        "confidence": confidence,
        "severity": ai_recommendation.get("severity", "moderate"),
        "affectedAreaPercentage": ai_recommendation.get("affectedAreaPercentage", 25),
        "symptoms": ai_recommendation.get("symptoms", {}),
        "weatherTriggers": ai_recommendation.get("weatherTriggers", {}),
        "causes": ai_recommendation.get("causes", {}),
        "organicTreatments": ai_recommendation.get("organicTreatments", []),
        "chemicalTreatments": ai_recommendation.get("chemicalTreatments", []),
        "preventiveMeasures": ai_recommendation.get("preventiveMeasures", {}),
        "boundingBoxes": disease_class.get("boundingBoxes", []),
        "weatherContext": weather_data,
        "engine": {
            "vision": "TensorFlow (.keras local model)",
            "explainableAI": "Groq LLaMA-3.3 (Free Tier)",
            "weather": "Open-Meteo (Free)"
        }
    }

    return response_payload


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
