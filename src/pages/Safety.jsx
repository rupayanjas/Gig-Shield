import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Card, Button } from '../components/ui';
import { getUser } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { Activity, MapPin, AlertTriangle } from 'lucide-react';
import { cn } from '../components/ui';

export default function Safety() {
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

  return (
    <div className="min-h-screen bg-brand-50 relative flex flex-col">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex-1 w-full flex flex-col gap-10">
        <div>
          <div className="inline-flex items-center px-3 py-1 bg-accent-light/50 text-[#8A5A44] text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
            Safety & Trust
          </div>
          <h1 className="text-5xl font-serif text-brand-900 mb-2">
            Safety Center
          </h1>
          <p className="text-brand-800 text-sm">
            Monitor zone risks, trust score, and active dynamic assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex flex-col bg-white p-6 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4 z-10">
              <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Trust Score</span>
            </div>
            <div className="flex items-end gap-2 mb-2 z-10">
              <span className="text-5xl font-serif text-brand-900">{user.trustScore}</span>
              <span className="text-lg text-brand-400 mb-1">/100</span>
            </div>
            <p className="text-sm font-medium text-green-600 z-10">Excellent Standing</p>
            <p className="text-xs text-brand-500 mt-4 z-10">Based on history and reliable platform {user.platform} data.</p>
          </Card>

          <Card className="flex flex-col md:col-span-2 bg-white p-6 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-6 z-10">
              <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">Zone Risk Analysis</span>
              <span className="px-2 py-1 bg-brand-100 text-brand-800 text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                <MapPin size={12} /> {user.scorecard.zoneName}
              </span>
            </div>
            <div className="flex items-center justify-between mb-4 z-10">
              <h3 className="font-serif text-2xl text-brand-900">Current Risk Level</h3>
              <span className={cn(
                  "font-bold rounded-md px-3 py-1 text-sm uppercase",
                  user.scorecard.riskLevel === 'HIGH' ? "bg-red-100 text-red-700" : "bg-brand-100 text-brand-800"
              )}>{user.scorecard.riskLevel}</span>
            </div>
            <div className="w-full bg-brand-50 h-3 rounded-full overflow-hidden mb-2 z-10">
               <div 
                 className={cn("h-full", user.scorecard.riskLevel === 'HIGH' ? "bg-red-500" : "bg-brand-500")}
                 style={{ width: `${user.scorecard.disruptionProb}%` }}
               ></div>
            </div>
            <p className="text-xs text-brand-500 z-10">{user.scorecard.disruptionProb}% probability of disruption in your zone.</p>
          </Card>
        </div>

        <Card className="p-0 overflow-hidden border-t-4 border-t-red-500 bg-white">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="text-red-500" size={24} />
              <h3 className="font-serif text-xl text-brand-900">Emergency Support</h3>
            </div>
            <p className="text-sm text-brand-600 mb-6 max-w-2xl">
              If you are facing a severe safety issue or accident while on duty in the {user.zone} area, access priority support immediately.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button variant="primary" className="bg-red-600 hover:bg-red-700 border-red-600 text-white shadow-md">
                SOS Contact
              </Button>
              <Button variant="outline" className="text-brand-800">
                Log Safety Incident
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
