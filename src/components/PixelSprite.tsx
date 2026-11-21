import { memo } from 'react';
import type { SpriteDef } from '../cases/types';

interface Props {
  sprite: SpriteDef;
  /** Rendered size of one pixel in CSS px. Omit to let CSS size the SVG. */
  scale?: number;
  className?: string;
  title?: string;
}

/** Renders a character-grid sprite as a crisp SVG, merging horizontal runs of one colour. */
export const PixelSprite = memo(function PixelSprite({ sprite, scale, className, title }: Props) {
  const h = sprite.rows.length;
  const w = Math.max(...sprite.rows.map((r) => r.length));
  const rects: { x: number; y: number; w: number; fill: string }[] = [];
  sprite.rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      const fill = sprite.palette[ch];
      let end = x + 1;
      while (end < row.length && row[end] === ch) end++;
      if (fill) rects.push({ x, y, w: end - x, fill });
      x = end;
    }
  });
  return (
    <svg
      className={className}
      viewBox={`0 0 ${w} ${h}`}
      width={scale ? w * scale : undefined}
      height={scale ? h * scale : undefined}
      shapeRendering="crispEdges"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {rects.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </svg>
  );
});
