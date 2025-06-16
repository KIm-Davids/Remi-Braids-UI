
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-salon-grey/20 to-salon-pink/30">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-salon-pink/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-salon-grey/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Floating Stars Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <Star className="absolute top-1/4 left-1/4 h-4 w-4 text-salon-pink animate-bounce opacity-60" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <Star className="absolute top-1/3 right-1/3 h-3 w-3 text-salon-pink animate-bounce opacity-40" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <Star className="absolute bottom-1/3 left-1/5 h-5 w-5 text-salon-pink animate-bounce opacity-50" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
        <Star className="absolute top-1/2 right-1/4 h-3 w-3 text-salon-pink animate-bounce opacity-70" style={{ animationDelay: '0.5s', animationDuration: '2.8s' }} />
        <Star className="absolute bottom-1/4 right-1/6 h-4 w-4 text-salon-pink animate-bounce opacity-45" style={{ animationDelay: '1.5s', animationDuration: '3.2s' }} />
        <Star className="absolute top-3/4 left-1/3 h-3 w-3 text-salon-pink animate-bounce opacity-55" style={{ animationDelay: '2.5s', animationDuration: '4.2s' }} />
        
        {/* Additional floating elements */}
        <div className="absolute top-1/6 right-1/2 w-2 h-2 bg-salon-pink rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute bottom-1/6 left-1/2 w-1.5 h-1.5 bg-salon-pink rounded-full animate-pulse opacity-40" style={{ animationDelay: '1.8s' }}></div>
        <div className="absolute top-2/3 right-1/5 w-2.5 h-2.5 bg-salon-pink rounded-full animate-pulse opacity-50" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-salon-pink mr-3" />
            <span className="text-salon-grey font-medium tracking-wide uppercase text-sm">
              Luxury Hair Experience
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="block text-salon-dark">Your Hair,</span>
            <span className="block text-gradient">Your Story</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-salon-dark/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the artistry of luxury hair styling where creativity meets sophistication. 
            Transform your look with our master stylists.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Button 
              size="lg" 
              className="bg-salon-pink hover:bg-salon-pink/90 text-salon-dark font-semibold px-8 py-4 text-lg hover-lift group"
              onClick={() => navigate('/braid-studio')}
            >
              Book Your Transformation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-salon-grey hover:bg-salon-grey/20 text-salon-dark font-semibold px-8 py-4 text-lg hover-lift"
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Styles
            </Button>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 animate-bounce delay-500">
          <div className="w-2 h-2 bg-salon-pink rounded-full"></div>
        </div>
        <div className="absolute top-1/3 right-8 transform animate-bounce delay-1000">
          <div className="w-3 h-3 bg-salon-grey rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
