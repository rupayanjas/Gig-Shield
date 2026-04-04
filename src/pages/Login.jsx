import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../lib/auth';
import { Button, Card } from '../components/ui';
import { Eye, Smartphone } from 'lucide-react';
import Navbar from '../components/Navbar';
import { ScrollReveal } from '../components/ScrollReveal';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (phone) {
      // Mock login always succeeds in demo if phone is provided
      login(phone, 'Blinkit');
      navigate('/dashboard');
    }
  };

  const handleUpiLogin = () => {
    // Quick demo login
    login('9876543210', 'Blinkit');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col pt-24 bg-brand-50 relative overflow-hidden">
      <Navbar />
      
      {/* Decorative gradient blur in background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-light rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 z-10 w-full">
        
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
          <Card className="w-full shadow-soft scale-100 relative z-20">
            <form onSubmit={handleLogin} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-brand-800 uppercase tracking-wider block">
                  Phone Number or Email
                </label>
                <input
                  type="text"
                  placeholder="Enter details"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-brand-50 border-none rounded-xl px-4 py-3.5 text-brand-900 placeholder:text-brand-400 focus:ring-2 focus:ring-brand-800 focus:outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-brand-800 uppercase tracking-wider block">
                    Password
                  </label>
                  <a href="#" className="text-sm font-medium text-brand-500 hover:text-brand-800 border-b border-transparent hover:border-brand-800 transition-all">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-brand-50 border-none rounded-xl px-4 py-3.5 text-brand-900 placeholder:text-brand-400 focus:ring-2 focus:ring-brand-800 focus:outline-none transition-all tracking-widest"
                    required
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-800 transition-colors">
                    <Eye size={20} />
                  </button>
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full py-4 text-base rounded-2xl">
                Log In
              </Button>

              <div className="flex items-center justify-center space-x-4 py-2">
                <div className="h-px bg-brand-200 flex-1"></div>
                <span className="text-xs font-medium text-brand-400 uppercase tracking-wider">OR</span>
                <div className="h-px bg-brand-200 flex-1"></div>
              </div>

              <Button 
                type="button" 
                variant="accent" 
                className="w-full py-4 text-brand-900 rounded-2xl font-semibold border border-brand-200/50"
                onClick={handleUpiLogin}
              >
                <Smartphone className="mr-2" size={20} />
                Login with UPI
              </Button>

              <p className="text-center text-sm text-brand-800 pt-4">
                Don't have an account? <Link to="/register" className="font-bold text-brand-900 hover:underline">Secure your income now</Link>
              </p>

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
