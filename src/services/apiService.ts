import { WeatherContext, DiseaseInfo, CropId, Language } from '../types';

const API_BASE_URL = 'http://127.0.0.1:8000';

export interface PredictResponsePayload extends DiseaseInfo {
  weatherContext?: WeatherContext;
  engine?: {
    vision: string;
    explainableAI: string;
    weather: string;
  };
}

export const apiService = {
  // Real-time weather
  async getWeather(
    lat: number = 11.0168,
    lon: number = 76.9558
  ): Promise<WeatherContext> {
    const res = await fetch(
      `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}`
    );

    if (!res.ok) {
      throw new Error(`Weather API failed (${res.status})`);
    }

    return await res.json();
  },

  // Disease prediction
  async predictDisease(
    imageBase64: string,
    cropHint: CropId,
    language: Language
  ): Promise<PredictResponsePayload> {
    const res = await fetch(`${API_BASE_URL}/predict/json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        image_base64: imageBase64,
        crop_hint: cropHint,
        language,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Prediction failed: ${error}`);
    }

    return await res.json();
  },
};