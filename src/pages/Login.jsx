import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../lib/auth';
import { Button, Card } from '../components/ui';
import { Smartphone, ShieldCheck, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { ScrollReveal } from '../components/ScrollReveal';

const Login = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    setError('');
    
    // In a real app, we'd trigger OTP service here
    // For demo, we just check if user exists in our local database
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // We still use our login helper to check existence (it doesn't actually check password for now)
      const mockSuccess = login(phone, ''); 
      if (mockSuccess) {
        setStep(2);
      } else {
        setError('User not found. Please register to create an account.');
      }
    }, 800);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError('');
    
    if (otp.length === 6) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        // OTP verified (demo accepts any 6 digits)
        navigate('/dashboard');
      }, 1000);
    }
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex flex-col pt-24 bg-brand-50 relative overflow-hidden">
      <Navbar />
      
      {/* Decorative gradient blur in background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-light rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 z-10 w-full mb-10">
        
        <ScrollReveal direction="down" className="w-full relative z-10 flex flex-col items-center">
          <div className="text-center mb-10 w-full">
            <h1 className="text-5xl md:text-6xl font-serif text-brand-900 mb-4 tracking-tight pb-1">
              Welcome back.
            </h1>
            <p className="text-brand-800 text-lg">
              Your protection continues here. Access your shield.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200} className="w-full max-w-[440px]">
          <Card className="w-full shadow-soft scale-100 relative z-20 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-900/10">
              <div 
                className="h-full bg-brand-900 transition-all duration-500" 
                style={{ width: step === 1 ? '50%' : '100%' }}
              ></div>
            </div>

            <form onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp} className="space-y-6 pt-2">
              
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-xs p-3 rounded-xl animate-in fade-in slide-in-from-top-1">
                  {error}
                </div>
              )}

              {step === 1 ? (
                /* STEP 1: Phone */
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-800 uppercase tracking-wider block">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400" size={18} />
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          if (val.length <= 10) setPhone(val);
                        }}
                        className="w-full bg-brand-50 border-none rounded-xl pl-12 pr-4 py-3.5 text-brand-900 placeholder:text-brand-400 focus:ring-2 focus:ring-brand-800 focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full py-4 text-base rounded-2xl flex items-center justify-center gap-2"
                    disabled={phone.length !== 10 || loading}
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : 'Send OTP'}
                  </Button>
                </div>
              ) : (
                /* STEP 2: OTP */
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-brand-800 uppercase tracking-wider block">
                        One-Time Password
                      </label>
                      <button 
                        type="button" 
                        onClick={() => setStep(1)}
                        className="text-[10px] font-bold text-brand-400 hover:text-brand-900 uppercase underline"
                      >
                        Change Number
                      </button>
                    </div>
                    <div className="relative">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400" size={18} />
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          if (val.length <= 6) setOtp(val);
                        }}
                        className="w-full bg-brand-50 border-none rounded-xl pl-12 pr-4 py-3.5 text-brand-900 placeholder:text-brand-400 focus:ring-2 focus:ring-brand-800 focus:outline-none transition-all tracking-[0.5em] font-mono"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full py-4 text-base rounded-2xl flex items-center justify-center gap-2"
                    disabled={otp.length !== 6 || loading}
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : 'Verify & Login'}
                  </Button>

                  <p className="text-center text-xs text-brand-400">
                    Didn't receive code? <button type="button" className="text-brand-800 font-bold hover:underline">Resend OTP</button>
                  </p>
                </div>
              )}

              <div className="flex items-center justify-center space-x-4 py-2 opacity-50">
                <div className="h-px bg-brand-200 flex-1"></div>
                <span className="text-[10px] font-medium text-brand-400 uppercase tracking-widest">or</span>
                <div className="h-px bg-brand-200 flex-1"></div>
              </div>

              <Button 
                type="button" 
                variant="accent" 
                className="w-full py-4 text-brand-900 rounded-2xl font-semibold border border-brand-200/50"
                onClick={handleNavigateToRegister}
              >
                Create New Account
              </Button>

            </form>
          </Card>
        </ScrollReveal>

      </main>

      <footer className="w-full text-center py-10 mt-auto opacity-80">
        <div className="flex justify-center flex-wrap gap-8 text-brand-800 text-sm max-w-4xl mx-auto border-t border-brand-200 pt-8">
            <div className="text-left">
              <span className="font-serif italic font-medium text-lg leading-none">Kizuna</span>
              <p className="mt-2 text-xs opacity-70">© 2024 Kizuna. Protective Editorial.<br/>Professional income protection for the<br/>modern workforce.</p>
            </div>
            {/* Dummy footer links matching image bottom */}
            <div className="flex space-x-12 ml-auto text-xs">
              <div className="space-y-2 text-left">
                <h4 className="font-semibold text-brand-900 uppercase tracking-wide">Product</h4>
                <p>About</p>
                <p>Contact</p>
              </div>
              <div className="space-y-2 text-left">
                <h4 className="font-semibold text-brand-900 uppercase tracking-wide">Support</h4>
                <p>Claims Support</p>
                <p>Terms of Service</p>
              </div>
              <div className="space-y-2 text-left">
                <h4 className="font-semibold text-brand-900 uppercase tracking-wide">Legal</h4>
                <p>Privacy Policy</p>
              </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
