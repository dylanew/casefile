import { Lightbulb, Lock } from 'lucide-react';

const LEVELS = ['A gentle nudge', 'A sharper clue', 'The next deduction'];

/** The hints folder as it sits on the desk. */
export function HintTray({ revealed, total, onOpen }: { revealed: number; total: number; onOpen: () => void }) {
  return (
    <button type="button" className="desk-object hint-tray" onClick={onOpen} aria-label={`Open hints folder, ${revealed} of ${total} opened`}>
      <span className="hint-tray__sheets" aria-hidden>
        <span /><span /><span />
      </span>
      <span className="hint-tray__folder">
        <span className="hint-tray__tab">HINTS</span>
        <span className="hint-tray__label">
          <Lightbulb size={14} aria-hidden /> {revealed}/{total} OPENED
        </span>
      </span>
    </button>
  );
}

interface Props {
  hints: string[];
  revealed: number;
  onReveal: () => void;
}

/** Hints are sealed and opened one at a time, in order. */
export function HintFolder({ hints, revealed, onReveal }: Props) {
  return (
    <div className="hints">
      <h2 className="overlay__title">Hints</h2>
      <p className="hints__lede">Each envelope opens on its own. Your report will show how many you used.</p>
      <ol className="hints__list">
        {hints.map((h, i) => {
          const open = i < revealed;
          const next = i === revealed;
          return (
            <li key={i} className={`envelope${open ? ' is-open' : ''}${next ? ' is-next' : ''}`}>
              <span className="envelope__level">HINT {i + 1} · {LEVELS[i] ?? ''}</span>
              {open ? (
                <p className="envelope__text">{h}</p>
              ) : next ? (
                <button type="button" className="px-btn px-btn--gold" onClick={onReveal}>
                  Break the seal
                </button>
              ) : (
                <span className="envelope__locked"><Lock size={14} aria-hidden /> Open hint {i} first</span>
              )}
              {!open && <span className="envelope__seal" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
