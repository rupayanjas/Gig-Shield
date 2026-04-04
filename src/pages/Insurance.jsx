import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Card, Button } from '../components/ui';
import { getUser } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useLiveData } from '../hooks/useLiveData';
import { getCoverageTier } from '../lib/liveHelpers';

export default function Insurance() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getUser();
    if (data) setUser(data);
    else navigate('/login');
  }, [navigate]);

  // Live data for trust score and derived coverage tier
  const { liveUser, loading } = useLiveData(user?.phone);

  if (!user) return null;

  // LIVE: derive coverage tier from real trust score
  const trustScore   = liveUser?.trustScore ?? user.trustScore;
  const coverageTier = getCoverageTier(trustScore);

  // LIVE: premium reason from backend user's city
  const city         = liveUser?.city ?? user.zone;
  const premiumNote  = `${city} — based on Trust Score ${trustScore}`;

  // HARDCODED: premium amount stays from localStorage profile (set at registration)
  const premiumAmount    = user.premium?.amount ?? 79;
  const premiumFrequency = user.premium?.frequency ?? 'week';

  return (
    <div className="min-h-screen bg-brand-50 relative flex flex-col">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-1 w-full flex flex-col gap-10">
        <div>
          <div className="inline-flex items-center px-3 py-1 bg-accent-light/50 text-[#8A5A44] text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
            Policy Details
          </div>
          <h1 className="text-5xl font-serif text-brand-900 mb-2">Insurance Hub</h1>
          <p className="text-brand-800 text-sm">Manage your active policies and view your coverage tier.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Plan — LIVE (coverage tier from trustScore) */}
          <Card className="flex flex-col h-full bg-white relative overflow-hidden group p-8">
            <div className="flex justify-between items-start mb-6 z-10">
              <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Current Plan</span>
              <span className="px-2 py-1 bg-[#FCE7DF] text-[#8A5A44] text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                <CheckCircle size={12} /> Active
              </span>
            </div>
            <h3 className="font-serif text-3xl text-brand-900 mb-4 z-10">
              {loading ? <span className="opacity-40">…</span> : `Coverage ${coverageTier.name}`}
            </h3>
            <ul className="space-y-3 z-10 mb-8 flex-1">
              <li className="flex items-center gap-2 text-sm text-brand-800">
                <Shield size={16} className="text-brand-500" />
                {loading ? '…' : `${coverageTier.hours} hours of monthly protection`}
              </li>
              <li className="flex items-center gap-2 text-sm text-brand-800">
                <Shield size={16} className="text-brand-500" />
                Downtime &amp; weather disruption coverage
              </li>
              <li className="flex items-center gap-2 text-sm text-brand-800">
                <Shield size={16} className="text-brand-500" />
                Automated payouts directly to wallet
              </li>
            </ul>
            <Button variant="primary" className="w-full z-10">Upgrade Plan</Button>
            <div className="absolute -right-10 -bottom-10 text-brand-100/50 -z-0">
              <Shield size={200} />
            </div>
          </Card>

          <div className="flex flex-col gap-6">
            {/* Premium Details — partially live (city + trust score in note) */}
            <Card className="bg-white p-6 flex flex-col justify-center h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Premium Details</span>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-serif text-brand-900">₹{premiumAmount}</span>
                <span className="text-sm text-brand-500 mb-1">/{premiumFrequency}</span>
              </div>
              {/* HARDCODED: next payment date — no billing API exists */}
              <p className="text-xs text-brand-500 mt-2">
                Next payment: <span className="font-bold text-brand-800">Mar 24, 2026</span>
              </p>
              <div className="mt-4 p-3 bg-brand-50 rounded-lg flex items-start gap-3 border border-brand-100">
                <AlertCircle size={16} className="text-brand-500 shrink-0 mt-0.5" />
                <p className="text-xs text-brand-800 leading-tight">
                  <span className="font-bold block mb-0.5">Premium Note</span>
                  {loading ? '…' : premiumNote}
                </p>
              </div>
            </Card>

            {/* File Claim — static CTA */}
            <Card className="bg-brand-900 text-brand-50 p-6 flex flex-col justify-center">
              <h4 className="font-serif text-xl mb-2 text-white">Need to file a claim?</h4>
              <p className="text-sm text-brand-300 mb-4">
                Most disruptions are detected automatically. If manual filing is needed, start here.
              </p>
              <Button variant="outline" className="border-brand-500 text-white hover:bg-brand-800 w-fit">
                File a Claim
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
