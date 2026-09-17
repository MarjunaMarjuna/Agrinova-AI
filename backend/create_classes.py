from pathlib import Path
import json
from tensorflow import keras

DATASET = Path("datasets/PlantVillage")
ds = keras.utils.image_dataset_from_directory(
    DATASET,
    shuffle=False,
    image_size=(224,224),
    batch_size=32
)

with open("class_names.json","w") as f:
    json.dump(ds.class_names,f,indent=2)

print(ds.class_names)