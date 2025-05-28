import { useContext, type CSSProperties, type HTMLAttributes } from "react";
import { COLORS, SOFT_RICH_COLORS, TILE_SIZE } from "../../constants";
import type { ShapeKey } from "../../types";
import { PageContext } from "../../context";
import "./tile.css";

interface TileProps extends HTMLAttributes<HTMLDivElement> {
  shape: ShapeKey;
}

export const Tile = ({ style, shape }: TileProps) => {
  const { excitementLevel } = useContext(PageContext);
  const colors = excitementLevel === "high" ? COLORS : SOFT_RICH_COLORS;

  const tileStyle: CSSProperties = {
    width: TILE_SIZE,
    height: TILE_SIZE,
    background: `
      linear-gradient(to right, rgba(255,255,255,0.18), rgba(255,255,255,0)) no-repeat top / 100% 10px,
      linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0)) no-repeat left / 10px 100%,
      linear-gradient(to left, rgba(0,0,0,0.10), rgba(0,0,0,0)) no-repeat bottom / 100% 10px,
      linear-gradient(to top, rgba(0,0,0,0.10), rgba(0,0,0,0)) no-repeat right / 10px 100%,
    ${colors[shape]}
  `,
    position: "absolute",
    borderRadius: 3,
    ...style,
  };

  return <div className="tile" style={tileStyle}></div>;
};
