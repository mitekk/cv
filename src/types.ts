export type ShapeRotation = 0 | 1 | 2 | 3; // 0 = 0°, 1 = 90°, 2 = 180°, 3 = 270°

export type TemplateSize = 4 | 8 | 16 | 32;
export interface TemplatePlacement {
  shape: ShapeKey;
  rotation: ShapeRotation;
  anchor: Point;
}
export type Template = TemplatePlacement[];

export type ShapeKey = "I" | "O" | "T" | "S" | "Z" | "J" | "L";
export interface Point {
  x: number;
  y: number;
}
export type Cell = { shape: ShapeKey; id: number } | null;

export type Shape = {
  id: number;
  key: ShapeKey;
  points: Point[];
};

export type Grid = (Cell | null)[][];

export type Prompt = {
  lines: PromptLine[];
};

export type PromptLine = {
  text: string;
  removeOnComplete?: boolean;
};
