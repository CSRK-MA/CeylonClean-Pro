import React from 'react';
import { Worker } from '../../types';
import { Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { useLanguage } from '../../context/LanguageContext';

interface WorkerCardProps {
  worker: Worker;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => {
  const { setWorker } = useBooking();
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <img 
          src={worker.avatar} 
          alt={worker.name} 
          className="w-full h-48 object-cover"
        />
        <div 
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
            worker.availability === 'Available Today' 
              ? 'bg-green-500 text-white' 
              : worker.availability === 'Booked Until 2PM'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-500 text-white'
          }`}
        >
          {worker.availability}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{worker.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={14} className="mr-1" />
          <span className="text-sm">{worker.location}</span>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-gray-700 font-medium">{worker.rating}</span>
          </div>
          <span className="text-gray-500 text-sm ml-1">({worker.reviews} reviews)</span>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">{t('workers.specializes')}</h4>
          <div className="flex flex-wrap gap-2">
            {worker.skills.map(skill => (
              <span 
                key={skill} 
                className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded-full capitalize"
              >
                {skill} Cleaning
              </span>
            ))}
          </div>
        </div>
        
        <Link 
          to="/book" 
          className="block w-full bg-teal-600 text-white text-center py-2 rounded-md transition hover:bg-teal-700"
          onClick={() => setWorker(worker)}
        >
          {t('workers.book')} {worker.name}
        </Link>
      </div>
    </motion.div>
  );
};

export default WorkerCard;