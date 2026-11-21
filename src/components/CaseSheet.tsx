import { FileText } from 'lucide-react';
import type { CaseFile } from '../cases/types';
import type { Progress, ProgressAction, Tool } from '../lib/progress';
import { clipSprite } from '../art/props';
import { AccusationPanel } from './AccusationPanel';
import { MarkableText } from './Marking';
import { MarkingToolbar } from './MarkingToolbar';
import { PixelSprite } from './PixelSprite';

interface Props {
  caseFile: CaseFile;
  progress: Progress;
  dispatch: (a: ProgressAction) => void;
  tool: Tool;
  onTool: (t: Tool) => void;
  onSubmit: () => void;
  feedback: string | null;
  shaking: boolean;
  stampAnimating: boolean;
  onViewReport: () => void;
}

export function CaseSheet({
  caseFile, progress, dispatch, tool, onTool, onSubmit, feedback, shaking, stampAnimating, onViewReport,
}: Props) {
  return (
    <article className={`sheet paper${shaking ? ' is-shaking' : ''}`} aria-label={`Case ${caseFile.number}: ${caseFile.title}`}>
      <PixelSprite sprite={clipSprite} className="sheet__clip" />
      <header className="sheet__head">
        <div className="sheet__meta">
          <span className="sheet__no">CASE No. {caseFile.number}</span>
          <span className="sheet__confidential">Confidential</span>
        </div>
        <h2 className="sheet__title">{caseFile.title}</h2>
        <p className="sheet__dateline">
          {caseFile.dateline} · {caseFile.location}
        </p>
      </header>

      <MarkingToolbar
        tool={tool}
        onTool={onTool}
        canUndo={progress.history.length > 0}
        hasMarks={Object.keys(progress.marks).length > 0}
        onUndo={() => dispatch({ type: 'undo' })}
        onClear={() => dispatch({ type: 'clearMarks' })}
      />

      <section aria-labelledby="crime-title">
        <h3 id="crime-title" className="sheet__heading">The crime</h3>
        {caseFile.summary.map((p, i) => (
          <p key={i} className="sheet__p">
            <MarkableText id={`sum-${i}`} text={p} />
          </p>
        ))}
      </section>

      <section aria-labelledby="evidence-title">
        <h3 id="evidence-title" className="sheet__heading">Evidence</h3>
        <ol className="evidence">
          {caseFile.evidence.map((e) => (
            <li key={e.id} className="evidence__item">
              <span className="evidence__tag" aria-hidden>{e.label}</span>
              <div className="evidence__body">
                <h4 className="evidence__title">
                  <span className="sr-only">Evidence {e.label}: </span>
                  {e.title}
                </h4>
                <p className="sheet__p">
                  <MarkableText id={`${e.id}-t`} text={e.text} />
                </p>
                {e.table && (
                  <table className="ledger">
                    <tbody>
                      {e.table.map((row, i) => (
                        <tr key={i}>
                          <th scope="row"><MarkableText id={`${e.id}-r${i}l`} text={row.left} /></th>
                          <td><MarkableText id={`${e.id}-r${i}r`} text={row.right} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="orders-title" className="orders">
        <h3 id="orders-title" className="sheet__heading">Your orders</h3>
        <ul>
          {caseFile.instructions.map((t, i) => (
            <li key={i}><MarkableText id={`ins-${i}`} text={t} /></li>
          ))}
        </ul>
      </section>

      {progress.solved ? (
        <section className="accuse accuse--closed">
          <h3 className="sheet__heading">Accusation</h3>
          <p className="sheet__p">
            Filed against <strong>{caseFile.suspects.find((s) => s.id === caseFile.solution.culpritId)?.name}</strong>. The case is closed.
          </p>
          <button type="button" className="px-btn" onClick={onViewReport}>
            <FileText size={16} aria-hidden /> Read case report
          </button>
        </section>
      ) : (
        <AccusationPanel
          suspects={caseFile.suspects}
          accused={progress.accused}
          wrongAttempts={progress.wrongAttempts}
          onSelect={(id) => dispatch({ type: 'select', suspectId: id })}
          onSubmit={onSubmit}
          feedback={feedback}
        />
      )}

      {progress.solved && (
        <div className={`stamp${stampAnimating ? ' stamp--slam' : ''}`} aria-hidden>
          <span>SOLVED</span>
        </div>
      )}
    </article>
  );
}
