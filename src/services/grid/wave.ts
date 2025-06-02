import type { Shape, ShapeKeyWave } from "../../types";

interface WaveShapesProps {
  rows: number;
  cols: number;
}

export const generateWavesShapes = ({ rows, cols }: WaveShapesProps) => {
  const shapes: Shape<ShapeKeyWave>[] = [];
  let id = 0;
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      shapes.push({
        id: ++id,
        key: "wave",
        points: [{ x, y }],
      });
    }
  }
  return shapes;
};
