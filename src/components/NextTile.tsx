import React from 'react';
import { Tile } from './Tile';

interface NextTileProps {
  value: number;
}

export function NextTile({ value }: NextTileProps) {
  return (
    <div className="flex flex-col items-center gap-2 mb-4">
      <h2 className="text-white font-bold">Next Tile</h2>
      <div className="relative w-14 h-14">
        <Tile tile={{ id: 'next', value, x: 0, y: 0 }} preview />
      </div>
    </div>
  );
}