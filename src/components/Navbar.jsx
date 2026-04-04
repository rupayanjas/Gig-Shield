import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { isAuthenticated, logout } from '../lib/auth';
import { Button } from './ui';
import { cn } from './ui';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = isAuthenticated();
  const isDashboard = location.pathname.includes('/dashboard');

  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="w-full px-6 py-6 absolute top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to={isAuth ? "/dashboard" : "/"} className="relative group inline-flex items-center justify-center py-2 pr-4">
          {/* Logo as background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity pointer-events-none -ml-4">
             <img src="/logo.png" alt="" className="h-16 w-auto object-contain blur-[1px]" />
          </div>
          {/* Text Foreground */}
          <span className="relative z-10 font-serif text-4xl md:text-[2.75rem] italic font-semibold tracking-tight text-brand-900 group-hover:text-brand-800 transition-colors">
            Kizuna
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-12 text-sm font-medium text-brand-800/80 uppercase tracking-wide">
          {isDashboard ? ( // Dashboard Navigation
            <>
              <Link to="/dashboard" className={cn("hover:text-brand-900 transition-colors", location.pathname === '/dashboard' && 'text-brand-900 border-b border-brand-900 pb-1')}>Dashboard</Link>
              <Link to="/dashboard/earnings" className={cn("hover:text-brand-900 transition-colors", location.pathname === '/dashboard/earnings' && 'text-brand-900 border-b border-brand-900 pb-1')}>Earnings</Link>
              <Link to="/dashboard/insurance" className={cn("hover:text-brand-900 transition-colors", location.pathname === '/dashboard/insurance' && 'text-brand-900 border-b border-brand-900 pb-1')}>Insurance</Link>
              <Link to="/dashboard/safety" className={cn("hover:text-brand-900 transition-colors", location.pathname === '/dashboard/safety' && 'text-brand-900 border-b border-brand-900 pb-1')}>Safety</Link>
            </>
          ) : ( // Public Navigation
            <>
              <Link to="/features" className={cn("hover:text-brand-900 transition-colors", location.pathname === '/features' && 'text-brand-900 border-b border-brand-900 pb-1')}>Features</Link>
              <Link to="/claims" className={cn("hover:text-brand-900 transition-colors", location.pathname === '/claims' && 'text-brand-900 border-b border-brand-900 pb-1')}>Claims</Link>
              <Link to="/coverage" className={cn("hover:text-brand-900 transition-colors", location.pathname === '/coverage' && 'text-brand-900 border-b border-brand-900 pb-1')}>Coverage</Link>
              {!isAuth && <Link to="/login" className="hover:text-brand-900 transition-colors">Login</Link>}
            </>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {isAuth ? (
            <>
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-brand-800 hover:bg-brand-100 rounded-full transition-colors relative"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                  <span className="absolute top-2 right-2 w-2 h-2 bg-brand-500 rounded-full border-2 border-brand-50"></span>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-brand-100 rounded-xl shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-brand-50">
                      <h4 className="text-sm font-bold text-brand-900">Notifications</h4>
                    </div>
                    <div className="p-4 text-sm text-brand-800">
                      <p className="font-medium">System Alert</p>
                      <p className="text-xs text-brand-500 mt-1">High traffic & rain expected in your active zone today.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 relative">
                <div className="relative hidden md:block">
                  <Button 
                    onClick={() => setShowAccount(!showAccount)}
                    variant="primary" 
                    size="sm" 
                    className="flex"
                  >
                    My Account
                  </Button>
                </div>
                
                {isDashboard && (
                  <div 
                    onClick={() => setShowAccount(!showAccount)}
                    className="w-10 h-10 rounded-full bg-accent-light text-brand-800 flex items-center justify-center font-serif text-lg cursor-pointer"
                  >
                    R
                  </div>
                )}

                {showAccount && (
                  <div className="absolute right-0 top-12 mt-2 w-48 bg-white border border-brand-100 rounded-xl shadow-lg py-2 z-50">
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
