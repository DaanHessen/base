import React from 'react';
import { useTranslation } from 'react-i18next';
import Reservation from '../Reservation';
import { Helmet } from 'react-helmet-async';
import { FaUsers, FaCalendarAlt, FaEnvelope } from 'react-icons/fa';

const Reservations = () => {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;

  return (
    <div className="w-full bg-onyx min-h-screen reservation-page">
      <Helmet>
        <title>{`${t('reservation.title')} - ${t('seo.title')}`}</title>
        <meta name="description" content={t('seo.description')} />
        <link rel="canonical" href={`${window.location.origin}/reservations/${currentLang === 'en' ? 'en/' : ''}`} />
        {currentLang === 'nl' && <link rel="alternate" hrefLang="en" href={`${window.location.origin}/reservations/en/`} />}
        {currentLang === 'en' && <link rel="alternate" hrefLang="nl" href={`${window.location.origin}/reservations/`} />}
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 md:pt-40 lg:pt-48 pb-12 md:pb-20">
        <div className="mb-6 md:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-magnolia mb-3 sm:mb-4 leading-tight">
            {t('reservation.title')}
          </h1>
          <div className="w-12 sm:w-14 md:w-16 h-1 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.3)] mb-4 sm:mb-6"></div>
        </div>
        
        {/* Reservation Containers - Side by side on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Regular Reservation */}
          <div className="w-full max-w-2xl lg:max-w-full mx-auto h-full">
            <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-medium text-gold mb-4">
              <FaCalendarAlt className="inline-block mr-2 mb-1" />
              {t('reservation.title')}
            </h2>
            <div className="h-[calc(100%-3rem)]">
              <Reservation className="h-full" />
            </div>
          </div>
          
          {/* Group/Party Reservation */}
          <div className="w-full max-w-2xl lg:max-w-full mx-auto h-full">
            <h2 className="text-lg sm:text-xl md:text-2xl font-heading font-medium text-gold mb-4">
              <FaUsers className="inline-block mr-2 mb-1" />
              {t('reservation.bookForGroups')}
            </h2>
            
            <div className="bg-onyx/70 backdrop-blur-sm p-6 border border-gold/30 rounded-lg shadow-lg overflow-hidden h-[calc(100%-3rem)] flex flex-col">
              <div className="text-center py-6 flex-1 flex flex-col justify-center">
                <FaUsers className="text-gold text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gold mb-3">
                  {t('reservation.hostEvent')}
                </h3>
                <p className="text-magnolia/90 max-w-lg mx-auto mb-6">
                  {t('reservation.groupsInfo')}
                </p>
                
                <div className="mt-auto space-y-4">
                  <a 
                    href={`mailto:${t('footer.contact.email')}`}
                    className="inline-flex items-center justify-center px-6 py-3 bg-gold hover:bg-gold/90 text-onyx font-medium rounded-lg transition-all duration-150 shadow-[4px_4px_0px_rgba(197,167,95,0.6)] hover:shadow-[2px_2px_0px_rgba(197,167,95,0.8)] hover:translate-x-[1px] hover:translate-y-[1px] text-center whitespace-nowrap flex-1 xs:flex-auto text-sm sm:text-base"
                  >
                    <FaEnvelope className="mr-2" />
                    {t('reservation.sendEmail')}
                  </a>
                  
                  <p className="block text-sm text-thistle mt-4">
                    {t('reservation.groupEmailHint')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations; 