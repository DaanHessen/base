import React, { useEffect, useRef, useMemo, memo } from 'react';
import logo from '../assets/base-logo.svg';

const Logo = ({ className }) => {
  const primaryColor = useMemo(() => ({ 
    r: 255, 
    g: 192, 
    b: 203, 
    rgb: '255, 192, 203'
  }), []);
  
  const logoRef = useRef(null);
  const glowLayerRef = useRef(null);
  const isRunningRef = useRef(true);
  
  const states = useMemo(() => ({
    bright: {
      filter: `brightness(0) invert(1) 
              drop-shadow(0 0 1px rgba(255, 255, 255, 0.9))
              drop-shadow(0 0 2px rgba(${primaryColor.rgb}, 0.85))
              drop-shadow(0 0 4px rgba(${primaryColor.rgb}, 0.75))
              drop-shadow(0 0 6px rgba(${primaryColor.rgb}, 0.5))`,
      glow: `radial-gradient(ellipse at center, 
             rgba(${primaryColor.rgb}, 0.2) 0%, 
             rgba(${primaryColor.rgb}, 0.1) 40%, 
             rgba(${primaryColor.rgb}, 0.05) 60%, 
             rgba(${primaryColor.rgb}, 0) 100%)`,
      intensity: 0.75
    }
  }), [primaryColor.rgb]);
  
  useEffect(() => {
    if (!logoRef.current || !glowLayerRef.current) return;
    
    const logo = logoRef.current;
    const glowLayer = glowLayerRef.current;
    
    const applyState = (state, duration) => {
      if (!logo || !glowLayer) return;
      
      logo.style.transition = `filter ${duration}ms cubic-bezier(0.23, 1, 0.32, 1)`;
      logo.style.filter = state.filter;
      
      glowLayer.style.transition = `opacity ${duration}ms cubic-bezier(0.23, 1, 0.32, 1), background ${duration}ms cubic-bezier(0.23, 1, 0.32, 1)`;
      glowLayer.style.background = state.glow;
      glowLayer.style.opacity = state.intensity;
    };
    
    // Simple clean animation (no flickering) for performance
    const startupSequence = () => {
      applyState(states.bright, 300);
    };
    
    startupSequence();
    
    return () => {
      isRunningRef.current = false;
    };
  }, [states]);
  
  return (
    <div className={`relative ${className || 'w-auto h-auto'}`} style={{ marginTop: '0.2rem' }}>
      <div 
        ref={glowLayerRef}
        className="absolute -inset-6 z-0 opacity-0 blur-md"
        aria-hidden="true"
      ></div>
      
      <img 
        ref={logoRef}
        src={logo} 
        alt="BASE" 
        className="relative z-10 w-auto max-h-24 md:max-h-28 lg:max-h-32" 
        style={{
          maxHeight: 'clamp(6rem, 8vw + 3rem, 8rem)'
        }}
        loading="eager"
        fetchpriority="high"
      />
    </div>
  );
};

export default memo(Logo); 