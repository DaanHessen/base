import React, { useEffect, useRef, useMemo, memo } from 'react';
import baseLogo from '../assets/base-logo.svg';
import baseLogoCompact from '../assets/base.svg';

const Logo = ({ className, compact = false }) => {
  const logoSrc = compact ? baseLogoCompact : baseLogo;
  
  const primaryColor = useMemo(() => ({ 
    r: 255, 
    g: 205, 
    b: 210, 
    rgb: '255, 205, 210'
  }), []);
  
  const logoRef = useRef(null);
  const glowLayerRef = useRef(null);
  const isRunningRef = useRef(true);
  const animationFrameRef = useRef(null);
  
  const states = useMemo(() => ({
    initial: {
      filter: `brightness(0) invert(1) 
              drop-shadow(0 0 1px rgba(255, 255, 255, 0.8))
              drop-shadow(0 0 2px rgba(${primaryColor.rgb}, 0.4))
              drop-shadow(0 0 4px rgba(${primaryColor.rgb}, 0.2))`,
      glow: `radial-gradient(ellipse at center, 
             rgba(${primaryColor.rgb}, 0.06) 0%, 
             rgba(${primaryColor.rgb}, 0.03) 40%, 
             rgba(${primaryColor.rgb}, 0.015) 60%, 
             rgba(${primaryColor.rgb}, 0) 100%)`,
      intensity: 0.3
    },
    bright: {
      filter: `brightness(0) invert(1) 
              drop-shadow(0 0 1px rgba(255, 255, 255, 0.85))
              drop-shadow(0 0 2px rgba(${primaryColor.rgb}, 0.45))
              drop-shadow(0 0 4px rgba(${primaryColor.rgb}, 0.3))
              drop-shadow(0 0 6px rgba(${primaryColor.rgb}, 0.15))`,
      glow: `radial-gradient(ellipse at center, 
             rgba(${primaryColor.rgb}, 0.09) 0%, 
             rgba(${primaryColor.rgb}, 0.05) 40%, 
             rgba(${primaryColor.rgb}, 0.025) 60%, 
             rgba(${primaryColor.rgb}, 0) 100%)`,
      intensity: 0.4
    },
    dim: {
      filter: `brightness(0) invert(1) 
              drop-shadow(0 0 1px rgba(255, 255, 255, 0.8))
              drop-shadow(0 0 2px rgba(${primaryColor.rgb}, 0.35))
              drop-shadow(0 0 4px rgba(${primaryColor.rgb}, 0.15))`,
      glow: `radial-gradient(ellipse at center, 
             rgba(${primaryColor.rgb}, 0.05) 0%, 
             rgba(${primaryColor.rgb}, 0.025) 40%, 
             rgba(${primaryColor.rgb}, 0.01) 60%, 
             rgba(${primaryColor.rgb}, 0) 100%)`,
      intensity: 0.25
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
      
      logo.style.transition = `filter ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1.0)`;
      logo.style.filter = state.filter;
      
      glowLayer.style.transition = `opacity ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1.0), background ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1.0)`;
      glowLayer.style.background = state.glow;
      glowLayer.style.opacity = state.intensity;
    };
    
    const startupSequence = () => {
      // Start with the initial state already visible
      requestAnimationFrame(() => {
        applyState(states.bright, 500);
        
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
          // More noticeable flicker sequence - simplified for better performance
          applyState(states.dim, 40);
          setTimeout(() => {
            if (isRunningRef.current) {
              applyState(states.bright, 120);
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
    <div className={`relative ${className || 'w-auto h-auto'}`} style={{ 
      marginTop: compact ? '0.1rem' : '48px',
      transition: 'margin 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <div 
        ref={glowLayerRef}
        className="absolute -inset-6 z-0 opacity-0 blur-md hover:cursor-pointer"
        aria-hidden="true"
        style={{ 
          background: states.initial.glow, 
          opacity: states.initial.intensity,
          transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: compact ? 'scale(0.85)' : 'scale(1)',
          transformOrigin: 'center center',
        }}
      ></div>
      
      <img 
        ref={logoRef}
        src={logoSrc} 
        alt="BASE" 
        className="relative z-10 w-auto"
        width={compact ? "150" : "250"}
        height={compact ? "50" : "60"}
        style={{
          maxHeight: compact ? 'clamp(4.5rem, 6vw + 2.5rem, 6rem)' : 'clamp(8.5rem, 10vw + 4.5rem, 12rem)',
          objectFit: 'contain',
          aspectRatio: 'auto',
          filter: states.initial.filter,
          padding: compact ? '0.25rem 0' : '0',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          transformOrigin: 'center center',
          opacity: 1
        }}
        loading="eager"
        fetchpriority="high"
      />
    </div>
  );
};

export default memo(Logo); 