import React, { useState } from 'react';
import { Smartphone, Monitor, Wifi, BatteryCharging } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const [isMobileFramed, setIsMobileFramed] = useState(true);

  return (
    <div className="min-h-screen bg-[#0d1a12] py-2 sm:py-6 px-1 sm:px-4 flex flex-col items-center justify-center">
      {/* Top Frame Mode Toggle Toolbar for testing and presentation */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-[430px] mb-3 px-3 py-1.5 rounded-full bg-agri-deep/80 text-agri-pale border border-white/10 text-xs backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-agri-sprout"></span>
          <span className="font-semibold text-[11px] tracking-wide text-white">Agrinova AI Mobile UI</span>
        </div>
        <button
          onClick={() => setIsMobileFramed(!isMobileFramed)}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] transition-all"
        >
          {isMobileFramed ? (
            <>
              <Monitor className="w-3.5 h-3.5 text-agri-sprout" />
              <span>Full View</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-agri-sprout" />
              <span>Mobile Frame</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container */}
      <div
        className={`w-full transition-all duration-300 relative flex flex-col bg-agri-cream text-agri-charcoal overflow-hidden shadow-2xl ${
          isMobileFramed
            ? 'max-w-[430px] min-h-[850px] max-h-[920px] rounded-[42px] border-[8px] border-[#1b2a21] ring-1 ring-white/20'
            : 'max-w-xl min-h-screen sm:rounded-3xl'
        }`}
      >
        {/* Simulated Mobile Status Bar (Clock, 4G, Battery) */}
        {isMobileFramed && (
          <div className="bg-agri-deep text-white px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-semibold select-none z-50">
            <span>09:41</span>
            {/* Dynamic Island / Notch */}
            <div className="w-24 h-4 bg-black/40 rounded-full flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500/80 mr-1.5"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-800"></span>
            </div>
            <div className="flex items-center space-x-1.5 text-agri-pale">
              <span className="text-[10px] font-bold">4G</span>
              <Wifi className="w-3 h-3" />
              <BatteryCharging className="w-3.5 h-3.5 text-agri-sprout" />
            </div>
          </div>
        )}

        {/* Dynamic Screen Viewport */}
        <div className="flex-1 flex flex-col overflow-y-auto relative">
          {children}
        </div>
      </div>
    </div>
  );
};
