
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, DollarSign, Sparkles } from 'lucide-react';
import { Service, BookingData } from '@/pages/BookNow';

interface ServiceSelectionProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
}

const ServiceSelection = ({ bookingData, updateBookingData }: ServiceSelectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState('hair');

  const serviceCategories = [
    { id: 'hair', name: 'Hair', icon: '💇‍♀️', color: 'from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30' },
    { id: 'nails', name: 'Nails', icon: '💅', color: 'from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30' },
    { id: 'spa', name: 'Spa', icon: '🧖‍♀️', color: 'from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30' },
    { id: 'facial', name: 'Facial', icon: '✨', color: 'from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30' },
    { id: 'makeup', name: 'Makeup', icon: '💄', color: 'from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30' },
  ];

  const services: Service[] = [
    // Hair Services
    { id: 'hair-cut', name: 'Hair Wash & Treatment', description: 'Expert styling with consultation', duration: 120, price: 85, category: 'hair' },
    { id: 'hair-color', name: 'Hair Color & Highlights', description: 'Professional coloring service', duration: 120, price: 150, category: 'hair' },
    { id: 'hair-treatment', name: 'Deep Conditioning Treatment', description: 'Nourishing hair therapy', duration: 45, price: 65, category: 'hair' },
    { id: 'hair-styling', name: 'Special Event Styling', description: 'Perfect for occasions', duration: 90, price: 120, category: 'hair' },
    
    // Nail Services
    { id: 'manicure', name: 'Luxury Manicure', description: 'Complete nail care experience', duration: 45, price: 55, category: 'nails' },
    { id: 'pedicure', name: 'Spa Pedicure', description: 'Relaxing foot treatment', duration: 60, price: 70, category: 'nails' },
    { id: 'nail-art', name: 'Custom Nail Art', description: 'Creative designs by our artists', duration: 75, price: 85, category: 'nails' },
    
    // Spa Services
    { id: 'massage', name: 'Relaxation Massage', description: 'Full body stress relief', duration: 90, price: 140, category: 'spa' },
    { id: 'body-wrap', name: 'Detox Body Wrap', description: 'Purifying and toning treatment', duration: 75, price: 110, category: 'spa' },
    
    // Facial Services
    { id: 'classic-facial', name: 'Classic European Facial', description: 'Deep cleansing and hydration', duration: 60, price: 95, category: 'facial' },
    { id: 'anti-aging', name: 'Anti-Aging Treatment', description: 'Advanced skincare therapy', duration: 75, price: 125, category: 'facial' },
    
    // Makeup Services
    { id: 'makeup-app', name: 'Professional Makeup', description: 'Perfect for any occasion', duration: 45, price: 75, category: 'makeup' },
    { id: 'bridal-makeup', name: 'Bridal Makeup Package', description: 'Complete bridal beauty', duration: 90, price: 150, category: 'makeup' },
  ];

  const categoryServices = services.filter(service => service.category === selectedCategory);

  const handleServiceSelect = (service: Service) => {
    updateBookingData({ service });
  };

  return (
    <div className="space-y-6">
      {/* Service Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid grid-cols-5 w-full h-auto p-1 bg-salon-grey/20 dark:bg-salon-pink/10">
          {serviceCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex flex-col items-center p-3 space-y-2 data-[state=active]:bg-salon-pink data-[state=active]:text-salon-dark"
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-xs font-medium">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {serviceCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {categoryServices.map((service) => (
                <Card
                  key={service.id}
                  className={`cursor-pointer hover-lift transition-all duration-300 border-2 ${
                    bookingData.service?.id === service.id
                      ? 'border-salon-pink bg-salon-pink/10 dark:bg-salon-pink/20'
                      : 'border-transparent hover:border-salon-pink/50'
                  }`}
                  onClick={() => handleServiceSelect(service)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-salon-dark dark:text-white text-lg">
                        {service.name}
                      </h3>
                      {bookingData.service?.id === service.id && (
                        <Badge className="bg-salon-pink text-salon-dark">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Selected
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-salon-dark/70 dark:text-white/70 text-sm mb-4">
                      {service.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-salon-dark/60 dark:text-white/60 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {service.duration} min
                      </div>
                      <div className="flex items-center text-salon-pink font-semibold">
                        <DollarSign className="h-4 w-4" />
                        {service.price}
                      </div>
                    </div>
                    
                    <Button
                      className={`w-full mt-4 ${
                        bookingData.service?.id === service.id
                          ? 'bg-salon-pink text-salon-dark'
                          : 'bg-salon-grey hover:bg-salon-grey/80 text-salon-dark dark:bg-salon-pink/20 dark:hover:bg-salon-pink/30 dark:text-white'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceSelect(service);
                      }}
                    >
                      {bookingData.service?.id === service.id ? 'Selected' : 'Select Service'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ServiceSelection;
