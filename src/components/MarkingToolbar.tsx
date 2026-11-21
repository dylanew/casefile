import { useEffect, useState } from 'react';
import { Eraser, Highlighter, Strikethrough, Trash2, Undo2 } from 'lucide-react';
import type { Tool } from '../lib/progress';

interface Props {
  tool: Tool;
  onTool: (t: Tool) => void;
  canUndo: boolean;
  hasMarks: boolean;
  onUndo: () => void;
  onClear: () => void;
}

const TOOLS: { id: Tool; label: string; Icon: typeof Highlighter }[] = [
  { id: 'highlight', label: 'Highlight', Icon: Highlighter },
  { id: 'strike', label: 'Cross out', Icon: Strikethrough },
  { id: 'erase', label: 'Erase', Icon: Eraser },
];

export function MarkingToolbar({ tool, onTool, canUndo, hasMarks, onUndo, onClear }: Props) {
  const [confirming, setConfirming] = useState(false);
  useEffect(() => {
    if (!confirming) return;
    const t = window.setTimeout(() => setConfirming(false), 3000);
    return () => window.clearTimeout(t);
  }, [confirming]);

  return (
    <div className="toolbar" role="toolbar" aria-label="Pencil tools">
      <div className="toolbar__group" role="radiogroup" aria-label="Pencil">
        {TOOLS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={tool === id}
            className={`tool tool--${id}${tool === id ? ' is-active' : ''}`}
            onClick={() => onTool(id)}
            title={label}
          >
            <Icon size={14} aria-hidden />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <div className="toolbar__group">
        <button type="button" className="tool" onClick={onUndo} disabled={!canUndo} title="Undo last mark">
          <Undo2 size={14} aria-hidden />
          <span>Undo</span>
        </button>
        <button
          type="button"
          className={`tool${confirming ? ' tool--danger' : ''}`}
          disabled={!hasMarks}
          onClick={() => {
            if (confirming) {
              onClear();
              setConfirming(false);
            } else setConfirming(true);
          }}
          title="Remove every mark"
        >
          <Trash2 size={14} aria-hidden />
          <span>{confirming ? 'Sure?' : 'Clear'}</span>
        </button>
      </div>
    </div>
  );
}
