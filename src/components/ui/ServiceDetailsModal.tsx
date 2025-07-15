import React from 'react';
import { X, Star, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '../../types';
import { serviceIcons } from '../../data';
import { Link } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';

interface ServiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({ isOpen, onClose, service }) => {
  const { setService } = useBooking();
  
  if (!service) return null;
  
  const Icon = serviceIcons[service.category];
  
  // Service-specific details
  const getServiceDetails = (service: Service) => {
    const baseDetails = {
      included: [
        'Professional cleaning supplies included',
        'Fully trained and vetted staff',
        'Flexible scheduling options',
        'Satisfaction guarantee',
        'Insurance coverage included'
      ],
      process: [
        'Initial consultation and assessment',
        'Customized cleaning plan creation',
        'Professional service execution',
        'Quality inspection and feedback'
      ]
    };
    
    switch (service.category) {
      case 'home':
        return {
          ...baseDetails,
          included: [
            ...baseDetails.included,
            'Dusting of all surfaces and furniture',
            'Vacuuming and mopping floors',
            'Bathroom deep cleaning and sanitization',
            'Kitchen cleaning including appliances',
            'Trash removal and organization'
          ],
          specialFeatures: [
            'Eco-friendly cleaning products available',
            'Pet-safe cleaning options',
            'Same-day service available',
            'Weekly/monthly packages with discounts'
          ]
        };
      case 'office':
        return {
          ...baseDetails,
          included: [
            ...baseDetails.included,
            'Desk and workstation cleaning',
            'Conference room sanitization',
            'Restroom deep cleaning',
            'Kitchen/break room maintenance',
            'Floor care and waste management'
          ],
          specialFeatures: [
            'After-hours cleaning available',
            'Customizable cleaning schedules',
            'Corporate packages available',
            'Emergency cleaning services'
          ]
        };
      case 'event':
        return {
          ...baseDetails,
          included: [
            ...baseDetails.included,
            'Pre-event setup cleaning',
            'During-event maintenance',
            'Post-event comprehensive cleanup',
            'Waste removal and disposal',
            'Venue restoration'
          ],
          specialFeatures: [
            '24/7 emergency response',
            'Large venue experience',
            'Specialized event equipment',
            'Coordination with event planners'
          ]
        };
      case 'garden':
        return {
          ...baseDetails,
          included: [
            ...baseDetails.included,
            'Lawn mowing and edging',
            'Plant care and watering',
            'Weeding and pruning',
            'Garden waste removal',
            'Basic landscaping maintenance'
          ],
          specialFeatures: [
            'Seasonal garden preparation',
            'Plant health consultation',
            'Organic gardening options',
            'Irrigation system maintenance'
          ]
        };
      case 'elderly':
        return {
          ...baseDetails,
          included: [
            ...baseDetails.included,
            'Gentle and compassionate care',
            'Light housekeeping tasks',
            'Meal preparation assistance',
            'Medication reminders',
            'Companionship and conversation'
          ],
          specialFeatures: [
            'Certified elderly care specialists',
            'Family communication updates',
            'Emergency response protocols',
            'Flexible care schedules'
          ]
        };
      case 'laundry':
        return {
          ...baseDetails,
          included: [
            ...baseDetails.included,
            'Washing and drying services',
            'Professional ironing and pressing',
            'Fabric care and treatment',
            'Stain removal expertise',
            'Folding and organization'
          ],
          specialFeatures: [
            'Delicate fabric specialists',
            'Pickup and delivery service',
            'Same-day turnaround available',
            'Dry cleaning partnerships'
          ]
        };
      default:
        return baseDetails;
    }
  };
  
  const serviceDetails = getServiceDetails(service);
  
  const handleBookNow = () => {
    setService(service);
    onClose();
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <div className="h-16 w-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-4">
                    <Icon size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{service.name}</h2>
                    <div className="flex items-center mt-1">
                      <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-gray-700 font-medium">{service.rating}</span>
                      <span className="text-gray-500 ml-1">rating</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Service Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center">
                  <DollarSign size={20} className="text-teal-600 mr-2" />
                  <div>
                    <span className="text-sm text-gray-600">Price Range</span>
                    <div className="font-medium text-gray-800">{service.priceRange}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock size={20} className="text-teal-600 mr-2" />
                  <div>
                    <span className="text-sm text-gray-600">Duration</span>
                    <div className="font-medium text-gray-800">{service.duration}</div>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Service Description</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
              
              {/* What's Included */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">What's Included</h3>
                <div className="grid grid-cols-1 gap-2">
                  {serviceDetails.included.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle size={16} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Special Features */}
              {serviceDetails.specialFeatures && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Special Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {serviceDetails.specialFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle size={16} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Service Process */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Our Process</h3>
                <div className="space-y-3">
                  {serviceDetails.process.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="h-6 w-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-600">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 transition border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
                <Link
                  to="/book"
                  onClick={handleBookNow}
                  className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition font-medium text-center"
                >
                  Book This Service
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceDetailsModal;