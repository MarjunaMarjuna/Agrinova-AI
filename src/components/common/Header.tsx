import React from 'react';
import { ChevronLeft, Globe, Wifi, WifiOff } from 'lucide-react';
import { Language, Screen } from '../../types';
import { translations } from '../../i18n/translations';

interface HeaderProps {
  currentScreen: Screen;
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
  onLanguageToggle: () => void;
  isOffline?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  currentLanguage,
  onNavigate,
  onLanguageToggle,
  isOffline = false,
}) => {
  const t = translations[currentLanguage];

  const getScreenTitle = (): string => {
    switch (currentScreen) {
      case 'home':
        return t.appTitle;
      case 'scan':
        return t.scanner.title;
      case 'analyzing':
        return t.analyzing.title;
      case 'diagnosis':
        return t.diagnosis.title;
      case 'treatment':
        return t.treatment.title;
      case 'history':
        return t.history.title;
      case 'settings':
        return t.settings.title;
      default:
        return t.appTitle;
    }
  };

  const showBackButton = currentScreen !== 'home' && currentScreen !== 'language';

  return (
    <header className="sticky top-0 z-40 bg-agri-deep/95 backdrop-blur-md text-white border-b border-white/10 px-4 py-3 flex items-center justify-between shadow-soft">
      <div className="flex items-center space-x-2">
        {showBackButton && (
          <button
            onClick={() => onNavigate('home')}
            className="p-1.5 -ml-1 rounded-full hover:bg-white/10 active:scale-95 transition-all text-agri-pale"
            title={t.common.back}
            aria-label={t.common.back}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <div>
          <h1 className="text-base sm:text-lg font-bold tracking-wide flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-agri-sprout inline-block animate-pulse"></span>
            {getScreenTitle()}
          </h1>
          {currentScreen === 'home' && (
            <p className="text-[11px] text-agri-pale/80 font-medium -mt-0.5">
              {t.tagline}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Offline / Online Pill */}
        <div 
          className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider ${
            isOffline 
              ? 'bg-amber-900/60 text-amber-200 border border-amber-700/40' 
              : 'bg-agri-forest/80 text-agri-pale border border-agri-sprout/30'
          }`}
          title={isOffline ? t.common.offline : t.common.online}
        >
          {isOffline ? <WifiOff className="w-3 h-3 text-amber-300" /> : <Wifi className="w-3 h-3 text-agri-sprout" />}
          <span>{isOffline ? t.common.offline : t.common.online}</span>
        </div>

        {/* Language Switch Button */}
        <button
          onClick={onLanguageToggle}
          className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 active:scale-95 px-2.5 py-1 rounded-full text-xs font-semibold text-white border border-white/15 transition-all"
          title={t.selectLanguage}
          aria-label={t.selectLanguage}
        >
          <Globe className="w-3.5 h-3.5 text-agri-gold" />
          <span className="uppercase">{currentLanguage}</span>
        </button>
      </div>
    </header>
  );
};
