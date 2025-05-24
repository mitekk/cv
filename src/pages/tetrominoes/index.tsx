import { generateTiledGrid } from "../../services/grid/tiling";
import { TILE_GAP, TILE_SIZE } from "../../constants";
import { useEffect, useState } from "react";
import type { Shape } from "../../types";
import Tile from "../../components/tile/tile";

export const TetrominoesGrid: React.FC = () => {
  const [dims, setDims] = useState({ rows: 0, cols: 0 });
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [animated, setAnimated] = useState(false);

  const handleResize = () => {
    const cols = Math.floor(
      (window.innerWidth + TILE_GAP) / (TILE_SIZE + TILE_GAP)
    );
    const rows = Math.floor(
      (window.innerHeight + TILE_GAP) / (TILE_SIZE + TILE_GAP)
    );
    setDims({
      cols: Math.floor(cols / 4) * 4,
      rows: Math.floor(rows / 4) * 4,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const { cols, rows } = dims;
    if (cols === 0 || rows === 0) return;
    setTimeout(() => {
      const gridShapes = generateTiledGrid(dims.rows, dims.cols);
      setShapes(gridShapes);
    }, 0);
  }, [dims]);

  useEffect(() => {
    setAnimated(false);
    const timeout = setTimeout(() => setAnimated(true), 50); // delay to allow initial render
    return () => clearTimeout(timeout);
  }, [shapes]);

  const width = dims.cols * TILE_SIZE + (dims.cols - 1) * TILE_GAP;
  const height = dims.rows * TILE_SIZE + (dims.rows - 1) * TILE_GAP;

  return shapes.length ? (
    <div
      style={{
        position: "relative",
        width,
        height,
        background: "lightgray",
        margin: "0 auto",
      }}
    >
      {shapes
        .sort((a, b) => a.points[0].x - b.points[0].x)
        .map((shape, idx) => {
          const finalTop = shape.points[0].x * (TILE_SIZE + TILE_GAP);
          const finalLeft = shape.points[0].y * (TILE_SIZE + TILE_GAP);
          const startTop = -TILE_SIZE * 20;

          return (
            <div
              key={shape.id}
              style={{
                position: "absolute",
                left: finalLeft,
                top: animated ? finalTop : startTop,
                transition: `top 0.75s cubic-bezier(0.25, 0.1, 0.25, 1) ${
                  (shapes.length - 1 - idx) * 0.075
                }s`,
              }}
            >
              {shape.points.map(({ x, y }) => (
                <Tile
                  key={`${x}-${y}-${shape.key}`}
                  shape={shape.key}
                  style={{
                    left: (y - shape.points[0].y) * (TILE_SIZE + TILE_GAP),
                    top: (x - shape.points[0].x) * (TILE_SIZE + TILE_GAP),
                  }}
                />
              ))}
            </div>
          );
        })}
    </div>
  ) : null;
};
