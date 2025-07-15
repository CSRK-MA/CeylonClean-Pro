import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const headerClasses = `
    fixed top-0 w-full z-50 transition-all duration-300 
    ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}
  `;

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.workers'), path: '/workers' },
    { name: t('nav.pricing'), path: '/pricing' },
    { name: t('nav.testimonials'), path: '/testimonials' },
    { name: t('nav.faq'), path: '/faq' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold flex items-center text-teal-600"
        >
          <span className="text-blue-500">Ceylon</span>
          <span className="text-teal-500">Clean</span>
          <span className="text-green-500 text-sm ml-1">Pro</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6">
            {navLinks.map(link => (
              <li key={link.name}>
                <Link 
                  to={link.path}
                  className={`font-medium transition hover:text-teal-500 
                    ${scrolled ? 'text-gray-800' : 'text-gray-100'}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick contact info and language switcher for desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          <a 
            href="tel:+94112345678"
            className={`flex items-center space-x-1 font-medium transition hover:text-teal-500 
              ${scrolled ? 'text-gray-800' : 'text-gray-100'}`}
          >
            <Phone size={16} />
            <span>+94 11 234 5678</span>
          </a>
          <Link
            to="/book" 
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
          >
            {t('nav.book')}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-teal-500"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile navigation drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-0 bg-white z-40 md:hidden pt-16"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col h-full">
              <nav className="flex-1">
                <ul className="flex flex-col space-y-6">
                  {navLinks.map(link => (
                    <li key={link.name}>
                      <Link 
                        to={link.path}
                        className="text-xl font-medium text-gray-800 hover:text-teal-500 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="mb-4">
                  <LanguageSwitcher />
                </div>
                <Link
                  to="/book" 
                  className="block w-full bg-teal-500 text-white text-center px-4 py-3 rounded-md hover:bg-teal-600 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {t('nav.book')}
                </Link>
                <div className="flex justify-between mt-4">
                  <a 
                    href="tel:+94112345678"
                    className="flex items-center space-x-2 text-gray-800"
                  >
                    <Phone size={18} />
                    <span>Call Us</span>
                  </a>
                  <a 
                    href="https://wa.me/94112345678"
                    className="flex items-center space-x-2 text-gray-800"
                  >
                    <MessageCircle size={18} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;