import { useContext, type CSSProperties, type HTMLAttributes } from "react";
import { LayoutContext } from "../../context";

interface WaveTileProps extends HTMLAttributes<HTMLDivElement> {
  style?: CSSProperties;
  className?: string;
}

export const WaveTile = ({ style, className }: WaveTileProps) => {
  const { tileSize } = useContext(LayoutContext);

  const tileStyle: CSSProperties = {
    width: tileSize,
    height: tileSize,
    position: "absolute",
    borderRadius: 3,
    ...style,
  };

  return <div className={`tile ${className}`} style={tileStyle}></div>;
};
