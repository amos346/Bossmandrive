import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MessageSquare,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  FileText,
  MapPin,
  Gauge,
  Zap,
  Settings2,
  Share2,
  ArrowRight,
  Heart,
  GitCompare,
} from 'lucide-react';
import { Car } from '../types/car';
import { formatNaira, formatUsd, formatKm, generateWhatsAppUrl, buildCarInquiryMessage } from '../utils/formatters';
import { WHATSAPP_AGENTS } from '../data/cars';

interface CarModalProps {
  car: Car | null;
  currency: 'NGN' | 'USD';
  isSaved: boolean;
  isCompared: boolean;
  onClose: () => void;
  onToggleSave: (carId: string) => void;
  onToggleCompare: (car: Car) => void;
  onOpenSwapWithCar?: (car: Car) => void;
}

export const CarModal: React.FC<CarModalProps> = ({
  car,
  currency,
  isSaved,
  isCompared,
  onClose,
  onToggleSave,
  onToggleCompare,
  onOpenSwapWithCar,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'inspection' | 'customs'>('specs');
  const [inspectionDate, setInspectionDate] = useState('');
  const [inspectionTime, setInspectionTime] = useState('11:00');
  const [inspectionShowroom, setInspectionShowroom] = useState('');
  const [bookedStatus, setBookedStatus] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (car) {
      setSelectedImageIndex(0);
      setActiveTab('specs');
      setInspectionShowroom(car.location);
      setBookedStatus(false);
      // Lock scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [car]);

  if (!car) return null;

  const agent = car.location.toLowerCase().includes('abuja')
    ? WHATSAPP_AGENTS[2]
    : car.location.toLowerCase().includes('lekki')
    ? WHATSAPP_AGENTS[1]
    : WHATSAPP_AGENTS[0];

  const handleWhatsAppInquiry = (actionType: 'inquiry' | 'inspection' | 'duty' | 'swap' = 'inquiry') => {
    let msg = buildCarInquiryMessage(car, actionType);
    if (actionType === 'inspection' && inspectionDate) {
      msg = `Hello BossmanDrive, I would like to confirm my private inspection booking for the ${car.year} ${car.make} ${car.model} (₦${new Intl.NumberFormat('en-NG').format(car.priceNgn)}) at your ${inspectionShowroom} showroom on ${inspectionDate} at ${inspectionTime}.`;
    }
    const url = generateWhatsAppUrl(agent.phone, msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleInspectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookedStatus(true);
    setTimeout(() => {
      handleWhatsAppInquiry('inspection');
    }, 600);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 lg:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl bg-[#0f121a] border border-white/15 rounded-2xl overflow-hidden shadow-2xl my-8 max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="px-6 py-4 bg-[#141824] border-b border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase">
                {car.condition}
              </span>
              <span className="text-neutral-600">·</span>
              <span className="text-xs text-neutral-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                {car.location}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Share vehicle link"
                aria-label="Share vehicle link"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onToggleCompare(car)}
                className={`p-2 rounded-lg transition-colors ${
                  isCompared ? 'bg-[#d4af37] text-neutral-950' : 'text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
                title="Compare vehicle"
                aria-label="Compare vehicle"
              >
                <GitCompare className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onToggleSave(car.id)}
                className={`p-2 rounded-lg transition-colors ${
                  isSaved ? 'text-red-500' : 'text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
                title="Save vehicle"
                aria-label="Save vehicle"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-1"
                aria-label="Close vehicle details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Content */}
          <div className="overflow-y-auto flex-1 p-6 space-y-8">
            {/* Top Grid: Main Image & Pricing Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Image Viewer */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-[16/10] bg-[#1a1f2c] rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={car.images[selectedImageIndex] || car.images[0]}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = '/images/hero_luxury_dealership_showroom.jpg';
                      }
                    }}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md text-xs text-white tabular-nums">
                    {selectedImageIndex + 1} / {car.images.length}
                  </div>
                </div>

                {/* Thumbnails */}
                {car.images.length > 1 && (
                  <div className="flex items-center gap-3">
                    {car.images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative w-20 aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === idx ? 'border-[#d4af37] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt="Thumbnail"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Key Details & Quick Actions */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-1">
                    {car.make} · {car.year} Edition
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
                    {car.model}
                  </h1>

                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-extrabold text-white tabular-nums tracking-tight">
                      {currency === 'NGN' ? formatNaira(car.priceNgn) : formatUsd(car.priceUsd)}
                    </span>
                    {currency === 'NGN' && (
                      <span className="text-sm text-neutral-400 tabular-nums">
                        ≈ {formatUsd(car.priceUsd)}
                      </span>
                    )}
                  </div>

                  {/* Trust Highlights */}
                  <div className="space-y-2.5 p-4 bg-white/5 rounded-xl border border-white/10 mb-6 text-xs text-neutral-300">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-white font-medium">{car.dutyStatus}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                      <span>Verified Clean VIN & Zero Flood/Accident History</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                      <span>Vault Location: <strong className="text-white">{car.location}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => handleWhatsAppInquiry('inquiry')}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-neutral-950 bg-[#25D366] hover:bg-[#20ba59] rounded-xl transition-all shadow-lg hover:shadow-emerald-900/40"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Inquire via WhatsApp with Agent {agent.name.split(' ')[0]}</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('inspection')}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Book Inspection</span>
                    </button>

                    {onOpenSwapWithCar && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenSwapWithCar(car);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#d4af37] bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/30 rounded-lg transition-colors"
                      >
                        <Settings2 className="w-3.5 h-3.5" />
                        <span>Swap My Car</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-white/10">
              <div className="flex items-center gap-4 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('specs')}
                  className={`pb-3 border-b-2 transition-colors ${
                    activeTab === 'specs'
                      ? 'border-[#d4af37] text-[#d4af37]'
                      : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  Technical Specifications & Equipment
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('inspection')}
                  className={`pb-3 border-b-2 transition-colors ${
                    activeTab === 'inspection'
                      ? 'border-[#d4af37] text-[#d4af37]'
                      : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  Schedule Showroom Test Drive
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('customs')}
                  className={`pb-3 border-b-2 transition-colors ${
                    activeTab === 'customs'
                      ? 'border-[#d4af37] text-[#d4af37]'
                      : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  Customs & Paperwork Assurance
                </button>
              </div>
            </div>

            {/* Tab 1: Specifications */}
            {activeTab === 'specs' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-[#141824] rounded-xl border border-white/5">
                    <span className="block text-xs text-neutral-400 mb-1">Engine</span>
                    <span className="text-sm font-bold text-white">{car.engine}</span>
                  </div>
                  <div className="p-4 bg-[#141824] rounded-xl border border-white/5">
                    <span className="block text-xs text-neutral-400 mb-1">Horsepower</span>
                    <span className="text-sm font-bold text-white tabular-nums">{car.horsepower} hp</span>
                  </div>
                  <div className="p-4 bg-[#141824] rounded-xl border border-white/5">
                    <span className="block text-xs text-neutral-400 mb-1">Transmission</span>
                    <span className="text-sm font-bold text-white">{car.transmission}</span>
                  </div>
                  <div className="p-4 bg-[#141824] rounded-xl border border-white/5">
                    <span className="block text-xs text-neutral-400 mb-1">Odometer</span>
                    <span className="text-sm font-bold text-white tabular-nums">{formatKm(car.mileageKm)}</span>
                  </div>
                  <div className="p-4 bg-[#141824] rounded-xl border border-white/5">
                    <span className="block text-xs text-neutral-400 mb-1">Exterior Finish</span>
                    <span className="text-sm font-bold text-white">{car.color}</span>
                  </div>
                  <div className="p-4 bg-[#141824] rounded-xl border border-white/5">
                    <span className="block text-xs text-neutral-400 mb-1">Interior Upholstery</span>
                    <span className="text-sm font-bold text-white">{car.interior}</span>
                  </div>
                  <div className="p-4 bg-[#141824] rounded-xl border border-white/5">
                    <span className="block text-xs text-neutral-400 mb-1">Fuel Economy</span>
                    <span className="text-sm font-bold text-white">{car.fuelType}</span>
                  </div>
                  <div className="p-4 bg-[#141824] rounded-xl border border-white/5">
                    <span className="block text-xs text-neutral-400 mb-1">Body Architecture</span>
                    <span className="text-sm font-bold text-white">{car.bodyType}</span>
                  </div>
                </div>

                {/* Key Features List */}
                <div>
                  <h2 className="text-sm font-bold text-white mb-3">Signature Equipment & Options</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {car.keyFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Curator Description */}
                <div>
                  <h2 className="text-sm font-bold text-white mb-2">Curator Notes</h2>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {car.description}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Schedule Inspection */}
            {activeTab === 'inspection' && (
              <div className="max-w-xl mx-auto p-6 bg-[#141824] rounded-2xl border border-white/10">
                <div className="text-center mb-6">
                  <Calendar className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
                  <h2 className="text-lg font-bold text-white">Private Showroom Inspection</h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Book an unhurried, private walkthrough and cold-start test drive with our lead vehicle concierge in Lagos or Abuja.
                  </p>
                </div>

                {bookedStatus ? (
                  <div className="text-center py-6 space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h4 className="text-base font-bold text-white">Inspection Request Initiated</h4>
                    <p className="text-xs text-neutral-300">
                      Redirecting to WhatsApp to confirm your appointment time with {agent.name}...
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInspectionSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="modal-showroom" className="block text-xs font-semibold text-neutral-400 mb-1.5">
                        Preferred Inspection Location
                      </label>
                      <select
                        id="modal-showroom"
                        value={inspectionShowroom}
                        onChange={(e) => setInspectionShowroom(e.target.value)}
                        className="w-full bg-[#1b2030] border border-white/10 text-white text-xs rounded-lg px-3 py-2.5 focus:border-[#d4af37]"
                      >
                        <option value="Victoria Island Showroom, Lagos">Victoria Island Showroom (Ahmadu Bello Way, VI, Lagos)</option>
                        <option value="Lekki Phase 1 Hub, Lagos">Lekki Phase 1 Hub (Admiralty Way, Lekki)</option>
                        <option value="Maitama Executive Centre, Abuja">Maitama Executive Centre (Gana St, Maitama, Abuja)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="modal-insp-date" className="block text-xs font-semibold text-neutral-400 mb-1.5">
                          Date
                        </label>
                        <input
                          id="modal-insp-date"
                          type="date"
                          required
                          value={inspectionDate}
                          onChange={(e) => setInspectionDate(e.target.value)}
                          className="w-full bg-[#1b2030] border border-white/10 text-white text-xs rounded-lg px-3 py-2.5 focus:border-[#d4af37]"
                        />
                      </div>

                      <div>
                        <label htmlFor="modal-insp-time" className="block text-xs font-semibold text-neutral-400 mb-1.5">
                          Time Window
                        </label>
                        <select
                          id="modal-insp-time"
                          value={inspectionTime}
                          onChange={(e) => setInspectionTime(e.target.value)}
                          className="w-full bg-[#1b2030] border border-white/10 text-white text-xs rounded-lg px-3 py-2.5 focus:border-[#d4af37]"
                        >
                          <option value="10:00 AM">10:00 AM - 12:00 PM</option>
                          <option value="01:00 PM">01:00 PM - 03:00 PM</option>
                          <option value="03:30 PM">03:30 PM - 05:30 PM</option>
                          <option value="06:00 PM">06:00 PM - 07:30 PM (VIP Evening)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-neutral-950 bg-[#d4af37] hover:bg-[#e5c05b] rounded-lg transition-all"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Confirm Appointment via WhatsApp</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Tab 3: Customs & Paperwork */}
            {activeTab === 'customs' && (
              <div className="space-y-6">
                <div className="p-5 bg-[#141824] rounded-2xl border border-emerald-500/20">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">Genuine Nigerian Customs Service (NCS) Paperwork</h2>
                      <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                        At BossmanDrive, we guarantee that all customs duties on this vehicle are 100% paid and legitimately assessed at Tin Can Island or Apapa Port. Every buyer receives the certified C-Number and Single Goods Declaration (SGD) verifiable on the official NCS portal.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-[#141824] rounded-xl border border-white/5 space-y-2">
                    <FileText className="w-4 h-4 text-[#d4af37]" />
                    <h3 className="font-bold text-white">Single Goods Declaration (SGD)</h3>
                    <p className="text-neutral-400">Authentic assessment document showing complete duty valuation and payment proof.</p>
                  </div>

                  <div className="p-4 bg-[#141824] rounded-xl border border-white/5 space-y-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                    <h3 className="font-bold text-white">Clean Title & Carfax Record</h3>
                    <p className="text-neutral-400">Certified history confirming zero flood damage, zero salvage title, and accurate mileage.</p>
                  </div>

                  <div className="p-4 bg-[#141824] rounded-xl border border-white/5 space-y-2">
                    <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                    <h3 className="font-bold text-white">Escort & Transit Insurance</h3>
                    <p className="text-neutral-400">Comprehensive transit cover during delivery to your residence in any Nigerian state.</p>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => handleWhatsAppInquiry('duty')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg transition-colors"
                  >
                    <FileText className="w-4 h-4 text-[#d4af37]" />
                    <span>Request NCS Paperwork Copy via WhatsApp</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
