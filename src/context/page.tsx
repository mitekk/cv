import { createContext } from "react";
import type { GameMode } from "../types";

export type EXCITEMENT_LEVELS = "normal" | "high";

type PageContextType = {
  excitementLevel?: "normal" | "high";
  gameMode?: GameMode;
};

export const PageContext = createContext<PageContextType>({
  excitementLevel: "high",
  gameMode: "Tetris",
});
