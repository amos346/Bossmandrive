import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, GitCompare, MessageSquare, Check, Trash2, ArrowRight } from 'lucide-react';
import { Car } from '../types/car';
import { formatNaira, formatUsd, formatKm, generateWhatsAppUrl, buildCarInquiryMessage } from '../utils/formatters';
import { WHATSAPP_AGENTS } from '../data/cars';

interface CompareModalProps {
  cars: Car[];
  currency: 'NGN' | 'USD';
  onClose: () => void;
  onRemove: (carId: string) => void;
  onSelectCar: (car: Car) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  cars,
  currency,
  onClose,
  onRemove,
  onSelectCar,
}) => {
  if (cars.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 lg:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-5xl bg-[#0f121a] border border-white/15 rounded-2xl overflow-hidden shadow-2xl my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-[#141824] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-[#d4af37]" />
              <h2 className="text-base font-bold text-white">
                Vehicle Side-by-Side Comparison ({cars.length} selected)
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors"
              aria-label="Close vehicle comparison"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Matrix Content */}
          <div className="overflow-x-auto flex-1 p-6">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr>
                  <th className="p-3 bg-[#131722] text-neutral-400 font-semibold w-36">Specifications</th>
                  {cars.map((car) => (
                    <th key={car.id} className="p-3 bg-[#161b29] text-white border-l border-white/10 min-w-[220px]">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-extrabold text-sm leading-snug line-clamp-2">
                          {car.year} {car.make} {car.model}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemove(car.id)}
                          className="text-neutral-500 hover:text-red-400 p-1"
                          title="Remove from comparison"
                          aria-label="Remove vehicle from comparison"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="aspect-[16/10] bg-[#1a1f2c] rounded-lg overflow-hidden mb-2">
                        <img
                          src={car.images[0]}
                          alt={car.model}
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.dataset.triedFallback) {
                              target.dataset.triedFallback = 'true';
                              target.src = '/images/hero_luxury_dealership_showroom.jpg';
                            }
                          }}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-base font-bold text-[#d4af37] tabular-nums">
                        {currency === 'NGN' ? formatNaira(car.priceNgn) : formatUsd(car.priceUsd)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-3 font-semibold text-neutral-400 bg-[#131722]">Condition</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-3 text-white border-l border-white/10 font-medium">
                      {car.condition}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-neutral-400 bg-[#131722]">Engine</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-3 text-neutral-200 border-l border-white/10">
                      {car.engine}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-neutral-400 bg-[#131722]">Horsepower</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-3 text-white border-l border-white/10 tabular-nums font-semibold">
                      {car.horsepower} hp
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-neutral-400 bg-[#131722]">Odometer</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-3 text-neutral-200 border-l border-white/10 tabular-nums">
                      {formatKm(car.mileageKm)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-neutral-400 bg-[#131722]">Transmission</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-3 text-neutral-200 border-l border-white/10">
                      {car.transmission}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-neutral-400 bg-[#131722]">Showroom Location</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-3 text-neutral-200 border-l border-white/10">
                      {car.location}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-neutral-400 bg-[#131722]">Customs Clearance</td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-3 text-emerald-400 border-l border-white/10 font-medium">
                      {car.dutyStatus}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-neutral-400 bg-[#131722]">Actions</td>
                  {cars.map((car) => {
                    const agent = car.location.toLowerCase().includes('abuja')
                      ? WHATSAPP_AGENTS[2]
                      : WHATSAPP_AGENTS[0];
                    const waUrl = generateWhatsAppUrl(agent.phone, buildCarInquiryMessage(car, 'inquiry'));
                    return (
                      <td key={car.id} className="p-3 border-l border-white/10">
                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onSelectCar(car);
                            }}
                            className="w-full py-1.5 px-2.5 bg-white/10 hover:bg-white/15 text-white rounded text-[11px] font-semibold transition-colors"
                          >
                            Inspect Specs
                          </button>
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 bg-[#25D366] hover:bg-[#20ba59] text-neutral-950 rounded text-[11px] font-bold transition-colors"
                          >
                            <MessageSquare className="w-3 h-3 fill-current" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
