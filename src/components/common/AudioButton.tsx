import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Language } from '../../types';
import { audioService } from '../../services/audioService';
import { translations } from '../../i18n/translations';

interface AudioButtonProps {
  textToSpeak: string;
  language: Language;
  className?: string;
  variant?: 'primary' | 'compact';
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  textToSpeak,
  language,
  className = '',
  variant = 'primary',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const t = translations[language];

  useEffect(() => {
    return () => {
      audioService.stop();
    };
  }, []);

  const handleToggle = () => {
    if (isPlaying) {
      audioService.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const success = audioService.speak(
        textToSpeak,
        language,
        () => setIsPlaying(true),
        () => setIsPlaying(false),
        () => setIsPlaying(false)
      );
      if (!success) {
        setIsPlaying(false);
      }
    }
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleToggle}
        className={`p-2 rounded-full transition-all active:scale-95 ${
          isPlaying
            ? 'bg-amber-500 text-white animate-pulse shadow-md'
            : 'bg-agri-sprout/20 text-agri-deep hover:bg-agri-sprout/30'
        } ${className}`}
        title={isPlaying ? t.common.stopAudio : t.common.listenAudio}
      >
        {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold transition-all shadow-soft active:scale-[0.99] ${
        isPlaying
          ? 'bg-amber-500 text-white ring-4 ring-amber-200'
          : 'bg-agri-deep text-white hover:bg-agri-forest'
      } ${className}`}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-xl ${isPlaying ? 'bg-white/20' : 'bg-agri-sprout/20 text-agri-sprout'}`}>
          {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </div>
        <div className="text-left">
          <p className="text-sm leading-tight">
            {isPlaying ? t.common.stopAudio : t.common.listenAudio}
          </p>
          <p className="text-[11px] font-normal opacity-80">
            {isPlaying ? t.common.playingAudio : (language === 'ta' ? 'குரல் வழியே கேளுங்கள்' : language === 'hi' ? 'आवाज में सुनें' : 'Tap to hear read aloud')}
          </p>
        </div>
      </div>

      {isPlaying && (
        <div className="flex items-center space-x-1">
          <span className="w-1 h-4 bg-white rounded-full animate-bounce"></span>
          <span className="w-1 h-6 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-1 h-3 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
        </div>
      )}
    </button>
  );
};
