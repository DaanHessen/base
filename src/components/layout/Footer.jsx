import React, { useState } from 'react';
import { FaInstagram } from 'react-icons/fa';
import monseesLogo from '../../assets/monsees.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // deal with this
    console.log('Form submitted:', { email, message });
    setSubmitted(true);
    setEmail('');
    setMessage('');
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <footer className="bg-dark text-pastel-dark py-5">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-pastel-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="leading-relaxed">Biersteeg 10, 1211 ED Hilversum, Netherlands</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-pastel-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+12 345 6789</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-0.5 text-pastel-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@base.nl</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-3">
              <p className="leading-relaxed">Woensdag - Zaterdag: 12:00 - 23:00</p>
            </div>
            
            <div className="flex space-x-4 mb-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pastel-light hover:text-accent transition-colors" aria-label="Instagram">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.brasseriemonsees.nl/" target="_blank" rel="noopener noreferrer" className="text-pastel-light hover:text-accent transition-colors" aria-label="Monsees">
                <img src={monseesLogo} alt="Monsees" className="h-6 w-auto" />
              </a>
            </div>

            <div>
              <h4 className="text-pastel-light text-lg font-heading mb-2">Contact</h4>
              {submitted ? (
                <p className="text-pastel-light">Bedankt voor je bericht!</p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Je e-mailadres"
                      required
                      className="w-full px-3 py-2 bg-gray-800 text-pastel-light border border-gray-700 rounded focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Je bericht"
                      required
                      rows={2}
                      className="w-full px-3 py-2 bg-gray-800 text-pastel-light border border-gray-700 rounded focus:outline-none focus:border-accent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded font-medium transition-colors"
                  >
                    Versturen
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-800 text-center md:text-left">
          <p className="text-sm">© {currentYear} BASE</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 