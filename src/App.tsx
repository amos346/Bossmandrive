/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CarFilter } from './components/CarFilter';
import { CarCard } from './components/CarCard';
import { CarModal } from './components/CarModal';
import { CarSwapCalculator } from './components/CarSwapCalculator';
import { CustomsGuarantee } from './components/CustomsGuarantee';
import { CompareModal } from './components/CompareModal';
import { SavedCarsDrawer } from './components/SavedCarsDrawer';
import { ShowroomsAndTestimonials } from './components/ShowroomsAndTestimonials';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { CARS_DATA } from './data/cars';
import { Car, FilterState } from './types/car';
import { RotateCcw } from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [savedCarIds, setSavedCarIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('bossmandrive_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [comparedCars, setComparedCars] = useState<Car[]>([]);
  const [selectedCarForModal, setSelectedCarForModal] = useState<Car | null>(null);
  const [carForSwapTarget, setCarForSwapTarget] = useState<Car | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const [filter, setFilter] = useState<FilterState>({
    searchQuery: '',
    condition: 'all',
    bodyType: 'all',
    make: 'all',
    location: 'all',
    maxPriceNgn: 400000000,
    sortBy: 'featured',
  });

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bossmandrive_saved', JSON.stringify(savedCarIds));
    } catch {
      // ignore
    }
  }, [savedCarIds]);

  const handleToggleSave = (carId: string) => {
    setSavedCarIds((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  const handleToggleCompare = (car: Car) => {
    setComparedCars((prev) => {
      const exists = prev.some((c) => c.id === car.id);
      if (exists) {
        return prev.filter((c) => c.id !== car.id);
      }
      if (prev.length >= 3) {
        // replace first item if full
        return [...prev.slice(1), car];
      }
      return [...prev, car];
    });
  };

  const handleRemoveCompare = (carId: string) => {
    setComparedCars((prev) => prev.filter((c) => c.id !== carId));
  };

  // Quick search from Hero section
  const handleHeroSearch = (make: string, condition: string, bodyType: string) => {
    setFilter((prev) => ({
      ...prev,
      make,
      condition,
      bodyType,
    }));
  };

  const handleOpenSwapWithCar = (car: Car) => {
    setCarForSwapTarget(car);
    const swapSection = document.getElementById('swap-calculator');
    if (swapSection) {
      swapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered and sorted cars
  const filteredCars = useMemo(() => {
    return CARS_DATA.filter((car) => {
      // Search query
      if (filter.searchQuery.trim()) {
        const q = filter.searchQuery.toLowerCase();
        const matchesQuery =
          car.make.toLowerCase().includes(q) ||
          car.model.toLowerCase().includes(q) ||
          car.year.toString().includes(q) ||
          car.engine.toLowerCase().includes(q) ||
          car.location.toLowerCase().includes(q) ||
          car.color.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Condition
      if (filter.condition !== 'all' && car.condition !== filter.condition) {
        return false;
      }

      // Body Type
      if (filter.bodyType !== 'all' && car.bodyType !== filter.bodyType) {
        return false;
      }

      // Make
      if (filter.make !== 'all' && car.make !== filter.make) {
        return false;
      }

      // Location
      if (filter.location !== 'all' && !car.location.toLowerCase().includes(filter.location.toLowerCase())) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filter.sortBy === 'price-asc') return a.priceNgn - b.priceNgn;
      if (filter.sortBy === 'price-desc') return b.priceNgn - a.priceNgn;
      if (filter.sortBy === 'year-desc') return b.year - a.year;
      // Default: featured first, then year
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.year - a.year;
    });
  }, [filter]);

  const savedCarsList = useMemo(() => {
    return CARS_DATA.filter((car) => savedCarIds.includes(car.id));
  }, [savedCarIds]);

  return (
    <div className="min-h-screen bg-[#0b0d12] text-neutral-100 selection:bg-[#d4af37] selection:text-neutral-950 font-sans">
      {/* Top Bar Navigation */}
      <Navbar
        currency={currency}
        onToggleCurrency={() => setCurrency((c) => (c === 'NGN' ? 'USD' : 'NGN'))}
        savedCount={savedCarIds.length}
        compareCount={comparedCars.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenWhatsApp={() => {
          // Open WhatsApp widget by dispatching event or finding trigger
          const waBtn = document.querySelector('[aria-label="Open BossmanDrive WhatsApp VIP Concierge"]') as HTMLElement;
          if (waBtn) waBtn.click();
        }}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onSearch={handleHeroSearch}
          onOpenWhatsApp={() => {
            const waBtn = document.querySelector('[aria-label="Open BossmanDrive WhatsApp VIP Concierge"]') as HTMLElement;
            if (waBtn) waBtn.click();
          }}
        />

        {/* Inventory Section */}
        <section id="inventory" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase mb-1.5">
                BossmanDrive Curated Vault
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Available Luxury Vehicles
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
              Every vehicle undergoes our 150-point diagnostic inspection and features verified Single Goods Declaration customs paperwork.
            </p>
          </div>

          {/* Interactive Filters Console */}
          <CarFilter
            filter={filter}
            onChange={setFilter}
            totalResults={filteredCars.length}
          />

          {/* Vehicles Grid */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  currency={currency}
                  isSaved={savedCarIds.includes(car.id)}
                  isCompared={comparedCars.some((c) => c.id === car.id)}
                  onToggleSave={handleToggleSave}
                  onToggleCompare={handleToggleCompare}
                  onSelectCar={(c) => setSelectedCarForModal(c)}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-[#12151e] rounded-2xl border border-white/10 p-8 space-y-4">
              <div className="text-neutral-500 text-sm">
                No vehicles matched your current filter criteria.
              </div>
              <button
                type="button"
                onClick={() =>
                  setFilter({
                    searchQuery: '',
                    condition: 'all',
                    bodyType: 'all',
                    make: 'all',
                    location: 'all',
                    maxPriceNgn: 400000000,
                    sortBy: 'featured',
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-neutral-950 bg-[#d4af37] hover:bg-[#e5c05b] rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </section>

        {/* Customs & Paperwork Guarantee */}
        <CustomsGuarantee />

        {/* Nigerian Car Swap / Trade-In Valuation Calculator */}
        <CarSwapCalculator initialTargetCar={carForSwapTarget} />

        {/* Lagos & Abuja Showrooms + Client Deliveries */}
        <ShowroomsAndTestimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Vehicle Inspection Detail Modal */}
      <CarModal
        car={selectedCarForModal}
        currency={currency}
        isSaved={selectedCarForModal ? savedCarIds.includes(selectedCarForModal.id) : false}
        isCompared={selectedCarForModal ? comparedCars.some((c) => c.id === selectedCarForModal.id) : false}
        onClose={() => setSelectedCarForModal(null)}
        onToggleSave={handleToggleSave}
        onToggleCompare={handleToggleCompare}
        onOpenSwapWithCar={handleOpenSwapWithCar}
      />

      {/* Compare Modal */}
      {isCompareModalOpen && (
        <CompareModal
          cars={comparedCars}
          currency={currency}
          onClose={() => setIsCompareModalOpen(false)}
          onRemove={handleRemoveCompare}
          onSelectCar={(c) => {
            setIsCompareModalOpen(false);
            setSelectedCarForModal(c);
          }}
        />
      )}

      {/* Saved / Favorites Drawer */}
      <SavedCarsDrawer
        isOpen={isSavedDrawerOpen}
        savedCars={savedCarsList}
        currency={currency}
        onClose={() => setIsSavedDrawerOpen(false)}
        onRemove={handleToggleSave}
        onSelectCar={(c) => {
          setIsSavedDrawerOpen(false);
          setSelectedCarForModal(c);
        }}
      />

      {/* Floating Animated WhatsApp Widget */}
      <WhatsAppWidget
        selectedCarForInquiry={
          selectedCarForModal
            ? {
                make: selectedCarForModal.make,
                model: selectedCarForModal.model,
                year: selectedCarForModal.year,
                priceNgn: selectedCarForModal.priceNgn,
                location: selectedCarForModal.location,
              }
            : null
        }
      />
    </div>
  );
}
