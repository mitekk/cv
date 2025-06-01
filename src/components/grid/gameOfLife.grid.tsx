import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { LayoutContext } from "../../context/layout";
import { TILE_GAP, TILE_SIZE } from "../../constants";
import { TiledShape } from "../shape/shape";
import type { Grid, Shape, ShapeKeyGameOfLife } from "../../types";
import { generateGameOfLifeGrid } from "../../services/grid";
import { GameOfLifeTile } from "../tile";
import {
  createNextGenerationGrid,
  generateGameOfLifeShapes,
} from "../../services/grid/gameOfLife";

interface GameOfLifeGridProps {
  onAnimationStart?: () => void;
  onAnimationFinish?: () => void;
  removeTiles?: boolean;
}

export const GameOfLifeGrid: React.FC<GameOfLifeGridProps> = ({
  onAnimationFinish,
}) => {
  const { dims, gridSize } = useContext(LayoutContext);
  const [grid, setGrid] = useState<Grid<ShapeKeyGameOfLife>>(() =>
    generateGameOfLifeGrid({ rows: dims.rows, cols: dims.cols })
  );

  useEffect(() => {
    if (dims.cols === 0 || dims.rows === 0) return;

    setGrid(
      generateGameOfLifeGrid({
        rows: dims.rows,
        cols: dims.cols,
      })
    );
  }, [dims.rows, dims.cols]);

  useEffect(() => {
    if (!grid) return;

    const interval = setInterval(() => {
      setGrid((g) => createNextGenerationGrid(g));
    }, 1000);

    return () => clearInterval(interval);
  }, [grid]);

  const shapes = useMemo<Shape<ShapeKeyGameOfLife>[]>(() => {
    return generateGameOfLifeShapes(grid);
  }, [grid]);

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

  return shapes.length ? (
    <div
      className="relative overflow-hidden"
      style={{
        width: gridSize.width,
        height: gridSize.height,
      }}
    >
      {shapes.map((shape, idx) => {
        const finalTop = shape.points[0].x * (TILE_SIZE + TILE_GAP);
        const finalLeft = shape.points[0].y * (TILE_SIZE + TILE_GAP);

        return (
          <TiledShape
            key={`${shape.id}-${idx}`}
            shape={shape}
            top={finalTop}
            left={finalLeft}
            className={`shape-group`}
            onAnimationEnd={handleAnimationEnd}
          >
            {shape.points.map(({ x, y }) => (
              <GameOfLifeTile
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
