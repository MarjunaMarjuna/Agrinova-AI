import { DiseaseInfo, WeatherContext } from '../types';

// Realistic SVG Data URIs for offline reliable rendering of diseased crop leaves
export const LEAF_IMAGES = {
  tomatoEarlyBlight: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' width='100%' height='100%'><defs><linearGradient id='leafGrad' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23386641'/><stop offset='60%' stop-color='%236A994E'/><stop offset='100%' stop-color='%23A7C957'/></linearGradient><radialGradient id='spotGrad1' cx='50%' cy='50%' r='50%'><stop offset='0%' stop-color='%233D2614'/><stop offset='50%' stop-color='%237F4F24'/><stop offset='85%' stop-color='%23DDA15E'/><stop offset='100%' stop-color='%23BC6C25' stop-opacity='0'/></radialGradient><radialGradient id='spotGrad2' cx='50%' cy='50%' r='50%'><stop offset='0%' stop-color='%2328190E'/><stop offset='45%' stop-color='%23582F0E'/><stop offset='80%' stop-color='%23C67D34'/><stop offset='100%' stop-color='%23A44A14' stop-opacity='0'/></radialGradient></defs><rect width='400' height='400' fill='%23192B21'/><path d='M200 40 C280 90, 340 180, 290 310 C240 370, 200 380, 200 380 C200 380, 160 370, 110 310 C60 180, 120 90, 200 40 Z' fill='url(%23leafGrad)' stroke='%232D6A4F' stroke-width='4'/><path d='M200 45 Q202 200 200 375' stroke='%232D6A4F' stroke-width='4' fill='none'/><path d='M200 130 Q250 110 280 140 M200 190 Q270 170 295 215 M200 250 Q260 240 270 285' stroke='%232D6A4F' stroke-width='2' fill='none'/><path d='M200 130 Q150 110 120 140 M200 190 Q130 170 105 215 M200 250 Q140 240 130 285' stroke='%232D6A4F' stroke-width='2' fill='none'/><circle cx='235' cy='180' r='38' fill='url(%23spotGrad1)'/><circle cx='235' cy='180' r='26' fill='none' stroke='%2348250C' stroke-width='2' stroke-dasharray='4,2'/><circle cx='235' cy='180' r='14' fill='%23261405'/><circle cx='155' cy='240' r='42' fill='url(%23spotGrad2)'/><circle cx='155' cy='240' r='30' fill='none' stroke='%23381C06' stroke-width='2.5' stroke-dasharray='5,2'/><circle cx='155' cy='240' r='16' fill='%23210F03'/><circle cx='210' cy='290' r='24' fill='url(%23spotGrad1)'/></svg>",
  riceBacterialBlight: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' width='100%' height='100%'><defs><linearGradient id='riceLeaf' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23588157'/><stop offset='70%' stop-color='%23A3B18A'/><stop offset='100%' stop-color='%23DAD7CD'/></linearGradient></defs><rect width='400' height='400' fill='%23192B21'/><path d='M200 30 Q270 180 250 370 L150 370 Q130 180 200 30 Z' fill='url(%23riceLeaf)'/><path d='M200 30 L200 370' stroke='%23344E41' stroke-width='3'/><path d='M155 90 Q180 150 160 280 L140 270 Q145 150 155 90 Z' fill='%23D4A373' opacity='0.9'/><path d='M245 120 Q225 200 240 310 L255 300 Q240 200 245 120 Z' fill='%23CCD5AE' opacity='0.95'/><path d='M160 130 Q175 190 162 260' stroke='%237F4F24' stroke-width='3' stroke-dasharray='6,3'/><path d='M235 150 Q225 220 238 290' stroke='%2399582A' stroke-width='3'/></svg>",
  cottonLeafCurl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' width='100%' height='100%'><defs><linearGradient id='cottonGrad' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%232D6A4F'/><stop offset='100%' stop-color='%2352B788'/></linearGradient></defs><rect width='400' height='400' fill='%23192B21'/><path d='M200 60 C260 80 320 150 310 220 C290 280 230 330 200 350 C170 330 110 280 90 220 C80 150 140 80 200 60 Z' fill='url(%23cottonGrad)' stroke='%231B4332' stroke-width='4'/><path d='M200 60 L200 350' stroke='%23E9C46A' stroke-width='6'/><path d='M200 140 Q280 120 290 190 M200 220 Q260 210 280 260' stroke='%23F4A261' stroke-width='5'/><path d='M200 140 Q120 120 110 190 M200 220 Q140 210 120 260' stroke='%23F4A261' stroke-width='5'/><circle cx='280' cy='200' r='18' fill='%23E76F51' opacity='0.7'/><circle cx='120' cy='210' r='16' fill='%23E76F51' opacity='0.7'/></svg>",
  potatoLateBlight: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' width='100%' height='100%'><defs><linearGradient id='potatoGrad' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%2340916C'/><stop offset='100%' stop-color='%2374C69D'/></linearGradient></defs><rect width='400' height='400' fill='%23192B21'/><path d='M200 50 C290 90 320 200 280 310 C240 370 200 375 200 375 C200 375 160 370 120 310 C80 200 110 90 200 50 Z' fill='url(%23potatoGrad)'/><ellipse cx='230' cy='150' rx='50' ry='35' fill='%231B263B' opacity='0.85'/><ellipse cx='230' cy='150' rx='42' ry='28' fill='%230D1B2A'/><circle cx='150' cy='260' r='40' fill='%231B263B' opacity='0.85'/><path d='M190 135 Q220 130 250 155' stroke='%23E0E1DD' stroke-width='3' stroke-dasharray='4,2'/></svg>",
  chilliAnthracnose: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' width='100%' height='100%'><defs><linearGradient id='chilliGrad' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%2352B788'/><stop offset='100%' stop-color='%232D6A4F'/></linearGradient></defs><rect width='400' height='400' fill='%23192B21'/><path d='M200 40 C270 90 310 180 270 300 C230 360 200 370 200 370 C200 370 170 360 130 300 C90 180 130 90 200 40 Z' fill='url(%23chilliGrad)'/><circle cx='180' cy='180' r='35' fill='%232B1810'/><circle cx='180' cy='180' r='25' fill='none' stroke='%23BC6C25' stroke-width='3'/><circle cx='180' cy='180' r='10' fill='%23E76F51'/><circle cx='225' cy='255' r='28' fill='%232B1810'/><circle cx='225' cy='255' r='18' fill='none' stroke='%23BC6C25' stroke-width='2'/></svg>"
};

