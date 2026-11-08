import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, MessageSquare, ArrowRight } from 'lucide-react';
import { Car } from '../types/car';
import { formatNaira, formatUsd, generateWhatsAppUrl, buildCarInquiryMessage } from '../utils/formatters';
import { WHATSAPP_AGENTS } from '../data/cars';

interface SavedCarsDrawerProps {
  isOpen: boolean;
  savedCars: Car[];
  currency: 'NGN' | 'USD';
  onClose: () => void;
  onRemove: (carId: string) => void;
  onSelectCar: (car: Car) => void;
}

export const SavedCarsDrawer: React.FC<SavedCarsDrawerProps> = ({
  isOpen,
  savedCars,
  currency,
  onClose,
  onRemove,
  onSelectCar,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-[#0f121a] border-l border-white/10 h-full flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="p-5 bg-[#141824] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <h2 className="text-sm font-bold text-white">
                Saved Vehicles ({savedCars.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors"
              aria-label="Close saved vehicles drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {savedCars.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Heart className="w-10 h-10 text-neutral-600 mx-auto" />
                <h3 className="text-sm font-semibold text-white">No saved vehicles yet</h3>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  Click the heart icon on any vehicle card to save and compare later.
                </p>
              </div>
            ) : (
              savedCars.map((car) => {
                const agent = car.location.toLowerCase().includes('abuja')
                  ? WHATSAPP_AGENTS[2]
                  : WHATSAPP_AGENTS[0];
                const waUrl = generateWhatsAppUrl(agent.phone, buildCarInquiryMessage(car, 'inquiry'));

                return (
                  <div
                    key={car.id}
                    className="p-3 bg-[#161a26] border border-white/10 rounded-xl space-y-3 group"
                  >
                    <div className="flex gap-3">
                      <div className="w-24 aspect-[4/3] bg-[#1a1f2c] rounded-lg overflow-hidden shrink-0">
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
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4
                            onClick={() => {
                              onClose();
                              onSelectCar(car);
                            }}
                            className="text-xs font-bold text-white hover:text-[#d4af37] truncate cursor-pointer"
                          >
                            {car.year} {car.make} {car.model}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemove(car.id)}
                            className="text-neutral-500 hover:text-red-400 p-1"
                            title="Remove"
                            aria-label="Remove vehicle"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                          {car.condition} · {car.location.split(',')[0]}
                        </div>
                        <div className="text-sm font-extrabold text-[#d4af37] tabular-nums mt-1.5">
                          {currency === 'NGN' ? formatNaira(car.priceNgn) : formatUsd(car.priceUsd)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectCar(car);
                        }}
                        className="py-1.5 px-2 bg-white/5 hover:bg-white/10 text-white rounded text-[11px] font-semibold text-center transition-colors"
                      >
                        View Specs
                      </button>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 bg-[#25D366] hover:bg-[#20ba59] text-neutral-950 rounded text-[11px] font-bold transition-colors"
                      >
                        <MessageSquare className="w-3 h-3 fill-current" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
