import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, Button } from '../components/ui';
import { ScrollReveal } from '../components/ScrollReveal';
import { 
  Zap, CheckCircle2, CalendarDays, Shield, 
  MapPin, Activity, Clock, TrendingUp, BarChart, 
  AlertTriangle, Smartphone, Crosshair, HelpCircle, 
  ChevronRight, Award, History, LineChart, Bell
} from 'lucide-react';

export default function Features() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-brand-50">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-40 text-brand-900">
        
        {/* 1. Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <ScrollReveal direction="right">
            {/* Protocol Badge Row */}
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center px-3 py-1 bg-brand-900 text-brand-50 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Protocol V2.4
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Autonomous Coverage</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-serif leading-[1.05] mb-6">
              Your Income,<br/>
              Protected<br/>
              <span className="italic">Every Shift</span>
            </h1>

            <p className="text-brand-800 text-base mb-8 max-w-md leading-relaxed">
              From unexpected disruptions to platform downtime, Kizuna ensures you never walk away from a shift empty-handed.
            </p>

            {/* Feature Highlights */}
            <div className="flex flex-col gap-5 border-t border-brand-200 pt-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap size={15} className="text-brand-800" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-0.5">Payout Speed</p>
                  <p className="text-sm text-brand-800">Paid within 2 hours of disruption</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Activity size={15} className="text-brand-800" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-0.5">Detection Reliability</p>
                  <p className="text-sm text-brand-800">Accurate event detection using 3+ verified data sources</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield size={15} className="text-brand-800" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-0.5">Security</p>
                  <p className="text-sm text-brand-800">End-to-end encrypted &amp; ISO-standard compliant</p>
                </div>
              </div>
            </div>

          </ScrollReveal>

          {/* Right: Radar / Geo Visualization */}
          <ScrollReveal direction="left" delay={200}>
            <div className="relative w-full">
              <div className="w-full aspect-square bg-brand-50 rounded-3xl border border-brand-200 shadow-sm flex items-center justify-center relative overflow-hidden p-6">
                {/* Top labels */}
                <div className="absolute top-5 left-5 text-[10px] font-bold uppercase tracking-widest text-brand-400">Active Core</div>
                <div className="absolute top-5 right-5 bg-brand-900 text-brand-50 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Encrypted</div>
                
                {/* Sanctuary Mesh label */}
                <div className="absolute top-12 left-5 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-serif text-xl text-brand-900">Sanctuary Mesh</span>
                </div>

                {/* Concentric Rings */}
                <div className="absolute inset-10 border border-brand-300/50 rounded-full"></div>
                <div className="absolute inset-20 border border-brand-400/50 rounded-full"></div>
                <div className="absolute inset-[30%] border border-brand-500/40 rounded-full"></div>

                {/* Shield core */}
                <div className="relative z-10 w-20 h-20 bg-brand-900 rounded-full shadow-2xl flex items-center justify-center">
                  <Shield className="text-white" size={28} />
                </div>

                {/* Floating Labels */}
                <div className="absolute top-[30%] right-[10%] bg-white rounded-full px-3 py-1.5 shadow-md border border-brand-100 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-800">
                  <MapPin size={10} /> Work Zone
                </div>

                <div className="absolute bottom-[25%] left-[8%] bg-white rounded-xl px-4 py-3 shadow-md border border-brand-100">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-brand-400 mb-1.5 flex items-center gap-1">
                    <BarChart size={8} /> Earnings Peak
                  </p>
                  <div className="flex items-end gap-0.5 h-5">
                    <div className="w-1.5 bg-brand-300 rounded-sm" style={{height: '40%'}}></div>
                    <div className="w-1.5 bg-brand-600 rounded-sm" style={{height: '70%'}}></div>
                    <div className="w-1.5 bg-brand-400 rounded-sm" style={{height: '55%'}}></div>
                  </div>
                </div>

                {/* Coverage Integrity Bar */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-2">
                    <span>Coverage Integrity</span>
                    <span>94.2%</span>
                  </div>
                  <div className="h-1.5 bg-brand-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-900 rounded-full" style={{width: '94.2%'}}></div>
                  </div>
                </div>
              </div>

              {/* Decorative blobs */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-light rounded-full mix-blend-multiply blur-2xl opacity-70 -z-10"></div>
            </div>
          </ScrollReveal>
        </section>

        {/* 2. Feature 1: Auto Payout Engine */}
        <section className="max-w-6xl mx-auto space-y-16">
          <div className="flex flex-col items-center text-center">
            <ScrollReveal direction="up" className="max-w-2xl">
              <div className="inline-flex items-center px-3 py-1 bg-accent-light text-[#E6A889] text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                AI x Global Context
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-900 mb-6 leading-tight">
                Get paid even when<br/><span className="italic text-brand-800">you can't work.</span>
              </h2>
              <p className="text-brand-800 text-lg">
                Our API engine detects objectives instantly. No paperwork, no wait times, no stress. Just automatic payouts when you need it most.
              </p>
            </ScrollReveal>
          </div>
          
          <ScrollReveal direction="up" delay={200}>
            <Card className="max-w-3xl mx-auto border border-brand-200 shadow-sm p-8 bg-white">
              <div className="flex justify-between items-center px-10 relative">
                {/* Timeline connector */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-brand-100 -translate-y-1/2 rounded-full overflow-hidden">
                   <div className="h-full bg-brand-900 w-1/3 rounded-full"></div>
                </div>
                {/* Steps */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white border-4 border-brand-900 flex items-center justify-center font-bold font-serif text-brand-900 shadow-sm">1</div>
                  <span className="text-xs font-medium uppercase tracking-wider text-brand-900">Detected</span>
                </div>
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-brand-100 border-4 border-white flex items-center justify-center font-bold font-serif text-brand-400 shadow-sm">2</div>
                  <span className="text-xs font-medium uppercase tracking-wider text-brand-400">Validated</span>
                </div>
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-brand-100 border-4 border-white flex items-center justify-center font-bold font-serif text-brand-400 shadow-sm">3</div>
                  <span className="text-xs font-medium uppercase tracking-wider text-brand-400">Paid Out</span>
                  {/* Floating tooltip */}
                  <div className="absolute -top-12 bg-brand-900 text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-md">
                    2-Hour Payout
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-900 rotate-45"></div>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal direction="up" delay={300}>
              <Card className="shadow-none border border-brand-200 hover:shadow-premium transition-shadow h-full">
                <div className="w-10 h-10 bg-accent-light text-[#E6A889] rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="font-serif text-xl text-brand-900 mb-2">Automated claim deduction</h3>
                <p className="text-sm text-brand-800 leading-relaxed">Kizuna connects to your platform to detect issues via public supply/demand APIs and alerts.</p>
              </Card>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={400}>
              <Card className="bg-brand-900 text-brand-50 shadow-premium h-full">
                <div className="w-10 h-10 bg-brand-800 text-brand-200 rounded-xl flex items-center justify-center mb-6">
                  <Zap size={20} />
                </div>
                <h3 className="font-serif text-xl mb-2">Instant UPI payout</h3>
                <p className="text-sm text-brand-200 leading-relaxed">Funds hit your bank account within 2 hours under our advanced framing method's safe buffer protocol.</p>
              </Card>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={500}>
              <Card className="shadow-none border border-brand-200 hover:shadow-premium transition-shadow h-full">
                <div className="w-10 h-10 bg-brand-100 text-brand-800 rounded-xl flex items-center justify-center mb-6">
                  <CalendarDays size={20} />
                </div>
                <h3 className="font-serif text-xl text-brand-900 mb-2">Zero manual effort</h3>
                <p className="text-sm text-brand-800 leading-relaxed">No paperwork, no support tickets. Our fully automated system handles everything from detection to payout.</p>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* 3. Feature 2: Earnings Fingerprint AI */}
        <section className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <ScrollReveal direction="right">
              <div className="inline-flex items-center px-3 py-1 bg-brand-200 text-brand-800 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                Data Optimization
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-900 leading-tight mb-6">
                Your income pattern is <span className="italic">unique.</span><br/>
                Your protection should be too.
              </h2>
              <p className="text-brand-800">
                Kizuna's business framework ML models your specific shift routines and acts exactly as they differ across the gig ecosystem — past your data allowance limits.
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={200}>
              <Card className="p-8 border border-brand-200 shadow-md">
                <div className="flex justify-between items-center mb-6 text-sm flex-wrap gap-2">
                  <span className="font-medium text-brand-900 flex items-center gap-2"><TrendingUp size={16}/> Earnings Trajectory</span>
                  <span className="text-brand-400 tracking-wider text-[10px] uppercase font-bold bg-brand-50 px-2 py-1 rounded">14-90 Day Trend</span>
                </div>
                {/* SVG Graph */}
                <div className="w-full h-48 mb-6 border-b border-l border-brand-100 relative">
                   <svg viewBox="0 0 400 150" className="w-full h-full text-brand-800 overflow-visible">
                     <path d="M0 100 C 50 120, 100 40, 150 80 C 200 120, 250 60, 300 90 C 350 120, 380 40, 400 60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                     <path d="M0 120 L 400 120" fill="none" stroke="#E6A889" strokeWidth="2" strokeDasharray="4 4" />
                   </svg>
                   {/* Data points */}
                   <div className="absolute top-[40%] right-[25%] w-3 h-3 bg-brand-800 rounded-full ring-4 ring-brand-100 shadow-sm"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <p className="text-xs text-brand-400 mb-1">Current Baseline</p>
                     <p className="font-serif text-2xl text-brand-900">₹720<span className="text-sm text-brand-400 font-sans">/day</span></p>
                   </div>
                   <div>
                     <p className="text-xs text-brand-400 mb-1">Coverage Limit</p>
                     <div className="bg-brand-900 text-white rounded-md px-3 py-1 font-serif text-xl inline-block">25% Max</div>
                   </div>
                </div>
              </Card>
            </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-brand-200 pt-10">
            <ScrollReveal direction="up" delay={200}>
              <div className="flex flex-col">
                <Shield className="text-brand-800 mb-4" size={24} />
                <h4 className="font-serif text-brand-900 text-lg mb-2">Personalized baseline</h4>
                <p className="text-sm text-brand-800">We analyze your historical data to create a custom income floor that accurately reflects your true earnings.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={300}>
              <div className="flex flex-col">
                <History className="text-brand-800 mb-4" size={24} />
                <h4 className="font-serif text-brand-900 text-lg mb-2">14–90 day analysis</h4>
                <p className="text-sm text-brand-800">Our ML models look at comprehensive histories to account for seasonality, holidays, and temporary dips.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={400}>
              <div className="flex flex-col">
                <Clock className="text-brand-800 mb-4" size={24} />
                <h4 className="font-serif text-brand-900 text-lg mb-2">Time & zone analysis</h4>
                <p className="text-sm text-brand-800">Your protection adapts based on the times and zones you typically work, providing targeted coverage.</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 4. Feature 3: Smart Geo-Zone Protection */}
        <section className="max-w-6xl mx-auto bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-brand-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center relative z-10">
            <ScrollReveal direction="right" className="lg:col-span-2">
              <div className="aspect-square bg-brand-50 rounded-[2rem] border border-brand-200 flex items-center justify-center relative overflow-hidden p-6">
                {/* Simulated Map UI */}
                <div className="w-full h-full rounded-2xl bg-[#f0f4f8] relative overflow-hidden shadow-inner">
                  {/* Map grids/lines */}
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-20 absolute inset-0 text-brand-400">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                  
                  {/* Zone circles */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-800/5 border border-brand-800/20 rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-brand-800/10 border border-brand-800/30 rounded-full flex items-center justify-center">
                      <div className="w-16 h-16 bg-brand-900 text-white rounded-full flex items-center justify-center shadow-lg">
                        <MapPin size={24} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md text-xs font-bold font-serif flex items-center gap-2 border border-brand-100">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    Active Zone Detected
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={200} className="lg:col-span-3">
              <div className="inline-flex items-center px-3 py-1 bg-accent-light text-[#E6A889] text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                Smart Geofencing
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-900 leading-tight mb-6">
                Protection that works only <span className="italic">where it matters</span> — your zone.
              </h2>
              <p className="text-brand-800 text-lg mb-10">
                Our intelligent map isolates your actual working path, activating premium coverage only when you're in the "Active Zone".
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-50 border border-transparent hover:border-brand-200 transition-colors">
                  <div className="mt-1 bg-brand-200 text-brand-900 rounded-full p-1"><CheckCircle2 size={16} /></div>
                  <div>
                    <h4 className="font-bold text-brand-900">Zone-level disruption detection</h4>
                    <p className="text-sm text-brand-800">Only pay for coverage when bad weather or low demand hits your specific operational area, not the whole city.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-50 border border-transparent hover:border-brand-200 transition-colors">
                  <div className="mt-1 bg-brand-200 text-brand-900 rounded-full p-1"><CheckCircle2 size={16} /></div>
                  <div>
                    <h4 className="font-bold text-brand-900">GPS-based validation</h4>
                    <p className="text-sm text-brand-800">Automated tracking ensures you get paid simply by being in the affected zone during the event window.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-50 border border-transparent hover:border-brand-200 transition-colors">
                  <div className="mt-1 bg-brand-200 text-brand-900 rounded-full p-1"><CheckCircle2 size={16} /></div>
                  <div>
                    <h4 className="font-bold text-brand-900">Rider-specific activation</h4>
                    <p className="text-sm text-brand-800">Your protection turns on automatically based on your individual working patterns and movement.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 5. Feature 4: Fraud-Proof System */}
        <section className="max-w-6xl mx-auto space-y-16">
          <div className="text-center">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center px-3 py-1 bg-[#E6A889]/20 text-[#D86D3B] text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                Fraud Prevention
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-900 leading-tight">
                Built to protect <span className="italic text-[#D86D3B]">genuine</span> riders.
              </h2>
            </ScrollReveal>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <ScrollReveal direction="right" delay={100}>
                <Card className="flex items-start gap-5 p-6 border border-brand-200 hover:shadow-premium transition-all">
                  <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-800 shrink-0">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-brand-900 mb-1">Multi-signal verification</h4>
                    <p className="text-sm text-brand-800">Cross-referencing GPS, device telemetry, and network signals to confirm true work status.</p>
                  </div>
                </Card>
              </ScrollReveal>
              
              <ScrollReveal direction="right" delay={200}>
                <Card className="flex items-start gap-5 p-6 border border-[#E6A889]/30 bg-[#FFF9F6] shadow-sm transition-all">
                  <div className="w-12 h-12 rounded-full bg-[#E6A889]/20 flex items-center justify-center text-[#D86D3B] shrink-0">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-brand-900 mb-1">Behavior-based detection</h4>
                    <p className="text-sm text-brand-800">Our ML identifies artificial patterns that differ from typical organic delivery operations.</p>
                  </div>
                </Card>
              </ScrollReveal>
              
              <ScrollReveal direction="right" delay={300}>
                <Card className="flex items-start gap-5 p-6 bg-brand-900 text-brand-50 shadow-premium transition-all">
                  <div className="w-12 h-12 rounded-full bg-brand-800 flex items-center justify-center text-white shrink-0">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-white mb-1">Soft warning system</h4>
                    <p className="text-sm text-brand-200">First-time anomalies trigger educational nudges before any restrictive action is taken.</p>
                  </div>
                </Card>
              </ScrollReveal>
            </div>
            
            <ScrollReveal direction="left" delay={400} className="h-full">
              <div className="h-full w-full min-h-[400px] bg-white rounded-3xl border border-brand-100 shadow-sm p-8 flex items-center justify-center relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-50 to-white">
                {/* Visualizer Rings */}
                <div className="absolute w-[80%] aspect-square border-2 border-dashed border-brand-200 rounded-full animate-[spin_60s_linear_infinite]"></div>
                <div className="absolute w-[50%] aspect-square border border-brand-300 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
                
                {/* Shield Core */}
                <div className="relative z-10 w-32 h-32 bg-brand-900 rounded-full shadow-2xl flex items-center justify-center border-8 border-white">
                  <Shield size={40} className="text-white" />
                </div>
                
                {/* Floating Signals */}
                <div className="absolute top-[20%] left-[20%] w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center border border-brand-100 text-[#D86D3B] animate-bounce">
                  <MapPin size={20} />
                </div>
                <div className="absolute bottom-[20%] right-[20%] w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center border border-brand-100 text-brand-800 animate-pulse">
                  <Activity size={20} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 6. Feature 5: Predictive Risk Alerts */}
        <section className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="right">
              <div className="inline-flex items-center px-3 py-1 bg-[#E6A889]/20 text-[#D86D3B] text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                Predictive Modeling
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-900 leading-tight mb-6">
                Know your risk before you lose income.
              </h2>
              <p className="text-brand-800 text-lg mb-8">
                Kizuna analyzes market volatility, weather, and demand to warn you of potential disruptions before they hit your wallet.
              </p>
              
              <ul className="space-y-5">
                <li className="flex items-center gap-3">
                  <div className="bg-[#FFF9F6] text-[#D86D3B] p-2 rounded-lg border border-[#E6A889]/30">
                    <Bell size={18} />
                  </div>
                  <span className="font-medium text-brand-900">24-hour disruption alerts</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-[#FFF9F6] text-[#D86D3B] p-2 rounded-lg border border-[#E6A889]/30">
                    <BarChart size={18} />
                  </div>
                  <span className="font-medium text-brand-900">Weekly risk scorecard</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-[#FFF9F6] text-[#D86D3B] p-2 rounded-lg border border-[#E6A889]/30">
                    <LineChart size={18} />
                  </div>
                  <span className="font-medium text-brand-900">Expected payout preview</span>
                </li>
              </ul>
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={200}>
              <Card className="border border-brand-200 p-0 overflow-hidden shadow-lg bg-white">
                <div className="p-6 border-b border-brand-100 flex justify-between items-center bg-brand-50">
                  <h4 className="font-serif font-bold text-brand-900">Risk Dashboard</h4>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-brand-300"></div>
                    <div className="w-2 h-2 rounded-full bg-brand-300"></div>
                    <div className="w-2 h-2 rounded-full bg-brand-300"></div>
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  {/* Alert Banner */}
                  <div className="bg-[#FFF9F6] border border-[#E6A889]/40 rounded-xl p-4 flex gap-4 items-start">
                    <AlertTriangle className="text-[#D86D3B] shrink-0 mt-0.5" size={20} />
                    <div>
                      <h5 className="font-bold text-brand-900 text-sm mb-1">High Rain Probability</h5>
                      <p className="text-xs text-brand-800">Anticipate possible drop in daily demand between 2 PM and 5 PM today.</p>
                      <div className="mt-3 inline-block bg-white border border-[#E6A889]/30 text-xs font-bold px-3 py-1 rounded-full text-brand-900">
                        Map Impact Zone
                      </div>
                    </div>
                  </div>
                  
                  {/* Payout Preview */}
                  <div className="bg-brand-900 text-white rounded-xl p-6 relative overflow-hidden">
                    <div className="relative z-10">
                      <p className="text-xs text-brand-200 mb-1 uppercase tracking-widest">Expected Payout Impact</p>
                      <p className="font-serif text-4xl">₹142.50 <span className="text-sm font-sans text-brand-200 font-normal">potential cover</span></p>
                    </div>
                    {/* decorative background element */}
                    <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 bg-gradient-to-l from-white to-transparent pointer-events-none mix-blend-overlay"></div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* 7. Feature 6: Activity-Based Coverage */}
        <section className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <ScrollReveal direction="right" className="order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-brand-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop" 
                  alt="Gig worker reviewing metrics" 
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Element */}
                <div className="absolute bottom-6 left-6 right-6 bg-white p-4 rounded-xl shadow-lg border border-brand-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E6A889]/20 text-[#D86D3B] flex items-center justify-center">
                      <Award size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-brand-500 font-bold uppercase">Pro Tier Status</p>
                      <p className="text-sm font-medium text-brand-900">4% expanded coverage activated</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={200} className="order-1 lg:order-2">
              <div className="inline-flex items-center px-3 py-1 bg-brand-200 text-brand-800 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                Dynamic Protection
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-900 leading-tight mb-6">
                The more you work,<br/>
                the stronger your <span className="italic">protection.</span>
              </h2>
              <p className="text-brand-800 text-lg mb-8">
                Our dynamic coverage evolves with your career. As your frequency increases, your safety net expands automatically.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-900 text-white flex items-center justify-center shrink-0">1</div>
                  <div>
                    <h4 className="font-serif text-xl font-medium text-brand-900 mb-1">Tier-based protection system</h4>
                    <p className="text-sm text-brand-800">Unlock Bronze, Silver, and Gold status tiers automatically based on your rolling 30-day delivery volume.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-900 text-white flex items-center justify-center shrink-0">2</div>
                  <div>
                    <h4 className="font-serif text-xl font-medium text-brand-900 mb-1">Higher activity = Higher benefits</h4>
                    <p className="text-sm text-brand-800">Your maximum coverage limit scales proportionally with your work hours, providing more robust protection when you need it.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#E6A889] text-brand-900 flex items-center justify-center shrink-0">3</div>
                  <div>
                    <h4 className="font-serif text-xl font-medium text-brand-900 mb-1">Consistency rewards</h4>
                    <p className="text-sm text-brand-800">Maintain steady activity patterns to decrease your claim deductibles and unlock special one-time bonuses.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
          </div>
        </section>

        {/* 8. Journey Timeline */}
        <section className="max-w-4xl mx-auto text-center py-10">
          <ScrollReveal direction="up">
            <h2 className="text-3xl font-serif text-brand-900 mb-2">Your Protection Journey</h2>
            <p className="text-brand-800 mb-16">Securing fast, custom fit for your conditions</p>
            
            <div className="relative">
              {/* Line */}
              <div className="absolute top-4 left-0 w-full h-1 bg-brand-200 -z-10 rounded">
                <div className="h-full bg-brand-900 w-3/4 rounded relative">
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-brand-900 text-white text-[10px] font-bold px-2 py-1 rounded">GUARANTEED</div>
                </div>
              </div>
              
              <div className="flex justify-between relative">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-brand-900 rounded-full mb-3 ring-4 ring-white"></div>
                  <span className="text-xs font-bold uppercase text-brand-900">Verified</span>
                  <span className="text-[10px] text-brand-400">0 MIN</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-brand-900 rounded-full mb-3 ring-4 ring-white"></div>
                  <span className="text-xs font-bold uppercase text-brand-900">At Risk</span>
                  <span className="text-[10px] text-brand-400">15 MIN</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-brand-900 rounded-full mb-3 ring-4 ring-white"></div>
                  <span className="text-xs font-bold uppercase text-brand-900">Payout Initiated</span>
                  <span className="text-[10px] text-brand-400">20 MIN</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-white border-2 border-brand-200 rounded-full mb-3"></div>
                  <span className="text-xs font-bold uppercase text-brand-400">Paid</span>
                  <span className="text-[10px] text-brand-400">1-2 HRS</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 9. Final CTA */}
        <section className="bg-brand-900 text-brand-50 rounded-[3rem] p-12 md:p-24 text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E6A889]/10 rounded-full blur-3xl mix-blend-overlay"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl mix-blend-overlay"></div>
          
          <ScrollReveal direction="up" className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
              Ready to secure your future?
            </h2>
            <p className="text-brand-200 max-w-2xl mx-auto mb-10 text-lg">
              Join 10,000+ gig professionals who've stopped their earnings from tying to the uncontrollable events against our seamless app.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-brand-900 hover:bg-brand-50">Get Started Today</Button>
              <Button variant="outline" className="border-brand-500 text-brand-50 hover:bg-brand-800">Book Demo Quickly</Button>
            </div>
          </ScrollReveal>
        </section>

      </main>
      <Footer />
    </div>
  );
}