export const LIVE_WEATHER_CONTEXT: WeatherContext = {
  temp: 29,
  humidity: 84,
  rainfallProb: 70,
  condition: {
    en: "Warm & Humid with Intermittent Drizzle",
    ta: "வெப்பமும் காற்றில் அதிக ஈரப்பதமும், மிதமான தூறல்",
    hi: "उष्ण एवं अधिक आर्द्रता, हल्की बूंदाबांदी"
  },
  riskAlert: {
    en: "Favorable conditions for spore germination and rapid fungal spreading across solanaceous and paddy crops.",
    ta: "பூஞ்சை வித்துக்கள் வேகமாக முளைத்து பரவுவதற்கு ஏதுவான தட்பவெப்ப நிலை நிலவுகிறது.",
    hi: "फफूंद बीजाणुओं के तेजी से पनपने एवं फैलने के लिए अनुकूल मौसम।"
  }
};

export const DISEASES_DATABASE: Record<string, DiseaseInfo> = {
  tomato_early_blight: {
    id: "tomato_early_blight",
    cropId: "tomato",
    scientificName: "Alternaria solani",
    name: {
      en: "Tomato Early Blight",
      ta: "தக்காளி ஆரம்ப இலை கருகல் நோய்",
      hi: "टमाटर का अगेती झुलसा रोग"
    },
    confidence: 95,
    severity: "moderate",
    affectedAreaPercentage: 24,
    symptoms: {
      en: [
        "Dark brown, concentric ring lesions ('target board' pattern) on mature leaves.",
        "Yellow chlorotic halo surrounding the brown necrotic lesions.",
        "Lower oldest leaves infected first, progressing upwards along the stem."
      ],
      ta: [
        "முதிர்ந்த இலைகளில் வளைய வடிவிலான கரும்பழுப்பு நிறப் புள்ளிகள் (இலக்கு பலகை போன்ற வடிவம்).",
        "பழுப்பு நிறப் புள்ளிகளைச் சுற்றி வெளிர் மஞ்சள் நிற வளையம் தோன்றுதல்.",
        "செடியின் அடிப்பகுதி முதிய இலைகளில் முதலில் தோன்றி மேல்நோக்கி பரவுதல்."
      ],
      hi: [
        "पुरानी निचली पत्तियों पर गहरे भूरे, गोल छल्लेदार ('टारगेट बोर्ड' जैसे) धब्बे।",
        "भूरे धब्बों के चारों ओर पीला छल्ला (क्लोरोटिक हेलो) दिखाई देना।",
        "संक्रमण सबसे पहले पौधे की निचली पत्तियों से शुरू होकर ऊपर बढ़ता है।"
      ]
    },
    weatherTriggers: {
      en: "Prolonged leaf wetness combined with warm temperatures (24°C - 30°C) and relative humidity > 80%.",
      ta: "24°C - 30°C வெப்பநிலை மற்றும் காற்றில் 80% க்கும் அதிகமான ஈரப்பதம் உள்ள சூழலில் பூஞ்சை அதிவேகமாக வளர்கிறது.",
      hi: "24°C से 30°C तापमान और 80% से अधिक नमी होने पर फफूंद के बीजाणु तेजी से फैलते हैं।"
    },
    causes: {
      en: "Airborne fungal spores overwintering in previous crop debris, aggravated by overhead sprinkler splash.",
      ta: "முந்தைய பயிர் கழிவுகளில் தங்கியிருக்கும் பூஞ்சை வித்துக்கள், மழைநீர் மற்றும் தெளிப்பான் நீர் மூலம் பரவுகிறது.",
      hi: "पिछली फसल के अवशेषों में जीवित रहने वाले फफूंद बीजाणु, जो बारिश या पानी के छींटों से फैलते हैं।"
    },
    organicTreatments: [
      {
        title: {
          en: "5% Neem Seed Kernel Extract (NSKE)",
          ta: "5% வேப்பங்கொட்டை கரைசல் (NSKE)",
          hi: "5% नीम के बीज का काढ़ा (NSKE)"
        },
        description: {
          en: "Pound 50g neem seeds per litre of water, soak overnight, filter through muslin cloth, and add 1ml khadi soap as sticking agent.",
          ta: "1 லிட்டர் தண்ணீருக்கு 50 கிராம் வேப்பங்கொட்டையை இடித்து இரவு முழுவதும் ஊறவைத்து, வடிகட்டி காதி சோப்பு சேர்த்து தெளிக்கவும்.",
          hi: "50 ग्राम नीम के बीज प्रति लीटर पानी में कूटकर रातभर भिगोएं, छानकर चिपकाने वाले साबुन के साथ छिड़कें।"
        },
        dosagePerLiter: "50 ml / Litre of water",
        preparationTime: "Overnight (12 hrs)",
        safetyPrecaution: {
          en: "Safe for pollinators and beneficial insects. Non-toxic.",
          ta: "தேனீக்கள் மற்றும் நன்மை செய்யும் பூச்சிகளுக்கு முழு பாதுகாப்பு.",
          hi: "मित्र कीटों व मधुमक्खियों के लिए सुरक्षित एवं हानिरहित।"
        },
        tag: "Organic"
      },
      {
        title: {
          en: "Trichoderma viride Foliar & Soil Drench",
          ta: "டிரைக்கோடெர்மா விரிடி இலை மற்றும் வேர் நனைத்தல்",
          hi: "ट्राइकोडर्मा विरिडी जैव-फफूंदनाशक"
        },
        description: {
          en: "Antagonistic beneficial bio-fungicide that consumes Alternaria spores and strengthens natural plant immunity.",
          ta: "ஆல்டர்னேரியா பூஞ்சை வித்துக்களை அழித்து செடியின் இயற்கையான நோய் எதிர்ப்புச் சக்தியை அதிகரிக்கும் நுண்ணுயிர்.",
          hi: "जैविक मित्र फफूंद जो हानिकारक फफूंद को नष्ट कर पौधे की रोग प्रतिरोधक क्षमता बढ़ाती है।"
        },
        dosagePerLiter: "5 g / Litre of water",
        safetyPrecaution: {
          en: "Do not mix with chemical fungicides or copper products.",
          ta: "ரசாயன மருந்துகளுடனோ அல்லது காப்பர் மருந்துகளுடனோ சேர்த்துப் பயன்படுத்தக் கூடாது.",
          hi: "रासायनिक फफूंदनाशक या कॉपर दवाओं के साथ न मिलाएं।"
        },
        tag: "Organic"
      }
    ],
    chemicalTreatments: [
      {
        title: {
          en: "Mancozeb 75% WP (Contact Fungicide)",
          ta: "மேன்கோசெப் 75% WP (தொடு நச்சு பூஞ்சைக் கொல்லி)",
          hi: "मैंकोजेब 75% WP (संपर्क फफूंदनाशक)"
        },
        description: {
          en: "Broad-spectrum protective contact fungicide. Forms an active protective barrier over uninfected foliage.",
          ta: "பரந்த வீரியம் கொண்ட பாதுகாப்பு மருந்து. புதிய இலைகளில் பூஞ்சை வித்துக்கள் முளைப்பதைத் தடுக்கும் ஒரு கவசத்தை உருவாக்குகிறது.",
          hi: "प्रभावी सुरक्षात्मक फफूंदनाशक। यह पत्तियों पर सुरक्षा कवच बनाकर नए बीजाणुओं को नष्ट करता है।"
        },
        dosagePerLiter: "2.5 g / Litre of water",
        safetyPrecaution: {
          en: "Wear respirator mask and rubber gloves. Withholding period: 7 days before fruit harvest.",
          ta: "கட்டாயம் முகக்கவசம் மற்றும் கையுறை அணியவும். காய் பறிப்பதற்கு 7 நாட்களுக்கு முன் தெளிக்க வேண்டும்.",
          hi: "मास्क एवं दस्ताने जरूर पहनें। फसल तुड़ाई से कम से कम 7 दिन पहले छिड़काव करें।"
        },
        tag: "Chemical"
      },
      {
        title: {
          en: "Difenoconazole 25% EC (Systemic Fungicide)",
          ta: "டைபினோகொனசோல் 25% EC (உள் பரவும் பூஞ்சைக் கொல்லி)",
          hi: "डिफेनोकोनाज़ोल 25% EC (प्रणालीगत फफूंदनाशक)"
        },
        description: {
          en: "Fast-acting curative and eradicative action that penetrates leaf tissues to stop established fungal mycelium.",
          ta: "இலையினுள் ஊடுருவி ஏற்கனவே பரவியுள்ள பூஞ்சை இழைகளை அடியோடு அழிக்கும் தீவிர நிவாரண மருந்து.",
          hi: "पत्ती के अंदर समाकर फैले हुए संक्रमण को रोकने वाली असरदार दवा।"
        },
        dosagePerLiter: "1 ml / Litre of water",
        safetyPrecaution: {
          en: "Rotate with contact fungicides to prevent fungal resistance.",
          ta: "நோய் எதிர்ப்புத்திறன் உருவாவதைத் தடுக்க தொடு மருந்துகளுடன் மாற்றித் தெளிக்கவும்.",
          hi: "दवा के प्रति प्रतिरोधकता रोकने के लिए बदल-बदल कर छिड़काव करें।"
        },
        tag: "Chemical"
      }
    ],
    preventiveMeasures: {
      en: [
        "Prune and safely burn lower infected leaves touching the damp soil.",
        "Shift to drip irrigation; avoid overhead sprinkling that keeps leaves wet.",
        "Practice 2-year crop rotation avoiding other solanaceous crops (potato, brinjal, chilli)."
      ],
      ta: [
        "மண்ணைத் தொடும் கீழ்மட்ட நோயுற்ற இலைகளைக் கிள்ளி அப்புறப்படுத்தி எரிக்கவும்.",
        "சொட்டுநீர்ப் பாசன முறைக்கு மாறவும்; இலைகளில் தண்ணீர் படும்படி தெளிப்பதைத் தவிர்க்கவும்.",
        "கத்தரி, மிளகாய், உருளைக்கிழங்கு போன்ற பயிர்களைத் தவிர்த்து பயிர் சுழற்சி செய்யவும்."
      ],
      hi: [
        "जमीन से सटी संक्रमित निचली पत्तियों को तोड़कर खेत से बाहर जला दें।",
        "ड्रिप सिंचाई अपनाएं; पत्तियों पर सीधे पानी छिड़कने से बचें।",
        "टमाटर के बाद आलू या बैंगन न लगाकर दलहनी फसलों का फसल चक्र अपनाएं।"
      ]
    },
    boundingBoxes: [
      {
        x: 52,
        y: 40,
        width: 22,
        height: 18,
        label: {
          en: "Target-board concentric rings",
          ta: "வளைய வடிவ கருகல் புள்ளி",
          hi: "छल्लेदार गहरा धब्बा"
        }
      },
      {
        x: 32,
        y: 54,
        width: 26,
        height: 20,
        label: {
          en: "Chlorotic yellow halo boundary",
          ta: "மஞ்சள் வளைய விளிம்பு",
          hi: "पीला किनारा"
        }
      },
      {
        x: 48,
        y: 68,
        width: 16,
        height: 14,
        label: {
          en: "Secondary necrotic lesion",
          ta: "இரண்டாம் நிலை திசு அழிவு",
          hi: "द्वितीयक संक्रमण"
        }
      }
    ],
    sampleImage: LEAF_IMAGES.tomatoEarlyBlight
  },

  rice_bacterial_blight: {
    id: "rice_bacterial_blight",
    cropId: "rice",
    scientificName: "Xanthomonas oryzae pv. oryzae",
    name: {
      en: "Rice Bacterial Leaf Blight",
      ta: "நெல் பாக்டீரியா இலை கருகல் நோய்",
      hi: "धान का जीवाणु झुलसा रोग"
    },
    confidence: 92,
    severity: "critical",
    affectedAreaPercentage: 42,
    symptoms: {
      en: [
        "Water-soaked lesions on leaf margins turning wavy yellowish-white stripes.",
        "Milky bacterial bacterial ooze drops visible in the early morning dew.",
        "Leaf blades wilt, dry up, and curl longitudinally into a straw-like appearance."
      ],
      ta: [
        "இலை விளிம்புகளில் நீர் ஊறிய புள்ளிகள் தோன்றி பின்னர் அலை அலையான மஞ்சள்-வெள்ளை கோடுகளாக மாறுதல்.",
        "அதிகாலை பனித்துளிகளில் பால் போன்ற பாக்டீரியா திரவக் கசிவு காணப்படுதல்.",
        "இலைகள் காய்ந்து வைக்கோல் போல் வெளுத்து சுருண்டு விடுதல்."
      ],
      hi: [
        "पत्तियों के किनारों पर पानी सोखे धब्बे जो बाद में लहरदार पीले-सफेद पट्टों में बदलते हैं।",
        "सुबह की ओस में पत्तियों पर दूधिया जीवाणु स्राव की बूंदें दिखाई देना।",
        "पत्तियां सूखकर भूसे के समान पीली-सफेद हो जाती हैं।"
      ]
    },
    weatherTriggers: {
      en: "Strong winds and cyclonic rains accompanied by temperatures of 25°C - 34°C and relative humidity above 85%.",
      ta: "காற்றுடன் கூடிய கனமழை மற்றும் 85% க்கும் அதிகமான காற்றின் ஈரப்பதம் பாக்டீரியா வேகமாகப் பரவக் காரணமாகிறது.",
      hi: "तेज हवा, बारिश और 85% से अधिक आर्द्रता में जीवाणु घावों के जरिए तेजी से फैलते हैं।"
    },
    causes: {
      en: "Bacterial entry through leaf wounds and hydathodes, exacerbated by excessive nitrogen fertilizer application.",
      ta: "காற்றின் உராய்வினால் ஏற்படும் இலை காயங்கள் வழியாக பாக்டீரியா உட்செல்லுதல் மற்றும் அதிகப்படியான தழைச்சத்து (யுரியா) பயன்பாடு.",
      hi: "पत्तियों के घावों से जीवाणुओं का प्रवेश और आवश्यकता से अधिक यूरिया (नाइट्रोजन) का उपयोग।"
    },
    organicTreatments: [
      {
        title: {
          en: "Cow Dung Filtrate & Asafoetida Spray",
          ta: "சாண எரிவாயுக் கழிவு நீர் & பெருங்காயக் கரைசல்",
          hi: "गोमूत्र एवं हींग का घोल"
        },
        description: {
          en: "Mix 2 kg fresh cow dung in 10L water, filter twice through cloth, add 50g asafoetida powder, and dilute to 100L for foliar application.",
          ta: "2 கிலோ பசுஞ்சாணத்தை 10 லிட்டர் நீரில் கரைத்து வடிகட்டி, 50 கிராம் பெருங்காயத்தூள் சேர்த்து 100 லிட்டர் நீரிற்கு நீர்த்துத் தெளிக்கவும்.",
          hi: "2 किलो ताजे गोबर को 10 लीटर पानी में घोलकर छानें, 50 ग्राम हींग मिलाकर 100 लीटर पानी में छिड़कें।"
        },
        dosagePerLiter: "100 ml / Litre of water",
        preparationTime: "2 hours",
        tag: "Organic"
      }
    ],
    chemicalTreatments: [
      {
        title: {
          en: "Streptocycline + Copper Oxychloride 50% WP",
          ta: "ஸ்ட்ரெப்டோசைக்ளின் + காப்பர் ஆக்ஸிகுளோரைடு 50% WP",
          hi: "स्ट्रेप्टोसाइक्लिन + कॉपर ऑक्सीक्लोराइड 50% WP"
        },
        description: {
          en: "Potent bactericide combo. Streptocycline suppresses bacterial reproduction while copper sterilizes leaf surfaces.",
          ta: "பாக்டீரியாவின் பெருக்கத்தைத் தடுத்து இலைப்பரப்பை முழுமையாகச் சுத்திகரிக்கும் சக்தி வாய்ந்த ஒருங்கிணைந்த மருந்து.",
          hi: "असरदार जीवाणुनाशक। स्ट्रेप्टोसाइक्लिन जीवाणुओं को मारती है और कॉपर नए संक्रमण को रोकता है।"
        },
        dosagePerLiter: "0.1g Streptocycline + 2.5g Copper Oxychloride / L",
        safetyPrecaution: {
          en: "Do not spray in standing hot sun. Spray when dew has dried off.",
          ta: "உச்சி வெயிலில் தெளிக்க வேண்டாம். பனி காய்ந்த பின் காலையில் தெளிக்கவும்.",
          hi: "कड़ी धूप में न छिड़कें। सुबह ओस सूखने के तुरंत बाद छिड़कें।"
        },
        tag: "Chemical"
      }
    ],
    preventiveMeasures: {
      en: [
        "Split nitrogen applications; temporarily halt urea top-dressing during active infection.",
        "Drain standing water from the field for 48 hours to aerate root zones.",
        "Avoid clipping leaf tips during nursery transplanting."
      ],
      ta: [
        "யுரியா உரமிடுவதை உடனடியாக தற்காலிகமாக நிறுத்தவும்.",
        "வயலில் தேங்கியிருக்கும் தண்ணீரை 2 நாட்களுக்கு வடித்து காற்றோட்டம் ஏற்படுத்தவும்.",
        "நாற்று நடும் போது இலை நுனிகளை வெட்டுவதைத் தவிர்க்கவும்."
      ],
      hi: [
        "रोग दिखने पर यूरिया (नाइट्रोजन) का छिड़काव तुरंत रोक दें।",
        "खेत का जमा पानी 2 दिन के लिए निकाल दें ताकि जड़ों को हवा मिल सके।",
        "रोपाई के समय धान की पौध की ऊपरी पत्तियां न काटें।"
      ]
    },
    boundingBoxes: [
      {
        x: 34,
        y: 30,
        width: 15,
        height: 45,
        label: {
          en: "Wavy marginal necrosis",
          ta: "விளிம்பு கருகல்",
          hi: "लहरदार सूखा किनारा"
        }
      },
      {
        x: 58,
        y: 38,
        width: 14,
        height: 42,
        label: {
          en: "Bleached bacterial lesion",
          ta: "பாக்டீரியா வடு",
          hi: "सफेद जीवाणु पट्टी"
        }
      }
    ],
    sampleImage: LEAF_IMAGES.riceBacterialBlight
  },

  cotton_leaf_curl: {
    id: "cotton_leaf_curl",
    cropId: "cotton",
    scientificName: "Cotton Leaf Curl Virus (CLCuV)",
    name: {
      en: "Cotton Leaf Curl Virus",
      ta: "பருத்தி இலை சுருள் வைரஸ்",
      hi: "कपास पत्ता मरोड़ विषाणु (CLCuV)"
    },
    confidence: 89,
    severity: "critical",
    affectedAreaPercentage: 35,
    symptoms: {
      en: [
        "Upward or downward rolling and curling of leaves.",
        "Vein thickening and prominent enation (leaf-like outgrowths) on the underside of leaves.",
        "Stunted crop growth and reduction in flowering boll formation."
      ],
      ta: [
        "இலைகள் மேல்நோக்கியோ அல்லது கீழ்நோக்கியோ கிண்ணம் போல் சுருண்டு போதல்.",
        "இலையின் அடிப்பகுதியில் நரம்புகள் தடித்து நரம்பு வெளித்தள்ளுதல் ஏற்படுதல்.",
        "செடியின் வளர்ச்சி குன்றி, பூக்கள் மற்றும் காய்களின் எண்ணிக்கை வெகுவாகக் குறைதல்."
      ],
      hi: [
        "पत्तियों का ऊपर या नीचे की ओर मुड़कर कटोरी जैसा हो जाना।",
        "पत्ती की निचली सतह की नसों का मोटा होना और पत्तियों पर उभार बनना।",
        "पौधे का विकास रुक जाना और टिंडों (बॉल्स) का न बनना।"
      ]
    },
    weatherTriggers: {
      en: "Dry warm weather promoting high populations of whitefly (Bemisia tabaci) vector.",
      ta: "வெப்பமான உலர் வானிலை, வெள்ளை ஈக்களின் பெருக்கத்திற்கு சாதகமாக இருப்பதால் நோய் பரவுகிறது.",
      hi: "गर्म एवं सूखा मौसम जिसमें सफेद मक्खी की संख्या तेजी से बढ़ती है।"
    },
    causes: {
      en: "Begomovirus transmitted exclusively by the sweet potato whitefly (Bemisia tabaci).",
      ta: "வெள்ளை ஈக்களால் பரப்பப்படும் பெகோமோவைரஸ் (Begomovirus) கிருமி.",
      hi: "सफेद मक्खी (व्हाइटफ्लाई) द्वारा फैलाया जाने वाला वायरस।"
    },
    organicTreatments: [
      {
        title: {
          en: "Yellow Sticky Traps & Neem Oil 10,000 PPM",
          ta: "மஞ்சள் ஒட்டும் பொறி & வேப்பெண்ணெய் 10,000 PPM",
          hi: "पीले चिपचिपे ट्रैप व नीम तेल 10,000 PPM"
        },
        description: {
          en: "Install 12 yellow sticky traps per acre to capture whiteflies. Spray cold-pressed neem oil to disrupt vector feeding.",
          ta: "ஏக்கருக்கு 12 மஞ்சள் நிற ஒட்டும் பொறிகளை அமைக்கவும். வெள்ளை ஈக்களைக் கட்டுப்படுத்த வேப்பெண்ணெய் தெளிக்கவும்.",
          hi: "प्रति एकड़ 12 पीले चिपचिपे ट्रैप लगाएं और सफेद मक्खी को रोकने के लिए नीम तेल का छिड़काव करें।"
        },
        dosagePerLiter: "3 ml / Litre of water",
        tag: "Organic"
      }
    ],
    chemicalTreatments: [
      {
        title: {
          en: "Diafenthiuron 50% WP (Vector Control)",
          ta: "டயாபென்தியூரான் 50% WP (ஈக் கட்டுப்பாடு)",
          hi: "डायफेंथियूरॉन 50% WP (सफेद मक्खी नियंत्रण)"
        },
        description: {
          en: "Controls both nymph and adult whiteflies that transmit the viral pathogen.",
          ta: "வைரஸைப் பரப்பும் வெள்ளை ஈக்களின் இளம்பூச்சிகள் மற்றும் தாய்ப்பூச்சிகளைக் கட்டுப்படுத்தும் சிறந்த மருந்து.",
          hi: "वायरस फैलाने वाली सफेद मक्खी के वयस्कों और अंडों दोनों पर असरदार।"
        },
        dosagePerLiter: "1.2 g / Litre of water",
        safetyPrecaution: {
          en: "Spray underside of leaves thoroughly where whiteflies colony.",
          ta: "வெள்ளை ஈக்கள் தங்கும் இலைகளின் அடிப்பகுதியில் நன்கு படும்படி தெளிக்கவும்.",
          hi: "पत्तियों के निचले हिस्से पर विशेष रूप से स्प्रे करें जहां मक्खी बैठती है।"
        },
        tag: "Chemical"
      }
    ],
    preventiveMeasures: {
      en: [
        "Destroy alternative weed hosts like Abutilon indicum and Parthenium along field borders.",
        "Use CLCuV-tolerant certified hybrid seeds.",
        "Avoid late sowing to prevent exposure to peak whitefly flights."
      ],
      ta: [
        "வரப்புகளில் உள்ள துத்தி மற்றும் பார்த்தீனியம் போன்ற களைச்செடிகளை அகற்றவும்.",
        "நோய் எதிர்ப்புத் திறன் கொண்ட சான்றளிக்கப்பட்ட பருத்தி விதைகளைப் பயன்படுத்தவும்.",
        "பருத்தியை தாமதமாக விதைப்பதைத் தவிர்க்கவும்."
      ],
      hi: [
        "खेत की मेड़ों से गाजर घास (पार्थेनियम) व अन्य खरपतवार उखाड़ दें।",
        "रोग प्रतिरोधी प्रमाणित बीजों का ही चयन करें।",
        "बुवाई में देरी न करें ताकि सफेद मक्खी के प्रकोप से बचा जा सके।"
      ]
    },
    boundingBoxes: [
      {
        x: 65,
        y: 44,
        width: 18,
        height: 18,
        label: {
          en: "Enation & vein thickening",
          ta: "நரம்பு தடித்தல்",
          hi: "नस का उभार"
        }
      },
      {
        x: 24,
        y: 46,
        width: 18,
        height: 18,
        label: {
          en: "Curled leaf edge",
          ta: "சுருண்ட இலை விளிம்பு",
          hi: "मुड़ी हुई पत्ती"
        }
      }
    ],
    sampleImage: LEAF_IMAGES.cottonLeafCurl
  },

  potato_late_blight: {
    id: "potato_late_blight",
    cropId: "potato",
    scientificName: "Phytophthora infestans",
    name: {
      en: "Potato Late Blight",
      ta: "உருளைக்கிழங்கு பின் கருகல் நோய்",
      hi: "आलू का पछेती झुलसा रोग"
    },
    confidence: 94,
    severity: "critical",
    affectedAreaPercentage: 38,
    symptoms: {
      en: [
        "Irregular water-soaked spots rapidly enlarging into brown-black lesions.",
        "Delicate white fungal mildew visible on the leaf undersides in humid mornings.",
        "Foul rotting odor and total foliage collapse within days if untreated."
      ],
      ta: [
        "இலைகளில் ஒழுங்கற்ற வடிவத்தில் நீர் ஊறிய புள்ளிகள் தோன்றி விரைவாக கரும்பழுப்பு நிறமாக மாறுதல்.",
        "ஈரப்பதமான காலையில் இலையின் அடிப்பகுதியில் மெல்லிய வெள்ளை நிறப் பூஞ்சை வளர்தல்.",
        "கவனிக்காவிட்டால் பயிர் முழுவதும் அழுகி துர்நாற்றம் வீசி கருகிவிடுதல்."
      ],
      hi: [
        "अनियमित आकार के पानी सोखे काले-भूरे तेजी से फैलने वाले धब्बे।",
        "सुबह के समय पत्ती की निचली सतह पर सफेद रुई जैसी फफूंद दिखाई देना।",
        "उपचार न करने पर कुछ ही दिनों में पूरा पौधा सड़कर दुर्गंध देने लगता है।"
      ]
    },
    weatherTriggers: {
      en: "Cool cloudy conditions (15°C - 20°C) with continuous wetness and relative humidity > 90%.",
      ta: "15°C - 20°C குளிர்ந்த மேகமூட்டமான வானிலை மற்றும் 90% க்கும் அதிகமான தொடர் ஈரப்பதம்.",
      hi: "15°C से 20°C ठंडा, बादलों वाला मौसम और 90% से अधिक लगातार नमी।"
    },
    causes: {
      en: "Oomycete water mold (Phytophthora) spreading explosively via windblown sporangia.",
      ta: "காற்றினால் எளிதில் அடித்துச் செல்லப்படும் பூஞ்சை வித்துக்களால் அதிவேகமாகப் பரவுகிறது.",
      hi: "हवा द्वारा उड़कर आने वाले बीजाणु जो अनुकूल मौसम में रातों-रात पूरे खेत को चपेट में ले लेते हैं।"
    },
    organicTreatments: [
      {
        title: {
          en: "Sour Butter-Milk & Copper Mixture",
          ta: "புளித்த மோர் & தாமிரக் கரைசல்",
          hi: "खट्टी छाछ एवं तांबे का घोल"
        },
        description: {
          en: "Ferment 5L churned sour buttermilk with a copper rod in an earthen pot for 7 days. Dilute with 100L water and spray.",
          ta: "5 லிட்டர் புளித்த மோரில் தாமிரக் கம்பியை வைத்து மண் பானையில் 7 நாட்கள் நொதிக்க வைக்கவும். 100 லிட்டர் நீரில் கலந்து தெளிக்கவும்.",
          hi: "5 लीटर खट्टी छाछ में तांबे का टुकड़ा डालकर मिट्टी के घड़े में 7 दिन रखें। 100 लीटर पानी में मिलाकर छिड़कें।"
        },
        dosagePerLiter: "50 ml / Litre of water",
        tag: "Organic"
      }
    ],
    chemicalTreatments: [
      {
        title: {
          en: "Cymoxanil 8% + Mancozeb 64% WP",
          ta: "சைமோக்சானில் 8% + மேன்கோசெப் 64% WP",
          hi: "साइमोक्सानिल 8% + मैंकोजेब 64% WP"
        },
        description: {
          en: "Systemic translaminar + contact protective fungicide specifically formulated for destructive late blight control.",
          ta: "இலையினூடாக ஊடுருவி தீவிர பின் கருகல் நோயைக் கட்டுப்படுத்தும் சக்தி வாய்ந்த இரட்டை மருந்து.",
          hi: "पछेती झुलसा को रोकने के लिए सबसे असरदार संयुक्त प्रणालीगत व संपर्क फफूंदनाशक।"
        },
        dosagePerLiter: "3 g / Litre of water",
        safetyPrecaution: {
          en: "Spray within 48 hours of infection onset before blight spreads to tubers.",
          ta: "நோய் கிழங்குகளுக்குப் பரவும் முன் 48 மணி நேரத்திற்குள் தெளிக்கவும்.",
          hi: "संक्रमण दिखने के 48 घंटे के भीतर तुरंत स्प्रे करें ताकि आलू के कंद खराब न हों।"
        },
        tag: "Chemical"
      }
    ],
    preventiveMeasures: {
      en: [
        "Earthing up soil around potato hills prevents fungal spores washing down into tubers.",
        "Ensure wide plant spacing for free air circulation."
      ],
      ta: [
        "உருளைக்கிழங்கு செடிகளின் வேர்ப் பகுதியில் மண் அணைத்து மேடாக்கவும், இதனால் வித்துக்கள் கிழங்கில் இறங்காது.",
        "செடிகளுக்கு இடையே நல்ல காற்றோட்டம் இருக்கும்படி இடைவெளி விடவும்."
      ],
      hi: [
        "पौधों पर मिट्टी अच्छी तरह चढ़ाएं ताकि बारिश में बीजाणु नीचे कंदों तक न पहुंचें।",
        "पौधों के बीच पर्याप्त दूरी रखें जिससे धूप और हवा मिलती रहे।"
      ]
    },
    boundingBoxes: [
      {
        x: 52,
        y: 32,
        width: 25,
        height: 20,
        label: {
          en: "Water-soaked necro-lesion",
          ta: "நீர் ஊறிய கருகல் பகுதி",
          hi: "जल-शोषित काला धब्बा"
        }
      },
      {
        x: 32,
        y: 60,
        width: 24,
        height: 22,
        label: {
          en: "Rapid sporulation zone",
          ta: "பூஞ்சை வித்து மண்டலம்",
          hi: "फफूंद फैलाव क्षेत्र"
        }
      }
    ],
    sampleImage: LEAF_IMAGES.potatoLateBlight
  }
};
