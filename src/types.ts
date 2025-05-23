// --- Tile templates ---
export interface TemplatePlacement {
  shape: string;
  rotation: number;
  x: number;
  y: number;
}
export type Template = TemplatePlacement[];

// --- Tetrominoes ---
export type ShapeKey = "I" | "O" | "T" | "S" | "Z" | "J" | "L";
export interface Point {
  x: number;
  y: number;
}
export type Cell = { shape: ShapeKey; id: number } | null;
export type Grid = (Cell | null)[][];
