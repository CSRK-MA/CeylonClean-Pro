import api from './api';
import { ServiceCategory } from '../types';

export interface Review {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  serviceCategory: ServiceCategory;
  rating: number;
  comment: string;
  isApproved: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  bookingId?: string;
  workerRating?: number;
  serviceRating?: number;
  photos?: string[];
}

export interface CreateReviewRequest {
  customerName: string;
  customerEmail: string;
  serviceCategory: ServiceCategory;
  rating: number;
  comment: string;
  bookingId?: string;
  workerRating?: number;
  serviceRating?: number;
  photos?: File[];
}

export interface ReviewFilters {
  serviceCategory?: ServiceCategory;
  rating?: number;
  isApproved?: boolean;
  isPublished?: boolean;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  reviewsByCategory: Array<{
    category: ServiceCategory;
    count: number;
    averageRating: number;
  }>;
  recentReviews: Review[];
  topReviews: Review[];
}

class ReviewService {
  // Create new review
  async createReview(reviewData: CreateReviewRequest): Promise<Review> {
    const formData = new FormData();
    
    // Add text fields
    formData.append('customerName', reviewData.customerName);
    formData.append('customerEmail', reviewData.customerEmail);
    formData.append('serviceCategory', reviewData.serviceCategory);
    formData.append('rating', reviewData.rating.toString());
    formData.append('comment', reviewData.comment);
    
    if (reviewData.bookingId) {
      formData.append('bookingId', reviewData.bookingId);
    }
    
    if (reviewData.workerRating) {
      formData.append('workerRating', reviewData.workerRating.toString());
    }
    
    if (reviewData.serviceRating) {
      formData.append('serviceRating', reviewData.serviceRating.toString());
    }
    
    // Add photos if any
    if (reviewData.photos && reviewData.photos.length > 0) {
      reviewData.photos.forEach((photo, index) => {
        formData.append(`photos[${index}]`, photo);
      });
    }

    const response = await api.post('/reviews', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }

  // Get reviews with filters
  async getReviews(filters?: ReviewFilters): Promise<{
    reviews: Review[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const response = await api.get('/reviews', { params: filters });
    return response.data;
  }

  // Get published reviews for public display
  async getPublishedReviews(filters?: {
    serviceCategory?: ServiceCategory;
    limit?: number;
    page?: number;
  }): Promise<{
    reviews: Review[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const response = await api.get('/reviews/published', { params: filters });
    return response.data;
  }

  // Get review by ID
  async getReview(reviewId: string): Promise<Review> {
    const response = await api.get(`/reviews/${reviewId}`);
    return response.data;
  }

  // Update review (admin only)
  async updateReview(reviewId: string, updateData: Partial<Review>): Promise<Review> {
    const response = await api.patch(`/reviews/${reviewId}`, updateData);
    return response.data;
  }

  // Approve review (admin only)
  async approveReview(reviewId: string): Promise<Review> {
    const response = await api.patch(`/reviews/${reviewId}/approve`);
    return response.data;
  }

  // Publish review (admin only)
  async publishReview(reviewId: string): Promise<Review> {
    const response = await api.patch(`/reviews/${reviewId}/publish`);
    return response.data;
  }

  // Delete review
  async deleteReview(reviewId: string): Promise<void> {
    await api.delete(`/reviews/${reviewId}`);
  }

  // Get review statistics
  async getReviewStats(period?: 'week' | 'month' | 'quarter' | 'year'): Promise<ReviewStats> {
    const response = await api.get('/reviews/stats', { params: { period } });
    return response.data;
  }

  // Report inappropriate review
  async reportReview(reviewId: string, reason: string): Promise<void> {
    await api.post(`/reviews/${reviewId}/report`, { reason });
  }

  // Get reviews for a specific worker
  async getWorkerReviews(workerId: string, filters?: {
    page?: number;
    limit?: number;
  }): Promise<{
    reviews: Review[];
    total: number;
    averageRating: number;
  }> {
    const response = await api.get(`/workers/${workerId}/reviews`, { params: filters });
    return response.data;
  }

  // Get reviews for a specific service
  async getServiceReviews(serviceId: string, filters?: {
    page?: number;
    limit?: number;
  }): Promise<{
    reviews: Review[];
    total: number;
    averageRating: number;
  }> {
    const response = await api.get(`/services/${serviceId}/reviews`, { params: filters });
    return response.data;
  }
}

export const reviewService = new ReviewService();