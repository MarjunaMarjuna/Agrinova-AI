from pathlib import Path

# Pylance may flag TensorFlow's lazy Keras package as a missing source in some environments.
import tensorflow as tf  # pyright: ignore[reportMissingModuleSource]
from tensorflow import keras  # pyright: ignore[reportMissingModuleSource]
from tensorflow.keras import layers  # pyright: ignore[reportMissingModuleSource]


IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 10
VALIDATION_SPLIT = 0.2
SEED = 123

BACKEND_DIR = Path(__file__).resolve().parent
DATASET_DIR = BACKEND_DIR / "datasets" / "PlantVillage"
MODEL_PATH = BACKEND_DIR / "model.keras"


def main() -> None:
	if not DATASET_DIR.is_dir():
		raise FileNotFoundError(f"Dataset directory not found: {DATASET_DIR}")

	train_dataset = keras.utils.image_dataset_from_directory(
		DATASET_DIR,
		validation_split=VALIDATION_SPLIT,
		subset="training",
		seed=SEED,
		image_size=IMAGE_SIZE,
		batch_size=BATCH_SIZE,
	)
	validation_dataset = keras.utils.image_dataset_from_directory(
		DATASET_DIR,
		validation_split=VALIDATION_SPLIT,
		subset="validation",
		seed=SEED,
		image_size=IMAGE_SIZE,
		batch_size=BATCH_SIZE,
	)

	class_names = train_dataset.class_names
	print(f"Classes: {len(class_names)}")

	data_augmentation = keras.Sequential(
		[
			layers.RandomFlip("horizontal"),
			layers.RandomRotation(0.1),
		],
		name="data_augmentation",
	)

	base_model = keras.applications.MobileNetV2(
		input_shape=(*IMAGE_SIZE, 3),
		include_top=False,
		weights="imagenet",
	)
	base_model.trainable = False

	inputs = keras.Input(shape=(*IMAGE_SIZE, 3))
	augmented_images = data_augmentation(inputs)
	preprocessed_images = keras.applications.mobilenet_v2.preprocess_input(
		augmented_images
	)
	features = base_model(preprocessed_images, training=False)
	features = layers.GlobalAveragePooling2D()(features)
	outputs = layers.Dense(len(class_names), activation="softmax")(features)
	model = keras.Model(inputs, outputs)

	model.compile(
		optimizer=keras.optimizers.Adam(),
		loss="sparse_categorical_crossentropy",
		metrics=["accuracy"],
	)

	history = model.fit(
		train_dataset,
		validation_data=validation_dataset,
		epochs=EPOCHS,
	)

	model.save(MODEL_PATH)
	final_accuracy = history.history["accuracy"][-1]
	print(f"Final training accuracy: {final_accuracy:.4f}")


if __name__ == "__main__":
	main()
