import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ConstructionPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const { t } = useTranslation('common');

  // Lock/unlock body scroll
  useEffect(() => {
    if (isVisible) {
      // Lock scroll
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    } else {
      // Unlock scroll
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isVisible]);

  useEffect(() => {
    // Always show popup on first visit, regardless of environment
    if (!hasBeenShown) {
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
          className="fixed inset-0 bg-onyx/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-6"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-onyx/95 backdrop-blur-md border border-gold/30 rounded-xl shadow-2xl w-full max-w-md mx-auto relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(212, 175, 55, 0.1), inset 0 1px 0 rgba(212, 175, 55, 0.1)'
            }}
          >
            {/* Close button */}
            <motion.button
              onClick={handleClose}
              className="absolute top-4 right-4 text-magnolia/60 hover:text-gold transition-colors z-10 p-2 !w-auto !min-w-0 !min-h-0 !h-auto flex items-center justify-center"
              style={{ 
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: 'auto',
                height: 'auto',
                minWidth: 'auto',
                minHeight: 'auto'
              }}
              aria-label={t('constructionPopup.closeButton')}
              variants={contentVariants}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes size={18} />
            </motion.button>

            {/* Content */}
            <motion.div 
              className="p-8 pt-14"
              variants={contentVariants}
            >
              {/* Header */}
              <motion.div 
                className="text-center mb-6"
                variants={contentVariants}
              >
                <motion.h2 
                  className="text-2xl font-bold text-magnolia mb-3"
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
                  className="text-thistle/90 leading-relaxed text-base"
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
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-gold hover:bg-gold/90 text-onyx font-medium rounded-lg transition-all duration-150 shadow-[4px_4px_0px_rgba(197,167,95,0.6)] hover:shadow-[2px_2px_0px_rgba(197,167,95,0.8)] hover:translate-x-[1px] text-base !w-auto !min-w-0"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {t('constructionPopup.continueButton')}
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