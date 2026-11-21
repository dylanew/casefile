import { useCallback, useEffect, useRef, useState } from 'react';
import { FolderOpen, Lightbulb, NotebookPen, RotateCcw } from 'lucide-react';
import type { CaseFile } from '../cases/types';
import { useCaseProgress, type Tool } from '../lib/progress';
import { CaseSheet } from './CaseSheet';
import { ClosedFolder } from './ClosedFolder';
import { DetectiveNotebook } from './DetectiveNotebook';
import { EvidencePhotos, Lamp, Magnifier, Mug, PaperClips, Pencil, Typewriter } from './DeskProps';
import { HintFolder, HintTray } from './HintFolder';
import { InvestigationTimer } from './InvestigationTimer';
import { MarkingProvider } from './Marking';
import { Overlay } from './Overlay';
import { SolvedScreen } from './SolvedScreen';
import { MuteToggle, useSound } from './SoundController';
import { SuspectFiles, SuspectStack } from './SuspectFiles';

type Panel = 'suspects' | 'hints' | 'notes' | 'report' | null;

const WRONG_LINES = [
  "The evidence doesn't hold against {name}. Something in the file clears them.",
  'The captain shakes his head. {name} has an answer for at least one of the facts.',
  "Not {name}. Test them against every item of evidence again.",
];

