import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { workers } from '../../data';
import WorkerCard from '../ui/WorkerCard';
import { useLanguage } from '../../context/LanguageContext';

const WorkerPreview: React.FC = () => {
  const { t } = useLanguage();
  
  // Show only available workers
  const availableWorkers = workers.filter(worker => 
    worker.availability === 'Available Today' ||
    worker.availability === 'Booked Until 2PM'
  );
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('workers.title')}</h2>
            <p className="text-gray-600 max-w-2xl">
              {t('workers.subtitle')}
            </p>
          </div>
          <Link 
            to="/workers"
            className="flex items-center text-teal-600 font-medium hover:text-teal-700 transition mt-4 md:mt-0"
          >
            <span>{t('workers.viewAll')}</span>
            <ChevronRight size={18} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {availableWorkers.map(worker => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkerPreview;