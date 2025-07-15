import React, { useState } from 'react';
import { Service, ServiceCategory } from '../../types';
import { services, serviceIcons } from '../../data';
import ServiceCard from '../ui/ServiceCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const ServiceGrid: React.FC = () => {
  const [filter, setFilter] = useState<ServiceCategory | 'all'>('all');
  const { t } = useLanguage();
  
  const filterCategories = [
    { id: 'all', name: t('services.all') },
    { id: 'home', name: t('services.home') },
    { id: 'office', name: t('services.office') },
    { id: 'event', name: t('services.event') },
    { id: 'garden', name: t('services.garden') },
    { id: 'elderly', name: t('services.elderly') },
    { id: 'laundry', name: t('services.laundry') },
  ];
  
  const filteredServices: Service[] = 
    filter === 'all' 
      ? services 
      : services.filter(service => service.category === filter);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('services.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        
        {/* Filter buttons */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex flex-nowrap justify-center space-x-2 pb-2">
            {filterCategories.map(category => {
              const Icon = category.id !== 'all' ? serviceIcons[category.id as ServiceCategory] : null;
              
              return (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition flex items-center ${
                    filter === category.id
                      ? 'bg-teal-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setFilter(category.id as ServiceCategory | 'all')}
                >
                  {Icon && <Icon size={16} className="mr-1" />}
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredServices.map(service => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;