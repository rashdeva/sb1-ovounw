import React from 'react';
import { Trophy } from 'lucide-react';

interface GameStatsProps {
  score: number;
  gameOver: boolean;
  onReset: () => void;
}

export function GameStats({ score, gameOver, onReset }: GameStatsProps) {
  return (
    <div className="flex flex-col items-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <span className="text-2xl font-bold text-white">Score: {score}</span>
      </div>
      
      {gameOver && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-xl font-bold text-red-500">Game Over!</p>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg
                     hover:bg-blue-600 active:bg-blue-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}