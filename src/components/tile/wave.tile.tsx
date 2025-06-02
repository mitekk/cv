import { type CSSProperties, type HTMLAttributes } from "react";
import { TILE_SIZE } from "../../constants";

interface WaveTileProps extends HTMLAttributes<HTMLDivElement> {
  style?: CSSProperties;
  className?: string;
}

export const WaveTile = ({ style, className }: WaveTileProps) => {
  const tileStyle: CSSProperties = {
    width: TILE_SIZE,
    height: TILE_SIZE,
    position: "absolute",
    borderRadius: 3,
    ...style,
  };

  return <div className={`tile ${className}`} style={tileStyle}></div>;
};
