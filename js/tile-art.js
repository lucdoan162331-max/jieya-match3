import * as Extra from './tile-icons-extra.js';

/** 浅色消消乐方块调色板 — bg 极浅底，border 描边，accent 点缀 */
export const PALETTES_BY_KEY = {
  coffee: { bg: '#FFF8F0', border: '#D7B896', accent: '#8B5A2B', shadow: 'rgba(139,90,43,0.18)' },
  americano: { bg: '#FFF8F0', border: '#D7B896', accent: '#6F4E37', shadow: 'rgba(111,78,55,0.18)' },
  toast: { bg: '#FFFBF5', border: '#E0C9A6', accent: '#C49A6C', shadow: 'rgba(196,154,108,0.2)' },
  sun: { bg: '#FFFDE7', border: '#FFE082', accent: '#FFB300', shadow: 'rgba(255,179,0,0.22)' },
  alarm: { bg: '#FFF0F5', border: '#F48FB1', accent: '#E91E63', shadow: 'rgba(233,30,99,0.18)' },
  sticky: { bg: '#FFFDE7', border: '#FFF176', accent: '#F9A825', shadow: 'rgba(249,168,37,0.2)' },
  cola: { bg: '#FFEBEE', border: '#EF9A9A', accent: '#D32F2F', shadow: 'rgba(211,47,47,0.2)' },
  watermelon: { bg: '#F1F8E9', border: '#A5D6A7', accent: '#E53935', shadow: 'rgba(76,175,80,0.2)' },
  popsicle: { bg: '#E3F2FD', border: '#90CAF9', accent: '#1E88E5', shadow: 'rgba(30,136,229,0.2)' },
  fan: { bg: '#FCE4EC', border: '#F48FB1', accent: '#EC407A', shadow: 'rgba(236,64,122,0.18)' },
  soda: { bg: '#E1F5FE', border: '#81D4FA', accent: '#039BE5', shadow: 'rgba(3,155,229,0.2)' },
  read: { bg: '#E8F5E9', border: '#81C784', accent: '#2E7D32', shadow: 'rgba(46,125,50,0.18)' },
  emoji: { bg: '#FFF8E1', border: '#FFE082', accent: '#FFA000', shadow: 'rgba(255,160,0,0.2)' },
  heart: { bg: '#FCE4EC', border: '#F48FB1', accent: '#E91E63', shadow: 'rgba(233,30,99,0.18)' },
  voice: { bg: '#E8F5E9', border: '#A5D6A7', accent: '#43A047', shadow: 'rgba(67,160,71,0.18)' },
  bottle: { bg: '#E3F2FD', border: '#64B5F6', accent: '#1565C0', shadow: 'rgba(21,101,192,0.18)' },
  latte: { bg: '#EFEBE9', border: '#BCAAA4', accent: '#6D4C41', shadow: 'rgba(109,76,65,0.18)' },
  energy: { bg: '#E8F5E9', border: '#69F0AE', accent: '#00C853', shadow: 'rgba(0,200,83,0.22)' },
  cookie: { bg: '#FFF3E0', border: '#FFCC80', accent: '#EF6C00', shadow: 'rgba(239,108,0,0.18)' },
  muffin: { bg: '#FBE9E7', border: '#FFAB91', accent: '#BF360C', shadow: 'rgba(191,54,12,0.18)' },
  wok: { bg: '#ECEFF1', border: '#90A4AE', accent: '#455A64', shadow: 'rgba(69,90,100,0.2)' },
  pan: { bg: '#ECEFF1', border: '#B0BEC5', accent: '#546E7A', shadow: 'rgba(84,110,122,0.18)' },
  pot: { bg: '#E8EAF6', border: '#9FA8DA', accent: '#3949AB', shadow: 'rgba(57,73,171,0.18)' },
  egg: { bg: '#FFFDE7', border: '#FFF59D', accent: '#FBC02D', shadow: 'rgba(251,192,45,0.22)' },
  spatula: { bg: '#FFF8E1', border: '#FFE082', accent: '#FF8F00', shadow: 'rgba(255,143,0,0.2)' },
  pepper: { bg: '#FFEBEE', border: '#EF9A9A', accent: '#C62828', shadow: 'rgba(198,40,40,0.2)' },
  goldenpie: { bg: '#FFFDE7', border: '#FFD54F', accent: '#FFA000', shadow: 'rgba(255,160,0,0.25)' },
  pie: { bg: '#FFFDE7', border: '#FFD54F', accent: '#FFA000', shadow: 'rgba(255,160,0,0.25)' },
  pancake: { bg: '#FFF8E1', border: '#FFCC80', accent: '#FB8C00', shadow: 'rgba(251,140,0,0.2)' },
  tart: { bg: '#FFF3E0', border: '#FFCC80', accent: '#EF6C00', shadow: 'rgba(239,108,0,0.2)' },
  donut: { bg: '#FCE4EC', border: '#F48FB1', accent: '#D81B60', shadow: 'rgba(216,27,96,0.18)' },
  popcorn: { bg: '#FFF8E1', border: '#FFE082', accent: '#FF6F00', shadow: 'rgba(255,111,0,0.2)' },
  ppt: { bg: '#F3E5F5', border: '#CE93D8', accent: '#8E24AA', shadow: 'rgba(142,36,170,0.18)' },
};

