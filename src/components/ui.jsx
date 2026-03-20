import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  to, 
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-800 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-brand-800 text-brand-50 hover:bg-brand-900',
    secondary: 'bg-brand-100 text-brand-900 hover:bg-brand-200',
    outline: 'border border-brand-800 text-brand-800 hover:bg-brand-800 hover:text-brand-50',
    ghost: 'text-brand-800 hover:bg-brand-100',
    accent: 'bg-accent-light text-brand-900 hover:bg-[#FAD6C6]'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className, ...props }) {
  return (
    <div className={cn("bg-white rounded-3xl p-8 shadow-premium", className)} {...props}>
      {children}
    </div>
  );
}
