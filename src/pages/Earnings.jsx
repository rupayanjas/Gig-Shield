import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Card } from '../components/ui';
import { getUser } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

export default function Earnings() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getUser();
    if (data) {
      setUser(data);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return null;

  const weeklyEarnings = [
    { week: 'Mar 11 - Mar 17', amount: 4850, shielded: 0 },
    { week: 'Mar 4 - Mar 10', amount: 5200, shielded: 0 },
    { week: 'Feb 26 - Mar 3', amount: 4100, shielded: 450 },
    { week: 'Feb 19 - Feb 25', amount: 5050, shielded: 0 },
  ];

  return (
    <div className="min-h-screen bg-brand-50 relative flex flex-col">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-1 w-full flex flex-col gap-10">
        <div>
          <div className="inline-flex items-center px-3 py-1 bg-accent-light/50 text-[#8A5A44] text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
            Financial Overview
          </div>
          <h1 className="text-5xl font-serif text-brand-900 mb-2">
            Earnings
          </h1>
          <p className="text-brand-800 text-sm">
            Track your income and see how Kizuna protects your baseline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex flex-col h-full bg-white relative overflow-hidden group p-6">
            <div className="flex justify-between items-start mb-6 z-10">
              <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">This Week</span>
              <DollarSign size={16} className="text-brand-400" />
            </div>
            <h3 className="font-serif text-4xl text-brand-900 mb-2 z-10">₹3,240</h3>
            <p className="text-sm font-medium text-brand-500 z-10">Projected: ₹5,100</p>
          </Card>

          <Card className="flex flex-col h-full bg-brand-900 text-brand-50 relative overflow-hidden group p-6">
            <div className="flex justify-between items-start mb-6 z-10">
              <span className="text-[10px] font-bold text-brand-300 uppercase tracking-widest">Shielded Income</span>
              <TrendingUp size={16} className="text-accent-light" />
            </div>
            <h3 className="font-serif text-4xl text-white mb-2 z-10">₹450</h3>
            <p className="text-sm font-medium text-brand-300 z-10">Saved from disruption this month</p>
          </Card>

          <Card className="flex flex-col h-full bg-white relative overflow-hidden group p-6">
            <div className="flex justify-between items-start mb-6 z-10">
              <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Average Daily</span>
              <Calendar size={16} className="text-brand-400" />
            </div>
            <h3 className="font-serif text-4xl text-brand-900 mb-2 z-10">₹{user.baselineIncome}</h3>
            <p className="text-sm font-medium text-brand-500 z-10">Your personal baseline</p>
          </Card>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="p-6 border-b border-brand-100 flex justify-between items-center bg-white">
            <h3 className="font-serif text-xl text-brand-900">Recent Weekly Earnings</h3>
          </div>
          <div className="divide-y divide-brand-100 bg-white">
            {weeklyEarnings.map((week, i) => (
              <div key={i} className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-brand-900">{week.week}</h4>
                  {week.shielded > 0 && (
                    <p className="text-xs text-brand-500 mt-1">Includes ₹{week.shielded} Kizuna payout</p>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-lg font-serif text-brand-900 font-bold">₹{week.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
