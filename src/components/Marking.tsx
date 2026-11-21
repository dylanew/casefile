import { createContext, memo, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react';
import type { Mark, ProgressAction, Tool } from '../lib/progress';
import { useSound } from './SoundController';

interface MarkingApi {
  tool: Tool;
  marks: Record<string, Mark>;
  begin: (id: string, pointerType: string) => void;
  extend: (id: string) => void;
}

const MarkingContext = createContext<MarkingApi | null>(null);

interface ProviderProps {
  tool: Tool;
  marks: Record<string, Mark>;
  dispatch: (a: ProgressAction) => void;
  children: ReactNode;
}

/**
 * Click a word to apply the current pencil tool. Clicking a word that already has the
 * same mark removes it. With a mouse you can drag across several words in one stroke;
 * each stroke is a single step for Undo.
 */
export function MarkingProvider({ tool, marks, dispatch, children }: ProviderProps) {
  const { play } = useSound();
  const stroke = useRef<{ id: number; value: Mark | null; drag: boolean } | null>(null);
  const marksRef = useRef(marks);
  useEffect(() => {
    marksRef.current = marks;
  }, [marks]);

  useEffect(() => {
    const end = () => (stroke.current = null);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    return () => {
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
    };
  }, []);

  const begin = useCallback((id: string, pointerType: string) => {
    const current = marksRef.current[id] ?? null;
    const value: Mark | null = tool === 'erase' || current === tool ? null : tool;
    const s = { id: Date.now(), value, drag: pointerType === 'mouse' || pointerType === 'pen' };
    stroke.current = s;
    dispatch({ type: 'mark', id, value, stroke: s.id });
    play('pencil');
  }, [tool, dispatch, play]);

  const extend = useCallback((id: string) => {
    const s = stroke.current;
    if (!s || !s.drag) return;
    if ((marksRef.current[id] ?? null) === s.value) return;
    dispatch({ type: 'mark', id, value: s.value, stroke: s.id });
  }, [dispatch]);

  const api = useMemo(() => ({ tool, marks, begin, extend }), [tool, marks, begin, extend]);
  return <MarkingContext.Provider value={api}>{children}</MarkingContext.Provider>;
}

interface TextProps {
  /** Stable id for this passage; word marks are stored as `${id}:${index}`. */
  id: string;
  text: string;
  className?: string;
}

/** A passage whose words can be highlighted or crossed out. */
export const MarkableText = memo(function MarkableText({ id, text, className }: TextProps) {
  const api = useContext(MarkingContext);
  const parts = useMemo(() => text.split(/(\s+)/), [text]);
  if (!api) return <span className={className}>{text}</span>;
  return (
    <span className={`markable ${className ?? ''}`} data-tool={api.tool}>
      {parts.map((part, i) => {
        if (/^\s+$/.test(part) || part === '') return part;
        const key = `${id}:${i}`;
        const mark = api.marks[key];
        return (
          <span
            key={i}
            className={`word${mark ? ` word--${mark}` : ''}`}
            onPointerDown={(e) => {
              if (e.button !== 0) return;
              e.preventDefault();
              api.begin(key, e.pointerType);
            }}
            onPointerEnter={() => api.extend(key)}
          >
            {part}
          </span>
        );
      })}
    </span>
  );
});
