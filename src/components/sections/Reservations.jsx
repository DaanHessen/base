import React from 'react';
import { useTranslation } from 'react-i18next';
import Reservation from '../Reservation';
import { Helmet } from 'react-helmet-async';

const Reservations = () => {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;

  return (
    <div className="w-full bg-onyx min-h-screen overflow-x-hidden">
      <Helmet>
        <title>{`${t('reservation.title')} - ${t('seo.title')}`}</title>
        <meta name="description" content={t('seo.description')} />
        <link rel="canonical" href={`${window.location.origin}/reservations/${currentLang === 'en' ? 'en/' : ''}`} />
        {currentLang === 'nl' && <link rel="alternate" hrefLang="en" href={`${window.location.origin}/reservations/en/`} />}
        {currentLang === 'en' && <link rel="alternate" hrefLang="nl" href={`${window.location.origin}/reservations/`} />}
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-magnolia mb-4 sm:mb-6 leading-tight">
            {t('reservation.title')}
          </h1>
          <div className="w-14 sm:w-16 md:w-20 h-1 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.3)] mb-6"></div>
        </div>
        
        <div className="mx-auto max-w-2xl">
          <Reservation className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Reservations; 