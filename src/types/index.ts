export interface Service {
  id: string;
  name: string;
  icon: string;
  category: ServiceCategory;
  priceRange: string;
  duration: string;
  rating: number;
  description: string;
}

export type ServiceCategory = 
  | 'home'
  | 'office'
  | 'event'
  | 'garden'
  | 'elderly'
  | 'laundry';

export interface Worker {
  id: string;
  name: string;
  avatar: string;
  location: string;
  skills: ServiceCategory[];
  availability: 'Available Today' | 'Booked Until 2PM' | 'Unavailable';
  rating: number;
  reviews: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  category: ServiceCategory;
  rating: number;
  comment: string;
  date: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BookingDetails {
  service?: Service;
  worker?: Worker;
  date?: Date;
  time?: string;
  duration?: number;
  location?: string;
}