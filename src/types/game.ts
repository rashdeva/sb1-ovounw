export interface Tile {
  id: string;
  value: number;
  x: number;
  y: number;
  merging?: boolean;
}

export type Grid = (Tile | null)[][];

export interface GameState {
  grid: Grid;
  score: number;
  gameOver: boolean;
  currentTile: number;
  availableValues: number[];
  nextTile: number;
  selectedColumn: number | null;
}

export type Direction = 'left' | 'right';