import { services, workers } from '../data';
import { format } from 'date-fns';

export interface InvoiceData {
  invoiceNumber: string;
  bookingNumber: string;
  issueDate: string;
  dueDate: string;
  booking: {
    id: string;
    serviceId: string;
    workerId: string;
    date: string;
    time: string;
    duration: number;
    location: string;
    customerInfo: {
      name: string;
      email: string;
      phone: string;
      specialInstructions?: string;
    };
    status: string;
    totalAmount: number;
    createdAt: string;
  };
  service: {
    name: string;
    description: string;
    category: string;
    priceRange: string;
  };
  worker: {
    name: string;
    location: string;
    rating: number;
    reviews: number;
  };
  pricing: {
    baseRate: number;
    hours: number;
    subtotal: number;
    tax: number;
    taxRate: number;
    total: number;
    currency: string;
  };
  company: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    businessReg: string;
    taxId: string;
  };
}

export const invoiceService = {
  generateInvoiceData: (bookingData: any): InvoiceData => {
    const service = services.find(s => s.id === bookingData.serviceId);
    const worker = workers.find(w => w.id === bookingData.workerId);
    
    // Calculate pricing breakdown
    const baseRate = Math.round(bookingData.totalAmount / bookingData.duration);
    const subtotal = baseRate * bookingData.duration;
    const taxRate = 0.15; // 15% tax
    const tax = Math.round(subtotal * taxRate);
    const total = subtotal + tax;
    
    // Generate invoice number
    const invoiceNumber = `INV-${Date.now().toString().slice(-8)}`;
    const issueDate = new Date().toISOString();
    const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days from now
    
    return {
      invoiceNumber,
      bookingNumber: bookingData.bookingNumber,
      issueDate,
      dueDate,
      booking: bookingData,
      service: {
        name: service?.name || 'Professional Cleaning Service',
        description: service?.description || 'Professional cleaning service tailored to your needs',
        category: service?.category || 'general',
        priceRange: service?.priceRange || 'Competitive rates',
      },
      worker: {
        name: worker?.name || 'Professional Cleaner',
        location: worker?.location || 'Available',
        rating: worker?.rating || 4.8,
        reviews: worker?.reviews || 100,
      },
      pricing: {
        baseRate,
        hours: bookingData.duration,
        subtotal,
        tax,
        taxRate,
        total,
        currency: 'LKR',
      },
      company: {
        name: 'Ceylon Clean Pro',
        address: '123 Main Street, Colombo 03, Sri Lanka',
        phone: '+94 11 234 5678',
        email: 'info@ceyloncleanpro.lk',
        website: 'www.ceyloncleanpro.lk',
        businessReg: 'LK1234567890',
        taxId: 'VAT-123456789',
      },
    };
  },

  generateInvoiceHTML: (invoiceData: InvoiceData): string => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice ${invoiceData.invoiceNumber} - Ceylon Clean Pro</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8f9fa;
            padding: 20px;
        }
        
        .invoice-container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .invoice-header {
            background: linear-gradient(135deg, #0d9488, #14b8a6, #06b6d4);
            color: white;
            padding: 40px;
            position: relative;
            overflow: hidden;
        }
        
        .invoice-header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
        }
        
        .header-content {
            position: relative;
            z-index: 1;
        }
        
        .company-logo {
            font-size: 36px;
            font-weight: bold;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .company-tagline {
            font-size: 18px;
            opacity: 0.9;
            margin-bottom: 30px;
        }
        
        .invoice-title {
            font-size: 48px;
            font-weight: bold;
            text-align: right;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .invoice-meta {
            background: #f1f5f9;
            padding: 30px 40px;
            border-bottom: 3px solid #0d9488;
        }
        
        .meta-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
        }
        
        .meta-section h3 {
            color: #0d9488;
            font-size: 18px;
            margin-bottom: 15px;
            font-weight: bold;
            border-bottom: 2px solid #0d9488;
            padding-bottom: 5px;
        }
        
        .meta-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .meta-label {
            font-weight: 600;
            color: #475569;
        }
        
        .meta-value {
            color: #1e293b;
            font-weight: 500;
        }
        
        .invoice-content {
            padding: 40px;
        }
        
        .section {
            margin-bottom: 40px;
        }
        
        .section-title {
            font-size: 20px;
            font-weight: bold;
            color: #0d9488;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #0d9488;
            display: flex;
            align-items: center;
        }
        
        .section-icon {
            margin-right: 10px;
            font-size: 24px;
        }
        
        .billing-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 40px;
        }
        
        .billing-section {
            background: #f8fafc;
            padding: 25px;
            border-radius: 10px;
            border-left: 4px solid #0d9488;
        }
        
        .billing-section h4 {
            color: #0d9488;
            font-size: 16px;
            margin-bottom: 15px;
            font-weight: bold;
        }
        
        .service-details {
            background: linear-gradient(135deg, #ecfdf5, #f0fdf4);
            border: 2px solid #10b981;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 30px;
        }
        
        .service-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .service-icon {
            width: 50px;
            height: 50px;
            background: #10b981;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            font-size: 24px;
        }
        
        .service-info h4 {
            color: #065f46;
            font-size: 20px;
            margin-bottom: 5px;
        }
        
        .service-info p {
            color: #047857;
            font-size: 14px;
        }
        
        .service-features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        
        .feature-item {
            background: white;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #d1fae5;
            font-size: 14px;
            color: #065f46;
        }
        
        .worker-info {
            background: linear-gradient(135deg, #fef3c7, #fef9c3);
            border: 2px solid #f59e0b;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 30px;
        }
        
        .worker-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .worker-avatar {
            width: 50px;
            height: 50px;
            background: #f59e0b;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            font-size: 20px;
            font-weight: bold;
        }
        
        .worker-details h4 {
            color: #92400e;
            font-size: 18px;
            margin-bottom: 5px;
        }
        
        .worker-stats {
            display: flex;
            align-items: center;
            gap: 15px;
            color: #b45309;
            font-size: 14px;
        }
        
        .rating {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .star {
            color: #fbbf24;
        }
        
        .itemized-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .itemized-table th {
            background: linear-gradient(135deg, #0d9488, #14b8a6);
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: bold;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .itemized-table td {
            padding: 15px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 14px;
        }
        
        .itemized-table tr:hover {
            background: #f8fafc;
        }
        
        .amount-cell {
            text-align: right;
            font-weight: 600;
            color: #1e293b;
        }
        
        .total-section {
            background: linear-gradient(135deg, #fef7cd, #fef3c7);
            border: 2px solid #f59e0b;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 30px;
        }
        
        .total-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .total-table td {
            padding: 10px 0;
            border-bottom: 1px solid #f3f4f6;
        }
        
        .total-label {
            font-weight: 600;
            color: #374151;
        }
        
        .total-amount {
            text-align: right;
            font-weight: 600;
            color: #1f2937;
        }
        
        .grand-total {
            border-top: 3px solid #f59e0b;
            padding-top: 15px;
            margin-top: 10px;
        }
        
        .grand-total .total-label {
            font-size: 18px;
            color: #92400e;
        }
        
        .grand-total .total-amount {
            font-size: 24px;
            color: #92400e;
            font-weight: bold;
        }
        
        .payment-terms {
            background: #f1f5f9;
            border: 2px solid #3b82f6;
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 30px;
        }
        
        .payment-terms h4 {
            color: #1d4ed8;
            margin-bottom: 15px;
            font-size: 16px;
        }
        
        .terms-list {
            list-style: none;
            padding: 0;
        }
        
        .terms-list li {
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
            color: #475569;
            position: relative;
            padding-left: 25px;
        }
        
        .terms-list li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
        }
        
        .footer {
            background: linear-gradient(135deg, #1e293b, #334155);
            color: white;
            padding: 30px 40px;
            text-align: center;
        }
        
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .footer-section h5 {
            color: #14b8a6;
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: bold;
        }
        
        .footer-section p {
            font-size: 13px;
            opacity: 0.9;
            line-height: 1.5;
        }
        
        .footer-bottom {
            border-top: 1px solid #475569;
            padding-top: 20px;
            margin-top: 20px;
        }
        
        .thank-you {
            font-size: 18px;
            font-weight: bold;
            color: #14b8a6;
            margin-bottom: 10px;
        }
        
        .status-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .status-confirmed {
            background: #dcfce7;
            color: #166534;
            border: 1px solid #16a34a;
        }
        
        .status-pending {
            background: #fef3c7;
            color: #92400e;
            border: 1px solid #f59e0b;
        }
        
        .qr-code {
            width: 80px;
            height: 80px;
            background: white;
            border: 2px solid #0d9488;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #0d9488;
            text-align: center;
            margin: 0 auto;
        }
        
        @media print {
            body { 
                padding: 0; 
                background: white;
            }
            .invoice-container { 
                box-shadow: none; 
                border-radius: 0;
            }
            .invoice-header::before {
                display: none;
            }
        }
        
        @media (max-width: 768px) {
            .meta-grid,
            .billing-grid,
            .service-features {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .invoice-title {
                font-size: 32px;
                text-align: center;
                margin-top: 20px;
            }
            
            .company-logo {
                text-align: center;
            }
            
            .itemized-table {
                font-size: 12px;
            }
            
            .itemized-table th,
            .itemized-table td {
                padding: 10px 8px;
            }
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <!-- Header -->
        <div class="invoice-header">
            <div class="header-content">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                        <div class="company-logo">${invoiceData.company.name}</div>
                        <div class="company-tagline">Professional Cleaning Services</div>
                        <div style="font-size: 14px; opacity: 0.8; margin-top: 10px;">
                            📍 ${invoiceData.company.address}<br>
                            📞 ${invoiceData.company.phone}<br>
                            📧 ${invoiceData.company.email}
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div class="invoice-title">INVOICE</div>
                        <div style="font-size: 18px; margin-top: 10px; opacity: 0.9;">
                            #${invoiceData.invoiceNumber}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Invoice Meta Information -->
        <div class="invoice-meta">
            <div class="meta-grid">
                <div class="meta-section">
                    <h3>📋 Invoice Details</h3>
                    <div class="meta-item">
                        <span class="meta-label">Invoice Number:</span>
                        <span class="meta-value">${invoiceData.invoiceNumber}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Booking Reference:</span>
                        <span class="meta-value">${invoiceData.bookingNumber}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Issue Date:</span>
                        <span class="meta-value">${format(new Date(invoiceData.issueDate), 'MMMM dd, yyyy')}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Due Date:</span>
                        <span class="meta-value">${format(new Date(invoiceData.dueDate), 'MMMM dd, yyyy')}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Status:</span>
                        <span class="meta-value">
                            <span class="status-badge status-${invoiceData.booking.status}">${invoiceData.booking.status}</span>
                        </span>
                    </div>
                </div>
                
                <div class="meta-section">
                    <h3>📅 Service Schedule</h3>
                    <div class="meta-item">
                        <span class="meta-label">Service Date:</span>
                        <span class="meta-value">${format(new Date(invoiceData.booking.date), 'EEEE, MMMM dd, yyyy')}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Service Time:</span>
                        <span class="meta-value">${invoiceData.booking.time}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Duration:</span>
                        <span class="meta-value">${invoiceData.booking.duration} hour${invoiceData.booking.duration > 1 ? 's' : ''}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Service Location:</span>
                        <span class="meta-value">${invoiceData.booking.location}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Booking Date:</span>
                        <span class="meta-value">${format(new Date(invoiceData.booking.createdAt), 'MMM dd, yyyy')}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Main Content -->
        <div class="invoice-content">
            <!-- Billing Information -->
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">👤</span>
                    Billing Information
                </h2>
                <div class="billing-grid">
                    <div class="billing-section">
                        <h4>Bill To:</h4>
                        <div style="margin-top: 10px;">
                            <div style="font-weight: bold; font-size: 16px; color: #1f2937; margin-bottom: 8px;">
                                ${invoiceData.booking.customerInfo.name}
                            </div>
                            <div style="color: #6b7280; margin-bottom: 4px;">
                                📧 ${invoiceData.booking.customerInfo.email}
                            </div>
                            <div style="color: #6b7280; margin-bottom: 4px;">
                                📞 ${invoiceData.booking.customerInfo.phone}
                            </div>
                            <div style="color: #6b7280;">
                                📍 ${invoiceData.booking.location}
                            </div>
                        </div>
                    </div>
                    
                    <div class="billing-section">
                        <h4>Service Provider:</h4>
                        <div style="margin-top: 10px;">
                            <div style="font-weight: bold; font-size: 16px; color: #1f2937; margin-bottom: 8px;">
                                ${invoiceData.company.name}
                            </div>
                            <div style="color: #6b7280; margin-bottom: 4px;">
                                📧 ${invoiceData.company.email}
                            </div>
                            <div style="color: #6b7280; margin-bottom: 4px;">
                                📞 ${invoiceData.company.phone}
                            </div>
                            <div style="color: #6b7280; margin-bottom: 4px;">
                                📍 ${invoiceData.company.address}
                            </div>
                            <div style="color: #6b7280; font-size: 12px;">
                                Business Reg: ${invoiceData.company.businessReg}<br>
                                Tax ID: ${invoiceData.company.taxId}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Service Details -->
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">🧹</span>
                    Service Details
                </h2>
                <div class="service-details">
                    <div class="service-header">
                        <div class="service-icon">🏠</div>
                        <div class="service-info">
                            <h4>${invoiceData.service.name}</h4>
                            <p>${invoiceData.service.description}</p>
                        </div>
                    </div>
                    <div class="service-features">
                        <div class="feature-item">
                            <strong>Category:</strong> ${invoiceData.service.category}
                        </div>
                        <div class="feature-item">
                            <strong>Price Range:</strong> ${invoiceData.service.priceRange}
                        </div>
                        <div class="feature-item">
                            <strong>Duration:</strong> ${invoiceData.booking.duration} hours
                        </div>
                        <div class="feature-item">
                            <strong>Service Type:</strong> Professional Cleaning
                        </div>
                    </div>
                    ${invoiceData.booking.customerInfo.specialInstructions ? `
                    <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px; border: 1px solid #d1fae5;">
                        <strong style="color: #065f46;">Special Instructions:</strong>
                        <p style="margin-top: 5px; color: #047857;">${invoiceData.booking.customerInfo.specialInstructions}</p>
                    </div>
                    ` : ''}
                </div>
            </div>
            
            <!-- Worker Information -->
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">👨‍💼</span>
                    Assigned Professional
                </h2>
                <div class="worker-info">
                    <div class="worker-header">
                        <div class="worker-avatar">${invoiceData.worker.name.charAt(0)}</div>
                        <div class="worker-details">
                            <h4>${invoiceData.worker.name}</h4>
                            <div class="worker-stats">
                                <div class="rating">
                                    <span class="star">⭐</span>
                                    <span>${invoiceData.worker.rating}</span>
                                </div>
                                <span>•</span>
                                <span>${invoiceData.worker.reviews} reviews</span>
                                <span>•</span>
                                <span>📍 ${invoiceData.worker.location}</span>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 15px; padding: 15px; background: white; border-radius: 8px;">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; font-size: 14px;">
                            <div><strong>Experience:</strong> Professional</div>
                            <div><strong>Verification:</strong> ✅ Verified</div>
                            <div><strong>Insurance:</strong> ✅ Covered</div>
                            <div><strong>Background Check:</strong> ✅ Passed</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Itemized Services -->
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">📊</span>
                    Itemized Services
                </h2>
                <table class="itemized-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Rate</th>
                            <th>Hours</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div style="font-weight: 600; margin-bottom: 4px;">${invoiceData.service.name}</div>
                                <div style="font-size: 12px; color: #6b7280;">${invoiceData.service.description}</div>
                                <div style="font-size: 12px; color: #059669; margin-top: 4px;">
                                    📅 ${format(new Date(invoiceData.booking.date), 'MMM dd, yyyy')} at ${invoiceData.booking.time}
                                </div>
                            </td>
                            <td class="amount-cell">Rs. ${invoiceData.pricing.baseRate.toLocaleString()}/hr</td>
                            <td class="amount-cell">${invoiceData.pricing.hours}</td>
                            <td class="amount-cell">Rs. ${invoiceData.pricing.subtotal.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- Total Calculation -->
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">💰</span>
                    Payment Summary
                </h2>
                <div class="total-section">
                    <table class="total-table">
                        <tr>
                            <td class="total-label">Subtotal:</td>
                            <td class="total-amount">Rs. ${invoiceData.pricing.subtotal.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td class="total-label">Tax (${(invoiceData.pricing.taxRate * 100).toFixed(0)}%):</td>
                            <td class="total-amount">Rs. ${invoiceData.pricing.tax.toLocaleString()}</td>
                        </tr>
                        <tr class="grand-total">
                            <td class="total-label">Total Amount:</td>
                            <td class="total-amount">Rs. ${invoiceData.pricing.total.toLocaleString()}</td>
                        </tr>
                    </table>
                    
                    <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px; text-align: center;">
                        <div style="font-size: 14px; color: #6b7280; margin-bottom: 10px;">
                            <strong>Calculation Formula:</strong>
                        </div>
                        <div style="font-family: monospace; background: #f3f4f6; padding: 10px; border-radius: 6px; font-size: 13px;">
                            Rs. ${invoiceData.pricing.baseRate.toLocaleString()} × ${invoiceData.pricing.hours} hours = Rs. ${invoiceData.pricing.subtotal.toLocaleString()}<br>
                            Tax: Rs. ${invoiceData.pricing.subtotal.toLocaleString()} × ${(invoiceData.pricing.taxRate * 100).toFixed(0)}% = Rs. ${invoiceData.pricing.tax.toLocaleString()}<br>
                            <strong>Total: Rs. ${invoiceData.pricing.total.toLocaleString()}</strong>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Payment Terms -->
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">📋</span>
                    Terms & Conditions
                </h2>
                <div class="payment-terms">
                    <h4>Payment & Service Terms:</h4>
                    <ul class="terms-list">
                        <li>Payment is due within 30 days of invoice date</li>
                        <li>Service will be provided at the scheduled date and time</li>
                        <li>Cancellation must be made 24 hours in advance for full refund</li>
                        <li>All staff are background verified and fully insured</li>
                        <li>We guarantee 100% satisfaction with our services</li>
                        <li>Payment can be made via cash, card, or bank transfer</li>
                        <li>Late payment may incur additional charges</li>
                        <li>Any disputes must be reported within 48 hours of service completion</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h5>Contact Information</h5>
                    <p>
                        📞 ${invoiceData.company.phone}<br>
                        📧 ${invoiceData.company.email}<br>
                        🌐 ${invoiceData.company.website}
                    </p>
                </div>
                <div class="footer-section">
                    <h5>Business Details</h5>
                    <p>
                        Business Reg: ${invoiceData.company.businessReg}<br>
                        Tax ID: ${invoiceData.company.taxId}<br>
                        Licensed & Insured
                    </p>
                </div>
                <div class="footer-section">
                    <h5>Quick Payment</h5>
                    <div class="qr-code">
                        QR Code<br>
                        Payment
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="thank-you">Thank you for choosing Ceylon Clean Pro!</div>
                <p style="font-size: 14px; opacity: 0.9;">
                    Your satisfaction is our priority. For any questions about this invoice, 
                    please contact us at ${invoiceData.company.email} or ${invoiceData.company.phone}
                </p>
                <p style="font-size: 12px; opacity: 0.7; margin-top: 10px;">
                    This is a computer-generated invoice. No signature required.
                </p>
            </div>
        </div>
    </div>
    
    <script>
        // Auto-print functionality
        window.onload = function() {
            // Add print button for manual printing
            const printButton = document.createElement('button');
            printButton.innerHTML = '🖨️ Print Invoice';
            printButton.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #0d9488;
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1000;
            `;
            printButton.onclick = () => window.print();
            document.body.appendChild(printButton);
            
            // Auto-print after a short delay
            setTimeout(() => {
                window.print();
            }, 1000);
        };
        
        // Hide print button when printing
        window.onbeforeprint = function() {
            const printButton = document.querySelector('button');
            if (printButton) printButton.style.display = 'none';
        };
        
        window.onafterprint = function() {
            const printButton = document.querySelector('button');
            if (printButton) printButton.style.display = 'block';
        };
    </script>
</body>
</html>
    `;
  },

  downloadInvoice: async (bookingData: any, filename?: string): Promise<void> => {
    try {
      const invoiceData = invoiceService.generateInvoiceData(bookingData);
      const htmlContent = invoiceService.generateInvoiceHTML(invoiceData);
      
      // Create blob and download
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `Invoice-${invoiceData.invoiceNumber}-${invoiceData.bookingNumber}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      throw error;
    }
  },

  emailInvoice: async (bookingData: any, recipientEmail?: string): Promise<void> => {
    try {
      const invoiceData = invoiceService.generateInvoiceData(bookingData);
      
      // Create email content
      const emailSubject = `📧 Invoice ${invoiceData.invoiceNumber} - Ceylon Clean Pro | Booking ${invoiceData.bookingNumber}`;
      
      const emailBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Invoice - Ceylon Clean Pro</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #0d9488, #14b8a6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef; }
        .invoice-summary { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .amount-highlight { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; text-align: center; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; }
        .button { background: #0d9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Ceylon Clean Pro</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Professional Cleaning Services</p>
        </div>
        
        <div class="content">
            <h2 style="color: #0d9488; margin-bottom: 20px;">📧 Invoice Attached</h2>
            
            <p>Dear ${invoiceData.booking.customerInfo.name},</p>
            
            <p>Thank you for choosing Ceylon Clean Pro! Please find your invoice attached for the following service:</p>
            
            <div class="invoice-summary">
                <h3 style="color: #0d9488; margin-bottom: 15px;">Invoice Summary</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Invoice Number:</strong></td><td style="text-align: right;">${invoiceData.invoiceNumber}</td></tr>
                    <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Booking Reference:</strong></td><td style="text-align: right;">${invoiceData.bookingNumber}</td></tr>
                    <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Service:</strong></td><td style="text-align: right;">${invoiceData.service.name}</td></tr>
                    <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Service Date:</strong></td><td style="text-align: right;">${format(new Date(invoiceData.booking.date), 'MMM dd, yyyy')}</td></tr>
                    <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Duration:</strong></td><td style="text-align: right;">${invoiceData.booking.duration} hours</td></tr>
                    <tr><td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Assigned Cleaner:</strong></td><td style="text-align: right;">${invoiceData.worker.name}</td></tr>
                </table>
            </div>
            
            <div class="amount-highlight">
                <h3 style="color: #92400e; margin: 0 0 10px 0;">💰 Total Amount</h3>
                <div style="font-size: 24px; font-weight: bold; color: #92400e;">Rs. ${invoiceData.pricing.total.toLocaleString()}</div>
                <div style="font-size: 14px; color: #b45309; margin-top: 5px;">
                    (Subtotal: Rs. ${invoiceData.pricing.subtotal.toLocaleString()} + Tax: Rs. ${invoiceData.pricing.tax.toLocaleString()})
                </div>
            </div>
            
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 15px; margin: 20px 0;">
                <h4 style="color: #dc2626; margin: 0 0 10px 0;">📋 Important Information:</h4>
                <ul style="color: #dc2626; margin: 0; padding-left: 20px;">
                    <li>Payment is due within 30 days of invoice date</li>
                    <li>Service will be provided on ${format(new Date(invoiceData.booking.date), 'EEEE, MMMM dd, yyyy')} at ${invoiceData.booking.time}</li>
                    <li>Please ensure someone is available at the service location</li>
                    <li>Our cleaner will arrive with all necessary equipment</li>
                    <li>For any changes, contact us at least 24 hours in advance</li>
                </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="tel:${invoiceData.company.phone}" class="button">📞 Call Us</a>
                <a href="mailto:${invoiceData.company.email}" class="button">📧 Email Us</a>
                <a href="${invoiceData.company.website}" class="button">🌐 Visit Website</a>
            </div>
            
            <div class="footer">
                <p style="margin: 0 0 15px 0;">Need help? Contact us:</p>
                <p style="margin: 0; font-weight: bold;">📞 ${invoiceData.company.phone} | 📧 ${invoiceData.company.email}</p>
                <p style="margin: 15px 0 0 0; font-size: 14px;">
                    Thank you for choosing Ceylon Clean Pro!<br>
                    Your satisfaction is our priority.
                </p>
                <p style="margin: 15px 0 0 0; font-size: 12px; color: #9ca3af;">
                    Business Registration: ${invoiceData.company.businessReg} | Tax ID: ${invoiceData.company.taxId}
                </p>
            </div>
        </div>
    </div>
</body>
</html>
      `;
      
      // Simulate email sending (in real app, this would call an email service)
      console.log(`📧 Invoice Email Sent:
To: ${recipientEmail || invoiceData.booking.customerInfo.email}
Subject: ${emailSubject}
Invoice: ${invoiceData.invoiceNumber}
Amount: Rs. ${invoiceData.pricing.total.toLocaleString()}`);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error('Error emailing invoice:', error);
      throw error;
    }
  },
};

export default invoiceService;