import { type CSSProperties, type HTMLAttributes } from "react";
import type { ShapeKeyGameOfLife } from "../../types";
import { TILE_SIZE } from "../../constants";
import "./gameOfLife.tile.css";

interface GameOfLifeTileProps extends HTMLAttributes<HTMLDivElement> {
  shape: ShapeKeyGameOfLife;
  style?: CSSProperties;
}

export const GameOfLifeTile = ({ style, shape }: GameOfLifeTileProps) => {
  const tileStyle: CSSProperties = {
    width: TILE_SIZE,
    height: TILE_SIZE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    border: "1px solid #a2c17c",
    backgroundColor: "#b6d9bb",
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
          🪦
        </span>
      )}
    </div>
  );
};
