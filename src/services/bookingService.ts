import mockApi from './mockApi';

export interface BookingData {
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
}

export interface Booking {
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

export const bookingService = {
  createBooking: async (bookingData: BookingData): Promise<Booking> => {
    try {
      const booking = await mockApi.createBooking(bookingData);
      return booking;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  getBooking: async (id: string): Promise<Booking | null> => {
    try {
      const booking = await mockApi.getBooking(id);
      return booking;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  },

  getBookingsByEmail: async (email: string): Promise<Booking[]> => {
    try {
      const bookings = await mockApi.getBookingsByEmail(email);
      return bookings;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  updateBookingStatus: async (id: string, status: Booking['status']): Promise<Booking> => {
    try {
      const booking = await mockApi.updateBookingStatus(id, status);
      return booking;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  },
};

export default bookingService;