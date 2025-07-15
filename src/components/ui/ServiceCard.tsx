import React, { useState } from 'react';
import { Service } from '../../types';
import { Star } from 'lucide-react';
import { serviceIcons } from '../../data';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { useLanguage } from '../../context/LanguageContext';
import ServiceDetailsModal from './ServiceDetailsModal';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { setService } = useBooking();
  const { t } = useLanguage();
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const Icon = serviceIcons[service.category];
  
  const handleBookNow = () => {
    setService(service);
  };
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
              <Icon size={24} />
            </div>
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="ml-1 text-gray-700 font-medium">{service.rating}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.name}</h3>
          
          <div className="mb-3 text-sm text-gray-600">
            <div className="flex justify-between mb-1">
              <span>{t('common.price')}</span>
              <span className="font-medium">{service.priceRange}</span>
            </div>
            <div className="flex justify-between">
              <span>{t('common.duration')}</span>
              <span className="font-medium">{service.duration}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {service.description}
          </p>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsDetailsModalOpen(true)}
              className="text-teal-600 hover:text-teal-800 text-sm font-medium flex-1 py-2 border border-teal-600 rounded-md transition hover:bg-teal-50"
            >
              {t('services.viewDetails')}
            </button>
            <Link 
              to="/book" 
              className="bg-teal-600 text-white text-sm font-medium flex-1 py-2 rounded-md transition hover:bg-teal-700 text-center"
              onClick={handleBookNow}
            >
              {t('services.bookNow')}
            </Link>
          </div>
        </div>
      </motion.div>
      
      {/* Service Details Modal */}
      <ServiceDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        service={service}
      />
    </>
  );
};

export default ServiceCard;