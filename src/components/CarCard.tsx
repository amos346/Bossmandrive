import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, GitCompare, MessageSquare, Check, Eye, MapPin, Shield } from 'lucide-react';
import { Car } from '../types/car';
import { formatNaira, formatUsd, formatKm, generateWhatsAppUrl, buildCarInquiryMessage } from '../utils/formatters';
import { WHATSAPP_AGENTS } from '../data/cars';

interface CarCardProps {
  car: Car;
  currency: 'NGN' | 'USD';
  isSaved: boolean;
  isCompared: boolean;
  onToggleSave: (carId: string) => void;
  onToggleCompare: (car: Car) => void;
  onSelectCar: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  currency,
  isSaved,
  isCompared,
  onToggleSave,
  onToggleCompare,
  onSelectCar,
}) => {
  const [imgError, setImgError] = useState(false);

  // Match agent based on car location or default
  const agent = car.location.toLowerCase().includes('abuja')
    ? WHATSAPP_AGENTS[2]
    : car.location.toLowerCase().includes('lekki')
    ? WHATSAPP_AGENTS[1]
    : WHATSAPP_AGENTS[0];

  const whatsAppMessage = buildCarInquiryMessage(car, 'inquiry');
  const whatsAppUrl = generateWhatsAppUrl(agent.phone, whatsAppMessage);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col bg-[#12151e] border border-white/10 hover:border-[#d4af37]/40 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/60"
    >
      {/* Visual Asset Container */}
      <div className="relative aspect-[4/3] bg-[#171b26] overflow-hidden">
        {!imgError && car.images[0] ? (
          <img
            src={car.images[0]}
            alt={`${car.year} ${car.make} ${car.model}`}
            onError={(e) => {
              const target = e.currentTarget;
              // If hashed asset fails, try root public /images/ path
              const cleanName = car.make.toLowerCase().includes('mercedes')
                ? '/images/car_mercedes_g63_amg.jpg'
                : car.make.toLowerCase().includes('lexus')
                ? '/images/car_lexus_lx600_suv.jpg'
                : car.make.toLowerCase().includes('land rover')
                ? '/images/car_range_rover_autobiography.jpg'
                : '/images/car_landcruiser_300.jpg';

              if (!target.dataset.triedFallback) {
                target.dataset.triedFallback = 'true';
                target.src = cleanName;
              } else {
                setImgError(true);
              }
            }}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#12151e] to-[#1a1f2c] text-neutral-400 text-center">
            <span className="text-sm font-semibold text-white mb-1">{car.make} {car.model}</span>
            <span className="text-xs text-neutral-500">{car.year} · Luxury Edition</span>
          </div>
        )}

        {/* Subtle Dark Gradient Overlay at bottom for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12151e] via-transparent to-black/20 pointer-events-none" />

        {/* Top Floating Controls: Favorite & Compare */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(car);
            }}
            className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
              isCompared
                ? 'bg-[#d4af37] text-neutral-950 shadow-md'
                : 'bg-black/40 text-neutral-300 hover:text-white hover:bg-black/60'
            }`}
            title={isCompared ? 'Remove from comparison' : 'Compare this vehicle'}
            aria-label="Compare vehicle"
          >
            <GitCompare className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(car.id);
            }}
            className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
              isSaved
                ? 'bg-red-500/90 text-white shadow-md'
                : 'bg-black/40 text-neutral-300 hover:text-white hover:bg-black/60'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save vehicle'}
            aria-label="Save vehicle"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Condition Clean Watermark / Tag */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-xs font-semibold text-white/90 drop-shadow-md tracking-wide">
            {car.condition}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title & Year */}
        <div className="mb-2">
          <span className="text-xs font-medium text-[#d4af37] tracking-wider uppercase">
            {car.make}
          </span>
          <h2
            onClick={() => onSelectCar(car)}
            className="text-lg font-bold text-white hover:text-[#d4af37] cursor-pointer transition-colors leading-snug line-clamp-1 mt-0.5"
          >
            {car.year} {car.model}
          </h2>
        </div>

        {/* Unboxed Metadata with Typographic Separators (§1.A Zero-Pill Discipline) */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-400 mb-3">
          <span className="tabular-nums font-medium text-neutral-300">{formatKm(car.mileageKm)}</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>{car.transmission}</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>{car.fuelType}</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>{car.horsepower} hp</span>
        </div>

        {/* Location & Customs Info */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-4">
          <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          <span className="truncate">{car.location}</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-emerald-400 font-medium truncate">NCS Duty Cleared</span>
        </div>

        {/* Spacer */}
        <div className="mt-auto pt-4 border-t border-white/10 flex items-baseline justify-between gap-3 mb-4">
          <div>
            <span className="block text-[11px] text-neutral-400 font-medium">Clearance Inclusive</span>
            <div className="text-xl font-extrabold text-white tabular-nums tracking-tight">
              {currency === 'NGN' ? formatNaira(car.priceNgn) : formatUsd(car.priceUsd)}
            </div>
          </div>
          {currency === 'NGN' && (
            <span className="text-xs text-neutral-500 tabular-nums">
              ≈ {formatUsd(car.priceUsd)}
            </span>
          )}
        </div>

        {/* Interactive Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onSelectCar(car)}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg transition-colors whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Specs</span>
          </button>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-950 bg-[#25D366] hover:bg-[#20ba59] rounded-lg transition-all shadow-sm hover:shadow-emerald-900/30 whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
};
