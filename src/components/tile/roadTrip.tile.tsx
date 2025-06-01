import { type CSSProperties, type HTMLAttributes } from "react";
import { TILE_SIZE } from "../../constants";
import type { ShapeKeyPath } from "../../types";

interface RoadTripTileProps extends HTMLAttributes<HTMLDivElement> {
  shape: ShapeKeyPath;
  style?: CSSProperties;
}

export const RoadTripTile = ({ style, shape }: RoadTripTileProps) => {
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
    position: "absolute",
    borderRadius: 3,
    ...style,
  };

  return (
    <div style={tileStyle}>
      {shape === "tree" && (
        <span
          role="img"
          aria-label="tree"
          style={{ fontSize: 30, userSelect: "none" }}
        >
          🌲
        </span>
      )}
      {shape === "tree2" && (
        <span
          role="img"
          aria-label="tree"
          style={{ fontSize: 30, userSelect: "none" }}
        >
          🌳
        </span>
      )}
      {shape === "mountain" && (
        <span
          role="img"
          aria-label="mountain"
          style={{ fontSize: 30, userSelect: "none" }}
        >
          ⛰️
        </span>
      )}
      {shape === "house" && (
        <span
          role="img"
          aria-label="house"
          style={{ fontSize: 30, userSelect: "none" }}
        >
          🛖
        </span>
      )}
      {shape === "rhino" && (
        <span
          role="img"
          aria-label="rhino"
          style={{ fontSize: 30, userSelect: "none" }}
        >
          🦏
        </span>
      )}
    </div>
  );
};
