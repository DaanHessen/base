import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

function Home() {
  const { t, i18n } = useTranslation(['home', 'common']);
  const currentLang = i18n.language;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const decorationVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: { 
      opacity: 1, 
      width: 96,
      transition: { delay: 0.8, duration: 0.5 }
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
      
      <section className="min-h-screen flex items-center pt-16 md:pt-0">
        <div className="w-full px-5 sm:px-8 max-w-screen-xl mx-auto">
          <motion.div 
            className="flex flex-col items-center md:items-start text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-magnolia mb-4 sm:mb-6 leading-tight tracking-tight"
              variants={itemVariants}
              dangerouslySetInnerHTML={{ __html: t('home:hero.title') }}
            />
            
            <motion.h2 
              className="text-lg sm:text-xl md:text-2xl text-thistle mb-6 sm:mb-8 font-light tracking-wide max-w-xl"
              variants={itemVariants}
            >
              {t('home:hero.subtitle')}
            </motion.h2>
            
            <motion.div
              className="text-base sm:text-lg text-thistle max-w-2xl"
              variants={itemVariants}
            >
              <p className="mb-6 sm:mb-8 leading-relaxed">
                {t('home:hero.description')}
              </p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                variants={itemVariants}
              >
                <Link 
                  to="/about" 
                  className="px-6 py-3.5 bg-gold hover:bg-gold/90 text-onyx font-medium rounded-lg transition-all duration-150 shadow-[4px_4px_0px_rgba(197,167,95,0.6)] hover:shadow-[2px_2px_0px_rgba(197,167,95,0.8)] hover:translate-x-[1px] hover:translate-y-[1px] text-center"
                >
                  {t('home:buttons.reservation')}
                </Link>
                <Link 
                  to="/menu" 
                  className="px-6 py-3.5 border border-magnolia/30 text-magnolia hover:bg-magnolia/10 font-medium rounded-lg transition-all duration-150 hover:border-magnolia/50 shadow-[4px_4px_0px_rgba(62,62,62,0.3)] hover:shadow-[2px_2px_0px_rgba(62,62,62,0.5)] hover:translate-x-[1px] hover:translate-y-[1px] text-center"
                >
                  {t('home:buttons.menu')}
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Mobile decoration - subtle visual element */}
            <motion.div 
              className="w-24 h-1 bg-gold/50 mt-12 rounded-full block md:hidden mx-auto"
              variants={decorationVariants}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Home; 