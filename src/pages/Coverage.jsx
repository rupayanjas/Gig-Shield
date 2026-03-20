import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui';
import { ScrollReveal } from '../components/ScrollReveal';
import { MapPin, CheckCircle, ChevronDown } from 'lucide-react';

const tiers = [
  {
    label: 'LOW RISK',
    badge: 'Tier 01',
    tagline: 'Rain & Low Demand',
    zone: 'Smaller cities, Medium Payout',
    price: 29,
    payoutCap: '₹1,500 Payout Cap',
    payoutNote: 'Maximum coverage for lower-risk zones',
    perk: 'Quick Processing',
    perkNote: 'Most claims under 60 minutes',
    highlight: false,
  },
  {
    label: 'MEDIUM RISK',
    badge: 'Tier 02 — Most Popular',
    tagline: "Bengaluru's moderate-risk Plan",
    zone: 'Metro, Mumbai, Delhi NCR',
    price: 45,
    payoutCap: '₹2,500 Payout Cap',
    payoutNote: 'Up to 25% income coverage',
    perk: 'Instant Add-ons',
    perkNote: 'Add city surge cover any Sunday midnight',
    highlight: true,
  },
  {
    label: 'HIGH RISK',
    badge: 'Tier 03',
    tagline: 'Unfavorable zones, high storms',
    zone: 'Storm cities, Sensitive Hubs',
    price: 75,
    payoutCap: '₹5,000 Payout Cap',
    payoutNote: 'Maximum coverage for high-risk storms',
    perk: 'Priority Support',
    perkNote: 'Dedicated agent available 24/7',
    highlight: false,
  },
];

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
              GigShield adapts to your geography and risk profile. We provide a policy that fits your environment directly, ensuring you're never overpaying or under-protected.
            </p>
            <Button to="/register" variant="primary" className="px-8 py-3 rounded-full font-medium">
              Get Started Free
            </Button>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={200}>
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-premium">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop"
                alt="Gig worker on scooter"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/30 to-transparent"></div>
            </div>
          </ScrollReveal>
        </section>

        {/* Pricing Tiers */}
        <section className="max-w-6xl mx-auto">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif mb-2">Choose your Shield Level</h2>
                <p className="text-brand-800 text-sm max-w-md">
                  Our risk tiers are calculated using Historical Incident data and localized weather patterns
                  to find the zone that matches your primary operating hub.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-500 bg-white border border-brand-200 px-4 py-2 rounded-full whitespace-nowrap">
                <MapPin size={12} /> Auto-detecting your zone...
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.label} direction="up" delay={i * 100}>
                <div
                  className={`relative rounded-3xl p-8 flex flex-col gap-5 h-full transition-all border ${
                    tier.highlight
                      ? 'bg-brand-900 text-brand-50 border-brand-900 shadow-2xl scale-[1.03]'
                      : 'bg-white text-brand-900 border-brand-200 shadow-sm hover:shadow-premium'
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute top-4 right-4 bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle size={10} /> Most Popular
                    </div>
                  )}
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${tier.highlight ? 'text-brand-300' : 'text-brand-400'}`}>
                      {tier.badge}
                    </p>
                    <h3 className={`font-serif text-2xl mb-1 ${tier.highlight ? 'text-white' : 'text-brand-900'}`}>
                      {tier.label.charAt(0) + tier.label.slice(1).toLowerCase().replace('risk', 'Risk')}
                    </h3>
                    <p className={`text-xs ${tier.highlight ? 'text-brand-300' : 'text-brand-500'}`}>{tier.tagline}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className={`font-serif text-5xl ${tier.highlight ? 'text-white' : 'text-brand-900'}`}>₹{tier.price}</span>
                    <span className={`text-sm ${tier.highlight ? 'text-brand-300' : 'text-brand-500'}`}>/week</span>
                  </div>

                  <div className={`text-xs space-y-3 flex-1 ${tier.highlight ? 'text-brand-200' : 'text-brand-600'}`}>
                    <div className="flex items-start gap-2">
                      <MapPin size={12} className="shrink-0 mt-0.5" />
                      <span><strong className={tier.highlight ? 'text-white' : 'text-brand-900'}>{tier.payoutCap}</strong><br />{tier.payoutNote}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={12} className="shrink-0 mt-0.5" />
                      <span><strong className={tier.highlight ? 'text-white' : 'text-brand-900'}>{tier.perk}</strong><br />{tier.perkNote}</span>
                    </div>
                  </div>

                  <Button
                    to="/register"
                    variant={tier.highlight ? 'accent' : 'outline'}
                    className={`w-full rounded-2xl mt-2 ${tier.highlight ? 'bg-white text-brand-900 hover:bg-brand-50' : 'border-brand-200'}`}
                  >
                    Select {tier.label.charAt(0) + tier.label.slice(1).toLowerCase().replace('risk', 'Risk')}
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Weekly Model + Zone Classification + Testimonial */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <ScrollReveal direction="right">
            <div className="space-y-12">
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center text-[#8A5A44] mb-4 text-lg font-serif">₹</div>
                <h3 className="font-serif text-2xl mb-3">Weekly Premium Model</h3>
                <p className="text-brand-800 text-sm leading-relaxed max-w-md">
                  Unlike traditional insurance with annual payments, GigShield operates on a weekly cycle. This aligns with your income flow, allowing you to pause, upgrade, or downgrade your protection every Sunday at midnight.
                </p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-800 mb-4 text-lg font-serif">#</div>
                <h3 className="font-serif text-2xl mb-3">Zone Classification</h3>
                <p className="text-brand-800 text-sm leading-relaxed max-w-md">
                  Zones aren't just about geography, they're about the environmental risk of your work. We analyze traffic density, weather dynamics, and seasonal data to classify regions into our three tiers.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={200}>
            <div className="bg-brand-900 text-brand-50 rounded-3xl p-10 h-full flex flex-col justify-between min-h-[300px]">
              <p className="font-serif text-2xl italic leading-relaxed text-white">
                "The flexibility to pay only for the risk I face in Mumbai during monsoon was a game changer for my delivery business."
              </p>
              <div className="flex items-center gap-3 mt-8">
                <div className="w-10 h-10 rounded-full bg-brand-700 text-white flex items-center justify-center font-serif text-lg">R</div>
                <div>
                  <p className="font-medium text-white text-sm">Rahul G.</p>
                  <p className="text-brand-400 text-xs">Swiggy Rider, Mumbai</p>
                </div>
              </div>
            </div>
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
