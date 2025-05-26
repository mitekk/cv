// src/assets/templates/index.ts

import intro from "./intro.json";
import type { PromptLine } from "../../types";

export const PromptLines: Record<"intro", PromptLine[]> = {
  intro: intro as PromptLine[],
};
