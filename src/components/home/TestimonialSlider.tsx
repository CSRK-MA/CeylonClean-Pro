import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../../data';
import TestimonialCard from '../ui/TestimonialCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const { t } = useLanguage();
  
  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);
  
  const handlePrevClick = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNextClick = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  // Calculate average rating
  const averageRating = (
    testimonials.reduce((acc, item) => acc + item.rating, 0) / testimonials.length
  ).toFixed(1);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('testimonials.title')}</h2>
          <div className="flex justify-center items-center">
            <div className="bg-white px-4 py-1 rounded-full flex items-center shadow-sm">
              <span className="text-lg font-bold text-yellow-500 mr-1">{averageRating}</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(Number(averageRating)) 
                        ? 'text-yellow-500 fill-yellow-500' 
                        : 'text-gray-300 fill-gray-300'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">
                {t('testimonials.from')} {testimonials.length}+ {t('testimonials.reviews')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.3 }}
            >
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation buttons */}
          <button
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md text-gray-700 hover:text-teal-600 transition"
            onClick={handlePrevClick}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md text-gray-700 hover:text-teal-600 transition"
            onClick={handleNextClick}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        {/* Dot indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition ${
                currentIndex === index ? 'w-6 bg-teal-500' : 'w-2 bg-gray-300'
              }`}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;