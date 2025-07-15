import React from 'react';
import ContactForm from '../components/contact/ContactForm';

const Contact: React.FC = () => {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-teal-700 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="max-w-2xl mx-auto">
            Have questions or need a custom quote? We're here to help. Reach out to our team.
          </p>
        </div>
      </div>
      
      {/* Contact Form Section */}
      <ContactForm />
      
      {/* Branch Locations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Locations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit one of our offices across Sri Lanka or reach out to our local teams
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Colombo */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Colombo (Head Office)</h3>
              <address className="not-italic text-gray-600 mb-4">
                123 Main Street<br />
                Colombo 03<br />
                Sri Lanka
              </address>
              <div className="text-gray-700">
                <p>Tel: +94 11 234 5678</p>
                <p>Email: colombo@ceyloncleanpro.lk</p>
              </div>
              <div className="mt-4">
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Open 7 days (8AM - 8PM)
                </span>
              </div>
            </div>
            
            {/* Kandy */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Kandy</h3>
              <address className="not-italic text-gray-600 mb-4">
                45 Hill Street<br />
                Kandy<br />
                Sri Lanka
              </address>
              <div className="text-gray-700">
                <p>Tel: +94 81 234 5678</p>
                <p>Email: kandy@ceyloncleanpro.lk</p>
              </div>
              <div className="mt-4">
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Mon-Sat (9AM - 6PM)
                </span>
              </div>
            </div>
            
            {/* Galle */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Galle</h3>
              <address className="not-italic text-gray-600 mb-4">
                78 Fort Road<br />
                Galle<br />
                Sri Lanka
              </address>
              <div className="text-gray-700">
                <p>Tel: +94 91 234 5678</p>
                <p>Email: galle@ceyloncleanpro.lk</p>
              </div>
              <div className="mt-4">
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Mon-Sat (9AM - 6PM)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Emergency Service */}
      <section className="py-12 bg-red-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-red-700 mb-4">Emergency Cleaning Service</h2>
            <p className="text-gray-700 mb-6">
              Need urgent cleaning? Our emergency team is available 24/7 for water damage, post-event cleanup, and other urgent requirements.
            </p>
            <div className="text-xl font-bold text-red-700">
              Hotline: +94 777 123 456
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;