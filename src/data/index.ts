import { Service, ServiceCategory, Worker, Testimonial, FAQ } from '../types';
import { Users, Home, Building2, PartyPopper, Flower2, Heart, Shirt } from 'lucide-react';

export const serviceIcons = {
  home: Home,
  office: Building2,
  event: PartyPopper,
  garden: Flower2,
  elderly: Heart,
  laundry: Shirt,
};

export const services: Service[] = [
  {
    id: '1',
    name: 'Home Cleaning',
    icon: 'home',
    category: 'home',
    priceRange: 'Rs. 800-1,200/hr',
    duration: '3-4 hours',
    rating: 4.8,
    description: 'Comprehensive home cleaning service including dusting, vacuuming, mopping, and bathroom sanitization. Our trained professionals ensure your home looks and feels spotless.',
  },
  {
    id: '2',
    name: 'Office Cleaning',
    icon: 'office',
    category: 'office',
    priceRange: 'Rs. 1,000-1,500/hr',
    duration: '2-6 hours',
    rating: 4.7,
    description: 'Professional office cleaning tailored to your business needs. Services include desk cleaning, floor maintenance, washroom sanitization, and waste disposal.',
  },
  {
    id: '3',
    name: 'After-Event Cleanup',
    icon: 'event',
    category: 'event',
    priceRange: 'Rs. 5,000-10,000',
    duration: '4-8 hours',
    rating: 4.9,
    description: 'Quick and efficient cleaning services after events and parties. Our team handles everything from waste removal to deep cleaning of venues.',
  },
  {
    id: '4',
    name: 'Garden Maintenance',
    icon: 'garden',
    category: 'garden',
    priceRange: 'Rs. 1,200-2,000/hr',
    duration: '2-5 hours',
    rating: 4.6,
    description: 'Complete garden care services including lawn mowing, plant care, weeding, and garden waste disposal by experienced gardeners.',
  },
  {
    id: '5',
    name: 'Elderly Assistance',
    icon: 'elderly',
    category: 'elderly',
    priceRange: 'Rs. 900-1,300/hr',
    duration: '2-8 hours',
    rating: 4.9,
    description: 'Compassionate support services for the elderly including cleaning, meal preparation, light housekeeping, and companionship.',
  },
  {
    id: '6',
    name: 'Laundry & Ironing',
    icon: 'laundry',
    category: 'laundry',
    priceRange: 'Rs. 600-900/hr',
    duration: '2-3 hours',
    rating: 4.7,
    description: 'Professional laundry and ironing services with attention to detail. We handle all types of garments with care and expertise.',
  },
];

export const workers: Worker[] = [
  {
    id: '1',
    name: 'Kumari Silva',
    avatar: 'https://images.pexels.com/photos/4498876/pexels-photo-4498876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Colombo',
    skills: ['home', 'laundry'],
    availability: 'Available Today',
    rating: 4.9,
    reviews: 178,
  },
  {
    id: '2',
    name: 'Nimal Perera',
    avatar: 'https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Kandy',
    skills: ['garden', 'home'],
    availability: 'Booked Until 2PM',
    rating: 4.7,
    reviews: 122,
  },
  {
    id: '3',
    name: 'Priya Mendis',
    avatar: 'https://images.pexels.com/photos/8460370/pexels-photo-8460370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Negombo',
    skills: ['office', 'event'],
    availability: 'Available Today',
    rating: 4.8,
    reviews: 89,
  },
  {
    id: '4',
    name: 'Asanka Fernando',
    avatar: 'https://images.pexels.com/photos/8087931/pexels-photo-8087931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Galle',
    skills: ['elderly', 'home'],
    availability: 'Unavailable',
    rating: 4.9,
    reviews: 211,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Tharushi W.',
    avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'home',
    rating: 5,
    comment: 'Excellent service! My home has never been this clean. The attention to detail was impressive, and the staff was very professional.',
    date: '2 weeks ago',
  },
  {
    id: '2',
    name: 'Ranjan K.',
    avatar: 'https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'office',
    rating: 5,
    comment: 'We hired CeylonClean Pro for our office, and the results were exceptional. Staff is punctual, thorough, and respectful of our workspace.',
    date: '1 month ago',
  },
  {
    id: '3',
    name: 'Dilini S.',
    avatar: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'event',
    rating: 4,
    comment: 'After our wedding, the venue needed quick cleaning. CeylonClean team arrived promptly and transformed the space back to normal in no time.',
    date: '3 weeks ago',
  },
];

export const faqs: FAQ[] = [
  {
    question: 'Are your staff vaccinated?',
    answer: 'Yes, all our staff members are fully vaccinated against COVID-19 and follow strict health and safety protocols.',
  },
  {
    question: 'Do you bring cleaning supplies?',
    answer: 'Yes, our team brings all necessary cleaning supplies and equipment. If you have specific products you prefer us to use, please let us know in advance.',
  },
  {
    question: 'Is transportation included?',
    answer: 'Yes, transportation costs are included in our pricing for locations within our service areas. For remote locations, a small transportation fee may apply.',
  },
  {
    question: 'How can I cancel a booking?',
    answer: 'Bookings can be cancelled or rescheduled up to 24 hours before the scheduled service without any charges. For cancellations within 24 hours, a 50% fee may apply.',
  },
  {
    question: 'How are your cleaners vetted?',
    answer: 'All our staff undergo thorough background checks, professional training, and are continuously evaluated based on customer feedback to ensure the highest standards.',
  },
];

export const pricingData = {
  home: { hourlyRate: 900, dailyRate: 5000, estimatedDuration: '3-4 hours' },
  office: { hourlyRate: 1200, dailyRate: 7000, estimatedDuration: '4-6 hours' },
  event: { hourlyRate: 1500, dailyRate: 9000, estimatedDuration: '4-8 hours' },
  garden: { hourlyRate: 1200, dailyRate: 6000, estimatedDuration: '3-5 hours' },
  elderly: { hourlyRate: 1000, dailyRate: 6000, estimatedDuration: '4-8 hours' },
  laundry: { hourlyRate: 800, dailyRate: 4500, estimatedDuration: '2-3 hours' },
};