function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
  ctx.lineTo(x + rr, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
  ctx.lineTo(x, y + rr);
  ctx.quadraticCurveTo(x, y, x + rr, y);
  ctx.closePath();
}

/** 水晶宝石底座 — 迪士尼糖果风立体切面 */
export function drawCrystalGem(ctx, x, y, radius, palette, extraGlow = false) {
  ctx.save();

  const r = radius;

  // 外发光（大饼专属）
  if (extraGlow) {
    ctx.shadowColor = palette.glow;
    ctx.shadowBlur = r * 1.0;
  }

  // 底部椭圆投影
  ctx.beginPath();
  ctx.ellipse(x, y + r * 0.88, r * 0.78, r * 0.2, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.42)';
  ctx.fill();

  // 宝石本体 — 立体球体渐变
  const bodyGrad = ctx.createRadialGradient(
    x - r * 0.38, y - r * 0.42, r * 0.02,
    x + r * 0.08, y + r * 0.12, r * 1.15
  );
  bodyGrad.addColorStop(0, '#FFFFFF');
  bodyGrad.addColorStop(0.12, palette.light);
  bodyGrad.addColorStop(0.4, palette.mid);
  bodyGrad.addColorStop(0.72, palette.mid);
  bodyGrad.addColorStop(1, palette.base);

  ctx.shadowBlur = extraGlow ? r * 0.6 : 0;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = bodyGrad;
  ctx.fill();
  ctx.shadowBlur = 0;

  // 底部暗部 — 立体感
  const shadeGrad = ctx.createLinearGradient(x, y - r * 0.2, x, y + r);
  shadeGrad.addColorStop(0, 'rgba(0,0,0,0)');
  shadeGrad.addColorStop(0.6, 'rgba(0,0,0,0)');
  shadeGrad.addColorStop(1, 'rgba(0,0,0,0.35)');
  ctx.beginPath();
  ctx.arc(x, y, r * 0.95, 0, Math.PI * 2);
  ctx.fillStyle = shadeGrad;
  ctx.fill();

  // 水晶外沿
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.strokeStyle = palette.rim;
  ctx.lineWidth = r * 0.07;
  ctx.globalAlpha = 0.55;
  ctx.stroke();
  ctx.globalAlpha = 1;

  // 内圈折射光
  ctx.beginPath();
  ctx.arc(x, y, r * 0.82, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = r * 0.03;
  ctx.stroke();

  // 主高光 — 迪士尼玻璃感
  ctx.beginPath();
  ctx.ellipse(x - r * 0.3, y - r * 0.35, r * 0.42, r * 0.24, -0.55, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.72)';
  ctx.fill();

  // 弧形反光条
  ctx.beginPath();
  ctx.arc(x - r * 0.15, y - r * 0.1, r * 0.55, Math.PI * 1.15, Math.PI * 1.65);
  ctx.strokeStyle = 'rgba(255,255,255,0.28)';
  ctx.lineWidth = r * 0.04;
  ctx.stroke();

  // 星星闪光点
  ctx.beginPath();
  ctx.arc(x + r * 0.22, y - r * 0.18, r * 0.07, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.fill();

  ctx.restore();
}

function drawCheckmark(ctx, cx, cy, size, color, lineW) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineW;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(cx - size * 0.45, cy);
  ctx.lineTo(cx - size * 0.12, cy + size * 0.32);
  ctx.lineTo(cx + size * 0.5, cy - size * 0.38);
  ctx.stroke();
  ctx.restore();
}

/** ☕ 冰美式 */
function drawCoffeeIcon(ctx, x, y, s) {
  const cupW = s * 0.55;
  const cupH = s * 0.42;
  const left = x - cupW / 2;
  const top = y - cupH * 0.2;

  ctx.save();

  // 杯身
  const cupGrad = ctx.createLinearGradient(left, top, left, top + cupH);
  cupGrad.addColorStop(0, '#F5F0E8');
  cupGrad.addColorStop(0.5, '#E8DDD0');
  cupGrad.addColorStop(1, '#C4B5A5');
  roundRect(ctx, left, top, cupW, cupH, s * 0.06);
  ctx.fillStyle = cupGrad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.6)';
  ctx.lineWidth = s * 0.03;
  ctx.stroke();

  // 咖啡液面
  roundRect(ctx, left + s * 0.04, top + s * 0.06, cupW - s * 0.08, cupH * 0.38, s * 0.04);
  const coffeeGrad = ctx.createLinearGradient(left, top, left, top + cupH * 0.4);
  coffeeGrad.addColorStop(0, '#5C3D2E');
  coffeeGrad.addColorStop(1, '#2C1810');
  ctx.fillStyle = coffeeGrad;
  ctx.fill();

  // 杯把
  ctx.beginPath();
  ctx.arc(left + cupW + s * 0.06, top + cupH * 0.45, s * 0.1, -Math.PI * 0.5, Math.PI * 0.5);
  ctx.strokeStyle = '#E8DDD0';
  ctx.lineWidth = s * 0.05;
  ctx.stroke();

  // 热气
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    const sx = x + i * s * 0.12;
    ctx.moveTo(sx, top - s * 0.08);
    ctx.bezierCurveTo(sx - s * 0.05, top - s * 0.2, sx + s * 0.05, top - s * 0.28, sx, top - s * 0.36);
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = s * 0.025;
    ctx.stroke();
  }

  ctx.restore();
}

