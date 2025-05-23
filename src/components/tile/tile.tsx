import type { CSSProperties, HTMLAttributes } from "react";
import { TILE_SIZE } from "../../constants";
import "./tile.css";

interface TileProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  color?: string;
}

export default function Tile({
  size = TILE_SIZE,
  color = "white",
  style,
  ...rest
}: TileProps) {
  // merge background/size with any user-passed styles
  const tileStyle: CSSProperties = {
    backgroundColor: color,
    width: `${size}px`,
    height: `${size}px`,
    ...style,
  };

  return <div className="tile" style={tileStyle} {...rest} />;
}
