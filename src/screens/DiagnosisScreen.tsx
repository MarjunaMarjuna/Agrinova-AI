import React, { useState } from 'react';
import { 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  CloudRain, 
  Sparkles, 
  FileText 
} from 'lucide-react';
import { Language, DiseaseInfo, Screen } from '../types';
import { translations } from '../i18n/translations';
import { HeatmapOverlay } from '../components/common/HeatmapOverlay';
import { AudioButton } from '../components/common/AudioButton';

interface DiagnosisScreenProps {
  language: Language;
  imageUri: string;
  diseaseData: DiseaseInfo;
  onNavigate: (screen: Screen) => void;
  onReScan: () => void;
}

export const DiagnosisScreen: React.FC<DiagnosisScreenProps> = ({
  language,
  imageUri,
  diseaseData,
  onNavigate,
  onReScan,
}) => {
  const t = translations[language];
  const [showOverlay, setShowOverlay] = useState(true);

  // Spoken narrative text for voice readout
  const spokenReport = language === 'ta'
    ? `கண்டறியப்பட்ட நோய்: ${diseaseData.name.ta}. துல்லியம் ${diseaseData.confidence} சதவீதம். முக்கிய அறிகுறிகள்: ${diseaseData.symptoms.ta.join(', ')}. காரணம்: ${diseaseData.causes.ta}. தகுந்த மருந்து அளவை அறிய சிகிச்சை பக்கத்தைப் பார்க்கவும்.`
    : language === 'hi'
    ? `पहचाना गया रोग: ${diseaseData.name.hi}। सटीकता ${diseaseData.confidence} प्रतिशत। मुख्य लक्षण: ${diseaseData.symptoms.hi.join(', ')}। उपचार और सही दवा की मात्रा जानने के लिए उपचार बटन दबाएं।`
    : `Detected Disease: ${diseaseData.name.en}. AI Confidence: ${diseaseData.confidence} percent. Key symptoms: ${diseaseData.symptoms.en.join(', ')}. Weather trigger: ${diseaseData.weatherTriggers.en}. Please tap View Treatment Plan for dosage details.`;

  const severityColor = 
    diseaseData.severity === 'critical'
      ? 'bg-red-500 text-white'
      : diseaseData.severity === 'moderate'
      ? 'bg-amber-500 text-white'
      : 'bg-emerald-500 text-white';

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 pb-12">
      {/* Leaf Heatmap Preview */}
      <HeatmapOverlay
        imageSrc={imageUri}
        boundingBoxes={diseaseData.boundingBoxes}
        language={language}
        showOverlay={showOverlay}
        onToggleOverlay={() => setShowOverlay(!showOverlay)}
      />

      {/* Disease Diagnosis Header Card */}
      <div className="bg-white rounded-3xl p-5 border border-agri-sand shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-agri-forest uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-agri-sprout" />
            {t.diagnosis.identifiedDisease}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${severityColor}`}>
            {t.severities[diseaseData.severity]}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-agri-charcoal tracking-tight leading-snug">
          {diseaseData.name[language]}
        </h2>
        <p className="text-xs text-agri-muted italic mt-0.5">
          {diseaseData.scientificName}
        </p>

        {/* Confidence & Affected Area Gauges */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-agri-sand">
          <div className="bg-agri-pale/30 rounded-2xl p-3 text-center border border-agri-sprout/20">
            <span className="text-xl font-black text-agri-deep">
              {diseaseData.confidence}%
            </span>
            <p className="text-[10px] font-bold text-agri-forest uppercase mt-0.5">
              {t.common.confidence}
            </p>
          </div>

          <div className="bg-agri-pale/30 rounded-2xl p-3 text-center border border-agri-sprout/20">
            <span className="text-xl font-black text-agri-danger">
              {diseaseData.affectedAreaPercentage}%
            </span>
            <p className="text-[10px] font-bold text-agri-forest uppercase mt-0.5">
              {t.common.affectedArea}
            </p>
          </div>
        </div>
      </div>

      {/* Vernacular Audio Readout Bar */}
      <AudioButton
        textToSpeak={spokenReport}
        language={language}
        className="w-full"
      />

      {/* Explainable AI (XAI) Symptoms Breakdown */}
      <div className="bg-white rounded-3xl p-5 border border-agri-sand shadow-soft space-y-3">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-agri-forest" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-agri-charcoal">
            {t.diagnosis.symptomsTitle}
          </h3>
        </div>

        <ul className="space-y-2">
          {diseaseData.symptoms[language].map((symptom, idx) => (
            <li key={idx} className="flex items-start space-x-2.5 text-xs text-agri-charcoal/90 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-agri-sprout shrink-0 mt-0.5" />
              <span>{symptom}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Weather & Environmental Context Correlation */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 border border-amber-200/80 shadow-soft">
        <div className="flex items-center space-x-2 mb-2">
          <CloudRain className="w-5 h-5 text-amber-700" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
            {t.diagnosis.weatherRiskTitle}
          </h3>
        </div>
        <p className="text-xs text-amber-950 leading-relaxed">
          {diseaseData.weatherTriggers[language]}
        </p>

        <div className="mt-3 pt-3 border-t border-amber-200 flex items-start space-x-2 text-[11px] text-amber-800">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          <span>{diseaseData.causes[language]}</span>
        </div>
      </div>

      {/* Bottom Primary Actions */}
      <div className="space-y-2 pt-2">
        <button
          onClick={() => onNavigate('treatment')}
          className="w-full py-4 rounded-2xl bg-agri-deep hover:bg-agri-forest active:scale-[0.98] text-white font-bold text-base flex items-center justify-center space-x-2 shadow-elevated transition-all"
        >
          <span>{t.diagnosis.viewTreatmentPlan}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={onReScan}
          className="w-full py-3 rounded-2xl bg-white hover:bg-agri-sand active:scale-[0.98] text-agri-forest font-bold text-xs flex items-center justify-center space-x-2 border border-agri-sand transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.diagnosis.reScan}</span>
        </button>
      </div>
    </div>
  );
};
