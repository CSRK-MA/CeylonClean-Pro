import api from './api';
import { Worker } from '../types';

export interface WorkerProfile extends Worker {
  bio: string;
  experience: number;
  certifications: string[];
  languages: string[];
  workingHours: {
    [key: string]: { start: string; end: string; available: boolean };
  };
  serviceAreas: string[];
  hourlyRate: number;
  completedJobs: number;
  responseTime: number;
  backgroundCheck: {
    status: 'pending' | 'approved' | 'rejected';
    completedAt?: string;
    documents: Array<{
      type: string;
      url: string;
      verifiedAt?: string;
    }>;
  };
  bankDetails?: {
    accountNumber: string;
    routingNumber: string;
    accountHolderName: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface WorkerSchedule {
  date: string;
  slots: Array<{
    startTime: string;
    endTime: string;
    status: 'available' | 'booked' | 'blocked';
    bookingId?: string;
  }>;
}

export interface WorkerEarnings {
  totalEarnings: number;
  thisMonth: number;
  lastMonth: number;
  pendingPayments: number;
  averagePerBooking: number;
  earningsHistory: Array<{
    date: string;
    amount: number;
    bookingId: string;
    status: 'paid' | 'pending';
  }>;
}

class WorkerService {
  // Get worker profile
  async getWorkerProfile(workerId: string): Promise<WorkerProfile> {
    const response = await api.get(`/workers/${workerId}`);
    return response.data;
  }

  // Update worker profile
  async updateWorkerProfile(workerId: string, profileData: Partial<WorkerProfile>): Promise<WorkerProfile> {
    const response = await api.patch(`/workers/${workerId}`, profileData);
    return response.data;
  }

  // Get worker availability
  async getWorkerAvailability(
    workerId: string,
    startDate: string,
    endDate: string
  ): Promise<WorkerSchedule[]> {
    const response = await api.get(`/workers/${workerId}/availability`, {
      params: { startDate, endDate },
    });
    return response.data;
  }

  // Update worker availability
  async updateWorkerAvailability(
    workerId: string,
    scheduleData: Array<{
      date: string;
      slots: Array<{
        startTime: string;
        endTime: string;
        available: boolean;
      }>;
    }>
  ): Promise<void> {
    await api.patch(`/workers/${workerId}/availability`, { schedule: scheduleData });
  }

  // Get worker bookings
  async getWorkerBookings(
    workerId: string,
    filters?: {
      status?: string;
      startDate?: string;
      endDate?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<{
    bookings: any[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const response = await api.get(`/workers/${workerId}/bookings`, { params: filters });
    return response.data;
  }

  // Get worker earnings
  async getWorkerEarnings(
    workerId: string,
    period: 'week' | 'month' | 'quarter' | 'year'
  ): Promise<WorkerEarnings> {
    const response = await api.get(`/workers/${workerId}/earnings`, { params: { period } });
    return response.data;
  }

  // Update worker location
  async updateWorkerLocation(
    workerId: string,
    latitude: number,
    longitude: number
  ): Promise<void> {
    await api.patch(`/workers/${workerId}/location`, { latitude, longitude });
  }

  // Get nearby workers
  async getNearbyWorkers(
    latitude: number,
    longitude: number,
    radius: number = 10,
    serviceType?: string
  ): Promise<Worker[]> {
    const response = await api.get('/workers/nearby', {
      params: { latitude, longitude, radius, serviceType },
    });
    return response.data;
  }

  // Worker check-in
  async workerCheckIn(workerId: string, bookingId: string): Promise<void> {
    await api.post(`/workers/${workerId}/checkin`, { bookingId });
  }

  // Worker check-out
  async workerCheckOut(
    workerId: string,
    bookingId: string,
    notes?: string,
    photos?: File[]
  ): Promise<void> {
    const formData = new FormData();
    formData.append('bookingId', bookingId);
    if (notes) formData.append('notes', notes);
    
    if (photos) {
      photos.forEach((photo, index) => {
        formData.append(`photos[${index}]`, photo);
      });
    }

    await api.post(`/workers/${workerId}/checkout`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  // Get worker performance metrics
  async getWorkerPerformance(
    workerId: string,
    period: 'week' | 'month' | 'quarter' | 'year'
  ): Promise<{
    totalBookings: number;
    completedBookings: number;
    cancelledBookings: number;
    averageRating: number;
    totalEarnings: number;
    averageResponseTime: number;
    customerRetention: number;
    punctualityScore: number;
    qualityScore: number;
  }> {
    const response = await api.get(`/workers/${workerId}/performance`, { params: { period } });
    return response.data;
  }

  // Submit worker application
  async submitWorkerApplication(applicationData: {
    personalInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      dateOfBirth: string;
      address: string;
    };
    workInfo: {
      experience: number;
      skills: string[];
      availability: string[];
      expectedHourlyRate: number;
    };
    documents: {
      idCard: File;
      resume: File;
      certifications?: File[];
      references?: Array<{
        name: string;
        phone: string;
        relationship: string;
      }>;
    };
  }): Promise<{ applicationId: string; status: string }> {
    const formData = new FormData();
    
    // Add personal info
    Object.entries(applicationData.personalInfo).forEach(([key, value]) => {
      formData.append(`personalInfo[${key}]`, value);
    });
    
    // Add work info
    Object.entries(applicationData.workInfo).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`workInfo[${key}][${index}]`, item);
        });
      } else {
        formData.append(`workInfo[${key}]`, value.toString());
      }
    });
    
    // Add documents
    formData.append('documents[idCard]', applicationData.documents.idCard);
    formData.append('documents[resume]', applicationData.documents.resume);
    
    if (applicationData.documents.certifications) {
      applicationData.documents.certifications.forEach((cert, index) => {
        formData.append(`documents[certifications][${index}]`, cert);
      });
    }
    
    if (applicationData.documents.references) {
      applicationData.documents.references.forEach((ref, index) => {
        Object.entries(ref).forEach(([key, value]) => {
          formData.append(`documents[references][${index}][${key}]`, value);
        });
      });
    }

    const response = await api.post('/workers/apply', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }
}

export const workerService = new WorkerService();