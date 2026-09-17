import { Language } from '../types';

export interface TranslationSchema {
  appTitle: string;
  tagline: string;
  selectLanguage: string;
  selectLanguageSubtitle: string;
  continueBtn: string;
  languages: {
    en: string;
    ta: string;
    hi: string;
  };
  common: {
    back: string;
    cancel: string;
    save: string;
    share: string;
    offline: string;
    online: string;
    healthy: string;
    active: string;
    treating: string;
    resolved: string;
    listenAudio: string;
    stopAudio: string;
    playingAudio: string;
    confidence: string;
    severity: string;
    affectedArea: string;
    shareWhatsapp: string;
    followUpDue: string;
    reScanCrop: string;
  };
  severities: {
    mild: string;
    moderate: string;
    critical: string;
  };
  crops: {
    tomato: string;
    rice: string;
    cotton: string;
    potato: string;
    chilli: string;
  };
  home: {
    greeting: string;
    weatherTitle: string;
    humidity: string;
    rainProb: string;
    diseaseRiskAlert: string;
    scanHeroTitle: string;
    scanHeroSubtitle: string;
    quickCropSelect: string;
    recentScans: string;
    viewAllHistory: string;
    todayAdvice: string;
    adviceContent: string;
  };
  scanner: {
    title: string;
    alignLeafGuide: string;
    holdSteadyTip: string;
    lightingGood: string;
    tooDarkAlert: string;
    takePhoto: string;
    uploadGallery: string;
    switchCamera: string;
    flashToggle: string;
    sampleLeaves: string;
    selectPresetHint: string;
    selectedCrop: string;
    cameraError: string;
  };
  analyzing: {
    title: string;
    step1: string;
    step2: string;
    step3: string;
    analyzingVoice: string;
  };
  diagnosis: {
    title: string;
    identifiedDisease: string;
    heatmapToggleOn: string;
    heatmapToggleOff: string;
    heatmapDesc: string;
    symptomsTitle: string;
    weatherRiskTitle: string;
    causeTitle: string;
    viewTreatmentPlan: string;
    reScan: string;
  };
  treatment: {
    title: string;
    tabOrganic: string;
    tabChemical: string;
    tabPrevention: string;
    dosageCalculatorTitle: string;
    dosageCalculatorDesc: string;
    tankCapacityLabel: string;
    tankUnits: string;
    calculatedDose: string;
    applicationMethod: string;
    safetyPrecautions: string;
    wearMaskAlert: string;
    withholdingPeriod: string;
    daysBeforeHarvest: string;
    saveToHistory: string;
    shareWithExpert: string;
  };
  history: {
    title: string;
    allCrops: string;
    noScansTitle: string;
    noScansDesc: string;
    startScanning: string;
    treatmentUnderway: string;
    rescanReminder: string;
  };
  settings: {
    title: string;
    languageHeading: string;
    offlinePacksHeading: string;
    offlinePacksDesc: string;
    downloaded: string;
    downloading: string;
    downloadPack: string;
    supportHeading: string;
    kisanCallCenter: string;
    kisanTollFree: string;
    callNow: string;
    kvkSupport: string;
    kvkDesc: string;
    aboutHeading: string;
    appVersion: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    appTitle: "Agrinova AI",
    tagline: "Smart Crop Disease Diagnosis & Care",
    selectLanguage: "Choose Your Language",
    selectLanguageSubtitle: "Select language to get vernacular audio & crop guides",
    continueBtn: "Continue",
    languages: {
      en: "English",
      ta: "தமிழ் (Tamil)",
      hi: "हिन्दी (Hindi)"
    },
    common: {
      back: "Back",
      cancel: "Cancel",
      save: "Save",
      share: "Share Report",
      offline: "Offline Ready",
      online: "Live Cloud AI",
      healthy: "Healthy",
      active: "Active Infection",
      treating: "Under Treatment",
      resolved: "Cured & Healthy",
      listenAudio: "Listen to Report",
      stopAudio: "Stop Voice",
      playingAudio: "Reading Aloud...",
      confidence: "AI Confidence",
      severity: "Severity Level",
      affectedArea: "Area Affected",
      shareWhatsapp: "Share on WhatsApp",
      followUpDue: "Follow-up due today",
      reScanCrop: "Re-scan Crop"
    },
    severities: {
      mild: "Mild (Early Stage)",
      moderate: "Moderate (Action Required)",
      critical: "Critical (Immediate Treatment)"
    },
    crops: {
      tomato: "Tomato",
      rice: "Paddy (Rice)",
      cotton: "Cotton",
      potato: "Potato",
      chilli: "Chilli"
    },
    home: {
      greeting: "Namaste, Farmer Friend",
      weatherTitle: "Agro-Weather Risk Monitor",
      humidity: "Humidity",
      rainProb: "Rain Risk",
      diseaseRiskAlert: "High humidity (>82%) today. Elevated risk of Fungal Blight & Leaf Spot in your field.",
      scanHeroTitle: "Scan Crop Leaf",
      scanHeroSubtitle: "Instant AI diagnosis, cause breakdown & treatment dosage",
      quickCropSelect: "Select Your Crop to Scan",
      recentScans: "Recent Crop Diagnoses",
      viewAllHistory: "View All Logbook",
      todayAdvice: "Agronomist's Daily Tip",
      adviceContent: "Always spray fungicides in early morning or after 4 PM to prevent rapid evaporation and leaf scorch."
    },
    scanner: {
      title: "Leaf Scanner",
      alignLeafGuide: "Align the diseased leaf inside the outline",
      holdSteadyTip: "Hold phone 15-20cm away in clear daylight",
      lightingGood: "Lighting optimal",
      tooDarkAlert: "Low light detected. Turn on flash or move into light.",
      takePhoto: "Capture Leaf",
      uploadGallery: "Upload from Phone",
      switchCamera: "Switch Camera",
      flashToggle: "Flash",
      sampleLeaves: "Or tap a sample infected leaf to test AI:",
      selectPresetHint: "Sample Diseased Leaves for Quick Demo",
      selectedCrop: "Scanning Crop",
      cameraError: "Camera permission denied or camera unavailable. You can upload a photo or use the sample leaves below."
    },
    analyzing: {
      title: "Analyzing Leaf...",
      step1: "Checking leaf surface & image quality...",
      step2: "Detecting lesions, fungal spots & color shifts...",
      step3: "Correlating with regional weather & humidity models...",
      analyzingVoice: "Agrinova AI is analyzing the leaf symptoms. Please hold on for a moment."
    },
    diagnosis: {
      title: "Diagnosis Report",
      identifiedDisease: "Detected Disease",
      heatmapToggleOn: "AI Symptom Heatmap: ON",
      heatmapToggleOff: "AI Symptom Heatmap: OFF",
      heatmapDesc: "Green/Red boundary boxes highlight exact fungal spore clusters detected by computer vision.",
      symptomsTitle: "Key Symptoms Spotted by AI",
      weatherRiskTitle: "Why it Happened (Weather Context)",
      causeTitle: "Pathogen & Spread Reason",
      viewTreatmentPlan: "View Treatment & Dosage Plan",
      reScan: "Scan Another Leaf"
    },
    treatment: {
      title: "Treatment & Advisory",
      tabOrganic: "Organic & Bio-Remedies",
      tabChemical: "Chemical Fungicides",
      tabPrevention: "Prevention & Farm Hygiene",
      dosageCalculatorTitle: "Knapsack Sprayer Dosage Calculator",
      dosageCalculatorDesc: "Enter your spray tank size to get the exact chemical quantity to dissolve in water.",
      tankCapacityLabel: "Sprayer Tank Size",
      tankUnits: "Litres",
      calculatedDose: "Required Chemical Quantity",
      applicationMethod: "Application Instructions",
      safetyPrecautions: "Safety Warnings",
      wearMaskAlert: "Always wear gloves and a mask during spraying. Spray with the wind direction, never against it.",
      withholdingPeriod: "Pre-Harvest Interval (Waiting Period)",
      daysBeforeHarvest: "days before harvesting edible produce",
      saveToHistory: "Save to Farm History",
      shareWithExpert: "Share with Agri-Officer / KVK"
    },
    history: {
      title: "Crop Health Logbook",
      allCrops: "All Crops",
      noScansTitle: "No Scans Recorded Yet",
      noScansDesc: "Scan your crop leaves regularly to maintain a digital field health journal and track recovery.",
      startScanning: "Scan First Leaf",
      treatmentUnderway: "Treatment in progress",
      rescanReminder: "Re-scan recommended to verify disease recovery."
    },
    settings: {
      title: "Settings & Kisan Support",
      languageHeading: "App Language",
      offlinePacksHeading: "Offline Diagnostic Packs",
      offlinePacksDesc: "Download full crop models and remedies to detect diseases even with zero mobile internet in fields.",
      downloaded: "Downloaded & Offline Ready",
      downloading: "Downloading...",
      downloadPack: "Download Pack (14 MB)",
      supportHeading: "Direct Farmer Support",
      kisanCallCenter: "Kisan Call Centre (Govt of India)",
      kisanTollFree: "Toll-Free: 1800-180-1551",
      callNow: "Call 1800-180-1551",
      kvkSupport: "Krishi Vigyan Kendra (KVK)",
      kvkDesc: "Connect with local university agricultural scientists for soil and pathology verification.",
      aboutHeading: "About Agrinova AI",
      appVersion: "Version 1.0.0 (Field Edition)"
    }
  },
  ta: {
    appTitle: "அக்ரிநோவா AI",
    tagline: "துல்லியமான பயிர் நோய் கண்டறிதல் மற்றும் வழிகாட்டி",
    selectLanguage: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    selectLanguageSubtitle: "தமிழில் குரல் வழி வழிகாட்டல் மற்றும் பரிந்துரைகளைப் பெறவும்",
    continueBtn: "தொடரவும்",
    languages: {
      en: "English",
      ta: "தமிழ் (Tamil)",
      hi: "हिन्दी (Hindi)"
    },
    common: {
      back: "பின்செல்",
      cancel: "ரத்து செய்",
      save: "சேமிக்கவும்",
      share: "அறிக்கையைப் பகிர்",
      offline: "ஆஃப்லைன் தயார்",
      online: "நேரடி கிளவுட் AI",
      healthy: "ஆரோக்கியமானது",
      active: "செயலில் உள்ள தொற்று",
      treating: "சிகிச்சையில் உள்ளது",
      resolved: "குணமடைந்து நலமாக உள்ளது",
      listenAudio: "அறிக்கையைக் கேளுங்கள்",
      stopAudio: "குரலை நிறுத்து",
      playingAudio: "வாசிக்கப்படுகிறது...",
      confidence: "AI துல்லியம்",
      severity: "பாதிப்பின் தீவிரம்",
      affectedArea: "பாதிக்கப்பட்ட இலை பரப்பு",
      shareWhatsapp: "வாட்ஸ்அப்பில் பகிரவும்",
      followUpDue: "மறுபரிசோதனை நாள் இன்று",
      reScanCrop: "மீண்டும் ஸ்கேன் செய்"
    },
    severities: {
      mild: "குறைவான பாதிப்பு (ஆரம்ப நிலை)",
      moderate: "மத்திம பாதிப்பு (உடனடி கவனம் தேவை)",
      critical: "தீவிர பாதிப்பு (உடனடி சிகிச்சை அவசியம்)"
    },
    crops: {
      tomato: "தக்காளி",
      rice: "நெல்",
      cotton: "பருத்தி",
      potato: "உருளைக்கிழங்கு",
      chilli: "மிளகாய்"
    },
    home: {
      greeting: "வணக்கம், உழவர் தோழரே!",
      weatherTitle: "வானிலை & நோய் அபாய எச்சரிக்கை",
      humidity: "ஈரப்பதம்",
      rainProb: "மழை வாய்ப்பு",
      diseaseRiskAlert: "இன்று காற்றில் அதிக ஈரப்பதம் (>82%) உள்ளது. உங்கள் தோட்டத்தில் பூஞ்சை இலை கருகல் நோய் பரவும் அபாயம் அதிகம்.",
      scanHeroTitle: "பயிர் இலை ஸ்கேன் செய்க",
      scanHeroSubtitle: "உடனடி AI நோய் கண்டறிதல், காரணங்கள் மற்றும் சரியான மருந்து அளவு",
      quickCropSelect: "உங்கள் பயிரைத் தேர்ந்தெடுக்கவும்",
      recentScans: "சமீபத்திய பயிர் பரிசோதனைகள்",
      viewAllHistory: "முழு பதிவேட்டைப் பார்",
      todayAdvice: "இன்றைய விவசாய ஆலோசனை",
      adviceContent: "மருந்து தெளிக்கும் போது அதிகாலையிலோ அல்லது மாலை 4 மணிக்கு மேலோ தெளிக்கவும்; இதனால் மருந்து ஆவியாகாமல் இலைகளில் தங்கும்."
    },
    scanner: {
      title: "இலை ஸ்கேனர்",
      alignLeafGuide: "பாதிக்கப்பட்ட இலையை இந்த சட்டத்திற்குள் வைக்கவும்",
      holdSteadyTip: "மொபைலை 15-20 செ.மீ தொலைவில் அசையாமல் பிடிக்கவும்",
      lightingGood: "வெளிச்சம் சரியாக உள்ளது",
      tooDarkAlert: "வெளிச்சம் குறைவாக உள்ளது. ஃபிளாஷ் ஒளிரச் செய்யவும்.",
      takePhoto: "இலையைப் படம் எடு",
      uploadGallery: "கேலரியிலிருந்து பதிவேற்று",
      switchCamera: "கேமராவை மாற்று",
      flashToggle: "ஃபிளாஷ்",
      sampleLeaves: "அல்லது மாதிரி பாதிக்கப்பட்ட இலையைத் தொட்டு சோதிக்கவும்:",
      selectPresetHint: "மாதிரி இலைகள் (டெமோ)",
      selectedCrop: "தேர்ந்தெடுக்கப்பட்ட பயிர்",
      cameraError: "கேமரா அனுமதி கிடைக்கவில்லை. கீழே உள்ள மாதிரி இலைகளைத் தொட்டு அல்லது புகைப்படத்தைப் பதிவேற்றிப் பார்க்கலாம்."
    },
    analyzing: {
      title: "இலை பகுப்பாய்வு செய்யப்படுகிறது...",
      step1: "இலையின் தரம் மற்றும் மேற்பரப்பைச் சரிபார்க்கிறது...",
      step2: "பூஞ்சை புள்ளிகள் மற்றும் நிற மாற்றங்களை கண்டறிகிறது...",
      step3: "வானிலை ஈரப்பதத்துடன் காரணங்களை ஒப்பிடுகிறது...",
      analyzingVoice: "அக்ரிநோவா AI உங்கள் பயிர் இலையை ஆய்வு செய்கிறது. ஒரு நிமிடம் காத்திருக்கவும்."
    },
    diagnosis: {
      title: "நோய் கண்டறிதல் அறிக்கை",
      identifiedDisease: "கண்டறியப்பட்ட பயிர் நோய்",
      heatmapToggleOn: "AI புள்ளி வரைபடம்: ஆன்",
      heatmapToggleOff: "AI புள்ளி வரைபடம்: ஆஃப்",
      heatmapDesc: "கணினிப் பார்வை கண்டறிந்த பூஞ்சை வித்துக்கள் மற்றும் கருகல் பகுதிகள் பெட்டிகளாகக் காட்டப்பட்டுள்ளன.",
      symptomsTitle: "AI கண்டறிந்த முக்கிய அறிகுறிகள்",
      weatherRiskTitle: "நோய் வரக் காரணம் (வானிலை தாக்கம்)",
      causeTitle: "நோய்க்கிருமி & பரவும் விதம்",
      viewTreatmentPlan: "சிகிச்சை மற்றும் மருந்து அளவைக் காண்க",
      reScan: "வேறொரு இலை ஸ்கேன் செய்"
    },
    treatment: {
      title: "சிகிச்சை மற்றும் தடுப்பு முறைகள்",
      tabOrganic: "இயற்கை மருத்துவம்",
      tabChemical: "ரசாயன பூஞ்சைக் கொல்லி",
      tabPrevention: "தடுப்பு & வயல் சுகாதாரம்",
      dosageCalculatorTitle: "கைத்தெளிப்பான் (Knapsack) மருந்து கணக்கீட்டுக் கருவி",
      dosageCalculatorDesc: "உங்கள் தெளிப்பான் டேங்க் கொள்ளளவை உள்ளிட்டு சரியான மருந்து அளவை அறியவும்.",
      tankCapacityLabel: "தெளிப்பான் டேங்க் அளவு",
      tankUnits: "லிட்டர்",
      calculatedDose: "சேர்க்க வேண்டிய மருந்து அளவு",
      applicationMethod: "தெளிக்கும் முறை",
      safetyPrecautions: "பாதுகாப்பு வழிமுறைகள்",
      wearMaskAlert: "மருந்து தெளிக்கும் போது கட்டாயம் முகக்கவசம் மற்றும் கையுறை அணியவும். காற்று வீசும் திசையில் மட்டுமே தெளிக்கவும்.",
      withholdingPeriod: "அறுவடைக்கு முந்தைய காத்திருப்பு காலம்",
      daysBeforeHarvest: "நாட்கள் கழித்து காய்களை அறுவடை செய்யவும்",
      saveToHistory: "விவசாயப் பதிவேட்டில் சேமி",
      shareWithExpert: "வேளாண் அலுவலருக்கு அனுப்பு"
    },
    history: {
      title: "பயிர் ஆரோக்கியப் பதிவேடு",
      allCrops: "அனைத்து பயிர்கள்",
      noScansTitle: "பதிவுகள் எதுவும் இல்லை",
      noScansDesc: "நோயை தொடர்ந்து கண்காணிக்கவும் குணமாகியதை அறியவும் இலைகளை ஸ்கேன் செய்து சேமிக்கவும்.",
      startScanning: "முதல் இலையை ஸ்கேன் செய்",
      treatmentUnderway: "சிகிச்சை நடைபெறுகிறது",
      rescanReminder: "நோய் குணமாகியுள்ளதா என்பதை அறிய 7 நாட்களுக்குப் பின் மீண்டும் ஸ்கேன் செய்யவும்."
    },
    settings: {
      title: "அமைப்புகள் & கிசான் உதவி",
      languageHeading: "பயன்பாட்டு மொழி",
      offlinePacksHeading: "இணையமில்லா ஆஃப்லைன் தொகுப்புகள்",
      offlinePacksDesc: "வயலில் இண்டர்நெட் இல்லாத நேரத்திலும் பயிர் நோய்களைக் கண்டறிய மாதிரித் தொகுப்புகளைப் பதிவிறக்கவும்.",
      downloaded: "பதிவிறக்கம் செய்யப்பட்டது (தயார்)",
      downloading: "பதிவிறக்கம் ஆகிறது...",
      downloadPack: "தொகுப்பைப் பதிவிறக்கு (14 MB)",
      supportHeading: "விவசாயிகள் நேரடி உதவி",
      kisanCallCenter: "கிசான் கால் சென்டர் (மத்திய அரசு)",
      kisanTollFree: "கட்டணமில்லா எண்: 1800-180-1551",
      callNow: "1800-180-1551 அழைக்கவும்",
      kvkSupport: "வேளாண் அறிவியல் மையம் (KVK)",
      kvkDesc: "மண் மற்றும் பயிர் பாதுகாப்பு நிபுணர்களுடன் நேரடியாக தொடர்பு கொள்ளவும்.",
      aboutHeading: "அக்ரிநோவா AI பற்றி",
      appVersion: "பதிப்பு 1.0.0 (களப் பதிப்பு)"
    }
  },
  hi: {
    appTitle: "एग्रीनोवा AI",
    tagline: "सटीक फसल रोग पहचान एवं उपचार",
    selectLanguage: "अपनी भाषा चुनें",
    selectLanguageSubtitle: "हिंदी में आवाज और फसल उपचार निर्देश प्राप्त करें",
    continueBtn: "आगे बढ़ें",
    languages: {
      en: "English",
      ta: "தமிழ் (Tamil)",
      hi: "हिन्दी (Hindi)"
    },
    common: {
      back: "पीछे जाएं",
      cancel: "रद्द करें",
      save: "सुरक्षित करें",
      share: "रिपोर्ट साझा करें",
      offline: "ऑफ़लाइन तैयार",
      online: "लाइव क्लाउड AI",
      healthy: "स्वस्थ",
      active: "सक्रिय संक्रमण",
      treating: "उपचार जारी है",
      resolved: "पूरी तरह ठीक",
      listenAudio: "रिपोर्ट सुनें",
      stopAudio: "आवाज रोकें",
      playingAudio: "सुनाई दे रहा है...",
      confidence: "AI सटीकता",
      severity: "रोग की गंभीरता",
      affectedArea: "प्रभावित पत्ती क्षेत्र",
      shareWhatsapp: "व्हाट्सएप पर भेजें",
      followUpDue: "पुनः जांच आज जरूरी",
      reScanCrop: "पुनः स्कैन करें"
    },
    severities: {
      mild: "हल्का (प्रारंभिक अवस्था)",
      moderate: "मध्यम (ध्यान देना आवश्यक)",
      critical: "गंभीर (तत्काल छिड़काव जरूरी)"
    },
    crops: {
      tomato: "टमाटर",
      rice: "धान (चावल)",
      cotton: "कपास",
      potato: "आलू",
      chilli: "मिर्च"
    },
    home: {
      greeting: "नमस्ते, किसान भाई!",
      weatherTitle: "मौसम एवं फसल जोखिम चेतावनी",
      humidity: "नमी",
      rainProb: "बारिश की संभावना",
      diseaseRiskAlert: "आज हवा में अधिक नमी (>82%) है। आपके खेत में फफूंद जनित झुलसा रोग फैलने का अधिक खतरा है।",
      scanHeroTitle: "पत्ती स्कैन करें",
      scanHeroSubtitle: "तुरंत AI रोग पहचान, कारण और सटीक दवा की मात्रा जानें",
      quickCropSelect: "अपनी फसल चुनें",
      recentScans: "हाल की फसल जांचें",
      viewAllHistory: "पूरी डायरी देखें",
      todayAdvice: "आज की कृषि सलाह",
      adviceContent: "दवा का छिड़काव हमेशा सुबह जल्दी या शाम 4 बजे के बाद करें ताकि तेज धूप में दवा भाप बनकर उड़े नहीं।"
    },
    scanner: {
      title: "पत्ती स्कैनर",
      alignLeafGuide: "रोगग्रस्त पत्ती को इस घेरे के अंदर रखें",
      holdSteadyTip: "मोबाइल को 15-20 सेमी की दूरी पर स्थिर रखें",
      lightingGood: "रोशनी सही है",
      tooDarkAlert: "रोशनी कम है। कृपया फ्लैश जलाएं या रोशनी में जाएं।",
      takePhoto: "फोटो खींचें",
      uploadGallery: "गैलरी से अपलोड करें",
      switchCamera: "कैमरा बदलें",
      flashToggle: "फ्लैश",
      sampleLeaves: "या टेस्ट करने के लिए नीचे नमूना पत्ती चुनें:",
      selectPresetHint: "जांच हेतु नमूना पत्तियां (डेमो)",
      selectedCrop: "चुनी गई फसल",
      cameraError: "कैमरा अनुमति नहीं मिली। आप गैलरी से फोटो अपलोड कर सकते हैं या नीचे दिए नमूने चुन सकते हैं।"
    },
    analyzing: {
      title: "पत्ती का विश्लेषण हो रहा है...",
      step1: "पत्ती की सतह और गुणवत्ता की जांच...",
      step2: "धब्बों और फफूंद के लक्षणों की पहचान...",
      step3: "मौसम और नमी के आंकड़ों से मिलान...",
      analyzingVoice: "एग्रीनोवा AI आपकी फसल की पत्ती का विश्लेषण कर रहा है। कृपया प्रतीक्षा करें।"
    },
    diagnosis: {
      title: "रोग निदान रिपोर्ट",
      identifiedDisease: "पहचाना गया रोग",
      heatmapToggleOn: "AI लक्षण हीटमैप: चालू",
      heatmapToggleOff: "AI लक्षण हीटमैप: बंद",
      heatmapDesc: "AI द्वारा चिन्हित प्रभावित क्षेत्र और फफूंद के धब्बे बॉक्स में दिखाए गए हैं।",
      symptomsTitle: "AI द्वारा पहचाने गए मुख्य लक्षण",
      weatherRiskTitle: "रोग का कारण (मौसम का प्रभाव)",
      causeTitle: "रोगकारक जीवाणु/फफूंद",
      viewTreatmentPlan: "उपचार एवं दवा की मात्रा देखें",
      reScan: "दूसरी पत्ती स्कैन करें"
    },
    treatment: {
      title: "उपचार एवं रोकथाम सलाह",
      tabOrganic: "जैविक / देसी उपचार",
      tabChemical: "रासायनिक फफूंदनाशक",
      tabPrevention: "रोकथाम एवं खेत की सफाई",
      dosageCalculatorTitle: "स्प्रेयर टंकी दवा कैलकुलेटर",
      dosageCalculatorDesc: "अपनी टंकी की क्षमता (लीटर) दर्ज करें और पानी में मिलाने के लिए सही मात्रा जानें।",
      tankCapacityLabel: "स्प्रे टंकी का माप",
      tankUnits: "लीटर",
      calculatedDose: "आवश्यक दवा की मात्रा",
      applicationMethod: "छिड़काव का सही तरीका",
      safetyPrecautions: "सुरक्षा सावधानियां",
      wearMaskAlert: "छिड़काव करते समय मुंह पर मास्क और हाथों में दस्ताने जरूर पहनें। हवा की दिशा में ही छिड़कें।",
      withholdingPeriod: "तुड़ाई पूर्व प्रतीक्षा अवधि (सुरक्षित अंतराल)",
      daysBeforeHarvest: "दिन बाद ही फसल की तुड़ाई करें",
      saveToHistory: "खेत डायरी में जोड़ें",
      shareWithExpert: "कृषि अधिकारी को भेजें"
    },
    history: {
      title: "फसल स्वास्थ्य डायरी",
      allCrops: "सभी फसलें",
      noScansTitle: "अभी कोई रिकॉर्ड नहीं है",
      noScansDesc: "फसल की नियमित निगरानी और सुधार देखने के लिए पत्ती स्कैन करके यहां रिकॉर्ड रखें।",
      startScanning: "पहली पत्ती स्कैन करें",
      treatmentUnderway: "उपचार जारी है",
      rescanReminder: "रोग ठीक हुआ या नहीं, यह देखने के लिए 7 दिन बाद पुनः स्कैन करने की सलाह दी जाती है।"
    },
    settings: {
      title: "सेटिंग्स एवं किसान सहायता",
      languageHeading: "ऐप की भाषा",
      offlinePacksHeading: "बिना इंटरनेट (ऑफ़लाइन) पैक",
      offlinePacksDesc: "खेत में इंटरनेट न होने पर भी रोग पहचानने के लिए ऑफ़लाइन मॉडल डाउनलोड करें।",
      downloaded: "डाउनलोड पूरा (ऑफ़लाइन तैयार)",
      downloading: "डाउनलोड हो रहा है...",
      downloadPack: "पैक डाउनलोड करें (14 MB)",
      supportHeading: "किसान हेल्पलाइन सेवा",
      kisanCallCenter: "किसान कॉल सेंटर (भारत सरकार)",
      kisanTollFree: "टोल-फ्री नंबर: 1800-180-1551",
      callNow: "1800-180-1551 पर कॉल करें",
      kvkSupport: "कृषि विज्ञान केंद्र (KVK)",
      kvkDesc: "रोग एवं मिट्टी जांच के लिए नजदीकी कृषि वैज्ञानिकों से संपर्क करें।",
      aboutHeading: "एग्रीनोवा AI के बारे में",
      appVersion: "संस्करण 1.0.0 (किसान संस्करण)"
    }
  }
};
