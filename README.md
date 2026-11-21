# CASEFILE

A cozy daily detective logic puzzle, played from a fixed top-down view of a detective's desk.
Read the case sheet, open the suspect files, cross-reference the evidence and name the culprit.

This is the first frontend prototype: one complete mystery (Case 001, *The Blue Widow*), no backend.

## Run it

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build in dist/
npm run build:single # everything inlined into one HTML file in dist-single/
```

## How it's organised

```
src/
  cases/            Puzzle data, separate from the UI
    types.ts        CaseFile / Suspect / EvidenceItem types
    case001.ts      The Blue Widow (includes a logic table proving one solution)
    index.ts        CASES list and getDailyCase()
  components/
    DetectiveDesk   Layout, desk objects, overlays, accusation flow
    CaseSheet       The central document (+ MarkingToolbar, AccusationPanel)
    Marking         Click/drag highlight, cross-out, erase; per-stroke undo
    SuspectFiles    Folder stack on the desk + tabbed folder overlay
    SuspectProfile  One suspect's file
    HintFolder      Three sealed hints, opened one at a time
    InvestigationTimer, DetectiveNotebook, SolvedScreen, ClosedFolder
    SoundController Mute toggle + sound context
    DeskProps       Lamp, mug, typewriter, pencil, magnifier, clips, photos
    PixelSprite     Renders character-grid sprites as crisp SVG
  art/              Procedural pixel-art sprites (no image files)
  lib/
    progress.ts     Reducer + localStorage persistence + timer
    sound.ts        Web Audio synth (stamp, error, paper, pencil...)
  styles/           base.css (tokens), desk.css, documents.css
```

## Adding a mystery

Create `src/cases/caseNNN.ts` exporting a `CaseFile`, then add it to `CASES` in `src/cases/index.ts`.
Text in the summary, evidence, instructions and suspect files is automatically markable.
Portraits are 16×16 character grids with a palette, so no image assets are needed.

Design rule for cases: every innocent suspect should fail at least one evidence test, the culprit should
pass all of them, and no single sentence should give the answer away.

## Notes

- Progress (marks, notes, hints, timer, solved state) is saved per case in localStorage.
- The timer only runs while the case is open, unsolved and the tab is visible.
- Sounds are synthesised with Web Audio, so there are no audio files. The mute setting is remembered.
- Fonts: Press Start 2P (labels) and Courier Prime (documents) from Google Fonts.
