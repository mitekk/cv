import { useCallback, useEffect, useState, type ReactNode } from "react";
import { LayoutContext } from "../context";
import type { Dims, GridSize } from "../context/layout";
import {
  MAX_TILE,
  MAX_WIDTH,
  MIN_TILE,
  MIN_WIDTH,
  TILE_GAP,
} from "../constants";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [dims, setDims] = useState<Dims>({ rows: 0, cols: 0 });
  const [tileSize, setTileSize] = useState<number>(50);
  const [gridSize, setGridSize] = useState<GridSize>();

  const handleResize = useCallback(() => {
    const usableWidth = Math.min(window.innerWidth, MAX_WIDTH);

    if (usableWidth <= MIN_WIDTH) {
      return setTileSize(MIN_TILE);
    }
    if (usableWidth >= MAX_WIDTH) {
      return setTileSize(MAX_TILE);
    }

    const scale = (usableWidth - MIN_WIDTH) / (MAX_WIDTH - MIN_WIDTH);
    setTileSize(Math.round(MIN_TILE + (MAX_TILE - MIN_TILE) * scale));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    const cols = Math.floor(
      (Math.min(window.innerWidth, MAX_WIDTH) + TILE_GAP) /
        (tileSize + TILE_GAP)
    );
    const rows = Math.floor(
      (window.innerHeight + TILE_GAP) / (tileSize + TILE_GAP)
    );

    setDims({
      cols: Math.floor(cols / 4) * 4,
      rows: Math.floor(rows / 4) * 4,
    });
  }, [tileSize]);

  useEffect(() => {
    if (dims.cols > 0 && dims.rows > 0) {
      setGridSize({
        width: Math.min(
          dims.cols * tileSize + (dims.cols - 1) * TILE_GAP,
          MAX_WIDTH
        ),
        height: dims.rows * tileSize + (dims.rows - 1) * TILE_GAP,
      });
    }
  }, [dims, tileSize]);

  return (
    <LayoutContext.Provider value={{ dims, gridSize, tileSize }}>
      <main
        style={{
          maxWidth: `${MAX_WIDTH}px`,
          width: "100%",
          margin: "0 auto",
          overflow: "hidden",
        }}
        className="h-screen flex flex-col justify-center items-center bg-[#4c4b4c]"
      >
        {gridSize && (
          <div
            style={{
              position: "relative",
              background: "lightgray",
              borderRadius: 3,
            }}
          >
            {children}
          </div>
        )}
      </main>
    </LayoutContext.Provider>
  );
}
