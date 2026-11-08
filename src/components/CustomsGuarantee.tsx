import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, FileCheck, Search, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/formatters';
import { WHATSAPP_AGENTS } from '../data/cars';

export const CustomsGuarantee: React.FC = () => {
  const [vinQuery, setVinQuery] = useState('');
  const clearanceAgent = WHATSAPP_AGENTS[1]; // Chidinma - Customs desk

  const handleVerifyDuty = (e: React.FormEvent) => {
    e.preventDefault();
    const query = vinQuery.trim() || 'General Duty Verification Inquiry';
    const message = `Hello Chidinma (BossmanDrive Customs Desk), I would like to verify customs clearance / SGD paperwork for: ${query}. Please assist me with the status check.`;
    const url = generateWhatsAppUrl(clearanceAgent.phone, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="customs-guarantee" className="py-20 bg-[#0b0d12] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase mb-2">
            The BossmanDrive Integrity Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            100% Genuine Nigerian Customs Service (NCS) clearing.
          </h2>
          <p className="text-neutral-400 text-sm mt-3 max-w-2xl mx-auto">
            Never lose sleep over interstate checkpoint harassment or fraudulent documents. Every vehicle in our vault comes with an unadulterated Single Goods Declaration (SGD) and verifiable assessment receipt.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 bg-[#12151e] border border-white/10 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Authentic SGD & C-Number</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every Tokunbo and Brand New import includes the original Single Goods Declaration with an authentic C-Number verifiable on the official NCS portal.
            </p>
          </div>

          <div className="p-6 bg-[#12151e] border border-white/10 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Full Duty Paid Value</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Zero under-declaration shortcuts. All tariff bands and vehicle identification numbers (VIN) are accurately filed at Apapa and Tin Can ports.
            </p>
          </div>

          <div className="p-6 bg-[#12151e] border border-white/10 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Clean Title & Carfax Audit</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Independent international audit guarantees zero salvage history, zero flood submersion, and authentic unrolled odometer readings.
            </p>
          </div>

          <div className="p-6 bg-[#12151e] border border-white/10 rounded-xl space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Interstate Safe Passage</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Drive from Lagos to Abuja, Port Harcourt, or Enugu with absolute peace of mind. All clearance papers are backed by our legal warranty.
            </p>
          </div>
        </div>

        {/* Interactive VIN & Duty Verification Bar */}
        <div className="max-w-2xl mx-auto bg-[#141824] border border-[#d4af37]/30 rounded-2xl p-6 sm:p-8 text-center shadow-xl">
          <h3 className="text-base font-bold text-white mb-2">
            Have a VIN or customs reference you want our desk to audit?
          </h3>
          <p className="text-xs text-neutral-400 mb-6">
            Enter the 17-digit VIN or vehicle model below to send it to Chidinma at our Customs Verification Desk on WhatsApp.
          </p>

          <form onSubmit={handleVerifyDuty} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={vinQuery}
              onChange={(e) => setVinQuery(e.target.value)}
              placeholder="e.g. JTJHY7AX8M4... or 2023 Mercedes G63"
              className="w-full bg-[#1c2233] border border-white/15 text-white text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-[#d4af37]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-neutral-950 bg-[#25D366] hover:bg-[#20ba59] rounded-xl transition-all whitespace-nowrap shrink-0 shadow-md"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Verify on WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
