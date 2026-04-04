import { useState } from 'react';
import { Card } from './ui';
import { UserCheck, AlertTriangle } from 'lucide-react';

export default function DynamicPricingCalculator() {
  const [eShram, setEShram] = useState(true);
  const [rating, setRating] = useState(4.5);
  const [activity, setActivity] = useState(80); // 0-100
  const [fraud, setFraud] = useState(0); // 0-5
  const [zone, setZone] = useState('Medium'); // Low, Medium, High
  const [disruptions, setDisruptions] = useState('Moderate'); // Low, Moderate, High

  // Derived calculations based on Kizuna Phase 1 README logic
  const I = eShram ? 100 : 0;
  const R = rating * 20;
  const A = activity;
  const F = fraud;
  
  const rawTS = 50 + 0.20 * I + 0.30 * R + 0.30 * A - 30 * F;
  const TS = Math.max(0, Math.min(100, Math.round(rawTS)));

  let basePremium = 34; // Low
  if (zone === 'Medium') basePremium = 55;
  if (zone === 'High') basePremium = 87;

  let disruptionMult = 1.0;
  if (disruptions === 'Moderate') disruptionMult = 1.15;
  if (disruptions === 'High') disruptionMult = 1.30;

  // Let's use TS as a multiplier modifier.
  // E.g. TS=100 -> 0.75, TS=50 -> 1.25, TS=0 -> 1.75
  const tsMult = Math.max(0.7, 1 + (75 - TS) / 100);
  
  const finalPremium = Math.max(19, Math.round(basePremium * disruptionMult * tsMult));

  const tsColor = TS >= 75 ? 'text-green-600' : TS >= 40 ? 'text-yellow-600' : 'text-red-500';
  const tsBg = TS >= 75 ? 'bg-green-100' : TS >= 40 ? 'bg-yellow-100' : 'bg-red-100';

  return (
    <Card className="p-8 max-w-5xl mx-auto border-brand-200 shadow-premium overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Settings Side */}
        <div className="flex-1 space-y-8">
          <div>
            <h3 className="text-2xl font-serif text-brand-900 mb-6 border-b border-brand-100 pb-2">1. Dynamic Trust Variables</h3>
            <div className="space-y-6">
              {/* eShram */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <UserCheck size={16} className="text-brand-600" />
                    <span className="font-bold text-xs uppercase tracking-widest text-brand-800">e-Shram Verified</span>
                  </div>
                  <p className="text-[10px] text-brand-500">Government ID linkage (+20% identity score)</p>
                </div>
                <button 
                  onClick={() => setEShram(!eShram)}
                  className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${eShram ? 'bg-brand-800' : 'bg-brand-200'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${eShram ? 'translate-x-6' : ''}`}></div>
                </button>
              </div>

              {/* Rating */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-xs uppercase tracking-widest text-brand-800">Platform Rating</span>
                  <span className="text-xs font-medium text-brand-900 bg-brand-50 px-2 py-0.5 rounded">{rating.toFixed(1)} / 5.0</span>
                </div>
                <input type="range" min="1.0" max="5.0" step="0.1" value={rating} onChange={(e)=>setRating(parseFloat(e.target.value))} className="w-full accent-brand-800" />
              </div>

              {/* Activity */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-xs uppercase tracking-widest text-brand-800">Recency & Activity</span>
                  <span className="text-xs font-medium text-brand-900 bg-brand-50 px-2 py-0.5 rounded">{activity}% Score</span>
                </div>
                <input type="range" min="0" max="100" step="5" value={activity} onChange={(e)=>setActivity(Number(e.target.value))} className="w-full accent-brand-800" />
              </div>

              {/* Fraud */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-red-500" />
                    <span className="font-bold text-xs uppercase tracking-widest text-brand-800">Fraud Flags</span>
                  </div>
                  <span className="text-xs font-medium text-brand-900 bg-red-50 text-red-700 px-2 py-0.5 rounded">{fraud} Events</span>
                </div>
                <input type="range" min="0" max="5" step="1" value={fraud} onChange={(e)=>setFraud(Number(e.target.value))} className="w-full accent-red-600" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-serif text-brand-900 mb-6 border-b border-brand-100 pb-2">2. Environmental Risk</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-[10px] uppercase tracking-widest text-brand-800 block mb-2">Zone Risk</label>
                <select value={zone} onChange={(e)=>setZone(e.target.value)} className="w-full bg-brand-50 border border-brand-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-800">
                  <option value="Low">Low (e.g. Jaipur)</option>
                  <option value="Medium">Medium (e.g. Bengaluru)</option>
                  <option value="High">High (e.g. Delhi Monsoon)</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-[10px] uppercase tracking-widest text-brand-800 block mb-2">Hist. Disruptions</label>
                <select value={disruptions} onChange={(e)=>setDisruptions(e.target.value)} className="w-full bg-brand-50 border border-brand-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-800">
                  <option value="Low">Low (&lt;1 /mo)</option>
                  <option value="Moderate">Moderate (2-3 /mo)</option>
                  <option value="High">High (&gt;4 /mo)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Display Side */}
        <div className="flex-1 flex flex-col justify-center items-center bg-brand-900 text-brand-50 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-800 hover:bg-brand-700 transition-colors duration-1000 rounded-full blur-[80px] opacity-70 -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="w-full relative z-10 flex flex-col h-full justify-center">
            
            <div className="bg-white/10 rounded-2xl p-6 mb-12 backdrop-blur-md border border-white/10">
              <div className="flex justify-between items-center mb-3">
                <span className="font-serif text-xl">Kizuna Trust Score</span>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${tsBg} ${tsColor} shadow-inner`}>
                  {TS}
                </div>
              </div>
              <div className="w-full h-1.5 bg-brand-900/50 rounded-full overflow-hidden">
                <div className={`h-full ${TS >= 75 ? 'bg-green-400' : TS >= 40 ? 'bg-yellow-400' : 'bg-red-400'} transition-all duration-500`} style={{width: `${TS}%`}}></div>
              </div>
              <p className="text-[10px] text-brand-200 mt-3 text-center opacity-80 uppercase tracking-widest">TS = 50 + 0.20 I + 0.30 R + 0.30 A - 30 F</p>
            </div>

            <div className="text-center bg-brand-900/50 p-6 rounded-2xl border border-brand-800/50 backdrop-blur-sm shadow-xl">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E0D5C1] block mb-2">Live Premium Output</span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-7xl font-serif tracking-tight">₹{finalPremium}</span>
                <span className="text-brand-300 font-medium">/wk</span>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {zone === 'High' && <span className="text-[10px] bg-red-900/40 text-red-300 border border-red-800/50 px-2.5 py-1 rounded-full whitespace-nowrap">High Risk Zone</span>}
                {TS >= 85 && <span className="text-[10px] bg-green-900/40 text-green-300 border border-green-800/50 px-2.5 py-1 rounded-full whitespace-nowrap">Trust Discount Applied</span>}
                {F > 0 && <span className="text-[10px] bg-red-900/40 text-red-300 border border-red-800/50 px-2.5 py-1 rounded-full whitespace-nowrap">Fraud Penalty</span>}
                {TS < 40 && F === 0 && <span className="text-[10px] bg-yellow-900/40 text-yellow-300 border border-yellow-800/50 px-2.5 py-1 rounded-full whitespace-nowrap">Low Trust Loading</span>}
              </div>
            </div>

          </div>
        </div>
      </div>
    </Card>
  );
}
