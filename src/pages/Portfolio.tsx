
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Filter, X, Share2, Heart, Play, Pause, ArrowLeft, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import BookingButton from '@/components/BookingButton';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  type: 'image' | 'video';
  thumbnail: string;
  fullMedia: string[];
  description: string;
  suitableFor: string;
  testimonial?: {
    text: string;
    author: string;
  };
}

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const filters = [
    { id: 'all', name: 'All Styles', count: 18 },
    { id: 'braids', name: 'Braids', count: 6 },
    { id: 'cuts', name: 'Cuts', count: 4 },
    { id: 'colors', name: 'Colors', count: 5 },
    { id: 'wigs', name: 'Wigs', count: 2 },
    { id: 'bridal', name: 'Bridal', count: 3 },
  ];

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: 'Goddess Box Braids',
      category: 'braids',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=600&fit=crop',
      fullMedia: [
        'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800&h=1200&fit=crop'
      ],
      description: 'Protective goddess braids with added length and volume',
      suitableFor: 'Perfect for natural hair protection and elegant occasions',
      testimonial: {
        text: 'These braids are absolutely stunning! They lasted for weeks and I received so many compliments.',
        author: 'Sarah M.'
      }
    },
    {
      id: 2,
      title: 'Pixie Cut Transformation',
      category: 'cuts',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1560869713-bf165e08fe3d?w=400&h=600&fit=crop',
      fullMedia: [
        'https://images.unsplash.com/photo-1560869713-bf165e08fe3d?w=800&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1549351236-caca0f174515?w=800&h=1200&fit=crop'
      ],
      description: 'Bold pixie cut with modern styling and texture',
      suitableFor: 'Ideal for confident women who love low-maintenance styles',
      testimonial: {
        text: 'I was nervous about cutting my hair this short, but the result is incredible! So freeing and stylish.',
        author: 'Jessica L.'
      }
    },
    {
      id: 3,
      title: 'Rose Gold Balayage',
      category: 'colors',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=600&fit=crop',
      fullMedia: [
        'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800&h=1200&fit=crop'
      ],
      description: 'Hand-painted rose gold highlights with seamless blending',
      suitableFor: 'Best for medium to dark hair wanting a subtle color change',
      testimonial: {
        text: 'The color is exactly what I dreamed of! So natural looking yet so beautiful.',
        author: 'Maria R.'
      }
    },
    {
      id: 4,
      title: 'Feed-In Cornrows',
      category: 'braids',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400&h=600&fit=crop',
      fullMedia: [
        'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800&h=1200&fit=crop'
      ],
      description: 'Intricate feed-in cornrows with geometric patterns',
      suitableFor: 'Perfect for active lifestyles and long-lasting protective styling',
    },
    {
      id: 5,
      title: 'Bridal Updo Elegance',
      category: 'bridal',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1549351236-caca0f174515?w=400&h=600&fit=crop',
      fullMedia: [
        'https://images.unsplash.com/photo-1549351236-caca0f174515?w=800&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1560869713-bf165e08fe3d?w=800&h=1200&fit=crop'
      ],
      description: 'Romantic bridal updo with soft curls and delicate details',
      suitableFor: 'Designed for weddings and formal events',
      testimonial: {
        text: 'My wedding hair was absolutely perfect! It stayed beautiful all day and night.',
        author: 'Emma K.'
      }
    },
    {
      id: 6,
      title: 'Luxury Lace Front Wig',
      category: 'wigs',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=600&fit=crop',
      fullMedia: [
        'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&h=1200&fit=crop'
      ],
      description: 'Natural-looking lace front wig with body wave texture',
      suitableFor: 'Perfect for versatility and hair protection',
    },
    {
      id: 6,
      title: 'Luxury Lace Front Wig',
      category: 'wigs',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=600&fit=crop',
      fullMedia: [
        'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&h=1200&fit=crop'
      ],
      description: 'Natural-looking lace front wig with body wave texture',
      suitableFor: 'Perfect for versatility and hair protection',
    },
    {
      id: 6,
      title: 'Luxury Lace Front Wig',
      category: 'wigs',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=600&fit=crop',
      fullMedia: [
        'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&h=1200&fit=crop'
      ],
      description: 'Natural-looking lace front wig with body wave texture',
      suitableFor: 'Perfect for versatility and hair protection',
    },
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const handleVideoHover = (itemId: number, isHovering: boolean) => {
    const video = videoRefs.current[itemId];
    if (video) {
      if (isHovering) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  const shareStyle = (item: PortfolioItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`Check out this amazing hairstyle: ${item.title} - ${window.location.href}`);
    }
  };

  const nextMedia = () => {
    if (selectedItem && currentMediaIndex < selectedItem.fullMedia.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    }
  };

  const prevMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  useEffect(() => {
    setCurrentMediaIndex(0);
  }, [selectedItem]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-salon-grey/10 to-salon-pink/20 dark:from-salon-dark dark:via-salon-dark dark:to-salon-dark">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-salon-dark dark:text-white mb-6">
              Complete Portfolio
            </h1>
            <p className="text-xl text-salon-dark/70 dark:text-white/70 max-w-2xl mx-auto">
              Explore our complete collection of stunning hair transformations and artistic creations
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 font-medium transition-all duration-300 hover-lift flex items-center gap-2 ${
                  activeFilter === filter.id
                    ? 'bg-salon-pink text-salon-dark'
                    : 'border-salon-grey hover:bg-salon-grey/20 text-salon-dark dark:text-white dark:border-salon-pink/30'
                }`}
              >
                <Filter className="h-4 w-4" />
                {filter.name}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {filter.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className="group break-inside-avoid overflow-hidden border-0 shadow-lg hover-lift animate-scale-in cursor-pointer relative"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedItem(item)}
                onMouseEnter={() => item.type === 'video' && handleVideoHover(item.id, true)}
                onMouseLeave={() => item.type === 'video' && handleVideoHover(item.id, false)}
              >
                <div className="relative overflow-hidden">
                  {item.type === 'video' ? (
                    <div className="relative">
                      <video
                        ref={(el) => { videoRefs.current[item.id] = el; }}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        muted
                        loop
                        playsInline
                        poster={item.thumbnail}
                      >
                        <source src={item.thumbnail} type="video/mp4" />
                      </video>
                      <div className="absolute top-4 right-4 bg-black/50 rounded-full p-2">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 group-hover:saturate-110"
                      style={{
                        filter: 'brightness(1) saturate(1)',
                        transition: 'filter 0.3s ease, transform 0.3s ease'
                      }}
                    />
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:text-salon-pink p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            shareStyle(item);
                          }}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm opacity-90 mb-2">{item.description}</p>
                      <Badge className="bg-salon-pink/20 text-salon-pink border-salon-pink text-xs">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More / CTA */}
          <div className="text-center mt-16 animate-fade-in">
            <div className="mb-6">
              <p className="text-salon-dark/70 dark:text-white/70 mb-4">
                Inspired by what you see? Book your transformation today!
              </p>
              <BookingButton
                className="bg-salon-pink hover:bg-salon-pink/90 text-salon-dark font-semibold px-8 py-4 mr-4"
                source="portfolio-page"
              >
                Book Your Style
              </BookingButton>
              <Button
                variant="outline"
                size="lg"
                className="border-salon-grey hover:bg-salon-grey/20 text-salon-dark dark:text-white font-semibold px-8 py-4 hover-lift dark:border-salon-pink/30"
              >
                Load More Styles
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl w-full h-[80vh] overflow-hidden p-0">
          {selectedItem && (
            <>
              <DialogHeader className="p-6 pb-0">
                <DialogTitle className="text-2xl font-bold text-salon-dark dark:text-white flex items-center justify-between">
                  {selectedItem.title}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedItem(null)}
                    className="text-salon-dark dark:text-white hover:text-salon-pink"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </DialogTitle>
              </DialogHeader>
              
              <div className="flex flex-col md:flex-row h-full">
                {/* Media Section */}
                <div className="md:w-2/3 relative">
                  <div className="relative h-full">
                    <img
                      src={selectedItem.fullMedia[currentMediaIndex]}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {selectedItem.fullMedia.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                          onClick={prevMedia}
                          disabled={currentMediaIndex === 0}
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                          onClick={nextMedia}
                          disabled={currentMediaIndex === selectedItem.fullMedia.length - 1}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {selectedItem.fullMedia.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                index === currentMediaIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Details Section */}
                <div className="md:w-1/3 p-6 bg-white dark:bg-gray-900 overflow-y-auto">
                  <Badge className="bg-salon-pink/20 text-salon-pink border-salon-pink mb-4">
                    {selectedItem.category}
                  </Badge>
                  
                  <p className="text-salon-dark/70 dark:text-white/70 mb-4">
                    {selectedItem.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-salon-dark dark:text-white mb-2">Perfect For:</h4>
                    <p className="text-sm text-salon-dark/70 dark:text-white/70">
                      {selectedItem.suitableFor}
                    </p>
                  </div>
                  
                  {selectedItem.testimonial && (
                    <div className="mb-6 p-4 bg-salon-grey/20 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-semibold text-salon-dark dark:text-white mb-2">Client Review:</h4>
                      <p className="text-sm italic text-salon-dark/70 dark:text-white/70 mb-2">
                        "{selectedItem.testimonial.text}"
                      </p>
                      <p className="text-xs font-medium text-salon-pink">
                        - {selectedItem.testimonial.author}
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <BookingButton
                      className="w-full bg-salon-pink hover:bg-salon-pink/90 text-salon-dark font-semibold"
                      source="portfolio-modal"
                    >
                      Book This Style
                    </BookingButton>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-salon-grey hover:bg-salon-grey/20 text-salon-dark dark:text-white font-semibold dark:border-salon-pink/30"
                      onClick={() => shareStyle(selectedItem)}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Style
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Portfolio;
