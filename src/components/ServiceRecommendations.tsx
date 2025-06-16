
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BookingButton from '@/components/BookingButton';
import { Clock, DollarSign, Sparkles } from 'lucide-react';
import type { Service, Mood } from '@/pages/MoodBooking';

interface ServiceRecommendationsProps {
  services: Service[];
  selectedMood: Mood;
}

const ServiceRecommendations = ({ services, selectedMood }: ServiceRecommendationsProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hair': return '💇‍♀️';
      case 'skincare': return '✨';
      case 'makeup': return '💄';
      case 'wellness': return '🧘';
      case 'package': return '🎁';
      default: return '💫';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hair': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      case 'skincare': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'makeup': return 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300';
      case 'wellness': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'package': return 'bg-gradient-to-r from-salon-pink to-salon-grey text-salon-dark';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-salon-dark dark:text-white mb-2">
          Perfect Services for You
        </h2>
        <p className="text-salon-dark/70 dark:text-white/70">
          Handpicked recommendations based on how you're feeling
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {services.map((service, index) => (
          <Card
            key={service.id}
            className="hover-lift bg-white dark:bg-gray-900 border-0 shadow-lg hover:shadow-xl animate-scale-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-3">
                <div className={`rounded-full px-3 py-1 text-sm font-medium ${getCategoryColor(service.category)}`}>
                  <span className="mr-1">{getCategoryIcon(service.category)}</span>
                  {service.category}
                </div>
              </div>
              <CardTitle className="text-xl text-salon-dark dark:text-white mb-2">
                {service.name}
              </CardTitle>
              <p className="text-salon-dark/70 dark:text-white/70 text-sm">
                {service.description}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center text-salon-dark/70 dark:text-white/70">
                  <Clock className="h-4 w-4 mr-1" />
                  {service.duration}
                </div>
                <div className="flex items-center font-bold text-salon-pink dark:text-salon-pink">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {service.price.replace('$', '')}
                </div>
              </div>
              
              <BookingButton
                className="w-full bg-salon-pink hover:bg-salon-pink/90 text-salon-dark font-semibold"
                source="mood-booking"
              >
                Book Now
              </BookingButton>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Customize Package Option */}
      <div className="text-center">
        <Card className="max-w-md mx-auto bg-gradient-to-br from-salon-pink/20 to-salon-grey/20 dark:from-salon-pink/10 dark:to-salon-grey/10 border-salon-pink/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-salon-pink mr-2" />
              <h3 className="text-xl font-bold text-salon-dark dark:text-white">
                Want Something Different?
              </h3>
            </div>
            <p className="text-salon-dark/70 dark:text-white/70 mb-4 text-sm">
              Mix and match services to create your perfect experience
            </p>
            <BookingButton
              variant="outline"
              className="border-salon-pink text-salon-pink hover:bg-salon-pink hover:text-salon-dark font-semibold"
              source="mood-booking-custom"
            >
              Customize My Package
            </BookingButton>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceRecommendations;
