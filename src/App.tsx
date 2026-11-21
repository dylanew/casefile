import { getDailyCase } from './cases';
import { DetectiveDesk } from './components/DetectiveDesk';
import { SoundController } from './components/SoundController';

const todaysCase = getDailyCase();

export default function App() {
  return (
    <SoundController>
      <DetectiveDesk caseFile={todaysCase} />
    </SoundController>
  );
}
