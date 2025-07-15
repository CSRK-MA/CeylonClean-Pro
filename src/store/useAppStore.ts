import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'customer' | 'worker' | 'admin';
  preferences: {
    language: string;
    notifications: boolean;
    theme: 'light' | 'dark';
  };
}

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // UI state
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  loading: boolean;
  
  // Booking state
  activeBookings: any[];
  
  // Notification state
  notifications: any[];
  unreadCount: number;
  
  // Location state
  userLocation: {
    latitude: number | null;
    longitude: number | null;
  };
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLoading: (loading: boolean) => void;
  setActiveBookings: (bookings: any[]) => void;
  addNotification: (notification: any) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  setUserLocation: (latitude: number, longitude: number) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      sidebarOpen: false,
      theme: 'light',
      loading: false,
      activeBookings: [],
      notifications: [],
      unreadCount: 0,
      userLocation: {
        latitude: null,
        longitude: null,
      },
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      setTheme: (theme) => set({ theme }),
      
      setLoading: (loading) => set({ loading }),
      
      setActiveBookings: (bookings) => set({ activeBookings: bookings }),
      
      addNotification: (notification) => {
        const { notifications } = get();
        set({
          notifications: [notification, ...notifications],
          unreadCount: get().unreadCount + 1,
        });
      },
      
      markNotificationAsRead: (id) => {
        const { notifications } = get();
        const updatedNotifications = notifications.map(notif =>
          notif.id === id ? { ...notif, isRead: true } : notif
        );
        const unreadCount = updatedNotifications.filter(notif => !notif.isRead).length;
        set({
          notifications: updatedNotifications,
          unreadCount,
        });
      },
      
      clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
      
      setUserLocation: (latitude, longitude) => set({
        userLocation: { latitude, longitude }
      }),
      
      logout: () => {
        localStorage.removeItem('authToken');
        set({
          user: null,
          isAuthenticated: false,
          activeBookings: [],
          notifications: [],
          unreadCount: 0,
        });
      },
    }),
    {
      name: 'ceylon-clean-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        userLocation: state.userLocation,
      }),
    }
  )
);