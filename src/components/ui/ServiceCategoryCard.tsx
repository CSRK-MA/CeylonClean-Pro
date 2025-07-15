import React from 'react';
import { ServiceCategory } from '../../types/booking';
import { getServiceCategoryIcon } from '../../data/serviceCategories';
import { CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceCategoryCardProps {
  category: ServiceCategory;
  isSelected: boolean;
  onClick: () => void;
}

const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({
  category,
  isSelected,
  onClick,
}) => {
  const IconComponent = getServiceCategoryIcon(category.icon);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative border rounded-xl p-6 cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'border-teal-500 bg-teal-50 shadow-lg ring-2 ring-teal-200'
          : 'border-gray-200 hover:border-teal-300 hover:shadow-md bg-white'
      }`}
      onClick={onClick}
    >
      {category.isPopular && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
          🔥 Popular
        </div>
      )}
      
      <div className="flex items-start space-x-4">
        <div className={`h-14 w-14 rounded-xl flex items-center justify-center transition-colors ${
          isSelected 
            ? 'bg-teal-100 text-teal-600' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          <IconComponent size={28} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-800 text-lg">{category.name}</h3>
            {category.isPopular && (
              <div className="flex items-center">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="text-xs text-yellow-600 ml-1">Top Choice</span>
              </div>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            {category.description}
          </p>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="text-lg font-bold text-teal-600">
                Rs. {category.baseHourlyRate.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">per hour</div>
            </div>
            
            <div className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="text-lg font-bold text-blue-600">
                {category.minHours}-{category.maxHours}h
              </div>
              <div className="text-xs text-gray-500">duration range</div>
            </div>
          </div>
        </div>
      </div>

      {isSelected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-teal-200"
        >
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <CheckCircle size={16} className="text-teal-500 mr-2" />
            What's Included:
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {category.features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle size={14} className="text-teal-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-xs text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-3 p-3 bg-teal-50 rounded-lg">
            <div className="text-xs text-teal-700">
              <strong>Default Setup:</strong> {category.defaultHours} hours per day
            </div>
          </div>
        </motion.div>
      )}
      
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="h-6 w-6 bg-teal-500 text-white rounded-full flex items-center justify-center">
            <CheckCircle size={16} />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ServiceCategoryCard;