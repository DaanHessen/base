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
  const animationFrameRef = useRef(null);
  
  const states = useMemo(() => ({
    initial: {
      filter: `brightness(0) invert(1) 
              drop-shadow(0 0 1px rgba(255, 255, 255, 0.9))
              drop-shadow(0 0 2px rgba(${primaryColor.rgb}, 0.75))
              drop-shadow(0 0 4px rgba(${primaryColor.rgb}, 0.65))
              drop-shadow(0 0 6px rgba(${primaryColor.rgb}, 0.45))`,
      glow: `radial-gradient(ellipse at center, 
             rgba(${primaryColor.rgb}, 0.15) 0%, 
             rgba(${primaryColor.rgb}, 0.08) 40%, 
             rgba(${primaryColor.rgb}, 0.04) 60%, 
             rgba(${primaryColor.rgb}, 0) 100%)`,
      intensity: 0.65
    },
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
    },
    dim: {
      filter: `brightness(0) invert(1) 
              drop-shadow(0 0 1px rgba(255, 255, 255, 0.85))
              drop-shadow(0 0 2px rgba(${primaryColor.rgb}, 0.65))
              drop-shadow(0 0 4px rgba(${primaryColor.rgb}, 0.55))
              drop-shadow(0 0 5px rgba(${primaryColor.rgb}, 0.35))`,
      glow: `radial-gradient(ellipse at center, 
             rgba(${primaryColor.rgb}, 0.12) 0%, 
             rgba(${primaryColor.rgb}, 0.06) 40%, 
             rgba(${primaryColor.rgb}, 0.03) 60%, 
             rgba(${primaryColor.rgb}, 0) 100%)`,
      intensity: 0.55
    }
  }), [primaryColor.rgb]);
  
  useEffect(() => {
    if (!logoRef.current || !glowLayerRef.current) return;
    
    const logo = logoRef.current;
    const glowLayer = glowLayerRef.current;

    // Start with initial state instead of black
    logo.style.filter = states.initial.filter;
    glowLayer.style.background = states.initial.glow;
    glowLayer.style.opacity = states.initial.intensity;
    
    const applyState = (state, duration) => {
      if (!logo || !glowLayer) return;
      
      logo.style.transition = `filter ${duration}ms cubic-bezier(0.23, 1, 0.32, 1)`;
      logo.style.filter = state.filter;
      
      glowLayer.style.transition = `opacity ${duration}ms cubic-bezier(0.23, 1, 0.32, 1), background ${duration}ms cubic-bezier(0.23, 1, 0.32, 1)`;
      glowLayer.style.background = state.glow;
      glowLayer.style.opacity = state.intensity;
    };
    
    const startupSequence = () => {
      // Start with the initial state already visible
      requestAnimationFrame(() => {
        applyState(states.bright, 300);
        
        // Start the flicker animation after initial startup
        setTimeout(() => {
          flickerAnimation();
        }, 2000);
      });
    };
    
    // Subtle random flickering animation
    const flickerAnimation = () => {
      if (!isRunningRef.current) return;
      
      // Random time until next flicker (between 3-8 seconds)
      const nextFlickerDelay = 3000 + Math.random() * 5000;
      
      setTimeout(() => {
        if (!isRunningRef.current) return;
        
        // 85% chance for subtle flicker, 15% chance for more noticeable flicker
        const isSubtle = Math.random() > 0.15;
        
        // Subtle flicker sequence
        if (isSubtle) {
          // Quick dim and back
          applyState(states.dim, 90);
          setTimeout(() => {
            if (isRunningRef.current) {
              applyState(states.bright, 150);
            }
          }, 120);
        } else {
          // More noticeable flicker sequence
          applyState(states.dim, 40);
          setTimeout(() => {
            if (isRunningRef.current) {
              applyState(states.bright, 30);
              setTimeout(() => {
                if (isRunningRef.current) {
                  applyState(states.dim, 50);
                  setTimeout(() => {
                    if (isRunningRef.current) {
                      applyState(states.bright, 120);
                    }
                  }, 60);
                }
              }, 50);
            }
          }, 70);
        }
        
        // Schedule next flicker
        if (isRunningRef.current) {
          animationFrameRef.current = requestAnimationFrame(flickerAnimation);
        }
      }, nextFlickerDelay);
    };
    
    startupSequence();
    
    return () => {
      isRunningRef.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [states]);
  
  return (
    <div className={`relative ${className || 'w-auto h-auto'}`} style={{ marginTop: '0.2rem' }}>
      <div 
        ref={glowLayerRef}
        className="absolute -inset-6 z-0 opacity-0 blur-md hover:cursor-pointer"
        aria-hidden="true"
        style={{ background: states.initial.glow, opacity: states.initial.intensity }}
      ></div>
      
      <img 
        ref={logoRef}
        src={logo} 
        alt="BASE" 
        className="relative z-10 w-auto max-h-24 md:max-h-28 lg:max-h-32"
        width="192"
        height="48"
        style={{
          maxHeight: 'clamp(6rem, 8vw + 2.5rem, 8rem)',
          objectFit: 'contain',
          aspectRatio: 'auto',
          filter: states.initial.filter
        }}
        loading="eager"
        fetchpriority="high"
      />
    </div>
  );
};

export default memo(Logo); 