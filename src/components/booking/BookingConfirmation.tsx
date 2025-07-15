import React from 'react';
import { CheckCircle, Download, Mail, Phone, Calendar, Users, Clock, DollarSign, FileText, QrCode, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, addDays } from 'date-fns';
import { toast } from 'react-hot-toast';

interface BookingConfirmationProps {
  bookingData: {
    bookingId: string;
    confirmationDate: string;
    customer: {
      name: string;
      phone: string;
      email: string;
      address: string;
    };
    service: {
      category: string;
      name: string;
      description: string;
      specialRequirements?: string;
    };
    schedule: {
      startDate: string;
      numberOfDays: number;
      workingHoursPerDay: number;
      dailyStartTime: string;
      dailyEndTime: string;
    };
    staffing: {
      numberOfEmployees: number;
      hourlyRate: number;
      totalCost: number;
    };
    payment: {
      method: string;
      status: 'Paid' | 'Pending' | 'Cash on Arrival';
      transactionId?: string;
    };
  };
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ bookingData }) => {
  // ... rest of the code remains the same ...
};

export default BookingConfirmation;