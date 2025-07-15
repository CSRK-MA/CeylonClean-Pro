import React from 'react';
import ServiceGrid from '../components/home/ServiceGrid';
import { Link } from 'react-router-dom';
import { serviceIcons } from '../data';
import { Check } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-teal-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Our Cleaning & Maintenance Services</h1>
          <p className="max-w-2xl mx-auto">
            Browse our comprehensive range of professional cleaning services for homes, offices, and special events throughout Sri Lanka.
          </p>
        </div>
      </div>
      
      {/* Main Services Section */}
      <ServiceGrid />
      
      {/* Service Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our professional cleaning service stands out with these key benefits
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition">
              <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4">
                {React.createElement(serviceIcons.home, { size: 24 })}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Professional Staff</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Thoroughly vetted and background checked</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Professionally trained and certified</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Friendly, reliable, and punctual service</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition">
              <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4">
                {React.createElement(serviceIcons.office, { size: 24 })}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality Equipment</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Professional-grade cleaning equipment</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Eco-friendly and safe cleaning products</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Specialized tools for different surfaces</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition">
              <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4">
                {React.createElement(serviceIcons.event, { size: 24 })}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Flexible Scheduling</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">One-time, weekly, or monthly service options</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Weekend and evening availability</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Last-minute and emergency bookings</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition">
              <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4">
                {React.createElement(serviceIcons.garden, { size: 24 })}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Eco-Friendly Options</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Environmentally safe cleaning products</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Sustainable cleaning practices</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Reduced water and chemical waste</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition">
              <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4">
                {React.createElement(serviceIcons.elderly, { size: 24 })}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Satisfaction Guarantee</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">100% satisfaction guarantee on all services</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Free touch-ups if you're not completely satisfied</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Responsive customer support team</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition">
              <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4">
                {React.createElement(serviceIcons.laundry, { size: 24 })}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Comprehensive Coverage</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Service available throughout Sri Lanka</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Bonded and insured cleaning professionals</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Damage protection included with all services</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience the CeylonClean Pro Difference?</h2>
            <p className="text-gray-300 mb-8">
              Book our professional cleaning services today and enjoy a cleaner, healthier space without the hassle.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/book"
                className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-md transition font-medium"
              >
                Book Now
              </Link>
              <Link 
                to="/pricing"
                className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-md transition font-medium"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;