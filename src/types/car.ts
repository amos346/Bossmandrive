export type VehicleCondition = 'Brand New' | 'Foreign Used (Tokunbo)' | 'Nigerian Used';

export type BodyType = 'SUV' | 'Sedan' | 'Truck' | 'Coupe';

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  priceNgn: number;
  priceUsd: number;
  condition: VehicleCondition;
  bodyType: BodyType;
  mileageKm: number;
  transmission: 'Automatic' | 'Dual-Clutch' | 'Manual';
  fuelType: 'Petrol' | 'Hybrid' | 'Diesel';
  engine: string;
  horsepower: number;
  color: string;
  interior: string;
  location: string; // e.g. "Victoria Island, Lagos", "Maitama, Abuja", "Lekki Phase 1, Lagos"
  dutyStatus: 'Full Customs Duty Paid & NCS Verified' | 'Brand New Import - Duty Cleared';
  vinVerified: boolean;
  featured: boolean;
  images: string[];
  keyFeatures: string[];
  description: string;
}

export interface WhatsAppAgent {
  id: string;
  name: string;
  role: string;
  location: string;
  phone: string; // Nigerian WhatsApp phone number
  avatar: string;
}

export interface FilterState {
  searchQuery: string;
  condition: string;
  bodyType: string;
  make: string;
  location: string;
  maxPriceNgn: number;
  sortBy: 'price-asc' | 'price-desc' | 'year-desc' | 'featured';
}
