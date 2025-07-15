import React, { createContext, useContext, useState } from 'react';
import { BookingDetails, Service, Worker } from '../types';

interface BookingContextType {
  bookingDetails: BookingDetails;
  setService: (service: Service) => void;
  setWorker: (worker: Worker) => void;
  setDate: (date: Date) => void;
  setTime: (time: string) => void;
  setDuration: (duration: number) => void;
  setLocation: (location: string) => void;
  calculateTotal: () => number;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({});

  const setService = (service: Service) => {
    setBookingDetails(prev => ({ ...prev, service }));
  };

  const setWorker = (worker: Worker) => {
    setBookingDetails(prev => ({ ...prev, worker }));
  };

  const setDate = (date: Date) => {
    setBookingDetails(prev => ({ ...prev, date }));
  };

  const setTime = (time: string) => {
    setBookingDetails(prev => ({ ...prev, time }));
  };

  const setDuration = (duration: number) => {
    setBookingDetails(prev => ({ ...prev, duration }));
  };

  const setLocation = (location: string) => {
    setBookingDetails(prev => ({ ...prev, location }));
  };

  const calculateTotal = () => {
    const { service, duration } = bookingDetails;
    if (!service || !duration) return 0;
    
    // Extract numeric rate from price range (e.g., "Rs. 800-1,200/hr" -> 1000 as average)
    const priceRange = service.priceRange;
    const matches = priceRange.match(/Rs\.\s+(\d+(?:,\d+)?)-(\d+(?:,\d+)?)/);
    
    if (matches) {
      const min = parseInt(matches[1].replace(',', ''));
      const max = parseInt(matches[2].replace(',', ''));
      const avgRate = (min + max) / 2;
      const total = avgRate * duration;
      return total;
    }
    
    return 0;
  };

  const resetBooking = () => {
    setBookingDetails({});
  };

  return (
    <BookingContext.Provider 
      value={{ 
        bookingDetails, 
        setService, 
        setWorker, 
        setDate, 
        setTime, 
        setDuration, 
        setLocation, 
        calculateTotal,
        resetBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};