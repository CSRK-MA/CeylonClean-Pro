import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, DollarSign, MapPin, FileText, Calculator, CheckCircle, AlertCircle, Download, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { serviceCategories, getServiceCategoryIcon } from '../../data/serviceCategories';
import { BookingFormData, BookingSummary, ServiceCategory, AvailabilityData } from '../../types/booking';
import { addDays, format, isWeekend, isBefore, startOfDay } from 'date-fns';
import { toast } from 'react-hot-toast';

const AdvancedBookingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    serviceCategory: '',
    startDate: new Date(),
    numberOfDays: 1,
    numberOfEmployees: 1,
    hourlyRate: 0,
    workingHoursPerDay: 4,
    customerInfo: {
      name: '',
      phone: '',
      email: '',
      address: '',
    },
    specialRequirements: '',
  });

  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Calculate total cost in real-time
  const calculateTotal = () => {
    const subtotal = formData.hourlyRate * formData.numberOfEmployees * formData.workingHoursPerDay * formData.numberOfDays;
    const tax = subtotal * 0.15; // 15% tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  // Generate scheduled dates
  const getScheduledDates = () => {
    const dates: Date[] = [];
    for (let i = 0; i < formData.numberOfDays; i++) {
      dates.push(addDays(formData.startDate, i));
    }
    return dates;
  };

  // Mock availability check
  const checkAvailability = async (startDate: Date, days: number) => {
    // Simulate API call
    const availability: AvailabilityData[] = [];
    for (let i = 0; i < days; i++) {
      const date = addDays(startDate, i);
      availability.push({
        date: format(date, 'yyyy-MM-dd'),
        availableEmployees: Math.floor(Math.random() * 8) + 2, // 2-10 available
        isFullyBooked: Math.random() < 0.1, // 10% chance of being fully booked
        isWeekend: isWeekend(date),
        isHoliday: false, // Could be enhanced with holiday data
      });
    }
    setAvailabilityData(availability);
  };

  // Update hourly rate when category changes
  useEffect(() => {
    if (selectedCategory) {
      setFormData(prev => ({
        ...prev,
        hourlyRate: selectedCategory.baseHourlyRate,
        workingHoursPerDay: selectedCategory.defaultHours,
      }));
    }
  }, [selectedCategory]);

  // Check availability when dates change
  useEffect(() => {
    if (formData.startDate && formData.numberOfDays > 0) {
      checkAvailability(formData.startDate, formData.numberOfDays);
    }
  }, [formData.startDate, formData.numberOfDays]);

  const handleCategorySelect = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setFormData(prev => ({
      ...prev,
      serviceCategory: category.id,
      hourlyRate: category.baseHourlyRate,
      workingHoursPerDay: category.defaultHours,
    }));
  };

  const handleInputChange = (field: keyof BookingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomerInfoChange = (field: keyof BookingFormData['customerInfo'], value: string) => {
    setFormData(prev => ({
      ...prev,
      customerInfo: { ...prev.customerInfo, [field]: value },
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!formData.serviceCategory;
      case 2:
        return formData.startDate && formData.numberOfDays >= 1 && formData.numberOfDays <= 7;
      case 3:
        return formData.numberOfEmployees >= 1 && formData.hourlyRate > 0 && formData.workingHoursPerDay >= 1;
      case 4:
        return !!(formData.customerInfo.name && formData.customerInfo.email && formData.customerInfo.phone && formData.customerInfo.address);
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    } else {
      toast.error('Please complete all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      toast.error('Please complete all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setBookingConfirmed(true);
      toast.success('Booking confirmed successfully!');
    } catch (error) {
      toast.error('Failed to confirm booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Print Receipt Function
  const handlePrintReceipt = () => {
    try {
      const receiptHTML = generateReceiptHTML();
      
      // Create a new window for printing
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      
      if (!printWindow) {
        // Fallback if popup is blocked
        const blob = new Blob([receiptHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const newTab = window.open(url, '_blank');
        
        if (!newTab) {
          toast.error('Please allow popups to print the receipt, or use the download option instead.');
          return;
        }
        
        // Clean up the URL after a delay
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1000);
        
        toast.success('Receipt opened in new tab for printing!');
        return;
      }
      
      // Write the HTML content to the new window
      printWindow.document.write(receiptHTML);
      printWindow.document.close();
      
      // Wait for content to load, then print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          // Close the window after printing (optional)
          setTimeout(() => {
            printWindow.close();
          }, 1000);
        }, 500);
      };
      
      toast.success('Opening print dialog...');
    } catch (error) {
      console.error('Error printing receipt:', error);
      toast.error('Failed to print receipt. Please try downloading instead.');
    }
  };

  // Download Receipt Function
  const handleDownloadReceipt = async () => {
    try {
      const receiptHTML = generateReceiptHTML();
      const blob = new Blob([receiptHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `CeylonClean-Confirmation-${Date.now().toString().slice(-6)}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      toast.success('Receipt downloaded successfully!');
    } catch (error) {
      console.error('Error downloading receipt:', error);
      toast.error('Failed to download receipt');
    }
  };

  // Email Receipt Function
  const handleEmailReceipt = async () => {
    try {
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`Receipt sent to ${formData.customerInfo.email}!`);
    } catch (error) {
      console.error('Error emailing receipt:', error);
      toast.error('Failed to send receipt email');
    }
  };

  // Generate Receipt HTML
  const generateReceiptHTML = () => {
    const { subtotal, tax, total } = calculateTotal();
    const scheduledDates = getScheduledDates();
    const bookingId = `CCL${Date.now().toString().slice(-6)}`;
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation - ${bookingId}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.5; color: #333; background: #f8f9fa; padding: 10px; }
        .receipt-container { max-width: 1024px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #0d9488, #14b8a6, #06b6d4); color: white; padding: 40px; text-align: center; position: relative; }
        .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>'); opacity: 0.3; }
        .header-content { position: relative; z-index: 1; }
        .company-name { font-size: 36px; font-weight: bold; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
        .confirmation-title { font-size: 28px; font-weight: bold; margin-top: 20px; }
        .booking-id { font-size: 18px; margin-top: 10px; background: rgba(255,255,255,0.2); padding: 10px 20px; border-radius: 25px; display: inline-block; }
        .content { padding: 40px; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 20px; font-weight: bold; color: #0d9488; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #0d9488; display: flex; align-items: center; }
        .section-icon { margin-right: 10px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .info-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
        .info-label { font-weight: 600; color: #475569; }
        .info-value { color: #1e293b; font-weight: 500; }
        .schedule-dates { background: #f1f5f9; padding: 20px; border-radius: 10px; margin-top: 15px; }
        .date-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #cbd5e1; }
        .date-item:last-child { border-bottom: none; }
        .cost-breakdown { background: linear-gradient(135deg, #fef7cd, #fef3c7); border: 2px solid #f59e0b; border-radius: 12px; padding: 25px; }
        .cost-item { display: flex; justify-content: space-between; padding: 8px 0; }
        .cost-total { border-top: 2px solid #f59e0b; margin-top: 15px; padding-top: 15px; font-size: 20px; font-weight: bold; color: #92400e; }
        .payment-status { display: inline-block; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; text-transform: uppercase; }
        .status-pending { background: #fef3c7; color: #92400e; }
        .important-notes { background: #fef2f2; border: 2px solid #fecaca; border-radius: 10px; padding: 20px; }
        .qr-section { text-align: center; background: #f8fafc; padding: 20px; border-radius: 10px; }
        .qr-code { width: 120px; height: 120px; background: white; border: 2px solid #0d9488; border-radius: 10px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #0d9488; }
        .footer { background: #1e293b; color: white; padding: 30px; text-align: center; }
        .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px; }
        .print-button { position: fixed; top: 20px; right: 20px; background: #0d9488; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 1000; }
        @media print { 
            body { padding: 0; background: white; } 
            .receipt-container { box-shadow: none; } 
            .print-button { display: none; }
            .header::before { display: none; }
        }
        @media (max-width: 768px) { 
            .info-grid { grid-template-columns: 1fr; } 
            .header { padding: 20px; } 
            .content { padding: 20px; } 
        }
    </style>
</head>
<body>
    <button class="print-button" onclick="window.print()">🖨️ Print Receipt</button>
    
    <div class="receipt-container">
        <div class="header">
            <div class="header-content">
                <div class="company-name">Ceylon Clean Pro</div>
                <div style="font-size: 16px; opacity: 0.9;">Professional Cleaning Services</div>
                <div class="confirmation-title">✅ BOOKING CONFIRMED</div>
                <div class="booking-id">Booking ID: ${bookingId}</div>
                <div style="margin-top: 10px; font-size: 14px; opacity: 0.8;">
                    Confirmed on ${format(new Date(), 'EEEE, MMMM dd, yyyy')} at ${format(new Date(), 'h:mm a')}
                </div>
            </div>
        </div>
        
        <div class="content">
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">👤</span>
                    Customer Information
                </h2>
                <div class="info-grid">
                    <div>
                        <div class="info-item">
                            <span class="info-label">Full Name:</span>
                            <span class="info-value">${formData.customerInfo.name}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Contact Number:</span>
                            <span class="info-value">${formData.customerInfo.phone}</span>
                        </div>
                    </div>
                    <div>
                        <div class="info-item">
                            <span class="info-label">Email Address:</span>
                            <span class="info-value">${formData.customerInfo.email}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Service Address:</span>
                            <span class="info-value">${formData.customerInfo.address}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">🧹</span>
                    Service Details
                </h2>
                <div class="info-item">
                    <span class="info-label">Selected Service Category:</span>
                    <span class="info-value">${selectedCategory?.name || 'Professional Cleaning'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Service Description:</span>
                    <span class="info-value">${selectedCategory?.description || 'Professional cleaning service'}</span>
                </div>
                ${formData.specialRequirements ? `
                <div style="margin-top: 15px; padding: 15px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                    <strong style="color: #92400e;">Special Requirements:</strong>
                    <p style="margin-top: 5px; color: #b45309;">${formData.specialRequirements}</p>
                </div>
                ` : ''}
            </div>
            
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">📅</span>
                    Schedule Information
                </h2>
                <div class="info-grid">
                    <div>
                        <div class="info-item">
                            <span class="info-label">Start Date:</span>
                            <span class="info-value">${format(formData.startDate, 'EEEE, MMMM dd, yyyy')}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Number of Working Days:</span>
                            <span class="info-value">${formData.numberOfDays} day${formData.numberOfDays > 1 ? 's' : ''}</span>
                        </div>
                    </div>
                    <div>
                        <div class="info-item">
                            <span class="info-label">Working Hours per Day:</span>
                            <span class="info-value">${formData.workingHoursPerDay} hours/day</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Daily Schedule:</span>
                            <span class="info-value">9:00 AM – ${formData.workingHoursPerDay + 9 > 12 ? (formData.workingHoursPerDay + 9 - 12) + ':00 PM' : (formData.workingHoursPerDay + 9) + ':00 AM'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="schedule-dates">
                    <h4 style="color: #0d9488; margin-bottom: 15px; font-weight: bold;">📋 Dates Booked:</h4>
                    ${scheduledDates.map((date, index) => `
                        <div class="date-item">
                            <span style="font-weight: 600;">Day ${index + 1}: ${format(date, 'EEEE, MMMM dd, yyyy')}</span>
                            <span style="color: #059669;">${formData.workingHoursPerDay} hours</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">👥</span>
                    Staffing & Pricing
                </h2>
                <div class="info-grid">
                    <div>
                        <div class="info-item">
                            <span class="info-label">Number of Employees:</span>
                            <span class="info-value">${formData.numberOfEmployees}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Hourly Rate per Employee:</span>
                            <span class="info-value">Rs. ${formData.hourlyRate.toLocaleString()}</span>
                        </div>
                    </div>
                    <div>
                        <div class="info-item">
                            <span class="info-label">Total Working Hours:</span>
                            <span class="info-value">${formData.workingHoursPerDay * formData.numberOfDays} hours</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Total Employee Hours:</span>
                            <span class="info-value">${formData.numberOfEmployees * formData.workingHoursPerDay * formData.numberOfDays} hours</span>
                        </div>
                    </div>
                </div>
                
                <div class="cost-breakdown">
                    <h4 style="color: #92400e; margin-bottom: 15px; font-weight: bold;">💰 Cost Calculation:</h4>
                    <div class="cost-item">
                        <span>Hourly Rate × Employees × Hours/Day × Days:</span>
                        <span>Rs. ${formData.hourlyRate.toLocaleString()} × ${formData.numberOfEmployees} × ${formData.workingHoursPerDay} × ${formData.numberOfDays}</span>
                    </div>
                    <div class="cost-item">
                        <span>Subtotal:</span>
                        <span>Rs. ${subtotal.toLocaleString()}</span>
                    </div>
                    <div class="cost-item">
                        <span>Tax (15%):</span>
                        <span>Rs. ${tax.toLocaleString()}</span>
                    </div>
                    <div class="cost-total">
                        <span>Total Cost:</span>
                        <span>Rs. ${total.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">💳</span>
                    Payment Summary
                </h2>
                <div class="info-item">
                    <span class="info-label">Payment Method:</span>
                    <span class="info-value">Cash on Arrival</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Payment Status:</span>
                    <span class="info-value">
                        <span class="payment-status status-pending">Pending</span>
                    </span>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">
                    <span class="section-icon">📝</span>
                    Important Notes
                </h2>
                <div class="important-notes">
                    <h4 style="color: #dc2626; margin-bottom: 15px;">⚠️ Please Read Carefully:</h4>
                    <ul style="color: #dc2626; margin-left: 20px; line-height: 1.8;">
                        <li><strong>Cancellation Policy:</strong> Free cancellation up to 24 hours before service. 50% charge for cancellations within 24 hours.</li>
                        <li><strong>Service Guarantee:</strong> 100% satisfaction guaranteed. If not satisfied, we'll return within 24 hours at no extra cost.</li>
                        <li><strong>Preparation:</strong> Please ensure the service area is accessible and remove valuable items.</li>
                        <li><strong>Payment:</strong> Payment due upon service completion.</li>
                        <li><strong>Contact:</strong> For any changes or questions, contact us at least 4 hours before service time.</li>
                        <li><strong>Weather Policy:</strong> Service may be rescheduled due to severe weather conditions.</li>
                    </ul>
                </div>
            </div>
            
            <div class="section">
                <div class="qr-section">
                    <h2 class="section-title" style="justify-content: center;">
                        <span class="section-icon">🔐</span>
                        Quick Access
                    </h2>
                    <div class="qr-code">
                        QR Code<br>
                        ${bookingId}
                    </div>
                    <p style="color: #64748b; font-size: 14px;">
                        Scan this QR code for quick access to your booking details<br>
                        or visit: ceyloncleanpro.lk/booking/${bookingId}
                    </p>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="contact-grid">
                <div>
                    <h5 style="color: #14b8a6; margin-bottom: 10px;">📞 Customer Support</h5>
                    <p>Phone: +94 11 234 5678<br>WhatsApp: +94 77 123 4567</p>
                </div>
                <div>
                    <h5 style="color: #14b8a6; margin-bottom: 10px;">📧 Email Support</h5>
                    <p>info@ceyloncleanpro.lk<br>support@ceyloncleanpro.lk</p>
                </div>
                <div>
                    <h5 style="color: #14b8a6; margin-bottom: 10px;">🌐 Online</h5>
                    <p>www.ceyloncleanpro.lk<br>Live Chat Available 24/7</p>
                </div>
                <div>
                    <h5 style="color: #14b8a6; margin-bottom: 10px;">📍 Office</h5>
                    <p>123 Main Street<br>Colombo 03, Sri Lanka</p>
                </div>
            </div>
            <div style="border-top: 1px solid #475569; padding-top: 20px; margin-top: 20px;">
                <p style="font-size: 18px; font-weight: bold; color: #14b8a6; margin-bottom: 10px;">
                    Thank you for choosing Ceylon Clean Pro!
                </p>
                <p style="font-size: 14px; opacity: 0.9;">
                    Your satisfaction is our priority. We look forward to serving you.
                </p>
                <p style="font-size: 12px; opacity: 0.7; margin-top: 15px;">
                    Business Registration: LK1234567890 | This is a computer-generated receipt.
                </p>
            </div>
        </div>
    </div>
    
    <script>
        // Auto-print after a short delay when opened in new window
        window.onload = function() {
            // Only auto-print if this is a popup window
            if (window.opener) {
                setTimeout(() => {
                    window.print();
                }, 1000);
            }
        };
        
        // Hide print button when printing
        window.onbeforeprint = function() {
            const printButton = document.querySelector('.print-button');
            if (printButton) printButton.style.display = 'none';
        };
        
        window.onafterprint = function() {
            const printButton = document.querySelector('.print-button');
            if (printButton) printButton.style.display = 'block';
        };
    </script>
</body>
</html>
    `;
  };

  const renderServiceSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Service Category</h2>
        <p className="text-gray-600">Select the type of cleaning service you need</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {serviceCategories.map((category) => {
          const IconComponent = getServiceCategoryIcon(category.icon);
          return (
            <motion.div
              key={category.id}
              whileHover={{ y: -5 }}
              className={`relative border rounded-xl p-6 cursor-pointer transition-all ${
                formData.serviceCategory === category.id
                  ? 'border-teal-500 bg-teal-50 shadow-lg'
                  : 'border-gray-200 hover:border-teal-300 hover:shadow-md'
              }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category.isPopular && (
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  Popular
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center">
                  <IconComponent size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                  <div className="text-sm text-teal-600 font-medium">
                    Rs. {category.baseHourlyRate.toLocaleString()}/hour
                  </div>
                  <div className="text-xs text-gray-500">
                    {category.minHours}-{category.maxHours} hours per day
                  </div>
                </div>
              </div>

              {formData.serviceCategory === category.id && (
                <div className="mt-4 pt-4 border-t border-teal-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Included Services:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {category.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle size={12} className="text-teal-500 mr-1" />
                        {feature}
                      </li>
                    ))}
                    {category.features.length > 3 && (
                      <li className="text-teal-600">+{category.features.length - 3} more...</li>
                    )}
                  </ul>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderDateSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Schedule Your Service</h2>
        <p className="text-gray-600">Choose your start date and duration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline mr-2" size={16} />
              Start Date
            </label>
            <input
              type="date"
              min={format(new Date(), 'yyyy-MM-dd')}
              max={format(addDays(new Date(), 180), 'yyyy-MM-dd')} // 6 months ahead
              value={format(formData.startDate, 'yyyy-MM-dd')}
              onChange={(e) => handleInputChange('startDate', new Date(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Days (1-7)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="7"
                value={formData.numberOfDays}
                onChange={(e) => handleInputChange('numberOfDays', parseInt(e.target.value))}
                className="flex-1 accent-teal-500"
              />
              <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-medium">
                {formData.numberOfDays} day{formData.numberOfDays > 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-4">Scheduled Dates</h3>
          <div className="space-y-2">
            {getScheduledDates().map((date, index) => {
              const availability = availabilityData.find(a => a.date === format(date, 'yyyy-MM-dd'));
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    availability?.isFullyBooked
                      ? 'bg-red-100 text-red-800'
                      : availability?.isWeekend
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  <span className="font-medium">
                    {format(date, 'EEEE, MMM dd, yyyy')}
                  </span>
                  <div className="flex items-center space-x-2">
                    {availability?.isFullyBooked ? (
                      <AlertCircle size={16} />
                    ) : (
                      <CheckCircle size={16} />
                    )}
                    <span className="text-xs">
                      {availability?.isFullyBooked
                        ? 'Fully Booked'
                        : availability?.isWeekend
                        ? 'Weekend'
                        : `${availability?.availableEmployees || 0} available`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPricingConfiguration = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Configure Your Service</h2>
        <p className="text-gray-600">Customize employees, hours, and pricing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline mr-2" size={16} />
              Number of Employees
            </label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => handleInputChange('numberOfEmployees', Math.max(1, formData.numberOfEmployees - 1))}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center"
              >
                -
              </button>
              <div className="bg-teal-100 text-teal-800 px-4 py-2 rounded-lg font-medium min-w-[60px] text-center">
                {formData.numberOfEmployees}
              </div>
              <button
                type="button"
                onClick={() => handleInputChange('numberOfEmployees', Math.min(10, formData.numberOfEmployees + 1))}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="inline mr-2" size={16} />
              Hourly Rate per Employee (Rs.)
            </label>
            <input
              type="number"
              min={selectedCategory?.baseHourlyRate || 500}
              max={(selectedCategory?.baseHourlyRate || 500) * 2}
              step="50"
              value={formData.hourlyRate}
              onChange={(e) => handleInputChange('hourlyRate', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Recommended: Rs. {selectedCategory?.baseHourlyRate.toLocaleString()}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="inline mr-2" size={16} />
              Working Hours per Day
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min={selectedCategory?.minHours || 1}
                max={selectedCategory?.maxHours || 8}
                step="0.5"
                value={formData.workingHoursPerDay}
                onChange={(e) => handleInputChange('workingHoursPerDay', parseFloat(e.target.value))}
                className="flex-1 accent-teal-500"
              />
              <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-medium">
                {formData.workingHoursPerDay}h
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{selectedCategory?.minHours || 1}h min</span>
              <span>{selectedCategory?.maxHours || 8}h max</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <Calculator className="text-teal-600 mr-2" size={20} />
            <h3 className="font-semibold text-gray-800">Cost Breakdown</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Hourly Rate:</span>
              <span>Rs. {formData.hourlyRate.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Employees:</span>
              <span>{formData.numberOfEmployees}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Hours per Day:</span>
              <span>{formData.workingHoursPerDay}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Number of Days:</span>
              <span>{formData.numberOfDays}</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>Rs. {calculateTotal().subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (15%):</span>
              <span>Rs. {calculateTotal().tax.toLocaleString()}</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between font-bold text-lg text-teal-700">
              <span>Total:</span>
              <span>Rs. {calculateTotal().total.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white rounded-lg">
            <p className="text-xs text-gray-600">
              <strong>Formula:</strong> Rs. {formData.hourlyRate.toLocaleString()} × {formData.numberOfEmployees} employees × {formData.workingHoursPerDay}h × {formData.numberOfDays} days + 15% tax
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomerDetails = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Information</h2>
        <p className="text-gray-600">Please provide your contact details</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.customerInfo.name}
              onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.customerInfo.phone}
              onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="+94 77 123 4567"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.customerInfo.email}
            onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin className="inline mr-1" size={16} />
            Service Address *
          </label>
          <textarea
            value={formData.customerInfo.address}
            onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Enter your complete address including street, city, and postal code"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FileText className="inline mr-1" size={16} />
            Special Requirements (Optional)
          </label>
          <textarea
            value={formData.specialRequirements}
            onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Any specific instructions, areas to focus on, or special requirements..."
          />
        </div>
      </div>
    </div>
  );

  const renderSummary = () => {
    const { subtotal, tax, total } = calculateTotal();
    const scheduledDates = getScheduledDates();

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Summary</h2>
          <p className="text-gray-600">Review your booking details before confirmation</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Service Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{selectedCategory?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employees:</span>
                  <span className="font-medium">{formData.numberOfEmployees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hours per Day:</span>
                  <span className="font-medium">{formData.workingHoursPerDay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hourly Rate:</span>
                  <span className="font-medium">Rs. {formData.hourlyRate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{formData.numberOfDays} day{formData.numberOfDays > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Customer Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{formData.customerInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{formData.customerInfo.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{formData.customerInfo.email}</span>
                </div>
                <div>
                  <span className="text-gray-600">Address:</span>
                  <p className="font-medium mt-1">{formData.customerInfo.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Scheduled Dates</h3>
              <div className="space-y-2">
                {scheduledDates.map((date, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">
                      {format(date, 'EEEE, MMM dd, yyyy')}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formData.workingHoursPerDay}h
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-blue-50 border border-teal-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (15%):</span>
                  <span>Rs. {tax.toLocaleString()}</span>
                </div>
                <hr className="border-teal-200" />
                <div className="flex justify-between font-bold text-lg text-teal-700">
                  <span>Total:</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {formData.specialRequirements && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-2">Special Requirements</h3>
                <p className="text-gray-600 text-sm">{formData.specialRequirements}</p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Confirming Booking...
              </>
            ) : (
              'Confirm Booking'
            )}
          </button>
        </div>
      </div>
    );
  };

  const renderConfirmation = () => (
    <div className="text-center space-y-6">
      <div className="bg-green-50 p-8 rounded-xl">
        <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">Booking Confirmed!</h2>
        <p className="text-green-700">
          Your cleaning service has been successfully booked. You will receive a confirmation email shortly.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
        <h3 className="font-semibold text-gray-800 mb-4">Booking Reference</h3>
        <div className="text-2xl font-bold text-teal-600 mb-2">
          CCL{Date.now().toString().slice(-6)}
        </div>
        <p className="text-sm text-gray-600">
          Please save this reference number for your records
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handlePrintReceipt}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center"
        >
          <FileText size={18} className="mr-2" />
          Print Receipt
        </button>
        <button
          onClick={handleDownloadReceipt}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center"
        >
          <Download size={18} className="mr-2" />
          Download Receipt
        </button>
        <button
          onClick={handleEmailReceipt}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-medium flex items-center justify-center"
        >
          <Mail size={18} className="mr-2" />
          Email Receipt
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
        <button
          onClick={() => window.location.reload()}
          className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition font-medium"
        >
          Book Another Service
        </button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    if (bookingConfirmed) return renderConfirmation();

    switch (currentStep) {
      case 1: return renderServiceSelection();
      case 2: return renderDateSelection();
      case 3: return renderPricingConfiguration();
      case 4: return renderCustomerDetails();
      case 5: return renderSummary();
      default: return null;
    }
  };

  if (bookingConfirmed) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {renderConfirmation()}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2">
        <div
          className="bg-teal-500 h-2 transition-all duration-300"
          style={{ width: `${(currentStep / 5) * 100}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between px-8 py-6 bg-gray-50">
        {[
          { step: 1, label: 'Service', icon: Users },
          { step: 2, label: 'Schedule', icon: Calendar },
          { step: 3, label: 'Configure', icon: Calculator },
          { step: 4, label: 'Details', icon: FileText },
          { step: 5, label: 'Confirm', icon: CheckCircle },
        ].map(({ step, label, icon: Icon }) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${
                step <= currentStep
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              <Icon size={18} />
            </div>
            <span className="text-xs text-gray-600 hidden sm:block">{label}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-8 py-6 bg-gray-50 flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-6 py-2 rounded-lg transition ${
            currentStep === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          Previous
        </button>

        {currentStep < 5 && (
          <button
            onClick={nextStep}
            disabled={!validateStep(currentStep)}
            className={`px-6 py-2 rounded-lg transition ${
              !validateStep(currentStep)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default AdvancedBookingForm;