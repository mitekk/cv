import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { LayoutContext, PageContext } from "../../context";
import {
  generatePath,
  generateShapes,
  getPathData,
} from "../../services/grid/path";
import { TiledShape } from "../shape/shape";
import { RoadTripTile } from "../tile";
import { RoadPath } from "../roadPath";
import { TILE_GAP, TILE_SIZE } from "../../constants";
import type { Point, Shape, ShapeKeyPath } from "../../types";
import "./roadTrip.grid.css";

interface RoadTripProps {
  onAnimationStart?: () => void;
  onAnimationFinish?: () => void;
  removeTiles?: boolean;
}

export const RoadTripGrid: React.FC<RoadTripProps> = ({
  onAnimationFinish = () => {},
  removeTiles = false,
}) => {
  const animationEndTimeout = useRef<number | null>(null);
  const { dims, gridSize } = useContext(LayoutContext);
  const { excitementLevel } = useContext(PageContext);
  const [animated, setAnimated] = useState(false);
  const [gridAnimationFinished, setGridAnimationFinished] = useState(false);

  const pathPoints = useMemo<Point[]>(() => {
    if (dims.cols === 0 || dims.rows === 0) return [];
    return generatePath({
      rows: dims.rows,
      cols: dims.cols,
    });
  }, [dims.cols, dims.rows]);

  const shapes = useMemo<Shape<ShapeKeyPath>[]>(() => {
    if (dims.cols === 0 || dims.rows === 0) return [];
    return generateShapes(
      {
        rows: dims.rows,
        cols: dims.cols,
      },
      pathPoints
    );
  }, [dims.rows, dims.cols, pathPoints]);

  const pathData = useMemo<string>(() => {
    return getPathData(pathPoints);
  }, [pathPoints]);

  useEffect(() => {
    setAnimated(false);
    setGridAnimationFinished(false);
    const timeout = setTimeout(() => {
      setAnimated(true);
    }, 50);
    return () => clearTimeout(timeout);
  }, [shapes]);

  useEffect(() => {
    if (removeTiles) {
      setAnimated(false);
      const timeout = setTimeout(() => setAnimated(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [removeTiles]);

  const handleGridAnimationEnd = () => {
    if (animationEndTimeout.current) {
      clearTimeout(animationEndTimeout.current);
    }
    animationEndTimeout.current = setTimeout(() => {
      setGridAnimationFinished(true);
    }, 150);
  };

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return shapes.length ? (
    <div className="relative filter sepia brightness-150">
      <div
        style={{
          position: "relative",
          width: gridSize.width,
          height: gridSize.height,
          overflow: "hidden",
        }}
      >
        {shapes.map((shape, idx) => {
          const finalTop = shape.points[0].x * (TILE_SIZE + TILE_GAP);
          const finalLeft = shape.points[0].y * (TILE_SIZE + TILE_GAP);

          let top;
          if (!removeTiles) {
            top = animated ? finalTop : -dims.cols * TILE_SIZE * 2;
          } else {
            top = animated ? finalTop + dims.cols * TILE_SIZE * 2 : finalTop;
          }

          const centerX = finalLeft + TILE_SIZE;
          const centerY = finalTop + TILE_SIZE;
          const dist = Math.hypot(mouse.x - centerX, mouse.y - centerY);
          const isHovered =
            dist < (excitementLevel === "high" ? TILE_SIZE * 4 : TILE_SIZE * 0);
          const hoverScale = excitementLevel === "high" ? 0.95 : 1.0;

          return (
            <TiledShape
              key={`${shape.id}`}
              shape={shape}
              top={top}
              left={finalLeft}
              styles={{
                transition: `top 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) ${
                  (shapes.length - idx) * 0.001
                }s, transform 0.5s cubic-bezier(.4,0,.2,1)`,
                transform: isHovered ? `scale(${hoverScale})` : "scale(1)",
              }}
              onAnimationEnd={handleGridAnimationEnd}
            >
              {shape.points.map(({ x, y }) => (
                <RoadTripTile
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
      <svg
        width={gridSize.width}
        height={gridSize.height}
        className="absolute top-0 left-0 z-[2] pointer-events-none"
      >
        {!removeTiles && (
          <RoadPath
            pathData={pathData}
            startAnimation={gridAnimationFinished}
            onAnimationFinish={() => onAnimationFinish()}
          />
        )}
      </svg>
    </div>
  ) : null;
};
