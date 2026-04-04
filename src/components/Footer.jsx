import { Link } from 'react-router-dom';

const TopLink = ({ to, children, className }) => (
  <Link
    to={to}
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className={className}
  >
    {children}
  </Link>
);

const Footer = () => {
  return (
    <footer className="bg-brand-100/50 mt-24 py-16 px-6 rounded-t-3xl border-t border-brand-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        
        {/* Brand Col */}
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-serif italic font-medium text-brand-900">
            Kizuna
          </Link>
          <p className="text-brand-800 mt-2 max-w-xs">
            © 2024 Kizuna. Protective Editorial.<br/>
            Professional income protection for the modern workforce.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-serif font-medium text-brand-900 mb-4 uppercase tracking-wide text-xs">Product</h4>
          <ul className="space-y-3 font-sans text-brand-800/80">
            <li><TopLink to="/features" className="hover:text-brand-900">Features</TopLink></li>
            <li><TopLink to="/claims" className="hover:text-brand-900">Claims</TopLink></li>
            <li><TopLink to="/coverage" className="hover:text-brand-900">Coverage</TopLink></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-medium text-brand-900 mb-4 uppercase tracking-wide text-xs">Company</h4>
          <ul className="space-y-3 font-sans text-brand-800/80">
            <li><Link to="#" className="hover:text-brand-900">About</Link></li>
            <li><Link to="#" className="hover:text-brand-900">Contact</Link></li>
            <li><Link to="#" className="hover:text-brand-900">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-medium text-brand-900 mb-4 uppercase tracking-wide text-xs">Resources</h4>
          <ul className="space-y-3 font-sans text-brand-800/80">
            <li><Link to="#" className="hover:text-brand-900">Terms of Service</Link></li>
            <li><Link to="#" className="hover:text-brand-900">The Shield Blog</Link></li>
            <li><Link to="#" className="hover:text-brand-900">Help Center</Link></li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
