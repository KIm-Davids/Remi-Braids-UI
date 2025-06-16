import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar as CalendarIcon, ArrowLeft, Check } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { BookingData } from '@/pages/BookNow';

interface RescheduleBookingProps {
  bookingData: BookingData;
  onBack: () => void;
  onRescheduleComplete: (newDate: Date, newTime: string) => void;
}

const RescheduleBooking = ({ bookingData, onBack, onRescheduleComplete }: RescheduleBookingProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(bookingData.date);
  const [selectedTime, setSelectedTime] = useState<string>(bookingData.time || '');
  const { toast } = useToast();

  const timeSlots = {
    morning: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    afternoon: ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
    evening: ['4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'],
  };

  // Mock unavailable times (in a real app, this would come from your booking system)
  const unavailableTimes = ['10:30 AM', '2:00 PM', '5:30 PM'];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    // Keep the same time if possible, otherwise reset
    if (date && selectedTime && !unavailableTimes.includes(selectedTime)) {
      // Keep current time
    } else {
      setSelectedTime('');
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmReschedule = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Selection Required",
        description: "Please select both a date and time for your rescheduled appointment.",
        variant: "destructive",
      });
      return;
    }

    // Check if it's actually a change
    const originalDate = bookingData.date;
    const originalTime = bookingData.time;
    
    if (originalDate && originalTime && 
        selectedDate.toDateString() === originalDate.toDateString() && 
        selectedTime === originalTime) {
      toast({
        title: "No Changes Made",
        description: "Please select a different date or time to reschedule your appointment.",
        variant: "destructive",
      });
      return;
    }

    onRescheduleComplete(selectedDate, selectedTime);
    
    toast({
      title: "Appointment Rescheduled!",
      description: `Your appointment has been moved to ${format(selectedDate, 'EEEE, MMMM do, yyyy')} at ${selectedTime}`,
    });
  };

  const isTimeUnavailable = (time: string) => {
    return unavailableTimes.includes(time);
  };

  const TimeSlotButton = ({ time }: { time: string }) => {
    const isSelected = selectedTime === time;
    const isUnavailable = isTimeUnavailable(time);
    const isCurrentTime = bookingData.time === time;

    return (
      <Button
        variant={isSelected ? "default" : "outline"}
        size="sm"
        disabled={isUnavailable}
        onClick={() => handleTimeSelect(time)}
        className={`hover-lift transition-all duration-200 relative ${
          isSelected
            ? 'bg-salon-pink text-salon-dark'
            : isUnavailable
            ? 'opacity-50 cursor-not-allowed'
            : 'border-salon-grey hover:bg-salon-grey/20 text-salon-dark dark:text-white dark:border-salon-pink/30'
        }`}
      >
        {time}
        {isCurrentTime && !isSelected && (
          <Badge className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 py-0">
            Current
          </Badge>
        )}
        {isUnavailable && <span className="ml-1 text-xs">(Booked)</span>}
      </Button>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-salon-dark dark:text-white">
          Reschedule Your Appointment
        </h2>
        <p className="text-salon-dark/70 dark:text-white/70">
          Select a new date and time for your appointment
        </p>
      </div>

      {/* Current Appointment Info */}
      {bookingData.service && bookingData.date && bookingData.time && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-salon-dark dark:text-white text-lg">
              Current Appointment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold text-salon-dark dark:text-white">Service</p>
                <p className="text-salon-dark/70 dark:text-white/70">{bookingData.service.name}</p>
              </div>
              <div>
                <p className="font-semibold text-salon-dark dark:text-white">Date</p>
                <p className="text-salon-dark/70 dark:text-white/70">
                  {format(bookingData.date, 'EEEE, MMMM do, yyyy')}
                </p>
              </div>
              <div>
                <p className="font-semibold text-salon-dark dark:text-white">Time</p>
                <p className="text-salon-dark/70 dark:text-white/70">{bookingData.time}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reschedule Selection */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <Card className="border-salon-grey/20 dark:border-salon-pink/20">
          <CardHeader>
            <CardTitle className="flex items-center text-salon-dark dark:text-white">
              <CalendarIcon className="h-5 w-5 mr-2 text-salon-pink" />
              Select New Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
              className="rounded-md border border-salon-grey/20 dark:border-salon-pink/20"
            />
            {selectedDate && (
              <div className="mt-4 p-3 bg-salon-pink/10 dark:bg-salon-pink/20 rounded-lg">
                <p className="text-salon-dark dark:text-white font-medium">
                  New Date: {format(selectedDate, 'EEEE, MMMM do, yyyy')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card className="border-salon-grey/20 dark:border-salon-pink/20">
          <CardHeader>
            <CardTitle className="flex items-center text-salon-dark dark:text-white">
              <Clock className="h-5 w-5 mr-2 text-salon-pink" />
              Select New Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedDate ? (
              <div className="text-center py-8 text-salon-dark/60 dark:text-white/60">
                <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Please select a date first to see available times</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Morning */}
                <div>
                  <div className="flex items-center mb-3">
                    <Badge variant="outline" className="border-salon-pink text-salon-pink">
                      Morning
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.morning.map((time) => (
                      <TimeSlotButton key={time} time={time} />
                    ))}
                  </div>
                </div>

                {/* Afternoon */}
                <div>
                  <div className="flex items-center mb-3">
                    <Badge variant="outline" className="border-salon-pink text-salon-pink">
                      Afternoon
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.afternoon.map((time) => (
                      <TimeSlotButton key={time} time={time} />
                    ))}
                  </div>
                </div>

                {/* Evening */}
                <div>
                  <div className="flex items-center mb-3">
                    <Badge variant="outline" className="border-salon-pink text-salon-pink">
                      Evening
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.evening.map((time) => (
                      <TimeSlotButton key={time} time={time} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedTime && (
              <div className="mt-6 p-3 bg-salon-pink/10 dark:bg-salon-pink/20 rounded-lg">
                <p className="text-salon-dark dark:text-white font-medium">
                  New Time: {selectedTime}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 border-salon-grey hover:bg-salon-grey/20 text-salon-dark dark:text-white dark:border-salon-pink/30"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Booking Details
        </Button>
        
        <Button
          onClick={handleConfirmReschedule}
          disabled={!selectedDate || !selectedTime}
          className="flex-1 bg-salon-pink hover:bg-salon-pink/90 text-salon-dark font-semibold"
        >
          <Check className="h-4 w-4 mr-2" />
          Confirm Reschedule
        </Button>
      </div>

      {/* Important Information */}
      <Card className="border-salon-grey/20 dark:border-salon-pink/20 bg-salon-grey/5 dark:bg-salon-pink/5">
        <CardContent className="p-4">
          <h4 className="font-semibold text-salon-dark dark:text-white mb-2">
            Reschedule Policy:
          </h4>
          <ul className="text-salon-dark/70 dark:text-white/70 text-sm space-y-1">
            <li>• Appointments can be rescheduled up to 2 hours before the original time</li>
            <li>• No additional fees for rescheduling within our policy</li>
            <li>• A confirmation will be sent to your email and phone</li>
            <li>• You can reschedule again if needed, subject to availability</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default RescheduleBooking;
