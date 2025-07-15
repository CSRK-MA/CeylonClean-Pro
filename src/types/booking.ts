export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  baseHourlyRate: number;
  minHours: number;
  maxHours: number;
  defaultHours: number;
  features: string[];
  isPopular?: boolean;
}

export interface BookingFormData {
  serviceCategory: string;
  startDate: Date;
  numberOfDays: number;
  numberOfEmployees: number;
  hourlyRate: number;
  workingHoursPerDay: number;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  specialRequirements: string;
}

export interface BookingSummary {
  serviceCategory: ServiceCategory;
  startDate: Date;
  endDate: Date;
  scheduledDates: Date[];
  numberOfDays: number;
  numberOfEmployees: number;
  hourlyRate: number;
  workingHoursPerDay: number;
  subtotal: number;
  tax: number;
  total: number;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  specialRequirements: string;
}

export interface AvailabilityData {
  date: string;
  availableEmployees: number;
  isFullyBooked: boolean;
  isWeekend: boolean;
  isHoliday: boolean;
}