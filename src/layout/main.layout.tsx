import { useCallback, useEffect, useState, type ReactNode } from "react";
import { LayoutContext } from "../context";
import { Header } from "../components/header/header";
import type { Dims } from "../context/layout";
import type { GameMode } from "../types";
import { GAME_MODE_OPTIONS, TILE_GAP, TILE_SIZE } from "../constants";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [dims, setDims] = useState<Dims>({ rows: 0, cols: 0 });
  const [gridSize, setGridSize] = useState({
    width: 0,
    height: 0,
  });
  const [selectedMode, setSelectedMode] = useState<GameMode>(
    GAME_MODE_OPTIONS[0]
  );
  const [reloadTrigger, setReloadTrigger] = useState(0);

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
    if (reloadTrigger > 0) {
      setSelectedMode(
        GAME_MODE_OPTIONS[reloadTrigger % GAME_MODE_OPTIONS.length]
      );
    }
  }, [reloadTrigger]);

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
    <LayoutContext.Provider value={{ dims, gridSize, gameMode: selectedMode }}>
      <main className="relative h-screen flex flex-col justify-center items-center bg-[#4c4b4c]">
        <Header
          gameMode={selectedMode}
          onModeChange={setSelectedMode}
          onReload={() => {
            setReloadTrigger((prev) => prev + 1);
          }}
        />
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
