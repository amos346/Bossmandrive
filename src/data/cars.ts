import { Car, WhatsAppAgent } from '../types/car';
import heroShowroomImg from '../assets/images/hero_luxury_dealership_showroom.jpg';
import carG63Img from '../assets/images/car_mercedes_g63_amg.jpg';
import carLx600Img from '../assets/images/car_lexus_lx600_suv.jpg';
import carLc300Img from '../assets/images/car_landcruiser_300.jpg';
import carRangeRoverImg from '../assets/images/car_range_rover_autobiography.jpg';

export const HERO_SHOWROOM_IMAGE = heroShowroomImg;

export const WHATSAPP_AGENTS: WhatsAppAgent[] = [
  {
    id: 'agent-tunde',
    name: 'Alhaji Tunde Adeleke',
    role: 'VIP Sales Lead & Luxury Fleet Curator',
    location: 'Victoria Island Showroom, Lagos',
    phone: '2348039876543',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'agent-chidinma',
    name: 'Chidinma Kalu',
    role: 'Tokunbo Clearance & Direct Import Desk',
    location: 'Lekki Phase 1 Hub, Lagos',
    phone: '2348123456789',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
  },
  {
    id: 'agent-ibrahim',
    name: 'Ibrahim Danjuma',
    role: 'Diplomatic & Armored Fleet Consultant',
    location: 'Maitama Executive Centre, Abuja',
    phone: '2348099887766',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
  },
];

