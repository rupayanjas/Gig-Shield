import { cn } from './ui';
import { ShieldCheck, Zap, AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';

// --- Sub-components ---

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="font-serif text-2xl text-brand-900">{title}</h2>
    {subtitle && <p className="text-sm text-brand-500 mt-1">{subtitle}</p>}
  </div>
);

// Trust Score Ring
const TrustScoreRing = ({ score }) => {
  const clr =
    score >= 71 ? '#2e7d32' : score >= 40 ? '#f59e0b' : '#dc2626';
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
        <span className="text-2xl font-bold text-brand-900" style={{ color: clr }}>{score}</span>
        <span className="text-[10px] font-medium text-brand-500 uppercase tracking-widest">/ 100</span>
      </div>
    </div>
  );
};

// Severity badge
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

// Claim status icon + badge
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

export default function LiveDataPanel({ liveUser, triggers, claims, loading, error }) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-brand-100 bg-white p-8 flex items-center justify-center gap-3 text-brand-500">
        <div className="w-4 h-4 border-2 border-brand-300 border-t-brand-800 rounded-full animate-spin" />
        <span className="text-sm font-medium">Fetching live data…</span>
      </div>
    );
  }

  if (error || !liveUser) {
    return (
      <div className="rounded-3xl border border-red-100 bg-red-50 p-6 flex items-center gap-3 text-red-600">
        <AlertCircle size={18} />
        <p className="text-sm font-medium">{error || 'Your account was not found in the backend. Please ensure you are registered.'}</p>
      </div>
    );
  }

  const TRIGGER_ICONS = {
    rain: '🌧️',
    pollution: '🌫️',
    app_downtime: '⚠️',
    dark_store: '🏪',
    incentive_break: '💸',
  };

  return (
    <div className="space-y-8">
      {/* Header Label */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-900/5 rounded-full text-brand-700 text-[10px] font-bold uppercase tracking-widest">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        Live Backend Data
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ── Card 1: Trust Score ── */}
        <div className="bg-white rounded-2xl border border-brand-100 p-6 flex flex-col items-center text-center shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500 mb-4">Trust Score</span>
          <TrustScoreRing score={liveUser.trustScore} />
          <div className="mt-4 space-y-1">
            <p className="font-serif text-lg text-brand-900">{liveUser.city}</p>
            <p className="text-xs text-brand-500">Partner ID: <span className="font-medium text-brand-700">{liveUser.partnerId}</span></p>
          </div>
          <div className="mt-4 w-full bg-brand-50 rounded-xl p-3 text-left space-y-1 text-xs text-brand-700">
            <div className="flex justify-between"><span>Successful Days</span><span className="font-bold">{liveUser.successfulDays}</span></div>
            <div className="flex justify-between"><span>Cancellation Rate</span><span className="font-bold">{(liveUser.cancellationRate * 100).toFixed(0)}%</span></div>
            <div className="flex justify-between"><span>Claims Approved</span><span className="font-bold">{liveUser.claimsApproved}/{liveUser.claimsMade}</span></div>
          </div>
        </div>

        {/* ── Card 2: Active Triggers ── */}
        <div className="bg-white rounded-2xl border border-brand-100 p-6 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500 mb-4 block">Active Triggers</span>
          {triggers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-brand-400 gap-2">
              <ShieldCheck size={28} className="opacity-40" />
              <p className="text-xs">No active triggers right now</p>
            </div>
          ) : (
            <div className="space-y-3">
              {triggers.slice(0, 5).map(trigger => (
                <div key={trigger._id} className="flex items-start gap-3 p-3 rounded-xl bg-brand-50 border border-brand-100">
                  <span className="text-lg">{TRIGGER_ICONS[trigger.type] || '⚡'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-brand-900 capitalize">{trigger.type.replace('_', ' ')}</span>
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
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500 mb-4 block">My Claims</span>
          {claims.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-brand-400 gap-2">
              <Zap size={28} className="opacity-40" />
              <p className="text-xs">No claims on file yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {claims.map(claim => (
                <div key={claim._id} className="p-3 rounded-xl bg-brand-50 border border-brand-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <ClaimStatusBadge status={claim.status} />
                    {claim.status === 'approved' && (
                      <span className="text-xs font-bold text-green-700">+₹{claim.payoutAmount}</span>
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
