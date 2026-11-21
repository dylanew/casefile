import { formatTime } from '../lib/format';

/** A desk clock. It counts time on the case for your own record; there is no limit. */
export function InvestigationTimer({ elapsedMs, running, compact }: { elapsedMs: number; running: boolean; compact?: boolean }) {
  return (
    <div className={`timer${compact ? ' timer--compact' : ''}${running ? ' is-running' : ''}`} role="timer" aria-label={`Time on case ${formatTime(elapsedMs)}`}>
      {!compact && <span className="timer__label">TIME ON CASE</span>}
      <span className="timer__face">
        <span className="timer__dot" aria-hidden />
        <span className="timer__digits">{formatTime(elapsedMs)}</span>
      </span>
      {!compact && <span className="timer__note">{running ? 'No time limit' : 'Paused'}</span>}
    </div>
  );
}
