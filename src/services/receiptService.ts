import mockApi from './mockApi';
import { services, workers } from '../data';

export const receiptService = {
  downloadReceipt: async (bookingId: string, filename?: string): Promise<void> => {
    try {
      const { booking, receiptData } = await mockApi.generateReceipt(bookingId);
      
      // Get service and worker details
      const service = services.find(s => s.id === booking.serviceId);
      const worker = workers.find(w => w.id === booking.workerId);
      
      // Calculate breakdown
      const serviceRate = Math.round(booking.totalAmount / booking.duration);
      const subtotal = booking.totalAmount;
      const tax = Math.round(subtotal * 0.15); // 15% tax
      const total = subtotal + tax;
      
      // Create PDF content using HTML and CSS
      const pdfContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Receipt - ${booking.bookingNumber}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.4;
            color: #333;
            background: white;
            padding: 20px;
        }
        
        .receipt-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border: 2px solid #0d9488;
            border-radius: 10px;
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #0d9488, #14b8a6);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .company-name {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .company-tagline {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .receipt-title {
            background: #f8fafc;
            padding: 20px;
            text-align: center;
            border-bottom: 2px solid #e2e8f0;
        }
        
        .receipt-number {
            font-size: 24px;
            font-weight: bold;
            color: #0d9488;
            margin-bottom: 5px;
        }
        
        .receipt-date {
            color: #64748b;
            font-size: 14px;
        }
        
        .content {
            padding: 30px;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #0d9488;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #0d9488;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .info-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .info-label {
            font-weight: 600;
            color: #475569;
        }
        
        .info-value {
            color: #1e293b;
            text-align: right;
        }
        
        .service-details {
            background: #f1f5f9;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .worker-info {
            background: #ecfdf5;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #10b981;
        }
        
        .payment-summary {
            background: #fefce8;
            border: 2px solid #eab308;
            border-radius: 8px;
            padding: 20px;
        }
        
        .payment-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
        }
        
        .payment-total {
            border-top: 2px solid #0d9488;
            margin-top: 10px;
            padding-top: 10px;
            font-size: 18px;
            font-weight: bold;
            color: #0d9488;
        }
        
        .terms {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
        }
        
        .terms ul {
            list-style-type: disc;
            margin-left: 20px;
        }
        
        .terms li {
            margin-bottom: 5px;
            color: #475569;
        }
        
        .footer {
            background: #1e293b;
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .contact-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 15px;
        }
        
        .contact-item {
            font-size: 14px;
        }
        
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
        }
        
        .status-confirmed {
            background: #dcfce7;
            color: #166534;
        }
        
        @media print {
            body { padding: 0; }
            .receipt-container { border: none; }
        }
    </style>
