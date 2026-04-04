import { useState } from 'react';
import { cn } from './ui';
import { ShieldCheck, Zap, AlertCircle, Clock, CheckCircle, XCircle, RefreshCw, Sparkles } from 'lucide-react';
import { createTrigger } from '../lib/api';

// --- Sub-components ---

const TrustScoreRing = ({ score }) => {
  const clr = score >= 71 ? '#2e7d32' : score >= 40 ? '#f59e0b' : '#dc2626';
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center w-28 h-28">
      <svg width="112" height="112" className="-rotate-90">
        <circle cx="56" cy="56" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="56" cy="56" r={radius}
          fill="none"
          stroke={clr}
          strokeWidth="8"
          strokeDasharray={`${filled} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.7s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold" style={{ color: clr }}>{score}</span>
        <span className="text-[10px] font-medium text-brand-500 uppercase tracking-widest">/ 100</span>
      </div>
    </div>
  );
};

const SeverityBadge = ({ severity }) => {
  const colours = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    low: 'bg-green-100 text-green-700 border-green-200',
  };
  return (
    <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border', colours[severity] || 'bg-brand-100 text-brand-700 border-brand-200')}>
      {severity}
    </span>
  );
};

const ClaimStatusBadge = ({ status }) => {
  const config = {
    approved: { icon: CheckCircle, cls: 'text-green-600 bg-green-50 border-green-200', label: 'Approved' },
    pending: { icon: Clock, cls: 'text-amber-600 bg-amber-50 border-amber-200', label: 'Pending' },
    rejected: { icon: XCircle, cls: 'text-red-600 bg-red-50 border-red-200', label: 'Rejected' },
  };
  const c = config[status] || config.pending;
  const Icon = c.icon;
  return (
    <span className={cn('inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border', c.cls)}>
      <Icon size={10} /> {c.label}
    </span>
  );
};

// --- Main LiveDataPanel ---

const TRIGGER_TYPES = ['rain', 'pollution', 'app_downtime', 'dark_store', 'incentive_break'];
const SEVERITIES = ['low', 'medium', 'high'];
const TRIGGER_ICONS = {
  rain: '🌧️',
  pollution: '🌫️',
  app_downtime: '⚠️',
  dark_store: '🏪',
  incentive_break: '💸',
};

export default function LiveDataPanel({ liveUser, triggers, claims, loading, error, onRefresh }) {
  const [simulating, setSimulating] = useState(false);
  const [simMessage, setSimMessage] = useState(null);

  const handleSimulate = async () => {
    if (!liveUser) return;
    setSimulating(true);
    setSimMessage(null);

    const randomType = TRIGGER_TYPES[Math.floor(Math.random() * TRIGGER_TYPES.length)];
    const randomSeverity = SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)];
    const now = new Date();
    const endTime = new Date(now.getTime() + 4 * 60 * 60 * 1000); // 4 hours from now

    try {
      const result = await createTrigger({
        type: randomType,
        city: liveUser.city,
        userId: liveUser._id,
        severity: randomSeverity,
        startTime: now.toISOString(),
        endTime: endTime.toISOString(),
      });

      if (result.success) {
        setSimMessage({ type: 'success', text: result.message });
        // Refresh claims and triggers after 800ms to let DB settle
        setTimeout(async () => {
          if (onRefresh) await onRefresh();
          setSimulating(false);
        }, 800);
      } else {
        setSimMessage({ type: 'error', text: result.message || 'Trigger creation failed.' });
        setSimulating(false);
      }
    } catch (err) {
      setSimMessage({ type: 'error', text: 'Failed to simulate event. Check your connection.' });
      setSimulating(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Skeleton header row */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-36 bg-brand-100 rounded-full animate-pulse" />
          <div className="h-9 w-36 bg-brand-100 rounded-xl animate-pulse" />
        </div>
        {/* Skeleton cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trust Score skeleton */}
          <div className="bg-white rounded-2xl border border-brand-100 p-6 flex flex-col items-center shadow-sm space-y-4">
            <div className="h-3 w-20 bg-brand-100 rounded animate-pulse" />
            <div className="w-28 h-28 rounded-full bg-brand-100 animate-pulse" />
            <div className="h-4 w-24 bg-brand-100 rounded animate-pulse" />
            <div className="h-3 w-32 bg-brand-100 rounded animate-pulse" />
            <div className="w-full space-y-2 mt-2">
              {[1,2,3].map(i => <div key={i} className="h-3 w-full bg-brand-100 rounded animate-pulse" />)}
            </div>
          </div>
          {/* Triggers skeleton */}
          <div className="bg-white rounded-2xl border border-brand-100 p-6 shadow-sm space-y-3">
            <div className="h-3 w-28 bg-brand-100 rounded animate-pulse" />
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-brand-50 border border-brand-100">
                <div className="w-8 h-8 rounded-full bg-brand-100 animate-pulse shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-3/4 bg-brand-100 rounded animate-pulse" />
                  <div className="h-2 w-1/2 bg-brand-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
          {/* Claims skeleton */}
          <div className="bg-white rounded-2xl border border-brand-100 p-6 shadow-sm space-y-3">
            <div className="h-3 w-24 bg-brand-100 rounded animate-pulse" />
            {[1,2,3].map(i => (
              <div key={i} className="p-3 rounded-xl bg-brand-50 border border-brand-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-20 bg-brand-100 rounded-full animate-pulse" />
                  <div className="h-4 w-12 bg-brand-100 rounded animate-pulse" />
                </div>
                <div className="h-2 w-32 bg-brand-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-100 bg-red-50 p-6 flex items-center gap-3 text-red-600">
        <AlertCircle size={18} />
        <p className="text-sm font-medium">{error}</p>
      </div>
    );
  }

  // Not in backend yet — non-blocking empty state with Simulate button disabled
  if (!liveUser) {
    return (
      <div className="rounded-3xl border border-brand-100 bg-white p-6 flex items-center gap-3 text-brand-500">
        <AlertCircle size={18} className="opacity-40" />
        <p className="text-sm font-medium">Account not found in backend. Register to see live data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-900/5 rounded-full text-brand-700 text-[10px] font-bold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Live Backend Data
        </div>

        {/* Simulate Event Button */}
        <button
          onClick={handleSimulate}
          disabled={simulating}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border',
            simulating
              ? 'bg-brand-100 text-brand-400 border-brand-100 cursor-not-allowed'
              : 'bg-brand-900 text-white border-brand-900 hover:bg-brand-800 shadow-sm hover:shadow-md active:scale-95'
          )}
        >
          {simulating ? (
            <><RefreshCw size={14} className="animate-spin" /> Simulating…</>
          ) : (
            <><Sparkles size={14} /> Simulate Event</>
          )}
        </button>
      </div>

      {/* Simulation feedback */}
      {simMessage && (
        <div className={cn(
          'rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2 border',
          simMessage.type === 'success'
            ? 'bg-green-50 text-green-700 border-green-200'
            : 'bg-red-50 text-red-700 border-red-200'
        )}>
          {simMessage.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {simMessage.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ── Card 1: Trust Score ── */}
        <div className="bg-white rounded-2xl border border-brand-100 p-6 flex flex-col items-center text-center shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500 mb-4">Trust Score</span>
          <TrustScoreRing score={liveUser.trustScore} />
          <div className="mt-4 space-y-1">
            <p className="font-serif text-lg text-brand-900">{liveUser.city}</p>
            <p className="text-xs text-brand-500">Partner ID: <span className="font-medium text-brand-700">{liveUser.partnerId}</span></p>
          </div>
          <div className="mt-4 w-full bg-brand-50 rounded-xl p-3 text-left space-y-1.5 text-xs text-brand-700">
            <div className="flex justify-between"><span>Successful Days</span><span className="font-bold">{liveUser.successfulDays}</span></div>
            <div className="flex justify-between"><span>Cancellation Rate</span><span className="font-bold">{(liveUser.cancellationRate * 100).toFixed(0)}%</span></div>
            <div className="flex justify-between"><span>Claims Approved</span><span className="font-bold">{liveUser.claimsApproved}/{liveUser.claimsMade}</span></div>
          </div>
        </div>

        {/* ── Card 2: Active Triggers ── */}
        <div className="bg-white rounded-2xl border border-brand-100 p-6 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500 mb-4 block">Active Triggers ({triggers.length})</span>
          {triggers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-brand-400 gap-2">
              <ShieldCheck size={28} className="opacity-40" />
              <p className="text-xs">No active triggers right now</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {triggers.map(trigger => (
                <div key={trigger._id} className="flex items-start gap-3 p-3 rounded-xl bg-brand-50 border border-brand-100">
                  <span className="text-lg">{TRIGGER_ICONS[trigger.type] || '⚡'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-brand-900 capitalize">{trigger.type.replace(/_/g, ' ')}</span>
                      <SeverityBadge severity={trigger.severity} />
                    </div>
                    <p className="text-[11px] text-brand-500">{trigger.city}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Card 3: Claims ── */}
        <div className="bg-white rounded-2xl border border-brand-100 p-6 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500 mb-4 block">My Claims ({claims.length})</span>
          {claims.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-brand-400 gap-2">
              <Zap size={28} className="opacity-40" />
              <p className="text-xs">No claims yet — simulate an event!</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {claims.map(claim => (
                <div key={claim._id} className="p-3 rounded-xl bg-brand-50 border border-brand-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <ClaimStatusBadge status={claim.status} />
                    {claim.payoutAmount > 0 && (
                      <span className={cn(
                        'text-xs font-bold',
                        claim.status === 'approved' ? 'text-green-700' : 'text-brand-400 line-through'
                      )}>
                        ₹{claim.payoutAmount}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-brand-500">
                    {new Date(claim.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
