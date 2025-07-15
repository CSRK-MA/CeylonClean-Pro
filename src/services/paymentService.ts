import api from './api';

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_account' | 'digital_wallet';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'succeeded' | 'failed';
  clientSecret: string;
}

export interface PaymentHistory {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  paymentMethod: string;
  createdAt: string;
  refundedAt?: string;
  refundAmount?: number;
}

class PaymentService {
  // Create payment intent
  async createPaymentIntent(
    bookingId: string,
    amount: number,
    currency: string = 'LKR'
  ): Promise<PaymentIntent> {
    const response = await api.post('/payments/create-intent', {
      bookingId,
      amount,
      currency,
    });
    return response.data;
  }

  // Confirm payment
  async confirmPayment(
    paymentIntentId: string,
    paymentMethodId: string
  ): Promise<{ success: boolean; error?: string }> {
    const response = await api.post('/payments/confirm', {
      paymentIntentId,
      paymentMethodId,
    });
    return response.data;
  }

  // Get payment methods
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await api.get('/payments/methods');
    return response.data;
  }

  // Add payment method
  async addPaymentMethod(paymentMethodData: {
    type: string;
    cardNumber?: string;
    expiryMonth?: number;
    expiryYear?: number;
    cvc?: string;
    accountNumber?: string;
    routingNumber?: string;
  }): Promise<PaymentMethod> {
    const response = await api.post('/payments/methods', paymentMethodData);
    return response.data;
  }

  // Delete payment method
  async deletePaymentMethod(paymentMethodId: string): Promise<void> {
    await api.delete(`/payments/methods/${paymentMethodId}`);
  }

  // Set default payment method
  async setDefaultPaymentMethod(paymentMethodId: string): Promise<void> {
    await api.patch(`/payments/methods/${paymentMethodId}/default`);
  }

  // Get payment history
  async getPaymentHistory(filters?: {
    startDate?: string;
    endDate?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    payments: PaymentHistory[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const response = await api.get('/payments/history', { params: filters });
    return response.data;
  }

  // Request refund
  async requestRefund(
    paymentId: string,
    amount?: number,
    reason?: string
  ): Promise<{ success: boolean; refundId: string }> {
    const response = await api.post(`/payments/${paymentId}/refund`, {
      amount,
      reason,
    });
    return response.data;
  }

  // Get payment analytics
  async getPaymentAnalytics(period: 'week' | 'month' | 'year'): Promise<{
    totalRevenue: number;
    successfulPayments: number;
    failedPayments: number;
    refundedAmount: number;
    averageTransactionValue: number;
    paymentMethodBreakdown: Array<{ method: string; count: number; amount: number }>;
    revenueByPeriod: Array<{ date: string; amount: number }>;
  }> {
    const response = await api.get('/payments/analytics', { params: { period } });
    return response.data;
  }
}

export const paymentService = new PaymentService();