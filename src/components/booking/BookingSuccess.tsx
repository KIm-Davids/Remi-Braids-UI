
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Calendar, Clock, MapPin, Phone, Mail, Download, RotateCcw, Home, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { BookingData } from '@/pages/BookNow';
import RescheduleBooking from './RescheduleBooking';

interface BookingSuccessProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
}

const BookingSuccess = ({ bookingData, updateBookingData }: BookingSuccessProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showReschedule, setShowReschedule] = useState(false);

  // Your salon's WhatsApp number (replace with your actual number)
  const SALON_WHATSAPP_NUMBER = '+2348023291202';

  const confirmationNumber = `BK${Date.now().toString().slice(-6)}`;

  const sendWhatsAppMessage = () => {
    if (!bookingData.service || !bookingData.date || !bookingData.time || !bookingData.personalInfo) {
      return;
    }

    const dateText = format(bookingData.date, 'EEEE, MMMM do, yyyy');
    const message = `Hi! I've just completed my booking on your website and would like to confirm my appointment.

*Booking Details:*
Confirmation #: ${confirmationNumber}
Service: ${bookingData.service.name}
Date: ${dateText}
Time: ${bookingData.time}
Duration: ${bookingData.service.duration} minutes
Price: $${bookingData.service.price}

*My Details:*
Name: ${bookingData.personalInfo.fullName}
Phone: ${bookingData.personalInfo.phone}
Email: ${bookingData.personalInfo.email}

${bookingData.personalInfo.notes ? `*Special Notes:*\n${bookingData.personalInfo.notes}\n\n` : ''}Looking forward to my appointment!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SALON_WHATSAPP_NUMBER.replace('+', '')}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success toast
    toast({
      title: "WhatsApp Opened!",
      description: "Your booking details have been prepared. Complete the sending process in WhatsApp.",
    });
  };

  const handleAddToCalendar = () => {
    if (!bookingData.date || !bookingData.time || !bookingData.service) return;

    const startDate = new Date(bookingData.date);
    const [time, period] = bookingData.time.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;
    
    startDate.setHours(hour24, minutes, 0, 0);
    
    const endDate = new Date(startDate.getTime() + (bookingData.service.duration * 60000));
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `${bookingData.service.name} - Salon Appointment`
    )}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(
      `Appointment for ${bookingData.service.name}\nDuration: ${bookingData.service.duration} minutes\nPrice: $${bookingData.service.price}\nConfirmation: ${confirmationNumber}`
    )}&location=${encodeURIComponent('Beauty Salon - 123 Style Street')}`;

    window.open(calendarUrl, '_blank');
  };

  const handleReschedule = () => {
    setShowReschedule(true);
  };

  const handleRescheduleComplete = (newDate: Date, newTime: string) => {
    // Update the booking data with new date and time
    updateBookingData({
      date: newDate,
      time: newTime
    });
    
    // Hide reschedule view and show success page again
    setShowReschedule(false);
  };

  const handleBackFromReschedule = () => {
    setShowReschedule(false);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // Show reschedule component if user clicked reschedule
  if (showReschedule) {
    return (
      <RescheduleBooking
        bookingData={bookingData}
        onBack={handleBackFromReschedule}
        onRescheduleComplete={handleRescheduleComplete}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Message */}
      <div className="text-center space-y-4 animate-scale-in">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-salon-dark dark:text-white">
          Booking Confirmed!
        </h2>
        <p className="text-salon-dark/70 dark:text-white/70 text-lg">
          Your appointment has been successfully scheduled
        </p>
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-4 py-2 text-lg">
          Confirmation #{confirmationNumber}
        </Badge>
      </div>

      {/* Appointment Details */}
      <Card className="border-salon-pink/20 bg-gradient-to-r from-salon-pink/5 to-salon-grey/5 dark:from-salon-pink/10 dark:to-salon-grey/10">
        <CardHeader>
          <CardTitle className="text-salon-dark dark:text-white">
            Appointment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Service */}
          {bookingData.service && (
            <div className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="w-8 h-8 bg-salon-pink/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="h-4 w-4 text-salon-pink" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-salon-dark dark:text-white">
                  {bookingData.service.name}
                </h3>
                <p className="text-salon-dark/70 dark:text-white/70 text-sm">
                  {bookingData.service.description}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-salon-dark/60 dark:text-white/60">
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {bookingData.service.duration} minutes
                  </span>
                  <span className="font-semibold text-salon-pink">
                    ${bookingData.service.price}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Date & Time */}
          {bookingData.date && bookingData.time && (
            <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="w-8 h-8 bg-salon-pink/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="h-4 w-4 text-salon-pink" />
              </div>
              <div>
                <p className="font-semibold text-salon-dark dark:text-white">
                  {format(bookingData.date, 'EEEE, MMMM do, yyyy')}
                </p>
                <p className="text-salon-dark/70 dark:text-white/70">
                  {bookingData.time}
                </p>
              </div>
            </div>
          )}

          {/* Contact Info */}
          {bookingData.personalInfo && (
            <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="w-8 h-8 bg-salon-pink/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="h-4 w-4 text-salon-pink" />
              </div>
              <div>
                <p className="font-semibold text-salon-dark dark:text-white">
                  {bookingData.personalInfo.fullName}
                </p>
                <p className="text-salon-dark/70 dark:text-white/70 text-sm">
                  {bookingData.personalInfo.phone} • {bookingData.personalInfo.email}
                </p>
              </div>
            </div>
          )}

          {/* Location */}
          <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
            <div className="w-8 h-8 bg-salon-pink/20 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="h-4 w-4 text-salon-pink" />
            </div>
            <div>
              <p className="font-semibold text-salon-dark dark:text-white">
                Beauty Salon
              </p>
              <p className="text-salon-dark/70 dark:text-white/70 text-sm">
                123 Style Street, Beauty City, BC 12345
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={sendWhatsAppMessage}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
          size="lg"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Continue to WhatsApp
        </Button>

        <Button
          onClick={handleAddToCalendar}
          className="w-full bg-salon-pink hover:bg-salon-pink/90 text-salon-dark font-semibold"
          size="lg"
        >
          <Download className="h-5 w-5 mr-2" />
          Add to Calendar
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={handleReschedule}
            className="border-salon-grey hover:bg-salon-grey/20 text-salon-dark dark:text-white dark:border-salon-pink/30"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reschedule
          </Button>
          
          <Button
            variant="outline"
            onClick={handleGoHome}
            className="border-salon-grey hover:bg-salon-grey/20 text-salon-dark dark:text-white dark:border-salon-pink/30"
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </div>
      </div>

      {/* What's Next */}
      <Card className="border-salon-grey/20 dark:border-salon-pink/20 bg-salon-grey/5 dark:bg-salon-pink/5">
        <CardContent className="p-4">
          <h4 className="font-semibold text-salon-dark dark:text-white mb-3">
            What happens next?
          </h4>
          <ul className="space-y-2 text-salon-dark/70 dark:text-white/70 text-sm">
            <li className="flex items-start">
              <Mail className="h-4 w-4 mt-0.5 mr-2 text-salon-pink flex-shrink-0" />
              <span>You'll receive a confirmation email with all the details</span>
            </li>
            <li className="flex items-start">
              <Phone className="h-4 w-4 mt-0.5 mr-2 text-salon-pink flex-shrink-0" />
              <span>We'll send you a reminder 24 hours before your appointment</span>
            </li>
            <li className="flex items-start">
              <MapPin className="h-4 w-4 mt-0.5 mr-2 text-salon-pink flex-shrink-0" />
              <span>Please arrive 10 minutes early for check-in</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingSuccess;
