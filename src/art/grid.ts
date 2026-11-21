import type { SpriteDef } from '../cases/types';

/** A small drawing surface for generating pixel sprites procedurally. */
export class Grid {
  private cells: string[][];
  readonly w: number;
  readonly h: number;
  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.cells = Array.from({ length: h }, () => Array(w).fill('.'));
  }
  set(x: number, y: number, c: string) {
    if (x >= 0 && y >= 0 && x < this.w && y < this.h) this.cells[y][x] = c;
    return this;
  }
  rect(x: number, y: number, w: number, h: number, c: string) {
    for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) this.set(i, j, c);
    return this;
  }
  outline(x: number, y: number, w: number, h: number, c: string) {
    for (let i = x; i < x + w; i++) { this.set(i, y, c); this.set(i, y + h - 1, c); }
    for (let j = y; j < y + h; j++) { this.set(x, j, c); this.set(x + w - 1, j, c); }
    return this;
  }
  circle(cx: number, cy: number, r: number, c: string) {
    for (let y = 0; y < this.h; y++)
      for (let x = 0; x < this.w; x++) if ((x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2 <= r * r) this.set(x, y, c);
    return this;
  }
  line(x0: number, y0: number, x1: number, y1: number, c: string, thick = 1) {
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
    for (let s = 0; s <= steps; s++) {
      const x = Math.round(x0 + ((x1 - x0) * s) / steps);
      const y = Math.round(y0 + ((y1 - y0) * s) / steps);
      this.rect(x, y, thick, thick, c);
    }
    return this;
  }
  sprite(palette: Record<string, string>): SpriteDef {
    return { rows: this.cells.map((r) => r.join('')), palette };
  }
}
