import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ConstructionPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const { t } = useTranslation('common');

  useEffect(() => {
    // Check if we're not on localhost and popup hasn't been shown in this session
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname.includes('192.168') ||
                       window.location.hostname.includes('10.0') ||
                       window.location.port === '3000';
    
    const popupShown = sessionStorage.getItem('construction-popup-shown');
    
    if (!isLocalhost && !popupShown && !hasBeenShown) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasBeenShown(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [hasBeenShown]);

  const handleClose = () => {
    setIsVisible(false);
    // Remember that popup was shown in this session
    sessionStorage.setItem('construction-popup-shown', 'true');
  };

  const handleContinue = () => {
    handleClose();
  };

  if (!isVisible) return null;

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 30,
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: 'easeOut',
        delay: 0.3
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-onyx/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 sm:p-6"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-onyx/95 backdrop-blur-md border border-gold/30 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md mx-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(212, 175, 55, 0.1), inset 0 1px 0 rgba(212, 175, 55, 0.1)'
            }}
          >
            {/* Close button */}
            <motion.button
              onClick={handleClose}
              className="absolute top-4 right-4 text-magnolia/60 hover:text-gold transition-colors z-10 p-2"
              aria-label={t('constructionPopup.closeButton')}
              variants={contentVariants}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes size={18} />
            </motion.button>

            {/* Content */}
            <motion.div 
              className="p-6 sm:p-8 pt-12 sm:pt-14"
              variants={contentVariants}
            >
              {/* Header */}
              <motion.div 
                className="text-center mb-6"
                variants={contentVariants}
              >
                <motion.h2 
                  className="text-xl sm:text-2xl font-bold text-magnolia mb-3"
                  variants={contentVariants}
                >
                  {t('constructionPopup.title')}
                </motion.h2>
                
                <motion.div
                  className="text-sm text-gold font-medium mb-4"
                  variants={contentVariants}
                >
                  {t('constructionPopup.subtitle')}
                </motion.div>
                
                <motion.p 
                  className="text-thistle/90 leading-relaxed text-sm sm:text-base"
                  variants={contentVariants}
                >
                  {t('constructionPopup.description')}
                </motion.p>
              </motion.div>

              {/* Divider with animation */}
              <motion.div 
                className="relative my-6"
                variants={contentVariants}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gold/20"></div>
                </div>
                <div className="relative flex justify-center">
                  <div className="bg-onyx px-4">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className="w-2 h-2 bg-gold rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Sub message */}
              <motion.div 
                className="text-center mb-6"
                variants={contentVariants}
              >
                <p className="text-sm text-thistle/70">
                  {t('constructionPopup.notice')}
                </p>
              </motion.div>

              {/* Action button */}
              <motion.div 
                className="text-center"
                variants={contentVariants}
              >
                <motion.button
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-gold to-gold/90 hover:from-gold/90 hover:to-gold text-onyx font-semibold py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden w-full sm:w-auto"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {/* Button shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: [-100, 400],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                  <span className="relative z-10 text-sm sm:text-base">
                    {t('constructionPopup.continueButton')}
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConstructionPopup; 