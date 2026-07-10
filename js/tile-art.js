import * as Extra from './tile-icons-extra.js';

/** 按 artKey 的调色板 */
export const PALETTES_BY_KEY = {
  coffee: { base: '#3d2314', mid: '#8B5A2B', light: '#D4A574', rim: '#FFE4C4', glow: 'rgba(139,90,43,0.6)' },
  americano: { base: '#3d2314', mid: '#8B5A2B', light: '#D4A574', rim: '#FFE4C4', glow: 'rgba(139,90,43,0.6)' },
  toast: { base: '#8D6E63', mid: '#D7CCC8', light: '#EFEBE9', rim: '#FFF8E1', glow: 'rgba(215,204,200,0.5)' },
  sun: { base: '#F57F17', mid: '#FFD54F', light: '#FFF9C4', rim: '#FFFDE7', glow: 'rgba(255,213,79,0.7)' },
  alarm: { base: '#C2185B', mid: '#FF6B9D', light: '#F8BBD9', rim: '#FCE4EC', glow: 'rgba(255,107,157,0.5)' },
  sticky: { base: '#F9A825', mid: '#FFF59D', light: '#FFFDE7', rim: '#FFF9C4', glow: 'rgba(255,245,157,0.5)' },
  cola: { base: '#B71C1C', mid: '#E53935', light: '#FF8A80', rim: '#FFCDD2', glow: 'rgba(229,57,53,0.55)' },
  watermelon: { base: '#2E7D32', mid: '#66BB6A', light: '#EF5350', rim: '#FFCDD2', glow: 'rgba(102,187,106,0.5)' },
  popsicle: { base: '#0277BD', mid: '#4FC3F7', light: '#B3E5FC', rim: '#E1F5FE', glow: 'rgba(79,195,247,0.55)' },
  fan: { base: '#AD1457', mid: '#F48FB1', light: '#FCE4EC', rim: '#FFF', glow: 'rgba(244,143,177,0.5)' },
  soda: { base: '#0288D1', mid: '#4FC3F7', light: '#E1F5FE', rim: '#FFF', glow: 'rgba(79,195,247,0.5)' },
  read: { base: '#0d6b4f', mid: '#1ABC9C', light: '#7FEFD4', rim: '#A8FFEB', glow: 'rgba(46,204,113,0.55)' },
  emoji: { base: '#F9A825', mid: '#FFD54F', light: '#FFF9C4', rim: '#FFFDE7', glow: 'rgba(255,213,79,0.55)' },
  heart: { base: '#C2185B', mid: '#FF6B9D', light: '#F8BBD9', rim: '#FCE4EC', glow: 'rgba(255,107,157,0.6)' },
  voice: { base: '#2E7D32', mid: '#66BB6A', light: '#C8E6C9', rim: '#E8F5E9', glow: 'rgba(102,187,106,0.5)' },
  bottle: { base: '#01579B', mid: '#4FC3F7', light: '#B3E5FC', rim: '#E1F5FE', glow: 'rgba(79,195,247,0.5)' },
  latte: { base: '#5D4037', mid: '#A1887F', light: '#D7CCC8', rim: '#EFEBE9', glow: 'rgba(161,136,127,0.5)' },
  energy: { base: '#1B5E20', mid: '#00E676', light: '#B9F6CA', rim: '#E8F5E9', glow: 'rgba(0,230,118,0.6)' },
  cookie: { base: '#4E342E', mid: '#A1887F', light: '#D7CCC8', rim: '#EFEBE9', glow: 'rgba(161,136,127,0.4)' },
  muffin: { base: '#4E342E', mid: '#8D6E63', light: '#FFCCBC', rim: '#FBE9E7', glow: 'rgba(141,110,99,0.5)' },
  wok: { base: '#1a1a1a', mid: '#424242', light: '#757575', rim: '#9E9E9E', glow: 'rgba(66,66,66,0.5)' },
  pan: { base: '#37474F', mid: '#78909C', light: '#B0BEC5', rim: '#ECEFF1', glow: 'rgba(120,144,156,0.5)' },
  pot: { base: '#1a1a1a', mid: '#3d3d3d', light: '#6a6a6a', rim: '#9a9a9a', glow: 'rgba(80,80,80,0.5)' },
  egg: { base: '#F9A825', mid: '#FFD54F', light: '#FFF8E1', rim: '#FFFDE7', glow: 'rgba(255,213,79,0.5)' },
  spatula: { base: '#F57F17', mid: '#FFD54F', light: '#FFF9C4', rim: '#FFFDE7', glow: 'rgba(255,213,79,0.5)' },
  pepper: { base: '#B71C1C', mid: '#EF5350', light: '#FFCDD2', rim: '#FFEBEE', glow: 'rgba(239,83,80,0.5)' },
  goldenpie: { base: '#B8860B', mid: '#FFD700', light: '#FFF8DC', rim: '#FFFACD', glow: 'rgba(255,215,0,0.7)' },
  pie: { base: '#B8860B', mid: '#FFD700', light: '#FFF8DC', rim: '#FFFACD', glow: 'rgba(255,215,0,0.7)' },
  pancake: { base: '#F57F17', mid: '#FFD54F', light: '#FFF9C4', rim: '#FFFDE7', glow: 'rgba(255,213,79,0.6)' },
  tart: { base: '#EF6C00', mid: '#FFB74D', light: '#FFE0B2', rim: '#FFF3E0', glow: 'rgba(255,183,77,0.55)' },
  donut: { base: '#AD1457', mid: '#F48FB1', light: '#FCE4EC', rim: '#FFF', glow: 'rgba(244,143,177,0.55)' },
  popcorn: { base: '#FF6B9D', mid: '#FFD54F', light: '#FFF9C4', rim: '#FFF', glow: 'rgba(255,213,79,0.55)' },
  ppt: { base: '#6B3FA0', mid: '#B388FF', light: '#E1BEE7', rim: '#F3E5F5', glow: 'rgba(179,136,255,0.55)' },
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

/** 绘制完整水晶方块 — artKey 驱动 */
export function drawCrystalTile(ctx, artKey, x, y, size, stunned = false) {
  const palette = PALETTES_BY_KEY[artKey];
  const drawer = ICON_DRAWERS[artKey];
  if (!palette || !drawer) return;

  const radius = size / 2;
  const extraGlow = GLOW_KEYS.has(artKey);

  if (stunned) {
    ctx.save();
    ctx.globalAlpha = 0.65;
    ctx.translate(x, y);
    ctx.rotate(Math.sin(Date.now() / 120) * 0.08);
    ctx.translate(-x, -y);
  }

  drawCrystalGem(ctx, x, y, radius, palette, extraGlow);

  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.35)';
  ctx.shadowBlur = size * 0.06;
  ctx.shadowOffsetY = size * 0.03;
  drawer(ctx, x, y, size * 0.88);
  ctx.restore();

  if (stunned) {
    ctx.restore();
    ctx.save();
    ctx.font = `bold ${size * 0.28}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#FFE082';
    ctx.fillText('★', x + radius * 0.55, y - radius * 0.55);
    ctx.restore();
  }
}
