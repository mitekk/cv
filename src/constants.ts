import type { Point, ShapeKey } from "./types";

export const TILE_SIZE = 20;
export const TILE_GAP = 2;

export const COLORS: Record<ShapeKey, string> = {
  I: "#00FFFF",
  O: "#FFFF00",
  T: "#800080",
  S: "#00FF00",
  Z: "#FF0000",
  J: "#0000FF",
  L: "#FFA500",
};

export const BASE_SHAPES: Record<ShapeKey, Point[]> = {
  // I I I I
  // . . . .
  // . . . .
  // . . . .
  I: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ],
  // O O . .
  // O O . .
  // . . . .
  // . . . .
  O: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
  // . T . .
  // T T T .
  // . . . .
  // . . . .
  T: [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
  // . S S .
  // S S . .
  // . . . .
  // . . . .
  S: [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
  // Z Z . .
  // . Z Z .
  // . . . .
  // . . . .
  Z: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
  // J . . .
  // J J J .
  // . . . .
  // . . . .
  J: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
  // . . L .
  // L L L .
  // . . . .
  // . . . .
  L: [
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
};
