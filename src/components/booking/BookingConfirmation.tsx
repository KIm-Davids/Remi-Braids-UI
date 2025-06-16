
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, DollarSign, Scissors, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { BookingData } from '@/pages/BookNow';

interface BookingConfirmationProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
}

const BookingConfirmation = ({ bookingData, updateBookingData }: BookingConfirmationProps) => {
  const handleNotesChange = (notes: string) => {
    updateBookingData({
      personalInfo: {
        ...bookingData.personalInfo,
        notes,
      } as any
    });
  };

  const totalCost = bookingData.service?.price || 0;
  const estimatedDuration = bookingData.service?.duration || 0;

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <Card className="border-salon-pink/20 bg-gradient-to-r from-salon-pink/5 to-salon-grey/5 dark:from-salon-pink/10 dark:to-salon-grey/10">
        <CardHeader>
          <CardTitle className="flex items-center text-salon-dark dark:text-white">
            <Scissors className="h-5 w-5 mr-2 text-salon-pink" />
            Booking Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Service Details */}
          {bookingData.service && (
            <div className="flex justify-between items-start p-4 bg-white dark:bg-gray-800 rounded-lg border border-salon-grey/20 dark:border-salon-pink/20">
              <div className="flex-1">
                <h3 className="font-semibold text-salon-dark dark:text-white text-lg">
                  {bookingData.service.name}
                </h3>
                <p className="text-salon-dark/70 dark:text-white/70 text-sm mt-1">
                  {bookingData.service.description}
                </p>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center text-salon-dark/60 dark:text-white/60 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {estimatedDuration} minutes
                  </div>
                  <Badge className="bg-salon-pink/20 text-salon-pink border-salon-pink">
                    {bookingData.service.category}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-salon-pink font-bold text-xl">
                  <DollarSign className="h-5 w-5" />
                  {bookingData.service.price}
                </div>
              </div>
            </div>
          )}

          {/* Date & Time */}
          {bookingData.date && bookingData.time && (
            <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-salon-grey/20 dark:border-salon-pink/20">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-salon-dark dark:text-white">
                  <Calendar className="h-5 w-5 mr-2 text-salon-pink" />
                  <span className="font-medium">
                    {format(bookingData.date, 'EEEE, MMMM do, yyyy')}
                  </span>
                </div>
                <div className="flex items-center text-salon-dark dark:text-white">
                  <Clock className="h-5 w-5 mr-2 text-salon-pink" />
                  <span className="font-medium">{bookingData.time}</span>
                </div>
              </div>
            </div>
          )}

          {/* Total */}
          <div className="border-t border-salon-grey/20 dark:border-salon-pink/20 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-salon-dark dark:text-white">
                Total Cost:
              </span>
              <span className="text-2xl font-bold text-salon-pink flex items-center">
                <DollarSign className="h-6 w-6" />
                {totalCost}
              </span>
            </div>
            <p className="text-salon-dark/60 dark:text-white/60 text-sm mt-1">
              Estimated duration: {estimatedDuration} minutes
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Special Notes */}
      <Card className="border-salon-grey/20 dark:border-salon-pink/20">
        <CardHeader>
          <CardTitle className="flex items-center text-salon-dark dark:text-white">
            <FileText className="h-5 w-5 mr-2 text-salon-pink" />
            Special Requests or Notes (Optional)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Let us know about any allergies, preferences, or special requests..."
            value={bookingData.personalInfo?.notes || ''}
            onChange={(e) => handleNotesChange(e.target.value)}
            className="min-h-[100px] border-salon-grey/30 dark:border-salon-pink/30 focus:border-salon-pink"
          />
          <p className="text-salon-dark/60 dark:text-white/60 text-sm mt-2">
            Examples: "I have sensitive skin", "First time visiting", "I prefer a quieter area"
          </p>
        </CardContent>
      </Card>

      {/* Important Information */}
      <Card className="border-salon-grey/20 dark:border-salon-pink/20 bg-salon-grey/5 dark:bg-salon-pink/5">
        <CardContent className="p-4">
          <h4 className="font-semibold text-salon-dark dark:text-white mb-2">
            Before Your Appointment:
          </h4>
          <ul className="text-salon-dark/70 dark:text-white/70 text-sm space-y-1">
            <li>• Please arrive 10 minutes early for your appointment</li>
            <li>• Cancellations must be made at least 24 hours in advance</li>
            <li>• We accept cash, card, and digital payments</li>
            <li>• Consultations are included in all services</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingConfirmation;
