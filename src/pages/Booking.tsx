import React from 'react';
import AdvancedBookingForm from '../components/booking/AdvancedBookingForm';
import { Clock, Calendar, CreditCard, Percent, Shield, Users, CheckCircle } from 'lucide-react';

const Booking: React.FC = () => {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-teal-700 text-white py-24">
        <div className="container mx-auto px-2 text-center">
          <h1 className="text-4xl font-bold mb-4">Professional Cleaning Services</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Book flexible cleaning contracts from 1-7 days with customizable pricing and scheduling up to 6 months in advance
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center">
              <CheckCircle size={16} className="mr-2 text-teal-300" />
              <span>Flexible Duration (1-7 days)</span>
            </div>
            <div className="flex items-center">
              <CheckCircle size={16} className="mr-2 text-teal-300" />
              <span>Book 6 Months Ahead</span>
            </div>
            <div className="flex items-center">
              <CheckCircle size={16} className="mr-2 text-teal-300" />
              <span>Real-time Pricing</span>
            </div>
            <div className="flex items-center">
              <CheckCircle size={16} className="mr-2 text-teal-300" />
              <span>Multiple Service Categories</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Booking Form Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <AdvancedBookingForm />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Booking System?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our advanced booking platform offers unmatched flexibility and transparency
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-100">
              <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-4">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Flexible Scheduling</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Book 1-7 consecutive days</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Schedule up to 6 months in advance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Real-time availability checking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-teal-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Weekend and holiday options</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Customizable Teams</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Choose number of employees (1-10)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Adjust working hours per day</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Specialized service categories</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Professional, vetted staff</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-100">
              <div className="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <CreditCard size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Transparent Pricing</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Real-time cost calculation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Adjustable hourly rates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>No hidden fees or charges</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Detailed cost breakdown</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Duration</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Minimum 1 day contracts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Maximum 7 day contracts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Consecutive working days</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Flexible daily hours</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
              <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Percent size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Smart Pricing</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Category-based base rates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Volume discounts available</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Seasonal pricing adjustments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Competitive market rates</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-100">
              <div className="h-12 w-12 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality Assurance</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                  <span>100% satisfaction guarantee</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Fully insured services</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Background-checked staff</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Quality monitoring system</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Formula Section */}
      <section className="py-16 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Transparent Pricing Formula</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our pricing is completely transparent with real-time calculations
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-teal-700 mb-4">Total Cost Calculation</h3>
              <div className="bg-gradient-to-r from-teal-100 to-blue-100 p-6 rounded-lg">
                <div className="text-xl font-bold text-blue-800 mb-2">
                  Total = Hourly Rate × Employees × Hours/Day × Days + Tax
                </div>
                <p className="text-gray-600">All costs update in real-time as you make selections</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-teal-50 rounded-lg">
                <div className="text-2xl font-bold text-teal-700 mb-2">Rs. 500-1,500</div>
                <div className="text-sm text-gray-600">Hourly Rate Range</div>
                <div className="text-xs text-gray-500 mt-1">Varies by service category</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-700 mb-2">1-10</div>
                <div className="text-sm text-gray-600">Number of Employees</div>
                <div className="text-xs text-gray-500 mt-1">Customizable team size</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-700 mb-2">1-12</div>
                <div className="text-sm text-gray-600">Hours per Day</div>
                <div className="text-xs text-gray-500 mt-1">Flexible daily duration</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-700 mb-2">1-7</div>
                <div className="text-sm text-gray-600">Number of Days</div>
                <div className="text-xs text-gray-500 mt-1">Consecutive service days</div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">Example Calculation:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• Home Cleaning: Rs. 800/hour × 2 employees × 4 hours × 3 days = Rs. 19,200</div>
                <div>• Tax (15%): Rs. 2,880</div>
                <div className="font-semibold text-teal-700">• Total: Rs. 22,080</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;