
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, MessageCircle, Calendar, Clock, MapPin, Check } from 'lucide-react';
import Navigation from '@/components/Navigation';
import ServiceSelection from '@/components/booking/ServiceSelection';
import DateTimeSelection from '@/components/booking/DateTimeSelection';
import BookingConfirmation from '@/components/booking/BookingConfirmation';
import PersonalInfo from '@/components/booking/PersonalInfo';
import BookingSuccess from '@/components/booking/BookingSuccess';

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
}

export interface BookingData {
  service?: Service;
  date?: Date;
  time?: string;
  personalInfo?: {
    fullName: string;
    phone: string;
    email: string;
    notes?: string;
  };
}

const BookNow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({});

  const steps = [
    { number: 1, title: 'Additional Service', component: ServiceSelection },
    { number: 2, title: 'Date & Time', component: DateTimeSelection },
    { number: 3, title: 'Confirm Details', component: BookingConfirmation },
    { number: 4, title: 'Personal Info', component: PersonalInfo },
    { number: 5, title: 'Complete', component: BookingSuccess },
  ];

  const currentStepData = steps.find(step => step.number === currentStep);
  const CurrentStepComponent = currentStepData?.component;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!bookingData.service;
      case 2: return !!(bookingData.date && bookingData.time);
      case 3: return true;
      case 4: return !!(bookingData.personalInfo?.fullName && bookingData.personalInfo?.phone && bookingData.personalInfo?.email);
      default: return false;
    }
  };

  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-salon-pink/10 via-white to-salon-grey/10 dark:from-salon-dark dark:via-salon-dark dark:to-salon-dark">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-salon-pink mr-2" />
              <span className="text-salon-grey dark:text-salon-pink font-medium tracking-wide uppercase text-sm">
                Book Your Appointment
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-salon-dark dark:text-white mb-4">
              Reserve Your Spot
            </h1>
            <p className="text-lg text-salon-dark/70 dark:text-white/70 max-w-2xl mx-auto">
              Complete your booking in just a few simple steps - Please continue to whatsapp to send us your booking details
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-salon-dark dark:text-white">
                Step {currentStep} of {steps.length}
              </span>
              <span className="text-sm text-salon-dark/70 dark:text-white/70">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2 mb-2" />
            <div className="flex justify-between text-xs text-salon-dark/60 dark:text-white/60">
              {steps.map((step, index) => (
                <span
                  key={step.number}
                  className={`${
                    currentStep >= step.number 
                      ? 'text-salon-pink font-medium' 
                      : 'text-salon-dark/40 dark:text-white/40'
                  }`}
                >
                  {step.title}
                </span>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <Card className="shadow-xl border-0 bg-white dark:bg-gray-900 animate-scale-in">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-semibold text-salon-dark dark:text-white flex items-center justify-center">
                {currentStep === 1 && <Calendar className="h-5 w-5 mr-2 text-salon-pink" />}
                {currentStep === 2 && <Clock className="h-5 w-5 mr-2 text-salon-pink" />}
                {currentStep === 3 && <Check className="h-5 w-5 mr-2 text-salon-pink" />}
                {currentStep === 4 && <MapPin className="h-5 w-5 mr-2 text-salon-pink" />}
                {currentStep === 5 && <Check className="h-5 w-5 mr-2 text-salon-pink" />}
                {currentStepData?.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6">
              {CurrentStepComponent && (
                <CurrentStepComponent
                  bookingData={bookingData}
                  updateBookingData={updateBookingData}
                  onNext={handleNext}
                />
              )}
            </CardContent>

            {/* Navigation */}
            {currentStep < steps.length && (
              <div className="flex justify-between items-center p-6 border-t border-salon-grey/20 dark:border-salon-pink/20">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="border-salon-grey hover:bg-salon-grey/20 text-salon-dark dark:text-white dark:border-salon-pink/30"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-salon-pink hover:bg-salon-pink/90 text-salon-dark font-semibold"
                >
                  {currentStep === steps.length - 1 ? 'Complete Booking' : 'Continue'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </Card>

          {/* Help Button */}
          <div className="fixed bottom-6 right-6 z-50">
            <Button
              size="lg"
              className="rounded-full bg-salon-pink hover:bg-salon-pink/90 text-salon-dark font-semibold shadow-lg hover-lift"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Help
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
