import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Scissors, Sparkles } from 'lucide-react';
import BookingButton from './BookingButton';

const StyleStudio = () => {
  const [selectedLength, setSelectedLength] = useState('medium');
  const [selectedTexture, setSelectedTexture] = useState('wavy');
  const [selectedColor, setSelectedColor] = useState('brunette');

  const options = {
    length: [
      { id: 'short', name: 'Short', icon: '✂️' },
      { id: 'medium', name: 'Medium', icon: '💇‍♀️' },
      { id: 'long', name: 'Long', icon: '👩‍🦱' },
    ],
    texture: [
      { id: 'straight', name: 'Straight', icon: '📏' },
      { id: 'wavy', name: 'Wavy', icon: '🌊' },
      { id: 'curly', name: 'Curly', icon: '🌀' },
    ],
    color: [
      { id: 'blonde', name: 'Blonde', color: '#F5DEB3' },
      { id: 'brunette', name: 'Brunette', color: '#8B4513' },
      { id: 'black', name: 'Black', color: '#2F2F2F' },
      { id: 'red', name: 'Red', color: '#B22222' },
      { id: 'fantasy', name: 'Fantasy', color: 'linear-gradient(45deg, #FF6B9D, #C44569)' },
    ],
  };

  const generateStyleName = () => {
    const lengthName = options.length.find(l => l.id === selectedLength)?.name;
    const textureName = options.texture.find(t => t.id === selectedTexture)?.name;
    const colorName = options.color.find(c => c.id === selectedColor)?.name;
    return `${colorName} ${textureName} ${lengthName}`;
  };

  return (
    <section id="studio" className="py-20 bg-gradient-to-br from-salon-pink/20 via-white to-salon-grey/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Palette className="h-8 w-8 text-salon-pink mr-3" />
            <span className="text-salon-grey font-medium tracking-wide uppercase text-sm">
              Create Your Look
            </span>
          </div>
          <h2 className="text-5xl font-bold text-salon-dark mb-6">
            Style Studio
          </h2>
          <p className="text-xl text-salon-dark/70 max-w-2xl mx-auto">
            Mix and match different elements to create your perfect hairstyle
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Style Customizer */}
          <div className="space-y-8 animate-slide-up">
            {/* Length Selection */}
            <div>
              <h3 className="text-2xl font-semibold dark:text-black text-salon-dark mb-4 flex items-center">
                <Scissors className="h-6 w-6 text-salon-pink mr-2" />
                Length
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {options.length.map((option) => (
                  <Button
                    key={option.id}
                    variant={selectedLength === option.id ? "default" : "outline"}
                    onClick={() => setSelectedLength(option.id)}
                    className={`p-4 h-auto flex flex-col items-center dark:text-black space-y-2 hover-lift ${
                      selectedLength === option.id
                        ? 'bg-salon-pink text-salon-dark '
                        : 'border-salon-grey hover:bg-salon-grey/20 text-salon-dark'
                    }`}
                  >
                    <span className="text-2xl ">{option.icon}</span>
                    <span className="font-medium">{option.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Texture Selection */}
            <div>
              <h3 className="text-2xl font-semibold text-salon-dark mb-4 flex items-center">
                <Sparkles className="h-6 w-6 text-salon-pink mr-2" />
                Texture
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {options.texture.map((option) => (
                  <Button
                    key={option.id}
                    variant={selectedTexture === option.id ? "default" : "outline"}
                    onClick={() => setSelectedTexture(option.id)}
                    className={`p-4 h-auto flex flex-col items-center space-y-2 hover-lift ${
                      selectedTexture === option.id
                        ? 'bg-salon-pink text-salon-dark'
                        : 'border-salon-grey hover:bg-salon-grey/20 text-salon-dark'
                    }`}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-medium">{option.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-2xl font-semibold text-salon-dark mb-4 flex items-center">
                <Palette className="h-6 w-6 text-salon-pink mr-2" />
                Color
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {options.color.map((option) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    onClick={() => setSelectedColor(option.id)}
                    className={`p-4 h-auto flex flex-col items-center space-y-2 hover-lift border-2 ${
                      selectedColor === option.id
                        ? 'border-salon-pink bg-salon-pink/10'
                        : 'border-salon-grey hover:bg-salon-grey/20'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                      style={{ 
                        background: option.color.includes('gradient') 
                          ? option.color 
                          : option.color 
                      }}
                    ></div>
                    <span className="font-medium text-salon-dark text-sm">{option.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Style Preview */}
          <div className="animate-scale-in">
            <Card className="p-8 text-center border-0 shadow-xl bg-white">
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-salon-pink to-salon-grey rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-16 w-16 text-white" />
                </div>
                <Badge className="bg-salon-pink text-salon-dark px-4 py-2 text-lg font-semibold">
                  Your Custom Style
                </Badge>
              </div>
              
              <h3 className="text-3xl font-bold text-salon-dark mb-4">
                {generateStyleName()}
              </h3>
              
              <p className="text-salon-dark/70 mb-6">
                A beautiful combination that perfectly captures your unique style and personality.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center py-2 border-b border-salon-grey/30">
                  <span className="font-medium text-salon-dark">Length:</span>
                  <span className="text-salon-dark/70">{options.length.find(l => l.id === selectedLength)?.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-salon-grey/30">
                  <span className="font-medium text-salon-dark">Texture:</span>
                  <span className="text-salon-dark/70">{options.texture.find(t => t.id === selectedTexture)?.name}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-salon-dark">Color:</span>
                  <span className="text-salon-dark/70">{options.color.find(c => c.id === selectedColor)?.name}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <BookingButton
                  className="w-full bg-salon-pink hover:bg-salon-pink/90 text-salon-dark font-semibold"
                  source="style-studio"
                >
                  Book This Style
                </BookingButton>
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full border-salon-grey hover:bg-salon-grey/20 text-salon-dark font-semibold hover-lift"
                >
                  Save & Continue Browsing
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StyleStudio;
