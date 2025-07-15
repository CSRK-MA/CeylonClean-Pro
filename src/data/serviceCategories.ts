import { ServiceCategory } from '../types/booking';
import { Home, Building2, Sparkles, Car, Flower2, Heart, Shirt, Wrench, Users, Calendar } from 'lucide-react';

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'home-cleaning',
    name: 'Home Cleaning',
    description: 'Comprehensive residential cleaning services for homes and apartments',
    icon: 'Home',
    baseHourlyRate: 800,
    minHours: 2,
    maxHours: 8,
    defaultHours: 4,
    features: [
      'Dusting and vacuuming',
      'Kitchen and bathroom cleaning',
      'Floor mopping and sanitization',
      'Trash removal',
      'Basic organization'
    ],
    isPopular: true,
  },
  {
    id: 'office-cleaning',
    name: 'Office Cleaning',
    description: 'Professional commercial cleaning for offices and business premises',
    icon: 'Building2',
    baseHourlyRate: 1000,
    minHours: 3,
    maxHours: 10,
    defaultHours: 6,
    features: [
      'Desk and workstation cleaning',
      'Conference room sanitization',
      'Restroom deep cleaning',
      'Floor maintenance',
      'Waste management'
    ],
  },
  {
    id: 'deep-cleaning',
    name: 'Deep Cleaning',
    description: 'Intensive cleaning service for thorough sanitization and restoration',
    icon: 'Sparkles',
    baseHourlyRate: 1200,
    minHours: 4,
    maxHours: 12,
    defaultHours: 8,
    features: [
      'Complete deep sanitization',
      'Appliance cleaning',
      'Window and blind cleaning',
      'Carpet and upholstery cleaning',
      'Detailed surface cleaning'
    ],
    isPopular: true,
  },
  {
    id: 'car-cleaning',
    name: 'Car Cleaning',
    description: 'Professional automotive cleaning and detailing services',
    icon: 'Car',
    baseHourlyRate: 600,
    minHours: 1,
    maxHours: 4,
    defaultHours: 2,
    features: [
      'Interior vacuuming',
      'Exterior washing and waxing',
      'Dashboard and console cleaning',
      'Tire and rim cleaning',
      'Air freshening'
    ],
  },
  {
    id: 'garden-maintenance',
    name: 'Garden Maintenance',
    description: 'Complete garden care and landscaping maintenance services',
    icon: 'Flower2',
    baseHourlyRate: 900,
    minHours: 2,
    maxHours: 8,
    defaultHours: 4,
    features: [
      'Lawn mowing and edging',
      'Plant care and watering',
      'Weeding and pruning',
      'Garden waste removal',
      'Basic landscaping'
    ],
  },
  {
    id: 'elderly-care',
    name: 'Elderly Care Assistance',
    description: 'Compassionate support and light housekeeping for elderly clients',
    icon: 'Heart',
    baseHourlyRate: 1100,
    minHours: 3,
    maxHours: 10,
    defaultHours: 6,
    features: [
      'Light housekeeping',
      'Meal preparation assistance',
      'Medication reminders',
      'Companionship',
      'Safety monitoring'
    ],
  },
  {
    id: 'laundry-ironing',
    name: 'Laundry & Ironing',
    description: 'Professional laundry and garment care services',
    icon: 'Shirt',
    baseHourlyRate: 500,
    minHours: 2,
    maxHours: 6,
    defaultHours: 3,
    features: [
      'Washing and drying',
      'Professional ironing',
      'Fabric care treatment',
      'Stain removal',
      'Folding and organization'
    ],
  },
  {
    id: 'maintenance-repair',
    name: 'Maintenance & Repair',
    description: 'General maintenance and minor repair services',
    icon: 'Wrench',
    baseHourlyRate: 1300,
    minHours: 2,
    maxHours: 8,
    defaultHours: 4,
    features: [
      'Plumbing repairs',
      'Electrical maintenance',
      'Painting touch-ups',
      'Fixture installation',
      'General handyman services'
    ],
  },
  {
    id: 'event-cleaning',
    name: 'Event Cleaning',
    description: 'Pre and post-event cleaning for parties and gatherings',
    icon: 'Users',
    baseHourlyRate: 1500,
    minHours: 3,
    maxHours: 12,
    defaultHours: 6,
    features: [
      'Pre-event setup cleaning',
      'During-event maintenance',
      'Post-event cleanup',
      'Waste removal',
      'Venue restoration'
    ],
  },
  {
    id: 'scheduled-cleaning',
    name: 'Scheduled Cleaning',
    description: 'Regular recurring cleaning services with flexible schedules',
    icon: 'Calendar',
    baseHourlyRate: 750,
    minHours: 2,
    maxHours: 8,
    defaultHours: 4,
    features: [
      'Weekly/monthly schedules',
      'Consistent service quality',
      'Dedicated cleaning team',
      'Flexible timing',
      'Priority booking'
    ],
    isPopular: true,
  },
];

export const getServiceCategoryIcon = (iconName: string) => {
  const icons = {
    Home,
    Building2,
    Sparkles,
    Car,
    Flower2,
    Heart,
    Shirt,
    Wrench,
    Users,
    Calendar,
  };
  return icons[iconName as keyof typeof icons] || Home;
};