export function DetectiveDesk({ caseFile }: { caseFile: CaseFile }) {
  const [progress, dispatch] = useCaseProgress(caseFile.id);
  const { play } = useSound();
  const [tool, setTool] = useState<Tool>('highlight');
  const [panel, setPanel] = useState<Panel>(null);
  const [suspectIndex, setSuspectIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);
  const [stampAnimating, setStampAnimating] = useState(false);
  const [confirmRestart, setConfirmRestart] = useState(false);
  const timers = useRef<number[]>([]);
  const [today] = useState(() => new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }));

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

  useEffect(() => {
    if (!confirmRestart) return;
    const t = window.setTimeout(() => setConfirmRestart(false), 3000);
    return () => window.clearTimeout(t);
  }, [confirmRestart]);

  const open = useCallback((p: Panel) => {
    if (!progress.opened) dispatch({ type: 'open' });
    play('paper');
    setPanel(p);
  }, [progress.opened, dispatch, play]);
  const close = useCallback(() => setPanel(null), []);

  const submit = () => {
    const id = progress.accused;
    if (!id) return;
    const suspect = caseFile.suspects.find((s) => s.id === id)!;
    if (id === caseFile.solution.culpritId) {
      setFeedback(null);
      dispatch({ type: 'solve' });
      setStampAnimating(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      later(() => play('stamp'), 380);
      later(() => setPanel('report'), 1900);
      later(() => setStampAnimating(false), 2000);
      return;
    }
    const repeat = progress.wrongAttempts.includes(id);
    dispatch({ type: 'wrong', suspectId: id });
    play('error');
    setShaking(true);
    later(() => setShaking(false), 500);
    const line = repeat
      ? `You have already accused ${suspect.name}. Look for the fact that clears them.`
      : WRONG_LINES[progress.wrongAttempts.length % WRONG_LINES.length].replace('{name}', suspect.name);
    setFeedback(line);
  };

  const running = progress.opened && !progress.solved;
  const hintsLeft = caseFile.hints.length - progress.hintsRevealed;

  return (
    <MarkingProvider tool={tool} marks={progress.marks} dispatch={dispatch}>
      <div className="desk">
        <header className="bar">
          <div className="bar__brand">
            <span className="logo" aria-label="Casefile">CASE<span>FILE</span></span>
            <span className="bar__issue">Daily case No. {caseFile.number} · {today}</span>
          </div>
          <div className="bar__actions">
            <span className="bar__timer">
              <InvestigationTimer elapsedMs={progress.elapsedMs} running={running} compact />
            </span>
            {progress.opened && (
              <button
                type="button"
                className={`px-btn px-btn--small${confirmRestart ? ' px-btn--red' : ''}`}
                onClick={() => {
                  if (!confirmRestart) return setConfirmRestart(true);
                  dispatch({ type: 'reset' });
                  setConfirmRestart(false);
                  setFeedback(null);
                  setPanel(null);
                  play('paper');
                }}
                title="Start this case again from scratch"
              >
                <RotateCcw size={14} aria-hidden />
                <span className="bar__btn-text">{confirmRestart ? 'Wipe all progress?' : 'Restart'}</span>
              </button>
            )}
            <MuteToggle />
          </div>
        </header>

        <div className="surface">
          <div className="lamplight" aria-hidden />

          <aside className="side side--left" aria-label="Suspects and notes">
            <Lamp />
            <SuspectStack suspects={caseFile.suspects} onOpen={() => open('suspects')} />
            <EvidencePhotos />
            <div className="side__notebook">
              <DetectiveNotebook notes={progress.notes} onChange={(t) => dispatch({ type: 'notes', text: t })} />
            </div>
          </aside>

          <main className="center">
            {progress.opened ? (
              <CaseSheet
                caseFile={caseFile}
                progress={progress}
                dispatch={dispatch}
                tool={tool}
                onTool={setTool}
                onSubmit={submit}
                feedback={feedback}
                shaking={shaking}
                stampAnimating={stampAnimating}
                onViewReport={() => open('report')}
              />
            ) : (
              <ClosedFolder caseFile={caseFile} onOpen={() => { dispatch({ type: 'open' }); play('paper'); }} />
            )}
            <Pencil />
          </main>

          <aside className="side side--right" aria-label="Hints and timer">
            <div className="clock">
              <InvestigationTimer elapsedMs={progress.elapsedMs} running={running} />
            </div>
            <HintTray revealed={progress.hintsRevealed} total={caseFile.hints.length} onOpen={() => open('hints')} />
            <Mug />
            <PaperClips />
            <Typewriter />
            <Magnifier />
          </aside>
        </div>

        <nav className="tray" aria-label="Desk drawers">
          <button type="button" className="tray__btn" onClick={() => open('suspects')}>
            <FolderOpen size={18} aria-hidden /> Suspects
          </button>
          <button type="button" className="tray__btn" onClick={() => open('hints')}>
            <Lightbulb size={18} aria-hidden /> Hints <span className="tray__badge">{hintsLeft}</span>
          </button>
          <button type="button" className="tray__btn" onClick={() => open('notes')}>
            <NotebookPen size={18} aria-hidden /> Notes
          </button>
        </nav>

        {panel === 'suspects' && (
          <Overlay label="Suspect files" onClose={close} className="overlay__panel--files">
            <SuspectFiles suspects={caseFile.suspects} index={suspectIndex} onIndex={setSuspectIndex} marks={progress.marks} />
          </Overlay>
        )}
        {panel === 'hints' && (
          <Overlay label="Hints" onClose={close} className="overlay__panel--hints">
            <HintFolder
              hints={caseFile.hints}
              revealed={progress.hintsRevealed}
              onReveal={() => { dispatch({ type: 'revealHint', max: caseFile.hints.length }); play('reveal'); }}
            />
          </Overlay>
        )}
        {panel === 'notes' && (
          <Overlay label="Notebook" onClose={close} className="overlay__panel--notes">
            <DetectiveNotebook notes={progress.notes} onChange={(t) => dispatch({ type: 'notes', text: t })} />
          </Overlay>
        )}
        {panel === 'report' && progress.solved && (
          <Overlay label="Case report" onClose={close} className="overlay__panel--report">
            <SolvedScreen
              caseFile={caseFile}
              elapsedMs={progress.elapsedMs}
              hintsUsed={progress.hintsRevealed}
              wrongAttempts={progress.wrongAttempts.length}
              onClose={close}
            />
          </Overlay>
        )}
      </div>
    </MarkingProvider>
  );
}
