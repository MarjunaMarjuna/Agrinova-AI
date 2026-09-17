import React, { useState } from 'react';
import { Calculator, Beaker, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface DosageCalculatorProps {
  chemicalName: string;
  dosePerLiterText: string;
  defaultDosePerLiterValue?: number; // in grams or ml
  unit?: 'g' | 'ml';
  language: Language;
}

export const DosageCalculator: React.FC<DosageCalculatorProps> = ({
  chemicalName,
  dosePerLiterText,
  defaultDosePerLiterValue = 2.5,
  unit = 'g',
  language,
}) => {
  const [tankCapacity, setTankCapacity] = useState<number>(16); // 16L standard knapsack tank
  const t = translations[language];

  const quickSizes = [8, 12, 16, 20];
  const calculatedTotal = (tankCapacity * defaultDosePerLiterValue).toFixed(1);

  return (
    <div className="bg-gradient-to-br from-white to-agri-cream rounded-3xl p-5 border border-agri-sand shadow-soft my-4">
      <div className="flex items-center space-x-2.5 mb-2">
        <div className="p-2 rounded-xl bg-agri-forest text-white">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-agri-charcoal">
            {t.treatment.dosageCalculatorTitle}
          </h4>
          <p className="text-[11px] text-agri-muted">
            {t.treatment.dosageCalculatorDesc}
          </p>
        </div>
      </div>

      <div className="mt-3 bg-agri-pale/30 rounded-2xl p-3 border border-agri-sprout/20">
        <div className="flex justify-between items-center text-xs text-agri-forest font-semibold mb-2">
          <span>{t.treatment.tankCapacityLabel}:</span>
          <span className="text-base font-bold text-agri-deep">{tankCapacity} {t.treatment.tankUnits}</span>
        </div>

        {/* Quick buttons for common Indian sprayer tanks */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {quickSizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setTankCapacity(size)}
              className={`py-1.5 rounded-xl text-xs font-bold transition-all ${
                tankCapacity === size
                  ? 'bg-agri-deep text-white shadow-sm ring-2 ring-agri-sprout'
                  : 'bg-white text-agri-forest hover:bg-agri-pale/60 border border-agri-forest/10'
              }`}
            >
              {size} L
            </button>
          ))}
        </div>

        {/* Slider for custom tank capacity */}
        <input
          type="range"
          min="5"
          max="30"
          step="1"
          value={tankCapacity}
          onChange={(e) => setTankCapacity(Number(e.target.value))}
          className="w-full accent-agri-forest cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-agri-muted mt-1">
          <span>5 Litres (Hand spray)</span>
          <span>16 L (Standard Knapsack)</span>
          <span>30 L (Power pump)</span>
        </div>
      </div>

      {/* Calculated Result Card */}
      <div className="mt-4 bg-agri-deep text-white rounded-2xl p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Beaker className="w-6 h-6 text-agri-gold" />
            <div>
              <p className="text-[11px] text-agri-pale font-medium">
                {chemicalName} <span className="opacity-80">({dosePerLiterText})</span>
              </p>
              <p className="text-xs text-white/80">
                {t.treatment.calculatedDose}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-agri-gold tracking-tight">
              {calculatedTotal}
            </span>
            <span className="text-sm font-bold text-agri-pale ml-1">{unit}</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-white/15 flex items-start space-x-2 text-xs text-agri-pale">
          <CheckCircle2 className="w-4 h-4 text-agri-sprout shrink-0 mt-0.5" />
          <p>
            {language === 'ta'
              ? `ஒரு பக்கெட்டில் சிறிது நீரில் ${calculatedTotal} ${unit} மருந்தை நன்கு கரைத்து, பின்னர் ${tankCapacity} லிட்டர் டேங்க்கில் ஊற்றி முழுமையாக கலக்கவும்.`
              : language === 'hi'
              ? `एक बाल्टी में थोड़े पानी में ${calculatedTotal} ${unit} दवा को घोलें, फिर इसे ${tankCapacity} लीटर की टंकी में भरकर अच्छी तरह मिलाएं।`
              : `Dissolve ${calculatedTotal} ${unit} first in a small bucket of water, then pour into the ${tankCapacity}L tank and stir well before spraying.`}
          </p>
        </div>
      </div>

      {/* Safety Alert */}
      <div className="mt-3 flex items-start space-x-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="font-medium text-[11px] leading-relaxed">
          {t.treatment.wearMaskAlert}
        </p>
      </div>
    </div>
  );
};
