import React, { useState } from 'react';
import { 
  Globe, 
  Download, 
  CheckCircle2, 
  PhoneCall, 
  Sparkles, 
  Building2 
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { storageService } from '../services/storageService';

interface SettingsScreenProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const t = translations[currentLanguage];
  const [offlineDownloaded, setOfflineDownloaded] = useState<boolean>(
    storageService.isOfflinePackDownloaded()
  );
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPack = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setOfflineDownloaded(true);
      storageService.setOfflinePackDownloaded(true);
    }, 1800);
  };

  const languages: { code: Language; label: string; sub: string }[] = [
    { code: 'ta', label: 'தமிழ்', sub: 'Tamil' },
    { code: 'hi', label: 'हिन्दी', sub: 'Hindi' },
    { code: 'en', label: 'English', sub: 'English' },
  ];

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 pb-12">
      {/* Heading */}
      <div>
        <h2 className="text-xl font-black text-agri-charcoal tracking-tight">
          {t.settings.title}
        </h2>
        <p className="text-xs text-agri-muted mt-0.5">
          {currentLanguage === 'ta'
            ? 'மொழி மற்றும் ஆஃப்லைன் அமைப்புகளை நிர்வகிக்கவும்'
            : currentLanguage === 'hi'
            ? 'भाषा एवं ऑफ़लाइन मॉडल सेटिंग्स प्रबंधित करें'
            : 'Manage app language, offline AI models & helpline'}
        </p>
      </div>

      {/* Language Selector Card */}
      <div className="bg-white rounded-3xl p-5 border border-agri-sand shadow-soft space-y-3">
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-agri-forest" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-agri-charcoal">
            {t.settings.languageHeading}
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {languages.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={`py-3 px-2 rounded-2xl flex flex-col items-center transition-all border ${
                  isSelected
                    ? 'bg-agri-deep text-white border-agri-deep shadow-soft ring-2 ring-agri-sprout'
                    : 'bg-white text-agri-charcoal hover:bg-agri-sand/50 border-agri-sand'
                }`}
              >
                <span className="text-sm font-bold">{lang.label}</span>
                <span className="text-[10px] opacity-75">{lang.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Offline Diagnostic Packs Card */}
      <div className="bg-white rounded-3xl p-5 border border-agri-sand shadow-soft space-y-3">
        <div className="flex items-center space-x-2">
          <Download className="w-5 h-5 text-agri-forest" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-agri-charcoal">
            {t.settings.offlinePacksHeading}
          </h3>
        </div>

        <p className="text-xs text-agri-charcoal/80 leading-relaxed">
          {t.settings.offlinePacksDesc}
        </p>

        {offlineDownloaded ? (
          <div className="bg-emerald-50 rounded-2xl p-3.5 flex items-center justify-between border border-emerald-200 text-emerald-800">
            <div className="flex items-center space-x-2 text-xs font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{t.settings.downloaded}</span>
            </div>
            <span className="text-[10px] bg-emerald-200/60 px-2 py-0.5 rounded-full font-bold">
              v1.0 (14 MB)
            </span>
          </div>
        ) : (
          <button
            onClick={handleDownloadPack}
            disabled={downloading}
            className="w-full py-3 rounded-2xl bg-agri-forest hover:bg-agri-deep active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-soft transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? t.settings.downloading : t.settings.downloadPack}</span>
          </button>
        )}
      </div>

      {/* Kisan Direct Support & Emergency Contacts Card */}
      <div className="bg-gradient-to-br from-[#1b3d2b] to-agri-deep text-white rounded-3xl p-5 shadow-elevated space-y-4">
        <div className="flex items-center space-x-2">
          <PhoneCall className="w-5 h-5 text-agri-sprout" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-agri-pale">
            {t.settings.supportHeading}
          </h3>
        </div>

        {/* Kisan Call Centre Toll Free */}
        <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-white">
              {t.settings.kisanCallCenter}
            </h4>
            <p className="text-[11px] text-agri-gold font-bold mt-0.5">
              {t.settings.kisanTollFree}
            </p>
          </div>
          <a
            href="tel:18001801551"
            className="px-3 py-1.5 rounded-xl bg-agri-sprout text-agri-deep text-xs font-black flex items-center space-x-1 shadow-md hover:bg-white active:scale-95 transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{currentLanguage === 'ta' ? 'அழைக்க' : currentLanguage === 'hi' ? 'कॉल करें' : 'Call'}</span>
          </a>
        </div>

        {/* Krishi Vigyan Kendra (KVK) Info */}
        <div className="flex items-start space-x-2.5 text-xs text-agri-pale">
          <Building2 className="w-4 h-4 text-agri-sprout shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white">{t.settings.kvkSupport}</span>
            <p className="text-[11px] text-white/80 mt-0.5">
              {t.settings.kvkDesc}
            </p>
          </div>
        </div>
      </div>

      {/* App Footer Details */}
      <div className="text-center pt-2 space-y-1">
        <div className="inline-flex items-center space-x-1 text-agri-forest text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-agri-sprout" />
          <span>Agrinova AI</span>
        </div>
        <p className="text-[11px] text-agri-muted">
          {t.settings.appVersion} • Built for Indian Agriculture
        </p>
      </div>
    </div>
  );
};
