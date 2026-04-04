import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Card } from '../components/ui';
import { getUser } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, X, Shield, Activity, BarChart2, Zap, Clock, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../components/ui';
import { ScrollReveal } from '../components/ScrollReveal';
import { useLiveData } from '../hooks/useLiveData';
import LiveDataPanel from '../components/LiveDataPanel';
import { getShieldedIncome, getCoverageTier, getRiskLevel } from '../lib/liveHelpers';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [showAlert, setShowAlert] = useState(true);
  const navigate = useNavigate();

  // ── LIVE DATA (backend APIs) ──
  const { liveUser, triggers, claims, loading: liveLoading, error: liveError, refresh } = useLiveData(user?.phone);

  useEffect(() => {
    const data = getUser();
    if (data) setUser(data);
    else navigate('/login');
  }, [navigate]);

  if (!user) return null;

  // ── HARDCODED: 14-day earnings chart (static placeholder, never connects to API) ──
  const chartData = Array.from({ length: 14 }).map((_, i) => {
    let value = 720 + (Math.random() * 200 - 100);
    if (i === 6 || i === 7) value = 300;
    return Math.max(0, value);
  });
  const pathD = chartData.map((val, i) => {
    const x = (i / 13) * 100;
    const y = 100 - (val / 1000) * 100;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // ── DERIVED from live data ──
  // Use the REAL backend trust score; show '…' while loading to avoid stale mock flash
  const trustScore     = liveUser?.trustScore ?? null;
  const shieldedIncome = getShieldedIncome(claims);
  const { level: riskLevel, prob: riskProb } = getRiskLevel(triggers);

  // Coverage tier: ALWAYS use the plan the user selected at registration (localStorage)
  // getCoverageTier is only a fallback if no tier was stored
  const selectedTier = user.coverageTier?.name ? user.coverageTier : getCoverageTier(trustScore ?? 50);
  const coverageTierName  = selectedTier.name;    // e.g. Basic / Plus / Pro / Premium
  const coverageTierHours = selectedTier.hours;   // e.g. 100 / 120 / 160

  // Status badge helpers
  const claimStatusCls = {
    approved: 'bg-green-50 text-green-700 border-green-200',
    pending:  'bg-amber-50 text-amber-700 border-amber-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
  };
  const claimStatusIcon = { approved: CheckCircle, pending: Clock, rejected: XCircle };
  const triggerIcons = { rain:'🌧️', pollution:'🌫️', app_downtime:'⚠️', dark_store:'🏪', incentive_break:'💸' };

  return (
    <div className="min-h-screen bg-brand-50 relative flex flex-col overflow-hidden">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-1 w-full flex flex-col gap-10">

        {/* ── HARDCODED: Alert Banner ── */}
        {showAlert && (
          <ScrollReveal direction="down">
            <div className="bg-[#FCE7DF] rounded-2xl p-4 flex gap-4 items-start border border-[#FAD6C6] shadow-sm relative pr-12">
              <div className="text-[#8A5A44] mt-0.5"><AlertTriangle size={20} /></div>
              <div>
                <h4 className="font-bold text-brand-900 text-sm">Disruption forecast alert</h4>
                <p className="text-sm text-brand-800">
                  High traffic &amp; rain expected in {user.zone}. Increase in booking cancellations likely between 5 PM - 8 PM.
                </p>
              </div>
              <button onClick={() => setShowAlert(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A5A44] hover:text-brand-900">
                <X size={16} />
              </button>
            </div>
          </ScrollReveal>
        )}

        {/* ── HEADER (live trust score if available) ── */}
        <ScrollReveal direction="up" delay={100}>
          <div>
            <div className="inline-flex items-center px-3 py-1 bg-accent-light/50 text-[#8A5A44] text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
              Main Console
            </div>
            <h1 className="text-5xl font-serif text-brand-900 mb-2">Your Shield Status</h1>
            <p className="text-brand-800 text-sm">
              Coverage active for {user.platform} in {liveUser?.city ?? user.zone}.{' '}
              Trust Score:{' '}
              <span className="font-bold">
                {liveLoading ? '…' : trustScore !== null ? `${trustScore}/100` : `${user.trustScore}/100`}
              </span>
            </p>
          </div>
        </ScrollReveal>

        {/* ── SIMULATE EVENT (Live Data Panel — Triggers, Trust Score Ring, Claims) ── */}
        <ScrollReveal direction="up" delay={150}>
          <LiveDataPanel
            liveUser={liveUser}
            triggers={triggers}
            claims={claims}
            loading={liveLoading}
            error={liveError}
            onRefresh={refresh}
          />
        </ScrollReveal>

        {/* ── 3 STATUS CARDS ─────────────────────────────────────
             Card 1: Coverage Tier  → LIVE (derived from trustScore)
             Card 2: Shielded Income → LIVE (sum of approved payouts)
             Card 3: Risk Scorecard  → LIVE (derived from active triggers)
        ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 — Coverage Tier (LIVE) */}
          <ScrollReveal direction="up" delay={200} className="h-full">
            <Card className="flex flex-col h-full bg-white relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6 z-10">
                <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Protection</span>
                <span className="px-2 py-1 bg-[#FCE7DF] text-[#8A5A44] text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Active
                </span>
              </div>
              <h3 className="font-serif text-2xl text-brand-900 mb-auto z-10">
                {`Coverage · ${coverageTierName}`}
              </h3>
              <div className="mt-8 flex justify-between items-end z-10">
                <div>
                  <p className="text-sm font-medium text-brand-800">{coverageTierHours} hrs/month protected</p>
                  <p className="text-xs text-brand-400 mt-1">Premium: ₹{user.premium.amount}/{user.premium.frequency}</p>
                </div>
                <div className="w-12 h-6 bg-brand-800 rounded-full flex items-center p-1 cursor-not-allowed">
                  <div className="w-4 h-4 bg-brand-50 rounded-full translate-x-6"></div>
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 text-brand-100/50 -z-0">
                <Shield size={120} />
              </div>
            </Card>
          </ScrollReveal>

          {/* Card 2 — Shielded Income (LIVE) */}
          <ScrollReveal direction="up" delay={300} className="h-full">
            <Card className="flex flex-col h-full bg-white relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6 z-10">
                <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Financials</span>
              </div>
              <h3 className="font-serif text-2xl text-brand-900 mb-6 z-10">Shielded Income</h3>
              <div className="mt-auto z-10">
                {liveLoading ? (
                  <div className="h-10 w-32 bg-brand-100 rounded animate-pulse" />
                ) : (
                  <>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-serif text-brand-900">₹{shieldedIncome}</span>
                      <span className="text-sm font-medium text-brand-500">total approved</span>
                    </div>
                    <p className="text-xs text-brand-400 italic mt-2">
                      {claims.filter(c => c.status === 'approved').length} claim(s) paid out this period.
                    </p>
                  </>
                )}
              </div>
            </Card>
          </ScrollReveal>

          {/* Card 3 — Risk Scorecard (LIVE) */}
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
                {liveLoading ? (
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-brand-100 rounded animate-pulse" />
                    <div className="h-2 w-full bg-brand-100 rounded animate-pulse" />
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="font-medium text-brand-800">Active Triggers: {triggers.length}</span>
                      <span className={cn(
                        'font-bold rounded-sm px-1.5 py-0.5 uppercase',
                        riskLevel === 'HIGH' ? 'bg-red-100 text-red-700' :
                        riskLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                        'bg-green-100 text-green-700'
                      )}>{riskLevel}</span>
                    </div>
                    <div className="h-2 w-full bg-brand-100 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full transition-all duration-700',
                          riskLevel === 'HIGH' ? 'bg-red-500' :
                          riskLevel === 'MEDIUM' ? 'bg-amber-500' : 'bg-green-500'
                        )}
                        style={{ width: `${riskProb}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-brand-400 mt-2">
                      {riskProb}% disruption probability · {triggers.length} event(s) detected
                    </p>
                  </>
                )}
              </div>
            </Card>
          </ScrollReveal>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">

          {/* ── HARDCODED: Earnings Chart (static placeholder) ── */}
          <ScrollReveal direction="right" className="lg:col-span-2">
            <Card className="h-full">
              <h3 className="font-serif text-xl text-brand-900 mb-6 border-b border-brand-100 pb-4">14-Day Earning History</h3>
              <div className="h-[200px] w-full relative">
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-brand-400 py-2">
                  <span>₹1000</span><span>₹500</span><span>₹0</span>
                </div>
                <div className="pl-10 w-full h-full relative border-l border-b border-brand-100">
                  <div className="absolute w-full h-[1px] bg-brand-100 top-1/2"></div>
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible py-2">
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#AA8066" stopOpacity="0.5"/>
                      <stop offset="100%" stopColor="#AA8066" stopOpacity="0"/>
                    </linearGradient>
                    <path d={`M 0 100 ${pathD} L 100 100 Z`} fill="url(#lineGrad)" />
                    <line x1="0" y1={100 - (user.baselineIncome / 1000) * 100} x2="100" y2={100 - (user.baselineIncome / 1000) * 100} stroke="#E6A889" strokeWidth="0.5" strokeDasharray="2 2" />
                    <path d={pathD} fill="none" stroke="#8A5A44" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="absolute right-0 text-[10px] text-[#E6A889] bg-white px-1 leading-none -translate-y-1/2" style={{ top: `${100 - (user.baselineIncome / 1000) * 100}%` }}>
                    Baseline ₹{user.baselineIncome}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-brand-400 mt-2 pl-10">
                <span>14 Days Ago</span><span>Today</span>
              </div>
            </Card>
          </ScrollReveal>

          {/* ── LIVE: Recent Activity (real claims from /api/claim) ── */}
          <ScrollReveal direction="left" delay={200}>
            <Card className="p-0 overflow-hidden sticky top-24 h-full">
              <div className="p-6 border-b border-brand-100 flex justify-between items-center bg-white">
                <h3 className="font-serif text-xl text-brand-900">Recent Claims</h3>
                {!liveLoading && (
                  <span className="text-[10px] font-bold text-brand-500 uppercase">{claims.length} total</span>
                )}
              </div>

              {/* Loading state */}
              {liveLoading && (
                <div className="p-6 space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex gap-3 items-center animate-pulse">
                      <div className="w-10 h-10 rounded-full bg-brand-100 shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-brand-100 rounded w-3/4" />
                        <div className="h-2 bg-brand-100 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty state */}
              {!liveLoading && claims.length === 0 && (
                <div className="p-8 flex flex-col items-center justify-center text-brand-400 gap-2">
                  <Zap size={28} className="opacity-40" />
                  <p className="text-xs text-center">No claims yet.<br/>Click "Simulate Event" above to generate one.</p>
                </div>
              )}

              {/* Live claims */}
              {!liveLoading && claims.length > 0 && (
                <div className="divide-y divide-brand-100 bg-white max-h-80 overflow-y-auto">
                  {claims.map(claim => {
                    const Icon = claimStatusIcon[claim.status] || Activity;
                    const statusCls = claimStatusCls[claim.status] || claimStatusCls.pending;
                    return (
                      <div key={claim._id} className="p-5 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-50 shrink-0 flex items-center justify-center text-brand-800 border border-brand-100">
                          <Activity size={16} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-brand-900 mb-0.5 capitalize">
                            {(claim.triggerId?.type || 'Trigger Event')?.replace(/_/g, ' ')}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border', statusCls)}>
                              {claim.status}
                            </span>
                            {claim.status === 'approved' && claim.payoutAmount > 0 && (
                              <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                                +₹{claim.payoutAmount}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-[10px] text-brand-400 text-right shrink-0 whitespace-nowrap pt-1">
                          {new Date(claim.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="p-4 bg-brand-50 border-t border-brand-100 text-center mt-auto">
                <p className="text-xs font-medium text-brand-600">
                  Approved this period:{' '}
                  <span className="text-brand-900 font-bold">
                    ₹{shieldedIncome}
                  </span>
                </p>
              </div>
            </Card>
          </ScrollReveal>

        </div>
      </main>

      {/* ── HARDCODED: Floating Widget ── */}
      <ScrollReveal direction="up" delay={500} className="fixed bottom-6 right-6 z-50">
        <div className="bg-brand-900 text-brand-50 rounded-2xl p-4 shadow-2xl flex flex-col gap-3 min-w-[200px]">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400">
            {liveLoading ? 'Loading…' : `${coverageTier.name} Plan`}
          </span>
          <button className="bg-accent-light text-brand-900 font-medium py-2 px-4 rounded-xl text-sm hover:bg-white transition-colors">
            Upgrade Coverage
          </button>
        </div>
      </ScrollReveal>
    </div>
  );
}
