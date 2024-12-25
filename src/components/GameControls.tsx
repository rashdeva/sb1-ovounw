import React from 'react';
import { ArrowDown } from 'lucide-react';

interface GameControlsProps {
  onDrop: (column: number) => void;
  disabled: boolean;
}

export function GameControls({ onDrop, disabled }: GameControlsProps) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array(6).fill(null).map((_, index) => (
        <button
          key={index}
          onClick={() => onDrop(index)}
          disabled={disabled}
          className={`
            w-14 h-14 rounded-lg flex items-center justify-center
            ${disabled
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}
            transition-colors duration-200
          `}
        >
          <ArrowDown className="w-6 h-6 text-white" />
        </button>
      ))}
    </div>
  );
}