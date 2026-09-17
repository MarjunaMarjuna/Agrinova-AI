import os
import io
import json
import logging
from typing import Dict, Any, List, Tuple

from PIL import Image
import numpy as np
import tensorflow as tf

logger = logging.getLogger(__name__)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.keras")
CLASS_FILE = os.path.join(os.path.dirname(__file__), "class_names.json")

# Disease metadata
CLASSES: List[Dict[str, Any]] = [
    {
        "id": "rice_bacterial_leaf_blight",
        "cropId": "rice",
        "scientificName": "Xanthomonas oryzae",
        "name": {"en": "Bacterial Leaf Blight", "ta": "நெல் பாக்டீரியா இலை கருகல்"}
    },
    {
        "id": "rice_brown_spot",
        "cropId": "rice",
        "scientificName": "Bipolaris oryzae",
        "name": {"en": "Brown Spot", "ta": "நெல் பழுப்பு புள்ளி நோய்"}
    },
    {
        "id": "rice_leaf_smut",
        "cropId": "rice",
        "scientificName": "Entyloma oryzae",
        "name": {"en": "Leaf Smut", "ta": "நெல் இலை ஸ்மட்"}
    },
    {
        "id": "potato_early_blight",
        "cropId": "potato",
        "scientificName": "Alternaria solani",
        "name": {"en": "Potato Early Blight", "ta": "உருளை ஆரம்ப கருகல்"}
    },
    {
        "id": "potato_healthy",
        "cropId": "potato",
        "scientificName": "Solanum tuberosum",
        "name": {"en": "Healthy Potato", "ta": "ஆரோக்கியமான உருளை"}
    },
    {
        "id": "potato_late_blight",
        "cropId": "potato",
        "scientificName": "Phytophthora infestans",
        "name": {"en": "Potato Late Blight", "ta": "உருளை பின் கருகல்"}
    },
    {
        "id": "tomato_bacterial_spot",
        "cropId": "tomato",
        "scientificName": "Xanthomonas campestris",
        "name": {"en": "Tomato Bacterial Spot", "ta": "தக்காளி பாக்டீரியா புள்ளி"}
    },
    {
        "id": "tomato_early_blight",
        "cropId": "tomato",
        "scientificName": "Alternaria solani",
        "name": {"en": "Tomato Early Blight", "ta": "தக்காளி ஆரம்ப கருகல்"}
    },
    {
        "id": "tomato_healthy",
        "cropId": "tomato",
        "scientificName": "Solanum lycopersicum",
        "name": {"en": "Healthy Tomato", "ta": "ஆரோக்கியமான தக்காளி"}
    },
    {
        "id": "tomato_late_blight",
        "cropId": "tomato",
        "scientificName": "Phytophthora infestans",
        "name": {"en": "Tomato Late Blight", "ta": "தக்காளி பின் கருகல்"}
    },
    {
        "id": "tomato_leaf_mold",
        "cropId": "tomato",
        "scientificName": "Passalora fulva",
        "name": {"en": "Leaf Mold", "ta": "தக்காளி இலை பூஞ்சை"}
    },
    {
        "id": "tomato_septoria_leaf_spot",
        "cropId": "tomato",
        "scientificName": "Septoria lycopersici",
        "name": {"en": "Septoria Leaf Spot", "ta": "செப்டோரியா இலை புள்ளி"}
    },
    {
        "id": "tomato_spider_mites",
        "cropId": "tomato",
        "scientificName": "Tetranychus urticae",
        "name": {"en": "Spider Mites", "ta": "சிலந்தி பூச்சி தாக்கம்"}
    },
    {
        "id": "tomato_target_spot",
        "cropId": "tomato",
        "scientificName": "Corynespora cassiicola",
        "name": {"en": "Target Spot", "ta": "டார்கெட் ஸ்பாட்"}
    },
    {
        "id": "tomato_mosaic_virus",
        "cropId": "tomato",
        "scientificName": "Tomato Mosaic Virus",
        "name": {"en": "Tomato Mosaic Virus", "ta": "தக்காளி மோசைக் வைரஸ்"}
    },
    {
        "id": "tomato_yellow_leaf_curl",
        "cropId": "tomato",
        "scientificName": "Tomato Yellow Leaf Curl Virus",
        "name": {"en": "Tomato Yellow Leaf Curl Virus", "ta": "மஞ்சள் இலை சுருள் வைரஸ்"}
    }
]

