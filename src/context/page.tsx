import { createContext } from "react";

export type EXCITEMENT_LEVELS = "normal" | "high";

type PageContextType = {
  excitementLevel: "normal" | "high";
};

export const PageContext = createContext<PageContextType>({
  excitementLevel: "high",
});
