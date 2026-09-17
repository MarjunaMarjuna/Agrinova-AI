export type Language = 'en' | 'ta' | 'hi';

export type Screen = 
  | 'language' 
  | 'home' 
  | 'scan' 
  | 'analyzing' 
  | 'diagnosis' 
  | 'treatment' 
  | 'history' 
  | 'settings';

export type CropId = 'tomato' | 'rice' | 'cotton' | 'potato' | 'chilli';

export type SeverityLevel = 'mild' | 'moderate' | 'critical';

export interface BoundingBox {
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  width: number; // percentage width
  height: number; // percentage height
  label: {
    en: string;
    ta: string;
    hi: string;
  };
}

export interface TreatmentItem {
  title: {
    en: string;
    ta: string;
    hi: string;
  };
  description: {
    en: string;
    ta: string;
    hi: string;
  };
  dosagePerLiter?: string; // e.g. "2g / Litre of water"
  preparationTime?: string;
  safetyPrecaution?: {
    en: string;
    ta: string;
    hi: string;
  };
  tag?: 'Organic' | 'Chemical' | 'Preventive';
}

export interface DiseaseInfo {
  id: string;
  cropId: CropId;
  scientificName: string;
  name: {
    en: string;
    ta: string;
    hi: string;
  };
  confidence: number; // e.g. 94
  severity: SeverityLevel;
  affectedAreaPercentage: number; // e.g. 25
  symptoms: {
    en: string[];
    ta: string[];
    hi: string[];
  };
  weatherTriggers: {
    en: string;
    ta: string;
    hi: string;
  };
  causes: {
    en: string;
    ta: string;
    hi: string;
  };
  organicTreatments: TreatmentItem[];
  chemicalTreatments: TreatmentItem[];
  preventiveMeasures: {
    en: string[];
    ta: string[];
    hi: string[];
  };
  boundingBoxes: BoundingBox[];
  sampleImage: string;
}

export interface WeatherContext {
  temp: number; // Celsius
  humidity: number; // Percentage
  rainfallProb: number; // Percentage
  condition: {
    en: string;
    ta: string;
    hi: string;
  };
  riskAlert: {
    en: string;
    ta: string;
    hi: string;
  };
}

export interface ScanReport {
  id: string;
  timestamp: string; // ISO string
  cropId: CropId;
  imageUri: string;
  disease: DiseaseInfo;
  status: 'active' | 'treating' | 'resolved';
  isOffline?: boolean;
}
