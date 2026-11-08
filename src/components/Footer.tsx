import React from 'react';
import { MessageSquare, ArrowUpRight, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/formatters';
import { WHATSAPP_AGENTS } from '../data/cars';

export const Footer: React.FC = () => {
  const defaultAgent = WHATSAPP_AGENTS[0];

  return (
    <footer className="bg-[#090b0f] text-neutral-400 text-xs border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              className="text-2xl font-extrabold tracking-tight text-white hover:text-[#e5c05b] transition-colors inline-block"
            >
              <span>BOSSMAN</span>
              <span className="text-[#d4af37] font-medium">DRIVE</span>
            </a>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Nigeria’s trusted destination for verified Brand New, Foreign Used (Tokunbo), and executive luxury vehicles. Operating out of Victoria Island, Lekki Phase 1, and Maitama Abuja with 100% genuine NCS customs documentation.
            </p>
            <div className="flex items-center gap-2 text-white font-medium text-xs pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>CAC Registered Automotive Entity (Nigeria)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Inventory & Models
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#inventory" className="hover:text-white transition-colors">
                  Mercedes-AMG & Maybach
                </a>
              </li>
              <li>
                <a href="#inventory" className="hover:text-white transition-colors">
                  Lexus LX 600 & GX 460
                </a>
              </li>
              <li>
                <a href="#inventory" className="hover:text-white transition-colors">
                  Toyota Land Cruiser 300 VXR
                </a>
              </li>
              <li>
                <a href="#inventory" className="hover:text-white transition-colors">
                  Range Rover Autobiography
                </a>
              </li>
              <li>
                <a href="#inventory" className="hover:text-white transition-colors">
                  Armored & Escort Fleets
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Client Services
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#customs-guarantee" className="hover:text-white transition-colors">
                  NCS Customs Verification
                </a>
              </li>
              <li>
                <a href="#swap-calculator" className="hover:text-white transition-colors">
                  Car Swap & Trade-In
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-white transition-colors">
                  Private Showroom Inspection
                </a>
              </li>
              <li>
                <a
                  href={generateWhatsAppUrl(
                    defaultAgent.phone,
                    'Hello BossmanDrive, I live abroad and would like to order a car for delivery to Nigeria.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Diaspora Purchase Desk</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-white transition-colors">
                  Nationwide Covered Flatbed
                </a>
              </li>
            </ul>
          </div>

          {/* Showroom Direct */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Showrooms
            </h4>
            <div className="space-y-2.5 text-xs">
              <div>
                <strong className="text-white block">Victoria Island:</strong>
                <span>14B Ahmadu Bello Way, Lagos</span>
              </div>
              <div>
                <strong className="text-white block">Lekki Hub:</strong>
                <span>Plot 12 Admiralty Way, Lekki 1</span>
              </div>
              <div>
                <strong className="text-white block">Maitama Abuja:</strong>
                <span>18 Gana Street, Maitama</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} BossmanDrive Luxury Automotive Nigeria. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#customs-guarantee" className="hover:text-neutral-300">
              Customs Policy
            </a>
            <a href="#swap-calculator" className="hover:text-neutral-300">
              Trade-In Guidelines
            </a>
            <a
              href="/bossmandrive-production-project.zip"
              download="bossmandrive-production-project.zip"
              className="text-[#d4af37] hover:underline font-medium inline-flex items-center gap-1"
              title="Download complete project ZIP file ready for GitHub and Vercel"
            >
              <span>Download Project ZIP</span>
            </a>
            <a
              href={generateWhatsAppUrl(defaultAgent.phone, 'Hello BossmanDrive, I need general assistance.')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline inline-flex items-center gap-1"
            >
              <MessageSquare className="w-3 h-3 fill-current" />
              <span>WhatsApp Direct Line</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