/** 🥞 画的大饼 */
function drawPieIcon(ctx, x, y, s) {
  ctx.save();
  const layers = [
    { dy: s * 0.1, rx: s * 0.38, color1: '#FFE082', color2: '#FFA000' },
    { dy: 0, rx: s * 0.42, color1: '#FFD54F', color2: '#FF8F00' },
    { dy: -s * 0.1, rx: s * 0.36, color1: '#FFF59D', color2: '#FFB300' },
  ];

  layers.forEach((layer, i) => {
    const ly = y + layer.dy;
    ctx.beginPath();
    ctx.ellipse(x, ly, layer.rx, s * 0.14, 0, 0, Math.PI * 2);
    const g = ctx.createLinearGradient(x - layer.rx, ly, x + layer.rx, ly);
    g.addColorStop(0, layer.color1);
    g.addColorStop(0.5, layer.color2);
    g.addColorStop(1, layer.color1);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = s * 0.02;
    ctx.stroke();
  });

  // 黄油块
  ctx.beginPath();
  ctx.ellipse(x, y - s * 0.18, s * 0.1, s * 0.06, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#FFF9C4';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.7)';
  ctx.lineWidth = s * 0.015;
  ctx.stroke();

  // 金色光晕
  ctx.beginPath();
  ctx.arc(x, y - s * 0.22, s * 0.04, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,200,0.9)';
  ctx.fill();

  ctx.restore();
}

/** 🍳 飞来横锅 */
function drawPotIcon(ctx, x, y, s) {
  ctx.save();

  // 锅身
  ctx.beginPath();
  ctx.ellipse(x, y + s * 0.05, s * 0.42, s * 0.22, 0, 0, Math.PI);
  const potGrad = ctx.createLinearGradient(x, y - s * 0.2, x, y + s * 0.3);
  potGrad.addColorStop(0, '#4a4a4a');
  potGrad.addColorStop(0.5, '#2a2a2a');
  potGrad.addColorStop(1, '#1a1a1a');
  ctx.fillStyle = potGrad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.lineWidth = s * 0.03;
  ctx.stroke();

  // 锅柄
  ctx.beginPath();
  ctx.moveTo(x + s * 0.38, y);
  ctx.lineTo(x + s * 0.58, y - s * 0.06);
  ctx.strokeStyle = '#3a3a3a';
  ctx.lineWidth = s * 0.05;
  ctx.lineCap = 'round';
  ctx.stroke();

  // 锅沿高光
  ctx.beginPath();
  ctx.ellipse(x, y - s * 0.02, s * 0.38, s * 0.06, 0, Math.PI, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = s * 0.025;
  ctx.stroke();

  // 荷包蛋
  ctx.beginPath();
  ctx.arc(x - s * 0.05, y + s * 0.02, s * 0.14, 0, Math.PI * 2);
  ctx.fillStyle = '#FFF8E1';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x - s * 0.05, y + s * 0.02, s * 0.07, 0, Math.PI * 2);
  const yolkGrad = ctx.createRadialGradient(x - s * 0.06, y, 0, x - s * 0.05, y + s * 0.02, s * 0.07);
  yolkGrad.addColorStop(0, '#FFE082');
  yolkGrad.addColorStop(1, '#FF8F00');
  ctx.fillStyle = yolkGrad;
  ctx.fill();

  ctx.restore();
}

/** 📈 灵感曲线 — 欢快上扬波浪线 */
function drawPptIcon(ctx, x, y, s) {
  ctx.save();
  const pw = s * 0.72;
  const ph = s * 0.52;
  const left = x - pw / 2;
  const top = y - ph / 2;

  roundRect(ctx, left, top, pw, ph, s * 0.06);
  const screenGrad = ctx.createLinearGradient(left, top, left + pw, top + ph);
  screenGrad.addColorStop(0, '#FFFFFF');
  screenGrad.addColorStop(1, '#F3E5F5');
  ctx.fillStyle = screenGrad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(147,112,219,0.4)';
  ctx.lineWidth = s * 0.025;
  ctx.stroke();

  roundRect(ctx, left, top, pw, ph * 0.22, s * 0.06);
  const barGrad = ctx.createLinearGradient(left, top, left + pw, top);
  barGrad.addColorStop(0, '#CE93D8');
  barGrad.addColorStop(1, '#9575CD');
  ctx.fillStyle = barGrad;
  ctx.fill();

  const chartL = left + s * 0.08;
  const chartR = left + pw - s * 0.08;
  const chartT = top + ph * 0.32;
  const chartB = top + ph - s * 0.08;

  // 欢快上扬波浪线
  const pts = [
    [chartL, chartB - (chartB - chartT) * 0.2],
    [chartL + (chartR - chartL) * 0.2, chartB - (chartB - chartT) * 0.45],
    [chartL + (chartR - chartL) * 0.4, chartB - (chartB - chartT) * 0.35],
    [chartL + (chartR - chartL) * 0.6, chartB - (chartB - chartT) * 0.65],
    [chartL + (chartR - chartL) * 0.8, chartB - (chartB - chartT) * 0.5],
    [chartR, chartT + (chartB - chartT) * 0.1],
  ];
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  pts.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
  ctx.strokeStyle = '#7E57C2';
  ctx.lineWidth = s * 0.045;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();

  pts.forEach(([px, py], i) => {
    ctx.beginPath();
    ctx.arc(px, py, s * 0.028, 0, Math.PI * 2);
    ctx.fillStyle = ['#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#26C6DA', '#66BB6A'][i];
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = s * 0.012;
    ctx.stroke();
  });

  // 小星星装饰
  ctx.font = `bold ${s * 0.14}px sans-serif`;
  ctx.fillStyle = '#FFD54F';
  ctx.fillText('✦', left + pw * 0.85, top + ph * 0.38);

  ctx.restore();
}

/** ✓✓ 已读不回 — 双绿色对勾气泡 */
function drawReadIcon(ctx, x, y, s) {
  ctx.save();

  const bw = s * 0.72;
  const bh = s * 0.46;
  const left = x - bw / 2;
  const top = y - bh / 2 - s * 0.04;

  // 深色衬底增强对比
  roundRect(ctx, left - s * 0.02, top - s * 0.02, bw + s * 0.04, bh + s * 0.04, s * 0.12);
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fill();

  // 白色消息气泡
  roundRect(ctx, left, top, bw, bh, s * 0.1);
  const bubbleGrad = ctx.createLinearGradient(left, top, left, top + bh);
  bubbleGrad.addColorStop(0, '#FFFFFF');
  bubbleGrad.addColorStop(1, '#E8F5E9');
  ctx.fillStyle = bubbleGrad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,100,60,0.35)';
  ctx.lineWidth = s * 0.025;
  ctx.stroke();

  // 气泡尾巴
  ctx.beginPath();
  ctx.moveTo(left + s * 0.1, top + bh - s * 0.01);
  ctx.lineTo(left + s * 0.02, top + bh + s * 0.1);
  ctx.lineTo(left + s * 0.2, top + bh - s * 0.01);
  ctx.closePath();
  ctx.fillStyle = '#E8F5E9';
  ctx.fill();

  // 省略号（已读不回）
  const dotY = y - s * 0.1;
  [-0.13, 0, 0.13].forEach((ox) => {
    ctx.beginPath();
    ctx.arc(x + ox * s, dotY, s * 0.032, 0, Math.PI * 2);
    ctx.fillStyle = '#90A4AE';
    ctx.fill();
  });

  // 双对勾 — 清晰 WhatsApp 已读样式
  const checkY = y + s * 0.13;
  const checkSize = s * 0.26;
  const lw = s * 0.055;

  // 第一勾（浅绿，偏后）
  drawCheckmark(ctx, x - s * 0.22, checkY, checkSize * 0.9, '#69F0AE', lw);
  // 第二勾（亮绿，偏前）
  drawCheckmark(ctx, x - s * 0.02, checkY, checkSize, '#00C853', lw);

  // 对勾描边增强可读性
  drawCheckmark(ctx, x - s * 0.22, checkY, checkSize * 0.9, 'rgba(0,0,0,0.15)', lw * 1.8);
  drawCheckmark(ctx, x - s * 0.02, checkY, checkSize, 'rgba(0,0,0,0.15)', lw * 1.8);
  drawCheckmark(ctx, x - s * 0.22, checkY, checkSize * 0.9, '#69F0AE', lw);
  drawCheckmark(ctx, x - s * 0.02, checkY, checkSize, '#00C853', lw);

  ctx.restore();
}

