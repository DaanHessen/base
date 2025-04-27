import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

function Home() {
  const { t, i18n } = useTranslation(['home', 'common']);
  const currentLang = i18n.language;

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
      
      <section className="min-h-screen flex items-center justify-center pt-36">
        <div className="max-w-screen-xl w-full px-6">
          <div className="flex flex-col items-start text-left sm:pl-8 md:pl-16">
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-magnolia mb-6 leading-tight home-title"
              dangerouslySetInnerHTML={{ __html: t('home:hero.title') }}
            />
            
            <h2 
              className="text-xl sm:text-2xl text-thistle mb-8 font-light tracking-wide home-subtitle"
            >
              {t('home:hero.subtitle')}
            </h2>
            
            <div 
              className="text-base sm:text-lg text-thistle home-content"
            >
              <p className="mb-8 leading-relaxed max-w-2xl">
                {t('home:hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
                <Link 
                  to="/about" 
                  className="px-6 py-3 bg-gold hover:bg-gold/90 text-onyx font-medium rounded transition-all duration-150 shadow-[4px_4px_0px_rgba(197,167,95,0.6)] hover:shadow-[2px_2px_0px_rgba(197,167,95,0.8)] hover:translate-x-[1px] hover:translate-y-[1px]"
                >
                  {t('home:buttons.reservation')}
                </Link>
                <Link 
                  to="/menu" 
                  className="px-6 py-3 border-2 border-magnolia/20 text-magnolia hover:bg-magnolia/10 font-medium rounded transition-all duration-150 hover:border-magnolia/40 shadow-[4px_4px_0px_rgba(62,62,62,0.3)] hover:shadow-[2px_2px_0px_rgba(62,62,62,0.5)] hover:translate-x-[1px] hover:translate-y-[1px]"
                >
                  {t('home:buttons.menu')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home; 