# Load the exact class order used during training
with open(CLASS_FILE, "r") as f:
    CLASS_NAMES = json.load(f)

# Map folder names -> disease metadata
NAME_MAPPING = {
    "Bacterial leaf blight": CLASSES[0],
    "Brown spot": CLASSES[1],
    "Leaf smut": CLASSES[2],

    "Potato___Early_blight": CLASSES[3],
    "Potato___Late_blight": CLASSES[5],
    "Potato___healthy": CLASSES[4],

    "Tomato___Bacterial_spot": CLASSES[6],
    "Tomato___Early_blight": CLASSES[7],
    "Tomato___Late_blight": CLASSES[9],
    "Tomato___Leaf_Mold": CLASSES[10],
    "Tomato___Septoria_leaf_spot": CLASSES[11],
    "Tomato___Spider_mites Two-spotted_spider_mite": CLASSES[12],
    "Tomato___Target_Spot": CLASSES[13],
    "Tomato___Tomato_mosaic_virus": CLASSES[14],
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": CLASSES[15],
    "Tomato___healthy": CLASSES[8],
}

_loaded_model = None


def get_model():
    global _loaded_model
    if _loaded_model is None:
        _loaded_model = tf.keras.models.load_model(MODEL_PATH)
        logger.info("TensorFlow model loaded successfully")
    return _loaded_model


def preprocess_image(image_bytes: bytes) -> np.ndarray:
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))
    arr = np.array(img, dtype=np.float32)
    arr = tf.keras.applications.mobilenet_v2.preprocess_input(arr)
    return np.expand_dims(arr, axis=0)


def predict_disease(
    image_bytes: bytes,
    crop_hint: str = "tomato"
) -> Tuple[Dict[str, Any], float]:

    model = get_model()

    tensor = preprocess_image(image_bytes)
    predictions = model.predict(tensor, verbose=0)[0]

    # Crop-specific filtering
    crop_indices = [
        i for i, name in enumerate(CLASS_NAMES)
        if crop_hint.lower() in name.lower()
        or (crop_hint.lower() == "rice"
            and "Potato" not in name
            and "Tomato" not in name)
    ]

    if not crop_indices:
        crop_indices = list(range(len(CLASS_NAMES)))

    # Best prediction within selected crop
    filtered_scores = predictions[crop_indices]
    best_local_idx = int(np.argmax(filtered_scores))
    top_idx = crop_indices[best_local_idx]

    # ---------------- POTATO HEALTHY CORRECTION ----------------
    if crop_hint.lower() == "potato":
        healthy = CLASS_NAMES.index("Potato___healthy")
        early = CLASS_NAMES.index("Potato___Early_blight")
        late = CLASS_NAMES.index("Potato___Late_blight")

        # Healthy only if confidence >= 90%
        if top_idx == healthy and predictions[healthy] < 0.90:
            top_idx = early if predictions[early] > predictions[late] else late

    confidence = round(float(predictions[top_idx]) * 100, 1)

    # Debug
    print(f"\n===== {crop_hint.upper()} TOP 5 =====")
    top5 = sorted(crop_indices, key=lambda x: predictions[x], reverse=True)[:5]
    for i in top5:
        print(f"{CLASS_NAMES[i]} : {predictions[i] * 100:.2f}%")
    print("===========================\n")

    predicted_folder = CLASS_NAMES[top_idx]
    disease = NAME_MAPPING.get(predicted_folder, CLASSES[0]).copy()
    disease["boundingBoxes"] = []

    return disease, confidence