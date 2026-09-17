import React from 'react';
import { BoundingBox, Language } from '../../types';
import { Eye, EyeOff } from 'lucide-react';
import { translations } from '../../i18n/translations';

interface HeatmapOverlayProps {
  imageSrc: string;
  boundingBoxes: BoundingBox[];
  language: Language;
  showOverlay: boolean;
  onToggleOverlay: () => void;
}

export const HeatmapOverlay: React.FC<HeatmapOverlayProps> = ({
  imageSrc,
  boundingBoxes,
  language,
  showOverlay,
  onToggleOverlay,
}) => {
  const t = translations[language];

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-agri-dark/20 border border-agri-forest/20 shadow-elevated">
      {/* Leaf Image */}
      <div className="relative aspect-square w-full max-h-[320px] mx-auto flex items-center justify-center overflow-hidden bg-[#16291e]">
        <img
          src={imageSrc}
          alt="Analyzed crop leaf"
          className="w-full h-full object-contain filter drop-shadow-md"
        />

        {/* Explainable AI Bounding Box Overlays */}
        {showOverlay && (
          <div className="absolute inset-0 pointer-events-none">
            {boundingBoxes.map((box, idx) => (
              <div
                key={idx}
                style={{
                  left: `${box.x}%`,
                  top: `${box.y}%`,
                  width: `${box.width}%`,
                  height: `${box.height}%`,
                }}
                className="absolute border-2 border-agri-gold bg-agri-gold/20 rounded-lg shadow-glow animate-pulse"
              >
                <div className="absolute -top-7 left-0 whitespace-nowrap bg-agri-deep/90 text-agri-gold text-[10px] font-bold px-2 py-0.5 rounded shadow border border-agri-gold/40">
                  {box.label[language]}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Toggle Pill */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
        <button
          onClick={onToggleOverlay}
          className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 ${
            showOverlay
              ? 'bg-agri-gold text-agri-charcoal ring-2 ring-agri-gold/50'
              : 'bg-agri-deep/90 text-white hover:bg-agri-deep border border-white/20'
          }`}
        >
          {showOverlay ? <Eye className="w-4 h-4 text-agri-deep" /> : <EyeOff className="w-4 h-4 text-agri-pale" />}
          <span>{showOverlay ? t.diagnosis.heatmapToggleOn : t.diagnosis.heatmapToggleOff}</span>
        </button>

        <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full font-medium">
          {boundingBoxes.length} {language === 'ta' ? 'அறிகுறிகள்' : language === 'hi' ? 'लक्षण चिन्ह' : 'symptoms detected'}
        </span>
      </div>
    </div>
  );
};
