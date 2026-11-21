import type { Suspect } from '../cases/types';
import { clipSprite } from '../art/props';
import { MarkableText } from './Marking';
import { PixelSprite } from './PixelSprite';

export function SuspectProfile({ suspect, index }: { suspect: Suspect; index: number }) {
  const p = `sus-${suspect.id}`;
  return (
    <article className="profile paper" aria-labelledby={`${p}-name`}>
      <header className="profile__head">
        <div className="profile__photo" style={{ background: suspect.portraitBg }}>
          <PixelSprite sprite={clipSprite} className="profile__clip" />
          <PixelSprite sprite={suspect.portrait} className="profile__portrait" title={`Portrait of ${suspect.name}`} />
          <span className="profile__plate">No. {String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="profile__id">
          <span className="profile__label">Suspect file</span>
          <h3 id={`${p}-name`} className="profile__name">
            <MarkableText id={`${p}-name`} text={suspect.name} />
          </h3>
          <dl className="profile__facts">
            <div><dt>Age</dt><dd>{suspect.age}</dd></div>
            <div><dt>Occupation</dt><dd>{suspect.occupation}</dd></div>
          </dl>
        </div>
      </header>
      <section>
        <h4 className="profile__section">Background</h4>
        <p className="sheet__p"><MarkableText id={`${p}-bg`} text={suspect.background} /></p>
      </section>
      <section>
        <h4 className="profile__section">Alibi</h4>
        <p className="sheet__p profile__alibi"><MarkableText id={`${p}-alibi`} text={suspect.alibi} /></p>
      </section>
      <section>
        <h4 className="profile__section">Characteristics</h4>
        <ul className="profile__list">
          {suspect.characteristics.map((c, i) => (
            <li key={i}><MarkableText id={`${p}-c${i}`} text={c} /></li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className="profile__section">Investigator's notes</h4>
        <ul className="profile__list profile__list--typed">
          {suspect.notes.map((c, i) => (
            <li key={i}><MarkableText id={`${p}-n${i}`} text={c} /></li>
          ))}
        </ul>
      </section>
    </article>
  );
}
