import { useEffect, useRef, useState } from 'react';

export function ScrollReveal({ 
  children, 
  className = "", 
  direction = "up", 
  delay = 0,
  threshold = 0.1 
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '50px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const getTranslateValue = () => {
    switch (direction) {
      case "up": return "translateY(40px)";
      case "down": return "translateY(-40px)";
      case "left": return "translateX(40px)";
      case "right": return "translateX(-40px)";
      case "scale": return "scale(0.95)";
      default: return "translateY(40px)";
    }
  };

  const getActiveTransform = () => {
    switch (direction) {
      case "up": 
      case "down": return "translateY(0)";
      case "left": 
      case "right": return "translateX(0)";
      case "scale": return "scale(1)";
      default: return "translateY(0)";
    }
  };

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? getActiveTransform() : getTranslateValue(),
    transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
