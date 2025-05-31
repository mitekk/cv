import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { LayoutContext } from "../../context/layout";
import { TILE_GAP, TILE_SIZE } from "../../constants";
import { TiledShape } from "../shape/shape";
import type { Shape, ShapeKeyTetrominoes } from "../../types";
import { PageContext } from "../../context";
import { generateTiledGrid } from "../../services/grid";
import { TetrominoTile } from "../tile";
import "./tetrominoes.grid.css";

interface TetrominoesGridProps {
  onAnimationStart?: () => void;
  onAnimationFinish?: () => void;
  removeTiles?: boolean;
}

export const TetrominoesGrid: React.FC<TetrominoesGridProps> = ({
  onAnimationStart,
  onAnimationFinish,
  removeTiles = false,
}) => {
  const [animated, setAnimated] = useState(false);
  const { dims, gridSize } = useContext(LayoutContext);
  const { excitementLevel } = useContext(PageContext);

  const onDropStartRef = useRef(onAnimationStart);
  useEffect(() => {
    onDropStartRef.current = onAnimationStart;
  }, [onAnimationStart]);

  const shapes = useMemo<Shape<ShapeKeyTetrominoes>[]>(() => {
    if (dims.cols === 0 || dims.rows === 0) return [];
    return generateTiledGrid(dims.rows, dims.cols);
  }, [dims.rows, dims.cols]);

  useEffect(() => {
    setAnimated(false);
    const timeout = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(timeout);
  }, [shapes]);

  useEffect(() => {
    if (removeTiles) {
      setAnimated(false);
      const timeout = setTimeout(() => setAnimated(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [removeTiles]);

  const animationEndTimeout = useRef<number | null>(null);

  const handleAnimationEnd = () => {
    if (animationEndTimeout.current) {
      clearTimeout(animationEndTimeout.current);
    }
    animationEndTimeout.current = setTimeout(() => {
      if (onAnimationFinish) {
        onAnimationFinish();
      }
    }, 150);
  };

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return shapes.length ? (
    <div
      className="relative overflow-hidden"
      style={{
        width: gridSize.width,
        height: gridSize.height,
      }}
    >
      {shapes
        .sort((a, b) => a.points[0].x - b.points[0].x)
        .map((shape, idx) => {
          const finalTop = shape.points[0].x * (TILE_SIZE + TILE_GAP);
          const finalLeft = shape.points[0].y * (TILE_SIZE + TILE_GAP);

          let top;
          if (!removeTiles) {
            top = animated ? finalTop : -window.innerHeight * 2;
          } else {
            top = animated ? finalTop + window.innerHeight * 2 : finalTop;
          }

          const centerX = finalLeft + TILE_SIZE;
          const centerY = finalTop + TILE_SIZE;
          const dist = Math.hypot(mouse.x - centerX, mouse.y - centerY);
          const isHovered =
            dist < (excitementLevel === "high" ? TILE_SIZE * 4 : TILE_SIZE * 0);
          const hoverScale = excitementLevel === "high" ? 1.2 : 1.0;

          return (
            <TiledShape
              key={`${shape.id}`}
              shape={shape}
              top={top}
              left={finalLeft}
              className={`shape-group${isHovered ? " hovered" : ""}`}
              styles={{
                transition: `top 0.75s cubic-bezier(0.25, 0.1, 0.25, 1) ${
                  (shapes.length - idx) * 0.01
                }s, transform 0.15s cubic-bezier(.4,0,.2,1)`,
                transform: isHovered ? `scale(${hoverScale})` : "scale(1)",
                filter: isHovered ? "grayscale(0.1) saturate(1.2)" : "",
              }}
              onAnimationEnd={handleAnimationEnd}
            >
              {shape.points.map(({ x, y }) => (
                <TetrominoTile
                  key={`${x}-${y}-${shape.key}`}
                  shape={shape.key}
                  style={{
                    left: (y - shape.points[0].y) * (TILE_SIZE + TILE_GAP),
                    top: (x - shape.points[0].x) * (TILE_SIZE + TILE_GAP),
                  }}
                />
              ))}
            </TiledShape>
          );
        })}
    </div>
  ) : null;
};
