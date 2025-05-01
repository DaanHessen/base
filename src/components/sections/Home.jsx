import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { getLanguage } from '../../utils/language';

function Home() {
  const { t, i18n } = useTranslation(['home', 'common']);
  const currentLang = i18n.language;
  const [isMobile, setIsMobile] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);

  // Helper function to generate properly localized paths
  const getLocalizedPath = (basePath) => {
    const lang = getLanguage();
    if (lang === 'en') return `/en${basePath}`;
    return basePath;
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);
    
    // Always enable animation on mount
    setAnimationPlayed(false);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: 0.05,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut",
        // Use hardware acceleration for better performance on mobile
        type: "tween"
      }
    }
  };

  const decorationVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: { 
      opacity: 1, 
      width: 96,
      transition: { 
        delay: isMobile ? 0.6 : 0.8, 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('home:seo.title')}</title>
        <meta name="description" content={t('home:seo.description')} />
        <link rel="canonical" href={`${window.location.origin}/${currentLang === 'en' ? 'en/' : ''}`} />
        {currentLang === 'nl' && <link rel="alternate" hrefLang="en" href={`${window.location.origin}/en/`} />}
        {currentLang === 'en' && <link rel="alternate" hrefLang="nl" href={`${window.location.origin}/`} />}
        <meta name="og:title" content={t('home:seo.title')} />
        <meta name="og:description" content={t('home:seo.description')} />
      </Helmet>
      
      <section className="min-h-screen flex items-center pt-20 pb-12 sm:pt-16 md:pt-0 md:pb-0">
        <div className="w-full px-5 sm:px-8 max-w-screen-xl mx-auto">
          <motion.div 
            className="flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-magnolia mb-4 sm:mb-6 leading-tight tracking-tight"
              variants={itemVariants}
              dangerouslySetInnerHTML={{ __html: t('home:hero.title') }}
              style={{ transform: 'translate3d(0, 0, 0)' }}
            />
            
            <div className="max-w-xl">
              <motion.div className="relative mb-2 sm:mb-3" variants={itemVariants} style={{ transform: 'translate3d(0, 0, 0)' }}>
                <motion.h2 
                  className="text-sm sm:text-base md:text-lg text-thistle font-light tracking-wide relative z-10 px-4 py-2 whitespace-nowrap"
                >
                  {t('home:hero.subtitle')}
                </motion.h2>
                <div className="absolute -left-0 -right-0 top-0 bottom-0 bg-onyx/70 rounded-lg -z-10"></div>
              </motion.div>
              
              <motion.div
                className="text-sm sm:text-base md:text-lg text-thistle backdrop-blur-sm px-4 py-3 rounded-lg bg-onyx/50"
                variants={itemVariants}
                style={{ transform: 'translate3d(0, 0, 0)' }}
              >
                <p className="mb-6 sm:mb-8 leading-relaxed">
                  {t('home:hero.description')}
                </p>
                
                <motion.div 
                  className="flex flex-col xs:flex-row gap-3 w-full xs:w-auto justify-start"
                  variants={itemVariants}
                  style={{ transform: 'translate3d(0, 0, 0)' }}
                >
                  <Link 
                    to={getLocalizedPath('/about')} 
                    className="px-6 py-3.5 bg-gold hover:bg-gold/90 text-onyx font-medium rounded-lg transition-all duration-150 shadow-[4px_4px_0px_rgba(197,167,95,0.6)] hover:shadow-[2px_2px_0px_rgba(197,167,95,0.8)] hover:translate-x-[1px] hover:translate-y-[1px] text-center whitespace-nowrap flex-1 xs:flex-auto"
                  >
                    {t('home:buttons.reservation')}
                  </Link>
                  <Link 
                    to={getLocalizedPath('/menu')} 
                    className="px-6 py-3.5 border border-magnolia/30 text-magnolia hover:bg-magnolia/10 font-medium rounded-lg transition-all duration-150 hover:border-magnolia/50 shadow-[4px_4px_0px_rgba(62,62,62,0.3)] hover:shadow-[2px_2px_0px_rgba(62,62,62,0.5)] hover:translate-x-[1px] hover:translate-y-[1px] text-center whitespace-nowrap flex-1 xs:flex-auto"
                  >
                    {t('home:buttons.menu')}
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            
            <motion.div 
              className="w-24 h-1 bg-gold/70 mt-12 rounded-full block md:hidden mx-auto shadow-[0_0_10px_rgba(212,175,55,0.5)]"
              variants={decorationVariants}
              style={{ transform: 'translate3d(0, 0, 0)' }}
            />
            
            <motion.div 
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gold/70 md:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isMobile ? 0.8 : 1.2, duration: 0.5, ease: "easeOut" }}
              style={{ transform: 'translate3d(-50%, 0, 0)' }}
            >
              <div className="text-xs font-light mb-2">{t('home:scrollForMore')}</div>
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Home; 