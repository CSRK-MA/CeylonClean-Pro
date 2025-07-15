import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Calendar, Map, Clock, DollarSign, Home, Sparkles, Wrench, Car, Download, Mail, FileText } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { services, workers } from '../../data';
import { motion, AnimatePresence } from 'framer-motion';
import { bookingService } from '../../services/bookingService';
import { toast } from 'react-hot-toast';
import BookingConfirmation from './BookingConfirmation';

// Define service icons mapping
const serviceIcons = {
  'house-cleaning': Home,
  'deep-cleaning': Sparkles,
  'maintenance': Wrench,
  'car-cleaning': Car,
};

const BookingSteps: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [duration, setDuration] = useState<number>(2);
  const [location, setLocation] = useState<string>('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    specialInstructions: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
  
  const { 
    bookingDetails,
    setService,
    setWorker, 
    setDate,
    setTime,
    setDuration: setBookingDuration,
    setLocation: setBookingLocation,
    calculateTotal
  } = useBooking();
  
  const goToNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };
  
  const goToPrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setDate(date);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setTime(time);
  };
  
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setDuration(value);
    setBookingDuration(value);
  };
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    setBookingLocation(e.target.value);
  };
  
  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleConfirmBooking = async () => {
    if (!bookingDetails.service || !bookingDetails.worker || !selectedDate || !selectedTime || !location || !customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const bookingData = {
        serviceId: bookingDetails.service.id,
        workerId: bookingDetails.worker.id,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        duration: duration,
        location: location,
        customerInfo: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          specialInstructions: customerInfo.specialInstructions,
        },
        paymentMethod: 'cash' as const,
      };
      
      const response = await bookingService.createBooking(bookingData);
      
      if (response) {
        // Generate confirmation data for the receipt
        const confirmationData = {
          bookingId: response.bookingNumber,
          confirmationDate: new Date().toISOString(),
          customer: {
            name: customerInfo.name,
            phone: customerInfo.phone,
            email: customerInfo.email,
            address: location,
          },
          service: {
            category: bookingDetails.service.name,
            name: bookingDetails.service.name,
            description: bookingDetails.service.description,
            specialRequirements: customerInfo.specialInstructions || undefined,
          },
          schedule: {
            startDate: selectedDate.toISOString(),
            numberOfDays: 1, // For now, single day booking
            workingHoursPerDay: duration,
            dailyStartTime: selectedTime,
            dailyEndTime: calculateEndTime(selectedTime, duration),
          },
          staffing: {
            numberOfEmployees: 1, // Default to 1 for now
            hourlyRate: calculateHourlyRate(bookingDetails.service.priceRange),
            totalCost: response.totalAmount,
          },
          payment: {
            method: 'Cash on Arrival',
            status: 'Pending' as const,
          },
        };
        
        setConfirmedBooking(confirmationData);
        setBookingConfirmed(true);
        toast.success('Booking confirmed successfully!');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Helper function to calculate end time
  const calculateEndTime = (startTime: string, duration: number): string => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + (duration * 60);
    const endHours = Math.floor(endMinutes / 60) % 24;
    const endMins = endMinutes % 60;
    const period = endHours >= 12 ? 'PM' : 'AM';
    const displayHour = endHours === 0 ? 12 : endHours > 12 ? endHours - 12 : endHours;
    return `${displayHour}:${endMins.toString().padStart(2, '0')} ${period}`;
  };
  
  // Helper function to extract hourly rate from price range
  const calculateHourlyRate = (priceRange: string): number => {
    const matches = priceRange.match(/Rs\.\s+(\d+(?:,\d+)?)-(\d+(?:,\d+)?)/);
    if (matches) {
      const min = parseInt(matches[1].replace(',', ''));
      const max = parseInt(matches[2].replace(',', ''));
      return Math.round((min + max) / 2);
    }
    return 1000; // Default rate
  };
  
  const renderServiceSelection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Select a Service</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(service => (
          <div 
            key={service.id}
            className={`border rounded-lg p-4 cursor-pointer transition ${
              bookingDetails.service?.id === service.id 
                ? 'border-teal-500 bg-teal-50' 
                : 'border-gray-200 hover:border-teal-300'
            }`}
            onClick={() => setService(service)}
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
                {React.createElement(serviceIcons[service.category] || Home, { size: 18 })}
              </div>
              <div>
                <h4 className="font-medium text-gray-800">{service.name}</h4>
                <div className="text-sm text-gray-600 mt-1">
                  <div>{service.priceRange}</div>
                  <div>{service.duration}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderWorkerSelection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Select a Cleaner</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {workers.map(worker => (
          <div 
            key={worker.id}
            className={`border rounded-lg p-4 cursor-pointer transition ${
              bookingDetails.worker?.id === worker.id 
                ? 'border-teal-500 bg-teal-50' 
                : 'border-gray-200 hover:border-teal-300'
            }`}
            onClick={() => setWorker(worker)}
          >
            <div className="flex items-center gap-3">
              <img 
                src={worker.avatar} 
                alt={worker.name} 
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium text-gray-800">{worker.name}</h4>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <span 
                    className={`inline-block h-2 w-2 rounded-full mr-1 ${
                      worker.availability === 'Available Today' 
                        ? 'bg-green-500' 
                        : worker.availability === 'Booked Until 2PM'
                          ? 'bg-yellow-500'
                          : 'bg-gray-500'
                    }`}
                  />
                  <span>{worker.availability}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderDateTimeSelection = () => {
    // Simplified calendar for demo purposes
    const today = new Date();
    const nextFiveDays = Array.from({ length: 5 }).map((_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      return date;
    });
    
    const timeSlots = [
      '08:00 AM', '10:00 AM', '12:00 PM', 
      '02:00 PM', '04:00 PM', '06:00 PM'
    ];
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Choose Date & Time</h3>
        
        <div>
          <h4 className="font-medium text-gray-700 mb-3 flex items-center">
            <Calendar size={18} className="mr-2 text-teal-600" />
            Select Date
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {nextFiveDays.map((date, index) => (
              <button
                key={index}
                className={`py-2 px-4 border rounded-md text-center transition ${
                  selectedDate && date.toDateString() === selectedDate.toDateString()
                    ? 'bg-teal-500 text-white border-teal-500'
                    : 'border-gray-300 hover:border-teal-500'
                }`}
                onClick={() => handleDateSelect(date)}
              >
                <div className="font-medium">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-sm">
                  {date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700 mb-3 flex items-center">
            <Clock size={18} className="mr-2 text-teal-600" />
            Select Time
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {timeSlots.map((time, index) => (
              <button
                key={index}
                className={`py-2 px-4 border rounded-md text-center transition ${
                  selectedTime === time
                    ? 'bg-teal-500 text-white border-teal-500'
                    : 'border-gray-300 hover:border-teal-500'
                }`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700 mb-3 flex items-center">
            <Clock size={18} className="mr-2 text-teal-600" />
            Duration (hours)
          </h4>
          <input 
            type="range" 
            min="2" 
            max="8" 
            step="1" 
            value={duration} 
            onChange={handleDurationChange}
            className="w-full accent-teal-500"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>2 hours</span>
            <span className="font-medium">{duration} hours</span>
            <span>8 hours</span>
          </div>
        </div>
      </div>
    );
  };
  
  const renderCustomerDetails = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Your Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={customerInfo.name}
            onChange={handleCustomerInfoChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={customerInfo.email}
            onChange={handleCustomerInfoChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={customerInfo.phone}
            onChange={handleCustomerInfoChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="+94 77 123 4567"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Map size={18} className="inline mr-1 text-teal-600" />
            Your Location *
          </label>
          <input 
            type="text" 
            value={location}
            onChange={handleLocationChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter your complete address"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Special Instructions (Optional)
        </label>
        <textarea
          name="specialInstructions"
          value={customerInfo.specialInstructions}
          onChange={handleCustomerInfoChange}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="Any special requirements or instructions for the cleaner..."
        />
      </div>
    </div>
  );
  
  const renderDetailsAndConfirmation = () => {
    const total = calculateTotal();
    
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">Confirm & Book</h3>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-4">Booking Summary</h4>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium">{bookingDetails.service?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cleaner:</span>
              <span className="font-medium">{bookingDetails.worker?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Customer:</span>
              <span className="font-medium">{customerInfo.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{customerInfo.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{customerInfo.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">
                {bookingDetails.date?.toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  day: 'numeric', 
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-medium">{bookingDetails.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">{bookingDetails.duration} hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium">{location}</span>
            </div>
            <div className="pt-3 border-t border-gray-200 flex justify-between items-center font-medium">
              <span>Total:</span>
              <span className="text-lg text-teal-700">Rs. {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleConfirmBooking}
          disabled={isSubmitting}
          className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Confirming Booking...
            </>
          ) : (
            'Confirm Booking'
          )}
        </button>
      </div>
    );
  };
  
  const renderStepContent = () => {
    if (bookingConfirmed && confirmedBooking) {
      return <BookingConfirmation bookingData={confirmedBooking} />;
    }
    
    switch(step) {
      case 1: return renderServiceSelection();
      case 2: return renderWorkerSelection();
      case 3: return renderDateTimeSelection();
      case 4: return renderCustomerDetails();
      case 5: return renderDetailsAndConfirmation();
      default: return null;
    }
  };
  
  if (bookingConfirmed && confirmedBooking) {
    return (
      <div className="max-w-5xl mx-auto">
        <BookingConfirmation bookingData={confirmedBooking} />
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Progress bar */}
      <div className="w-full bg-gray-100 h-2">
        <div 
          className="bg-teal-500 h-2 transition-all duration-300"
          style={{ width: `${step * 20}%` }}
        />
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between px-6 pt-6">
        {[1, 2, 3, 4, 5].map((stepNumber) => (
          <div 
            key={stepNumber}
            className="flex flex-col items-center"
          >
            <div 
              className={`h-8 w-8 rounded-full flex items-center justify-center mb-1 ${
                stepNumber <= step 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {stepNumber}
            </div>
            <span className="text-xs text-gray-600 hidden sm:block">
              {stepNumber === 1 && 'Service'}
              {stepNumber === 2 && 'Cleaner'}
              {stepNumber === 3 && 'Date & Time'}
              {stepNumber === 4 && 'Details'}
              {stepNumber === 5 && 'Confirm'}
            </span>
          </div>
        ))}
      </div>
      
      {/* Step content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation buttons */}
      <div className="px-6 pb-6 flex justify-between">
        <button
          onClick={goToPrevious}
          disabled={step === 1}
          className={`flex items-center gap-1 px-4 py-2 rounded-md transition ${
            step === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ArrowLeft size={16} />
          <span>Previous</span>
        </button>
        
        {step < 5 && (
          <button
            onClick={goToNext}
            disabled={
              (step === 1 && !bookingDetails.service) ||
              (step === 2 && !bookingDetails.worker) ||
              (step === 3 && (!selectedDate || !selectedTime)) ||
              (step === 4 && (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !location))
            }
            className={`flex items-center gap-1 px-4 py-2 rounded-md transition ${
              ((step === 1 && !bookingDetails.service) ||
               (step === 2 && !bookingDetails.worker) ||
               (step === 3 && (!selectedDate || !selectedTime)) ||
               (step === 4 && (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !location)))
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
          >
            <span>Next</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingSteps;