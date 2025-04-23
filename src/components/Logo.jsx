import React, { useEffect, useRef } from 'react';
import logo from '../assets/base-logo.svg';

const Logo = ({ className }) => {
  const primaryColor = { r: 255, g: 107, b: 53, rgb: '255, 107, 53' };
  
  const logoRef = useRef(null);
  const glowLayerRef = useRef(null);
  
  useEffect(() => {
    if (!logoRef.current || !glowLayerRef.current) return;
    
    const logo = logoRef.current;
    const glowLayer = glowLayerRef.current;
    
    let isRunning = true;
    
    const baseIntensity = 0.75;
    const dimIntensity = 0.5;
    
    const states = {
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
        intensity: baseIntensity
      },
      
      dimmed: {
        filter: `brightness(0) invert(1)
                drop-shadow(0 0 1px rgba(255, 255, 255, 0.85))
                drop-shadow(0 0 2px rgba(${primaryColor.rgb}, 0.7))
                drop-shadow(0 0 3px rgba(${primaryColor.rgb}, 0.4))`,
        glow: `radial-gradient(ellipse at center, 
               rgba(${primaryColor.rgb}, 0.1) 0%, 
               rgba(${primaryColor.rgb}, 0.05) 40%, 
               rgba(${primaryColor.rgb}, 0.02) 70%,
               rgba(${primaryColor.rgb}, 0) 100%)`,
        intensity: dimIntensity
      }
    };
    
    const applyState = (state, duration) => {
      logo.style.transition = `filter ${duration}ms cubic-bezier(0.23, 1, 0.32, 1)`;
      logo.style.filter = state.filter;
      
      glowLayer.style.transition = `opacity ${duration}ms cubic-bezier(0.23, 1, 0.32, 1), background ${duration}ms cubic-bezier(0.23, 1, 0.32, 1)`;
      glowLayer.style.background = state.glow;
      glowLayer.style.opacity = state.intensity;
    };
    
    const flickerChance = () => Math.random() < (0.10 + (Math.random() * 0.08));
    const getRandomInterval = () => 2000 + (Math.random() * 3000);
    
    const subtleFlicker = async () => {
      if (!isRunning) return;
      
      if (flickerChance()) {
        const dimDuration = 30 + Math.random() * 100;
        const holdDuration = 50 + Math.random() * 80;
        const brightDuration = 100 + Math.random() * 130;
        
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
        intensity: 0.3
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
  }, [primaryColor.rgb]);
  
  return (
    <div className={`relative py-4 pt-10 mt-3 ${className || 'w-40 h-auto sm:w-52 md:w-60'}`}>
      <div 
        ref={glowLayerRef}
        className="absolute -inset-6 z-0 opacity-0 blur-lg mt-20"
        style={{ pointerEvents: 'none' }}
      ></div>
      
      <img 
        ref={logoRef}
        src={logo} 
        alt="BASE" 
        className="relative z-10 w-full h-auto mt-20"
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