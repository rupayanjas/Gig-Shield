import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card } from '../components/ui';
import { getUser, logout } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, X, Shield, Activity, BarChart2, Bell } from 'lucide-react';
import { cn } from '../components/ui';
import { ScrollReveal } from '../components/ScrollReveal';
import { useLiveData } from '../hooks/useLiveData';
import LiveDataPanel from '../components/LiveDataPanel';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [showAlert, setShowAlert] = useState(true);
  const navigate = useNavigate();

  // Live backend data (fetched via API using the user's phone as key)
  const { liveUser, triggers, claims, loading: liveLoading, error: liveError } = useLiveData(user?.phone);

  useEffect(() => {
    const data = getUser();
    if (data) {
      setUser(data);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return null; // Or a loading skeleton

  // Generate a random simple 14-day income chart data based on baseline (720)
  const chartData = Array.from({ length: 14 }).map((_, i) => {
    // some dip around day 7 to simulate a disruption
    let value = 720 + (Math.random() * 200 - 100);
    if (i === 6 || i === 7) value = 300; // Drop due to rain/downtime
    return Math.max(0, value);
  });

  const pathD = chartData.map((val, i) => {
    const x = (i / 13) * 100; // percentage
    const y = 100 - (val / 1000) * 100; // assuming scale 0-1000
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="min-h-screen bg-brand-50 relative flex flex-col overflow-hidden">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-1 w-full flex flex-col gap-10">
        
        {/* Alert Banner */}
        {showAlert && (
          <ScrollReveal direction="down">
            <div className="bg-[#FCE7DF] rounded-2xl p-4 flex gap-4 items-start border border-[#FAD6C6] shadow-sm relative pr-12">
              <div className="text-[#8A5A44] mt-0.5">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h4 className="font-bold text-brand-900 text-sm">Disruption forecast alert</h4>
                <p className="text-sm text-brand-800">
                  High traffic & rain expected in {user.zone}. Increase in booking cancellations likely between 5 PM - 8 PM.
                </p>
              </div>
              <button 
                onClick={() => setShowAlert(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A5A44] hover:text-brand-900"
              >
                <X size={16} />
              </button>
            </div>
          </ScrollReveal>
        )}

        {/* Header */}
        <ScrollReveal direction="up" delay={100}>
          <div>
            <div className="inline-flex items-center px-3 py-1 bg-accent-light/50 text-[#8A5A44] text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
              Main Console
            </div>
            <h1 className="text-5xl font-serif text-brand-900 mb-2">
              Your Shield Status
            </h1>
            <p className="text-brand-800 text-sm">
              Coverage active for {user.platform} in {user.zone}. Trust Score: <span className="font-bold">{user.trustScore}/100</span>
            </p>
          </div>
        </ScrollReveal>

        {/* ─── Live Backend Data Section ─── */}
        <ScrollReveal direction="up" delay={150}>
          <LiveDataPanel
            liveUser={liveUser}
            triggers={triggers}
            claims={claims}
            loading={liveLoading}
            error={liveError}
          />
        </ScrollReveal>

        {/* 3 Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <ScrollReveal direction="up" delay={200} className="h-full">
            <Card className="flex flex-col h-full bg-white relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6 z-10">
                <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Protection</span>
                <span className="px-2 py-1 bg-[#FCE7DF] text-[#8A5A44] text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {user.policy.status}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-brand-900 mb-auto z-10">Coverage Tier {user.coverageTier.name}</h3>
              
              <div className="mt-8 flex justify-between items-end z-10">
                <div>
                  <p className="text-sm font-medium text-brand-800">{user.coverageTier.hours} hrs/month protected</p>
                  <p className="text-xs text-brand-400 mt-1">Premium: ₹{user.premium.amount}/{user.premium.frequency}</p>
                </div>
                {/* Fake Toggle */}
                <div className="w-12 h-6 bg-brand-800 rounded-full flex items-center p-1 cursor-not-allowed">
                  <div className="w-4 h-4 bg-brand-50 rounded-full translate-x-6"></div>
                </div>
              </div>
              {/* BG pattern */}
              <div className="absolute -right-6 -bottom-6 text-brand-100/50 -z-0">
                 <Shield size={120} />
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300} className="h-full">
            <Card className="flex flex-col h-full bg-white relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6 z-10">
                <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Financials</span>
              </div>
              <h3 className="font-serif text-2xl text-brand-900 mb-6 z-10">Daily Income Baseline</h3>
              
              <div className="mt-auto z-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-serif text-brand-900">₹{user.baselineIncome}</span>
                  <span className="text-sm font-medium text-brand-500">+25% coverage</span>
                </div>
                <p className="text-xs text-brand-400 italic mt-2">Partial income buffer, not full replacement.</p>
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400} className="h-full">
            <Card className="flex flex-col h-full bg-white relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6 z-10">
                <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Analytics</span>
                <div className="w-6 h-6 rounded bg-brand-100 text-brand-800 flex items-center justify-center">
                  <BarChart2 size={14} />
                </div>
              </div>
              <h3 className="font-serif text-2xl text-brand-900 mb-6 z-10">Risk Scorecard</h3>
              
              <div className="mt-auto w-full z-10">
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-medium text-brand-800">Zone Risk: {user.scorecard.period}</span>
                  <span className={cn(
                    "font-bold rounded-sm px-1.5 py-0.5 uppercase",
                    user.scorecard.riskLevel === 'HIGH' ? "bg-red-100 text-red-700" : "bg-brand-100 text-brand-800"
                  )}>{user.scorecard.riskLevel}</span>
                </div>
                <div className="h-2 w-full bg-brand-100 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full", user.scorecard.riskLevel === 'HIGH' ? "bg-red-500" : "bg-brand-500")}
                    style={{ width: `${user.scorecard.disruptionProb}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-brand-400 mt-2">{user.scorecard.disruptionProb}% disruption probability • premium {user.scorecard.premiumStatus}</p>
              </div>
            </Card>
          </ScrollReveal>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
          {/* Earnings Chart */}
          <ScrollReveal direction="right" className="lg:col-span-2">
            <Card className="h-full">
              <h3 className="font-serif text-xl text-brand-900 mb-6 border-b border-brand-100 pb-4">14-Day Earning History</h3>
              <div className="h-[200px] w-full relative">
                {/* Y Axis Labels */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-brand-400 py-2">
                  <span>₹1000</span>
                  <span>₹500</span>
                  <span>₹0</span>
                </div>
                {/* SVG Canvas */}
                <div className="pl-10 w-full h-full relative border-l border-b border-brand-100">
                   {/* Guides */}
                   <div className="absolute w-full h-[1px] bg-brand-100 top-1/2 -ml-0"></div>
                   {/* Line Chart */}
                   <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible py-2">
                     <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="#AA8066" stopOpacity="0.5"/>
                       <stop offset="100%" stopColor="#AA8066" stopOpacity="0"/>
                     </linearGradient>
                     
                     {/* Area under line */}
                     <path 
                       d={`M 0 100 ${pathD} L 100 100 Z`} 
                       fill="url(#lineGrad)" 
                     />
                     
                     {/* Baseline */}
                     <line x1="0" y1={100 - (user.baselineIncome / 1000) * 100} x2="100" y2={100 - (user.baselineIncome / 1000) * 100} stroke="#E6A889" strokeWidth="0.5" strokeDasharray="2 2" />
                     
                     {/* Main line */}
                     <path 
                       d={pathD} 
                       fill="none" 
                       stroke="#8A5A44" 
                       strokeWidth="1.5" 
                       vectorEffect="non-scaling-stroke"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                     />
                   </svg>
                   {/* Baseline label */}
                   <span className="absolute right-0 text-[10px] text-[#E6A889] bg-white px-1 leading-none -translate-y-1/2" style={{ top: `${100 - (user.baselineIncome / 1000) * 100}%`}}>Baseline ₹{user.baselineIncome}</span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-brand-400 mt-2 pl-10">
                <span>14 Days Ago</span>
                <span>Today</span>
              </div>
            </Card>
          </ScrollReveal>

          {/* Recent Activity */}
          <ScrollReveal direction="left" delay={200}>
            <Card className="p-0 overflow-hidden sticky top-24 h-full">
              <div className="p-6 border-b border-brand-100 flex justify-between items-center bg-white">
                <h3 className="font-serif text-xl text-brand-900">Recent Activity</h3>
                <a href="#" className="text-xs font-bold text-brand-800 hover:underline">View All</a>
              </div>
              
              <div className="divide-y divide-brand-100 bg-white">
                {user.claims.map(claim => (
                  <div key={claim.id} className="p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-50 shrink-0 flex items-center justify-center text-brand-800 border border-brand-100">
                      <Activity size={16} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-brand-900 mb-0.5">{claim.title}</h4>
                      <p className="text-xs text-brand-500 mb-2">{claim.description}</p>
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-50 border border-brand-200 text-brand-800 px-2 py-0.5 rounded-full">
                           {claim.status}
                         </span>
                         {claim.amount && (
                           <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                             +₹{claim.amount}
                           </span>
                         )}
                      </div>
                    </div>
                    <div className="text-[10px] text-brand-400 text-right shrink-0 whitespace-nowrap">
                      {claim.time}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-brand-50 border-t border-brand-100 text-center mt-auto">
                <p className="text-xs font-medium text-brand-600">Remaining claims this month: <span className="text-brand-900 font-bold">3/5</span></p>
              </div>
            </Card>
          </ScrollReveal>
        </div>

      </main>

      {/* Floating Widget */}
      <ScrollReveal direction="up" delay={500} className="fixed bottom-6 right-6 z-50">
        <div className="bg-brand-900 text-brand-50 rounded-2xl p-4 shadow-2xl flex flex-col gap-3 min-w-[200px]">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400">Pro Plan Active</span>
          <button className="bg-accent-light text-brand-900 font-medium py-2 px-4 rounded-xl text-sm hover:bg-white transition-colors">
            Upgrade Coverage
          </button>
        </div>
      </ScrollReveal>
    </div>
  );
}
