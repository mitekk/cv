import { useCallback, useEffect, useState, type ReactNode } from "react";
import { LayoutContext } from "../context";
import { TILE_GAP, TILE_SIZE } from "../constants";
import type { Dims } from "../context/layout";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [dims, setDims] = useState<Dims>({ rows: 0, cols: 0 });
  const [gridSize, setGridSize] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = useCallback(() => {
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
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (dims.cols > 0 && dims.rows > 0) {
      setGridSize({
        width: dims.cols * TILE_SIZE + (dims.cols - 1) * TILE_GAP,
        height: dims.rows * TILE_SIZE + (dims.rows - 1) * TILE_GAP,
      });
    }
  }, [dims]);

  return (
    <LayoutContext.Provider value={{ dims, gridSize }}>
      <main className="h-screen flex justify-center items-center bg-[#4c4b4c]">
        <div
          style={{
            width: gridSize.width,
            height: gridSize.height,
            background: "lightgray",
            margin: "0 auto",
            borderRadius: 3,
          }}
        >
          {children}
        </div>
      </main>
    </LayoutContext.Provider>
  );
}
