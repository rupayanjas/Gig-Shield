import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button, Card } from '../components/ui';
import { ScrollReveal } from '../components/ScrollReveal';
import { ShieldCheck, BarChart3, Zap, Wallet, Activity } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-brand-50 to-[#F2ECE4]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <ScrollReveal direction="right" className="z-10">
          <div className="inline-flex items-center px-3 py-1 bg-accent-light/50 text-brand-800 text-xs font-bold uppercase tracking-widest rounded-full mb-6 relative">
            The Human Shield
            <span className="absolute -left-1 w-2 h-2 rounded-full bg-brand-500 blur-sm"></span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif text-brand-900 leading-[1.1] mb-6">
            Income Protection <span className="italic">Built</span> for the Gig Economy
          </h1>
          
          <div className="space-y-6 mb-10">
            {[
              "Protects your income from weather disruptions",
              "Covers platform downtime and zone closures",
              "Ensures consistent earnings even when you can’t work"
            ].map((bullet, i) => (
              <div key={i} className="flex items-center gap-4 text-brand-900">
                <div className="w-6 h-6 rounded-full bg-[#4A362B] flex items-center justify-center text-white shrink-0 shadow-sm border border-brand-800">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="font-medium text-[15px]">{bullet}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Hero Image / Mock App Layout */}
        <ScrollReveal direction="left" delay={200} className="relative mt-12 lg:mt-0 z-10 flex justify-center">
          <div className="absolute inset-0 bg-accent-light rounded-[3rem] rotate-3 scale-105 -z-10 blur-xl opacity-60"></div>
          <div className="absolute inset-0 bg-[#E0D5C1] rounded-[3rem] -rotate-3 scale-105 -z-10"></div>
          
          {/* Main Card */}
          <div className="bg-brand-900 rounded-[2.5rem] p-0 shadow-2xl overflow-hidden relative w-full max-w-sm aspect-[3/4] group border-[8px] border-[#E0D5C1]/30">
             {/* The new artwork inserted here */}
             <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" alt="Gig worker with scooter" className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
             
             {/* Theme Overlay to slightly blend the green with our earthy brand (optional, but requested to 'match theme') */}
             <div className="absolute inset-0 bg-brand-900/10 mix-blend-color"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent"></div>
             
             <div className="absolute bottom-6 left-6 right-6">
               <Card className="bg-brand-50/95 backdrop-blur-sm p-5 pb-6">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-brand-800 rounded-full flex items-center justify-center text-brand-50">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-brand-500">Active Protection</p>
                      <h4 className="font-serif font-medium text-lg text-brand-900">Secure Shift Guaranteed</h4>
                    </div>
                 </div>
                 {/* Progress bar */}
                 <div className="h-2 w-full bg-brand-200 rounded-full overflow-hidden flex">
                    <div className="h-full bg-brand-800 w-[65%]"></div>
                    <div className="h-full bg-accent w-[35%] opacity-50"></div>
                 </div>
               </Card>
             </div>
          </div>
        </ScrollReveal>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <ScrollReveal direction="up" className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-900 leading-tight mb-4">
            How it<br/><span className="italic text-brand-800">Works</span>
          </h2>
          <p className="text-brand-800 max-w-sm">
            We've reimagined insurance for the way you actually work. Modern, transparent, and empathetic.
          </p>
          <span className="inline-flex items-center font-bold text-sm text-brand-900 uppercase tracking-widest mt-6 border-b-2 border-brand-900 pb-1">
            Learn about our algorithm <span className="ml-2">→</span>
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal direction="up" delay={100}>
            <Card className="border border-brand-100 hover:shadow-premium transition-shadow group h-full">
              <div className="w-10 h-10 bg-brand-100 text-brand-800 rounded-xl flex items-center justify-center mb-6 py-2 px-2 group-hover:bg-brand-800 group-hover:text-brand-50 transition-colors">
                <BarChart3 size={20} />
              </div>
              <h3 className="text-xl font-serif text-brand-900 mb-3">Sync Your Platforms</h3>
              <p className="text-brand-800 text-sm leading-relaxed">
                Securely connect your gig apps. We analyze your historical data to create a custom income baseline unique to your habits.
              </p>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <Card className="border border-brand-100 hover:shadow-premium transition-shadow group h-full">
              <div className="w-10 h-10 bg-brand-100 text-brand-800 rounded-xl flex items-center justify-center mb-6 py-2 px-2 group-hover:bg-brand-800 group-hover:text-brand-50 transition-colors">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-xl font-serif text-brand-900 mb-3">Set Your Shield</h3>
              <p className="text-brand-800 text-sm leading-relaxed">
                Define which shifts or zones you want protected. We automatically monitor for weather alerts, road closures, or platform downtime.
              </p>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <Card className="border border-brand-100 hover:shadow-premium transition-shadow group h-full">
              <div className="w-10 h-10 bg-brand-100 text-brand-800 rounded-xl flex items-center justify-center mb-6 py-2 px-2 group-hover:bg-brand-800 group-hover:text-brand-50 transition-colors">
                <Activity size={20} />
              </div>
              <h3 className="text-xl font-serif text-brand-900 mb-3">Smart Claim Detection</h3>
              <p className="text-brand-800 text-sm leading-relaxed">
                We automatically detect disruptions using real-time data from weather, platform activity, and system signals.
              </p>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <Card className="border border-brand-100 hover:shadow-premium transition-shadow group h-full">
              <div className="w-10 h-10 bg-brand-100 text-brand-800 rounded-xl flex items-center justify-center mb-6 py-2 px-2 group-hover:bg-brand-800 group-hover:text-brand-50 transition-colors">
                <Zap size={20} />
              </div>
              <h3 className="text-xl font-serif text-brand-900 mb-3">Instant Reimbursement</h3>
              <p className="text-brand-800 text-sm leading-relaxed">
                No paperwork. If conditions meet your policy criteria, funds are deposited into your account before your shift would have even ended.
              </p>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <ScrollReveal direction="up">
          <div className="max-w-5xl mx-auto bg-brand-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-700/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            
            <h2 className="text-4xl md:text-5xl font-serif text-brand-50 mb-6 relative z-10">
              Ready to shield your hard work?
            </h2>
            <p className="text-brand-200 mb-10 max-w-xl mx-auto text-lg relative z-10">
              Join 15,000+ gig professionals who have secured their income against the unpredictable.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Button to="/login" className="bg-brand-50 text-brand-900 hover:bg-white border-none py-4 px-8 font-bold">
                Start Free Trial
              </Button>
              <Button to="/coverage" variant="outline" className="text-brand-50 border-brand-200/30 hover:bg-brand-700 py-4 px-8">
                Compare Plans
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
}
