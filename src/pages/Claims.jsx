import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, Button } from '../components/ui';
import { CloudRain, AlertTriangle, Building2, WifiOff, Lock } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

export default function Claims() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F9F8F6]">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-32">
        
        {/* Intro */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="right">
            <div>
              <h1 className="text-5xl md:text-6xl font-serif text-brand-900 mb-6 leading-tight">
                Claims <span className="italic text-brand-800">without</span> claims
              </h1>
              <p className="text-brand-800 text-lg mb-8 max-w-md">
                GigShield detects disruptions automatically and sends payouts instantly. No forms, no calls, no stress.
              </p>
              <p className="text-sm text-brand-500 italic mb-5">
                "Powered by real-time weather, platform, and system data"
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-brand-800 font-medium">
                  <span className="w-5 h-5 rounded-full bg-brand-900 text-white flex items-center justify-center text-[10px] shrink-0">✓</span>
                  No paperwork
                </li>
                <li className="flex items-center gap-3 text-brand-800 font-medium">
                  <span className="w-5 h-5 rounded-full bg-brand-900 text-white flex items-center justify-center text-[10px] shrink-0">✓</span>
                  No waiting
                </li>
                <li className="flex items-center gap-3 text-brand-800 font-medium">
                  <span className="w-5 h-5 rounded-full bg-brand-900 text-white flex items-center justify-center text-[10px] shrink-0">✓</span>
                  No manual claims
                </li>
              </ul>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="left" delay={200} className="w-full">
            <div className="relative justify-self-center lg:justify-self-end w-full max-w-md aspect-square bg-[#FDEEDB] rounded-3xl overflow-hidden flex items-center justify-center border border-brand-200 shadow-premium group">
               <img 
                 src="/claims-hand.png" 
                 alt="Using GigShield on phone" 
                 className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-brand-900/5 to-transparent pointer-events-none mix-blend-multiply"></div>
            </div>
          </ScrollReveal>
        </section>

        {/* Autonomous Intelligence */}
        <section>
          <ScrollReveal direction="up">
            <div className="border-b border-brand-900 inline-block pb-2 mb-12">
              <h2 className="text-3xl font-serif text-brand-900">Autonomous Intelligence</h2>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ScrollReveal direction="up" delay={100}>
              <div>
                <span className="text-6xl font-serif text-brand-200/50 block mb-4">01</span>
                <h3 className="text-xl font-serif text-brand-900 mb-3 hover:text-brand-800 transition-colors">Disruption Detected</h3>
                <p className="text-sm text-brand-800 leading-relaxed max-w-sm">We monitor weather, platform activity, and system outages in real time. Our sensors never sleep, ensuring no event goes unnoticed.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
              <div>
                <span className="text-6xl font-serif text-brand-200/50 block mb-4">02</span>
                <h3 className="text-xl font-serif text-brand-900 mb-3 hover:text-brand-800 transition-colors">Eligibility Verified</h3>
                <p className="text-sm text-brand-800 leading-relaxed max-w-sm">We check your activity, location, and coverage automatically. No manual evidence or receipts required from your side.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={300}>
              <div>
                <span className="text-6xl font-serif text-brand-200/50 block mb-4">03</span>
                <h3 className="text-xl font-serif text-brand-900 mb-3 hover:text-brand-800 transition-colors">Instant Payout</h3>
                <p className="text-sm text-brand-800 leading-relaxed max-w-sm">If conditions match, your payout is processed and sent to your UPI within 2 hours. Funds arrive before you even ask for them.</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Triggers */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <ScrollReveal direction="right">
            <div className="sticky top-32">
              <h2 className="text-4xl md:text-5xl font-serif text-brand-900 leading-tight mb-6">
                What triggers <span className="italic text-brand-800">The Shield?</span>
              </h2>
              <p className="text-brand-800 text-lg mb-8 max-w-md">
                We cover the invisible gaps in your workday. From nature's unpredictability to digital infrastructure failures, GigShield acts as your editorial-first human shield.
              </p>
              <Card className="bg-white border text-brand-800 text-sm italic font-serif">
                <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-brand-500 not-italic block mb-2 flex items-center gap-2"><Lock size={12}/> Coverage Policy</span>
                "GigShield reserves the right to automatically initiate claims based on verified third-party data feeds, ensuring absolute neutrality and speed."
              </Card>

              {/* Added CTA Video block to cover whitespace */}
              <a 
                href="https://youtu.be/FRrFncToz3k?si=fH_RbMqJAk66OlUh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative block rounded-3xl overflow-hidden aspect-video group cursor-pointer border border-brand-200 shadow-sm mt-12 bg-[#F9F6F0] hover:shadow-premium transition-all flex flex-col items-center justify-center p-6"
              >
                <div className="absolute inset-0 bg-brand-900/5 mix-blend-multiply transition-colors group-hover:bg-brand-900/10 z-10 pointer-events-none"></div>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-40 h-40 sm:w-48 sm:h-48 object-contain z-20 group-hover:scale-105 transition-transform drop-shadow-md text-brand-800 opacity-95">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.498 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.5 12 20.5 12 20.5s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.498-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFF" />
                </svg>
                <div className="mt-4 z-20">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#5A4A42] bg-white px-5 py-2 rounded-full shadow-sm border border-[#EBE3D5]">Watch Explainer</span>
                </div>
              </a>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            <ScrollReveal direction="left" delay={100}>
              <Card className="flex gap-6 items-start hover:border-brand-200 hover:shadow-premium transition-all">
                 <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-800 shrink-0">
                   <CloudRain size={24} />
                 </div>
                 <div>
                   <h3 className="font-bold text-brand-900 mb-1">Extreme weather</h3>
                   <p className="text-sm text-brand-800 leading-relaxed">Heavy rain, floods, or severe pollution alerts (AQI 400+).</p>
                 </div>
              </Card>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={200}>
              <Card className="flex gap-6 items-start hover:border-brand-200 hover:shadow-premium transition-all">
                 <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-800 shrink-0">
                   <AlertTriangle size={24} />
                 </div>
                 <div>
                   <h3 className="font-bold text-brand-900 mb-1">Government restrictions</h3>
                   <p className="text-sm text-brand-800 leading-relaxed">Sudden curfews, GRAP implementation, or mobility bans.</p>
                 </div>
              </Card>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={300}>
              <Card className="flex gap-6 items-start hover:border-brand-200 hover:shadow-premium transition-all">
                 <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-800 shrink-0">
                   <Building2 size={24} />
                 </div>
                 <div>
                   <h3 className="font-bold text-brand-900 mb-1">Dark store downtime</h3>
                   <p className="text-sm text-brand-800 leading-relaxed">Inventory system failures or physical hub closures.</p>
                 </div>
              </Card>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={400}>
              <Card className="flex gap-6 items-start hover:border-brand-200 hover:shadow-premium transition-all">
                 <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-800 shrink-0">
                   <WifiOff size={24} />
                 </div>
                 <div>
                   <h3 className="font-bold text-brand-900 mb-1">App or UPI outages</h3>
                   <p className="text-sm text-brand-800 leading-relaxed">Platform-wide technical failures preventing work completion.</p>
                 </div>
              </Card>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={500}>
              <Card className="flex gap-6 items-start hover:border-brand-200 hover:shadow-premium transition-all">
                 <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-800 shrink-0">
                   <Lock size={24} />
                 </div>
                 <div>
                   <h3 className="font-bold text-brand-900 mb-1">Account freeze</h3>
                   <p className="text-sm text-brand-800 leading-relaxed">Verified cases of temporary account blocking without cause.</p>
                 </div>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
         <ScrollReveal direction="up">
          <section className="bg-[url('https://images.unsplash.com/photo-1555529902-5261145633bf?auto=format&fit=crop&q=80')] bg-cover bg-center rounded-[3rem] overflow-hidden relative group">
            <div className="absolute inset-0 bg-brand-900/90 group-hover:bg-brand-900/80 transition-colors"></div>
            <div className="relative z-10 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-serif text-brand-50 mb-6">
                  Focus on your hustle, we'll handle the <span className="italic">rest.</span>
                </h2>
                <p className="text-brand-200 text-lg">
                  Join 50,000+ gig workers who never worry about downtime again.
                </p>
              </div>
              <Button className="bg-brand-50 text-brand-900 hover:bg-white border-none py-4 px-8 font-bold rounded-full whitespace-nowrap">
                Upgrade Coverage
              </Button>
            </div>
          </section>
        </ScrollReveal>

      </main>

      <Footer />
    </div>
  );
}
