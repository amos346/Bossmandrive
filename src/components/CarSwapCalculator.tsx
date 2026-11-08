import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeftRight, CheckCircle2, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { Car } from '../types/car';
import { CARS_DATA, WHATSAPP_AGENTS } from '../data/cars';
import { formatNaira, generateWhatsAppUrl } from '../utils/formatters';

interface CarSwapCalculatorProps {
  initialTargetCar?: Car | null;
}

export const CarSwapCalculator: React.FC<CarSwapCalculatorProps> = ({ initialTargetCar }) => {
  const [currentMake, setCurrentMake] = useState('Toyota');
  const [currentModel, setCurrentModel] = useState('Prado TXL');
  const [currentYear, setCurrentYear] = useState('2019');
  const [currentCondition, setCurrentCondition] = useState<'Tokunbo' | 'Nigerian Used'>('Nigerian Used');
  const [currentMileage, setCurrentMileage] = useState('65000');
  const [targetCarId, setTargetCarId] = useState(initialTargetCar ? initialTargetCar.id : CARS_DATA[0].id);

  const targetCar = CARS_DATA.find((c) => c.id === targetCarId) || CARS_DATA[0];

  // Estimation algorithm tailored for realistic Nigerian market trade-in values
  const calculateEstimatedTradeIn = (): number => {
    let base = 25000000;
    const yearNum = parseInt(currentYear, 10);

    if (currentMake.toLowerCase().includes('mercedes') || currentMake.toLowerCase().includes('benz')) {
      base = 35000000 + (yearNum - 2017) * 7000000;
    } else if (currentMake.toLowerCase().includes('lexus')) {
      base = 28000000 + (yearNum - 2017) * 5500000;
    } else if (currentMake.toLowerCase().includes('toyota')) {
      base = 24000000 + (yearNum - 2017) * 4500000;
    } else if (currentMake.toLowerCase().includes('range') || currentMake.toLowerCase().includes('land rover')) {
      base = 38000000 + (yearNum - 2017) * 6000000;
    }

    if (currentCondition === 'Tokunbo') {
      base *= 1.2;
    } else {
      base *= 0.95;
    }

    const mileageNum = parseInt(currentMileage, 10) || 50000;
    if (mileageNum > 100000) base *= 0.88;
    else if (mileageNum < 40000) base *= 1.08;

    return Math.max(12000000, Math.round(base / 500000) * 500000);
  };

  const estimatedValue = calculateEstimatedTradeIn();
  const netBalance = Math.max(0, targetCar.priceNgn - estimatedValue);

  const handleSendToWhatsApp = () => {
    const agent = WHATSAPP_AGENTS[1]; // Chidinma - Lekki desk
    const message = `Hello BossmanDrive Trade-In Team, I would like to get a formal physical appraisal to swap my vehicle:
- My Current Car: ${currentYear} ${currentMake} ${currentModel}
- Condition: ${currentCondition}
- Approximate Mileage: ${new Intl.NumberFormat('en-NG').format(parseInt(currentMileage, 10))} km
- Estimated Trade-In Equity: ${formatNaira(estimatedValue)}
- Desired Upgrade Target: ${targetCar.year} ${targetCar.make} ${targetCar.model} (${formatNaira(targetCar.priceNgn)})
- Projected Balance to Top-Up: ${formatNaira(netBalance)}
When can an inspector assess my car in Lagos or Abuja?`;

    const url = generateWhatsAppUrl(agent.phone, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="swap-calculator" className="py-20 bg-[#0e1119] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase mb-2">
            BossmanDrive Instant Trade-In
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            Swap your current car for a modern upgrade.
          </h2>
          <p className="text-neutral-400 text-sm mt-3">
            Upgrade seamlessly without waiting months for a private buyer. We appraise your current vehicle and credit its verified equity directly toward your next luxury drive.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left: Input Form */}
          <div className="lg:col-span-7 bg-[#141824] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-[#d4af37]" />
              <span>Step 1: Your Current Vehicle Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="swap-make" className="block text-xs font-semibold text-neutral-400 mb-1.5">
                  Vehicle Make
                </label>
                <select
                  id="swap-make"
                  value={currentMake}
                  onChange={(e) => setCurrentMake(e.target.value)}
                  className="w-full bg-[#1b2030] border border-white/10 text-white text-xs rounded-lg px-3 py-2.5 focus:border-[#d4af37]"
                >
                  <option value="Toyota">Toyota</option>
                  <option value="Lexus">Lexus</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="Land Rover">Land Rover / Range Rover</option>
                  <option value="BMW">BMW</option>
                  <option value="Honda">Honda</option>
                  <option value="Ford">Ford</option>
                </select>
              </div>

              <div>
                <label htmlFor="swap-model" className="block text-xs font-semibold text-neutral-400 mb-1.5">
                  Model
                </label>
                <input
                  id="swap-model"
                  type="text"
                  value={currentModel}
                  onChange={(e) => setCurrentModel(e.target.value)}
                  placeholder="e.g. Prado TXL, RX350, C300, GLE"
                  className="w-full bg-[#1b2030] border border-white/10 text-white text-xs rounded-lg px-3 py-2.5 focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label htmlFor="swap-year" className="block text-xs font-semibold text-neutral-400 mb-1.5">
                  Year of Manufacture
                </label>
                <select
                  id="swap-year"
                  value={currentYear}
                  onChange={(e) => setCurrentYear(e.target.value)}
                  className="w-full bg-[#1b2030] border border-white/10 text-white text-xs rounded-lg px-3 py-2.5 focus:border-[#d4af37]"
                >
                  {Array.from({ length: 11 }, (_, i) => 2025 - i).map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="swap-condition" className="block text-xs font-semibold text-neutral-400 mb-1.5">
                  Registered Condition
                </label>
                <select
                  id="swap-condition"
                  value={currentCondition}
                  onChange={(e) => setCurrentCondition(e.target.value as any)}
                  className="w-full bg-[#1b2030] border border-white/10 text-white text-xs rounded-lg px-3 py-2.5 focus:border-[#d4af37]"
                >
                  <option value="Nigerian Used">Registered Nigerian Used</option>
                  <option value="Tokunbo">Foreign Used (Tokunbo)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="swap-mileage" className="block text-xs font-semibold text-neutral-400 mb-1.5">
                Approximate Odometer (km)
              </label>
              <input
                id="swap-mileage"
                type="number"
                step="5000"
                value={currentMileage}
                onChange={(e) => setCurrentMileage(e.target.value)}
                className="w-full bg-[#1b2030] border border-white/10 text-white text-xs rounded-lg px-3 py-2.5 focus:border-[#d4af37]"
              />
            </div>

            <div className="pt-2">
              <label htmlFor="swap-target" className="block text-xs font-semibold text-neutral-400 mb-1.5">
                Step 2: Choose Your Desired BossmanDrive Upgrade
              </label>
              <select
                id="swap-target"
                value={targetCarId}
                onChange={(e) => setTargetCarId(e.target.value)}
                className="w-full bg-[#1b2030] border border-white/10 text-white text-xs rounded-lg px-3 py-2.5 focus:border-[#d4af37]"
              >
                {CARS_DATA.map((car) => (
                  <option key={car.id} value={car.id}>
                    {car.year} {car.make} {car.model} — {formatNaira(car.priceNgn)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right: Calculated Outcome Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#171c2b] to-[#12151e] border border-[#d4af37]/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Preliminary Trade-In Estimate</span>
              </div>

              <h4 className="text-xl font-bold text-white mb-6">
                Swap Valuation Summary
              </h4>

              <div className="space-y-4 pb-6 border-b border-white/10 text-xs text-neutral-300">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Target Upgrade Price</span>
                  <span className="font-bold text-white tabular-nums text-sm">{formatNaira(targetCar.priceNgn)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Your Trade-In Credit (Est.)</span>
                  <span className="font-bold text-emerald-400 tabular-nums text-sm">- {formatNaira(estimatedValue)}</span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="font-medium text-white">Estimated Cash Top-Up Balance</span>
                  <span className="font-extrabold text-[#d4af37] tabular-nums text-lg">{formatNaira(netBalance)}</span>
                </div>
              </div>

              <div className="py-4 space-y-2 text-[11px] text-neutral-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Free physical inspection at our Victoria Island or Maitama vault</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Same-day vehicle swap completion upon document verification</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold text-neutral-950 bg-[#25D366] hover:bg-[#20ba59] rounded-xl transition-all shadow-md hover:shadow-emerald-900/30"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Submit Swap via WhatsApp for Instant Appraisal</span>
              </button>
              <p className="text-[10px] text-neutral-500 text-center mt-2">
                Estimate subject to physical chassis & computerized diagnostic inspection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
