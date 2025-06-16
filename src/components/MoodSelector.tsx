
import { Card } from '@/components/ui/card';
import type { Mood } from '@/pages/MoodBooking';

interface MoodSelectorProps {
  moods: Mood[];
  onMoodSelect: (mood: Mood) => void;
}

const MoodSelector = ({ moods, onMoodSelect }: MoodSelectorProps) => {
  const categoryColors = {
    'relaxation': 'from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30',
    'glow-up': 'from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30',
    'energize': 'from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30'
  };

  return (
    <div className="animate-scale-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {moods.map((mood, index) => (
          <Card
            key={mood.id}
            className={`cursor-pointer hover-lift transition-all duration-300 hover:scale-105 bg-gradient-to-br ${categoryColors[mood.category]} border-0 shadow-lg hover:shadow-xl animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => onMoodSelect(mood)}
          >
            <div className="p-8 text-center">
              <div className="text-6xl mb-4 animate-bounce" style={{ animationDelay: `${index * 200}ms` }}>
                {mood.emoji}
              </div>
              <h3 className="text-xl font-bold text-salon-dark dark:text-white mb-2">
                {mood.name}
              </h3>
              <p className="text-salon-dark/70 dark:text-white/70 text-sm">
                {mood.description}
              </p>
              <div className="mt-4 inline-flex items-center text-salon-pink dark:text-salon-pink font-medium text-sm">
                Tap to explore services →
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Category Filter Pills */}
      <div className="flex justify-center mt-12 gap-4 flex-wrap">
        <div className="bg-white dark:bg-gray-900 rounded-full px-4 py-2 shadow-md">
          <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">💙 Relaxation</span>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-full px-4 py-2 shadow-md">
          <span className="text-pink-600 dark:text-pink-400 font-medium text-sm">✨ Glow-Up</span>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-full px-4 py-2 shadow-md">
          <span className="text-orange-600 dark:text-orange-400 font-medium text-sm">⚡ Energize</span>
        </div>
      </div>
    </div>
  );
};

export default MoodSelector;
