import { useEffect, useState } from 'react';
import { Check, Copy, Undo2 } from 'lucide-react';
import type { CaseFile } from '../cases/types';
import { formatTime, msUntilTomorrow } from '../lib/format';
import { PixelSprite } from './PixelSprite';

interface Props {
  caseFile: CaseFile;
  elapsedMs: number;
  hintsUsed: number;
  wrongAttempts: number;
  onClose: () => void;
}

function useCountdown() {
  const [ms, setMs] = useState(() => msUntilTomorrow());
  useEffect(() => {
    const id = window.setInterval(() => setMs(msUntilTomorrow()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return ms;
}

export function SolvedScreen({ caseFile, elapsedMs, hintsUsed, wrongAttempts, onClose }: Props) {
  const culprit = caseFile.suspects.find((s) => s.id === caseFile.solution.culpritId)!;
  const countdown = useCountdown();
  const [copied, setCopied] = useState<'idle' | 'ok' | 'fail'>('idle');

  const summary = [
    `CASEFILE No. ${caseFile.number}: ${caseFile.title}`,
    `Solved in ${formatTime(elapsedMs)}`,
    `${'■'.repeat(hintsUsed)}${'□'.repeat(caseFile.hints.length - hintsUsed)} hints · ${wrongAttempts} wrong accusation${wrongAttempts === 1 ? '' : 's'}`,
  ].join('\n');

  const copy = () => {
    navigator.clipboard
      ?.writeText(summary)
      .then(() => setCopied('ok'))
      .catch(() => setCopied('fail'));
    if (!navigator.clipboard) setCopied('fail');
  };

  return (
    <div className="report">
      <header className="report__head">
        <span className="report__label">Case report · No. {caseFile.number}</span>
        <h2 className="report__title">Case closed</h2>
      </header>

      <div className="report__culprit">
        <span className="report__mug" style={{ background: culprit.portraitBg }}>
          <PixelSprite sprite={culprit.portrait} />
        </span>
        <div>
          <p className="report__headline">{caseFile.solution.headline}</p>
          <p className="report__sub">{culprit.occupation}, age {culprit.age}</p>
        </div>
      </div>

      <dl className="report__stats">
        <div><dt>Time on case</dt><dd>{formatTime(elapsedMs)}</dd></div>
        <div><dt>Hints used</dt><dd>{hintsUsed} / {caseFile.hints.length}</dd></div>
        <div><dt>Wrong accusations</dt><dd>{wrongAttempts}</dd></div>
      </dl>

      <section>
        <h3 className="profile__section">How it fits together</h3>
        <ol className="report__steps">
          {caseFile.solution.deductions.map((d, i) => (
            <li key={i}>
              <strong>{d.title}.</strong> {d.text}
            </li>
          ))}
        </ol>
        <p className="report__epilogue">{caseFile.solution.epilogue}</p>
      </section>

      <footer className="report__foot">
        <p className="report__next">
          Next case arrives in <span className="tabular">{formatTime(countdown)}</span>
        </p>
        <div className="report__actions">
          <button type="button" className="px-btn" onClick={copy}>
            {copied === 'ok' ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
            {copied === 'ok' ? 'Copied' : 'Copy result'}
          </button>
          <button type="button" className="px-btn px-btn--red" onClick={onClose}>
            <Undo2 size={16} aria-hidden /> Back to the desk
          </button>
        </div>
        {copied === 'fail' && <pre className="report__share">{summary}</pre>}
      </footer>
    </div>
  );
}
