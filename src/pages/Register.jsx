import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../lib/auth';
import { Button, Card } from '../components/ui';
import { CheckCircle2, AlertTriangle, Shield, ChevronRight, Activity, ArrowRight, User, Smartphone, Hash, MapPin, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { ScrollReveal } from '../components/ScrollReveal';
import { cn } from '../components/ui';

export default function Register() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // ----- Form State -----
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [platform, setPlatform] = useState('');
  const [partnerId, setPartnerId] = useState('');
  
  const [otp, setOtp] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  
  const [eShramUAN, setEShramUAN] = useState('');
  const [skippedEShram, setSkippedEShram] = useState(false);
  
  const [selectedCity, setSelectedCity] = useState('');

  // ----- Static Data -----
  const CITIES = [
    { id: 'delhi', name: 'Delhi NCR', risk: 'High', index: 9, desc: 'Highest disruption frequency (Weather/AQI/Traffic).' },
    { id: 'mumbai', name: 'Mumbai', risk: 'High', index: 9, desc: 'High seasonal rain and infrastructure limits.' },
    { id: 'bengaluru', name: 'Bengaluru', risk: 'Medium', index: 7, desc: 'Moderate traffic and peak hour delays.' },
    { id: 'hyderabad', name: 'Hyderabad', risk: 'Medium', index: 7, desc: 'Significant route-level variability.' },
    { id: 'chennai', name: 'Chennai', risk: 'Moderate', index: 5, desc: 'Periodic rain-related service pauses.' },
    { id: 'pune', name: 'Pune', risk: 'Moderate', index: 5, desc: 'Balanced operational stability.' },
    { id: 'jaipur', name: 'Jaipur', risk: 'Stable', index: 3, desc: 'Generally low systemic disruption.' },
    { id: 'lucknow', name: 'Lucknow', risk: 'Stable', index: 3, desc: 'Expanding network with stable availability.' },
    { id: 'indore', name: 'Indore', risk: 'Stable', index: 2, desc: 'Highly stable logistics zone.' },
    { id: 'chandigarh', name: 'Chandigarh', risk: 'Stable', index: 2, desc: 'Modern infrastructure, very few downtimes.' }
  ];

  const TIERS = [
    { id: 'basic', name: 'Basic', payout: 25, claims: 2, icon: '🟢', color: 'bg-green-100 text-green-800' },
    { id: 'plus', name: 'Plus', payout: 30, claims: 2, icon: '🔵', color: 'bg-blue-100 text-blue-800' },
    { id: 'pro', name: 'Pro', payout: 40, claims: 3, icon: '🔴', color: 'bg-red-100 text-red-800' }
  ];

  // ----- Derived Data / Calculations -----
  const isEShramVerified = eShramUAN.length === 12 && !skippedEShram;
  const trustScore = isEShramVerified ? 85 : 65;

  const currentCity = CITIES.find(c => c.id === selectedCity);
  
  // Custom Premium Calculation logic
  // Base cost + (Risk Index * Multiplier)
  const calculateBasePremium = (city) => {
    if (!city) return 30;
    return 29 + (city.index * 6); // Range from approx 40 to 90
  };

  // ----- Handlers -----
  const handleNext = (e) => {
    e?.preventDefault();
    if (step === 1 && (!phone || !platform || !name || !partnerId)) return;
    if (step === 2 && otp.length !== 6) return;
    if (step === 4 && !selectedCity) return;
    setStep(s => s + 1);
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    setIsVerifyingOtp(true);
    // Mock API verification
    setTimeout(() => {
      setIsVerifyingOtp(false);
      setStep(3);
    }, 1500);
  };

  const handleSkipEShram = () => {
    setSkippedEShram(true);
    setEShramUAN('');
    setStep(4);
  };

  const handleFinalSubmit = (tier) => {
    const baseP = calculateBasePremium(currentCity);
    const finalPremium = Math.round(baseP * (tier.payout / 25));

    const profileData = {
      name: name,
      phone: phone,
      platform: platform,
      partnerId: partnerId,
      zone: currentCity ? currentCity.name : 'Unknown',
      trustScore: trustScore,
      eShramVerified: isEShramVerified,
      zoneRisk: currentCity ? currentCity.risk.toUpperCase() : 'MEDIUM',
      premium: {
        amount: finalPremium,
        frequency: 'week',
        reason: `${currentCity?.name} (${currentCity?.risk}) based on Trust Score ${trustScore}`
      },
      coverageTier: {
        name: tier.name,
        icon: tier.icon,
        hours: tier.payout * 4
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
              {step === 1 && "Start your protection."}
              {step === 2 && "OTP Verification"}
              {step === 3 && "Identity Verification"}
              {step === 4 && "Select City"}
              {step === 5 && "Your Trust Score & Coverage"}
            </h1>
            <p className="text-brand-800 text-lg">
              {step === 1 && "Create a Kizuna profile to secure your gig income."}
              {step === 2 && `We've sent a 6-digit code to +91 ${phone}`}
              {step === 3 && "Secure your profile with government-backed identity data."}
              {step === 4 && "Where do you deliver most often?"}
              {step === 5 && "Calculated based on your activity and zone risk profile."}
            </p>
          </div>
        </ScrollReveal>

        {/* Progress Bar (5 Steps) */}
        <div className="w-full max-w-lg flex items-center justify-between mb-12 px-4 relative">
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-brand-200 -z-10 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-8 h-0.5 bg-brand-900 -z-10 -translate-y-1/2 transition-all duration-500" style={{ width: `${((step - 1) / 4) * 100}%` }}></div>
          
          {[1, 2, 3, 4, 5].map(num => (
            <div key={num} className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300 relative", step >= num ? "bg-brand-900 text-white shadow-md scale-110" : "bg-brand-100 text-brand-400")}>
              {num}
              {step === num && <div className="absolute -bottom-6 text-[8px] uppercase tracking-widest text-brand-900 font-black whitespace-nowrap">
                {num === 1 && 'Profile'}
                {num === 2 && 'Verify'}
                {num === 3 && 'e-Shram'}
                {num === 4 && 'City'}
                {num === 5 && 'Plan'}
              </div>}
            </div>
          ))}
        </div>

        <div className="w-full max-w-[520px]">
          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <ScrollReveal direction="up" className="w-full">
              <Card className="w-full shadow-soft p-8">
                <form onSubmit={handleNext} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-800 uppercase tracking-wider block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400" size={18} />
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-brand-50 border-none rounded-xl pl-12 pr-4 py-3.5 text-brand-900 placeholder:text-brand-400 focus:ring-2 focus:ring-brand-800 focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-800 uppercase tracking-wider block">Phone Number</label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400" size={18} />
                      <input
                        type="text"
                        inputMode="numeric"
                        maxlength="10"
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          if (val.length <= 10) setPhone(val);
                        }}
                        className="w-full bg-brand-50 border-none rounded-xl pl-12 pr-4 py-3.5 text-brand-900 placeholder:text-brand-400 focus:ring-2 focus:ring-brand-800 focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-800 uppercase tracking-wider block">Primary Platform</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Blinkit', 'Zepto', 'Swiggy Instamart', 'Flipkart Minutes'].map(p => (
                        <div 
                          key={p}
                          onClick={() => { setPlatform(p); setPartnerId(''); }}
                          className={cn(
                            "cursor-pointer border rounded-xl py-3 text-center text-xs font-bold transition-all",
                            platform === p ? "bg-brand-900 text-white border-brand-900" : "bg-brand-50 text-brand-600 hover:border-brand-300 border-transparent"
                          )}
                        >
                          {p}
                        </div>
                      ))}
                    </div>
                  </div>

                  {platform && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <label className="text-xs font-bold text-brand-800 uppercase tracking-wider block">{platform} Partner ID</label>
                      <div className="relative">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400" size={18} />
                        <input
                          type="text"
                          placeholder={`${platform} ID (e.g. ${platform.slice(0,3).toUpperCase()}-123)`}
                          value={partnerId}
                          onChange={(e) => setPartnerId(e.target.value)}
                          className="w-full bg-brand-50 border-none rounded-xl pl-12 pr-4 py-3.5 text-brand-900 placeholder:text-brand-400 focus:ring-2 focus:ring-brand-800 focus:outline-none transition-all"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <Button type="submit" variant="primary" className="w-full py-4 text-base rounded-2xl" disabled={!name || phone.length !== 10 || !platform || !partnerId}>
                    Next: Verification
                  </Button>
                </form>
              </Card>
            </ScrollReveal>
          )}

          {/* STEP 2: OTP */}
          {step === 2 && (
            <ScrollReveal direction="up" className="w-full">
              <Card className="w-full shadow-soft p-8 text-center">
                <form onSubmit={verifyOtp} className="space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-900 mb-2">
                    <Smartphone size={32} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-800 uppercase tracking-widest block">Enter OTP</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxlength="6"
                      placeholder="••••••"
                      value={otp}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        if (val.length <= 6) setOtp(val);
                      }}
                      className="w-full bg-brand-50 border-none rounded-2xl px-6 py-5 text-brand-900 text-3xl tracking-[1em] text-center focus:ring-2 focus:ring-brand-800 focus:outline-none transition-all placeholder:text-brand-200"
                    />
                  </div>
                  <p className="text-sm text-brand-500">Didn't receive code? <button type="button" className="font-bold text-brand-900 hover:underline">Resend</button></p>
                  <Button type="submit" variant="primary" className="w-full py-4 text-base rounded-2xl" disabled={otp.length !== 6 || isVerifyingOtp}>
                    {isVerifyingOtp ? <Loader2 className="animate-spin mx-auto" /> : 'Verify & Continue'}
                  </Button>
                </form>
              </Card>
            </ScrollReveal>
          )}

          {/* STEP 3: e-Shram */}
          {step === 3 && (
            <ScrollReveal direction="up" className="w-full">
              <Card className="w-full shadow-soft p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-[50px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
                <form onSubmit={handleNext} className="space-y-6">
                  <div className="bg-white border border-brand-100 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                        <Shield size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-brand-900">National Worker Card</h3>
                        <p className="text-[10px] uppercase font-bold text-green-700 tracking-wider">Government identity layer</p>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-brand-800">
                        <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                        <span>Unlocks **higher payouts (up to 40%)**</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-brand-800">
                        <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                        <span>Lower weekly premiums of **₹29–₹39**</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-800 uppercase tracking-wider block">Universal Account Number (UAN)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxlength="12"
                      placeholder="Enter 12-digit UAN"
                      value={eShramUAN}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        if (val.length <= 12) setEShramUAN(val);
                      }}
                      className="w-full bg-brand-50 border border-brand-200 rounded-xl px-4 py-3.5 text-brand-900 placeholder:text-brand-400 focus:ring-2 focus:ring-brand-800 focus:outline-none transition-all tracking-[0.2em] font-mono text-center text-lg"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button type="submit" variant="primary" className="w-full py-4 text-base rounded-2xl" disabled={eShramUAN.length !== 12}>Confirm ID</Button>
                    <button type="button" onClick={handleSkipEShram} className="w-full py-3 text-sm font-bold text-brand-400 hover:text-brand-900 transition-all">Skip for now</button>
                  </div>
                </form>
              </Card>
            </ScrollReveal>
          )}

          {/* STEP 4: City Selection */}
          {step === 4 && (
            <ScrollReveal direction="up" className="w-full">
              <Card className="w-full shadow-soft p-2 border-none bg-transparent max-h-[500px] overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-1 gap-3">
                  {CITIES.map((city) => (
                    <div 
                      key={city.id}
                      onClick={() => setSelectedCity(city.id)}
                      className={cn(
                        "p-5 rounded-2xl border-2 cursor-pointer transition-all bg-white relative overflow-hidden flex items-center gap-4",
                        selectedCity === city.id ? "border-brand-900 shadow-premium" : "border-transparent hover:border-brand-200 shadow-sm"
                      )}
                    >
                      <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-900">
                        <MapPin size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold text-brand-900">{city.name}</h3>
                          <span className={cn(
                            "text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded",
                            city.index > 7 ? 'bg-red-100 text-red-700' : 
                            city.index > 4 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                          )}>
                            {city.risk}
                          </span>
                        </div>
                        <p className="text-[10px] text-brand-400 mt-0.5">{city.desc}</p>
                      </div>
                      {selectedCity === city.id && <CheckCircle2 className="text-brand-900" size={20} />}
                    </div>
                  ))}
                </div>
                <div className="pt-6 sticky bottom-0 bg-brand-50 pb-2">
                  <Button onClick={handleNext} variant="primary" className="w-full py-4 text-base rounded-2xl shadow-lg shadow-brand-900/10" disabled={!selectedCity}>
                    Analyze My Zone Risk
                  </Button>
                </div>
              </Card>
            </ScrollReveal>
          )}

          {/* STEP 5: Coverage Header */}
          {step === 5 && (
            <ScrollReveal direction="up" className="w-full space-y-6">
              <div className="bg-brand-900 text-white rounded-3xl p-8 shadow-premium relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300 mb-2">Partner Analysis</h2>
                      <p className="text-3xl font-serif">{name.split(' ')[0]}'s Profile</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-serif leading-none mb-1 text-premium-white">{trustScore}</div>
                      <div className="text-[8px] font-black uppercase tracking-widest text-brand-400">Trust Score</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pb-2">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                      <p className="text-[8px] uppercase font-bold text-brand-300 tracking-widest mb-1">Operating Area</p>
                      <p className="text-sm font-medium">{currentCity?.name}</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                      <p className="text-[8px] uppercase font-bold text-brand-300 tracking-widest mb-1">Risk Score</p>
                      <p className="text-sm font-medium">{currentCity?.index}/10 Index</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-center font-serif text-xl text-brand-900 pt-2">AI-Optimized Plans</h3>
                {TIERS.map(tier => (
                  <div key={tier.id} className="bg-white rounded-2xl p-5 border border-brand-100 flex shadow-sm gap-4 relative overflow-hidden items-center group hover:border-brand-800 transition-all cursor-pointer" onClick={() => handleFinalSubmit(tier)}>
                    <div className="w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">{tier.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg text-brand-900">{tier.name}</h4>
                        <span className={cn("text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded", tier.color)}>{tier.payout}% Protection</span>
                      </div>
                      <p className="text-[10px] text-brand-400 font-bold uppercase tracking-widest">{tier.claims} Weekly claims available</p>
                    </div>
                    <div className="text-right pr-2">
                      <div className="font-serif text-2xl text-brand-900 leading-none mb-1 group-hover:text-amber-800 transition-colors">₹{Math.round(calculateBasePremium(currentCity) * (tier.payout / 25))}</div>
                      <p className="text-[8px] text-brand-400 font-bold uppercase tracking-wider">Per Week</p>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-brand-900 pointer-events-none">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-amber-50 rounded-2xl p-5 flex gap-4 text-amber-900 border border-amber-100 text-xs leading-relaxed">
                <AlertTriangle size={20} className="shrink-0 text-amber-600" />
                <p><strong>Underwriting Note:</strong> Premium calculation accounts for historical disruption data in {currentCity?.name}. Final claim payout depends on real-world verification triggers.</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
    </div>
  );
}
