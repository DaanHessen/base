import React from 'react';

const Contact = () => {
  return (
    <section className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-pastel-light mb-10 text-center">Contact</h1>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-pastel-light mb-6">Contactgegevens</h2>
            <p className="text-pastel-dark mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus efficitur risus vel sapien 
              euismod, eget sollicitudin nunc viverra.
            </p>
            
            <div className="mb-6">
              <h3 className="text-xl font-medium text-pastel-light mb-2">Adres</h3>
              <p className="text-pastel-dark">
                Biersteeg 10<br />
                1211 ED Hilversum<br />
                Netherlands
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-medium text-pastel-light mb-2">Openingstijden</h3>
              <p className="text-pastel-dark">
                Woensdag - Zaterdag: 12:00 - 23:00
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-pastel-light mb-2">Contact</h3>
              <p className="text-pastel-dark">
                Telefoon: +12 345 6789<br />
                Email: info@base.nl
              </p>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-pastel-light mb-6">Stuur een Bericht</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-pastel-dark mb-2">Naam</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-gray-900/70 text-pastel-light border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-pastel-dark mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-gray-900/70 text-pastel-light border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-pastel-dark mb-2">Bericht</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="w-full bg-gray-900/70 text-pastel-light border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-accent"
                ></textarea>
              </div>
              
              <button type="submit" className="px-6 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded transition-all shadow-md hover:shadow-lg w-full">
                Versturen
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 