import api from './api';

export interface DashboardMetrics {
  totalBookings: number;
  totalRevenue: number;
  activeWorkers: number;
  customerSatisfaction: number;
  bookingGrowth: number;
  revenueGrowth: number;
  workerUtilization: number;
  averageRating: number;
}

export interface BookingTrend {
  date: string;
  bookings: number;
  revenue: number;
  completionRate: number;
}

export interface ServicePerformance {
  serviceId: string;
  serviceName: string;
  bookings: number;
  revenue: number;
  averageRating: number;
  completionRate: number;
  growth: number;
}

export interface WorkerPerformance {
  workerId: string;
  workerName: string;
  bookings: number;
  revenue: number;
  averageRating: number;
  completionRate: number;
  responseTime: number;
  availability: number;
}

export interface CustomerInsights {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  customerLifetimeValue: number;
  churnRate: number;
  acquisitionCost: number;
  retentionRate: number;
  segmentBreakdown: Array<{
    segment: string;
    count: number;
    revenue: number;
    averageBookings: number;
  }>;
}

export interface GeographicData {
  location: string;
  bookings: number;
  revenue: number;
  workers: number;
  averageRating: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

class AnalyticsService {
  // Get dashboard metrics
  async getDashboardMetrics(period: 'week' | 'month' | 'quarter' | 'year'): Promise<DashboardMetrics> {
    const response = await api.get('/analytics/dashboard', { params: { period } });
    return response.data;
  }

  // Get booking trends
  async getBookingTrends(
    period: 'week' | 'month' | 'quarter' | 'year',
    granularity: 'day' | 'week' | 'month'
  ): Promise<BookingTrend[]> {
    const response = await api.get('/analytics/booking-trends', {
      params: { period, granularity },
    });
    return response.data;
  }

  // Get service performance
  async getServicePerformance(period: 'week' | 'month' | 'quarter' | 'year'): Promise<ServicePerformance[]> {
    const response = await api.get('/analytics/service-performance', { params: { period } });
    return response.data;
  }

  // Get worker performance
  async getWorkerPerformance(
    period: 'week' | 'month' | 'quarter' | 'year',
    sortBy: 'bookings' | 'revenue' | 'rating' | 'completion'
  ): Promise<WorkerPerformance[]> {
    const response = await api.get('/analytics/worker-performance', {
      params: { period, sortBy },
    });
    return response.data;
  }

  // Get customer insights
  async getCustomerInsights(period: 'week' | 'month' | 'quarter' | 'year'): Promise<CustomerInsights> {
    const response = await api.get('/analytics/customer-insights', { params: { period } });
    return response.data;
  }

  // Get geographic data
  async getGeographicData(period: 'week' | 'month' | 'quarter' | 'year'): Promise<GeographicData[]> {
    const response = await api.get('/analytics/geographic', { params: { period } });
    return response.data;
  }

  // Get revenue analytics
  async getRevenueAnalytics(period: 'week' | 'month' | 'quarter' | 'year'): Promise<{
    totalRevenue: number;
    recurringRevenue: number;
    oneTimeRevenue: number;
    averageOrderValue: number;
    revenueByService: Array<{ service: string; revenue: number; percentage: number }>;
    revenueByLocation: Array<{ location: string; revenue: number; percentage: number }>;
    revenueGrowth: Array<{ date: string; revenue: number; growth: number }>;
  }> {
    const response = await api.get('/analytics/revenue', { params: { period } });
    return response.data;
  }

  // Get operational metrics
  async getOperationalMetrics(period: 'week' | 'month' | 'quarter' | 'year'): Promise<{
    averageBookingDuration: number;
    averageResponseTime: number;
    cancellationRate: number;
    noShowRate: number;
    rescheduleRate: number;
    workerUtilization: number;
    peakHours: Array<{ hour: number; bookings: number }>;
    seasonalTrends: Array<{ month: string; bookings: number; trend: number }>;
  }> {
    const response = await api.get('/analytics/operational', { params: { period } });
    return response.data;
  }

  // Get predictive analytics
  async getPredictiveAnalytics(): Promise<{
    demandForecast: Array<{ date: string; predictedBookings: number; confidence: number }>;
    churnPrediction: Array<{ customerId: string; churnProbability: number; riskFactors: string[] }>;
    revenueProjection: Array<{ month: string; projectedRevenue: number; confidence: number }>;
    workerDemand: Array<{ location: string; predictedDemand: number; currentCapacity: number }>;
  }> {
    const response = await api.get('/analytics/predictive');
    return response.data;
  }

  // Export analytics data
  async exportData(
    type: 'bookings' | 'revenue' | 'customers' | 'workers',
    format: 'csv' | 'excel' | 'pdf',
    period: 'week' | 'month' | 'quarter' | 'year'
  ): Promise<Blob> {
    const response = await api.get('/analytics/export', {
      params: { type, format, period },
      responseType: 'blob',
    });
    return response.data;
  }

  // Get real-time metrics
  async getRealTimeMetrics(): Promise<{
    activeBookings: number;
    onlineWorkers: number;
    pendingPayments: number;
    activeChats: number;
    systemLoad: number;
    responseTime: number;
    errorRate: number;
    uptime: number;
  }> {
    const response = await api.get('/analytics/realtime');
    return response.data;
  }
}

export const analyticsService = new AnalyticsService();