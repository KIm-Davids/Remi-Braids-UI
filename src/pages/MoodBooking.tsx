
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import MoodSelector from '@/components/MoodSelector';
import ServiceRecommendations from '@/components/ServiceRecommendations';
import { Sparkles, Heart } from 'lucide-react';

export interface Mood {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: 'relaxation' | 'glow-up' | 'energize';
}

export interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
  category: string;
}

const MoodBooking = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [showServices, setShowServices] = useState(false);

  const moods: Mood[] = [
    {
      id: 'stressed',
      name: 'Feeling Stressed',
      emoji: '😩',
      description: 'Need some relaxation and stress relief',
      category: 'relaxation'
    },
    {
      id: 'date-night',
      name: 'Date Night Ready',
      emoji: '😍',
      description: 'Want to look stunning for a special occasion',
      category: 'glow-up'
    },
    {
      id: 'low-energy',
      name: 'Low Energy',
      emoji: '😴',
      description: 'Need an energizing pick-me-up',
      category: 'energize'
    },
    {
      id: 'self-care',
      name: 'Need Self-Care',
      emoji: '🧘',
      description: 'Time for some well-deserved pampering',
      category: 'relaxation'
    },
    {
      id: 'bad-hair',
      name: 'Bad Hair Week',
      emoji: '😢',
      description: 'Hair needs professional attention',
      category: 'glow-up'
    }
  ];

  const getServicesForMood = (mood: Mood): Service[] => {
    const serviceMap: Record<string, Service[]> = {
      'stressed': [
        { id: 'scalp-massage', name: 'Relaxing Scalp Massage', duration: '45 min', price: '$65', description: 'Therapeutic massage to melt away stress', category: 'wellness' },
        { id: 'aromatherapy-facial', name: 'Aromatherapy Facial', duration: '60 min', price: '$85', description: 'Calming facial with essential oils', category: 'skincare' },
        { id: 'stress-relief-package', name: 'Stress Relief Package', duration: '90 min', price: '$120', description: 'Complete relaxation experience', category: 'package' }
      ],
      'date-night': [
        { id: 'glam-styling', name: 'Glamour Hair Styling', duration: '75 min', price: '$95', description: 'Elegant styling for special occasions', category: 'hair' },
        { id: 'makeup-application', name: 'Professional Makeup', duration: '45 min', price: '$75', description: 'Flawless makeup for your date', category: 'makeup' },
        { id: 'date-night-package', name: 'Date Night Package', duration: '2 hrs', price: '$150', description: 'Hair & makeup combo', category: 'package' }
      ],
      'low-energy': [
        { id: 'energizing-facial', name: 'Energizing Vitamin C Facial', duration: '50 min', price: '$80', description: 'Brightening treatment to revitalize skin', category: 'skincare' },
        { id: 'volume-blowout', name: 'Volume Boost Blowout', duration: '40 min', price: '$60', description: 'Add life and bounce to your hair', category: 'hair' },
        { id: 'energy-boost-package', name: 'Energy Boost Package', duration: '80 min', price: '$110', description: 'Revitalizing hair and skin combo', category: 'package' }
      ],
      'self-care': [
        { id: 'deep-conditioning', name: 'Deep Conditioning Treatment', duration: '60 min', price: '$70', description: 'Intensive hair nourishment', category: 'hair' },
        { id: 'hydrating-facial', name: 'Hydrating Facial', duration: '60 min', price: '$85', description: 'Restore skin moisture and glow', category: 'skincare' },
        { id: 'self-care-package', name: 'Self-Care Spa Package', duration: '2.5 hrs', price: '$180', description: 'Ultimate pampering experience', category: 'package' }
      ],
      'bad-hair': [
        { id: 'hair-rescue', name: 'Hair Rescue Treatment', duration: '90 min', price: '$100', description: 'Intensive repair for damaged hair', category: 'hair' },
        { id: 'cut-and-style', name: 'Fresh Cut & Style', duration: '75 min', price: '$85', description: 'New look with professional styling', category: 'hair' },
        { id: 'hair-transformation', name: 'Hair Transformation Package', duration: '3 hrs', price: '$200', description: 'Complete hair makeover', category: 'package' }
      ]
    };

    return serviceMap[mood.id] || [];
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setTimeout(() => {
      setShowServices(true);
    }, 300);
  };

  const resetSelection = () => {
    setShowServices(false);
    setTimeout(() => {
      setSelectedMood(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-salon-pink/10 via-white to-salon-grey/10 dark:from-salon-dark dark:via-salon-dark dark:to-salon-dark">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <Heart className="h-8 w-8 text-salon-pink mr-3" />
              <span className="text-salon-grey dark:text-salon-pink font-medium tracking-wide uppercase text-sm">
                Personalized Beauty Experience
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-salon-dark dark:text-white mb-4">
              How are you feeling today?
            </h1>
            <p className="text-lg text-salon-dark/70 dark:text-white/70 max-w-2xl mx-auto">
              Let us recommend the perfect services based on your mood and what you need right now
            </p>
          </div>

          {/* Mood Selection or Services */}
          <div className="transition-all duration-500 ease-in-out">
            {!selectedMood ? (
              <MoodSelector moods={moods} onMoodSelect={handleMoodSelect} />
            ) : (
              <div className="animate-slide-up">
                {/* Selected Mood Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center bg-white dark:bg-gray-900 rounded-full px-6 py-3 shadow-lg mb-4">
                    <span className="text-3xl mr-3">{selectedMood.emoji}</span>
                    <span className="text-lg font-semibold text-salon-dark dark:text-white">
                      {selectedMood.name}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={resetSelection}
                    className="text-salon-dark dark:text-white border-salon-grey dark:border-salon-pink/30"
                  >
                    Choose Different Mood
                  </Button>
                </div>

                {/* Service Recommendations */}
                {showServices && (
                  <ServiceRecommendations 
                    services={getServicesForMood(selectedMood)}
                    selectedMood={selectedMood}
                  />
                )}
              </div>
            )}
          </div>

          {/* Testimonials Section */}
          {!selectedMood && (
            <div className="mt-16 animate-fade-in">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-salon-dark dark:text-white mb-4">
                  Mood-Based Transformations
                </h3>
                <p className="text-salon-dark/70 dark:text-white/70">
                  See how we've helped others feel their best
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: "Sarah M.", mood: "Stressed → Relaxed", review: "The scalp massage was exactly what I needed after a tough week!" },
                  { name: "Emily R.", mood: "Low Energy → Glowing", review: "The vitamin C facial gave me the energy boost I was looking for!" },
                  { name: "Jessica L.", mood: "Bad Hair → Confident", review: "They completely transformed my hair disaster into something beautiful!" }
                ].map((testimonial, index) => (
                  <Card key={index} className="text-center hover-lift bg-white dark:bg-gray-900">
                    <CardHeader>
                      <div className="w-12 h-12 bg-salon-pink rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-salon-dark" />
                      </div>
                      <CardTitle className="text-lg text-salon-dark dark:text-white">
                        {testimonial.name}
                      </CardTitle>
                      <p className="text-sm text-salon-pink dark:text-salon-pink font-medium">
                        {testimonial.mood}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-salon-dark/70 dark:text-white/70 italic">
                        "{testimonial.review}"
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodBooking;
