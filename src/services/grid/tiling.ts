import { templates } from "../../assets/templates";
import { BASE_SHAPES } from "../../constants";
import type { Grid, Cell, TemplatePlacement, ShapeKey } from "../../types";

const createEmptyGrid = (rows: number, cols: number): Grid =>
  Array.from({ length: rows }, () => Array<Cell | null>(cols).fill(null));

const findNextEmpty = (grid: Grid): [row: number, col: number] | null => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === null) return [i, j];
    }
  }
  return null;
};

const canPlaceChunk = (
  grid: Grid,
  rowPosition: number,
  colPosition: number,
  size: number
): boolean => {
  const rows = grid.length;
  const cols = grid[0].length;
  if (rowPosition + size > rows || colPosition + size > cols) return false;
  for (let row = rowPosition; row < rowPosition + size; row++) {
    for (let col = colPosition; col < colPosition + size; col++) {
      if (grid[row][col] !== null) return false;
    }
  }
  return true;
};

const rotatePoint = (
  { x, y }: { x: number; y: number },
  rotation: number
): { x: number; y: number } => {
  // rotation: 0 = 0°, 1 = 90°, 2 = 180°, 3 = 270°
  switch (rotation % 4) {
    case 0:
      return { x, y };
    case 1:
      return { x: y, y: -x };
    case 2:
      return { x: -x, y: -y };
    case 3:
      return { x: -y, y: x };
    default:
      return { x, y };
  }
};

let nextShapeId = 1;

const applyTemplate = (
  grid: Grid,
  rowPosition: number,
  colPosition: number,
  placement: TemplatePlacement[]
) => {
  placement.forEach(({ shape, rotation, x, y }) => {
    const shapeId = nextShapeId++;
    const baseOffsets = BASE_SHAPES[shape as ShapeKey];
    const rotatedOffsets = baseOffsets.map((pt) => rotatePoint(pt, rotation));
    const minX = Math.min(...rotatedOffsets.map((pt) => pt.x));
    const minY = Math.min(...rotatedOffsets.map((pt) => pt.y));

    rotatedOffsets.forEach((pt) => {
      const gx = rowPosition + x + (pt.x - minX);
      const gy = colPosition + y + (pt.y - minY);

      if (gx >= 0 && gx < grid.length && gy >= 0 && gy < grid[0].length) {
        grid[gx][gy] = {
          id: shapeId,
          shape: shape as ShapeKey,
        };
      }
    });
  });
};

const lastIndexBySize: Partial<Record<number, number>> = {};

const chooseTemplate = (size: 4 | 8 | 16 | 32): TemplatePlacement[] => {
  const arr = templates[size];
  const len = arr.length;
  let idx: number;
  const prev = lastIndexBySize[size];
  do {
    idx = Math.floor(Math.random() * len);
  } while (len > 1 && idx === prev);
  lastIndexBySize[size] = idx;
  return arr[idx];
};

export function generateTiledGrid(rows: number, cols: number): Grid {
  const grid = createEmptyGrid(rows, cols);
  const sizes: Array<4 | 8 | 16 | 32> = [32, 16, 8, 4];

  let next: [number, number] | null;
  while ((next = findNextEmpty(grid))) {
    const [rowPosition, colPosition] = next;

    let placed = false;
    for (const size of sizes) {
      if (canPlaceChunk(grid, rowPosition, colPosition, size)) {
        const tpl = chooseTemplate(size);
        applyTemplate(grid, rowPosition, colPosition, tpl);
        placed = true;
        break;
      }
    }
    if (!placed) {
      throw new Error(
        `Unable to place chunk at (${rowPosition},${colPosition})`
      );
    }
  }

  return grid;
}
