import React, { useEffect, useRef } from 'react';
import logo from '../assets/logo.svg';

const Logo = () => {
  const primaryColor = { r: 255, g: 107, b: 53, rgb: '255, 107, 53' };
  const secondaryColor = {
    r: primaryColor.r * 0.9,
    g: primaryColor.g * 0.7,
    b: primaryColor.b * 0.8,
    rgb: `${Math.round(primaryColor.r * 0.9)}, ${Math.round(primaryColor.g * 0.7)}, ${Math.round(primaryColor.b * 0.8)}`
  };

  const logoRef = useRef(null);
  const glowLayerRef = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!logoRef.current || !glowLayerRef.current || !containerRef.current) return;
    
    const logo = logoRef.current;
    const glowLayer = glowLayerRef.current;
    const container = containerRef.current;
    
    let isRunning = true;
    
    const baseIntensity = 0.8;
    const dimIntensity = 0.6;
    
    const states = {
      bright: {
        filter: `brightness(0) invert(1) saturate(1.5) 
                drop-shadow(0 0 1px rgba(255, 255, 255, 0.95))
                drop-shadow(0 0 2px rgba(${primaryColor.rgb}, 0.9))
                drop-shadow(0 0 3px rgba(${primaryColor.rgb}, 0.85))
                drop-shadow(0 0 5px rgba(${primaryColor.rgb}, 0.8))
                drop-shadow(0 0 8px rgba(${primaryColor.rgb}, 0.7))
                drop-shadow(0 0 12px rgba(${primaryColor.rgb}, 0.5))`,
        glow: `radial-gradient(ellipse at center, 
               rgba(${primaryColor.rgb}, 0.25) 0%, 
               rgba(${primaryColor.rgb}, 0.15) 30%, 
               rgba(${primaryColor.rgb}, 0.08) 60%, 
               rgba(${primaryColor.rgb}, 0.03) 70%,
               rgba(${primaryColor.rgb}, 0) 100%)`,
        intensity: baseIntensity,
        boxShadow: `0 0 15px 2px rgba(${primaryColor.rgb}, 0.15)`
      },
      
      dimmed: {
        filter: `brightness(0) invert(1) saturate(1.3) 
                drop-shadow(0 0 1px rgba(255, 255, 255, 0.9))
                drop-shadow(0 0 2px rgba(${primaryColor.rgb}, 0.8))
                drop-shadow(0 0 4px rgba(${primaryColor.rgb}, 0.7))
                drop-shadow(0 0 6px rgba(${primaryColor.rgb}, 0.5))`,
        glow: `radial-gradient(ellipse at center, 
               rgba(${primaryColor.rgb}, 0.15) 0%, 
               rgba(${primaryColor.rgb}, 0.08) 30%, 
               rgba(${primaryColor.rgb}, 0.05) 60%, 
               rgba(${primaryColor.rgb}, 0.02) 80%,
               rgba(${primaryColor.rgb}, 0) 100%)`,
        intensity: dimIntensity,
        boxShadow: `0 0 10px 1px rgba(${primaryColor.rgb}, 0.1)`
      }
    };
    
    const applyState = (state, duration) => {
      logo.style.transition = `filter ${duration}ms cubic-bezier(0.23, 1, 0.32, 1)`;
      logo.style.filter = state.filter;
      
      glowLayer.style.transition = `opacity ${duration}ms cubic-bezier(0.23, 1, 0.32, 1), background ${duration}ms cubic-bezier(0.23, 1, 0.32, 1)`;
      glowLayer.style.background = state.glow;
      glowLayer.style.opacity = state.intensity;
      
      container.style.transition = `box-shadow ${duration}ms cubic-bezier(0.23, 1, 0.32, 1)`;
      container.style.boxShadow = state.boxShadow;
    };
    
    const flickerChance = () => Math.random() < (0.12 + (Math.random() * 0.1));
    const getRandomInterval = () => 2000 + (Math.random() * 3000);
    
    const subtleFlicker = async () => {
      if (!isRunning) return;
      
      if (flickerChance()) {
        const dimDuration = 40 + Math.random() * 120;
        const holdDuration = 60 + Math.random() * 100;
        const brightDuration = 120 + Math.random() * 150;
        
        applyState(states.dimmed, dimDuration);
        
        await new Promise(r => setTimeout(r, holdDuration));
        
        applyState(states.bright, brightDuration);
      }
      
      const nextFlicker = getRandomInterval();
      setTimeout(subtleFlicker, nextFlicker);
    };
    
    const startupSequence = async () => {
      applyState({
        ...states.dimmed, 
        intensity: 0.4,
        boxShadow: `0 0 5px 0 rgba(${primaryColor.rgb}, 0.1)`
      }, 0);
      
      await new Promise(r => setTimeout(r, 100));
      
      applyState(states.bright, 150);
      
      setTimeout(() => {
        applyState(states.dimmed, 50);
        setTimeout(() => {
          applyState(states.bright, 100);
          
          setTimeout(subtleFlicker, 500);
        }, 60);
      }, 200);
    };
    
    startupSequence();
    
    return () => {
      isRunning = false;
    };
  }, [primaryColor.rgb, secondaryColor.rgb]);
  
  return (
    <div ref={containerRef} className="relative w-48 h-auto py-4 filter-none">
      <div 
        ref={glowLayerRef}
        className="absolute -inset-10 z-0 opacity-0 blur-xl"
        style={{ pointerEvents: 'none' }}
      ></div>
      
      <img 
        ref={logoRef}
        src={logo} 
        alt="BASE" 
        className="relative z-10 w-48 h-auto drop-shadow-md"
        style={{ 
          imageRendering: 'auto',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }}
      />
    </div>
  );
};

export default Logo; 