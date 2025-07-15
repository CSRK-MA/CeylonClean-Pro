import React from 'react';
import { Testimonial } from '../../types';
import { Star } from 'lucide-react';
import { serviceIcons } from '../../data';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const Icon = serviceIcons[testimonial.category];
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={`${index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
      />
    ));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-500"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name} 
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
            <div className="flex items-center mt-1">
              <Icon size={14} className="text-teal-600 mr-1" />
              <span className="text-xs text-gray-600 capitalize">{testimonial.category} Service</span>
            </div>
          </div>
        </div>
        <div>
          <span className="text-xs text-gray-500">{testimonial.date}</span>
        </div>
      </div>
      
      <div className="flex mb-3">
        {renderStars(testimonial.rating)}
      </div>
      
      <p className="text-gray-700">
        "{testimonial.comment}"
      </p>
    </motion.div>
  );
};

export default TestimonialCard;