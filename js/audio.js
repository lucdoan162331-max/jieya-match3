import { SFX_LINES } from './config.js';

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

export function playMatch(combo = 1) {
  const base = 520 + Math.min(combo, 5) * 40;
  playTone(base, 0.07);
  setTimeout(() => playTone(base + 130, 0.07), 50);
  setTimeout(() => playTone(base + 260, 0.1), 100);
}

export function playSwap() {
  playTone(440, 0.04, 'triangle', 0.08);
}

export function playInvalid() {
  playTone(220, 0.1, 'sawtooth', 0.08);
}

export function playPotThrow() {
  playTone(180, 0.08, 'square', 0.15);
  setTimeout(() => playTone(120, 0.12, 'sine', 0.12), 60);
}

export function playCaffeine() {
  [400, 520, 640, 760].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.05, 'sine', 0.1), i * 40);
  });
}

export function playMeetingTap() {
  playTone(500 + Math.random() * 300, 0.03, 'square', 0.07);
}

export function playWin() {
  [523, 659, 784, 1047].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.18, 'sine', 0.11), i * 100);
  });
}

/** 不重复最近 5 条的随机文案 */
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
