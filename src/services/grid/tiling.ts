import { templates } from "../../assets/templates";
import { BASE_SHAPES } from "../../constants";
import type {
  Grid,
  Cell,
  TemplatePlacement,
  ShapeKey,
  ShapeRotation,
  Point,
  TemplateSize,
  Shape,
} from "../../types";

const createEmptyGrid = (rows: number, cols: number): Grid =>
  Array.from({ length: rows }, () => Array<Cell | null>(cols).fill(null));

const findNextEmpty = (grid: Grid): Point | null => {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (grid[x][y] === null) return { x, y };
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
  { x, y }: Point,
  rotation: ShapeRotation
): { x: number; y: number } => {
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
) =>
  placement.map(({ shape, rotation, anchor }) => {
    const shapeId = nextShapeId++;

    const baseOffsets = BASE_SHAPES[shape as ShapeKey];
    const rotatedOffsets = baseOffsets.map((pt) => rotatePoint(pt, rotation));
    const minX = Math.min(...rotatedOffsets.map((pt) => pt.x));
    const minY = Math.min(...rotatedOffsets.map((pt) => pt.y));

    const shapePoints: Point[] = [];
    rotatedOffsets.forEach((pt) => {
      const gx = rowPosition + anchor.x + (pt.x - minX);
      const gy = colPosition + anchor.y + (pt.y - minY);

      if (gx >= 0 && gx < grid.length && gy >= 0 && gy < grid[0].length) {
        shapePoints.push({ x: gx, y: gy });
        grid[gx][gy] = {
          id: shapeId,
          shape: shape,
        };
      }
    });

    return {
      id: shapeId,
      key: shape,
      points: shapePoints,
    };
  });

const lastIndexBySize: Partial<Record<TemplateSize, number>> = {};

const chooseTemplate = (size: TemplateSize): TemplatePlacement[] => {
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

export function generateTiledGrid(rows: number, cols: number): Shape[] {
  const grid = createEmptyGrid(rows, cols);
  const sizes: Array<TemplateSize> = [32, 16, 8, 4];
  const gridShapes: Shape[] = [];

  let next: Point | null;
  while ((next = findNextEmpty(grid))) {
    const { x: rowPosition, y: colPosition } = next;
    let placed = false;
    for (const size of sizes) {
      if (canPlaceChunk(grid, rowPosition, colPosition, size)) {
        const tpl = chooseTemplate(size);
        gridShapes.push(...applyTemplate(grid, rowPosition, colPosition, tpl));
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

  return gridShapes;
}
