import React, { useState } from 'react';
import { pricingData } from '../data';
import { ServiceCategory } from '../types';
import { Calculator, Clock, Info, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Pricing: React.FC = () => {
  const [calculatorData, setCalculatorData] = useState({
    service: 'home' as ServiceCategory,
    hours: 3,
    frequency: 'once',
  });
  
  const calculatePrice = () => {
    const baseRate = pricingData[calculatorData.service].hourlyRate;
    const hours = calculatorData.hours;
    let discount = 0;
    
    // Apply frequency discounts
    if (calculatorData.frequency === 'weekly') {
      discount = 0.1; // 10% discount
    } else if (calculatorData.frequency === 'monthly') {
      discount = 0.05; // 5% discount
    }
    
    return hours * baseRate * (1 - discount);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setCalculatorData(prev => ({
      ...prev,
      [name]: name === 'hours' ? parseInt(value) : value,
    }));
  };
  
  return (
    <div>
      {/* Page Header */}
      <div className="bg-teal-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Transparent Pricing</h1>
          <p className="max-w-2xl mx-auto">
            Simple, affordable rates for professional cleaning services throughout Sri Lanka.
          </p>
        </div>
      </div>
      
      {/* Pricing Tables */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Rates</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our pricing is transparent with no hidden fees. Choose hourly or daily rates based on your needs.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-teal-100">
                  <th className="border border-gray-200 px-6 py-3 text-left text-gray-800">Service</th>
                  <th className="border border-gray-200 px-6 py-3 text-center text-gray-800">Hourly Rate</th>
                  <th className="border border-gray-200 px-6 py-3 text-center text-gray-800">Daily Rate</th>
                  <th className="border border-gray-200 px-6 py-3 text-center text-gray-800">Est. Duration</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(pricingData).map(([key, data]) => (
                  <tr key={key} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-6 py-4 text-gray-700 font-medium capitalize">
                      {key} Cleaning
                    </td>
                    <td className="border border-gray-200 px-6 py-4 text-center text-gray-700">
                      Rs. {data.hourlyRate}/hr
                    </td>
                    <td className="border border-gray-200 px-6 py-4 text-center text-gray-700">
                      Rs. {data.dailyRate}
                    </td>
                    <td className="border border-gray-200 px-6 py-4 text-center text-gray-600">
                      {data.estimatedDuration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="flex items-center justify-center">
              <Info size={16} className="text-teal-600 mr-1" />
              <span>Transportation costs are included for locations within Colombo. Additional fees may apply for remote areas.</span>
            </p>
          </div>
        </div>
      </section>
      
      {/* Price Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 bg-teal-700 text-white">
              <div className="flex items-center">
                <Calculator size={24} className="mr-3" />
                <h2 className="text-2xl font-bold">Price Calculator</h2>
              </div>
              <p className="mt-2">Estimate the cost of your cleaning service</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Form inputs */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Service
                    </label>
                    <select
                      name="service"
                      value={calculatorData.service}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      {Object.keys(pricingData).map(key => (
                        <option key={key} value={key} className="capitalize">
                          {key} Cleaning
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (hours)
                    </label>
                    <input
                      type="range"
                      name="hours"
                      min="2"
                      max="8"
                      step="1"
                      value={calculatorData.hours}
                      onChange={handleChange}
                      className="w-full accent-teal-500"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>2 hours</span>
                      <span className="font-medium">{calculatorData.hours} hours</span>
                      <span>8 hours</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Frequency
                    </label>
                    <select
                      name="frequency"
                      value={calculatorData.frequency}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="once">One-time Service</option>
                      <option value="weekly">Weekly Service (10% discount)</option>
                      <option value="monthly">Monthly Service (5% discount)</option>
                    </select>
                  </div>
                </div>
                
                {/* Price calculation */}
                <div className="bg-gray-50 p-6 rounded-lg flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Estimate</h3>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service:</span>
                        <span className="font-medium capitalize">{calculatorData.service} Cleaning</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{calculatorData.hours} hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base Rate:</span>
                        <span className="font-medium">
                          Rs. {pricingData[calculatorData.service].hourlyRate}/hr
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Frequency:</span>
                        <span className="font-medium">
                          {calculatorData.frequency === 'once' ? 'One-time' : 
                           calculatorData.frequency === 'weekly' ? 'Weekly' : 'Monthly'}
                        </span>
                      </div>
                      
                      {calculatorData.frequency !== 'once' && (
                        <div className="flex justify-between text-teal-700">
                          <span>Discount:</span>
                          <span className="font-medium">
                            {calculatorData.frequency === 'weekly' ? '10%' : '5%'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800 font-medium">Estimated Total:</span>
                        <motion.span 
                          key={calculatePrice()}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-xl font-bold text-teal-700"
                        >
                          Rs. {calculatePrice().toLocaleString()}
                        </motion.span>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    to="/book"
                    className="mt-6 w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition font-medium text-center"
                  >
                    Book This Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Common Pricing Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get answers to frequently asked questions about our pricing structure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Are cleaning supplies included?</h3>
              <p className="text-gray-600">
                Yes, all standard cleaning supplies and equipment are included in our rates. If you have specific products you'd like us to use, please let us know in advance.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Do you charge for transportation?</h3>
              <p className="text-gray-600">
                Transportation costs are included for locations within Colombo and major cities. For remote areas, a small transportation fee may apply based on distance.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Are there any hidden fees?</h3>
              <p className="text-gray-600">
                No, we believe in transparent pricing. The rates you see are what you pay, with no hidden fees. Additional services will be quoted separately and require your approval.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Do you offer discounts?</h3>
              <p className="text-gray-600">
                Yes, we offer discounts for recurring bookings. Weekly bookings receive a 10% discount, and monthly bookings receive a 5% discount. New customers also receive a 10% discount on their first booking.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Package Deals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Package Deals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Save more with our special package deals for regular cleaning services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-blue-50 border-b">
                <h3 className="text-xl font-bold text-center text-blue-700">Basic Package</h3>
                <div className="text-center mt-4">
                  <span className="text-3xl font-bold text-gray-800">Rs. 8,000</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check size={18} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">4 hours of cleaning twice a month</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">General cleaning and dusting</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Bathroom and kitchen cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Floor cleaning and vacuuming</span>
                  </li>
                </ul>
                
                <Link
                  to="/book"
                  className="mt-6 block w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium text-center"
                >
                  Choose Basic
                </Link>
              </div>
            </div>
            
            {/* Premium Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform md:scale-105">
              <div className="p-6 bg-teal-50 border-b relative">
                <div className="absolute top-0 right-0 bg-teal-600 text-white text-xs px-3 py-1 transform translate-y-[-50%]">
                  POPULAR
                </div>
                <h3 className="text-xl font-bold text-center text-teal-700">Premium Package</h3>
                <div className="text-center mt-4">
                  <span className="text-3xl font-bold text-gray-800">Rs. 18,000</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">4 hours of cleaning once a week</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Deep cleaning of all areas</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Window and blind cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Appliance cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Priority scheduling</span>
                  </li>
                </ul>
                
                <Link
                  to="/book"
                  className="mt-6 block w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition font-medium text-center"
                >
                  Choose Premium
                </Link>
              </div>
            </div>
            
            {/* Elite Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 bg-purple-50 border-b">
                <h3 className="text-xl font-bold text-center text-purple-700">Elite Package</h3>
                <div className="text-center mt-4">
                  <span className="text-3xl font-bold text-gray-800">Rs. 35,000</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check size={18} className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">6 hours of cleaning twice a week</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Comprehensive deep cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Laundry and ironing included</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Carpet and upholstery cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Dedicated service manager</span>
                  </li>
                </ul>
                
                <Link
                  to="/book"
                  className="mt-6 block w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition font-medium text-center"
                >
                  Choose Elite
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;