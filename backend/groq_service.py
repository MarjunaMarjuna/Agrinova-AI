import os
import json
import logging
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
DEFAULT_GROQ_MODEL = "groq/compound-mini"


def get_groq_client():
    if not GROQ_API_KEY:
        return None
    try:
        from groq import Groq
        return Groq(api_key=GROQ_API_KEY)
    except Exception as e:
        logger.error(f"Failed to initialize Groq client: {e}")
        return None


async def generate_explainable_recommendation(
    crop_name: str,
    predicted_disease: str,
    confidence: float,
    weather_data: Dict[str, Any],
    language: str = "en",
) -> Dict[str, Any]:

    client = get_groq_client()

    if not client:
        logger.info("Groq unavailable → Using fallback")
        return get_fallback_diagnosis(
            crop_name, predicted_disease, confidence, weather_data
        )

    temp = weather_data.get("temp", 28)
    humidity = weather_data.get("humidity", 80)
    condition = weather_data.get("condition", {}).get("en", "Humid")

    prompt = f"""
Return ONLY valid JSON.

Crop: {crop_name}
Disease: {predicted_disease}
Confidence: {confidence}%
Weather: {temp}°C, {humidity}% RH, {condition}

Keep responses concise.

Schema:
{{
  "scientificName":"",
  "severity":"mild",
  "affectedAreaPercentage":25,
  "symptoms":{{"en":[],"ta":[],"hi":[]}},
  "weatherTriggers":{{"en":"","ta":"","hi":""}},
  "causes":{{"en":"","ta":"","hi":""}},
  "organicTreatments":[{{
    "title":{{"en":"","ta":"","hi":""}},
    "description":{{"en":"","ta":"","hi":""}},
    "dosagePerLiter":"",
    "preparationTime":"",
    "safetyPrecaution":{{"en":"","ta":"","hi":""}},
    "tag":"Organic"
  }}],
  "chemicalTreatments":[{{
    "title":{{"en":"","ta":"","hi":""}},
    "description":{{"en":"","ta":"","hi":""}},
    "dosagePerLiter":"",
    "safetyPrecaution":{{"en":"","ta":"","hi":""}},
    "tag":"Chemical"
  }}],
  "preventiveMeasures":{{"en":[],"ta":[],"hi":[]}}
}}
"""

    try:
        completion = client.chat.completions.create(
            model=DEFAULT_GROQ_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": "You are an agricultural scientist. Return ONLY valid JSON.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.2,
            max_tokens=600,
        )

        message = completion.choices[0].message
        response_content = (message.content or "").strip()

        # Remove markdown if model returns ```json
        response_content = (
            response_content.replace("```json", "")
            .replace("```", "")
            .strip()
        )

        try:
            return json.loads(response_content)

        except json.JSONDecodeError as err:
            logger.error(f"Invalid JSON from Groq: {err}")
            logger.debug(response_content)

            return get_fallback_diagnosis(
                crop_name,
                predicted_disease,
                confidence,
                weather_data,
            )

    except Exception as e:
        logger.error(f"Groq API call error: {e}")
        return get_fallback_diagnosis(
            crop_name,
            predicted_disease,
            confidence,
            weather_data,
        )


def get_fallback_diagnosis(
    crop_name: str,
    predicted_disease: str,
    confidence: float,
    weather_data: Dict[str, Any],
) -> Dict[str, Any]:

    temp = weather_data.get("temp", 29)
    humidity = weather_data.get("humidity", 84)

    # ---------------- HEALTHY ----------------
    if "healthy" in predicted_disease.lower():
        scientific = {
            "tomato": "Solanum lycopersicum",
            "potato": "Solanum tuberosum",
            "rice": "Oryza sativa",
        }.get(crop_name.lower(), crop_name)

        return {
            "scientificName": scientific,
            "severity": "healthy",
            "affectedAreaPercentage": 0,
            "symptoms": {
                "en": ["Healthy foliage", "No disease detected"],
                "ta": ["ஆரோக்கியமான இலை", "நோய் இல்லை"],
                "hi": ["स्वस्थ पत्तियां", "कोई रोग नहीं"],
            },
            "weatherTriggers": {
                "en": f"{temp}°C and {humidity}% are suitable for healthy growth.",
                "ta": f"{temp}°C மற்றும் {humidity}% வளர்ச்சிக்கு ஏற்றது.",
                "hi": f"{temp}°C एवं {humidity}% वृद्धि के लिए उपयुक्त है।",
            },
            "causes": {
                "en": "No pathogen detected.",
                "ta": "நோய் இல்லை.",
                "hi": "कोई रोग नहीं।",
            },
            "organicTreatments": [],
            "chemicalTreatments": [],
            "preventiveMeasures": {
                "en": ["Monitor crop weekly", "Maintain balanced irrigation"],
                "ta": ["வாரம் கண்காணிக்கவும்", "சீரான பாசனம் செய்யவும்"],
                "hi": ["साप्ताहिक निरीक्षण करें", "संतुलित सिंचाई करें"],
            },
        }

    # ---------------- SCIENTIFIC NAMES ----------------
    disease_map = {
        "tomato early blight": "Alternaria solani",
        "tomato late blight": "Phytophthora infestans",
        "tomato bacterial spot": "Xanthomonas campestris",
        "leaf mold": "Passalora fulva",
        "septoria leaf spot": "Septoria lycopersici",
        "spider mites": "Tetranychus urticae",
        "target spot": "Corynespora cassiicola",
        "tomato mosaic": "Tomato Mosaic Virus",
        "yellow leaf curl": "Tomato Yellow Leaf Curl Virus",
        "potato early blight": "Alternaria solani",
        "potato late blight": "Phytophthora infestans",
        "brown spot": "Bipolaris oryzae",
        "leaf smut": "Entyloma oryzae",
        "bacterial leaf blight": "Xanthomonas oryzae",
    }

    scientific = "Unknown pathogen"

    for key, value in disease_map.items():
        if key in predicted_disease.lower():
            scientific = value
            break

    chemical = "Mancozeb 75 WP"
    if "late blight" in predicted_disease.lower():
        chemical = "Metalaxyl + Mancozeb"

    return {
        "scientificName": scientific,
        "severity": "critical" if confidence >= 90 else "moderate",
        "affectedAreaPercentage": 30,
        "symptoms": {
            "en": [
                f"Symptoms match {predicted_disease}",
                "Leaf lesions with progressive tissue damage",
            ],
            "ta": [
                f"{predicted_disease} நோய்க்கான அறிகுறிகள்",
                "இலை திசுக்கள் சேதமடைகின்றன",
            ],
            "hi": [
                f"{predicted_disease} के लक्षण",
                "पत्तियों में प्रगतिशील क्षति",
            ],
        },
        "weatherTriggers": {
            "en": f"{temp}°C with {humidity}% humidity increases disease spread.",
            "ta": f"{temp}°C மற்றும் {humidity}% ஈரப்பதம் நோய் பரவலை அதிகரிக்கிறது.",
            "hi": f"{temp}°C एवं {humidity}% आर्द्रता रोग फैलाव बढ़ाती है।",
        },
        "causes": {
            "en": "Pathogen spreads through moisture, rain splash and infected plant debris.",
            "ta": "ஈரநிலை, மழைத்துளி மற்றும் பாதிக்கப்பட்ட தாவர கழிவுகள் மூலம் பரவுகிறது.",
            "hi": "नमी, वर्षा और संक्रमित पौध अवशेषों से फैलता है।",
        },
        "organicTreatments": [
            {
                "title": {
                    "en": "Neem Seed Extract",
                    "ta": "வேப்பங்கொட்டை கரைசல்",
                    "hi": "नीम बीज अर्क",
                },
                "description": {
                    "en": "Spray once every 7 days.",
                    "ta": "7 நாட்களுக்கு ஒருமுறை தெளிக்கவும்.",
                    "hi": "7 दिन में एक बार छिड़कें।",
                },
                "dosagePerLiter": "50 ml/L",
                "preparationTime": "12 hours",
                "safetyPrecaution": {
                    "en": "Safe for beneficial insects.",
                    "ta": "நன்மை பூச்சிகளுக்கு பாதுகாப்பானது.",
                    "hi": "मित्र कीटों के लिए सुरक्षित।",
                },
                "tag": "Organic",
            }
        ],
        "chemicalTreatments": [
            {
                "title": {
                    "en": chemical,
                    "ta": chemical,
                    "hi": chemical,
                },
                "description": {
                    "en": "Apply immediately after early symptoms appear.",
                    "ta": "ஆரம்ப அறிகுறி தெரிந்தவுடன் தெளிக்கவும்.",
                    "hi": "प्रारंभिक लक्षण पर तुरंत छिड़कें।",
                },
                "dosagePerLiter": "2.5 g/L",
                "safetyPrecaution": {
                    "en": "Wear gloves and face mask.",
                    "ta": "கையுறை மற்றும் முகக்கவசம் அணியவும்.",
                    "hi": "दस्ताने और मास्क पहनें।",
                },
                "tag": "Chemical",
            }
        ],
        "preventiveMeasures": {
            "en": ["Remove infected leaves", "Avoid prolonged leaf wetness"],
            "ta": ["பாதிக்கப்பட்ட இலை அகற்றவும்", "இலை நீண்ட நேரம் ஈரமாக இருக்க விடாதீர்கள்"],
            "hi": ["संक्रमित पत्तियां हटाएं", "पत्तियों को लंबे समय तक गीला न रखें"],
        },
    }