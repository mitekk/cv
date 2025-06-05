import { useContext, useLayoutEffect, useMemo } from "react";
import { LayoutContext } from "../../context/layout";
import { TiledShape } from "../shape/shape";
import { WaveTile } from "../tile";
import { generateWavesShapes } from "../../services/grid/wave";
import { TILE_GAP, TILE_SIZE } from "../../constants";
import type { Shape, ShapeKeyWave } from "../../types";

interface WavesProps {
  onAnimationFinish?: () => void;
}

export const WavesGrid: React.FC<WavesProps> = ({
  onAnimationFinish = () => {},
}) => {
  const { dims, gridSize } = useContext(LayoutContext);

  const shapes = useMemo<Shape<ShapeKeyWave>[]>(() => {
    if (dims.cols === 0 || dims.rows === 0) return [];

    return generateWavesShapes({
      rows: dims.rows,
      cols: dims.cols,
    });
  }, [dims.rows, dims.cols]);

  useLayoutEffect(() => {
    if (shapes.length > 0) onAnimationFinish();
  }, [shapes, onAnimationFinish]);

  return shapes.length ? (
    <div
      className="relative overflow-hidden filter"
      style={{
        width: gridSize.width,
        height: gridSize.height,
        backgroundColor: "#f3f1e9",
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
          >
            {shape.points.map(({ x, y }) => (
              <WaveTile
                key={`${x}-${y}-${shape.key}`}
                className="filter saturate-150"
                style={{
                  borderRadius: 5,
                  background: `radial-gradient(circle, transparent 10%, #d9d3c0 100%)`,
                  opacity: Math.random() * 0.5 + 0.5,
                }}
              />
            ))}
          </TiledShape>
        );
      })}
    </div>
  ) : null;
};
