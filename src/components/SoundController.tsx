import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { playSound, type SoundName } from '../lib/sound';
import { loadJSON, saveJSON } from '../lib/storage';

interface SoundApi {
  muted: boolean;
  toggleMute: () => void;
  play: (name: SoundName) => void;
}

const SoundContext = createContext<SoundApi>({ muted: false, toggleMute: () => {}, play: () => {} });

const KEY = 'casefile:settings';

export function SoundController({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(() => loadJSON(KEY, { muted: false }).muted);
  useEffect(() => saveJSON(KEY, { muted }), [muted]);

  const play = useCallback((name: SoundName) => {
    if (!muted) playSound(name);
  }, [muted]);
  const toggleMute = useCallback(() => setMuted((m) => !m), []);
  const api = useMemo(() => ({ muted, toggleMute, play }), [muted, toggleMute, play]);

  return <SoundContext.Provider value={api}>{children}</SoundContext.Provider>;
}

export function useSound() {
  return useContext(SoundContext);
}

export function MuteToggle() {
  const { muted, toggleMute } = useSound();
  return (
    <button
      type="button"
      className="px-btn px-btn--icon"
      onClick={toggleMute}
      aria-pressed={muted}
      aria-label={muted ? 'Turn sound on' : 'Mute sound'}
      title={muted ? 'Sound off' : 'Sound on'}
    >
      {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </button>
  );
}
