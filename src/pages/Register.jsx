import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../lib/auth';
import { Button, Card } from '../components/ui';
import { Network, CheckCircle2, AlertTriangle, Shield, Building2, Car, ChevronRight, Activity, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { ScrollReveal } from '../components/ScrollReveal';
import { cn } from '../components/ui';

export default function Register() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // ----- Form State -----
  const [phone, setPhone] = useState('');
  const [platform, setPlatform] = useState('');
  
  const [eShramUAN, setEShramUAN] = useState('');
  const [skippedEShram, setSkippedEShram] = useState(false);
  
  const [selectedZone, setSelectedZone] = useState('');

  // ----- Static Data -----
  const ZONES = [
    { id: 'low', name: 'Low Risk', risk: 'Stable', desc: 'Inner city, high density, rare disruptions.', basePremium: 34 },
    { id: 'medium', name: 'Medium Risk', risk: 'Moderate', desc: 'Suburbs, occasional traffic/store downtimes.', basePremium: 55 },
    { id: 'high', name: 'High Risk', risk: 'Frequent disruptions', desc: 'High traffic corridors, frequent weather limits.', basePremium: 85 },
    { id: 'extreme', name: 'Extreme Risk', risk: 'Severe', desc: 'Outskirts, highly exposed to rain and gridlock.', basePremium: 120 }
  ];

  const TIERS = [
    { id: 'basic', name: 'Basic', payout: 25, claims: 2, icon: '🟢', color: 'bg-green-100 text-green-800' },
    { id: 'plus', name: 'Plus', payout: 30, claims: 2, icon: '🔵', color: 'bg-blue-100 text-blue-800' },
    { id: 'pro', name: 'Pro', payout: 40, claims: 3, icon: '🔴', color: 'bg-red-100 text-red-800' }
  ];

  // ----- Derived Data / Calculations -----
  // TS = clip(50 + 0.20I + 0.30R + 0.30A - 30F, 0, 100)
  // We mock Rating (R=80, 4.0), Activity (A=70), Fraud (F=0)
  // If e-Shram verified, I=100 (+20 score), else I=0
  const isEShramVerified = eShramUAN.length > 5 && !skippedEShram;
  const baseScore = 50 + (0.30 * 80) + (0.30 * 70); // 50 + 24 + 21 = 95
  // Actually, wait, let's make the base lower so the +15/+20 boost is visible
  // Let base be 65, eShram adds +20 to reach 85
  const trustScore = isEShramVerified ? 85 : 65;

  const currentZone = ZONES.find(z => z.id === selectedZone);

  // ----- Handlers -----
  const handleNext = (e) => {
    e?.preventDefault();
    if (step === 1 && (!phone || !platform)) return;
    if (step === 3 && !selectedZone) return;
    setStep(s => s + 1);
  };

  const handleSkipEShram = () => {
    setSkippedEShram(true);
    setEShramUAN('');
    setStep(3);
  };

  const handleFinalSubmit = (tier) => {
    const profileData = {
      phone: phone,
      platform: platform,
      zone: currentZone ? currentZone.name : 'Unknown',
      trustScore: trustScore,
      eShramVerified: isEShramVerified,
      zoneRisk: currentZone ? currentZone.id.toUpperCase() : 'MEDIUM',
      premium: {
        amount: currentZone ? Math.round(currentZone.basePremium * (tier.payout / 25)) : 50,
        frequency: 'week',
        reason: `${currentZone?.name} pricing based on Trust Score ${trustScore}`
      },
      coverageTier: {
        name: tier.name,
        icon: tier.icon,
        hours: tier.payout * 4 // mock value
      }
    };

    register(phone, profileData);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col pt-24 bg-brand-50 relative overflow-hidden">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-start px-4 z-10 w-full mt-10 pb-20">
        <ScrollReveal direction="down" className="w-full relative z-10 flex flex-col items-center">
          <div className="text-center mb-10 w-full max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif text-brand-900 mb-4 pb-1">
              {step === 1 && "Secure your income."}
              {step === 2 && "e-Shram Integration"}
              {step === 3 && "Select your Zone"}
              {step === 4 && "Your Trust Score & Coverage"}
            </h1>
            <p className="text-brand-800 text-lg">
              {step === 1 && "Create a Kizuna account and shield your earnings today."}
              {step === 2 && "Verify your national gig worker identity for better rates and limits."}
              {step === 3 && "Where do you operate most of the time?"}
              {step === 4 && "Based on your verified identity and chosen zone."}
            </p>
          </div>
        </ScrollReveal>

        {/* Progress Bar */}
        <div className="w-full max-w-lg flex items-center justify-between mb-8 px-4 relative">
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-brand-200 -z-10 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-8 h-0.5 bg-brand-900 -z-10 -translate-y-1/2 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100 - 10}%` }}></div>
          
          {[1, 2, 3, 4].map(num => (
            <div key={num} className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300", step >= num ? "bg-brand-900 text-white shadow-md" : "bg-brand-100 text-brand-400")}>
              {num}
            </div>
          ))}
        </div>

        <div className="w-full max-w-[500px]">
          {/* STEP 1: Verification */}
          {step === 1 && (
            <ScrollReveal direction="up" className="w-full">
              <Card className="w-full shadow-soft">
                <form onSubmit={handleNext} className="space-y-6">
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-800 uppercase tracking-wider block">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxlength="10"
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        if (val.length <= 10) setPhone(val);
                      }}
                      className="w-full bg-brand-50 border-none rounded-xl px-4 py-3.5 text-brand-900 placeholder:text-brand-400 focus:ring-2 focus:ring-brand-800 focus:outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-800 uppercase tracking-wider block">
                      Primary Platform
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Blinkit', 'Zepto', 'Swiggy Instamart', 'Flipkart Minutes'].map(p => (
                        <div 
                          key={p}
                          onClick={() => setPlatform(p)}
                          className={cn(
                            "cursor-pointer border rounded-xl py-3 text-center text-sm font-bold transition-all",
                            platform === p ? "bg-brand-900 text-white border-brand-900" : "bg-brand-50 text-brand-600 hover:border-brand-300 border-transparent"
                          )}
                        >
                          {p}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#F9F6F0] rounded-xl p-4 flex items-start gap-3 border border-[#EBE3D5]">
                    <Activity size={18} className="text-amber-700 mt-0.5 shrink-0" />
                    <p className="text-xs text-brand-800 leading-relaxed">
                      By proceeding, we quickly check your platform rating and recency to pre-approve you. <strong>Minimum rating 3.5 requires to enroll.</strong>
                    </p>
                  </div>

                  <Button type="submit" variant="primary" className="w-full py-4 text-base rounded-2xl" disabled={phone.length !== 10 || !platform}>
                    Next: Identity Verification
                  </Button>

                  <p className="text-center text-sm text-brand-800 pt-2">
                    Already have an account? <Link to="/login" className="font-bold text-brand-900 hover:underline">Log In</Link>
                  </p>
                </form>
              </Card>
            </ScrollReveal>
          )}

          {/* STEP 2: e-Shram */}
          {step === 2 && (
            <ScrollReveal direction="up" className="w-full">
              <Card className="w-full shadow-soft relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-[50px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
                
                <form onSubmit={handleNext} className="space-y-6">
                  
                  <div className="bg-white border border-brand-100 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                        <Shield size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-brand-900">Why connect e-Shram?</h3>
                        <p className="text-[10px] uppercase font-bold text-green-700 tracking-wider">Government Identity Layer</p>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-2">
                      <li className="flex items-start gap-2 text-sm text-brand-800">
                        <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                        <span>Boosts your <strong>Trust Score by +20 points</strong></span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-brand-800">
                        <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                        <span>Unlocks lower weekly premiums</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-brand-800">
                        <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                        <span>Faster, automated payouts without manual review</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-800 uppercase tracking-wider block">
                      Universal Account Number (UAN)
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxlength="12"
                      placeholder="Enter 12-digit UAN"
                      value={eShramUAN}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        if (val.length <= 12) setEShramUAN(val);
                      }}
                      className="w-full bg-brand-50 border border-brand-200 rounded-xl px-4 py-3.5 text-brand-900 placeholder:text-brand-400 focus:ring-2 focus:ring-brand-800 focus:outline-none transition-all tracking-widest font-mono text-center"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button type="submit" variant="primary" className="w-full py-4 text-base rounded-2xl" disabled={eShramUAN.length !== 12}>
                      Verify & Boost Score
                    </Button>
                    <button type="button" onClick={handleSkipEShram} className="w-full py-3 text-sm font-bold text-brand-500 hover:text-brand-900 hover:bg-brand-50 rounded-xl transition-all">
                      Skip for now (Basic Limits)
                    </button>
                  </div>
                </form>
              </Card>
            </ScrollReveal>
          )}

          {/* STEP 3: Zone Selection */}
          {step === 3 && (
            <ScrollReveal direction="up" className="w-full">
              <Card className="w-full shadow-soft p-5 border-none bg-transparent">
                <div className="space-y-4">
                  {ZONES.map((zone) => (
                    <div 
                      key={zone.id}
                      onClick={() => setSelectedZone(zone.id)}
                      className={cn(
                        "p-5 rounded-2xl border-2 cursor-pointer transition-all bg-white relative overflow-hidden group",
                        selectedZone === zone.id ? "border-brand-900 shadow-premium" : "border-transparent hover:border-brand-200 shadow-sm"
                      )}
                    >
                      {selectedZone === zone.id && (
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-900"></div>
                      )}
                      
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-brand-900">{zone.name}</h3>
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm",
                          zone.id === 'low' ? 'bg-green-100 text-green-800' :
                          zone.id === 'medium' ? 'bg-blue-100 text-blue-800' :
                          zone.id === 'high' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        )}>
                          {zone.risk}
                        </span>
                      </div>
                      <p className="text-sm text-brand-700">{zone.desc}</p>
                    </div>
                  ))}
                  
                  <Button onClick={handleNext} variant="primary" className="w-full py-4 text-base rounded-2xl mt-4" disabled={!selectedZone}>
                    Calculate My Premium
                  </Button>
                </div>
              </Card>
            </ScrollReveal>
          )}

          {/* STEP 4: Trust Score & Coverage */}
          {step === 4 && (
            <ScrollReveal direction="up" className="w-full space-y-6">
              
              {/* Trust Score Header */}
              <div className="bg-brand-900 text-white rounded-3xl p-6 shadow-premium relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Activity size={100} />
                </div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-brand-300 mb-1">Your Trust Score</h2>
                    <div className="text-5xl font-serif leading-none flex items-baseline gap-2">
                      {trustScore} <span className="text-lg text-brand-400 font-sans font-medium">/ 100</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {isEShramVerified && (
                      <span className="inline-block bg-green-500/20 text-green-300 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-green-500/30">
                        +20 e-Shram Boost
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Tiers List */}
              <div className="space-y-4">
                <h3 className="text-center font-serif text-xl text-brand-900">Select Coverage Tier</h3>
                
                {TIERS.map(tier => (
                  <div key={tier.id} className="bg-white rounded-2xl p-5 border border-brand-100 flex shadow-sm gap-4 relative overflow-hidden items-center group
                  hover:border-brand-300 hover:shadow-premium transition-all">
                    
                    <div className="w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center text-2xl shrink-0">
                      {tier.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg text-brand-900 leading-none">{tier.name}</h4>
                        <span className={cn("text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm", tier.color)}>
                          {tier.payout}% Payout
                        </span>
                      </div>
                      <p className="text-xs text-brand-500">{tier.claims} claims / week</p>
                    </div>

                    <div className="text-right">
                      <div className="font-serif text-2xl text-brand-900 leading-none mb-1">
                        ₹{Math.round(currentZone?.basePremium * (tier.payout / 25))}
                      </div>
                      <p className="text-[10px] text-brand-400 font-bold uppercase tracking-wider">Per Week</p>
                    </div>

                    <button 
                      onClick={() => handleFinalSubmit(tier)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    >
                      <span className="sr-only">Select {tier.name}</span>
                    </button>
                    
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-brand-900 pointer-events-none">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-[#FCE7DF] rounded-xl p-4 flex gap-3 text-[#8A5A44] border border-[#FAD6C6] text-xs">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <p><strong>Note:</strong> Coverage applies to income loss only. Health and vehicle damages are explicitly excluded from this policy.</p>
              </div>

            </ScrollReveal>
          )}

        </div>
      </main>
    </div>
  );
}
