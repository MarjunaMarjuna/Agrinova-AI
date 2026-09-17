import React from 'react';
import { Home, Camera, Clock, HelpCircle } from 'lucide-react';
import { Screen, Language } from '../../types';

interface BottomNavProps {
  currentScreen: Screen;
  currentLanguage: Language;
  onNavigate: (screen: Screen) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  currentLanguage,
  onNavigate,
}) => {
  // Don't show bottom nav on onboarding or live camera view
  if (currentScreen === 'language' || currentScreen === 'analyzing') {
    return null;
  }

  return (
    <nav className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-agri-sand px-3 py-2 flex items-center justify-around shadow-elevated">
      {/* Home Button */}
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
          currentScreen === 'home'
            ? 'text-agri-deep font-bold scale-105'
            : 'text-agri-muted hover:text-agri-forest font-medium'
        }`}
      >
        <Home className={`w-5 h-5 ${currentScreen === 'home' ? 'text-agri-deep stroke-[2.5]' : ''}`} />
        <span className="text-[11px] mt-1">
          {currentLanguage === 'ta' ? 'முகப்பு' : currentLanguage === 'hi' ? 'होम' : 'Home'}
        </span>
      </button>

      {/* Hero Central Scan Button */}
      <button
        onClick={() => onNavigate('scan')}
        className="relative -top-5 flex flex-col items-center group"
      >
        <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-glow transition-all duration-300 ${
          currentScreen === 'scan'
            ? 'bg-agri-forest text-white scale-110 ring-4 ring-agri-sprout/40'
            : 'bg-agri-deep text-white group-hover:scale-105 group-active:scale-95 ring-4 ring-agri-cream'
        }`}>
          <Camera className="w-7 h-7" />
        </div>
        <span className="text-[11px] font-bold text-agri-deep mt-0.5 tracking-tight">
          {currentLanguage === 'ta' ? 'இலை ஸ்கேன்' : currentLanguage === 'hi' ? 'स्कैन करें' : 'Scan Leaf'}
        </span>
      </button>

      {/* History Button */}
      <button
        onClick={() => onNavigate('history')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
          currentScreen === 'history'
            ? 'text-agri-deep font-bold scale-105'
            : 'text-agri-muted hover:text-agri-forest font-medium'
        }`}
      >
        <Clock className={`w-5 h-5 ${currentScreen === 'history' ? 'text-agri-deep stroke-[2.5]' : ''}`} />
        <span className="text-[11px] mt-1">
          {currentLanguage === 'ta' ? 'பதிவேடு' : currentLanguage === 'hi' ? 'डायरी' : 'History'}
        </span>
      </button>

      {/* Settings / Kisan Help Button */}
      <button
        onClick={() => onNavigate('settings')}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
          currentScreen === 'settings'
            ? 'text-agri-deep font-bold scale-105'
            : 'text-agri-muted hover:text-agri-forest font-medium'
        }`}
      >
        <HelpCircle className={`w-5 h-5 ${currentScreen === 'settings' ? 'text-agri-deep stroke-[2.5]' : ''}`} />
        <span className="text-[11px] mt-1">
          {currentLanguage === 'ta' ? 'உதவி' : currentLanguage === 'hi' ? 'सहायता' : 'Kisan Help'}
        </span>
      </button>
    </nav>
  );
};
