// src/assets/templates/index.ts

import template4 from "./4x4.json";
import template8 from "./8x8.json";
import template16 from "./16x16.json";
import template32 from "./32x32.json";
import template64 from "./64x64.json";
import type { Template } from "../../types";

export const templates: Record<4 | 8 | 16 | 32 | 64, Template[]> = {
  4: template4 as Template[],
  8: template8 as Template[],
  16: template16 as Template[],
  32: template32 as Template[],
  64: template64 as Template[],
};
