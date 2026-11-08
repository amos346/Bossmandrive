import React from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { FilterState } from '../types/car';
import { NIGERIAN_POPULAR_MAKES } from '../data/cars';

interface CarFilterProps {
  filter: FilterState;
  onChange: (newFilter: FilterState) => void;
  totalResults: number;
}

export const CarFilter: React.FC<CarFilterProps> = ({
  filter,
  onChange,
  totalResults,
}) => {
  const handleReset = () => {
    onChange({
      searchQuery: '',
      condition: 'all',
      bodyType: 'all',
      make: 'all',
      location: 'all',
      maxPriceNgn: 400000000,
      sortBy: 'featured',
    });
  };

  const conditions = [
    { label: 'All Inventory', value: 'all' },
    { label: 'Brand New', value: 'Brand New' },
    { label: 'Tokunbo (Foreign Used)', value: 'Foreign Used (Tokunbo)' },
    { label: 'Nigerian Used', value: 'Nigerian Used' },
  ];

  const bodyTypes = [
    { label: 'All Bodies', value: 'all' },
    { label: 'Luxury SUV', value: 'SUV' },
    { label: 'Executive Saloon', value: 'Sedan' },
    { label: 'Rugged Pickup', value: 'Truck' },
  ];

  const locations = [
    { label: 'All Showrooms', value: 'all' },
    { label: 'Victoria Island, Lagos', value: 'Victoria Island' },
    { label: 'Lekki Phase 1, Lagos', value: 'Lekki' },
    { label: 'Maitama, Abuja', value: 'Maitama' },
  ];

  return (
    <div className="bg-[#12151e] border border-white/10 rounded-xl p-5 mb-8 space-y-5">
      {/* Search Bar & Primary Sort */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filter.searchQuery}
            onChange={(e) => onChange({ ...filter, searchQuery: e.target.value })}
            placeholder="Search by make, model, year, or keyword (e.g., G63, LX600, Prado, V8)..."
            className="w-full bg-[#181d2a] border border-white/10 text-white text-xs sm:text-sm rounded-lg pl-10 pr-4 py-2.5 placeholder-neutral-500 focus:outline-none focus:border-[#d4af37] transition-colors"
          />
          {filter.searchQuery && (
            <button
              type="button"
              onClick={() => onChange({ ...filter, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort Dropdown & Result Count */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-xs text-neutral-400 tabular-nums">
            Showing <strong className="text-white">{totalResults}</strong> {totalResults === 1 ? 'vehicle' : 'vehicles'}
          </div>

          <select
            value={filter.sortBy}
            onChange={(e) => onChange({ ...filter, sortBy: e.target.value as any })}
            className="bg-[#181d2a] border border-white/10 text-white text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#d4af37] transition-colors"
          >
            <option value="featured">Featured Curations</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="year-desc">Newest Model Year</option>
          </select>

          {(filter.condition !== 'all' ||
            filter.bodyType !== 'all' ||
            filter.make !== 'all' ||
            filter.location !== 'all' ||
            filter.searchQuery !== '') && (
            <button
              type="button"
              onClick={handleReset}
              className="p-2.5 text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Segmented Controls for Condition */}
      <div>
        <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
          Vehicle Condition
        </div>
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#181d2a] rounded-lg border border-white/5">
          {conditions.map((c) => {
            const active = filter.condition === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => onChange({ ...filter, condition: c.value })}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  active
                    ? 'bg-[#d4af37] text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Quick Filter Badges / Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/5">
        {/* Make Filter */}
        <div>
          <label htmlFor="filter-make" className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
            Make
          </label>
          <select
            id="filter-make"
            value={filter.make}
            onChange={(e) => onChange({ ...filter, make: e.target.value })}
            className="w-full bg-[#181d2a] border border-white/10 text-white text-xs rounded-lg px-3 py-2 focus:border-[#d4af37] transition-colors"
          >
            <option value="all">All Makes</option>
            {NIGERIAN_POPULAR_MAKES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Body Type Filter */}
        <div>
          <label htmlFor="filter-body" className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
            Body Type
          </label>
          <select
            id="filter-body"
            value={filter.bodyType}
            onChange={(e) => onChange({ ...filter, bodyType: e.target.value })}
            className="w-full bg-[#181d2a] border border-white/10 text-white text-xs rounded-lg px-3 py-2 focus:border-[#d4af37] transition-colors"
          >
            {bodyTypes.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>

        {/* Showroom Location Filter */}
        <div>
          <label htmlFor="filter-location" className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
            Showroom Location
          </label>
          <select
            id="filter-location"
            value={filter.location}
            onChange={(e) => onChange({ ...filter, location: e.target.value })}
            className="w-full bg-[#181d2a] border border-white/10 text-white text-xs rounded-lg px-3 py-2 focus:border-[#d4af37] transition-colors"
          >
            {locations.map((loc) => (
              <option key={loc.value} value={loc.value}>
                {loc.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
