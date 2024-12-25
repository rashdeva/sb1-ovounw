import React, { useState, useCallback } from 'react';
import { GameBoard } from './components/GameBoard';
import { GameStats } from './components/GameStats';
import { Tile } from './components/Tile';
import { GameState } from './types/game';
import {
  GRID_SIZE,
  createInitialState,
  findLowestEmptyPosition,
  processMerges,
  getNextValue,
  updateAvailableValues,
  createTile,
} from './utils/gameLogic';

function App() {
  const [gameState, setGameState] = useState<GameState>(createInitialState());

  const handleDrop = useCallback((column: number) => {
    setGameState(current => {
      const row = findLowestEmptyPosition(current.grid, column);
      if (row === -1) return { ...current, gameOver: true };

      const newGrid = current.grid.map(row => [...row]);
      const newTile = createTile(column, row, current.currentTile);
      newGrid[row][column] = newTile;

      const { newGrid: mergedGrid, mergedValue } = processMerges(newGrid, row, column);
      
      let newAvailableValues = current.availableValues;
      if (mergedValue) {
        newAvailableValues = updateAvailableValues(current.availableValues, mergedValue);
      }

      const nextNextTile = getNextValue(newAvailableValues);

      return {
        grid: mergedGrid,
        score: current.score + (mergedValue || 0),
        gameOver: false,
        currentTile: current.nextTile,
        nextTile: nextNextTile,
        availableValues: newAvailableValues,
        selectedColumn: null,
      };
    });
  }, []);

  const handleReset = useCallback(() => {
    setGameState(createInitialState());
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center p-4">
        <GameStats
          score={gameState.score}
          gameOver={gameState.gameOver}
          onReset={handleReset}
        />
        <div className="flex gap-8 items-center mb-4">
          <div className="text-center">
            <h2 className="text-white font-bold mb-2">Current</h2>
            <Tile tile={{ id: 'current', value: gameState.currentTile, x: 0, y: 0 }} preview />
          </div>
          <div className="text-center">
            <h2 className="text-white font-bold mb-2">Next</h2>
            <Tile tile={{ id: 'next', value: gameState.nextTile, x: 0, y: 0 }} preview />
          </div>
        </div>
        <GameBoard 
          grid={gameState.grid}
          currentTile={gameState.currentTile}
          onColumnSelect={handleDrop}
        />
        <div className="text-white text-center mt-4">
          <p>Click a column to drop the tile</p>
          <p>Match same numbers to merge them</p>
        </div>
      </div>
    </div>
  );
}

export default App;