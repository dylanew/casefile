import type { CaseFile } from './types';

/*
 * CASE 001 — THE BLUE WIDOW
 *
 * Logic check (each innocent fails exactly one test, the culprit passes all):
 *
 *                      knew new code   left hand   smoked in vault   free at 11:12
 *   Harold Pike             yes           NO            yes               yes
 *   Vera Lang               yes           yes           yes               NO (on stage)
 *   Felix Durand            yes           yes           yes               yes   <- culprit
 *   Ingrid Moss             yes           yes           NO (asthma)       yes
 *   Cyril Webb              NO (5:30)     yes           yes               yes
 *
 * "Knew new code" = signed into the manager's office after the 6:00 PM change.
 * Felix's alibi (telegram to Room 412) is also contradicted by the guest register.
 */

const skinLight = '#E8C3A0';
const skinMid = '#C99772';
const skinDeep = '#9A6A4C';

export const case001: CaseFile = {
  id: 'case-001',
  number: '001',
  title: 'The Blue Widow',
  dateline: 'Night of 14 November',
  location: 'Hotel Marlowe, Port Ashby',
  summary: [
    "At some point last night the Blue Widow, a sapphire necklace belonging to the Countess Albrecht, vanished from the vault-room safe of the Hotel Marlowe.",
    "The safe was not forced. Whoever opened it knew the combination. Five people in the building could plausibly have done it, and each of them swears they are innocent.",
  ],
  evidence: [
    {
      id: 'e1',
      label: 'A',
      title: 'Safe counter',
      text: "The Halvorsen safe counts every turn of its handle. The counter shows a single attempt all night, at 11:12 PM. It opened first time, so the thief dialled the correct combination without fumbling.",
    },
    {
      id: 'e2',
      label: 'B',
      title: 'The combination',
      text: "Night manager Harold Pike changed the combination at 6:00 PM. As usual he wrote the new numbers on the blotter in the manager's office and nowhere else. Pike insists nobody enters his office without signing the visitor sheet.",
    },
    {
      id: 'e3',
      label: 'C',
      title: "Manager's office visitor sheet",
      text: 'Every visitor after lunch, in order:',
      table: [
        { left: '5:30 PM', right: 'C. Webb, to bleed the radiator' },
        { left: '7:05 PM', right: 'V. Lang, to collect wages' },
        { left: '9:20 PM', right: 'I. Moss, complaint about noise' },
        { left: '10:40 PM', right: 'F. Durand, delivering telegrams' },
      ],
    },
    {
      id: 'e4',
      label: 'D',
      title: 'Smudges on the dial',
      text: "The dial is notoriously stiff. The police technician found fresh smudges showing it was spun with a left hand, and says nobody could work it that quickly with their weaker hand.",
    },
    {
      id: 'e5',
      label: 'E',
      title: 'Cigarette stub',
      text: "A Gold Crest cigarette, smoked right down to the band, lay crushed on the vault-room floor. The room was swept at 10:45 PM, and its door log shows only one visit after that. Whoever opened the safe stood there and smoked it to the end.",
    },
    {
      id: 'e6',
      label: 'F',
      title: 'Guest register, fourth floor',
      text: 'Front desk register for the night:',
      table: [
        { left: 'Room 407', right: 'Mr and Mrs Hale' },
        { left: 'Room 409', right: 'Dr. A. Fenwick' },
        { left: 'Room 412', right: 'Vacant, guest checked out at noon' },
        { left: 'Room 415', right: 'Countess Albrecht (suite)' },
      ],
    },
  ],
  instructions: [
    'Every item of evidence describes the thief. Open the suspect files and test each person against every item.',
    'Use the pencil to highlight what matters and cross out who is cleared.',
    'When only one person fits every fact, name them below and file your accusation.',
  ],
  suspects: [
    {
      id: 'pike',
      name: 'Harold Pike',
      age: 52,
      occupation: 'Night manager',
      portraitBg: '#2B3A47',
      portrait: {
        palette: { h: '#A4B1B7', s: skinLight, d: '#B98D6E', e: '#1A1A1A', c: '#202D38', w: '#F1E8D4', r: '#A74440' },
        rows: [
          '................',
          '................',
          '....ssssssss....',
          '...hsssssssshh..',
          '...hsssssssshh..',
          '...hsessssesh...',
          '...ssssssssss...',
          '...ssssddssss...',
          '...sshhhhhhss...',
          '....sssddsss....',
          '.....ssssss.....',
          '......ssss......',
          '....ccwrrwcc....',
          '..ccccwrrwcccc..',
          '.cccccwrrwccccc.',
          'cccccccrrccccccc',
        ],
      },
      background:
        'Twenty years at the Marlowe and proud of every one. He was passed over for the general manager job this spring and has not hidden his bitterness about it.',
      alibi: 'Says he was alone in his office all evening, working through the accounts. Nobody saw him after the last visitor left.',
      characteristics: [
        'Smokes Gold Crest, a pack a day. The ashtray on his desk is always full.',
        'Lost the use of his left hand at Anzio. He writes, eats and shakes hands with his right.',
      ],
      notes: ['He set the new combination himself, so he certainly knew it.'],
    },
    {
      id: 'lang',
      name: 'Vera Lang',
      age: 31,
      occupation: 'Lounge singer',
      portraitBg: '#3A2530',
      portrait: {
        palette: { h: '#5A2424', s: skinMid, d: '#A87856', e: '#1A1A1A', c: '#A74440', g: '#D3A35B', r: '#7A1E1E' },
        rows: [
          '....hhhhhhhh....',
          '...hhhhhhhhhh...',
          '..hhhhhhhhhhhh..',
          '..hhhsssssshhh..',
          '..hhsssssssshh..',
          '..hhsesssseshh..',
          '..hhsssssssshh..',
          '..hhsssddssshh..',
          '..hhsssssssshh..',
          '..hhhssrrsshhh..',
          '..hhg.ssss.ghh..',
          '..hh..ssss..hh..',
          '..hh.ssssss.hh..',
          '..ssssssssssss..',
          '.sccccccccccccs.',
          'sccccccccccccccs',
        ],
      },
      background:
        "Headliner in the Velvet Room downstairs for two seasons. Word in the kitchen is that she owes a good deal of money to a bookmaker on Dock Street.",
      alibi:
        'Performing her second set in the Velvet Room from 10:30 to 11:30 PM. The bandleader and a full room of about eighty guests confirm she never left the stage.',
      characteristics: [
        'Holds the microphone in her left hand and signs autographs with it too.',
        'Smokes Gold Crest between sets, in a long ivory holder.',
      ],
      notes: ['Collected her wages from the manager\'s office early in the evening.'],
    },
    {
      id: 'durand',
      name: 'Felix Durand',
      age: 24,
      occupation: 'Bellhop',
      portraitBg: '#2E2A22',
      portrait: {
        palette: { h: '#3B2A1E', s: skinLight, d: '#B98D6E', e: '#1A1A1A', c: '#8E3A36', C: '#5E2422', g: '#D3A35B', w: '#F1E8D4' },
        rows: [
          '................',
          '.....cccccc.....',
          '....cccccccc....',
          '...gggggggggg...',
          '...hssssssssh.w.',
          '...hsessssesh...',
          '...ssssssssss...',
          '...ssssddssss...',
          '...ssssssssss...',
          '....sssdddss....',
          '.....ssssss.....',
          '......ssss......',
          '....CCwwwwCC....',
          '..ccccCwwCcccc..',
          '.cccccgccgccccc.',
          'cccccccggccccccc',
        ],
      },
      background:
        'Joined the Marlowe three months ago with a glowing reference nobody has checked. Quick hands. The other bellhops have stopped playing cards with him.',
      alibi:
        'Says that at 11:10 PM he was carrying a late telegram up to Room 412, and that he took his time on the stairs.',
      characteristics: [
        'Carries luggage on his right arm and signs the delivery book with his left.',
        'Never without a Gold Crest tucked behind his ear.',
      ],
      notes: ['Dropped the evening telegrams at the manager\'s office before the second set ended.'],
    },
    {
      id: 'moss',
      name: 'Ingrid Moss',
      age: 38,
      occupation: "The Countess's companion",
      portraitBg: '#26323A',
      portrait: {
        palette: { h: '#8A7A5A', s: skinLight, d: '#B98D6E', e: '#1A1A1A', c: '#5A6670', w: '#F1E8D4', g: '#D3A35B', r: '#9A5A50' },
        rows: [
          '......hhhh......',
          '.....hhhhhh.....',
          '....hhhhhhhh....',
          '...hhhhhhhhhh...',
          '...hhsssssshh...',
          '...hgeggggegh...',
          '...ssssssssss...',
          '...ssssddssss...',
          '...ssssssssss...',
          '....sssrrsss....',
          '.....ssssss.....',
          '......wwww......',
          '....ccwwwwcc....',
          '..cccccwwccccc..',
          '.cccccccgcccccc.',
          'cccccccccccccccc',
        ],
      },
      background:
        "Has travelled with the Countess for six years and knows the Blue Widow better than its owner. A maid overheard the two of them arguing bitterly about unpaid wages yesterday afternoon.",
      alibi: 'Says she was reading alone in Room 309 all evening. Nobody can confirm it.',
      characteristics: [
        'Writes her letters left-handed. The edge of her left hand is always smudged with ink.',
        'Badly asthmatic. A single cigarette in a closed room leaves her wheezing, and she has never smoked.',
      ],
      notes: ['Visited the manager\'s office to complain about the noise from the lounge.'],
    },
    {
      id: 'webb',
      name: 'Cyril Webb',
      age: 45,
      occupation: 'Maintenance man',
      portraitBg: '#2A2A26',
      portrait: {
        palette: { h: '#4A3A2A', C: '#4E4A40', s: skinDeep, d: '#7A5038', e: '#1A1A1A', r: '#A74440', c: '#3E5566' },
        rows: [
          '................',
          '....CCCCCCCC....',
          '...CCCCCCCCCC...',
          '..CCCCCCCCCCCC..',
          '...hssssssssh...',
          '...hsessssesh...',
          '...ssssssssss...',
          '...ssssddssss...',
          '...sddssssdds...',
          '....ddsddsdd....',
          '.....dddddd.....',
          '......ssss......',
          '....rrssssrr....',
          '..rrrcrrrrcrrr..',
          '.rrrrccccccrrrr.',
          'rrrrrccccccrrrrr',
        ],
      },
      background:
        'Served four years for burglary in 1938 and has kept his nose clean ever since. He knows every pipe, lock and back stair in the building.',
      alibi: 'Says he spent the whole night in the basement nursing the old boiler. Nobody went down to check on him.',
      characteristics: [
        'Left-handed. His wrench hangs on the left of his tool belt.',
        'Rolls nothing himself. He buys Gold Crest by the carton.',
      ],
      notes: ["Was called up to the manager's office to see to a rattling radiator."],
    },
  ],
  hints: [
    'Every item of evidence describes the thief. A suspect only has to fail one test to be cleared, so check each person against each item, not just the obvious ones.',
    "Look at when the combination was changed, then compare it with the times on the office visitor sheet. One visit came too early to be any use to a thief.",
    'Only three suspects both work with their left hand and saw the new combination. One of them could not have smoked that cigarette, and one was in front of eighty witnesses at 11:12. Check the last one\'s alibi against the guest register.',
  ],
  solution: {
    culpritId: 'durand',
    headline: 'Felix Durand stole the Blue Widow.',
    deductions: [
      {
        title: 'The thief knew the new combination',
        text: "The safe opened on the first attempt (A), and the new numbers existed only on Pike's blotter from 6:00 PM (B). Cyril Webb's visit at 5:30 PM came before the change (C), so he never saw them.",
      },
      {
        title: 'The thief used their left hand',
        text: "The stiff dial was spun left-handed by someone using their stronger hand (D). Harold Pike knew the code, but he has no use of his left hand.",
      },
      {
        title: 'The thief smoked in the vault room',
        text: 'Someone stood and smoked a Gold Crest to the band after the 10:45 PM sweep (E). Ingrid Moss is badly asthmatic and has never smoked.',
      },
      {
        title: 'The thief was free at 11:12 PM',
        text: "Vera Lang was on stage before eighty witnesses from 10:30 to 11:30 PM, so she could not have been at the safe (A).",
      },
      {
        title: 'Only one suspect remains, and his alibi is false',
        text: 'Felix Durand saw the blotter at 10:40 PM, signs with his left hand and smokes Gold Crest. He claims he took a telegram to Room 412 at 11:10, but the register shows Room 412 has been empty since noon (F).',
      },
    ],
    epilogue:
      "The Blue Widow was found sewn into the lining of a bellhop's spare jacket, in a locker that smelled faintly of Gold Crest.",
  },
};
