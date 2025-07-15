import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-blue-400">Ceylon</span>
              <span className="text-teal-400">Clean</span>
              <span className="text-green-400 text-sm ml-1">Pro</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Premium cleaning and maintenance services across Sri Lanka. Professional, reliable, and trusted by thousands.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-teal-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-teal-400">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-teal-400 transition">{t('nav.services')}</Link>
              </li>
              <li>
                <Link to="/book" className="text-gray-300 hover:text-teal-400 transition">{t('nav.book')}</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-teal-400 transition">{t('nav.pricing')}</Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-300 hover:text-teal-400 transition">{t('nav.testimonials')}</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-teal-400 transition">{t('nav.faq')}</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-teal-400">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-teal-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Main Street, Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-teal-400 flex-shrink-0" />
                <span className="text-gray-300">+94 11 234 5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-teal-400 flex-shrink-0" />
                <a href="mailto:info@ceyloncleanpro.lk" className="text-gray-300 hover:text-teal-400 transition">
                  info@ceyloncleanpro.lk
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-teal-400">{t('footer.newsletter')}</h4>
            <p className="text-gray-300 mb-3">{t('footer.newsletterDesc')}</p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-teal-400"
              />
              <button 
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded transition"
              >
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* Language and copyright */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center md:items-start text-sm text-gray-400">
          {/* Left side: copyright */}
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} CeylonClean Pro. {t('footer.copyright')}
          </div>

          {/* Right side: Business registration */}
          <div className="mt-1 md:mt-0 text-center md:text-right">
            <span>{t('footer.businessReg')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;