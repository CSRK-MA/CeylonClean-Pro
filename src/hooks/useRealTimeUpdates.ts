import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'react-hot-toast';

interface RealTimeUpdate {
  type: 'booking_update' | 'payment_update' | 'worker_location' | 'chat_message' | 'notification';
  data: any;
  timestamp: string;
}

export const useRealTimeUpdates = (userId?: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [updates, setUpdates] = useState<RealTimeUpdate[]>([]);

  useEffect(() => {
    if (!userId) return;

    const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001', {
      auth: {
        token: localStorage.getItem('authToken'),
        userId,
      },
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to real-time updates');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from real-time updates');
    });

    newSocket.on('booking_update', (data) => {
      const update: RealTimeUpdate = {
        type: 'booking_update',
        data,
        timestamp: new Date().toISOString(),
      };
      setUpdates(prev => [update, ...prev.slice(0, 99)]); // Keep last 100 updates
      
      // Show toast notification
      if (data.status === 'confirmed') {
        toast.success('Booking confirmed!');
      } else if (data.status === 'cancelled') {
        toast.error('Booking cancelled');
      }
    });

    newSocket.on('payment_update', (data) => {
      const update: RealTimeUpdate = {
        type: 'payment_update',
        data,
        timestamp: new Date().toISOString(),
      };
      setUpdates(prev => [update, ...prev.slice(0, 99)]);
      
      if (data.status === 'succeeded') {
        toast.success('Payment successful!');
      } else if (data.status === 'failed') {
        toast.error('Payment failed');
      }
    });

    newSocket.on('worker_location', (data) => {
      const update: RealTimeUpdate = {
        type: 'worker_location',
        data,
        timestamp: new Date().toISOString(),
      };
      setUpdates(prev => [update, ...prev.slice(0, 99)]);
    });

    newSocket.on('new_notification', (data) => {
      const update: RealTimeUpdate = {
        type: 'notification',
        data,
        timestamp: new Date().toISOString(),
      };
      setUpdates(prev => [update, ...prev.slice(0, 99)]);
      
      // Show toast for high priority notifications
      if (data.priority === 'high') {
        toast(data.message, {
          icon: '🔔',
          duration: 5000,
        });
      }
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
      toast.error('Connection error occurred');
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [userId]);

  const emitUpdate = (type: string, data: any) => {
    if (socket && isConnected) {
      socket.emit(type, data);
    }
  };

  const clearUpdates = () => {
    setUpdates([]);
  };

  return {
    socket,
    isConnected,
    updates,
    emitUpdate,
    clearUpdates,
  };
};