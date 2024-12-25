import { Grid, Tile, GameState } from '../types/game';

export const GRID_SIZE = 6;
export const INITIAL_VALUES = [2, 4, 8, 16, 32, 64];

export function createEmptyGrid(): Grid {
  return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function createTile(x: number, y: number, value: number): Tile {
  return {
    id: generateId(),
    value,
    x,
    y,
  };
}

export function getNextValue(availableValues: number[]): number {
  const randomIndex = Math.floor(Math.random() * availableValues.length);
  return availableValues[randomIndex];
}

export function updateAvailableValues(currentValues: number[], highestMerged: number): number[] {
  if (highestMerged <= currentValues[currentValues.length - 1]) {
    return currentValues;
  }
  return [...currentValues.slice(1), highestMerged];
}

export function canMergeTiles(tile1: Tile, tile2: Tile): boolean {
  return tile1.value === tile2.value && !tile1.merging && !tile2.merging;
}

export function findLowestEmptyPosition(grid: Grid, column: number): number {
  for (let row = GRID_SIZE - 1; row >= 0; row--) {
    if (!grid[row][column]) {
      return row;
    }
  }
  return -1;
}

export function isGameOver(grid: Grid): boolean {
  return grid[0].every(cell => cell !== null);
}

export function createInitialState(): GameState {
  const availableValues = [...INITIAL_VALUES];
  const currentTile = getNextValue(availableValues);
  const nextTile = getNextValue(availableValues);
  
  return {
    grid: createEmptyGrid(),
    score: 0,
    gameOver: false,
    currentTile,
    availableValues,
    nextTile,
    selectedColumn: null,
  };
}

export function checkAdjacentMerges(grid: Grid, row: number, column: number): {
  tiles: Tile[];
  totalValue: number;
} {
  const mergingTiles: Tile[] = [];
  const currentTile = grid[row][column];
  if (!currentTile) return { tiles: [], totalValue: 0 };

  // Check bottom
  if (row < GRID_SIZE - 1) {
    const bottomTile = grid[row + 1][column];
    if (bottomTile && canMergeTiles(currentTile, bottomTile)) {
      mergingTiles.push(bottomTile);
    }
  }

  // Check left
  if (column > 0) {
    const leftTile = grid[row][column - 1];
    if (leftTile && canMergeTiles(currentTile, leftTile)) {
      mergingTiles.push(leftTile);
    }
  }

  // Check right
  if (column < GRID_SIZE - 1) {
    const rightTile = grid[row][column + 1];
    if (rightTile && canMergeTiles(currentTile, rightTile)) {
      mergingTiles.push(rightTile);
    }
  }

  if (mergingTiles.length === 0) return { tiles: [], totalValue: 0 };

  const totalValue = mergingTiles.reduce((sum, tile) => sum + tile.value, currentTile.value);
  return { tiles: [...mergingTiles, currentTile], totalValue };
}

export function processMerges(grid: Grid, row: number, column: number): {
  newGrid: Grid;
  mergedValue: number | null;
} {
  const newGrid = grid.map(row => [...row]);
  const { tiles, totalValue } = checkAdjacentMerges(newGrid, row, column);

  if (tiles.length === 0) return { newGrid, mergedValue: null };

  // Remove all merging tiles
  tiles.forEach(tile => {
    newGrid[tile.y][tile.x] = null;
  });

  // Create new merged tile at the lowest position
  const lowestY = Math.max(...tiles.map(t => t.y));
  const mergedTile = createTile(column, lowestY, totalValue);
  newGrid[lowestY][column] = mergedTile;

  return { newGrid, mergedValue: totalValue };
}