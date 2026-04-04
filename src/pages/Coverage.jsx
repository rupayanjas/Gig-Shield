import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui';
import { ScrollReveal } from '../components/ScrollReveal';
import { MapPin, CheckCircle, ChevronDown } from 'lucide-react';
import DynamicPricingCalculator from '../components/DynamicPricingCalculator';



const faqs = [
  {
    q: 'Why do premiums shift seasonally?',
    a: 'Our algorithms calculate risk based on Indian monsoon data and other risk factors. Premium in a high-risk zone promotes may differ slightly whereas low-risk areas for example — for a low AQI concern, we can monitor the payout quality to set standards.',
  },
  {
    q: 'Can I move between tiers if I move?',
    a: 'Yes. If you relocate your primary gig operation to a different city, you can update your zone in the app. The new premium only takes effect starting the next Monday billing cycle.',
  },
  {
    q: "Is there a 'No-Claim' bonus?",
    a: 'Absolutely! After 12 consecutive weeks of active protection without a claim, your premium drops by 15% effectively putting you at the lowest end of your tier range regardless of seasonal shifts.',
  },
];

export default function Coverage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-brand-50 relative overflow-hidden">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-32 text-brand-900">

        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <ScrollReveal direction="right">
            <div className="inline-flex items-center px-3 py-1 bg-accent-light text-[#8A5A44] text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
              Tailored Income Protection
            </div>
            <h1 className="text-6xl lg:text-7xl font-serif leading-[1.05] mb-6">
              Flexible Protection{' '}
              <span className="italic">for your<br/>Hustle</span>
            </h1>
            <p className="text-brand-800 text-base mb-8 max-w-md leading-relaxed">
              Kizuna adapts to your geography and risk profile. We provide a policy that fits your environment directly, ensuring you're never overpaying or under-protected.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={200}>
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-premium">
              <img
                src="/female-gig-worker.jpg"
                alt="Gig worker on scooter"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/30 to-transparent"></div>
            </div>
          </ScrollReveal>
        </section>


        {/* Dynamic Pricing Calculator Section */}
        <section className="max-w-6xl mx-auto space-y-12">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif mb-2 text-brand-900">Calculate Your Dynamic Premium</h2>
              <p className="text-brand-500 font-serif text-xl italic mb-6">Don’t want to sign up yet? Estimate your weekly premium instantly.</p>
              <p className="text-brand-800 text-sm max-w-2xl mx-auto">
                Kizuna doesn't believe in flat rates. Your protection costs are as unique as your work history. 
                Use the tool below to see how your zone, trust score, and risk profile impact your weekly premium.
              </p>
            </div>
            <DynamicPricingCalculator />
          </ScrollReveal>
        </section>

        {/* FAQ: The Dynamic Shift */}
        <section className="max-w-3xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif mb-2">The Dynamic Shift</h2>
              <p className="text-brand-800 text-sm">How our premiums respond to your world.</p>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 80}>
                <div
                  className="bg-white border border-brand-200 rounded-2xl overflow-hidden"
                >
                  <button
                    className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 hover:bg-brand-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-medium text-brand-900 text-sm">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-brand-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-sm text-brand-700 leading-relaxed border-t border-brand-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
