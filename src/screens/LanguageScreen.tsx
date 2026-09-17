import React from 'react';
import { Check, Volume2, Sparkles, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { audioService } from '../services/audioService';

interface LanguageScreenProps {
  selectedLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onContinue: () => void;
}

export const LanguageScreen: React.FC<LanguageScreenProps> = ({
  selectedLanguage,
  onSelectLanguage,
  onContinue,
}) => {
  const t = translations[selectedLanguage];

  const languageOptions: {
    code: Language;
    nativeName: string;
    englishName: string;
    subtext: string;
    sampleGreeting: string;
  }[] = [
    {
      code: 'ta',
      nativeName: 'தமிழ்',
      englishName: 'Tamil',
      subtext: 'குரல் வழிகாட்டல் & நோய் கண்டறிதல்',
      sampleGreeting: 'வணக்கம்! அக்ரிநோவா பயிர் மருத்துவத்திற்கு வரவேற்கிறோம்.',
    },
    {
      code: 'hi',
      nativeName: 'हिन्दी',
      englishName: 'Hindi',
      subtext: 'आवाज द्वारा फसल रोग पहचान व दवा सलाह',
      sampleGreeting: 'नमस्ते! एग्रीनोवा फसल सुरक्षा ऐप में आपका स्वागत है।',
    },
    {
      code: 'en',
      nativeName: 'English',
      englishName: 'English',
      subtext: 'Voice-guided crop diagnosis & dosage',
      sampleGreeting: 'Welcome to Agrinova AI. Your smart crop health companion.',
    },
  ];

  const playVoiceGreeting = (greeting: string, lang: Language, e: React.MouseEvent) => {
    e.stopPropagation();
    audioService.speak(greeting, lang);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-agri-cream via-agri-sand to-agri-cream">
      {/* Brand Hero Header */}
      <div className="text-center pt-4 pb-2">
        <div className="w-16 h-16 mx-auto mb-4 bg-agri-deep rounded-3xl p-3.5 shadow-elevated flex items-center justify-center ring-4 ring-agri-sprout/30">
          <svg viewBox="0 0 24 24" className="w-full h-full fill-agri-sprout">
            <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.6 8.4C6.2 19.3 6 18.2 6 17c0-4.4 3.6-8 8-8s8 3.6 8 8c0 1.2-.2 2.3-.6 3.4C20.2 18.6 22 15.5 22 12c0-5.5-4.5-10-10-10z" />
          </svg>
        </div>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-agri-sprout/20 text-agri-deep text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-agri-forest" />
          <span>AGRINOVA AI</span>
        </div>

        <h2 className="text-2xl font-black text-agri-charcoal tracking-tight">
          {t.selectLanguage}
        </h2>
        <p className="text-xs text-agri-muted mt-1 px-4">
          {t.selectLanguageSubtitle}
        </p>
      </div>

      {/* Language Selection Cards */}
      <div className="space-y-3.5 my-auto py-4">
        {languageOptions.map((opt) => {
          const isSelected = selectedLanguage === opt.code;
          return (
            <div
              key={opt.code}
              onClick={() => onSelectLanguage(opt.code)}
              className={`relative cursor-pointer rounded-3xl p-4 transition-all duration-200 flex items-center justify-between border-2 ${
                isSelected
                  ? 'bg-white border-agri-forest shadow-elevated ring-4 ring-agri-sprout/20 scale-[1.01]'
                  : 'bg-white/80 border-agri-sand hover:border-agri-sprout/60 shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-lg transition-colors ${
                    isSelected
                      ? 'bg-agri-forest text-white'
                      : 'bg-agri-pale/60 text-agri-deep'
                  }`}
                >
                  {opt.code === 'ta' ? 'த' : opt.code === 'hi' ? 'अ' : 'A'}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-black text-agri-charcoal">
                      {opt.nativeName}
                    </span>
                    {opt.code !== 'en' && (
                      <span className="text-xs text-agri-muted font-medium">
                        ({opt.englishName})
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-agri-muted mt-0.5">
                    {opt.subtext}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Audio Sample Button */}
                <button
                  type="button"
                  onClick={(e) => playVoiceGreeting(opt.sampleGreeting, opt.code, e)}
                  className="p-2 rounded-xl bg-agri-sand hover:bg-agri-pale text-agri-forest transition-colors"
                  title="Hear Voice Preview"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                {/* Radio selection checkmark */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-agri-forest text-white'
                      : 'border-2 border-agri-sand'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue Action */}
      <div className="pt-2">
        <button
          onClick={onContinue}
          className="w-full py-4 rounded-2xl bg-agri-deep hover:bg-agri-forest active:scale-[0.98] text-white font-bold text-base flex items-center justify-center space-x-2 shadow-elevated transition-all"
        >
          <span>{t.continueBtn}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-[11px] text-center text-agri-muted mt-3">
          {selectedLanguage === 'ta'
            ? 'மொழியை எப்போது வேண்டுமானாலும் அமைப்புகளில் மாற்றலாம்'
            : selectedLanguage === 'hi'
            ? 'भाषा को कभी भी सेटिंग्स में बदला जा सकता है'
            : 'You can change the language anytime in settings'}
        </p>
      </div>
    </div>
  );
};
