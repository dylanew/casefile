import type { CSSProperties } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Suspect } from '../cases/types';
import type { Mark } from '../lib/progress';
import { PixelSprite } from './PixelSprite';
import { SuspectProfile } from './SuspectProfile';
import { useSound } from './SoundController';

/** The stack of folders on the desk. */
export function SuspectStack({ suspects, onOpen }: { suspects: Suspect[]; onOpen: () => void }) {
  return (
    <button type="button" className="desk-object stack" onClick={onOpen} aria-label={`Open suspect files, ${suspects.length} folders`}>
      <span className="stack__folders" aria-hidden>
        {suspects.slice(0, 4).map((s, i) => (
          <span key={s.id} className="stack__folder" style={{ '--i': i } as CSSProperties}>
            <span className="stack__tab">{s.name.split(' ')[1]}</span>
          </span>
        ))}
        <span className="stack__front">
          <span className="stack__label">SUSPECTS</span>
          <span className="stack__count">{suspects.length} FILES</span>
          <span className="stack__faces">
            {suspects.map((s) => (
              <span key={s.id} className="stack__face" style={{ background: s.portraitBg }}>
                <PixelSprite sprite={s.portrait} />
              </span>
            ))}
          </span>
        </span>
      </span>
    </button>
  );
}

interface FilesProps {
  suspects: Suspect[];
  index: number;
  onIndex: (i: number) => void;
  marks: Record<string, Mark>;
}

/** The opened folders: index tabs across the top, one profile at a time. */
export function SuspectFiles({ suspects, index, onIndex, marks }: FilesProps) {
  const { play } = useSound();
  const go = (i: number) => {
    const next = (i + suspects.length) % suspects.length;
    if (next !== index) play('paper');
    onIndex(next);
  };
  return (
    <div className="files">
      <div className="files__tabs" role="tablist" aria-label="Suspects">
        {suspects.map((s, i) => {
          const crossed = marks[`accuse-${s.id}:0`] === 'strike' || marks[`sus-${s.id}-name:0`] === 'strike';
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`files__tab${i === index ? ' is-active' : ''}${crossed ? ' is-crossed' : ''}`}
              onClick={() => go(i)}
            >
              {s.name.split(' ')[1].toUpperCase()}
            </button>
          );
        })}
      </div>
      <div className="files__body" role="tabpanel">
        <SuspectProfile key={suspects[index].id} suspect={suspects[index]} index={index} />
      </div>
      <div className="files__nav">
        <button type="button" className="px-btn" onClick={() => go(index - 1)}>
          <ChevronLeft size={16} aria-hidden /> Prev
        </button>
        <span className="files__count">{index + 1} / {suspects.length}</span>
        <button type="button" className="px-btn" onClick={() => go(index + 1)}>
          Next <ChevronRight size={16} aria-hidden />
        </button>
      </div>
    </div>
  );
}
