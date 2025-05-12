import React from 'react';
import { useTranslation } from 'react-i18next';
import Reservation from '../Reservation';

const Reservations = () => {
  const { t } = useTranslation('common');

  return (
    <div className="w-full bg-onyx min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-heading text-gold mb-4">
            {t('reservation.title')}
          </h1>
          <p className="text-xl text-magnolia mb-8 max-w-2xl mx-auto">
            {t('reservation.subtitle')}
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Reservation className="mb-12" />
          
          <div className="bg-onyx/70 backdrop-blur-sm p-6 border border-gold/30 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-heading text-gold mb-4">
              {t('footer.openingHours.title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-magnolia">
              <div className="flex justify-between">
                <span>{t('footer.monday')}:</span>
                <span className="font-medium">{t('footer.openingHours.monday')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('footer.tuesday')}:</span>
                <span className="font-medium">{t('footer.openingHours.tuesday')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('footer.wednesday')}:</span>
                <span className="font-medium">{t('footer.openingHours.wednesday')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('footer.thursday')}:</span>
                <span className="font-medium">{t('footer.openingHours.thursday')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('footer.friday')}:</span>
                <span className="font-medium">{t('footer.openingHours.friday')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('footer.saturday')}:</span>
                <span className="font-medium">{t('footer.openingHours.saturday')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('footer.sunday')}:</span>
                <span className="font-medium">{t('footer.openingHours.sunday')}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-onyx/70 backdrop-blur-sm p-6 border border-gold/30 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-heading text-gold mb-4">
              {t('footer.contact.title')}
            </h2>
            <div className="space-y-3 text-magnolia">
              <p>
                <span className="block text-sm text-gold/80">{t('footer.contact.phoneType')}</span>
                <a href="tel:+31612345678" className="hover:text-gold transition-colors">
                  {t('footer.contact.phone')}
                </a>
              </p>
              <p>
                <span className="block text-sm text-gold/80">{t('footer.contact.emailType')}</span>
                <a href="mailto:info@basebymonsees.nl" className="hover:text-gold transition-colors">
                  {t('footer.contact.email')}
                </a>
              </p>
              <p>
                <span className="block text-sm text-gold/80">Address</span>
                <span>{t('footer.address')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations; 