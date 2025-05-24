import type { CSSProperties, HTMLAttributes } from "react";
import { COLORS, TILE_GAP, TILE_SIZE } from "../../constants";
import type { ShapeKey } from "../../types";
import "./tile.css";

interface TileProps extends HTMLAttributes<HTMLDivElement> {
  shape: ShapeKey;
  padTop?: boolean;
  padLeft?: boolean;
  padRight?: boolean;
  padBottom?: boolean;
}

export default function Tile({
  shape,
  padTop,
  padLeft,
  padRight,
  padBottom,
}: TileProps) {
  const tileStyle: CSSProperties = {
    width: TILE_SIZE,
    height: TILE_SIZE,
    background: `
      linear-gradient(to right, rgba(255,255,255,0.7), rgba(255,255,255,0)) no-repeat top / 100% 5px,
      linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0)) no-repeat left / 5px 100%,
      linear-gradient(to left, rgba(0,0,0,0.3), rgba(0,0,0,0)) no-repeat bottom / 100% 5px,
      linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0)) no-repeat right / 5px 100%,
      ${COLORS[shape]}
    `,
    position: "relative",
  };

  const tilePaddings = [
    {
      ...(padTop && {
        top: -TILE_GAP,
        left: 0,
        width: TILE_SIZE,
        height: TILE_GAP,
      }),
    },
    {
      ...(padRight && {
        top: 0,
        right: -TILE_GAP,
        width: TILE_GAP,
        height: TILE_SIZE,
      }),
    },
    {
      ...(padLeft && {
        top: 0,
        left: -TILE_GAP,
        width: TILE_GAP,
        height: TILE_SIZE,
      }),
    },
    {
      ...(padBottom && {
        bottom: -TILE_GAP,
        left: 0,
        width: TILE_SIZE,
        height: TILE_GAP,
      }),
    },
  ];

  return (
    <div className="tile" style={tileStyle}>
      {tilePaddings.map((tilePaddingStyle, index) => {
        return (
          <div
            key={`padding-${index}`}
            style={{
              ...tilePaddingStyle,
              background: COLORS[shape],
              position: "absolute",
            }}
          />
        );
      })}
    </div>
  );
}