export const CARS_DATA: Car[] = [
  {
    id: 'bm-g63-2023',
    make: 'Mercedes-Benz',
    model: 'AMG G 63 Magno Night Edition',
    year: 2023,
    priceNgn: 285000000,
    priceUsd: 190000,
    condition: 'Foreign Used (Tokunbo)',
    bodyType: 'SUV',
    mileageKm: 9800,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '4.0L Bi-Turbo V8 Handcrafted',
    horsepower: 577,
    color: 'Matte Night Black Magno',
    interior: 'Bengal Red & Black Exclusive Nappa Leather',
    location: 'Victoria Island, Lagos',
    dutyStatus: 'Full Customs Duty Paid & NCS Verified',
    vinVerified: true,
    featured: true,
    images: [
      carG63Img,
      heroShowroomImg,
    ],
    keyFeatures: [
      'AMG Night Package II with Obsidian Accents',
      'Burmester® Surround Sound System (15 Speakers)',
      'Dual 12.3-inch Digital Widescreen Cockpit',
      '22-inch AMG Cross-Spoke Forged Matte Wheels',
      'AMG Performance Exhaust System with Dual Side Pipes',
      'Distronic Plus Adaptive Cruise & 360 Surround View'
    ],
    description: 'Pristine 2023 G63 AMG imported directly from Germany with zero accidents and clean Carfax. Complete Single Goods Declaration (SGD) Nigerian customs duty fully documented. Victoria Island showroom ready for immediate physical or video inspection.'
  },
  {
    id: 'bm-lx600-2024',
    make: 'Lexus',
    model: 'LX 600 VIP Executive 4-Seater',
    year: 2024,
    priceNgn: 245000000,
    priceUsd: 163000,
    condition: 'Brand New',
    bodyType: 'SUV',
    mileageKm: 45,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '3.5L Twin-Turbo V6',
    horsepower: 409,
    color: 'Sonic Quartz Pearl White',
    interior: 'Caramel Semi-Aniline Leather with Wood Inlay',
    location: 'Maitama, Abuja',
    dutyStatus: 'Brand New Import - Duty Cleared',
    vinVerified: true,
    featured: true,
    images: [
      carLx600Img,
      heroShowroomImg,
    ],
    keyFeatures: [
      'Ultra Luxury 4-Seat Executive Lounge Configuration',
      'Rear Seat Ottoman with Massage & Independent Climate',
      'Mark Levinson® 25-Speaker Reference Audio',
      'Active Height Control (AHC) & Adaptive Suspension',
      'Dual 11.4-inch Rear Entertainment Touchscreens',
      'Cool Box Refrigerator Console & Wireless Charging'
    ],
    description: 'Brand new 0-mileage 2024 Lexus LX 600 VIP Edition in Abuja. Built for premier Nigerian executives demanding uncompromised road presence, whisper-quiet cabin insulation, and supreme passenger luxury.'
  },
  {
    id: 'bm-lc300-2024',
    make: 'Toyota',
    model: 'Land Cruiser 300 VXR Twin Turbo',
    year: 2024,
    priceNgn: 195000000,
    priceUsd: 130000,
    condition: 'Brand New',
    bodyType: 'SUV',
    mileageKm: 30,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '3.5L Twin-Turbo V6 D-4ST',
    horsepower: 409,
    color: 'Silver Metallic Prestige',
    interior: 'Beige Premium Leather 7-Seater',
    location: 'Lekki Phase 1, Lagos',
    dutyStatus: 'Brand New Import - Duty Cleared',
    vinVerified: true,
    featured: true,
    images: [
      carLc300Img,
      heroShowroomImg,
    ],
    keyFeatures: [
      'Full-Time 4WD with Multi-Terrain Select & Crawl Control',
      'JBL® 14-Speaker Premium Sound System',
      '12.3-inch Navigation Display with Apple CarPlay & Android Auto',
      'Factory Cool Box Center Refrigerator',
      'Toyota Safety Sense 2.0 with Lane Tracing Assist',
      'Power Tailgate with Kick Sensor & 360 Panoramic Monitor'
    ],
    description: 'The undisputed king of Nigerian expressways and rugged terrains. Brand new 2024 Land Cruiser 300 VXR with 10-speed automatic transmission. Ready for immediate handover in Lekki Phase 1.'
  },
  {
    id: 'bm-rr-autobiography-2023',
    make: 'Land Rover',
    model: 'Range Rover Autobiography LWB',
    year: 2023,
    priceNgn: 260000000,
    priceUsd: 173000,
    condition: 'Foreign Used (Tokunbo)',
    bodyType: 'SUV',
    mileageKm: 14200,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '4.4L Twin-Turbocharged V8',
    horsepower: 523,
    color: 'British Emerald Green Metallic',
    interior: 'Perlino Semi-Aniline Leather with Walnut Veneer',
    location: 'Victoria Island, Lagos',
    dutyStatus: 'Full Customs Duty Paid & NCS Verified',
    vinVerified: true,
    featured: true,
    images: [
      carRangeRoverImg,
      heroShowroomImg,
    ],
    keyFeatures: [
      'Long Wheelbase (LWB) Executive Class Comfort-Plus',
      'Meridian™ Signature Sound System (35 Speakers & Subwoofer)',
      'Active Noise Cancellation in Headrests',
      'All-Wheel Steering & Electronic Air Suspension',
      'Soft-Close Doors with Power Assist deployable steps',
      'Cabin Air Purification Pro with PM2.5 filtration'
    ],
    description: 'A masterpiece of British automotive refinement. Finished in exquisite Emerald Green with Long Wheelbase rear lounge seating. Imported directly with verified NCS customs duty clearing and zero fault history.'
  },
  {
    id: 'bm-gle450-2023',
    make: 'Mercedes-Benz',
    model: 'GLE 450 4MATIC AMG-Line',
    year: 2023,
    priceNgn: 118000000,
    priceUsd: 78500,
    condition: 'Foreign Used (Tokunbo)',
    bodyType: 'SUV',
    mileageKm: 21500,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    engine: '3.0L Turbo Inline-6 with EQ Boost',
    horsepower: 375,
    color: 'Polar White',
    interior: 'Black Anthracite Leather with Panoramic Roof',
    location: 'Maitama, Abuja',
    dutyStatus: 'Full Customs Duty Paid & NCS Verified',
    vinVerified: true,
    featured: false,
    images: [
      carG63Img,
      heroShowroomImg,
    ],
    keyFeatures: [
      'AMG Body Styling with 21-inch Multispoke Wheels',
      'MBUX Augmented Reality Navigation',
      'Burmester® Surround Sound System',
      'Panoramic Sliding Sunroof',
      'Active Parking Assist with PARKTRONIC 360 Cameras',
      'Airmatic Air Suspension with Adaptive Damping'
    ],
    description: 'Versatile and prestigious 2023 GLE 450 featuring mild-hybrid EQ Boost for effortless acceleration and superior fuel efficiency on Nigerian interstates. Verified customs documents ready for inspection.'
  },
  {
    id: 'bm-rx350-2022',
    make: 'Lexus',
    model: 'RX 350 F-Sport AWD',
    year: 2022,
    priceNgn: 58000000,
    priceUsd: 38700,
    condition: 'Foreign Used (Tokunbo)',
    bodyType: 'SUV',
    mileageKm: 34000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '3.5L V6 24-Valve DOHC',
    horsepower: 295,
    color: 'Caviar Black Metallic',
    interior: 'Circuit Red NuLuxe Leather Interior',
    location: 'Lekki Phase 1, Lagos',
    dutyStatus: 'Full Customs Duty Paid & NCS Verified',
    vinVerified: true,
    featured: false,
    images: [
      carLx600Img,
      heroShowroomImg,
    ],
    keyFeatures: [
      'F-Sport Tuned Adaptive Variable Suspension',
      'Sport Bolstered Heated & Ventilated Front Seats',
      '12.3-inch Touchscreen with Navigation & Remote Touch',
      'Blind Spot Monitor with Rear Cross Traffic Alert',
      'Lexus Safety System+ 2.0 with Pre-Collision Pedestrian Detect',
      'Hands-Free Power Rear Liftgate'
    ],
    description: 'Nigeria’s most reliable luxury crossover. F-Sport package with signature mesh grille, aggressive front bumper, and bulletproof reliability for daily commuting in Lagos and Abuja.'
  },
  {
    id: 'bm-s580-2021',
    make: 'Mercedes-Benz',
    model: 'S 580 4MATIC Executive Saloon',
    year: 2021,
    priceNgn: 135000000,
    priceUsd: 90000,
    condition: 'Foreign Used (Tokunbo)',
    bodyType: 'Sedan',
    mileageKm: 28000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '4.0L V8 Bi-Turbo with EQ Boost',
    horsepower: 496,
    color: 'Obsidian Black Metallic',
    interior: 'Sienna Brown Exclusive Nappa Leather',
    location: 'Victoria Island, Lagos',
    dutyStatus: 'Full Customs Duty Paid & NCS Verified',
    vinVerified: true,
    featured: false,
    images: [
      heroShowroomImg,
      carG63Img,
    ],
    keyFeatures: [
      'OLED 12.8-inch Central Touchscreen with 3D Spatial Audio',
      'Rear Executive Chauffeur Seating with Calf Rests',
      'Digital Light Headlamps with Projection System',
      'Burmester® 3D High-End Surround Sound (31 Speakers)',
      'Rear-Axle Steering (Up to 10 degrees turning angle)',
      'Active Ambient Lighting with 64 Synchronized Colors'
    ],
    description: 'The pinnacle of luxury motoring. Imported directly from Texas with clean carfax, verified title, and authentic Single Goods Declaration. Parked in our air-conditioned Victoria Island vault.'
  },
  {
    id: 'bm-hilux-2023',
    make: 'Toyota',
    model: 'Hilux Adventure 4.0L V6 4x4 Double Cab',
    year: 2023,
    priceNgn: 64000000,
    priceUsd: 42600,
    condition: 'Foreign Used (Tokunbo)',
    bodyType: 'Truck',
    mileageKm: 18500,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '4.0L Dual VVT-i V6',
    horsepower: 235,
    color: 'Titanium Graphite Grey',
    interior: 'Adventure Dark Leather Interior',
    location: 'Victoria Island, Lagos',
    dutyStatus: 'Full Customs Duty Paid & NCS Verified',
    vinVerified: true,
    featured: false,
    images: [
      carLc300Img,
      heroShowroomImg,
    ],
    keyFeatures: [
      'Heavy Duty Off-Road Suspension & Snorkel Ready',
      'Electronic Locking Rear Differential',
      'Bedliner with Integrated Sports Bar & Roll Cover',
      'Dual Zone Automatic Climate Control with Rear Vents',
      'Smart Keyless Entry & Push-Button Ignition',
      'Touchscreen Infotainment with Reverse Camera'
    ],
    description: 'Rugged luxury engineering for the Nigerian terrain. Powered by the resilient 4.0L V6 engine, ideal for site inspections, regional travel, and heavy duty performance.'
  },
  {
    id: 'bm-gx460-2021',
    make: 'Lexus',
    model: 'GX 460 Luxury V8',
    year: 2021,
    priceNgn: 82000000,
    priceUsd: 54600,
    condition: 'Foreign Used (Tokunbo)',
    bodyType: 'SUV',
    mileageKm: 31000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engine: '4.6L Naturally Aspirated V8',
    horsepower: 301,
    color: 'Starfire Pearl White',
    interior: 'Sepia Semi-Aniline Leather with Gray Sapele Wood',
    location: 'Lekki Phase 1, Lagos',
    dutyStatus: 'Full Customs Duty Paid & NCS Verified',
    vinVerified: true,
    featured: false,
    images: [
      carLx600Img,
      heroShowroomImg,
    ],
    keyFeatures: [
      'Kinetic Dynamic Suspension System (KDSS)',
      'Mark Levinson® 17-Speaker Surround Sound',
      'Tri-Zone Climate Control with Interior Air Filter',
      'Power-Folding 3rd Row 7-Passenger Seating',
      'Full-Time 4WD with Torsen® Torque-Sensing Limited-Slip Diff',
      'Tow Hitch Receiver with Trailer Sway Control'
    ],
    description: 'The legendary bulletproof V8 engine cherished across Nigeria for its unyielding durability, plush comfort, and timeless resale value. Inspected and certified by BossmanDrive master technicians.'
  }
];

