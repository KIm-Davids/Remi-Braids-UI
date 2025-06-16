
import React from 'react';
import { Button } from '@/components/ui/button';

interface SkinToneSelectorProps {
  selectedTone: string;
  onToneChange: (tone: string) => void;
}

const SkinToneSelector: React.FC<SkinToneSelectorProps> = ({ selectedTone, onToneChange }) => {
  const skinTones = [
    { id: 'light', name: 'Light', color: '#FDBCB4' },
    { id: 'medium', name: 'Medium', color: '#E1956F' },
    { id: 'tan', name: 'Tan', color: '#CB9E6F' },
    { id: 'dark', name: 'Dark', color: '#8D5524' },
    { id: 'deep', name: 'Deep', color: '#4B2C20' },
  ];

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold dark:text-white text-salon-dark">Skin Tone</h4>
      <div className="grid grid-cols-5 gap-3">
        {skinTones.map((tone) => (
          <Button
            key={tone.id}
            variant="outline"
            onClick={() => onToneChange(tone.id)}
            className={`p-4 h-auto flex flex-col items-center space-y-2 hover-lift border-2 ${
              selectedTone === tone.id
                ? 'border-salon-pink dark:bg-salon-pink bg-salon-pink/10'
                : 'border-salon-grey hover:bg-salon-grey/20'
            }`}
          >
            <div
              className="w-8 h-8 rounded-full border-2 border-white shadow-md"
              style={{ backgroundColor: tone.color }}
            ></div>
            <span className="font-medium text-salon-dark text-xs">{tone.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SkinToneSelector;