const ICON_DRAWERS = {
  coffee: drawCoffeeIcon,
  americano: drawCoffeeIcon,
  pie: drawPieIcon,
  goldenpie: Extra.drawGoldenpie,
  pot: drawPotIcon,
  wok: Extra.drawWok,
  pan: Extra.drawPan,
  ppt: drawPptIcon,
  read: drawReadIcon,
  cola: Extra.drawCola,
  watermelon: Extra.drawWatermelon,
  popsicle: Extra.drawPopsicle,
  fan: Extra.drawFan,
  soda: Extra.drawSoda,
  toast: Extra.drawToast,
  sun: Extra.drawSun,
  alarm: Extra.drawAlarm,
  sticky: Extra.drawSticky,
  emoji: Extra.drawEmoji,
  heart: Extra.drawHeart,
  voice: Extra.drawVoice,
  bottle: Extra.drawBottle,
  latte: Extra.drawLatte,
  energy: Extra.drawEnergy,
  cookie: Extra.drawCookie,
  muffin: Extra.drawMuffin,
  egg: Extra.drawEgg,
  spatula: Extra.drawSpatula,
  pepper: Extra.drawPepper,
  pancake: Extra.drawPancake,
  tart: Extra.drawTart,
  donut: Extra.drawDonut,
  popcorn: Extra.drawPopcorn,
};

