import { Language } from '../types';

class AudioService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(
    text: string, 
    lang: Language, 
    onStart?: () => void, 
    onEnd?: () => void,
    onError?: (e: any) => void
  ): boolean {
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported on this browser/platform.');
      if (onError) onError('Not supported');
      return false;
    }

    // Cancel any active audio
    this.stop();

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;

      // Select voice based on language code
      const langCodes: Record<Language, string> = {
        ta: 'ta-IN',
        hi: 'hi-IN',
        en: 'en-IN'
      };

      utterance.lang = langCodes[lang] || 'en-US';
      utterance.rate = 0.92; // slightly slower, clear tone for agricultural terminology
      utterance.pitch = 1.0;

      // Try to find matching voice
      const voices = this.synth.getVoices();
      const targetPrefix = lang === 'ta' ? 'ta' : lang === 'hi' ? 'hi' : 'en';
      const matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(targetPrefix));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onstart = () => {
        if (onStart) onStart();
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        console.warn('Speech error:', e);
        this.currentUtterance = null;
        if (onError) onError(e);
      };

      this.synth.speak(utterance);
      return true;
    } catch (err) {
      console.error('Failed to trigger speech synthesis:', err);
      if (onError) onError(err);
      return false;
    }
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return this.synth ? (this.synth.speaking || this.currentUtterance !== null) : false;
  }
}

export const audioService = new AudioService();
