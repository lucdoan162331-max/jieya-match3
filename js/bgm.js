/** 每关不同风格的轻快 BGM（Web Audio procedural） */
import { resumeAudio } from './audio.js?v=20260710d';

let ctx = null;
let masterGain = null;
let playing = false;
let intervalId = null;
let step = 0;

const THEMES = {
  morning:  { notes: [523, 587, 659, 784, 659, 587], bpm: 108, wave: 'sine' },
  summer:   { notes: [392, 494, 587, 659, 587, 494], bpm: 120, wave: 'triangle' },
  chat:     { notes: [440, 554, 659, 554, 440, 330], bpm: 100, wave: 'sine' },
  caffeine: { notes: [659, 784, 880, 784, 659, 523], bpm: 128, wave: 'triangle' },
  kitchen:  { notes: [349, 392, 440, 392, 349, 294], bpm: 96, wave: 'triangle' },
  golden:   { notes: [523, 659, 784, 988, 784, 659], bpm: 112, wave: 'sine' },
  finale:   { notes: [392, 523, 659, 784, 659, 523, 392, 330], bpm: 116, wave: 'sine' },
};

function getAudio() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.14;
    masterGain.connect(ctx.destination);
  }
  return ctx;
}

function playNote(freq, dur, type, vol = 0.1) {
  const c = getAudio();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = vol;
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
  osc.connect(g);
  g.connect(masterGain);
  osc.start();
  osc.stop(c.currentTime + dur);
}

export function startBgm(tileSetId) {
  stopBgm();
  resumeAudio();
  const theme = THEMES[tileSetId] || THEMES.morning;
  playing = true;
  step = 0;
  const beatMs = (60 / theme.bpm) * 1000 * 0.5;
  intervalId = setInterval(() => {
    if (!playing) return;
    const freq = theme.notes[step % theme.notes.length];
    playNote(freq, 0.18, theme.wave, 0.09);
    if (step % 4 === 0) playNote(freq / 2, 0.25, 'sine', 0.035);
    step++;
  }, beatMs);
}

export function stopBgm() {
  playing = false;
  if (intervalId) clearInterval(intervalId);
  intervalId = null;
}