export const NIGERIAN_POPULAR_MAKES = ['Mercedes-Benz', 'Lexus', 'Toyota', 'Land Rover'];

export const TESTIMONIALS = [
  {
    quote: "BossmanDrive delivered my G63 AMG directly to my residence in Banana Island. All original customs papers were verified through the NCS portal before I transferred a single Naira. Absolute 5-star standard.",
    author: "Chief Emeka O.",
    title: "Chairman, Capital Assets & Logistics",
    location: "Ikoyi, Lagos",
    vehicle: "2023 Mercedes-AMG G63"
  },
  {
    quote: "Purchasing a Tokunbo vehicle in Nigeria is usually stressful with fake clearing papers everywhere. BossmanDrive provided the genuine SGD document, clean Carfax, and had the car inspected at their Maitama garage.",
    author: "Dr. Aisha Bello-Suleiman",
    title: "Managing Director, HealthCare Initiatives",
    location: "Maitama, Abuja",
    vehicle: "2024 Lexus LX 600 VIP"
  },
  {
    quote: "I swapped my 2018 Prado for a brand new 2024 LC300. The valuation was fair, no back-and-forth haggling on WhatsApp, and the handover was completed in under 24 hours.",
    author: "Kolawole Adeleke",
    title: "Co-Founder & CEO, FinTech Africa",
    location: "Lekki Phase 1, Lagos",
    vehicle: "2024 Toyota Land Cruiser 300"
  }
];
