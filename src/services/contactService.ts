import api from './api';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
  repliedAt?: string;
  resolvedAt?: string;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  attachments?: File[];
}

export interface ContactFilters {
  status?: string;
  priority?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  limit?: number;
}

class ContactService {
  // Send contact message
  async sendContactMessage(contactData: CreateContactRequest): Promise<{
    success: boolean;
    messageId: string;
    message: string;
  }> {
    const formData = new FormData();
    
    // Add text fields
    formData.append('name', contactData.name);
    formData.append('email', contactData.email);
    formData.append('subject', contactData.subject);
    formData.append('message', contactData.message);
    
    if (contactData.phone) {
      formData.append('phone', contactData.phone);
    }
    
    // Add attachments if any
    if (contactData.attachments && contactData.attachments.length > 0) {
      contactData.attachments.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file);
      });
    }

    const response = await api.post('/contact', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }

  // Get contact messages (admin only)
  async getContactMessages(filters?: ContactFilters): Promise<{
    messages: ContactMessage[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const response = await api.get('/contact/messages', { params: filters });
    return response.data;
  }

  // Get contact message by ID (admin only)
  async getContactMessage(messageId: string): Promise<ContactMessage> {
    const response = await api.get(`/contact/messages/${messageId}`);
    return response.data;
  }

  // Update contact message status (admin only)
  async updateMessageStatus(
    messageId: string, 
    status: 'new' | 'read' | 'replied' | 'resolved',
    adminNotes?: string
  ): Promise<ContactMessage> {
    const response = await api.patch(`/contact/messages/${messageId}/status`, {
      status,
      adminNotes,
    });
    return response.data;
  }

  // Reply to contact message (admin only)
  async replyToMessage(
    messageId: string,
    replyMessage: string,
    attachments?: File[]
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    const formData = new FormData();
    formData.append('replyMessage', replyMessage);
    
    if (attachments && attachments.length > 0) {
      attachments.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file);
      });
    }

    const response = await api.post(`/contact/messages/${messageId}/reply`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }

  // Delete contact message (admin only)
  async deleteMessage(messageId: string): Promise<void> {
    await api.delete(`/contact/messages/${messageId}`);
  }

  // Get contact statistics (admin only)
  async getContactStats(): Promise<{
    totalMessages: number;
    newMessages: number;
    resolvedMessages: number;
    averageResponseTime: number;
    messagesBySubject: Array<{
      subject: string;
      count: number;
    }>;
    messagesByMonth: Array<{
      month: string;
      count: number;
    }>;
  }> {
    const response = await api.get('/contact/stats');
    return response.data;
  }

  // Send newsletter subscription
  async subscribeNewsletter(email: string): Promise<{
    success: boolean;
    message: string;
  }> {
    const response = await api.post('/contact/newsletter/subscribe', { email });
    return response.data;
  }

  // Unsubscribe from newsletter
  async unsubscribeNewsletter(email: string, token?: string): Promise<{
    success: boolean;
    message: string;
  }> {
    const response = await api.post('/contact/newsletter/unsubscribe', { email, token });
    return response.data;
  }
}

export const contactService = new ContactService();