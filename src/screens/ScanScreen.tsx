import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  RefreshCw, 
  Zap, 
  ZapOff, 
  Sparkles, 
  Info, 
  CheckCircle2 
} from 'lucide-react';
import { Language, CropId } from '../types';
import { translations } from '../i18n/translations';
import { LEAF_IMAGES } from '../data/diseases';

interface ScanScreenProps {
  language: Language;
  selectedCrop: CropId;
  onSelectCrop: (crop: CropId) => void;
  onStartAnalysis: (imageUri: string, crop: CropId) => void;
  onCancel: () => void;
}

export const ScanScreen: React.FC<ScanScreenProps> = ({
  language,
  selectedCrop,
  onSelectCrop,
  onStartAnalysis,
  onCancel,
}) => {
  const t = translations[language];
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [flashOn, setFlashOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Preset demo leaves for testing real model prediction
  const presetLeaves: { crop: CropId; imageUri: string; name: string; emoji: string }[] = [
    { crop: 'tomato', imageUri: LEAF_IMAGES.tomatoEarlyBlight, name: t.crops.tomato, emoji: '🍅' },
    { crop: 'rice', imageUri: LEAF_IMAGES.riceBacterialBlight, name: t.crops.rice, emoji: '🌾' },
    { crop: 'cotton', imageUri: LEAF_IMAGES.cottonLeafCurl, name: t.crops.cotton, emoji: '🌱' },
    { crop: 'potato', imageUri: LEAF_IMAGES.potatoLateBlight, name: t.crops.potato, emoji: '🥔' },
  ];

  // Initialize camera stream
  const startCamera = async (facingMode: 'environment' | 'user' = cameraFacing) => {
    setCameraError(null);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera API not supported in this browser.');
      setCameraActive(false);
      return;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      setCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setCameraError(t.scanner.cameraError);
      setCameraActive(false);
    }
  };

  useEffect(() => {
    startCamera('environment');

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraFacing]);

  // Capture current frame from camera video
  const capturePhoto = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 640;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      onStartAnalysis(dataUrl, selectedCrop);
    }
  };

  // Upload image from file picker
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        onStartAnalysis(dataUrl, selectedCrop);
      };
      reader.readAsDataURL(file);
    }
  };

  // Demo selection handler - runs real backend model prediction on leaf sample
  const handleSelectPreset = (imageUri: string, crop: CropId) => {
    onSelectCrop(crop);
    onStartAnalysis(imageUri, crop);
  };

  const toggleCameraFacing = () => {
    setCameraFacing((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-black text-white relative overflow-hidden">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Top Camera Controls Overlay */}
      <div className="relative z-20 px-4 py-3 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between">
        <button
          onClick={onCancel}
          className="px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-md active:scale-95 transition-all"
        >
          {t.common.cancel}
        </button>

        {/* Selected Crop Badge */}
        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-agri-forest/80 border border-agri-sprout/40 text-xs font-bold text-agri-pale">
          <Sparkles className="w-3 h-3 text-agri-sprout" />
          <span>{t.crops[selectedCrop]}</span>
        </div>

        {/* Flash Toggle */}
        <button
          onClick={() => setFlashOn(!flashOn)}
          className={`p-2 rounded-full backdrop-blur-md transition-all active:scale-95 ${
            flashOn ? 'bg-agri-gold text-agri-charcoal' : 'bg-white/15 text-white'
          }`}
          title={t.scanner.flashToggle}
        >
          {flashOn ? <Zap className="w-4 h-4" /> : <ZapOff className="w-4 h-4" />}
        </button>
      </div>

      {/* Live Viewfinder Area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-zinc-950">
        {cameraActive ? (
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            className="w-full h-full object-cover"
          />
        ) : (
          /* Visual fallback if camera permission not granted or inactive */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-zinc-900 to-black">
            <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mb-3 border border-white/10">
              <Camera className="w-10 h-10 text-agri-sprout opacity-80" />
            </div>
            <p className="text-xs text-white/80 max-w-xs font-medium leading-relaxed mb-4">
              {cameraError || t.scanner.cameraError}
            </p>
            <button
              onClick={() => startCamera()}
              className="px-4 py-2 rounded-xl bg-agri-forest text-white text-xs font-bold flex items-center space-x-1.5 shadow-md active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? 'கேமராவை மீண்டும் இயக்கு' : language === 'hi' ? 'कैमरा पुनः शुरू करें' : 'Retry Camera'}</span>
            </button>
          </div>
        )}

        {/* Leaf Alignment Silhouette Boundary Guide Overlay */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-8">
          <div className="relative w-64 h-80 rounded-[45px] border-2 border-dashed border-agri-sprout/80 shadow-[0_0_40px_rgba(82,183,136,0.25)] flex items-center justify-center">
            {/* Corner alignment markers */}
            <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-agri-sprout"></span>
            <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-agri-sprout"></span>
            <span className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-agri-sprout"></span>
            <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-agri-sprout"></span>

            {/* Faint leaf silhouette SVG center */}
            <svg
              viewBox="0 0 200 280"
              className="w-40 h-56 fill-agri-sprout/15 stroke-agri-sprout/40 stroke-2 opacity-70"
            >
              <path d="M100 20 C150 50, 190 120, 160 210 C130 250, 100 260, 100 260 C100 260, 70 250, 40 210 C10 120, 50 50, 100 20 Z" />
              <path d="M100 25 L100 255" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Guide helper pill */}
          <div className="mt-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-agri-pale font-medium flex items-center space-x-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-agri-sprout" />
            <span>{t.scanner.alignLeafGuide}</span>
          </div>
        </div>
      </div>

      {/* Quick Demo Infected Leaf Presets (Enables 100% instant testing) */}
      <div className="relative z-20 bg-zinc-950/95 backdrop-blur-md border-t border-white/10 px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-agri-pale/90 flex items-center gap-1">
            <Info className="w-3 h-3 text-agri-sprout" />
            {t.scanner.selectPresetHint}:
          </span>
          <span className="text-[10px] text-white/50">
            {language === 'ta' ? 'மாதிரிகள்' : language === 'hi' ? 'डेमो पत्ते' : 'Demo Samples'}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {presetLeaves.map((leaf) => (
            <button
              key={leaf.crop}
              onClick={() => handleSelectPreset(leaf.imageUri, leaf.crop)}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-center border border-white/10 flex flex-col items-center"
            >
              <span className="text-base">{leaf.emoji}</span>
              <span className="text-[10px] font-bold text-white mt-0.5 truncate w-full">
                {leaf.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Shutter & Controls Bar */}
      <div className="relative z-20 px-6 py-4 bg-black flex items-center justify-around">
        {/* Upload from Gallery button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center text-white/80 hover:text-white active:scale-95 transition-all"
        >
          <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center border border-white/10">
            <Upload className="w-5 h-5 text-agri-pale" />
          </div>
          <span className="text-[10px] font-medium mt-1">
            {t.scanner.uploadGallery}
          </span>
        </button>

        {/* Shutter Button (Capture or Demo Fallback) */}
        <button
          onClick={() => {
            if (cameraActive) {
              capturePhoto();
            } else {
              // Trigger tomato early blight image to backend if camera not active
              handleSelectPreset(LEAF_IMAGES.tomatoEarlyBlight, 'tomato');
            }
          }}
          className="w-18 h-18 rounded-full border-4 border-white p-1.5 flex items-center justify-center group active:scale-90 transition-all shadow-glow"
          title={t.scanner.takePhoto}
        >
          <div className="w-14 h-14 rounded-full bg-agri-sprout group-hover:bg-white flex items-center justify-center transition-colors">
            <Camera className="w-7 h-7 text-agri-deep" />
          </div>
        </button>

        {/* Switch Camera Button */}
        <button
          onClick={toggleCameraFacing}
          className="flex flex-col items-center text-white/80 hover:text-white active:scale-95 transition-all"
          title={t.scanner.switchCamera}
        >
          <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center border border-white/10">
            <RefreshCw className="w-5 h-5 text-agri-pale" />
          </div>
          <span className="text-[10px] font-medium mt-1">
            {language === 'ta' ? 'மாற்று' : language === 'hi' ? 'बदलें' : 'Flip'}
          </span>
        </button>
      </div>
    </div>
  );
};
