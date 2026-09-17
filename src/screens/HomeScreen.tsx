import React from 'react';
import { 
  Camera, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  AlertTriangle, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  Leaf, 
  CheckCircle2, 
  ShieldAlert 
} from 'lucide-react';
import { Language, CropId, ScanReport, Screen, WeatherContext } from '../types';
import { translations } from '../i18n/translations';

interface HomeScreenProps {
  language: Language;
  weather: WeatherContext;
  onNavigate: (screen: Screen) => void;
  onSelectCropForScan: (cropId: CropId) => void;
  recentReports: ScanReport[];
  onSelectReport: (report: ScanReport) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language,
  weather,
  onNavigate,
  onSelectCropForScan,
  recentReports,
  onSelectReport,
}) => {
  const t = translations[language];

  const cropChips: { id: CropId; name: string; emoji: string }[] = [
    { id: 'tomato', name: t.crops.tomato, emoji: '🍅' },
    { id: 'rice', name: t.crops.rice, emoji: '🌾' },
    { id: 'cotton', name: t.crops.cotton, emoji: '🌱' },
    { id: 'potato', name: t.crops.potato, emoji: '🥔' },
    { id: 'chilli', name: t.crops.chilli, emoji: '🌶️' },
  ];

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 pb-8">
      {/* Farmer Greeting */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-xs font-semibold text-agri-forest flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-agri-sprout" />
            {t.home.greeting}
          </span>
          <h2 className="text-xl font-black text-agri-charcoal tracking-tight">
            {language === 'ta' ? 'இன்றைய பயிர் நலம்' : language === 'hi' ? 'आज का फसल स्वास्थ्य' : "Today's Crop Health"}
          </h2>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-agri-forest to-agri-sprout flex items-center justify-center text-white font-bold shadow-soft">
          🌾
        </div>
      </div>

      {/* Agro-Weather & Disease Vulnerability Monitor Card */}
      <div className="bg-gradient-to-br from-agri-deep via-agri-forest to-[#143d2c] text-white rounded-3xl p-4.5 shadow-elevated relative overflow-hidden">
        {/* Subtle background circle decoration */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none"></div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <CloudRain className="w-4 h-4 text-agri-sprout" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-agri-pale">
              {t.home.weatherTitle}
            </h3>
          </div>
          <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full font-medium text-white/90">
            Open-Meteo {language === 'ta' ? 'நேரலை' : language === 'hi' ? 'लाइव' : 'Live'}
          </span>
        </div>

        {/* Weather Metrics */}
        <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/10 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1 text-agri-gold">
              <Thermometer className="w-3.5 h-3.5" />
              <span className="text-base font-black">{weather.temp}°C</span>
            </div>
            <span className="text-[10px] text-white/70">
              {language === 'ta' ? 'வெப்பம்' : language === 'hi' ? 'तापमान' : 'Temp'}
            </span>
          </div>

          <div className="flex flex-col items-center border-x border-white/10">
            <div className="flex items-center space-x-1 text-agri-sprout">
              <Droplets className="w-3.5 h-3.5" />
              <span className="text-base font-black">{weather.humidity}%</span>
            </div>
            <span className="text-[10px] text-white/70">
              {t.home.humidity}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1 text-amber-300">
              <CloudRain className="w-3.5 h-3.5" />
              <span className="text-base font-black">{weather.rainfallProb}%</span>
            </div>
            <span className="text-[10px] text-white/70">
              {t.home.rainProb}
            </span>
          </div>
        </div>

        {/* Dynamic High-Risk Spore Warning */}
        <div className="mt-3 flex items-start space-x-2.5 bg-amber-500/20 rounded-2xl p-2.5 border border-amber-400/30 text-amber-100 text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
          <p className="font-medium text-[11px] leading-relaxed">
            {weather.riskAlert?.[language] || t.home.diseaseRiskAlert}
          </p>
        </div>
      </div>

      {/* Hero Scan Leaf Action Card */}
      <div 
        onClick={() => onNavigate('scan')}
        className="cursor-pointer group relative bg-gradient-to-r from-agri-forest to-agri-deep rounded-3xl p-5 text-white shadow-elevated hover:shadow-glow transition-all active:scale-[0.99] border border-agri-sprout/30"
      >
        <div className="flex items-center justify-between">
          <div className="max-w-[70%]">
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-agri-sprout/20 text-agri-sprout text-[10px] font-bold uppercase tracking-wider mb-2">
              <Camera className="w-3 h-3" />
              <span>{language === 'ta' ? 'உடனடி கேமரா' : language === 'hi' ? 'तुरंत कैमरा' : 'Instant AI Scan'}</span>
            </span>
            <h3 className="text-xl font-black tracking-tight text-white group-hover:text-agri-pale transition-colors">
              {t.home.scanHeroTitle}
            </h3>
            <p className="text-xs text-white/80 mt-1 leading-relaxed">
              {t.home.scanHeroSubtitle}
            </p>
          </div>

          {/* Animated Camera Icon Circle */}
          <div className="w-16 h-16 rounded-2xl bg-agri-sprout text-agri-deep flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <Camera className="w-8 h-8" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-agri-sprout">
          <span>{language === 'ta' ? 'இப்போதே ஸ்கேன் தொடங்குக' : language === 'hi' ? 'अभी स्कैन शुरू करें' : 'Start Scanning Now'}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Quick Crop Selector Chips */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-agri-forest">
            {t.home.quickCropSelect}
          </h4>
          <span className="text-[11px] text-agri-muted">
            {language === 'ta' ? 'நேரடி தேர்வு' : language === 'hi' ? 'सीधा चयन' : 'Quick Filter'}
          </span>
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {cropChips.map((crop) => (
            <button
              key={crop.id}
              onClick={() => {
                onSelectCropForScan(crop.id);
                onNavigate('scan');
              }}
              className="flex items-center space-x-2 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-agri-pale/40 text-agri-charcoal border border-agri-sand shadow-soft whitespace-nowrap active:scale-95 transition-all text-xs font-bold"
            >
              <span className="text-base">{crop.emoji}</span>
              <span>{crop.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Daily Agronomist Tip Card */}
      <div className="bg-white rounded-3xl p-4 border border-agri-sand shadow-soft flex items-start space-x-3">
        <div className="p-2.5 rounded-2xl bg-amber-500/15 text-amber-800 shrink-0">
          <Leaf className="w-5 h-5 text-agri-forest" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-agri-deep uppercase tracking-wider">
            {t.home.todayAdvice}
          </h4>
          <p className="text-xs text-agri-charcoal/80 mt-1 leading-relaxed">
            {t.home.adviceContent}
          </p>
        </div>
      </div>

      {/* Recent Scans Section */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-agri-forest flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {t.home.recentScans}
          </h4>
          <button
            onClick={() => onNavigate('history')}
            className="text-[11px] font-bold text-agri-forest hover:text-agri-deep"
          >
            {t.home.viewAllHistory}
          </button>
        </div>

        {recentReports.length === 0 ? (
          <div className="bg-white/80 rounded-2xl p-6 text-center border border-agri-sand">
            <Leaf className="w-8 h-8 text-agri-sprout mx-auto mb-2 opacity-60" />
            <p className="text-xs font-semibold text-agri-charcoal">
              {t.history.noScansTitle}
            </p>
            <p className="text-[11px] text-agri-muted mt-1">
              {t.history.noScansDesc}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {recentReports.slice(0, 2).map((report) => (
              <div
                key={report.id}
                onClick={() => onSelectReport(report)}
                className="cursor-pointer bg-white rounded-2xl p-3 border border-agri-sand hover:border-agri-forest/30 shadow-soft flex items-center justify-between transition-all active:scale-[0.99]"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-agri-dark/10 overflow-hidden shrink-0 border border-agri-sand">
                    <img
                      src={report.imageUri}
                      alt="Crop leaf"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-agri-charcoal">
                      {report.disease.name[language]}
                    </h5>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-[10px] text-agri-muted font-medium">
                        {new Date(report.timestamp).toLocaleDateString(
                          language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN',
                          { month: 'short', day: 'numeric' }
                        )}
                      </span>
                      <span className="text-[10px] font-bold text-agri-forest">
                        {report.disease.confidence}% {language === 'ta' ? 'துல்லியம்' : language === 'hi' ? 'सटीक' : 'match'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      report.status === 'resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : report.status === 'treating'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {report.status === 'resolved' ? (
                      <span className="flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        {t.common.resolved}
                      </span>
                    ) : (
                      <span className="flex items-center gap-0.5">
                        <ShieldAlert className="w-2.5 h-2.5" />
                        {t.common.treating}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 text-agri-muted" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
