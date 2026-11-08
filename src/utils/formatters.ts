import { Car } from '../types/car';

export function formatNaira(amount: number, compact = false): string {
  if (compact) {
    if (amount >= 1_000_000_000) {
      return `₦${(amount / 1_000_000_000).toFixed(1)}B`;
    }
    if (amount >= 1_000_000) {
      return `₦${(amount / 1_000_000).toFixed(amount % 1_000_000 === 0 ? 0 : 1)}M`;
    }
  }
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount).replace('NGN', '₦');
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatKm(km: number): string {
  if (km <= 50) return 'Brand New (Zero KM)';
  return `${new Intl.NumberFormat('en-NG').format(km)} km`;
}

export function generateWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function buildCarInquiryMessage(car: Car, action: 'inquiry' | 'inspection' | 'duty' | 'swap' = 'inquiry'): string {
  switch (action) {
    case 'inspection':
      return `Hello BossmanDrive, I would like to schedule a private physical inspection/test drive for the ${car.year} ${car.make} ${car.model} (₦${new Intl.NumberFormat('en-NG').format(car.priceNgn)}) located in ${car.location}. Please let me know the available time slots this week.`;
    case 'duty':
      return `Good day BossmanDrive, please share the NCS Customs Single Goods Declaration (SGD) verification details and VIN report for the ${car.year} ${car.make} ${car.model} (₦${new Intl.NumberFormat('en-NG').format(car.priceNgn)}).`;
    case 'swap':
      return `Hello BossmanDrive, I would like to explore a car swap / trade-in against your ${car.year} ${car.make} ${car.model} (₦${new Intl.NumberFormat('en-NG').format(car.priceNgn)}). What is your valuation procedure?`;
    case 'inquiry':
    default:
      return `Hello BossmanDrive! I'm interested in the ${car.year} ${car.make} ${car.model} (₦${new Intl.NumberFormat('en-NG').format(car.priceNgn)}) currently at ${car.location}. Is it still available for purchase or immediate inspection?`;
  }
}
