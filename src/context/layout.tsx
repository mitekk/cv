import { createContext } from "react";

type LayoutContextType = {
  dims: {
    rows: number;
    cols: number;
  };
  gridSize: {
    width: number;
    height: number;
  };
};

export const LayoutContext = createContext<LayoutContextType>({
  dims: { rows: 0, cols: 0 },
  gridSize: { width: 0, height: 0 },
});
