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
      
      <section className="min-h-screen flex items-center pt-28 pb-12 sm:pt-32 md:pt-20 md:pb-0">
        <div className="w-full px-4 sm:px-8 max-w-screen-xl mx-auto">
          <motion.div 
            className="flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <motion.h1 
              className="text-[clamp(1.75rem,5vw+1rem,4rem)] md:text-[clamp(3rem,7vw+1rem,5rem)] lg:text-[clamp(4rem,8vw+1rem,7rem)] font-bold text-magnolia mb-3 sm:mb-6 leading-tight tracking-tight"
              variants={itemVariants}
              dangerouslySetInnerHTML={{ __html: t('home:hero.title') }}
              style={{ transform: 'translate3d(0, 0, 0)' }}
            />
            
            <div className="max-w-xl w-full">
              <motion.div className="relative mb-2 sm:mb-3" variants={itemVariants} style={{ transform: 'translate3d(0, 0, 0)' }}>
                <motion.h2 
                  className="text-[clamp(0.875rem,2vw+0.5rem,1rem)] md:text-[clamp(1rem,2.5vw+0.5rem,1.125rem)] text-thistle font-light tracking-wide relative z-10 px-4 py-2 break-words"
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
                    to={getLocalizedPath('/reservations')} 
                    className="px-6 py-3 sm:py-3.5 bg-gold hover:bg-gold/90 text-onyx font-medium rounded-lg transition-all duration-150 shadow-[4px_4px_0px_rgba(197,167,95,0.6)] hover:shadow-[2px_2px_0px_rgba(197,167,95,0.8)] hover:translate-x-[1px] hover:translate-y-[1px] text-center whitespace-nowrap flex-1 xs:flex-auto text-sm sm:text-base"
                  >
                    {t('home:buttons.reservation')}
                  </Link>
                  <Link 
                    to={getLocalizedPath('/menu')} 
                    className="px-6 py-3 sm:py-3.5 border border-magnolia/30 text-magnolia hover:bg-magnolia/10 font-medium rounded-lg transition-all duration-150 hover:border-magnolia/50 shadow-[4px_4px_0px_rgba(62,62,62,0.3)] hover:shadow-[2px_2px_0px_rgba(62,62,62,0.5)] hover:translate-x-[1px] hover:translate-y-[1px] text-center whitespace-nowrap flex-1 xs:flex-auto text-sm sm:text-base"
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
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Home; 