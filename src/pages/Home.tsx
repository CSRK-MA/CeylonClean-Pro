import React from 'react';
import Hero from '../components/home/Hero';
import ServiceGrid from '../components/home/ServiceGrid';
import WorkerPreview from '../components/home/WorkerPreview';
import TestimonialSlider from '../components/home/TestimonialSlider';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <Hero />
      <ServiceGrid />
      <WorkerPreview />
      
      {/* How it works section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('howItWorks.title')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('howItWorks.step1.title')}</h3>
              <p className="text-gray-600">
                {t('howItWorks.step1.desc')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('howItWorks.step2.title')}</h3>
              <p className="text-gray-600">
                {t('howItWorks.step2.desc')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('howItWorks.step3.title')}</h3>
              <p className="text-gray-600">
                {t('howItWorks.step3.desc')}
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/book"
              className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 transition"
            >
              <span>Book Your Cleaning Service Now</span>
              <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>
      
      <TestimonialSlider />
      
      {/* CTA section */}
      <section className="py-16 bg-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
          <p className="max-w-2xl mx-auto mb-8 text-teal-100">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/book"
              className="bg-white text-teal-700 hover:bg-gray-100 px-6 py-3 rounded-md transition font-medium"
            >
              {t('cta.book')}
            </Link>
            <Link 
              to="/contact"
              className="bg-transparent border border-white text-white hover:bg-white hover:text-teal-700 px-6 py-3 rounded-md transition font-medium"
            >
              {t('cta.contact')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;