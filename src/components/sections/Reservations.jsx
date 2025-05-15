import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Reservation from '../Reservation';
import './Sections.css';

function Reservations() {
  const { t } = useTranslation(['reservations', 'common']);

  return (
    <>
      <Helmet>
        <title>{t('pageTitle', { ns: 'reservations' })} | BASE by Monsees</title>
        <meta name="description" content={t('pageDescription', { ns: 'reservations' })} />
      </Helmet>
      
      <section className="py-16 sm:py-20 md:py-24 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-left text-magnolia">
              {t('reservation.title', { ns: 'common' })}
            </h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Dinner reservations */}
            <div className="bg-onyx/50 border border-gold/20 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="mr-4 text-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-heading font-semibold text-gold">
                  {t('dinner.title', { ns: 'reservations' })}
                </h2>
              </div>
              
              <div className="text-center mb-8">
                <p className="text-magnolia mb-4">
                  {t('dinner.description', { ns: 'reservations' })}
                </p>
                
                <div className="inline-block bg-onyx/70 text-magnolia/80 rounded-md py-2 px-4 border border-gold/20 mb-6">
                  <p>{t('dinner.callToAction', { ns: 'reservations' })}</p>
                </div>
                
                <motion.a
                  href="tel:+31612345678"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="block w-full py-3 px-6 bg-gold text-onyx font-medium rounded-md text-center shadow-lg hover:bg-gold/90 transition-all"
                >
                  {t('dinner.buttonText', { ns: 'reservations' })}
                </motion.a>
              </div>
              
              <p className="text-sm text-magnolia/60 text-center">
                {t('openHours', { ns: 'reservations' })}
              </p>
            </div>
            
            {/* Events */}
            <div className="bg-onyx/50 border border-gold/20 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="mr-4 text-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-heading font-semibold text-gold">
                  {t('events.title', { ns: 'reservations' })}
                </h2>
              </div>
              
              <div className="text-center mb-8">
                <p className="text-magnolia mb-4">
                  {t('events.description', { ns: 'reservations' })}
                </p>
                
                <div className="inline-block bg-onyx/70 text-magnolia/80 rounded-md py-2 px-4 border border-gold/20 mb-6">
                  <p>{t('events.callToAction', { ns: 'reservations' })}</p>
                </div>
                
                <motion.a
                  href="mailto:info@basebymonsees.nl"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="block w-full py-3 px-6 bg-gold text-onyx font-medium rounded-md text-center shadow-lg hover:bg-gold/90 transition-all"
                >
                  {t('events.buttonText', { ns: 'reservations' })}
                </motion.a>
              </div>
              
              <p className="text-sm text-magnolia/60 text-center">
                {t('eventInfo', { ns: 'reservations' })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(Reservations); 