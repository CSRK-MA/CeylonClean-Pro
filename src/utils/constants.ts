// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  
  // Bookings
  BOOKINGS: '/bookings',
  BOOKING_ANALYTICS: '/bookings/analytics',
  AVAILABLE_SLOTS: '/bookings/available-slots',
  
  // Payments
  PAYMENTS: '/payments',
  PAYMENT_METHODS: '/payments/methods',
  PAYMENT_HISTORY: '/payments/history',
  PAYMENT_ANALYTICS: '/payments/analytics',
  
  // Workers
  WORKERS: '/workers',
  WORKER_AVAILABILITY: '/workers/:id/availability',
  WORKER_BOOKINGS: '/workers/:id/bookings',
  WORKER_EARNINGS: '/workers/:id/earnings',
  NEARBY_WORKERS: '/workers/nearby',
  
  // Services
  SERVICES: '/services',
  SERVICE_CATEGORIES: '/services/categories',
  
  // Notifications
  NOTIFICATIONS: '/notifications',
  NOTIFICATION_PREFERENCES: '/notifications/preferences',
  
  // Chat
  CHAT_CONVERSATIONS: '/chat/conversations',
  CHAT_MESSAGES: '/chat/conversations/:id/messages',
  
  // Analytics
  ANALYTICS_DASHBOARD: '/analytics/dashboard',
  ANALYTICS_BOOKING_TRENDS: '/analytics/booking-trends',
  ANALYTICS_SERVICE_PERFORMANCE: '/analytics/service-performance',
  ANALYTICS_WORKER_PERFORMANCE: '/analytics/worker-performance',
  ANALYTICS_CUSTOMER_INSIGHTS: '/analytics/customer-insights',
  ANALYTICS_GEOGRAPHIC: '/analytics/geographic',
  ANALYTICS_REVENUE: '/analytics/revenue',
  ANALYTICS_OPERATIONAL: '/analytics/operational',
  ANALYTICS_PREDICTIVE: '/analytics/predictive',
  ANALYTICS_REALTIME: '/analytics/realtime',
  ANALYTICS_EXPORT: '/analytics/export',
};

// Status Constants
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

export const WORKER_AVAILABILITY = {
  AVAILABLE: 'Available Today',
  BOOKED: 'Booked Until 2PM',
  UNAVAILABLE: 'Unavailable',
} as const;

// Time Constants
export const TIME_SLOTS = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM',
];

export const DURATION_OPTIONS = [
  { value: 2, label: '2 hours' },
  { value: 3, label: '3 hours' },
  { value: 4, label: '4 hours' },
  { value: 5, label: '5 hours' },
  { value: 6, label: '6 hours' },
  { value: 8, label: '8 hours' },
];

// Service Categories
export const SERVICE_CATEGORIES = {
  HOME: 'home',
  OFFICE: 'office',
  EVENT: 'event',
  GARDEN: 'garden',
  ELDERLY: 'elderly',
  LAUNDRY: 'laundry',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  BOOKING_CONFIRMED: 'booking_confirmed',
  BOOKING_REMINDER: 'booking_reminder',
  PAYMENT_RECEIVED: 'payment_received',
  SERVICE_COMPLETED: 'service_completed',
  PROMOTION: 'promotion',
  SYSTEM: 'system',
} as const;

// Chat Message Types
export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file',
  LOCATION: 'location',
  SYSTEM: 'system',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  TIMEOUT: 'Request timed out. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  BOOKING_CREATED: 'Booking created successfully!',
  BOOKING_UPDATED: 'Booking updated successfully!',
  BOOKING_CANCELLED: 'Booking cancelled successfully!',
  PAYMENT_SUCCESSFUL: 'Payment completed successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  MESSAGE_SENT: 'Message sent successfully!',
  REVIEW_SUBMITTED: 'Review submitted successfully!',
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+94|0)[0-9]{9}$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  MESSAGE_MAX_LENGTH: 1000,
  REVIEW_MAX_LENGTH: 500,
} as const;

// File Upload Limits
export const FILE_LIMITS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  MAX_FILES: 5,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
} as const;

// Cache Keys
export const CACHE_KEYS = {
  USER_PROFILE: 'user_profile',
  BOOKINGS: 'bookings',
  WORKERS: 'workers',
  SERVICES: 'services',
  NOTIFICATIONS: 'notifications',
  PAYMENT_METHODS: 'payment_methods',
  ANALYTICS: 'analytics',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_PREFERENCES: 'userPreferences',
  LANGUAGE: 'language',
  THEME: 'theme',
  CART: 'cart',
} as const;

// Feature Flags
export const FEATURES = {
  REAL_TIME_TRACKING: true,
  CHAT_SUPPORT: true,
  PUSH_NOTIFICATIONS: true,
  ANALYTICS_DASHBOARD: true,
  PAYMENT_GATEWAY: true,
  GEOLOCATION: true,
  MULTI_LANGUAGE: true,
  DARK_MODE: false,
} as const;

// Environment Variables
export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001',
  STRIPE_PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',
  GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  FIREBASE_CONFIG: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  },
} as const;