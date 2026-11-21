import { FolderOpen } from 'lucide-react';
import type { CaseFile } from '../cases/types';

/** The sealed case folder shown before the investigation starts. */
export function ClosedFolder({ caseFile, onOpen }: { caseFile: CaseFile; onOpen: () => void }) {
  return (
    <div className="folder-closed">
      <span className="folder-closed__tab">CASE No. {caseFile.number}</span>
      <div className="folder-closed__cover">
        <span className="folder-closed__stamp">Confidential</span>
        <span className="folder-closed__eyebrow">Port Ashby Police · Detective Bureau</span>
        <h2 className="folder-closed__title">{caseFile.title}</h2>
        <p className="folder-closed__sub">{caseFile.dateline} · {caseFile.location}</p>
        <span className="folder-closed__string" aria-hidden />
        <button type="button" className="px-btn px-btn--red px-btn--big" onClick={onOpen} autoFocus>
          <FolderOpen size={18} aria-hidden /> Open the case file
        </button>
        <p className="folder-closed__note">The clock starts when you open the file. There is no time limit.</p>
      </div>
    </div>
  );
}
