import { case001 } from './case001';
import type { CaseFile } from './types';

/** All available cases. Add new mysteries here; the UI reads everything from this list. */
export const CASES: CaseFile[] = [case001];

/** Picks today's case. With one case in the prototype, it always returns case 001. */
export function getDailyCase(date = new Date()): CaseFile {
  const dayNumber = Math.floor(date.getTime() / 86_400_000);
  return CASES[dayNumber % CASES.length];
}

export type { CaseFile, Suspect, EvidenceItem, SpriteDef } from './types';
