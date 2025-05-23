/* eslint-disable */

import fs from "fs";
import path from "path";

// 1) Copy your exact BASE_SHAPES here:
const BASE_SHAPES: Record<string, { x: number; y: number }[]> = {
  I: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ],
  O: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
  T: [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
  S: [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
  Z: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
  J: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
  L: [
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
};

// 2) A quick rotate+normalize helper
function rotate(shape: { x: number; y: number }[]) {
  const r = shape.map((p) => ({ x: p.y, y: -p.x }));
  const minX = Math.min(...r.map((p) => p.x)),
    minY = Math.min(...r.map((p) => p.y));
  return r.map((p) => ({ x: p.x - minX, y: p.y - minY }));
}

// 3) Build all unique orientations
const ORIENTS: Record<string, { x: number; y: number }[][]> =
  Object.fromEntries(
    Object.entries(BASE_SHAPES).map(([k, pts]) => {
      const o: any[] = [],
        seen = new Set<string>();
      let cur = pts;
      for (let i = 0; i < 4; i++) {
        const key = cur
          .map((p) => `${p.x},${p.y}`)
          .sort()
          .join(";");
        if (!seen.has(key)) {
          seen.add(key);
          o.push(cur);
        }
        cur = rotate(cur);
      }
      return [k, o];
    })
  ) as any;

// 4) Fast backtracking fill for a single NxN, requiring minDistinct shapes
function fillNxN(n: number, minDistinct: number) {
  const grid: (string | null)[][] = Array.from({ length: n }, () =>
    Array(n).fill(null)
  );
  const out: any[] = [];
  const shapes = Object.keys(ORIENTS);
  function findEmpty() {
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++) if (!grid[i][j]) return [i, j];
    return null;
  }
  function can(pl: { x: number; y: number }[], r: number, c: number) {
    return pl.every(
      (p) =>
        r + p.x >= 0 &&
        r + p.x < n &&
        c + p.y >= 0 &&
        c + p.y < n &&
        !grid[r + p.x][c + p.y]
    );
  }
  function place(pl, r, c, mark) {
    pl.forEach((p) => (grid[r + p.x][c + p.y] = mark));
  }
  function backtrack(): boolean {
    const spot = findEmpty();
    if (!spot) {
      return new Set(out.map((x) => x.shape)).size >= minDistinct;
    }
    const [r, c] = spot as [number, number];
    for (const s of shapes) {
      for (let ri = 0; ri < ORIENTS[s].length; ri++) {
        const pl = ORIENTS[s][ri];
        if (can(pl, r, c)) {
          place(pl, r, c, s);
          out.push({ shape: s, rotation: ri, x: r, y: c });
          if (backtrack()) return true;
          out.pop();
          place(pl, r, c, null);
        }
      }
    }
    return false;
  }
  backtrack();
  return out;
}

// 5) Generate & write
const outDir = path.resolve(__dirname, "../src/assets/templates");
for (const [size, distinct] of [
  [4, 3],
  // [8, 7],
  // [16, 7],
  // [32, 7],
] as [number, number][]) {
  const arr = [] as any[];
  for (let i = 0; i < 10; i++) {
    arr.push(fillNxN(size, distinct));
  }
  fs.writeFileSync(
    path.join(outDir, `${size}x${size}.json`),
    JSON.stringify(arr, null, 2)
  );
}
console.log("8×8, 16×16, 32×32 templates generated.");
