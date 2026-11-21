import { NotebookPen } from 'lucide-react';

export function DetectiveNotebook({ notes, onChange }: { notes: string; onChange: (t: string) => void }) {
  return (
    <div className="notebook">
      <div className="notebook__rings" aria-hidden>
        {Array.from({ length: 7 }, (_, i) => <span key={i} />)}
      </div>
      <label className="notebook__title" htmlFor="notebook-text">
        <NotebookPen size={14} aria-hidden /> NOTEBOOK
      </label>
      <textarea
        id="notebook-text"
        className="notebook__text"
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Jot down who you have ruled out, and why."
        spellCheck={false}
      />
    </div>
  );
}
