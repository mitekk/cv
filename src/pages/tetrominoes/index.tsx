import { generateTiledGrid } from "../../services/grid/tiling";
import { COLORS, TILE_SIZE } from "../../constants";

const GAP = 2;

export const TetrominoesGrid: React.FC = () => {
  const grid = generateTiledGrid(16, 32);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${grid[0].length}, ${TILE_SIZE}px)`,
        gridTemplateRows: `repeat(${grid.length}, ${TILE_SIZE}px)`,
        gap: `${GAP}px`,
        background: "#111",
        height: "100vh",
        width: "100vw",
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
            <div
              key={`${x},${y}`}
              style={{
                width: TILE_SIZE,
                height: TILE_SIZE,
                background: COLORS[cell.shape],
                position: "relative",
                boxSizing: "border-box",
              }}
            >
              {sameTop && (
                <div
                  style={{
                    position: "absolute",
                    top: -GAP,
                    left: 0,
                    width: TILE_SIZE,
                    height: GAP,
                    background: COLORS[cell.shape],
                  }}
                />
              )}
              {sameRight && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: -GAP,
                    width: GAP,
                    height: TILE_SIZE,
                    background: COLORS[cell.shape],
                  }}
                />
              )}
              {sameBottom && (
                <div
                  style={{
                    position: "absolute",
                    bottom: -GAP,
                    left: 0,
                    width: TILE_SIZE,
                    height: GAP,
                    background: COLORS[cell.shape],
                  }}
                />
              )}
              {sameLeft && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: -GAP,
                    width: GAP,
                    height: TILE_SIZE,
                    background: COLORS[cell.shape],
                  }}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};
