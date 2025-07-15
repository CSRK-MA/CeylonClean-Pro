import React from 'react';
import { Calendar, CheckCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-teal-900 flex items-center text-white">
      {/* Background overlay with video or image */}
      <div className="absolute inset-0 z-0 opacity-30">
        <img
          src="src\img\img_(4).png"
          alt="Cleaning service"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-teal-100 mb-6">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link 
                to="/book"
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-md transition font-medium text-center"
              >
                {t('hero.cta.book')}
              </Link>
              <Link 
                to="/pricing"
                className="bg-white text-teal-900 hover:bg-gray-100 px-6 py-3 rounded-md transition font-medium text-center"
              >
                {t('hero.cta.quote')}
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <CheckCircle size={20} className="text-teal-400 mr-2" />
                <span>{t('hero.feature.verified')}</span>
              </div>
              <div className="flex items-center">
                <Users size={20} className="text-teal-400 mr-2" />
                <span>{t('hero.feature.rated')}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={20} className="text-teal-400 mr-2" />
                <span>{t('hero.feature.flexible')}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white border-opacity-20">
              <h2 className="text-2xl font-semibold mb-4 text-center">Quick Booking</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Service Type</label>
                  <select className="w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="">Select a service</option>
                    <option value="home">Home Cleaning</option>
                    <option value="office">Office Cleaning</option>
                    <option value="event">Event Cleanup</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input 
                    type="date" 
                    className="w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input 
                    type="text" 
                    placeholder="Your address" 
                    className="w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                
                <Link
                  to="/book"
                  className="block w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-md transition font-medium text-center"
                >
                  Check Availability
                </Link>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="w-full h-16 md:h-24" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40.9998L60 43.7141C120 46.4285 240 51.8571 360 54.5714C480 57.2857 600 57.2857 720 54.5714C840 51.8571 960 46.4285 1080 43.7141C1200 40.9998 1320 40.9998 1380 40.9998H1440V73.9998H1380C1320 73.9998 1200 73.9998 1080 73.9998C960 73.9998 840 73.9998 720 73.9998C600 73.9998 480 73.9998 360 73.9998C240 73.9998 120 73.9998 60 73.9998H0V40.9998Z" fill="white"/>
        </svg>
      </div>
    </div>
  );
};

export default Hero;