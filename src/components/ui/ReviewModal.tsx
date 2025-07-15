import React, { useState } from 'react';
import { X, Star, Send, Upload, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceCategory } from '../../types';
import { reviewService } from '../../services/reviewService';
import { toast } from 'react-hot-toast';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId?: string;
  prefilledData?: {
    serviceCategory?: ServiceCategory;
    workerName?: string;
  };
}

const ReviewModal: React.FC<ReviewModalProps> = ({ 
  isOpen, 
  onClose, 
  bookingId,
  prefilledData 
}) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    serviceCategory: prefilledData?.serviceCategory || 'home' as ServiceCategory,
    rating: 0,
    comment: '',
    workerRating: 0,
    serviceRating: 0,
  });
  
  const [photos, setPhotos] = useState<File[]>([]);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [hoveredWorkerRating, setHoveredWorkerRating] = useState(0);
  const [hoveredServiceRating, setHoveredServiceRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRatingClick = (rating: number, type: 'overall' | 'worker' | 'service') => {
    if (type === 'overall') {
      setFormData(prev => ({ ...prev, rating }));
    } else if (type === 'worker') {
      setFormData(prev => ({ ...prev, workerRating: rating }));
    } else if (type === 'service') {
      setFormData(prev => ({ ...prev, serviceRating: rating }));
    }
  };
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      
      if (!isValidType) {
        toast.error(`${file.name} is not a valid image file`);
        return false;
      }
      
      if (!isValidSize) {
        toast.error(`${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      
      return true;
    });
    
    setPhotos(prev => [...prev, ...validFiles].slice(0, 5)); // Max 5 photos
  };
  
  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      toast.error('Please select an overall rating');
      return;
    }
    
    if (!formData.customerName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    if (!formData.customerEmail.trim()) {
      toast.error('Please enter your email');
      return;
    }
    
    if (!formData.comment.trim()) {
      toast.error('Please write a review comment');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await reviewService.createReview({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        serviceCategory: formData.serviceCategory,
        rating: formData.rating,
        comment: formData.comment,
        bookingId,
        workerRating: formData.workerRating || undefined,
        serviceRating: formData.serviceRating || undefined,
        photos: photos.length > 0 ? photos : undefined,
      });
      
      toast.success('Thank you for your review! It will be published after moderation.');
      handleClose();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleClose = () => {
    setFormData({
      customerName: '',
      customerEmail: '',
      serviceCategory: 'home',
      rating: 0,
      comment: '',
      workerRating: 0,
      serviceRating: 0,
    });
    setPhotos([]);
    onClose();
  };
  
  const renderStarRating = (
    rating: number,
    hoveredRating: number,
    onRate: (rating: number) => void,
    onHover: (rating: number) => void,
    onLeave: () => void,
    label: string
  ) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} *
      </label>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none"
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={onLeave}
          >
            <Star
              size={24}
              className={`transition-colors ${
                star <= (hoveredRating || rating)
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {rating > 0 && `${rating} star${rating > 1 ? 's' : ''}`}
        </span>
      </div>
    </div>
  );
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Write a Review</h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 transition"
                  disabled={isSubmitting}
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Category *
                  </label>
                  <select
                    name="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting || !!prefilledData?.serviceCategory}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="home">Home Cleaning</option>
                    <option value="office">Office Cleaning</option>
                    <option value="event">Event Cleanup</option>
                    <option value="garden">Garden Maintenance</option>
                    <option value="elderly">Elderly Assistance</option>
                    <option value="laundry">Laundry & Ironing</option>
                  </select>
                </div>
                
                {renderStarRating(
                  formData.rating,
                  hoveredRating,
                  (rating) => handleRatingClick(rating, 'overall'),
                  setHoveredRating,
                  () => setHoveredRating(0),
                  'Overall Rating'
                )}
                
                {bookingId && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderStarRating(
                      formData.workerRating,
                      hoveredWorkerRating,
                      (rating) => handleRatingClick(rating, 'worker'),
                      setHoveredWorkerRating,
                      () => setHoveredWorkerRating(0),
                      'Worker Performance'
                    )}
                    
                    {renderStarRating(
                      formData.serviceRating,
                      hoveredServiceRating,
                      (rating) => handleRatingClick(rating, 'service'),
                      setHoveredServiceRating,
                      () => setHoveredServiceRating(0),
                      'Service Quality'
                    )}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review *
                  </label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    required
                    rows={4}
                    disabled={isSubmitting}
                    placeholder="Tell us about your experience with our service..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100"
                  />
                </div>
                
                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Photos (Optional)
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="file"
                        id="photo-upload"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        disabled={isSubmitting || photos.length >= 5}
                        className="hidden"
                      />
                      <label
                        htmlFor="photo-upload"
                        className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition ${
                          isSubmitting || photos.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <Upload size={18} />
                        <span>Upload Photos</span>
                      </label>
                      <span className="ml-3 text-sm text-gray-500">
                        Max 5 photos, 5MB each
                      </span>
                    </div>
                    
                    {photos.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {photos.map((photo, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-20 object-cover rounded-md border"
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(index)}
                              disabled={isSubmitting}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition disabled:opacity-50"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Submit Review
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;