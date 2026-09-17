import React, { useState } from 'react';
import { 
  Sprout, 
  FlaskConical, 
  ShieldCheck, 
  Share2, 
  BookmarkCheck, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Leaf 
} from 'lucide-react';
import { Language, DiseaseInfo, Screen } from '../types';
import { translations } from '../i18n/translations';
import { DosageCalculator } from '../components/common/DosageCalculator';

interface TreatmentScreenProps {
  language: Language;
  diseaseData: DiseaseInfo;
  onNavigate: (screen: Screen) => void;
  onSaveReport?: () => void;
}

export const TreatmentScreen: React.FC<TreatmentScreenProps> = ({
  language,
  diseaseData,
  onNavigate,
  onSaveReport,
}) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'organic' | 'chemical' | 'prevention'>('organic');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    if (onSaveReport) onSaveReport();
  };

  const handleShareWhatsApp = () => {
    const text = language === 'ta'
      ? `*அக்ரிநோவா AI பயிர் நோய் அறிக்கை*\nபயிர்: ${t.crops[diseaseData.cropId]}\nநோய்: ${diseaseData.name.ta}\nதுல்லியம்: ${diseaseData.confidence}%\n\n*பரிந்துரைக்கப்படும் சிகிச்சை:*\n${diseaseData.organicTreatments[0]?.title.ta}\nமருந்து அளவு: ${diseaseData.organicTreatments[0]?.dosagePerLiter}\n\nஅக்ரிநோவா AI செயலியில் இருந்து பகிரப்பட்டது.`
      : language === 'hi'
      ? `*एग्रीनोवा AI फसल रोग रिपोर्ट*\nफसल: ${t.crops[diseaseData.cropId]}\nरोग: ${diseaseData.name.hi}\nसटीकता: ${diseaseData.confidence}%\n\n*उपचार सलाह:*\n${diseaseData.organicTreatments[0]?.title.hi}\nदवा मात्रा: ${diseaseData.organicTreatments[0]?.dosagePerLiter}\n\nएग्रीनोवा AI से भेजा गया।`
      : `*Agrinova AI Crop Health Report*\nCrop: ${t.crops[diseaseData.cropId]}\nDisease: ${diseaseData.name.en}\nAI Match: ${diseaseData.confidence}%\n\n*Recommended Treatment:*\n${diseaseData.organicTreatments[0]?.title.en}\nDosage: ${diseaseData.organicTreatments[0]?.dosagePerLiter}\n\nShared via Agrinova AI.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 pb-12">
      {/* Title & Disease Sub-banner */}
      <div className="bg-agri-deep text-white rounded-3xl p-4.5 shadow-elevated">
        <span className="text-[10px] font-bold uppercase tracking-wider text-agri-sprout">
          {t.crops[diseaseData.cropId]} • {t.severities[diseaseData.severity]}
        </span>
        <h2 className="text-xl font-black text-white mt-0.5">
          {diseaseData.name[language]}
        </h2>
        <p className="text-xs text-agri-pale/80 mt-1">
          {t.treatment.title}
        </p>
      </div>

      {/* 3-Tab Selector Segment */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-white rounded-2xl border border-agri-sand shadow-soft">
        <button
          onClick={() => setActiveTab('organic')}
          className={`flex flex-col items-center py-2 px-1 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'organic'
              ? 'bg-agri-forest text-white shadow-sm'
              : 'text-agri-muted hover:text-agri-deep'
          }`}
        >
          <Sprout className="w-4 h-4 mb-1" />
          <span className="truncate w-full text-center">{t.treatment.tabOrganic}</span>
        </button>

        <button
          onClick={() => setActiveTab('chemical')}
          className={`flex flex-col items-center py-2 px-1 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'chemical'
              ? 'bg-agri-forest text-white shadow-sm'
              : 'text-agri-muted hover:text-agri-deep'
          }`}
        >
          <FlaskConical className="w-4 h-4 mb-1" />
          <span className="truncate w-full text-center">{t.treatment.tabChemical}</span>
        </button>

        <button
          onClick={() => setActiveTab('prevention')}
          className={`flex flex-col items-center py-2 px-1 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'prevention'
              ? 'bg-agri-forest text-white shadow-sm'
              : 'text-agri-muted hover:text-agri-deep'
          }`}
        >
          <ShieldCheck className="w-4 h-4 mb-1" />
          <span className="truncate w-full text-center">{t.treatment.tabPrevention}</span>
        </button>
      </div>

      {/* TAB 1: Organic / Biological Remedies */}
      {activeTab === 'organic' && (
        <div className="space-y-4">
          {diseaseData.organicTreatments.map((treatment, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border border-agri-sand shadow-soft space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                    <Leaf className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      {treatment.tag || 'Organic'}
                    </span>
                    <h3 className="text-sm font-bold text-agri-charcoal mt-1">
                      {treatment.title[language]}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-xs text-agri-charcoal/80 leading-relaxed">
                {treatment.description[language]}
              </p>

              {treatment.dosagePerLiter && (
                <div className="bg-agri-pale/30 rounded-2xl p-3 flex items-center justify-between border border-agri-sprout/20">
                  <span className="text-xs font-semibold text-agri-forest">
                    {language === 'ta' ? 'பரிந்துரைக்கப்படும் அளவு:' : language === 'hi' ? 'अनुशंसित मात्रा:' : 'Dosage:'}
                  </span>
                  <span className="text-xs font-black text-agri-deep">
                    {treatment.dosagePerLiter}
                  </span>
                </div>
              )}

              {treatment.safetyPrecaution && (
                <div className="flex items-start space-x-2 text-[11px] text-emerald-800 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>{treatment.safetyPrecaution[language]}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Chemical Fungicides + Knapsack Sprayer Dosage Calculator */}
      {activeTab === 'chemical' && (
        <div className="space-y-4">
          {/* Embedded Sprayer Dosage Calculator */}
          <DosageCalculator
            chemicalName={diseaseData.chemicalTreatments[0]?.title[language] || 'Fungicide'}
            dosePerLiterText="2.5g / L"
            defaultDosePerLiterValue={2.5}
            unit="g"
            language={language}
          />

          {diseaseData.chemicalTreatments.map((treatment, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border border-agri-sand shadow-soft space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                    <FlaskConical className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                      {treatment.tag || 'Chemical'}
                    </span>
                    <h3 className="text-sm font-bold text-agri-charcoal mt-1">
                      {treatment.title[language]}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-xs text-agri-charcoal/80 leading-relaxed">
                {treatment.description[language]}
              </p>

              {treatment.dosagePerLiter && (
                <div className="bg-amber-50/50 rounded-2xl p-3 flex items-center justify-between border border-amber-200/40">
                  <span className="text-xs font-semibold text-amber-900">
                    {language === 'ta' ? 'மருந்து விகிதம்:' : language === 'hi' ? 'दवा का अनुपात:' : 'Mix Ratio:'}
                  </span>
                  <span className="text-xs font-black text-amber-950">
                    {treatment.dosagePerLiter}
                  </span>
                </div>
              )}

              {treatment.safetyPrecaution && (
                <div className="flex items-start space-x-2 text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <span>{treatment.safetyPrecaution[language]}</span>
                </div>
              )}
            </div>
          ))}

          {/* Pre-Harvest Interval (Withholding Period) Notice */}
          <div className="bg-white rounded-3xl p-4 border border-agri-sand flex items-center space-x-3 text-xs text-agri-charcoal">
            <Clock className="w-5 h-5 text-agri-forest shrink-0" />
            <p>
              <strong className="text-agri-deep">{t.treatment.withholdingPeriod}:</strong>{' '}
              {language === 'ta' ? 'மருந்து தெளித்த பின் 7' : language === 'hi' ? 'छिड़काव के 7' : 'Wait at least 7'}{' '}
              {t.treatment.daysBeforeHarvest}.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: Prevention & Cultural Practices */}
      {activeTab === 'prevention' && (
        <div className="bg-white rounded-3xl p-5 border border-agri-sand shadow-soft space-y-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-agri-forest" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-agri-charcoal">
              {t.treatment.tabPrevention}
            </h3>
          </div>

          <ul className="space-y-3">
            {diseaseData.preventiveMeasures[language].map((measure, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-xs text-agri-charcoal leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-agri-pale text-agri-forest shrink-0 flex items-center justify-center font-bold text-[10px]">
                  {idx + 1}
                </span>
                <span>{measure}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Footer: Save & Share to WhatsApp */}
      <div className="space-y-2 pt-2">
        <button
          onClick={handleShareWhatsApp}
          className="w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-md transition-all active:scale-[0.98]"
        >
          <Share2 className="w-4 h-4" />
          <span>{t.common.shareWhatsapp}</span>
        </button>

        <button
          onClick={handleSave}
          disabled={isSaved}
          className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 transition-all border ${
            isSaved
              ? 'bg-agri-pale/60 text-agri-deep border-agri-sprout/40'
              : 'bg-white hover:bg-agri-sand text-agri-forest border-agri-sand'
          }`}
        >
          <BookmarkCheck className="w-4 h-4 text-agri-forest" />
          <span>{isSaved ? (language === 'ta' ? 'பதிவேட்டில் சேமிக்கப்பட்டது ✓' : language === 'hi' ? 'डायरी में सुरक्षित ✓' : 'Saved to Farm History ✓') : t.treatment.saveToHistory}</span>
        </button>

        <button
          onClick={() => onNavigate('history')}
          className="w-full py-2 text-xs font-bold text-agri-forest hover:text-agri-deep text-center transition-all"
        >
          {language === 'ta' ? 'பதிவேட்டைப் பார்க்கவும் →' : language === 'hi' ? 'खेत डायरी देखें →' : 'View in Field Logbook →'}
        </button>
      </div>
    </div>
  );
};
