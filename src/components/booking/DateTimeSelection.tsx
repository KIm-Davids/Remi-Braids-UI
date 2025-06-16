
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { BookingData } from '@/pages/BookNow';

interface DateTimeSelectionProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
}

const DateTimeSelection = ({ bookingData, updateBookingData }: DateTimeSelectionProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(bookingData.date);

  const timeSlots = {
    morning: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    afternoon: ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
    evening: ['4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'],
  };

  // Mock unavailable times (in a real app, this would come from your booking system)
  const unavailableTimes = ['10:30 AM', '2:00 PM', '5:30 PM'];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    updateBookingData({ date, time: undefined }); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    updateBookingData({ time });
  };

  const isTimeUnavailable = (time: string) => {
    return unavailableTimes.includes(time);
  };

  const TimeSlotButton = ({ time, period }: { time: string; period: string }) => {
    const isSelected = bookingData.time === time;
    const isUnavailable = isTimeUnavailable(time);

    return (
      <Button
        variant={isSelected ? "default" : "outline"}
        size="sm"
        disabled={isUnavailable}
        onClick={() => handleTimeSelect(time)}
        className={`hover-lift transition-all duration-200 ${
          isSelected
            ? 'bg-salon-pink text-salon-dark'
            : isUnavailable
            ? 'opacity-50 cursor-not-allowed'
            : 'border-salon-grey hover:bg-salon-grey/20 text-salon-dark dark:text-white dark:border-salon-pink/30'
        }`}
      >
        {time}
        {isUnavailable && <span className="ml-1 text-xs">(Booked)</span>}
      </Button>
    );
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Calendar */}
      <Card className="border-salon-grey/20 dark:border-salon-pink/20">
        <CardHeader>
          <CardTitle className="flex items-center text-salon-dark dark:text-white">
            <CalendarIcon className="h-5 w-5 mr-2 text-salon-pink" />
            Select Date
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
                Selected: {format(selectedDate, 'EEEE, MMMM do, yyyy')}
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
            Available Times
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
                    <TimeSlotButton key={time} time={time} period="morning" />
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
                    <TimeSlotButton key={time} time={time} period="afternoon" />
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
                    <TimeSlotButton key={time} time={time} period="evening" />
                  ))}
                </div>
              </div>
            </div>
          )}

          {bookingData.time && (
            <div className="mt-6 p-3 bg-salon-pink/10 dark:bg-salon-pink/20 rounded-lg">
              <p className="text-salon-dark dark:text-white font-medium">
                Selected Time: {bookingData.time}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DateTimeSelection;
