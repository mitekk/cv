import { type CSSProperties, type HTMLAttributes } from "react";
import { TILE_SIZE } from "../../constants";
import type { ShapeKeyPath } from "../../types";
import "./tetromino.tile.css";

interface RoadTripTileProps extends HTMLAttributes<HTMLDivElement> {
  shape: ShapeKeyPath;
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
        <span role="img" aria-label="tree" style={{ fontSize: 24 }}>
          🌲🌲
        </span>
      )}
      {shape === "mountain" && (
        <span role="img" aria-label="grass" style={{ fontSize: 40 }}>
          ⛰️
        </span>
      )}
      {shape === "house" && (
        <span role="img" aria-label="grass" style={{ fontSize: 30 }}>
          🏡
        </span>
      )}
    </div>
  );
};