</head>
<body>
    <div class="receipt-container">
        <!-- Header -->
        <div class="header">
            <div class="company-name">Ceylon Clean Pro</div>
            <div class="company-tagline">Professional Cleaning Services</div>
        </div>
        
        <!-- Receipt Title -->
        <div class="receipt-title">
            <div class="receipt-number">Receipt #${receiptData.receiptNumber}</div>
            <div class="receipt-date">
                Generated on ${new Date(receiptData.generatedAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} at ${new Date(receiptData.generatedAt).toLocaleTimeString('en-US')}
            </div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Booking Information -->
            <div class="section">
                <div class="section-title">📋 Booking Information</div>
                <div class="info-grid">
                    <div>
                        <div class="info-item">
                            <span class="info-label">Booking Number:</span>
                            <span class="info-value">${booking.bookingNumber}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Status:</span>
                            <span class="info-value">
                                <span class="status-badge status-confirmed">${booking.status}</span>
                            </span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Service Date:</span>
                            <span class="info-value">${new Date(booking.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Service Time:</span>
                            <span class="info-value">${booking.time}</span>
                        </div>
                    </div>
                    <div>
                        <div class="info-item">
                            <span class="info-label">Duration:</span>
                            <span class="info-value">${booking.duration} hour${booking.duration > 1 ? 's' : ''}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Payment Method:</span>
                            <span class="info-value">${booking.paymentMethod.toUpperCase()}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Booking Date:</span>
                            <span class="info-value">${new Date(booking.createdAt).toLocaleDateString('en-US')}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Service Location:</span>
                            <span class="info-value">${booking.location}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Service Details -->
            <div class="section">
                <div class="section-title">🧹 Service Details</div>
                <div class="service-details">
                    <h4 style="color: #0d9488; margin-bottom: 10px; font-size: 16px;">${service?.name || 'Professional Cleaning Service'}</h4>
                    <p style="color: #64748b; margin-bottom: 10px;">${service?.description || 'Professional cleaning service tailored to your needs.'}</p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-top: 15px;">
                        <div><strong>Category:</strong> ${service?.category || 'General'}</div>
                        <div><strong>Price Range:</strong> ${service?.priceRange || 'Competitive rates'}</div>
                        <div><strong>Est. Duration:</strong> ${service?.duration || `${booking.duration} hours`}</div>
                        <div><strong>Rating:</strong> ${service?.rating || 'N/A'} ⭐</div>
                    </div>
                </div>
            </div>
            
            <!-- Worker Information -->
            <div class="section">
                <div class="section-title">👨‍💼 Assigned Cleaner</div>
                <div class="worker-info">
                    <h4 style="color: #059669; margin-bottom: 10px; font-size: 16px;">${worker?.name || 'Professional Cleaner'}</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
                        <div><strong>Location:</strong> ${worker?.location || 'Available'}</div>
                        <div><strong>Rating:</strong> ${worker?.rating || 'N/A'} ⭐ (${worker?.reviews || 'N/A'} reviews)</div>
                        <div><strong>Availability:</strong> ${worker?.availability || 'Confirmed'}</div>
                        <div><strong>Specialties:</strong> ${worker?.skills?.join(', ') || 'General cleaning'}</div>
                    </div>
                </div>
            </div>
            
            <!-- Customer Information -->
            <div class="section">
                <div class="section-title">👤 Customer Details</div>
                <div class="info-grid">
                    <div>
                        <div class="info-item">
                            <span class="info-label">Name:</span>
                            <span class="info-value">${booking.customerInfo.name}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Email:</span>
                            <span class="info-value">${booking.customerInfo.email}</span>
                        </div>
                    </div>
                    <div>
                        <div class="info-item">
                            <span class="info-label">Phone:</span>
                            <span class="info-value">${booking.customerInfo.phone}</span>
                        </div>
                        ${booking.customerInfo.specialInstructions ? `
                        <div class="info-item">
                            <span class="info-label">Special Instructions:</span>
                            <span class="info-value">${booking.customerInfo.specialInstructions}</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
            
            <!-- Payment Summary -->
            <div class="section">
                <div class="section-title">💰 Payment Summary</div>
                <div class="payment-summary">
                    <div class="payment-row">
                        <span>Service Rate (Rs. ${serviceRate.toLocaleString()}/hour × ${booking.duration} hour${booking.duration > 1 ? 's' : ''}):</span>
                        <span>Rs. ${subtotal.toLocaleString()}</span>
                    </div>
                    <div class="payment-row">
                        <span>Tax (15%):</span>
                        <span>Rs. ${tax.toLocaleString()}</span>
                    </div>
                    <div class="payment-row payment-total">
                        <span>Total Amount:</span>
                        <span>Rs. ${total.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            
            <!-- Terms & Conditions -->
            <div class="section">
                <div class="section-title">📜 Terms & Conditions</div>
                <div class="terms">
                    <ul>
                        <li>Service will be provided at the scheduled date and time</li>
                        <li>Cancellation must be made 24 hours in advance for full refund</li>
                        <li>All our staff are background verified and fully insured</li>
                        <li>We guarantee 100% satisfaction with our services</li>
                        <li>Payment can be made via cash or card upon service completion</li>
                        <li>Please ensure someone is available at the service location</li>
                        <li>Our cleaner will arrive with all necessary equipment and supplies</li>
                        <li>For any issues or concerns, contact us immediately</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="contact-info">
                <div class="contact-item">
                    📞 Phone: ${receiptData.companyInfo.phone}
                </div>
                <div class="contact-item">
                    📧 Email: ${receiptData.companyInfo.email}
                </div>
                <div class="contact-item">
                    🌐 Website: ${receiptData.companyInfo.website}
                </div>
                <div class="contact-item">
                    📍 Address: ${receiptData.companyInfo.address}
                </div>
            </div>
            <div style="border-top: 1px solid #475569; padding-top: 15px; margin-top: 15px;">
                <p style="margin-bottom: 5px;"><strong>Thank you for choosing Ceylon Clean Pro!</strong></p>
                <p style="font-size: 12px; opacity: 0.8;">Your satisfaction is our priority. Business Registration: ${receiptData.companyInfo.businessReg}</p>
            </div>
        </div>
    </div>
    
    <script>
        // Auto-print when page loads
        window.onload = function() {
            setTimeout(function() {
                window.print();
            }, 500);
        };
    </script>
</body>
</html>
      `;
      
      // Create a blob with the HTML content
      const blob = new Blob([pdfContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link element and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `CeylonClean-Receipt-${booking.bookingNumber}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL object
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading receipt:', error);
      throw error;
    }
  },

  emailReceipt: async (bookingId: string, email?: string): Promise<void> => {
    try {
      const { booking, receiptData } = await mockApi.generateReceipt(bookingId);
      
      // Get service and worker details
      const service = services.find(s => s.id === booking.serviceId);
      const worker = workers.find(w => w.id === booking.workerId);
      
      // Calculate breakdown
      const serviceRate = Math.round(booking.totalAmount / booking.duration);
      const subtotal = booking.totalAmount;
      const tax = Math.round(subtotal * 0.15);
      const total = subtotal + tax;
      
      const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Booking Confirmation - Ceylon Clean Pro</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #0d9488, #14b8a6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef; }
        .success-banner { background: #d1fae5; border: 1px solid #10b981; border-radius: 8px; padding: 20px; margin-bottom: 25px; text-align: center; }
        .section { margin-bottom: 25px; }
        .section-title { color: #0d9488; border-bottom: 2px solid #0d9488; padding-bottom: 10px; margin-bottom: 15px; font-weight: bold; }
        .info-table { width: 100%; border-collapse: collapse; }
        .info-table td { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
        .info-table .label { font-weight: bold; width: 40%; }
        .payment-box { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; }
        .payment-total { border-top: 2px solid #0d9488; padding-top: 12px; font-weight: bold; font-size: 18px; color: #0d9488; }
        .reminder-box { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Ceylon Clean Pro</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Professional Cleaning Services</p>
        </div>
        
        <div class="content">
            <div class="success-banner">
                <h2 style="color: #065f46; margin: 0 0 10px 0;">✅ Booking Confirmed!</h2>
                <p style="color: #047857; margin: 0; font-size: 16px;">Your cleaning service has been successfully booked.</p>
            </div>
            
            <div class="section">
                <h3 class="section-title">📋 Booking Details</h3>
                <table class="info-table">
                    <tr><td class="label">Booking Number:</td><td>${booking.bookingNumber}</td></tr>
                    <tr><td class="label">Service:</td><td>${service?.name || booking.serviceId}</td></tr>
                    <tr><td class="label">Assigned Cleaner:</td><td>${worker?.name || booking.workerId}</td></tr>
                    <tr><td class="label">Date:</td><td>${new Date(booking.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</td></tr>
                    <tr><td class="label">Time:</td><td>${booking.time}</td></tr>
                    <tr><td class="label">Duration:</td><td>${booking.duration} hour${booking.duration > 1 ? 's' : ''}</td></tr>
                    <tr><td class="label">Location:</td><td>${booking.location}</td></tr>
                </table>
            </div>
            
            <div class="section">
                <h3 class="section-title">👤 Customer Information</h3>
                <table class="info-table">
                    <tr><td class="label">Name:</td><td>${booking.customerInfo.name}</td></tr>
                    <tr><td class="label">Email:</td><td>${booking.customerInfo.email}</td></tr>
                    <tr><td class="label">Phone:</td><td>${booking.customerInfo.phone}</td></tr>
                    ${booking.customerInfo.specialInstructions ? `<tr><td class="label">Special Instructions:</td><td>${booking.customerInfo.specialInstructions}</td></tr>` : ''}
                </table>
            </div>
            
            <div class="section">
                <h3 class="section-title">💰 Payment Summary</h3>
                <div class="payment-box">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td>Service Rate (${booking.duration} hour${booking.duration > 1 ? 's' : ''}):</td><td style="text-align: right;">Rs. ${subtotal.toLocaleString()}</td></tr>
                        <tr><td>Tax (15%):</td><td style="text-align: right;">Rs. ${tax.toLocaleString()}</td></tr>
                        <tr class="payment-total"><td>Total Amount:</td><td style="text-align: right;">Rs. ${total.toLocaleString()}</td></tr>
                    </table>
                </div>
            </div>
            
            <div class="reminder-box">
                <h4 style="color: #92400e; margin: 0 0 10px 0;">📋 Important Reminders:</h4>
                <ul style="color: #92400e; margin: 0; padding-left: 20px;">
                    <li>Please ensure someone is available at the service location</li>
                    <li>Our cleaner will arrive with all necessary equipment</li>
                    <li>Payment method: ${booking.paymentMethod.toUpperCase()}</li>
                    <li>Cancellation must be made 24 hours in advance</li>
                    <li>Rate our service after completion for quality improvement</li>
                </ul>
            </div>
            
            <div class="footer">
                <p style="margin: 0 0 15px 0;">Need help? Contact us:</p>
                <p style="margin: 0; font-weight: bold;">📞 ${receiptData.companyInfo.phone} | 📧 ${receiptData.companyInfo.email}</p>
                <p style="margin: 15px 0 0 0; font-size: 14px;">
                    Thank you for choosing Ceylon Clean Pro!<br>
                    Your satisfaction is our priority.
                </p>
            </div>
        </div>
    </div>
</body>
</html>
      `;
      
      const recipientEmail = email || booking.customerInfo.email;
      await mockApi.sendEmail(
        recipientEmail,
        `🧹 Booking Confirmation - ${booking.bookingNumber} | Ceylon Clean Pro`,
        emailContent
      );
      
      // Also send notification to business email
      const businessNotification = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>New Booking Alert</title></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; border: 2px solid #dc2626; border-radius: 10px; overflow: hidden;">
        <div style="background: #dc2626; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">🚨 NEW BOOKING ALERT</h1>
            <p style="margin: 5px 0 0 0;">Ceylon Clean Pro</p>
        </div>
        <div style="padding: 20px; background: #fef2f2;">
            <h2 style="color: #dc2626; margin-bottom: 15px;">Booking Details:</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 5px 0; font-weight: bold;">Booking Number:</td><td>${booking.bookingNumber}</td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Customer:</td><td>${booking.customerInfo.name}</td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Email:</td><td>${booking.customerInfo.email}</td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Phone:</td><td>${booking.customerInfo.phone}</td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Service:</td><td>${service?.name || booking.serviceId}</td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Worker:</td><td>${worker?.name || booking.workerId}</td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Date:</td><td>${new Date(booking.date).toLocaleDateString()}</td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Time:</td><td>${booking.time}</td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Duration:</td><td>${booking.duration} hours</td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Location:</td><td>${booking.location}</td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Total Amount:</td><td>Rs. ${total.toLocaleString()}</td></tr>
                <tr><td style="padding: 5px 0; font-weight: bold;">Payment Method:</td><td>${booking.paymentMethod.toUpperCase()}</td></tr>
            </table>
            ${booking.customerInfo.specialInstructions ? `
            <div style="margin-top: 15px; padding: 10px; background: #fbbf24; border-radius: 5px;">
                <strong>Special Instructions:</strong> ${booking.customerInfo.specialInstructions}
            </div>
            ` : ''}
            <div style="margin-top: 20px; padding: 15px; background: #dc2626; color: white; border-radius: 5px; text-align: center;">
                <strong>⚠️ ACTION REQUIRED: Please ensure the assigned worker is notified and prepared for the service.</strong>
            </div>
        </div>
    </div>
</body>
</html>
      `;
      
      await mockApi.sendEmail(
        'shehanbrother1@gmail.com',
        `🚨 NEW BOOKING ALERT - ${booking.bookingNumber} | Ceylon Clean Pro`,
        businessNotification
      );
      
    } catch (error) {
      console.error('Error emailing receipt:', error);
      throw error;
    }
  },
};

export default receiptService;