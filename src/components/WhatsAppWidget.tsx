import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, CheckCircle2, ShieldCheck, MapPin, ChevronRight, Phone } from 'lucide-react';
import { WHATSAPP_AGENTS } from '../data/cars';
import { generateWhatsAppUrl } from '../utils/formatters';

interface WhatsAppWidgetProps {
  selectedCarForInquiry?: {
    make: string;
    model: string;
    year: number;
    priceNgn: number;
    location: string;
  } | null;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ selectedCarForInquiry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState(WHATSAPP_AGENTS[0].id);
  const [customMessage, setCustomMessage] = useState('');
  const [hasNewNotice, setHasNewNotice] = useState(true);

  const activeAgent = WHATSAPP_AGENTS.find((a) => a.id === selectedAgentId) || WHATSAPP_AGENTS[0];

  const quickPrompts = [
    'Schedule private inspection in Lagos',
    'Verify NCS Customs SGD paperwork',
    'Get instant car swap / trade-in valuation',
    'Ask about armored & diplomatic escort vehicles',
    'Arrange flatbed delivery to Port Harcourt / Kano',
  ];

  const handleOpen = () => {
    setIsOpen(true);
    setHasNewNotice(false);
    if (selectedCarForInquiry && !customMessage) {
      setCustomMessage(
        `Hello BossmanDrive, I'm inquiring about the ${selectedCarForInquiry.year} ${selectedCarForInquiry.make} ${selectedCarForInquiry.model} in ${selectedCarForInquiry.location}. Is it available?`
      );
    }
  };

  const handleSend = (textToSend?: string) => {
    const message = textToSend || customMessage || "Hello BossmanDrive VIP Concierge, I'd like to make an inquiry about your luxury inventory.";
    const url = generateWhatsAppUrl(activeAgent.phone, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Modal Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[90vw] sm:w-[400px] max-h-[85vh] flex flex-col bg-[#0e1119] border border-white/15 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden mb-3"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#17202a] via-[#101b1b] to-[#0d2818] p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-neutral-950 font-bold shadow-md">
                    <MessageSquare className="w-5 h-5 fill-current" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0e1119] rounded-full" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>BossmanDrive VIP Concierge</span>
                    <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  </h2>
                  <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Live Desks in VI Lagos & Maitama Abuja</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close WhatsApp Concierge"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Agent Selector */}
            <div className="p-3 bg-[#131722] border-b border-white/10">
              <span className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Select Your Dedicated Specialist
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {WHATSAPP_AGENTS.map((agent) => {
                  const isSelected = agent.id === selectedAgentId;
                  return (
                    <button
                      key={agent.id}
                      type="button"
                      onClick={() => setSelectedAgentId(agent.id)}
                      className={`p-2 rounded-lg text-left transition-all ${
                        isSelected
                          ? 'bg-[#d4af37]/15 border border-[#d4af37]/60 text-white'
                          : 'bg-white/5 border border-transparent text-neutral-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="text-xs font-bold truncate">{agent.name.split(' ')[0]}</div>
                      <div className="text-[10px] text-neutral-400 truncate">{agent.location.split(',')[0]}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Agent Card Summary */}
              <div className="mt-2.5 p-2 bg-black/30 rounded-lg flex items-center justify-between text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#25D366]" />
                  <span className="font-medium text-white">{activeAgent.name}</span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-[11px] text-neutral-400 truncate max-w-[130px]">{activeAgent.role}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-neutral-400 shrink-0">
                  <MapPin className="w-3 h-3 text-[#d4af37]" />
                  <span>{activeAgent.location.includes('Abuja') ? 'Abuja' : 'Lagos'}</span>
                </div>
              </div>
            </div>

            {/* Conversation Prompts & Input */}
            <div className="p-4 space-y-4 overflow-y-auto max-h-[320px]">
              <div>
                <span className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Instant One-Tap Inquiries
                </span>
                <div className="space-y-1.5">
                  {quickPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className="w-full text-left p-2.5 bg-white/5 hover:bg-[#25D366]/10 hover:border-[#25D366]/30 border border-white/5 rounded-lg text-xs text-neutral-200 transition-all flex items-center justify-between group"
                    >
                      <span>{prompt}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#25D366] transition-colors shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Message Area */}
              <div>
                <label htmlFor="wa-custom-msg" className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Or Type Your Custom Request
                </label>
                <textarea
                  id="wa-custom-msg"
                  rows={2}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="e.g. Is the 2023 Mercedes G63 available for an inspection this Saturday at your Victoria Island vault?"
                  className="w-full bg-[#181d2a] border border-white/10 rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#25D366] transition-colors resize-none"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 bg-[#0a0d14] border-t border-white/10 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSend()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-neutral-950 bg-[#25D366] hover:bg-[#20ba59] rounded-lg transition-all shadow-md hover:shadow-[#25D366]/20"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Open in WhatsApp</span>
              </button>

              <a
                href={`tel:${activeAgent.phone}`}
                className="p-2.5 text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                title="Direct Phone Call"
                aria-label="Direct Phone Call"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Verified Footer Notice */}
            <div className="px-4 py-2 bg-black/40 text-[10px] text-neutral-500 text-center border-t border-white/5">
              Verified BossmanDrive Business Account · Average response &lt; 3 mins
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        type="button"
        onClick={handleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-3 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-neutral-950 font-bold rounded-full shadow-2xl shadow-[#25D366]/30 border-2 border-white/20 transition-all cursor-pointer"
        aria-label="Open BossmanDrive WhatsApp VIP Concierge"
      >
        <div className="relative flex items-center justify-center">
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full ring-2 ring-[#25D366]" />
        </div>
        <span className="text-xs font-extrabold tracking-wide hidden sm:inline-block">
          WhatsApp Concierge
        </span>

        {/* Pulsing Ring for High Vis */}
        <span className="absolute inset-0 rounded-full border border-[#25D366] animate-ping opacity-25 pointer-events-none" />

        {/* Small Notice Badge */}
        {hasNewNotice && (
          <span className="absolute -top-1.5 -left-1.5 bg-[#d4af37] text-neutral-950 text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-sm">
            Live
          </span>
        )}
      </motion.button>
    </aside>
  );
};
