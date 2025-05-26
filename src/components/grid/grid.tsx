import { generateTiledGrid } from "../../services/grid/tiling";
import { TILE_GAP, TILE_SIZE } from "../../constants";
import { useCallback, useEffect, useRef, useState } from "react";
import { Tile } from "../../components/tile/tile";
import type { Shape } from "../../types";
import "./grid.css";

interface TetrominoesGridProps {
  onStart?: () => void;
  onFinish?: (width: number, height: number) => void;
}

export const TetrominoesGrid: React.FC<TetrominoesGridProps> = ({
  onStart,
  onFinish,
}) => {
  const [dims, setDims] = useState({ rows: 0, cols: 0 });
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [animated, setAnimated] = useState(false);

  const onDropStartRef = useRef(onStart);
  useEffect(() => {
    onDropStartRef.current = onStart;
  }, [onStart]);

  const handleResize = useCallback(() => {
    if (onDropStartRef.current) onDropStartRef.current();
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
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    const { cols, rows } = dims;
    if (cols === 0 || rows === 0) return;
    const timeout = setTimeout(() => {
      const gridShapes = generateTiledGrid(dims.rows, dims.cols);
      setShapes(gridShapes);
    }, 0);
    return () => clearTimeout(timeout);
  }, [dims]);

  useEffect(() => {
    setAnimated(false);
    const timeout = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(timeout);
  }, [shapes]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

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
        borderRadius: 3,
      }}
    >
      {shapes
        .sort((a, b) => a.points[0].x - b.points[0].x)
        .map((shape, idx) => {
          const finalTop = shape.points[0].x * (TILE_SIZE + TILE_GAP);
          const finalLeft = shape.points[0].y * (TILE_SIZE + TILE_GAP);
          const startTop = -TILE_SIZE * 20;

          const centerX = finalLeft + TILE_SIZE;
          const centerY = finalTop + TILE_SIZE;
          const dist = Math.hypot(mouse.x - centerX, mouse.y - centerY);
          const isHovered = dist < 250;

          return (
            <div
              key={shape.id}
              className={`shape-group${isHovered ? " hovered" : ""}`}
              style={{
                position: "absolute",
                left: finalLeft,
                top: animated ? finalTop : startTop,
                transition: `top 0.75s cubic-bezier(0.25, 0.1, 0.25, 1) ${
                  (shapes.length - 1 - idx) * 0.005
                }s, transform 0.15s cubic-bezier(.4,0,.2,1)`,
              }}
              onTransitionEnd={(e) => {
                if (
                  e.propertyName === "top" &&
                  shape.points.some(({ x, y }) => x < 15 && y < 15)
                ) {
                  setTimeout(() => onFinish && onFinish(width, height), 1000);
                }
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
