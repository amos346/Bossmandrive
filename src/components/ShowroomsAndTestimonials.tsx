import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, MessageSquare, ShieldCheck, Star, Truck } from 'lucide-react';
import { TESTIMONIALS, WHATSAPP_AGENTS } from '../data/cars';
import { generateWhatsAppUrl } from '../utils/formatters';

export const ShowroomsAndTestimonials: React.FC = () => {
  const showrooms = [
    {
      city: 'Lagos',
      name: 'Victoria Island Flagship Vault',
      address: '14B Ahmadu Bello Way, Victoria Island, Lagos',
      focus: 'Brand New Supercars, AMG Editions & Bespoke Luxury',
      hours: 'Mon – Sat: 8:00 AM – 7:30 PM WAT',
      phone: '+234 803 987 6543',
      agent: WHATSAPP_AGENTS[0],
    },
    {
      city: 'Lagos',
      name: 'Lekki Phase 1 Hub',
      address: 'Plot 12 Admiralty Way, Lekki Phase 1, Lagos',
      focus: 'Pristine Tokunbo SUVs, Land Cruisers & Executive Trucks',
      hours: 'Mon – Sat: 8:30 AM – 7:00 PM WAT',
      phone: '+234 812 345 6789',
      agent: WHATSAPP_AGENTS[1],
    },
    {
      city: 'Abuja (FCT)',
      name: 'Maitama Executive Centre',
      address: '18 Gana Street, Maitama District, Abuja',
      focus: 'VIP Escort Fleets, Lexus LX 600 & Armored Spec Vehicles',
      hours: 'Mon – Sat: 9:00 AM – 8:00 PM WAT (Sunday by VIP appointment)',
      phone: '+234 809 988 7766',
      agent: WHATSAPP_AGENTS[2],
    },
  ];

  return (
    <>
      {/* Showroom Locations Section */}
      <section id="locations" className="py-20 bg-[#0e1119] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase mb-2">
              Physical Showrooms
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Visit our vaults in Lagos and Abuja.
            </h2>
            <p className="text-neutral-400 text-sm mt-3">
              Experience private viewings in our climate-controlled facilities or arrange an unhurried, white-glove test drive at your residence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {showrooms.map((showroom, idx) => {
              const waUrl = generateWhatsAppUrl(
                showroom.agent.phone,
                `Hello ${showroom.agent.name.split(' ')[0]}, I would like to visit the BossmanDrive ${showroom.name}. What time is best for a private walkthrough?`
              );

              return (
                <div
                  key={idx}
                  className="p-6 bg-[#141824] border border-white/10 rounded-2xl flex flex-col justify-between hover:border-[#d4af37]/40 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                        {showroom.city}
                      </span>
                      <span className="text-[11px] text-emerald-400 font-medium">Open Mon-Sat</span>
                    </div>

                    <h3 className="text-lg font-bold text-white">{showroom.name}</h3>

                    <div className="space-y-2.5 text-xs text-neutral-300">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{showroom.address}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                        <span className="text-neutral-400">{showroom.hours}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                        <span className="text-neutral-300">{showroom.focus}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                    <a
                      href={`tel:${showroom.phone.replace(/[^0-9]/g, '')}`}
                      className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{showroom.phone}</span>
                    </a>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#25D366] hover:underline"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp Desk</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nationwide Flatbed Strip */}
          <div className="mt-8 p-4 sm:p-5 bg-gradient-to-r from-[#17202c] via-[#121622] to-[#17202c] border border-white/10 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 text-[#d4af37] shrink-0 hidden sm:block" />
              <div>
                <h4 className="text-sm font-bold text-white">Outside Lagos or Abuja?</h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  We deliver directly to Port Harcourt, Ibadan, Asaba, Benin, Kano, Enugu, and Calabar with insured covered flatbed carriers.
                </p>
              </div>
            </div>
            <a
              href={generateWhatsAppUrl(
                WHATSAPP_AGENTS[0].phone,
                "Hello BossmanDrive, I'm inquiring about arranging covered flatbed car delivery outside Lagos/Abuja."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
            >
              Inquire on Inter-State Delivery
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-[#0b0d12] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase mb-2">
              VIP Client Records
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Trusted by corporate leaders and discerning Nigerian drivers.
            </h2>
            <p className="text-neutral-400 text-sm mt-3">
              Real deliveries, uncompromised integrity, and verified customs documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#12151e] border border-white/10 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#d4af37] mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs font-bold text-white">{t.author}</div>
                  <div className="text-[11px] text-neutral-400">{t.title}</div>
                  <div className="text-[11px] text-[#d4af37] mt-1">
                    Acquired: {t.vehicle} · {t.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
