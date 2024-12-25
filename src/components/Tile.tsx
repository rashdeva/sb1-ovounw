import React from 'react';
import { Tile as TileType } from '../types/game';

const colorMap: Record<number, string> = {
  2: 'bg-blue-200 text-blue-900',
  4: 'bg-blue-300 text-blue-900',
  8: 'bg-blue-400 text-white',
  16: 'bg-blue-500 text-white',
  32: 'bg-blue-600 text-white',
  64: 'bg-blue-700 text-white',
  128: 'bg-purple-500 text-white',
  256: 'bg-purple-600 text-white',
  512: 'bg-purple-700 text-white',
  1024: 'bg-pink-600 text-white',
  2048: 'bg-pink-700 text-white',
};

interface TileProps {
  tile: TileType;
  preview?: boolean;
  isPreview?: boolean;
}

export function Tile({ tile, preview = false, isPreview = false }: TileProps) {
  const { colorClass, textClass } = React.useMemo(() => {
    const colors = colorMap[tile.value] || 'bg-gray-700 text-white';
    const [bgColor, textColor] = colors.split(' ');
    return { colorClass: bgColor, textClass: textColor };
  }, [tile.value]);
  
  return (
    <div
      className={`
        ${preview ? '' : 'absolute'} 
        w-14 h-14 
        rounded-lg
        ${colorClass} 
        ${textClass}
        ${isPreview ? 'opacity-50' : ''}
        font-bold text-lg
        flex items-center justify-center
        transition-all duration-200
        transform
        ${tile.merging ? 'scale-110' : 'scale-100'}
      `}
      style={
        preview ? undefined : {
          top: `${tile.y * 4}rem`,
          left: `${tile.x * 4}rem`,
        }
      }
      data-preview={isPreview ? 'true' : undefined}
    >
      {tile.value}
    </div>
  );
}