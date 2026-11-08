import React from 'react';
import { motion } from 'motion/react';
import { Search, ShieldCheck, Truck, MapPin, ArrowRight } from 'lucide-react';
import { HERO_SHOWROOM_IMAGE, NIGERIAN_POPULAR_MAKES } from '../data/cars';

interface HeroProps {
  onSearch: (make: string, condition: string, bodyType: string) => void;
  onOpenWhatsApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onOpenWhatsApp }) => {
  const [selectedMake, setSelectedMake] = React.useState('all');
  const [selectedCondition, setSelectedCondition] = React.useState('all');
  const [selectedBodyType, setSelectedBodyType] = React.useState('all');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedMake, selectedCondition, selectedBodyType);
    const inventorySection = document.getElementById('inventory');
    if (inventorySection) {
      inventorySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0b0d12] border-b border-white/10">
      {/* Background Ambience & Showroom Image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={HERO_SHOWROOM_IMAGE}
          alt="BossmanDrive Victoria Island Luxury Showroom"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.triedFallback) {
              target.dataset.triedFallback = 'true';
              target.src = '/images/hero_luxury_dealership_showroom.jpg';
            }
          }}
          className="w-full h-full object-cover object-center opacity-30 filter saturate-75 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12] via-[#0b0d12]/80 to-[#0b0d12]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d4af37]/10 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl">
          {/* Natural human kicker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs tracking-wider uppercase font-semibold text-[#d4af37] mb-4"
          >
            <span>Lagos & Abuja Automotive Curators</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2018</span>
            <span aria-hidden="true">·</span>
            <span>100% Verified Customs Duty</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
            style={{ textWrap: 'balance' }}
          >
            The pinnacle of luxury and executive motoring in Nigeria.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mb-10"
          >
            Curating flawless Brand New and pristine Tokunbo vehicles with authentic Single Goods Declaration (SGD) customs clearance. Inspect at our Victoria Island and Maitama showrooms or enjoy insured covered flatbed delivery to your gate anywhere in Nigeria.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <a
              href="#inventory"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-[#d4af37] hover:bg-[#e5c05b] rounded-lg transition-all shadow-lg shadow-[#d4af37]/20 whitespace-nowrap"
            >
              <span>Explore Available Vehicles</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={onOpenWhatsApp}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg transition-colors whitespace-nowrap"
            >
              <span>Speak with a Concierge</span>
            </button>
          </motion.div>
        </div>

        {/* Quick Search & Filter Console */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="bg-[#12151e]/90 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 shadow-2xl"
        >
          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label htmlFor="quick-make" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Make / Manufacturer
              </label>
              <select
                id="quick-make"
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full bg-[#1a1f2c] border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#d4af37] transition-colors"
              >
                <option value="all">All Prestige Makes</option>
                {NIGERIAN_POPULAR_MAKES.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="quick-condition" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Vehicle Condition
              </label>
              <select
                id="quick-condition"
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full bg-[#1a1f2c] border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#d4af37] transition-colors"
              >
                <option value="all">All Conditions</option>
                <option value="Brand New">Brand New (Zero Mileage)</option>
                <option value="Foreign Used (Tokunbo)">Foreign Used (Tokunbo)</option>
                <option value="Nigerian Used">Certified Nigerian Used</option>
              </select>
            </div>

            <div>
              <label htmlFor="quick-body" className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Body Category
              </label>
              <select
                id="quick-body"
                value={selectedBodyType}
                onChange={(e) => setSelectedBodyType(e.target.value)}
                className="w-full bg-[#1a1f2c] border border-white/10 text-white text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#d4af37] transition-colors"
              >
                <option value="all">All Categories</option>
                <option value="SUV">Luxury SUV</option>
                <option value="Sedan">Executive Saloon</option>
                <option value="Truck">Rugged Pickup / Truck</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-neutral-950 bg-[#d4af37] hover:bg-[#e5c05b] rounded-lg transition-all shadow-md whitespace-nowrap"
              >
                <Search className="w-4 h-4" />
                <span>Search Inventory</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* 4-Column Proof & Assurance Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/10 mt-12">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-semibold text-white">100% NCS Customs Duty</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Authentic Single Goods Declaration (SGD) verified on arrival.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-semibold text-white">Covered Flatbed Transit</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Insured enclosed door-to-door delivery across all 36 states.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-semibold text-white">Lagos & Abuja Showrooms</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Victoria Island, Lekki Phase 1, and Maitama VIP lounges.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37] text-xs font-bold shrink-0 mt-0.5">
              ₦
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Transparent Pricing</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Fixed honest pricing in Naira with zero hidden clearing charges.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
