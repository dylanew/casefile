/**
 * Tiny Web Audio synthesiser for desk sounds. No audio files: every sound is generated,
 * so the prototype stays self-contained. The context is created lazily on first use,
 * which always happens inside a click handler (browsers require a gesture).
 */
export type SoundName = 'stamp' | 'error' | 'paper' | 'pencil' | 'reveal' | 'click';

let ctx: AudioContext | null = null;
let noiseBuffer: AudioBuffer | null = null;

function audio(): AudioContext | null {
  try {
    if (!ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function noise(ac: AudioContext): AudioBuffer {
  if (!noiseBuffer) {
    noiseBuffer = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}

function burst(ac: AudioContext, opts: { at?: number; dur: number; gain: number; type: BiquadFilterType; freq: number; q?: number }) {
  const t = ac.currentTime + (opts.at ?? 0);
  const src = ac.createBufferSource();
  src.buffer = noise(ac);
  const filter = ac.createBiquadFilter();
  filter.type = opts.type;
  filter.frequency.value = opts.freq;
  filter.Q.value = opts.q ?? 0.8;
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(opts.gain, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t + opts.dur);
  src.connect(filter).connect(g).connect(ac.destination);
  src.start(t, Math.random() * 0.5);
  src.stop(t + opts.dur + 0.05);
}

function tone(ac: AudioContext, opts: { at?: number; dur: number; gain: number; type: OscillatorType; from: number; to?: number }) {
  const t = ac.currentTime + (opts.at ?? 0);
  const osc = ac.createOscillator();
  osc.type = opts.type;
  osc.frequency.setValueAtTime(opts.from, t);
  if (opts.to) osc.frequency.exponentialRampToValueAtTime(opts.to, t + opts.dur);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(opts.gain, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + opts.dur);
  osc.connect(g).connect(ac.destination);
  osc.start(t);
  osc.stop(t + opts.dur + 0.05);
}

export function playSound(name: SoundName): void {
  const ac = audio();
  if (!ac) return;
  switch (name) {
    case 'stamp':
      // Wooden handle knock, then the rubber thud on paper.
      burst(ac, { dur: 0.04, gain: 0.35, type: 'bandpass', freq: 2600, q: 1.2 });
      tone(ac, { at: 0.01, dur: 0.32, gain: 0.9, type: 'sine', from: 150, to: 42 });
      burst(ac, { at: 0.01, dur: 0.22, gain: 0.6, type: 'lowpass', freq: 900 });
      burst(ac, { at: 0.03, dur: 0.12, gain: 0.12, type: 'highpass', freq: 3500 });
      break;
    case 'error':
      tone(ac, { dur: 0.13, gain: 0.07, type: 'square', from: 196 });
      tone(ac, { at: 0.15, dur: 0.2, gain: 0.07, type: 'square', from: 147 });
      break;
    case 'paper':
      burst(ac, { dur: 0.18, gain: 0.16, type: 'bandpass', freq: 2200, q: 0.6 });
      burst(ac, { at: 0.08, dur: 0.14, gain: 0.1, type: 'bandpass', freq: 3400, q: 0.6 });
      break;
    case 'pencil':
      burst(ac, { dur: 0.05, gain: 0.06, type: 'highpass', freq: 4200 });
      break;
    case 'reveal':
      burst(ac, { dur: 0.25, gain: 0.12, type: 'bandpass', freq: 1800, q: 0.5 });
      tone(ac, { at: 0.12, dur: 0.18, gain: 0.05, type: 'square', from: 523 });
      tone(ac, { at: 0.22, dur: 0.24, gain: 0.05, type: 'square', from: 784 });
      break;
    case 'click':
      tone(ac, { dur: 0.05, gain: 0.05, type: 'square', from: 880, to: 660 });
      break;
  }
}
