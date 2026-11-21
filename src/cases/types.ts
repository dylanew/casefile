/** A pixel-art sprite: rows of characters, each mapped to a colour. "." is transparent. */
export interface SpriteDef {
  rows: string[];
  palette: Record<string, string>;
}

export interface Suspect {
  id: string;
  name: string;
  age: number;
  occupation: string;
  portrait: SpriteDef;
  /** Background colour behind the portrait. */
  portraitBg: string;
  background: string;
  alibi: string;
  characteristics: string[];
  /** Other notes that may help eliminate them. */
  notes: string[];
}

export interface EvidenceItem {
  id: string;
  label: string;
  title: string;
  text: string;
  /** Optional tabular excerpt (e.g. a sign-in sheet). */
  table?: { left: string; right: string }[];
}

export interface Deduction {
  title: string;
  text: string;
}

export interface CaseFile {
  id: string;
  number: string;
  title: string;
  dateline: string;
  location: string;
  summary: string[];
  evidence: EvidenceItem[];
  instructions: string[];
  suspects: Suspect[];
  /** Exactly three hints, from a gentle nudge to a substantial pointer. */
  hints: [string, string, string];
  solution: {
    culpritId: string;
    headline: string;
    deductions: Deduction[];
    epilogue: string;
  };
}
