import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const ConstructionPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] p-4"
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-auto relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            aria-label="Sluiten"
          >
            <FaTimes size={24} />
          </button>

          {/* Content */}
          <div className="p-8 pt-12">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                🚧 We zijn nog bezig! 🚧
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We werken momenteel nog aan onze website en zijn van plan om na de zomervakantie officieel te openen.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Sub message */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 mb-4">
                Website is nog in ontwikkeling, maar je kunt alvast een kijkje nemen
              </p>
            </div>

            {/* Action button */}
            <div className="text-center">
              <button
                onClick={handleContinue}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
              >
                Bekijk de website
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConstructionPopup; 