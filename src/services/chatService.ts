import api from './api';
import { io, Socket } from 'socket.io-client';

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'customer' | 'worker' | 'admin';
  message: string;
  messageType: 'text' | 'image' | 'file' | 'location' | 'system';
  attachments?: Array<{
    id: string;
    filename: string;
    url: string;
    type: string;
    size: number;
  }>;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  bookingId?: string;
  participants: Array<{
    id: string;
    name: string;
    avatar?: string;
    type: 'customer' | 'worker' | 'admin';
    isOnline: boolean;
    lastSeen?: string;
  }>;
  lastMessage?: ChatMessage;
  unreadCount: number;
  status: 'active' | 'archived' | 'closed';
  createdAt: string;
  updatedAt: string;
}

class ChatService {
  private socket: Socket | null = null;

  // Initialize socket connection
  initializeSocket(userId: string): void {
    if (this.socket) {
      this.socket.disconnect();
    }

    this.socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001', {
      auth: {
        token: localStorage.getItem('authToken'),
        userId,
      },
    });

    this.socket.on('connect', () => {
      console.log('Connected to chat server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from chat server');
    });
  }

  // Disconnect socket
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Get conversations
  async getConversations(filters?: {
    status?: string;
    bookingId?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    conversations: Conversation[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const response = await api.get('/chat/conversations', { params: filters });
    return response.data;
  }

  // Get conversation messages
  async getMessages(
    conversationId: string,
    page: number = 1,
    limit: number = 50
  ): Promise<{
    messages: ChatMessage[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const response = await api.get(`/chat/conversations/${conversationId}/messages`, {
      params: { page, limit },
    });
    return response.data;
  }

  // Send message
  async sendMessage(
    conversationId: string,
    message: string,
    messageType: string = 'text',
    attachments?: File[]
  ): Promise<ChatMessage> {
    const formData = new FormData();
    formData.append('message', message);
    formData.append('messageType', messageType);

    if (attachments) {
      attachments.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file);
      });
    }

    const response = await api.post(
      `/chat/conversations/${conversationId}/messages`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // Emit message via socket for real-time delivery
    if (this.socket) {
      this.socket.emit('send_message', response.data);
    }

    return response.data;
  }

  // Mark messages as read
  async markAsRead(conversationId: string, messageIds: string[]): Promise<void> {
    await api.patch(`/chat/conversations/${conversationId}/read`, { messageIds });

    // Emit read status via socket
    if (this.socket) {
      this.socket.emit('mark_read', { conversationId, messageIds });
    }
  }

  // Create conversation
  async createConversation(
    participantIds: string[],
    bookingId?: string
  ): Promise<Conversation> {
    const response = await api.post('/chat/conversations', {
      participantIds,
      bookingId,
    });
    return response.data;
  }

  // Archive conversation
  async archiveConversation(conversationId: string): Promise<void> {
    await api.patch(`/chat/conversations/${conversationId}/archive`);
  }

  // Delete conversation
  async deleteConversation(conversationId: string): Promise<void> {
    await api.delete(`/chat/conversations/${conversationId}`);
  }

  // Socket event listeners
  onNewMessage(callback: (message: ChatMessage) => void): void {
    if (this.socket) {
      this.socket.on('new_message', callback);
    }
  }

  onMessageRead(callback: (data: { conversationId: string; messageIds: string[] }) => void): void {
    if (this.socket) {
      this.socket.on('message_read', callback);
    }
  }

  onUserOnline(callback: (userId: string) => void): void {
    if (this.socket) {
      this.socket.on('user_online', callback);
    }
  }

  onUserOffline(callback: (userId: string) => void): void {
    if (this.socket) {
      this.socket.on('user_offline', callback);
    }
  }

  onTyping(callback: (data: { conversationId: string; userId: string; isTyping: boolean }) => void): void {
    if (this.socket) {
      this.socket.on('typing', callback);
    }
  }

  // Emit typing status
  emitTyping(conversationId: string, isTyping: boolean): void {
    if (this.socket) {
      this.socket.emit('typing', { conversationId, isTyping });
    }
  }

  // Get chat analytics
  async getAnalytics(): Promise<{
    totalConversations: number;
    activeConversations: number;
    averageResponseTime: number;
    messageVolume: number;
    customerSatisfaction: number;
    conversationsByType: Array<{ type: string; count: number }>;
    responseTimeByHour: Array<{ hour: number; avgResponseTime: number }>;
  }> {
    const response = await api.get('/chat/analytics');
    return response.data;
  }
}

export const chatService = new ChatService();