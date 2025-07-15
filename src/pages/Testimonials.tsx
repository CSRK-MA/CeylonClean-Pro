import React, { useState } from 'react';
import { testimonials } from '../data';
import TestimonialCard from '../components/ui/TestimonialCard';
import ReviewModal from '../components/ui/ReviewModal';
import { ServiceCategory } from '../types';
import { Star, MessageSquare } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [filter, setFilter] = useState<ServiceCategory | 'all'>('all');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  
  const filterCategories = [
    { id: 'all', name: 'All Reviews' },
    { id: 'home', name: 'Home Cleaning' },
    { id: 'office', name: 'Office Cleaning' },
    { id: 'event', name: 'Event Cleanup' },
    { id: 'garden', name: 'Garden Maintenance' },
    { id: 'elderly', name: 'Elderly Help' },
    { id: 'laundry', name: 'Laundry & Ironing' },
  ];
  
  const filteredTestimonials = filter === 'all'
    ? testimonials
    : testimonials.filter(testimonial => testimonial.category === filter);
  
  // Calculate average rating
  const averageRating = (
    testimonials.reduce((acc, item) => acc + item.rating, 0) / testimonials.length
  ).toFixed(1);
  
  // Rating distribution (for demo purposes)
  const ratingDistribution = {
    5: 75,
    4: 20,
    3: 5,
    2: 0,
    1: 0,
  };
  
  return (
    <div>
      {/* Page Header */}
      <div className="bg-teal-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Customer Testimonials</h1>
          <p className="max-w-2xl mx-auto mb-6">
            See what our satisfied customers have to say about our cleaning services.
          </p>
          
          <div className="flex justify-center items-center">
            <div className="bg-white text-gray-800 px-5 py-2 rounded-full flex items-center shadow-md">
              <span className="text-xl font-bold text-yellow-500 mr-2">{averageRating}</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
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
              <span className="text-gray-600 ml-2">
                based on {testimonials.length}+ reviews
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter and Rating Summary */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Rating summary - left column on desktop */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Rating Summary</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-800">{averageRating}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={`${
                          i < Math.floor(Number(averageRating)) 
                            ? 'text-yellow-500 fill-yellow-500' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">
                  {testimonials.length}+ verified customer reviews
                </p>
                
                {/* Rating bars */}
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center mb-2">
                    <div className="flex items-center w-16">
                      <span className="mr-1">{rating}</span>
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                      <div 
                        className="h-2 bg-yellow-400 rounded-full"
                        style={{ width: `${ratingDistribution[rating as keyof typeof ratingDistribution]}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8 text-right">
                      {ratingDistribution[rating as keyof typeof ratingDistribution]}%
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Leave a review section */}
              <div className="mt-6 bg-teal-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-teal-700 flex items-center">
                  <MessageSquare size={18} className="mr-2" />
                  Share Your Experience
                </h3>
                <p className="text-gray-600 mt-2 mb-4">
                  We value your feedback! Let us know about your experience with our cleaning services.
                </p>
                <button 
                  onClick={() => setIsReviewModalOpen(true)}
                  className="block w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition font-medium text-center"
                >
                  Write a Review
                </button>
              </div>
            </div>
            
            {/* Filter and testimonials - right columns on desktop */}
            <div className="lg:col-span-2">
              {/* Filter buttons */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Reviews</h2>
                <div className="flex flex-wrap gap-2">
                  {filterCategories.map(category => (
                    <button
                      key={category.id}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        filter === category.id
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setFilter(category.id as ServiceCategory | 'all')}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Testimonial cards */}
              <div className="space-y-6">
                {filteredTestimonials.length > 0 ? (
                  filteredTestimonials.map(testimonial => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                  ))
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">
                      No reviews found for this category.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Review Quote */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="text-6xl text-teal-400 font-serif mb-6">"</div>
            <p className="text-xl md:text-2xl text-gray-700 mb-6">
              I've tried many cleaning services in Colombo, but CeylonClean Pro is by far the best. Their attention to detail is impressive, and the staff is always professional and friendly. My home has never been cleaner!
            </p>
            <div className="flex items-center justify-center">
              <img 
                src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Testimonial" 
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div className="text-left">
                <p className="font-medium text-gray-800">Tharushi W.</p>
                <p className="text-gray-600">Colombo</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Satisfied Customers Today</h2>
          <p className="max-w-2xl mx-auto mb-8 text-teal-100">
            Experience the CeylonClean Pro difference with our premium cleaning services. Book now and let us exceed your expectations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-teal-700 hover:bg-gray-100 px-6 py-3 rounded-md transition font-medium">
              Book a Cleaning
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white hover:text-teal-700 px-6 py-3 rounded-md transition font-medium">
              View Our Services
            </button>
          </div>
        </div>
      </section>
      
      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  );
};

export default Testimonials;