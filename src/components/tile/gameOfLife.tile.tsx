import { useContext, type CSSProperties, type HTMLAttributes } from "react";
import type { ShapeKeyGameOfLife } from "../../types";
import { LayoutContext } from "../../context";
import "./gameOfLife.tile.css";

interface GameOfLifeTileProps extends HTMLAttributes<HTMLDivElement> {
  shape: ShapeKeyGameOfLife;
  style?: CSSProperties;
}

export const GameOfLifeTile = ({ style, shape }: GameOfLifeTileProps) => {
  const { tileSize } = useContext(LayoutContext);

  const tileStyle: CSSProperties = {
    width: tileSize,
    height: tileSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    border: "1px solid #a2c17c",
    backgroundColor: "#d7e9d9",
    transition: "background 0.2s",
    position: "relative",
    borderRadius: 3,
    ...style,
  };

  return (
    <div style={tileStyle}>
      {shape === "alive" && (
        <span
          role="img"
          aria-label="alive"
          style={{
            fontSize: 30,
            userSelect: "none",
            animation: "fadeIn 1s forwards",
          }}
        >
          🐣
        </span>
      )}
      {shape === "dead" && (
        <span
          role="img"
          aria-label="dead"
          style={{
            fontSize: 30,
            userSelect: "none",
            animation: "fadeIn 1s forwards",
          }}
        >
          🥚
        </span>
      )}
    </div>
  );
};
