import { Tile } from "../tile/tile";
import type { Shape, Point } from "../../types";
import { TILE_GAP, TILE_SIZE } from "../../constants";

type AnimationEndProps = {
  shapeId: number;
  point: Point;
};

export const TiledShape: React.FC<{
  shape: Shape;
  top: number;
  left: number;
  className?: string;
  styles?: React.CSSProperties;
  onAnimationEnd?: ({ shapeId, point }: AnimationEndProps) => void;
}> = ({ shape, top, left, styles, className = "", onAnimationEnd }) => {
  return (
    <div
      key={shape.id}
      className={`tiled-shape ${className || ""}`}
      style={{
        position: "absolute",
        left,
        top,
        ...styles,
      }}
      onTransitionEnd={(e) => {
        if (e.propertyName === "top") {
          if (onAnimationEnd)
            onAnimationEnd({
              shapeId: shape.id,
              point: {
                x: left,
                y: top,
              },
            });
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
};
