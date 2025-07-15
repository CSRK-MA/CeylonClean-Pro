// Mock API service to simulate backend functionality
import { toast } from 'react-hot-toast';

// Types for our mock data
interface MockBooking {
  id: string;
  bookingNumber: string;
  serviceId: string;
  workerId: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    specialInstructions?: string;
  };
  paymentMethod: 'cash' | 'card';
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  totalAmount: number;
  createdAt: string;
}

// Mock database
let mockBookings: MockBooking[] = [];

// Helper function to generate booking number
const generateBookingNumber = (): string => {
  const prefix = 'CCL';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};

// Helper function to calculate total amount based on service type
const calculateTotalAmount = (serviceId: string, duration: number): number => {
  // Base rates per service (per hour) - more realistic pricing
  const serviceRates: Record<string, number> = {
    '1': 1000, // Home Cleaning
    '2': 1250, // Office Cleaning  
    '3': 1875, // After-Event Cleanup (calculated from range)
    '4': 1600, // Garden Maintenance
    '5': 1100, // Elderly Assistance
    '6': 750,  // Laundry & Ironing
  };
  
  const baseRate = serviceRates[serviceId] || 1000;
  return baseRate * duration;
};

// Mock API functions
export const mockApi = {
  // Create a new booking
  createBooking: async (bookingData: {
    serviceId: string;
    workerId: string;
    date: string;
    time: string;
    duration: number;
    location: string;
    customerInfo: {
      name: string;
      email: string;
      phone: string;
      specialInstructions?: string;
    };
    paymentMethod: 'cash' | 'card';
  }): Promise<MockBooking> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate occasional network errors (3% chance)
    if (Math.random() < 0.03) {
      throw new Error('Network timeout - please try again');
    }
    
    const booking: MockBooking = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      bookingNumber: generateBookingNumber(),
      ...bookingData,
      status: 'confirmed',
      totalAmount: calculateTotalAmount(bookingData.serviceId, bookingData.duration),
      createdAt: new Date().toISOString(),
    };
    
    // Store in mock database
    mockBookings.push(booking);
    
    console.log('✅ Booking created successfully:', booking);
    
    return booking;
  },

  // Get booking by ID
  getBooking: async (id: string): Promise<MockBooking | null> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const booking = mockBookings.find(b => b.id === id);
    return booking || null;
  },

  // Get all bookings for a customer
  getBookingsByEmail: async (email: string): Promise<MockBooking[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockBookings.filter(b => b.customerInfo.email === email);
  },

  // Update booking status
  updateBookingStatus: async (id: string, status: MockBooking['status']): Promise<MockBooking> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const bookingIndex = mockBookings.findIndex(b => b.id === id);
    if (bookingIndex === -1) {
      throw new Error('Booking not found');
    }
    
    mockBookings[bookingIndex].status = status;
    return mockBookings[bookingIndex];
  },

  // Generate receipt data
  generateReceipt: async (bookingId: string): Promise<{
    booking: MockBooking;
    receiptData: {
      receiptNumber: string;
      generatedAt: string;
      companyInfo: {
        name: string;
        address: string;
        phone: string;
        email: string;
        website: string;
        businessReg: string;
      };
    };
  }> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const booking = mockBookings.find(b => b.id === bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }
    
    return {
      booking,
      receiptData: {
        receiptNumber: `RCP${booking.bookingNumber}`,
        generatedAt: new Date().toISOString(),
        companyInfo: {
          name: 'Ceylon Clean Pro',
          address: '123 Main Street, Colombo 03, Sri Lanka',
          phone: '+94 11 234 5678',
          email: 'info@ceyloncleanpro.lk',
          website: 'www.ceyloncleanpro.lk',
          businessReg: 'LK1234567890',
        },
      },
    };
  },

  // Send email (mock)
  sendEmail: async (to: string, subject: string, content: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate email sending
    console.log(`📧 Mock Email Sent:
To: ${to}
Subject: ${subject}
Content Preview: ${content.substring(0, 200)}...`);
    
    // Simulate occasional email failures (1% chance)
    if (Math.random() < 0.01) {
      throw new Error('Email service temporarily unavailable');
    }
    
    return true;
  },

  // Get all bookings (for admin)
  getAllBookings: async (): Promise<MockBooking[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockBookings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  // Get booking statistics
  getBookingStats: async (): Promise<{
    totalBookings: number;
    todayBookings: number;
    totalRevenue: number;
    averageBookingValue: number;
  }> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const today = new Date().toDateString();
    const todayBookings = mockBookings.filter(b => new Date(b.date).toDateString() === today);
    const totalRevenue = mockBookings.reduce((sum, b) => sum + b.totalAmount, 0);
    
    return {
      totalBookings: mockBookings.length,
      todayBookings: todayBookings.length,
      totalRevenue,
      averageBookingValue: mockBookings.length > 0 ? totalRevenue / mockBookings.length : 0,
    };
  },
};

export default mockApi;