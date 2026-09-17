import React, { useState } from 'react';
import { 
  Clock, 
  Leaf, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle2, 
  ShieldAlert, 
  Calendar 
} from 'lucide-react';
import { Language, ScanReport, CropId, Screen } from '../types';
import { translations } from '../i18n/translations';

interface HistoryScreenProps {
  language: Language;
  reports: ScanReport[];
  onSelectReport: (report: ScanReport) => void;
  onNavigate: (screen: Screen) => void;
  onReScan: (cropId: CropId) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  language,
  reports,
  onSelectReport,
  onNavigate,
  onReScan,
}) => {
  const t = translations[language];
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: t.history.allCrops },
    { id: 'tomato', label: t.crops.tomato },
    { id: 'rice', label: t.crops.rice },
    { id: 'cotton', label: t.crops.cotton },
    { id: 'potato', label: t.crops.potato },
  ];

  const filteredReports = reports.filter((r) => {
    if (selectedFilter === 'all') return true;
    return r.cropId === selectedFilter;
  });

  return (
    <div className="flex-1 flex flex-col p-4 space-y-4 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-agri-charcoal tracking-tight flex items-center gap-2">
          <Clock className="w-5 h-5 text-agri-forest" />
          {t.history.title}
        </h2>
        <p className="text-xs text-agri-muted mt-0.5">
          {language === 'ta'
            ? 'உங்கள் வயலின் கடந்தகால நோய் வரலாற்றைக் கண்காணித்து நோய்களைக் கட்டுப்படுத்துங்கள்'
            : language === 'hi'
            ? 'अपने खेत के पुराने रोग रिकॉर्ड देखें और सुधार की जांच करें'
            : 'Track crop recovery progress and historical disease patterns'}
        </p>
      </div>

      {/* 7-Day Follow-Up Scan Reminder Alert Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-3xl p-4 shadow-elevated flex items-center justify-between">
        <div className="max-w-[75%]">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full inline-block mb-1">
            {t.common.followUpDue}
          </span>
          <h4 className="text-xs font-bold leading-tight">
            {t.history.rescanReminder}
          </h4>
        </div>
        <button
          onClick={() => onReScan('tomato')}
          className="p-2.5 rounded-2xl bg-white text-amber-800 shadow-md active:scale-95 transition-all"
          title={t.common.reScanCrop}
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {filterOptions.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              selectedFilter === filter.id
                ? 'bg-agri-deep text-white shadow-sm'
                : 'bg-white text-agri-muted hover:text-agri-deep border border-agri-sand'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Reports Feed */}
      {filteredReports.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center my-auto bg-white rounded-3xl border border-agri-sand shadow-soft">
          <Leaf className="w-12 h-12 text-agri-sprout opacity-60 mb-3" />
          <h3 className="text-sm font-bold text-agri-charcoal">
            {t.history.noScansTitle}
          </h3>
          <p className="text-xs text-agri-muted mt-1 max-w-xs">
            {t.history.noScansDesc}
          </p>
          <button
            onClick={() => onNavigate('scan')}
            className="mt-4 px-4 py-2.5 rounded-xl bg-agri-deep text-white text-xs font-bold shadow-soft active:scale-95 transition-all"
          >
            {t.history.startScanning}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              onClick={() => onSelectReport(report)}
              className="cursor-pointer bg-white rounded-3xl p-4 border border-agri-sand hover:border-agri-forest/30 shadow-soft transition-all active:scale-[0.99] flex items-center justify-between"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-14 h-14 rounded-2xl bg-[#1a2d23] overflow-hidden shrink-0 border border-agri-sand/60">
                  <img
                    src={report.imageUri}
                    alt={report.disease.name[language]}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <span className="text-[10px] font-bold text-agri-forest uppercase tracking-wider">
                    {t.crops[report.cropId]}
                  </span>
                  <h4 className="text-xs sm:text-sm font-black text-agri-charcoal mt-0.5">
                    {report.disease.name[language]}
                  </h4>

                  <div className="flex items-center space-x-2 mt-1 text-[11px] text-agri-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(report.timestamp).toLocaleDateString(
                        language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN',
                        { day: 'numeric', month: 'short', year: 'numeric' }
                      )}
                    </span>
                    <span>•</span>
                    <span className="font-bold text-agri-deep">
                      {report.disease.confidence}% {language === 'ta' ? 'பொருத்தம்' : language === 'hi' ? 'सटीक' : 'match'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-1">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    report.status === 'resolved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : report.status === 'treating'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {report.status === 'resolved' ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {t.common.resolved}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" />
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
  );
};
