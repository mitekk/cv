import { createContext } from "react";

export type Dims = {
  rows: number;
  cols: number;
};
export type GridSize = {
  width: number;
  height: number;
};

export type LayoutContextType = {
  dims: Dims;
  gridSize?: GridSize;
  tileSize: number;
};

export const LayoutContext = createContext<LayoutContextType>({
  dims: { rows: 0, cols: 0 },
  tileSize: 0,
});
