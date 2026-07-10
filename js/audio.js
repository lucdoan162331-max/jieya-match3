import { SFX_LINES } from './config.js?v=20260710d';

let audioCtx = null;
let recentSfx = [];

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

export function playTone(freq, duration = 0.1, type = 'sine', volume = 0.15) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (_) { /* silent */ }
}

function playNoise(duration, volume = 0.08, filterFreq = 800) {
  try {
    const ctx = getCtx();
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = filterFreq;
    const gain = ctx.createGain();
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start();
  } catch (_) { /* silent */ }
}

/** 每种元素独特消除音 */
const MATCH_SFX = {
  cola: () => { playTone(180, 0.05, 'square', 0.1); playNoise(0.14, 0.12, 1800); setTimeout(() => playNoise(0.1, 0.07, 2200), 50); },
  soda: () => { playNoise(0.12, 0.1, 1500); playTone(600, 0.04, 'sine', 0.08); },
  coffee: () => { playTone(200, 0.06, 'sine', 0.1); setTimeout(() => playTone(150, 0.1, 'sine', 0.08), 50); },
  americano: () => { playTone(200, 0.06, 'sine', 0.1); setTimeout(() => playTone(150, 0.1, 'sine', 0.08), 50); },
  latte: () => { playTone(400, 0.05, 'sine', 0.09); playNoise(0.06, 0.05, 400); },
  energy: () => { playTone(800, 0.04, 'square', 0.1); playTone(1200, 0.03, 'square', 0.08); },
  watermelon: () => { playTone(180, 0.08, 'sine', 0.12); playNoise(0.06, 0.1, 300); },
  popsicle: () => { playTone(880, 0.05, 'triangle', 0.1); playTone(1100, 0.04, 'triangle', 0.08); },
  fan: () => { playNoise(0.1, 0.06, 600); playTone(520, 0.04, 'sine', 0.06); },
  toast: () => { playTone(330, 0.06, 'triangle', 0.1); playTone(392, 0.05, 'triangle', 0.08); },
  sun: () => { [523, 659, 784].forEach((f, i) => setTimeout(() => playTone(f, 0.06, 'sine', 0.09), i * 35)); },
  alarm: () => { playTone(880, 0.06, 'square', 0.1); setTimeout(() => playTone(660, 0.06, 'square', 0.08), 60); },
  sticky: () => { playTone(500, 0.04, 'triangle', 0.08); },
  read: () => { playTone(600, 0.05, 'sine', 0.08); setTimeout(() => playTone(800, 0.04, 'sine', 0.07), 50); },
  emoji: () => { playTone(700, 0.05, 'sine', 0.1); playTone(900, 0.04, 'sine', 0.08); },
  heart: () => { playTone(523, 0.08, 'sine', 0.1); playTone(659, 0.1, 'sine', 0.09); },
  voice: () => { [400, 500, 600].forEach((f, i) => setTimeout(() => playTone(f, 0.04, 'square', 0.07), i * 30)); },
  bottle: () => { playTone(300, 0.1, 'sine', 0.1); playNoise(0.05, 0.05, 500); },
  cookie: () => { playTone(400, 0.04, 'triangle', 0.1); playTone(300, 0.05, 'triangle', 0.08); },
  muffin: () => { playTone(450, 0.06, 'sine', 0.09); },
  wok: () => { playTone(120, 0.08, 'square', 0.12); playTone(80, 0.1, 'sine', 0.1); },
  pan: () => { playTone(150, 0.07, 'square', 0.1); },
  pot: () => { playTone(120, 0.08, 'square', 0.12); },
  egg: () => { playTone(350, 0.05, 'sine', 0.1); },
  spatula: () => { playTone(500, 0.04, 'triangle', 0.08); },
  pepper: () => { playNoise(0.05, 0.08, 900); },
  goldenpie: () => { [523, 659, 784].forEach((f, i) => setTimeout(() => playTone(f, 0.07, 'sine', 0.1), i * 40)); },
  pie: () => { [523, 659].forEach((f, i) => setTimeout(() => playTone(f, 0.07, 'sine', 0.1), i * 40)); },
  pancake: () => { playTone(440, 0.06, 'triangle', 0.1); playTone(554, 0.05, 'triangle', 0.08); },
  tart: () => { playTone(587, 0.06, 'sine', 0.09); },
  donut: () => { playTone(494, 0.05, 'sine', 0.09); playTone(622, 0.05, 'sine', 0.07); },
  popcorn: () => { playNoise(0.04, 0.1, 2000); setTimeout(() => playNoise(0.04, 0.08, 2500), 60); },
  default: () => { playTone(520, 0.06, 'sine', 0.1); playTone(650, 0.08, 'sine', 0.08); },
};

export function playMatchTile(artKey, combo = 1) {
  const fn = MATCH_SFX[artKey] || MATCH_SFX.default;
  fn();
  if (combo >= 2) setTimeout(() => playTone(520 + combo * 40, 0.05, 'sine', 0.06), 80);
}

export function playMatch(combo = 1) {
  playMatchTile('default', combo);
}

export function playSwap() {
  playTone(440, 0.04, 'triangle', 0.06);
}

export function playInvalid() {
  playTone(300, 0.05, 'sine', 0.05);
  setTimeout(() => playTone(260, 0.06, 'sine', 0.04), 60);
}

export function playPotThrow() {
  playTone(150, 0.08, 'square', 0.12);
  setTimeout(() => playTone(100, 0.1, 'sine', 0.1), 60);
}

export function playCaffeine() {
  [400, 520, 640, 760].forEach((f, i) => setTimeout(() => playTone(f, 0.05, 'sine', 0.09), i * 40));
}

export function playMeetingTap() {
  playTone(500 + Math.random() * 200, 0.03, 'square', 0.06);
}

export function playWin() {
  [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => playTone(f, 0.18, 'sine', 0.1), i * 100));
}

export function randomSfxLine() {
  const pool = SFX_LINES.filter((l) => !recentSfx.includes(l));
  const pick = pool.length > 0
    ? pool[Math.floor(Math.random() * pool.length)]
    : SFX_LINES[Math.floor(Math.random() * SFX_LINES.length)];
  recentSfx.push(pick);
  if (recentSfx.length > 5) recentSfx.shift();
  return pick;
}

export function showSfxToast(text) {
  const el = document.getElementById('sfx-toast');
  if (!el) return;
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), 1600);
}

export function resumeAudio() {
  try {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
  } catch (_) { /* silent */ }
}
