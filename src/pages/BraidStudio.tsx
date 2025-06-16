
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Scissors, Sparkles, RotateCcw, Save, Eye, Heart } from 'lucide-react';
import Navigation from '@/components/Navigation';
import SkinToneSelector from '@/components/SkinToneSelector';
import BookingButton from '@/components/BookingButton';

interface Mood {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: 'relaxation' | 'glow-up' | 'energize';
}

const BraidStudio = () => {
  const [selectedStyle, setSelectedStyle] = useState('box-braids');
  const [selectedLength, setSelectedLength] = useState('medium');
  const [selectedColor, setSelectedColor] = useState('natural-black');
  const [selectedAccessory, setSelectedAccessory] = useState('none');
  const [selectedSkinTone, setSelectedSkinTone] = useState('medium');
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const moods: Mood[] = [
    {
      id: 'confident',
      name: 'Feeling Confident',
      emoji: '💪',
      description: 'Ready to make a bold statement',
      category: 'energize'
    },
    {
      id: 'elegant',
      name: 'Feeling Elegant',
      emoji: '✨',
      description: 'Want something sophisticated and graceful',
      category: 'glow-up'
    },
    {
      id: 'creative',
      name: 'Feeling Creative',
      emoji: '🎨',
      description: 'Express your artistic side',
      category: 'energize'
    },
    {
      id: 'relaxed',
      name: 'Feeling Relaxed',
      emoji: '😌',
      description: 'Looking for something comfortable and easy',
      category: 'relaxation'
    },
    {
      id: 'playful',
      name: 'Feeling Playful',
      emoji: '🌈',
      description: 'Want something fun and vibrant',
      category: 'glow-up'
    }
  ];

  const braidStyles = [
    { id: 'box-braids', name: 'Box Braids', icon: '📦', description: 'Classic protective style' },
    { id: 'cornrows', name: 'Cornrows', icon: '🌽', description: 'Traditional close-to-scalp braids' },
    { id: 'french-braids', name: 'French Braids', icon: '🇫🇷', description: 'Elegant interwoven style' },
    { id: 'dutch-braids', name: 'Dutch Braids', icon: '🇳🇱', description: 'Inverted French braids' },
    { id: 'feed-in-braids', name: 'Feed-in Braids', icon: '➡️', description: 'Gradual hair addition technique' },
    { id: 'goddess-braids', name: 'Goddess Braids', icon: '👸', description: 'Large, flowing braids' },
    { id: 'twists', name: 'Twists', icon: '🌀', description: 'Two-strand twisted style' },
    { id: 'fishtail', name: 'Fishtail Braid', icon: '🐟', description: 'Intricate woven pattern' },
    { id: 'waterfall', name: 'Waterfall Braid', icon: '💧', description: 'Cascading romantic style' },
  ];

  const lengths = [
    { id: 'short', name: 'Short', icon: '✂️', description: 'Chin to shoulder length' },
    { id: 'medium', name: 'Medium', icon: '💇‍♀️', description: 'Shoulder to mid-back' },
    { id: 'long', name: 'Long', icon: '👩‍🦱', description: 'Mid-back to waist' },
    { id: 'extra-long', name: 'Extra Long', icon: '🦄', description: 'Waist length and below' },
  ];

  const colors = [
    { id: 'natural-black', name: 'Natural Black', color: '#1a1a1a' },
    { id: 'chocolate-brown', name: 'Chocolate Brown', color: '#8B4513' },
    { id: 'honey-blonde', name: 'Honey Blonde', color: '#DAA520' },
    { id: 'auburn', name: 'Auburn', color: '#A52A2A' },
    { id: 'burgundy', name: 'Burgundy', color: '#800020' },
    { id: 'blue-black', name: 'Blue Black', color: '#0f0f23' },
    { id: 'ombre', name: 'Ombré', color: 'linear-gradient(180deg, #1a1a1a 0%, #DAA520 100%)' },
    { id: 'rainbow', name: 'Rainbow', color: 'linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080)' },
  ];

  const accessories = [
    { id: 'none', name: 'None', icon: '🚫' },
    { id: 'beads', name: 'Beads', icon: '📿' },
    { id: 'rings', name: 'Hair Rings', icon: '💍' },
    { id: 'ribbons', name: 'Ribbons', icon: '🎀' },
    { id: 'cuffs', name: 'Hair Cuffs', icon: '⚡' },
  ];

  const getMoodRecommendations = (mood: Mood | null) => {
    if (!mood) return [];
    
    const recommendations: Record<string, string[]> = {
      'confident': ['goddess-braids', 'box-braids', 'feed-in-braids'],
      'elegant': ['french-braids', 'waterfall', 'goddess-braids'],
      'creative': ['dutch-braids', 'fishtail', 'twists'],
      'relaxed': ['cornrows', 'twists', 'box-braids'],
      'playful': ['feed-in-braids', 'fishtail', 'dutch-braids']
    };
    
    return recommendations[mood.id] || [];
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'relaxation': return 'from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30';
      case 'glow-up': return 'from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30';
      case 'energize': return 'from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30';
      default: return 'from-gray-100 to-gray-200 dark:from-gray-900/30 dark:to-gray-800/30';
    }
  };

  const generateStyleName = () => {
    const style = braidStyles.find(s => s.id === selectedStyle)?.name;
    const length = lengths.find(l => l.id === selectedLength)?.name;
    const color = colors.find(c => c.id === selectedColor)?.name;
    const moodPrefix = selectedMood ? `${selectedMood.name} ` : '';
    return `${moodPrefix}${color} ${length} ${style}`;
  };

  const recommendedStyles = getMoodRecommendations(selectedMood);

  return (
    <div className="min-h-screen bg-gradient-to-br from-salon-pink/10 via-white to-salon-grey/10 dark:from-salon-dark dark:via-salon-dark dark:to-salon-dark">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <Scissors className="h-8 w-8 text-salon-pink mr-3" />
              <span className="text-salon-grey dark:text-salon-pink font-medium tracking-wide uppercase text-sm">
                Braid Artistry - Your Hair, Your Story
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-salon-dark dark:text-white mb-6">
              Virtual Braid Studio
            </h1>
            <p className="text-xl text-salon-dark/70 dark:text-white/70 max-w-2xl mx-auto">
              Start by telling us how you're feeling, then create your perfect braided hairstyle
            </p>
          </div>

          {/* Mood Selection */}
          <div className="mb-12 animate-fade-in">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl">
              <h3 className="text-2xl font-semibold text-salon-dark dark:text-white mb-6 flex items-center">
                <Heart className="h-6 w-6 text-salon-pink mr-2" />
                How are you feeling today?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {moods.map((mood) => (
                  <Card
                    key={mood.id}
                    className={`cursor-pointer hover-lift transition-all duration-300 bg-gradient-to-br ${getCategoryColor(mood.category)} border-2 ${
                      selectedMood?.id === mood.id 
                        ? 'border-salon-pink dark:border-salon-pink' 
                        : 'border-transparent hover:border-salon-pink/50'
                    }`}
                    onClick={() => setSelectedMood(mood)}
                  >
                    <div className="p-4 text-center">
                      <div className="text-3xl mb-2">{mood.emoji}</div>
                      <h4 className="text-sm font-bold text-salon-dark dark:text-white mb-1">
                        {mood.name}
                      </h4>
                      <p className="text-xs text-salon-dark/70 dark:text-white/70">
                        {mood.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
              {selectedMood && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center bg-salon-pink/10 dark:bg-salon-pink/20 rounded-full px-4 py-2">
                    <span className="text-salon-pink font-medium text-sm">
                      {selectedMood.emoji} {selectedMood.name} - Great choice! Check out our recommendations below.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Customization Panel */}
            <div className="lg:col-span-2 space-y-8 animate-slide-up">
              
              {/* Braid Styles */}
              <div className="dark:bg-gray-900 bg-white dark:bg-salon-dark/50 rounded-2xl p-6 shadow-xl">
                <h3 className="text-2xl font-semibold text-salon-dark dark:text-white mb-6 flex items-center">
                  <Sparkles className="h-6 w-6 text-salon-pink dark:text-white mr-2" />
                  Choose Your Story
                  {selectedMood && (
                    <Badge className="ml-3 bg-salon-pink/20 text-salon-pink border-salon-pink">
                      Mood-matched styles highlighted
                    </Badge>
                  )}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {braidStyles.map((style) => {
                    const isRecommended = recommendedStyles.includes(style.id);
                    return (
                      <Button
                        key={style.id}
                        variant={selectedStyle === style.id ? "default" : "outline"}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`p-4 h-auto flex flex-col items-center space-y-2 hover-lift relative ${
                          selectedStyle === style.id
                            ? 'bg-salon-pink text-salon-dark'
                            : `border-salon-grey hover:bg-salon-grey/20 text-salon-dark dark:text-white dark:border-salon-pink/30 ${
                                isRecommended ? 'ring-2 ring-salon-pink/50' : ''
                              }`
                        }`}
                      >
                        {isRecommended && selectedMood && (
                          <div className="absolute -top-2 -right-2 bg-salon-pink rounded-full p-1">
                            <Sparkles className="h-3 w-3 text-salon-dark" />
                          </div>
                        )}
                        <span className="text-2xl">{style.icon}</span>
                        <div className="text-center">
                          <div className="font-medium text-sm">{style.name}</div>
                          <div className="text-xs opacity-70">{style.description}</div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Length Selection */}
              <div className="dark:bg-gray-900 bg-white rounded-2xl p-6 shadow-xl">
                <h3 className="text-2xl font-semibold text-salon-dark dark:text-white mb-6 flex items-center">
                  <Scissors className="h-6 w-6 text-salon-pink dark:text-white mr-2" />
                  Length
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 dark:text-white gap-4">
                  {lengths.map((length) => (
                    <Button
                      key={length.id}
                      variant={selectedLength === length.id ? "default" : "outline"}
                      onClick={() => setSelectedLength(length.id)}
                      className={`p-4 h-auto flex flex-col items-center space-y-2 hover-lift ${
                        selectedLength === length.id
                          ? 'bg-salon-pink text-salon-dark'
                          : 'border-salon-grey hover:bg-salon-grey/20 text-salon-dark dark:text-white dark:border-salon-pink/30'
                      }`}
                    >
                      <span className="text-2xl">{length.icon}</span>
                      <div className="text-center">
                        <div className="font-medium text-sm">{length.name}</div>
                        <div className="text-xs opacity-70">{length.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl">
                <h3 className="text-2xl font-semibold text-salon-dark dark:text-white mb-6 flex items-center">
                  <Palette className="h-6 w-6 text-salon-pink dark:text-white mr-2" />
                  Colors
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {colors.map((color) => (
                    <Button
                      key={color.id}
                      variant="outline"
                      onClick={() => setSelectedColor(color.id)}
                      className={`p-4 h-auto flex flex-col items-center space-y-3 hover-lift border-2 ${
                        selectedColor === color.id
                          ? 'border-salon-pink dark:bg-salon-pink bg-salon-pink/10'
                          : 'border-salon-grey hover:bg-salon-grey/20 dark:border-salon-pink/30'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                        style={{
                          background: color.color.includes('gradient')
                            ? color.color
                            : color.color
                        }}
                      ></div>
                      <span className="font-medium text-salon-dark dark:text-white text-sm text-center">{color.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Accessories */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl">
                <h3 className="text-2xl font-semibold text-salon-dark dark:text-white mb-6 flex items-center">
                  <Sparkles className="h-6 w-6 text-salon-pink mr-2" />
                  Accessories
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                  {accessories.map((accessory) => (
                    <Button
                      key={accessory.id}
                      variant={selectedAccessory === accessory.id ? "default" : "outline"}
                      onClick={() => setSelectedAccessory(accessory.id)}
                      className={`p-4 h-auto flex flex-col items-center space-y-2 hover-lift ${
                        selectedAccessory === accessory.id
                          ? 'bg-salon-pink text-salon-dark'
                          : 'border-salon-grey hover:bg-salon-grey/20 text-salon-dark dark:text-white dark:border-salon-pink/30'
                      }`}
                    >
                      <span className="text-2xl">{accessory.icon}</span>
                      <span className="font-medium text-xs text-center">{accessory.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Skin Tone Selection */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl">
                <SkinToneSelector
                  selectedTone={selectedSkinTone}
                  onToneChange={setSelectedSkinTone}
                />
              </div>
            </div>

            {/* Style Preview */}
            <div className="lg:col-span-1 animate-scale-in">
              <div className="sticky top-24">
                <Card className="p-6 text-center border-0 shadow-xl bg-white dark:bg-gray-900">
                  <div className="mb-6">
                    <div className="w-40 h-40 mx-auto bg-gradient-to-br from-salon-pink via-salon-grey to-salon-pink rounded-full flex items-center justify-center mb-4 relative overflow-hidden">
                      <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                        <Sparkles className="h-16 w-16 dark:text-white text-salon-pink" />
                      </div>
                    </div>
                    <Badge className="bg-salon-pink text-salon-dark dark:text-white px-4 py-2 text-lg font-semibold">
                      Your Custom Style
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-salon-dark dark:text-white mb-4">
                    {generateStyleName()}
                  </h3>
                  
                  <div className="space-y-3 mb-8 text-left">
                    {selectedMood && (
                      <div className="flex justify-between items-center py-2 border-b border-salon-grey/30 dark:border-salon-pink/30">
                        <span className="font-medium text-salon-dark dark:text-white">Mood:</span>
                        <span className="text-salon-dark/70 dark:text-white/70 text-sm flex items-center">
                          {selectedMood.emoji} {selectedMood.name}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-2 border-b border-salon-grey/30 dark:border-salon-pink/30">
                      <span className="font-medium text-salon-dark dark:text-white">Style:</span>
                      <span className="text-salon-dark/70 dark:text-white/70 text-sm">{braidStyles.find(s => s.id === selectedStyle)?.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-salon-grey/30 dark:border-salon-pink/30">
                      <span className="font-medium text-salon-dark dark:text-white">Length:</span>
                      <span className="text-salon-dark/70 dark:text-white/70 text-sm">{lengths.find(l => l.id === selectedLength)?.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-salon-grey/30 dark:border-salon-pink/30">
                      <span className="font-medium text-salon-dark dark:text-white">Color:</span>
                      <span className="text-salon-dark/70 dark:text-white/70 text-sm">{colors.find(c => c.id === selectedColor)?.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-salon-grey/30 dark:border-salon-pink/30">
                      <span className="font-medium text-salon-dark dark:text-white">Skin Tone:</span>
                      <span className="text-salon-dark/70 dark:text-white/70 text-sm capitalize">{selectedSkinTone}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-salon-dark dark:text-white">Accessories:</span>
                      <span className="text-salon-dark/70 dark:text-white/70 text-sm">{accessories.find(a => a.id === selectedAccessory)?.name}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      {/*<Button */}
                      {/*  variant="outline"*/}
                      {/*  size="sm"*/}
                      {/*  className="border-salon-grey hover:bg-salon-grey/20 text-salon-dark dark:text-white font-semibold hover-lift dark:border-salon-pink/30"*/}
                      {/*>*/}
                      {/*  <Save className="mr-1 h-4 w-4" />*/}
                      {/*  Save*/}
                      {/*</Button>*/}
                      {/*<Button */}
                      {/*  variant="outline"*/}
                      {/*  size="sm"*/}
                      {/*  className="border-salon-grey hover:bg-salon-grey/20 text-salon-dark dark:text-white font-semibold hover-lift dark:border-salon-pink/30"*/}
                      {/*>*/}
                      {/*  <RotateCcw className="mr-1 h-4 w-4" />*/}
                      {/*  Reset*/}
                      {/*</Button>*/}
                    </div>
                    <BookingButton
                      className="w-full bg-gradient-to-r from-salon-pink to-salon-grey hover:from-salon-pink/90 hover:to-salon-grey/90 text-salon-dark font-semibold"
                      source="braid-studio"
                    >
                      Book This Style - Begin Your Story
                    </BookingButton>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BraidStudio;
