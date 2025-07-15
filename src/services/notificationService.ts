import api from './api';

export interface Notification {
  id: string;
  type: 'booking_confirmed' | 'booking_reminder' | 'payment_received' | 'service_completed' | 'promotion' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  actionText?: string;
  createdAt: string;
  readAt?: string;
}

export interface NotificationPreferences {
  email: {
    bookingUpdates: boolean;
    promotions: boolean;
    reminders: boolean;
    newsletter: boolean;
  };
  sms: {
    bookingUpdates: boolean;
    reminders: boolean;
    emergencyAlerts: boolean;
  };
  push: {
    bookingUpdates: boolean;
    promotions: boolean;
    reminders: boolean;
    chat: boolean;
  };
}

class NotificationService {
  // Get user notifications
  async getNotifications(filters?: {
    type?: string;
    isRead?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{
    notifications: Notification[];
    total: number;
    unreadCount: number;
    page: number;
    totalPages: number;
  }> {
    const response = await api.get('/notifications', { params: filters });
    return response.data;
  }

  // Mark notification as read
  async markAsRead(notificationId: string): Promise<void> {
    await api.patch(`/notifications/${notificationId}/read`);
  }

  // Mark all notifications as read
  async markAllAsRead(): Promise<void> {
    await api.patch('/notifications/read-all');
  }

  // Delete notification
  async deleteNotification(notificationId: string): Promise<void> {
    await api.delete(`/notifications/${notificationId}`);
  }

  // Get notification preferences
  async getPreferences(): Promise<NotificationPreferences> {
    const response = await api.get('/notifications/preferences');
    return response.data;
  }

  // Update notification preferences
  async updatePreferences(preferences: NotificationPreferences): Promise<void> {
    await api.patch('/notifications/preferences', preferences);
  }

  // Subscribe to push notifications
  async subscribeToPush(subscription: PushSubscription): Promise<void> {
    await api.post('/notifications/push/subscribe', {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.getKey('p256dh'),
        auth: subscription.getKey('auth'),
      },
    });
  }

  // Unsubscribe from push notifications
  async unsubscribeFromPush(): Promise<void> {
    await api.post('/notifications/push/unsubscribe');
  }

  // Send test notification
  async sendTestNotification(type: string): Promise<void> {
    await api.post('/notifications/test', { type });
  }

  // Get notification analytics
  async getAnalytics(): Promise<{
    totalSent: number;
    deliveryRate: number;
    openRate: number;
    clickRate: number;
    notificationsByType: Array<{ type: string; count: number }>;
    engagementTrends: Array<{ date: string; sent: number; opened: number; clicked: number }>;
  }> {
    const response = await api.get('/notifications/analytics');
    return response.data;
  }
}

export const notificationService = new NotificationService();