import React, { useState, useEffect } from 'react';
import { Card } from './ui';
import { Shield, AlertTriangle, Activity, Info } from 'lucide-react';

const zoneRisks = [
  { level: 'Low', base: 35, color: 'bg-green-100 text-green-700' },
  { level: 'Medium', base: 55, color: 'bg-yellow-100 text-yellow-700' },
  { level: 'High', base: 85, color: 'bg-red-100 text-red-700' },
];

const disruptionLevels = [
  { level: 'Low', multiplier: 1.0 },
  { level: 'Moderate', multiplier: 1.15 },
  { level: 'High', multiplier: 1.3 },
];

export default function DynamicPricingCalculator() {
  const [zone, setZone] = useState(zoneRisks[1]);
  const [trustScore, setTrustScore] = useState(75);
  const [disruption, setDisruption] = useState(disruptionLevels[1]);
  const [premium, setPremium] = useState(0);

  useEffect(() => {
    // Logic: 
    // Trust Multiplier: 70 is neutral. 100 gives ~25% discount. 0 gives ~70% penalty.
    const trustMultiplier = 1 + ((70 - trustScore) / 100);
    
    // Final Calculation
    const calculated = zone.base * trustMultiplier * disruption.multiplier;
    setPremium(Math.round(calculated));
  }, [zone, trustScore, disruption]);

  return (
    <Card className="w-full max-w-2xl mx-auto border border-brand-200 shadow-premium p-8 bg-white overflow-hidden relative">
      {/* Decorative background logo */}
      <div className="absolute -right-10 -bottom-10 text-brand-50 opacity-20 pointer-events-none">
        <Shield size={200} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-brand-900 flex items-center justify-center text-white">
            <Activity size={20} />
          </div>
          <div>
            <h3 className="font-serif text-2xl text-brand-900">Premium Estimator</h3>
            <p className="text-xs text-brand-400 uppercase tracking-widest font-bold">Real-time Dynamic Pricing</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Zone Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-brand-800 flex items-center gap-2">
              <MapPinIcon size={14} /> 1. Select Operating Zone
            </label>
            <div className="grid grid-cols-3 gap-3">
              {zoneRisks.map((z) => (
                <button
                  key={z.level}
                  onClick={() => setZone(z)}
                  className={`py-3 px-4 rounded-xl text-sm font-medium transition-all border ${
                    zone.level === z.level 
                      ? 'bg-brand-900 text-white border-brand-900 shadow-md' 
                      : 'bg-brand-50 text-brand-600 border-transparent hover:border-brand-200'
                  }`}
                >
                  {z.level}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Score Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-brand-800 flex items-center gap-2">
                <Shield size={14} /> 2. Trust Score
              </label>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                trustScore >= 80 ? 'bg-green-100 text-green-700' : 
                trustScore >= 50 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
              }`}>
                {trustScore}/100
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={trustScore} 
              onChange={(e) => setTrustScore(parseInt(e.target.value))}
              className="w-full h-2 bg-brand-100 rounded-lg appearance-none cursor-pointer accent-brand-900"
            />
            <p className="text-[10px] text-brand-400 italic">High scores (80+) unlock significant premium discounts.</p>
          </div>

          {/* Disruption Frequency */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-brand-800 flex items-center gap-2">
              <AlertTriangle size={14} /> 3. Historical Disruption Frequency
            </label>
            <div className="flex gap-4">
              {disruptionLevels.map((d) => (
                <label key={d.level} className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="disruption" 
                    checked={disruption.level === d.level}
                    onChange={() => setDisruption(d)}
                    className="w-4 h-4 text-brand-900 border-brand-300 focus:ring-brand-900"
                  />
                  <span className={`text-sm ${disruption.level === d.level ? 'text-brand-900 font-bold' : 'text-brand-500 group-hover:text-brand-700'}`}>
                    {d.level}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Results Area */}
          <div className="pt-8 border-t border-brand-100 mt-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs text-brand-400 uppercase tracking-widest font-bold mb-1">Your Estimated Premium</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-serif text-brand-900">₹{premium}</span>
                <span className="text-brand-500 font-medium">/week</span>
              </div>
            </div>
            <button className="bg-brand-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-brand-800 transition-all shadow-lg active:scale-95">
              Secure Protection
            </button>
          </div>

          <div className="flex items-start gap-2 p-3 bg-brand-50 rounded-xl">
            <span className="text-brand-400 shrink-0 mt-1">
                <Info size={14} />
            </span>
            <p className="text-[10px] text-brand-600 leading-relaxed">
              *This is an estimate based on current risk factors. Premiums are finalized every Sunday at 12:00 AM based on live data snapshots of your Trust Score and upcoming zone forecasts.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function MapPinIcon({ size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
