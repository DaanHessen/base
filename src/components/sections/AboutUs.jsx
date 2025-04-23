import React from 'react';

const AboutUs = () => {
  return (
    <section className="min-h-screen py-10 pt-36">
      <div className="max-w-screen-xl mx-auto px-6">
        <h1 className="text-5xl font-heading font-bold text-center text-white mb-12">Over Ons</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-8 hover:border-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-accent mb-6 border-b border-gray-800 pb-3">
              Lorem Ipsum
            </h2>
            <p className="text-gray-300 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum, quam at 
              faucibus semper, nulla enim fermentum metus, non cursus mauris dolor ut urna. 
              Nullam id pharetra mauris, sit amet euismod turpis.
            </p>
            <p className="text-gray-300">
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
              Nunc dignissim nibh est, non molestie libero egestas at.
            </p>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-8 hover:border-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-accent mb-6 border-b border-gray-800 pb-3">
              Lorem Ipsum
            </h2>
            <p className="text-gray-300 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum, quam at 
              faucibus semper, nulla enim fermentum metus, non cursus mauris dolor ut urna. 
              Nullam id pharetra mauris, sit amet euismod turpis.
            </p>
            <p className="text-gray-300">
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
              Nunc dignissim nibh est, non molestie libero egestas at.
            </p>
          </div>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-8 hover:border-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold text-accent mb-6 border-b border-gray-800 pb-3">
              Lorem Ipsum
            </h2>
            <p className="text-gray-300 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum, quam at 
              faucibus semper, nulla enim fermentum metus, non cursus mauris dolor ut urna. 
              Nullam id pharetra mauris, sit amet euismod turpis.
            </p>
            <div className="flex flex-col md:flex-row md:justify-between gap-6">
              <div>
                <h3 className="text-white text-lg font-medium mb-2">Adres</h3>
                <p className="text-gray-300">Biersteeg 10</p>
                <p className="text-gray-300">1211 ED Hilversum</p>
              </div>
              <div>
                <h3 className="text-white text-lg font-medium mb-2">Openingstijden</h3>
                <p className="text-gray-300">Woensdag - Zaterdag: 12:00 - 23:00</p>
                <p className="text-gray-300">Zondag - Dinsdag: Gesloten</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs; 