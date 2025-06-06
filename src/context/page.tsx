import { createContext } from "react";
import type { GameMode } from "../types";

export type EXCITEMENT_LEVELS = "normal" | "high";

type PageContextType = {
  gameMode?: GameMode;
};

export const PageContext = createContext<PageContextType>({
  gameMode: "Tetris",
});
