/** 轻快悦耳 BGM — 柔和正弦琶音，无刺耳方波 */
import { resumeAudio } from './audio.js?v=20260710e';

let ctx = null;
let masterGain = null;
let playing = false;
let timerId = null;
let step = 0;

/** 五声音阶旋律，慢速、柔和 */
const THEMES = {
  morning:  { melody: [523, 587, 659, 784, 659, 587, 523, 392], bpm: 72 },
  summer:   { melody: [392, 440, 494, 587, 523, 440, 392, 330], bpm: 76 },
  chat:     { melody: [440, 523, 587, 523, 440, 349, 392, 440], bpm: 70 },
  caffeine: { melody: [523, 659, 784, 659, 587, 523, 440, 523], bpm: 80 },
  kitchen:  { melody: [349, 392, 440, 523, 440, 392, 349, 294], bpm: 68 },
  golden:   { melody: [523, 659, 784, 880, 784, 659, 587, 523], bpm: 74 },
  finale:   { melody: [392, 523, 659, 784, 659, 523, 440, 392], bpm: 78 },
};

function getAudio() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.045;
    masterGain.connect(ctx.destination);
  }
  return ctx;
}

function softNote(freq, dur, vol = 0.08) {
  const c = getAudio();
  const t0 = c.currentTime;
  const osc = c.createOscillator();
  const g = c.createGain();
  const filter = c.createBiquadFilter();
  osc.type = 'sine';
  osc.frequency.value = freq;
  filter.type = 'lowpass';
  filter.frequency.value = 1800;
  g.gain.setValueAtTime(0.001, t0);
  g.gain.linearRampToValueAtTime(vol, t0 + 0.04);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  osc.connect(filter);
  filter.connect(g);
  g.connect(masterGain);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

export function startBgm(tileSetId) {
  stopBgm();
  resumeAudio();
  const theme = THEMES[tileSetId] || THEMES.morning;
  playing = true;
  step = 0;
  const beatMs = (60 / theme.bpm) * 1000;

  const tick = () => {
    if (!playing) return;
    const freq = theme.melody[step % theme.melody.length];
    softNote(freq, 0.55, 0.07);
    // 偶发低八度和声，更温暖
    if (step % 2 === 0) softNote(freq / 2, 0.7, 0.03);
    step++;
    timerId = setTimeout(tick, beatMs);
  };
  tick();
}

export function stopBgm() {
  playing = false;
  if (timerId) clearTimeout(timerId);
  timerId = null;
}

/** 通关喝彩短旋律 */
export function playCheer() {
  resumeAudio();
  const notes = [523, 659, 784, 1047, 784, 1047];
  notes.forEach((f, i) => {
    setTimeout(() => softNote(f, 0.35, 0.1), i * 90);
  });
}
