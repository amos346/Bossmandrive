import React, { useState } from 'react';
import { MessageSquare, Heart, GitCompare, Menu, X, ArrowUpRight } from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/formatters';
import { WHATSAPP_AGENTS } from '../data/cars';

interface NavbarProps {
  currency: 'NGN' | 'USD';
  onToggleCurrency: () => void;
  savedCount: number;
  compareCount: number;
  onOpenSaved: () => void;
  onOpenCompare: () => void;
  onOpenWhatsApp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onToggleCurrency,
  savedCount,
  compareCount,
  onOpenSaved,
  onOpenCompare,
  onOpenWhatsApp,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const defaultAgent = WHATSAPP_AGENTS[0];
  const directWhatsAppUrl = generateWhatsAppUrl(
    defaultAgent.phone,
    "Hello BossmanDrive VIP concierge, I'd like to make an inquiry about your luxury inventory."
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0d12]/90 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <a
          href="#"
          className="text-2xl font-extrabold tracking-tight text-white hover:text-[#e5c05b] transition-colors whitespace-nowrap shrink-0 flex items-baseline gap-1"
        >
          <span>BOSSMAN</span>
          <span className="text-[#d4af37] font-medium tracking-normal">DRIVE</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <a
            href="#inventory"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Inventory
          </a>
          <a
            href="#customs-guarantee"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Customs Verification
          </a>
          <a
            href="#swap-calculator"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Sell & Swap
          </a>
          <a
            href="#locations"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Lagos & Abuja Showrooms
          </a>
          <a
            href="#testimonials"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            VIP Deliveries
          </a>
        </nav>

        {/* Zone 3: 1 primary action + minimal functional controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Currency Switcher */}
          <button
            type="button"
            onClick={onToggleCurrency}
            className="hidden sm:inline-flex items-center justify-center px-2.5 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors tabular-nums whitespace-nowrap"
            title="Toggle between Nigerian Naira and US Dollar reference"
          >
            {currency === 'NGN' ? '₦ NGN' : '$ USD'}
          </button>

          {/* Compare Button */}
          {compareCount > 0 && (
            <button
              type="button"
              onClick={onOpenCompare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-200 bg-white/5 hover:bg-white/10 border border-white/15 rounded-md transition-colors whitespace-nowrap"
            >
              <GitCompare className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Compare</span>
              <span className="ml-0.5 px-1.5 py-0.2 bg-[#d4af37] text-neutral-950 font-bold rounded text-[10px] tabular-nums">
                {compareCount}
              </span>
            </button>
          )}

          {/* Saved / Favorites */}
          <button
            type="button"
            onClick={onOpenSaved}
            className="relative p-2 text-neutral-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            title="Saved vehicles"
            aria-label="View saved vehicles"
          >
            <Heart className={`w-4 h-4 ${savedCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#d4af37] rounded-full" />
            )}
          </button>

          {/* Primary Action Button: WhatsApp VIP */}
          <button
            type="button"
            onClick={onOpenWhatsApp}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-[#d4af37] hover:bg-[#e5c05b] rounded-lg transition-all shadow-sm hover:shadow-md hover:shadow-[#d4af37]/20 whitespace-nowrap shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp VIP Concierge</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white rounded-md"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1118] border-b border-white/10 px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-neutral-300">
            <a
              href="#inventory"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4af37] py-1 transition-colors"
            >
              Browse Inventory
            </a>
            <a
              href="#customs-guarantee"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4af37] py-1 transition-colors"
            >
              Customs Paperwork Verification
            </a>
            <a
              href="#swap-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4af37] py-1 transition-colors"
            >
              Sell or Swap Your Vehicle
            </a>
            <a
              href="#locations"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4af37] py-1 transition-colors"
            >
              Showrooms: VI Lagos & Maitama Abuja
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#d4af37] py-1 transition-colors"
            >
              VIP Client Deliveries
            </a>
          </nav>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={onToggleCurrency}
              className="text-xs text-neutral-400 hover:text-white py-1"
            >
              Currency: <strong className="text-white">{currency}</strong>
            </button>
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#25D366] font-medium"
            >
              <span>Direct WhatsApp Desk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
