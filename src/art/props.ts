import type { SpriteDef } from '../cases/types';
import { Grid } from './grid';

const C = {
  navy: '#111820',
  slate: '#202D38',
  slateHi: '#2E3E4C',
  wood: '#35271F',
  woodDark: '#211812',
  paper: '#F1E8D4',
  paperShade: '#D9CCB0',
  red: '#A74440',
  redDark: '#7A2F2C',
  gold: '#D3A35B',
  goldDark: '#9C7638',
  grey: '#A4B1B7',
  greyDark: '#6E7B82',
  coffee: '#2A1910',
  crema: '#5C3A22',
};

/** Desk lamp seen from above: brass rim, dark shade, finial. */
export const lampSprite: SpriteDef = (() => {
  const g = new Grid(30, 30);
  g.circle(15, 15, 14, 'G').circle(15, 15, 12.6, 'g').circle(15, 15, 11.4, 'k').circle(15, 15, 10, 's');
  // highlight crescent on the shade
  for (let a = 200; a < 290; a += 4) {
    const r = (a * Math.PI) / 180;
    g.set(Math.round(15 + Math.cos(r) * 7.5), Math.round(15 + Math.sin(r) * 7.5), 'l');
  }
  g.circle(15, 15, 2.6, 'G').circle(15, 15, 1.6, 'g').set(14, 14, 'w');
  return g.sprite({ G: C.goldDark, g: C.gold, k: C.navy, s: C.slate, l: C.slateHi, w: C.paper });
})();

/** Coffee mug from above with a handle. */
export const mugSprite: SpriteDef = (() => {
  const g = new Grid(22, 18);
  g.rect(15, 6, 5, 6, 'w').rect(16, 7, 3, 4, '.').rect(15, 7, 1, 4, 'w');
  g.outline(15, 6, 6, 6, 'W').rect(16, 7, 3, 4, '.');
  g.circle(9, 9, 8.6, 'W').circle(9, 9, 8, 'w').circle(9, 9, 6.4, 'r').circle(9, 9, 5.6, 'c');
  g.set(6, 6, 'h').set(7, 6, 'h').set(6, 7, 'h');
  return g.sprite({ w: C.paper, W: C.paperShade, r: C.red, c: C.coffee, h: C.crema });
})();

/** Brass magnifying glass. */
export const magnifierSprite: SpriteDef = (() => {
  const g = new Grid(28, 28);
  g.line(15, 15, 25, 25, 'k', 3).line(14, 14, 16, 16, 'G', 3);
  g.circle(10, 10, 9.5, 'G').circle(10, 10, 8.4, 'g').circle(10, 10, 7, 'L');
  g.set(6, 5, 'w').set(5, 6, 'w').set(5, 7, 'w').set(7, 5, 'w').set(13, 14, 'l').set(14, 13, 'l');
  return g.sprite({ G: C.goldDark, g: C.gold, k: C.woodDark, L: 'rgba(164,177,183,0.38)', w: C.paper, l: 'rgba(241,232,212,0.6)' });
})();

/** Yellow pencil lying horizontally. */
export const pencilSprite: SpriteDef = (() => {
  const g = new Grid(56, 5);
  g.rect(0, 0, 5, 5, 'r').rect(5, 0, 4, 5, 'm').rect(6, 0, 1, 5, 'M');
  g.rect(9, 0, 37, 5, 'y').rect(9, 0, 37, 1, 'Y').rect(9, 4, 37, 1, 'D');
  g.rect(46, 0, 2, 5, 'p').rect(48, 1, 2, 3, 'p').rect(50, 1, 2, 3, 'k').rect(52, 2, 2, 1, 'k');
  return g.sprite({ r: C.red, m: C.grey, M: C.greyDark, y: C.gold, Y: '#E6BE7E', D: C.goldDark, p: '#E2C29A', k: '#2A2A2A' });
})();

/** Paper clip. */
export const clipSprite: SpriteDef = (() => {
  const g = new Grid(8, 20);
  g.outline(0, 0, 8, 20, 'm').outline(2, 3, 4, 15, 'm').rect(0, 19, 2, 1, '.').rect(1, 18, 1, 1, '.');
  g.set(0, 0, '.').set(7, 0, '.').set(7, 19, '.');
  g.set(5, 3, '.').set(5, 4, 'm');
  return g.sprite({ m: C.grey });
})();

/** Typewriter from above, with a sheet in the platen. */
export const typewriterSprite: SpriteDef = (() => {
  const g = new Grid(44, 34);
  g.rect(12, 0, 20, 10, 'p').rect(12, 9, 20, 1, 'P');
  for (let y = 2; y < 9; y += 2) g.rect(14, y, 4 + ((y * 7) % 12), 1, 'i');
  g.rect(4, 9, 36, 4, 'k').rect(2, 10, 2, 2, 'g').rect(40, 10, 2, 2, 'g').rect(4, 9, 36, 1, 'K');
  g.rect(3, 13, 38, 21, 'b').outline(3, 13, 38, 21, 'B').rect(4, 14, 36, 1, 'H');
  g.rect(6, 15, 32, 2, 'K');
  const rows = [
    { y: 19, n: 10, x: 7 },
    { y: 22, n: 10, x: 8 },
    { y: 25, n: 9, x: 9 },
  ];
  for (const r of rows) for (let i = 0; i < r.n; i++) g.rect(r.x + i * 3, r.y, 2, 2, i % 4 === 0 ? 'g' : 'w');
  g.rect(13, 29, 18, 2, 'w');
  return g.sprite({
    p: C.paper, P: C.paperShade, i: C.greyDark, k: C.navy, K: '#2B3742', g: C.gold, b: '#1C2630', B: '#0C1116', H: '#2B3742', w: '#CFC6B4',
  });
})();

/** Night exterior of the hotel, for a pinned evidence photo. */
export const hotelPhotoSprite: SpriteDef = (() => {
  const g = new Grid(24, 18);
  g.rect(0, 0, 24, 18, 'n').circle(19, 3.5, 2, 'm').rect(4, 4, 16, 14, 's').rect(10, 1, 4, 3, 's').rect(11, 0, 2, 1, 'g');
  for (let y = 6; y < 15; y += 3) for (let x = 6; x < 19; x += 3) g.rect(x, y, 2, 2, (x * y) % 7 === 0 ? 'g' : 'd');
  g.rect(9, 8, 2, 2, 'r');
  g.rect(10, 15, 4, 3, 'g').rect(5, 3, 14, 1, 'S');
  return g.sprite({ n: '#16202A', m: '#D9CCB0', s: '#2E3E4C', S: '#41525F', g: C.gold, d: '#1A242D', r: C.red });
})();

/** The vault-room safe, for a second evidence photo. */
export const safePhotoSprite: SpriteDef = (() => {
  const g = new Grid(24, 18);
  g.rect(0, 0, 24, 18, 'b').rect(0, 14, 24, 4, 'f');
  g.rect(6, 2, 12, 13, 'S').outline(6, 2, 12, 13, 'k').rect(7, 3, 10, 1, 'h');
  g.circle(12, 8.5, 3.2, 'g').circle(12, 8.5, 2.2, 'k').set(12, 7, 'g');
  g.rect(15, 7, 1, 4, 'g');
  g.rect(3, 15, 2, 1, 'w');
  return g.sprite({ b: '#26323C', f: '#3A2C22', S: '#55636B', k: '#1A2229', h: '#76858D', g: C.gold, w: C.paper });
})();
