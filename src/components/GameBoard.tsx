import React, { useState } from 'react';
import { Grid } from '../types/game';
import { Tile } from './Tile';
import { GRID_SIZE, findLowestEmptyPosition } from '../utils/gameLogic';

interface GameBoardProps {
  grid: Grid;
  currentTile: number;
  onColumnSelect: (column: number) => void;
}

export function GameBoard({ grid, currentTile, onColumnSelect }: GameBoardProps) {
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  const getPreviewPosition = (column: number) => {
    if (hoveredColumn !== column) return null;
    const row = findLowestEmptyPosition(grid, column);
    if (row === -1) return null;
    return { row, column };
  };

  return (
    <div className="relative bg-gray-800 p-2 rounded-lg">
      {/* Grid background */}
      <div className="grid grid-cols-6 gap-2">
        {Array(GRID_SIZE * GRID_SIZE).fill(null).map((_, index) => {
          const column = index % GRID_SIZE;
          return (
            <div
              key={`cell-${index}`}
              className="w-14 h-14 rounded-lg cursor-pointer bg-gray-700/50 hover:bg-gray-600/50 transition-colors duration-200"
              onClick={() => onColumnSelect(column)}
              onMouseEnter={() => setHoveredColumn(column)}
              onMouseLeave={() => setHoveredColumn(null)}
            />
          );
        })}
      </div>

      {/* Preview tile */}
      {hoveredColumn !== null && (
        <>
          {Array(GRID_SIZE).map((_, column) => {
            const position = getPreviewPosition(column);
            if (!position) return null;
            
            return (
              <div
                key={`preview-${column}`}
                className="absolute transition-all duration-200"
                style={{
                  top: `${position.row * 4 + 0.5}rem`,
                  left: `${position.column * 4 + 0.5}rem`,
                }}
              >
                <Tile
                  tile={{ id: 'preview', value: currentTile, x: position.column, y: position.row }}
                  preview
                  isPreview
                />
              </div>
            );
          })}
        </>
      )}

      {/* Active tiles */}
      <div className="absolute top-2 left-2">
        {grid.flatMap((row, y) =>
          row.map((tile, x) =>
            tile ? (
              <Tile 
                key={`tile-${tile.id}-${y}-${x}`} 
                tile={tile}
              />
            ) : null
          )
        )}
      </div>
    </div>
  );
}