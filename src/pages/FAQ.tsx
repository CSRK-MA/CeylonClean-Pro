import React from 'react';
import FAQItem from '../components/ui/FAQItem';
import { faqs } from '../data';
import { ArrowRight, Book, FileText, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ: React.FC = () => {
  // Group FAQs into categories for organization
  const categories = [
    {
      name: 'General Questions',
      faqs: faqs.slice(0, 2), // First 2 FAQs
    },
    {
      name: 'Booking & Scheduling',
      faqs: faqs.slice(2, 4), // Next 2 FAQs
    },
    {
      name: 'Staff & Security',
      faqs: faqs.slice(4), // Remaining FAQs
    },
  ];
  
  return (
    <div>
      {/* Page Header */}
      <div className="bg-teal-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="max-w-2xl mx-auto">
            Find answers to common questions about our cleaning services.
          </p>
        </div>
      </div>
      
      {/* FAQ Sections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {categories.map((category, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{category.name}</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {category.faqs.map((faq, faqIndex) => (
                    <FAQItem key={faqIndex} faq={faq} />
                  ))}
                </div>
              </div>
            ))}
            
            {/* Can't find answer section */}
            <div className="bg-gray-50 rounded-lg p-6 mt-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Can't find the answer you're looking for?
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Contact our friendly customer support team for personalized assistance
              </p>
              <div className="flex justify-center">
                <Link 
                  to="/contact"
                  className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition font-medium flex items-center"
                >
                  Contact Us <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Resources Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Helpful Resources</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Download our guides and resources to learn more about our services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Resource 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="p-6">
                <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Book size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Cleaning Service Guide
                </h3>
                <p className="text-gray-600 mb-4">
                  A comprehensive guide to our cleaning services, procedures, and what to expect.
                </p>
                <button className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition">
                  <Download size={18} className="mr-1" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
            
            {/* Resource 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="p-6">
                <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4">
                  <FileText size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Safety Guidelines
                </h3>
                <p className="text-gray-600 mb-4">
                  Our health and safety protocols for COVID-19 and general cleaning procedures.
                </p>
                <button className="flex items-center text-teal-600 font-medium hover:text-teal-700 transition">
                  <Download size={18} className="mr-1" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
            
            {/* Resource 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="p-6">
                <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Book size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Pricing Information
                </h3>
                <p className="text-gray-600 mb-4">
                  Detailed information about our pricing structure, packages, and special discounts.
                </p>
                <button className="flex items-center text-purple-600 font-medium hover:text-purple-700 transition">
                  <Download size={18} className="mr-1" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;