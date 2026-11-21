import { useEffect, useReducer } from 'react';
import { loadJSON, saveJSON } from './storage';

export type Mark = 'highlight' | 'strike';
export type Tool = Mark | 'erase';

interface HistoryEntry {
  stroke: number;
  id: string;
  prev: Mark | null;
}

export interface Progress {
  opened: boolean;
  elapsedMs: number;
  marks: Record<string, Mark>;
  history: HistoryEntry[];
  hintsRevealed: number;
  notes: string;
  accused: string | null;
  wrongAttempts: string[];
  solved: boolean;
}

export const initialProgress: Progress = {
  opened: false,
  elapsedMs: 0,
  marks: {},
  history: [],
  hintsRevealed: 0,
  notes: '',
  accused: null,
  wrongAttempts: [],
  solved: false,
};

export type ProgressAction =
  | { type: 'open' }
  | { type: 'tick'; ms: number }
  | { type: 'mark'; id: string; value: Mark | null; stroke: number }
  | { type: 'undo' }
  | { type: 'clearMarks' }
  | { type: 'revealHint'; max: number }
  | { type: 'notes'; text: string }
  | { type: 'select'; suspectId: string }
  | { type: 'wrong'; suspectId: string }
  | { type: 'solve' }
  | { type: 'reset' };

const HISTORY_LIMIT = 400;

function reducer(state: Progress, action: ProgressAction): Progress {
  switch (action.type) {
    case 'open':
      return state.opened ? state : { ...state, opened: true };
    case 'tick':
      return state.opened && !state.solved ? { ...state, elapsedMs: state.elapsedMs + action.ms } : state;
    case 'mark': {
      const prev = state.marks[action.id] ?? null;
      if (prev === action.value) return state;
      const marks = { ...state.marks };
      if (action.value) marks[action.id] = action.value;
      else delete marks[action.id];
      const history = [...state.history, { stroke: action.stroke, id: action.id, prev }].slice(-HISTORY_LIMIT);
      return { ...state, marks, history };
    }
    case 'undo': {
      if (!state.history.length) return state;
      const last = state.history[state.history.length - 1].stroke;
      const marks = { ...state.marks };
      const history = [...state.history];
      while (history.length && history[history.length - 1].stroke === last) {
        const entry = history.pop()!;
        if (entry.prev) marks[entry.id] = entry.prev;
        else delete marks[entry.id];
      }
      return { ...state, marks, history };
    }
    case 'clearMarks': {
      // Clearing is itself undoable: record every removed mark as one stroke.
      const stroke = Date.now();
      const removed = Object.entries(state.marks).map(([id, prev]) => ({ stroke, id, prev }));
      return { ...state, marks: {}, history: [...state.history, ...removed].slice(-HISTORY_LIMIT) };
    }
    case 'revealHint':
      return { ...state, hintsRevealed: Math.min(action.max, state.hintsRevealed + 1) };
    case 'notes':
      return { ...state, notes: action.text };
    case 'select':
      return state.solved ? state : { ...state, accused: action.suspectId };
    case 'wrong':
      return state.wrongAttempts.includes(action.suspectId)
        ? state
        : { ...state, wrongAttempts: [...state.wrongAttempts, action.suspectId] };
    case 'solve':
      return { ...state, solved: true };
    case 'reset':
      return { ...initialProgress, opened: true };
  }
}

/** Case progress, persisted to local storage per case. */
export function useCaseProgress(caseId: string) {
  const key = `casefile:progress:${caseId}`;
  const [state, dispatch] = useReducer(reducer, undefined, () => loadJSON<Progress>(key, initialProgress));

  useEffect(() => {
    saveJSON(key, state);
  }, [key, state]);

  // The investigation timer: counts only while the case is open, unsolved and the tab is visible.
  useEffect(() => {
    if (!state.opened || state.solved) return;
    let last = performance.now();
    const id = window.setInterval(() => {
      const now = performance.now();
      const delta = now - last;
      last = now;
      if (document.visibilityState === 'visible') dispatch({ type: 'tick', ms: Math.min(delta, 2000) });
    }, 1000);
    return () => window.clearInterval(id);
  }, [state.opened, state.solved]);

  return [state, dispatch] as const;
}
