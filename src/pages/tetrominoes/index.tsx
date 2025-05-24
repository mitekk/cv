import { generateTiledGrid } from "../../services/grid/tiling";
import { TILE_GAP, TILE_SIZE } from "../../constants";
import { useEffect, useState } from "react";
import type { Grid } from "../../types";
import Tile from "../../components/tile/tile";

export const TetrominoesGrid: React.FC = () => {
  const [dims, setDims] = useState({ rows: 0, cols: 0 });
  const [grid, setGrid] = useState<Grid>();

  const handleResize = () => {
    const cols = Math.floor(
      (window.innerWidth + TILE_GAP) / (TILE_SIZE + TILE_GAP)
    );
    const rows = Math.floor(
      (window.innerHeight + TILE_GAP) / (TILE_SIZE + TILE_GAP)
    );
    setDims({
      cols: Math.floor(cols / 4) * 4,
      rows: Math.floor(rows / 4) * 4,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const { cols, rows } = dims;
    if (cols === 0 || rows === 0) return;
    setTimeout(() => {
      const grid = generateTiledGrid(dims.rows, dims.cols);
      setGrid(grid);
    }, 0);
  }, [dims]);

  return grid ? (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${grid[0].length}, ${TILE_SIZE}px)`,
        gridTemplateRows: `repeat(${grid.length}, ${TILE_SIZE}px)`,
        gap: `${TILE_GAP}px`,
        background: "lightgray",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {grid.map((row, y) =>
        row.map((cell, x) => {
          if (!cell) {
            return (
              <div
                key={`${x},${y}`}
                style={{
                  width: TILE_SIZE,
                  height: TILE_SIZE,
                  background: "#111",
                  position: "relative",
                }}
              />
            );
          }

          const sameTop = y > 0 && grid[y - 1][x]?.id === cell.id;
          const sameRight = x < row.length - 1 && row[x + 1]?.id === cell.id;
          const sameBottom =
            y < grid.length - 1 && grid[y + 1][x]?.id === cell.id;
          const sameLeft = x > 0 && row[x - 1]?.id === cell.id;

          return (
            <Tile
              key={`${x},${y}`}
              shape={cell.shape}
              padTop={sameTop}
              padLeft={sameLeft}
              padRight={sameRight}
              padBottom={sameBottom}
            />
          );
        })
      )}
    </div>
  ) : null;
};
