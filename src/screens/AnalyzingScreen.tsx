import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { Language, DiseaseInfo } from '../types';
import { translations } from '../i18n/translations';

interface AnalyzingScreenProps {
  language: Language;
  imageUri: string;
  diseaseData: DiseaseInfo;
  onAnalysisComplete: () => void;
}

export const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({
  language,
  imageUri,
  diseaseData,
  onAnalysisComplete,
}) => {
  const t = translations[language];
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    // Step progression
    const timer1 = setTimeout(() => setCurrentStep(2), 1100);
    const timer2 = setTimeout(() => setCurrentStep(3), 2200);
    const timer3 = setTimeout(() => onAnalysisComplete(), 3300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onAnalysisComplete]);

  const steps = [
    { 
      num: 1, 
      text: language === 'ta' 
        ? 'டென்சர்ஃப்ளோ (.keras): இலையின் மேற்பரப்பு & நோய் அடையாளம்...' 
        : language === 'hi' 
        ? 'टेन्सरफ्लो (.keras): पत्ती सतह एवं रोग पहचान...' 
        : 'TensorFlow (.keras): Classifying leaf symptoms...' 
    },
    { 
      num: 2, 
      text: language === 'ta' 
        ? 'Open-Meteo (இலவசம்): வானிலை & ஈரப்பதம் ஒப்பிடுதல்...' 
        : language === 'hi' 
        ? 'Open-Meteo (फ्री): मौसम एवं आर्द्रता जोखिम मिलान...' 
        : 'Open-Meteo (Free): Correlating weather & humidity risk...' 
    },
    { 
      num: 3, 
      text: language === 'ta' 
        ? 'Groq LLaMA-3.3: மருந்து அளவு & தமிழ் ஆலோசனை உருவாக்கம்...' 
        : language === 'hi' 
        ? 'Groq LLaMA-3.3: दवा की मात्रा एवं विस्तृत उपचार...' 
        : 'Groq API (Free Tier): Synthesizing explainable treatment plan...' 
    },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-[#102419] to-agri-dark text-white">
      {/* Top Header */}
      <div className="text-center pt-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-agri-sprout/20 text-agri-sprout text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AGRINOVA VISION AI</span>
        </div>
        <h2 className="text-xl font-black text-white">
          {t.analyzing.title}
        </h2>
        <p className="text-xs text-agri-pale/80 mt-1">
          {diseaseData.scientificName}
        </p>
      </div>

      {/* Center Image Scanner with Pulsing Radar Sweep */}
      <div className="relative w-64 h-64 mx-auto my-auto rounded-3xl overflow-hidden border-2 border-agri-sprout/50 shadow-glow bg-black/40">
        <img
          src={imageUri}
          alt="Scanned leaf"
          className="w-full h-full object-cover opacity-85"
        />

        {/* Animated Horizontal Laser Scan Line */}
        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-agri-sprout to-transparent shadow-[0_0_15px_#52B788] animate-scan-line"></div>

        {/* Grid HUD Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#52b78815_1px,transparent_1px),linear-gradient(to_bottom,#52b78815_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        {/* Pulsing Corner Brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-agri-sprout animate-pulse"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-agri-sprout animate-pulse"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-agri-sprout animate-pulse"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-agri-sprout animate-pulse"></div>
      </div>

      {/* Step-by-Step Diagnostic Progress Checkpoints */}
      <div className="space-y-3 bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
        {steps.map((step) => {
          const isDone = currentStep > step.num;
          const isCurrent = currentStep === step.num;

          return (
            <div
              key={step.num}
              className={`flex items-center space-x-3 transition-opacity duration-300 ${
                isDone || isCurrent ? 'opacity-100' : 'opacity-40'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-5 h-5 text-agri-sprout shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-5 h-5 text-agri-gold animate-spin shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 shrink-0 flex items-center justify-center text-[10px] font-bold">
                  {step.num}
                </div>
              )}
              <span className="text-xs font-medium text-white/90">
                {step.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
