import { useState } from 'react';
import { Gavel } from 'lucide-react';
import type { Suspect } from '../cases/types';
import { MarkableText } from './Marking';

interface Props {
  suspects: Suspect[];
  accused: string | null;
  wrongAttempts: string[];
  onSelect: (id: string) => void;
  onSubmit: () => void;
  feedback: string | null;
}

export function AccusationPanel({ suspects, accused, wrongAttempts, onSelect, onSubmit, feedback }: Props) {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <section className="accuse" aria-labelledby="accuse-title">
      <h3 id="accuse-title" className="sheet__heading">Accusation</h3>
      <p className="accuse__lede">
        <MarkableText id="accuse-lede" text="Cross out the suspects you can clear. Tick the box beside the one who fits every fact." />
      </p>
      <ul className="accuse__list" role="radiogroup" aria-label="Choose the culprit">
        {suspects.map((s) => {
          const selected = accused === s.id;
          const tried = wrongAttempts.includes(s.id);
          return (
            <li key={s.id} className={`accuse__row${selected ? ' is-selected' : ''}`}>
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`Accuse ${s.name}`}
                className="checkbox"
                onClick={() => onSelect(s.id)}
                onMouseEnter={() => setHover(s.id)}
                onMouseLeave={() => setHover(null)}
              >
                {selected ? '✗' : hover === s.id ? '·' : ''}
              </button>
              <span className="accuse__name">
                <MarkableText id={`accuse-${s.id}`} text={s.name} />
              </span>
              <span className="accuse__role">{s.occupation}</span>
              {tried && <span className="accuse__tried" title="You already accused this suspect">Doesn't hold</span>}
            </li>
          );
        })}
      </ul>
      <div className="accuse__actions">
        <button type="button" className="px-btn px-btn--red" disabled={!accused} onClick={onSubmit}>
          <Gavel size={16} aria-hidden /> File accusation
        </button>
        <p className="accuse__feedback" role="status" aria-live="polite">
          {feedback}
        </p>
      </div>
    </section>
  );
}