const GLOW_KEYS = new Set(['pie', 'goldenpie', 'pancake']);

/** 消消乐方块 — 浅色底 + 白盘图标，图案清晰可读 */
function drawMatchBlock(ctx, x, y, size, palette, extraGlow = false) {
  const half = size / 2;
  const bx = x - half;
  const by = y - half;
  const r = size * 0.22;

  ctx.save();
  if (extraGlow) {
    ctx.shadowColor = palette.shadow;
    ctx.shadowBlur = size * 0.2;
  }

  // 底部投影
  ctx.fillStyle = 'rgba(0,0,0,0.08)';
  roundRect(ctx, bx + 2, by + size * 0.06 + 2, size, size, r);
  ctx.fill();

  // 方块本体渐变
  const bodyGrad = ctx.createLinearGradient(bx, by, bx, by + size);
  bodyGrad.addColorStop(0, '#FFFFFF');
  bodyGrad.addColorStop(0.35, palette.bg);
  bodyGrad.addColorStop(1, palette.bg);
  roundRect(ctx, bx, by, size, size, r);
  ctx.fillStyle = bodyGrad;
  ctx.fill();

  // 顶部高光条
  const hiGrad = ctx.createLinearGradient(bx, by, bx, by + size * 0.35);
  hiGrad.addColorStop(0, 'rgba(255,255,255,0.85)');
  hiGrad.addColorStop(1, 'rgba(255,255,255,0)');
  roundRect(ctx, bx + 2, by + 2, size - 4, size * 0.38, r * 0.8);
  ctx.fillStyle = hiGrad;
  ctx.fill();

  // 描边
  ctx.strokeStyle = palette.border;
  ctx.lineWidth = Math.max(1.5, size * 0.04);
  roundRect(ctx, bx, by, size, size, r);
  ctx.stroke();

  // 内角 accent 点
  ctx.fillStyle = palette.accent;
  ctx.globalAlpha = 0.35;
  ctx.beginPath();
  ctx.arc(bx + size * 0.12, by + size * 0.12, size * 0.05, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();
}

/** 大号 emoji 保证手机上一眼可辨 */
const TILE_EMOJI = {
  coffee: '☕', americano: '☕', latte: '🧋', energy: '⚡',
  toast: '🍞', sun: '☀️', alarm: '⏰', sticky: '📝',
  cola: '🥤', watermelon: '🍉', popsicle: '🍦', fan: '🪭', soda: '🫧',
  read: '💬', emoji: '😊', heart: '❤️', voice: '🎤', bottle: '🫙',
  cookie: '🍪', muffin: '🧁',
  wok: '🍳', pan: '🥘', pot: '🍲', egg: '🥚', spatula: '🥄', pepper: '🌶️',
  goldenpie: '🥧', pie: '🥧', pancake: '🥞', tart: '🍮', donut: '🍩', popcorn: '🍿',
  ppt: '📊',
};

/** 绘制完整消消乐方块 — 浅色方块 + 大号 emoji */
export function drawCrystalTile(ctx, artKey, x, y, size, stunned = false) {
  const palette = PALETTES_BY_KEY[artKey];
  if (!palette) return;

  const blockSize = size * 0.92;
  const extraGlow = GLOW_KEYS.has(artKey);

  if (stunned) {
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.translate(x, y);
    ctx.rotate(Math.sin(Date.now() / 120) * 0.1);
    ctx.translate(-x, -y);
  }

  drawMatchBlock(ctx, x, y, blockSize, palette, extraGlow);

  const plateR = blockSize * 0.36;
  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0,0,0,0.08)';
  ctx.shadowBlur = blockSize * 0.05;
  ctx.beginPath();
  ctx.arc(x, y, plateR, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const emoji = TILE_EMOJI[artKey] || '✨';
  ctx.save();
  ctx.font = `${Math.floor(blockSize * 0.48)}px "Apple Color Emoji","Segoe UI Emoji",sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, x, y + blockSize * 0.02);
  ctx.restore();

  if (stunned) {
    ctx.restore();
    ctx.save();
    ctx.font = `bold ${blockSize * 0.26}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#FFB300';
    ctx.fillText('★', x + blockSize * 0.32, y - blockSize * 0.32);
    ctx.restore();
  }
}
