/** 扩展关卡专属图标 — 简洁可爱手绘风 */
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

export function drawCola(ctx, x, y, s) {
  roundRect(ctx, x - s * 0.18, y - s * 0.28, s * 0.36, s * 0.5, s * 0.05);
  ctx.fillStyle = '#E53935';
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${s * 0.14}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('可乐', x, y + s * 0.02);
  ctx.beginPath();
  ctx.moveTo(x + s * 0.12, y - s * 0.3);
  ctx.lineTo(x + s * 0.12, y - s * 0.45);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = s * 0.03;
  ctx.stroke();
}

export function drawWatermelon(ctx, x, y, s) {
  ctx.beginPath();
  ctx.arc(x, y, s * 0.32, 0, Math.PI * 2);
  ctx.fillStyle = '#4CAF50';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y, s * 0.24, 0, Math.PI * 2);
  ctx.fillStyle = '#EF5350';
  ctx.fill();
}

export function drawPopsicle(ctx, x, y, s) {
  ['#FF6B9D', '#FFD54F', '#4FC3F7'].forEach((c, i) => {
    ctx.fillStyle = c;
    roundRect(ctx, x - s * 0.12, y - s * 0.2 + i * s * 0.1, s * 0.24, s * 0.12, s * 0.03);
    ctx.fill();
  });
  ctx.fillStyle = '#DEB887';
  roundRect(ctx, x - s * 0.04, y + s * 0.12, s * 0.08, s * 0.18, s * 0.02);
  ctx.fill();
}

export function drawFan(ctx, x, y, s) {
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.ellipse(x + i * s * 0.06, y, s * 0.08, s * 0.28, i * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${340 + i * 15}, 70%, 75%)`;
    ctx.fill();
  }
}

export function drawSoda(ctx, x, y, s) {
  ctx.fillStyle = 'rgba(200,230,255,0.8)';
  roundRect(ctx, x - s * 0.15, y - s * 0.22, s * 0.3, s * 0.4, s * 0.04);
  ctx.fill();
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(x + (i - 2) * s * 0.06, y - s * 0.05, s * 0.02, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fill();
  }
}

export function drawToast(ctx, x, y, s) {
  roundRect(ctx, x - s * 0.28, y - s * 0.18, s * 0.56, s * 0.36, s * 0.08);
  ctx.fillStyle = '#DEB887';
  ctx.fill();
}

export function drawSun(ctx, x, y, s) {
  ctx.beginPath();
  ctx.arc(x, y, s * 0.18, 0, Math.PI * 2);
  ctx.fillStyle = '#FFD54F';
  ctx.fill();
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(a) * s * 0.22, y + Math.sin(a) * s * 0.22);
    ctx.lineTo(x + Math.cos(a) * s * 0.34, y + Math.sin(a) * s * 0.34);
    ctx.strokeStyle = '#FFB74D';
    ctx.lineWidth = s * 0.04;
    ctx.stroke();
  }
}

export function drawAlarm(ctx, x, y, s) {
  ctx.beginPath();
  ctx.arc(x, y + s * 0.04, s * 0.22, 0, Math.PI * 2);
  ctx.fillStyle = '#FF6B9D';
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${s * 0.2}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('7', x, y + s * 0.1);
}

export function drawSticky(ctx, x, y, s) {
  ctx.fillStyle = '#FFF59D';
  roundRect(ctx, x - s * 0.22, y - s * 0.2, s * 0.44, s * 0.38, s * 0.03);
  ctx.fill();
  ctx.fillStyle = '#888';
  ctx.font = `${s * 0.1}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('✓', x, y + s * 0.04);
}

export function drawEmoji(ctx, x, y, s) {
  ctx.beginPath();
  ctx.arc(x, y, s * 0.28, 0, Math.PI * 2);
  ctx.fillStyle = '#FFD54F';
  ctx.fill();
  ctx.fillStyle = '#333';
  ctx.beginPath();
  ctx.arc(x - s * 0.1, y - s * 0.05, s * 0.04, 0, Math.PI * 2);
  ctx.arc(x + s * 0.1, y - s * 0.05, s * 0.04, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y + s * 0.08, s * 0.1, 0.2, Math.PI - 0.2);
  ctx.strokeStyle = '#333';
  ctx.lineWidth = s * 0.03;
  ctx.stroke();
}

export function drawHeart(ctx, x, y, s) {
  ctx.fillStyle = '#FF6B9D';
  ctx.beginPath();
  ctx.moveTo(x, y + s * 0.2);
  ctx.bezierCurveTo(x - s * 0.35, y - s * 0.05, x - s * 0.15, y - s * 0.3, x, y - s * 0.1);
  ctx.bezierCurveTo(x + s * 0.15, y - s * 0.3, x + s * 0.35, y - s * 0.05, x, y + s * 0.2);
  ctx.fill();
}

export function drawVoice(ctx, x, y, s) {
  roundRect(ctx, x - s * 0.28, y - s * 0.14, s * 0.56, s * 0.28, s * 0.08);
  ctx.fillStyle = '#66BB6A';
  ctx.fill();
  [0.12, 0.22, 0.16, 0.26].forEach((h, i) => {
    ctx.fillStyle = '#fff';
    roundRect(ctx, x - s * 0.16 + i * s * 0.1, y + s * (0.06 - h), s * 0.05, s * h, s * 0.02);
    ctx.fill();
  });
}

export function drawBottle(ctx, x, y, s) {
  ctx.fillStyle = '#4FC3F7';
  roundRect(ctx, x - s * 0.1, y - s * 0.28, s * 0.2, s * 0.45, s * 0.05);
  ctx.fill();
}

export function drawLatte(ctx, x, y, s) {
  roundRect(ctx, x - s * 0.2, y - s * 0.1, s * 0.4, s * 0.35, s * 0.05);
  ctx.fillStyle = '#D7CCC8';
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.ellipse(x, y - s * 0.12, s * 0.18, s * 0.06, 0, 0, Math.PI * 2);
  ctx.fill();
}

export function drawEnergy(ctx, x, y, s) {
  roundRect(ctx, x - s * 0.15, y - s * 0.28, s * 0.3, s * 0.5, s * 0.04);
  ctx.fillStyle = '#00E676';
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${s * 0.22}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('⚡', x, y + s * 0.06);
}

export function drawCookie(ctx, x, y, s) {
  ctx.beginPath();
  ctx.arc(x, y, s * 0.26, 0, Math.PI * 2);
  ctx.fillStyle = '#A1887F';
  ctx.fill();
}

export function drawMuffin(ctx, x, y, s) {
  ctx.beginPath();
  ctx.ellipse(x, y + s * 0.1, s * 0.22, s * 0.14, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#8D6E63';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y - s * 0.06, s * 0.2, 0, Math.PI * 2);
  ctx.fillStyle = '#5D4037';
  ctx.fill();
}

export function drawWok(ctx, x, y, s) {
  ctx.beginPath();
  ctx.ellipse(x, y + s * 0.06, s * 0.38, s * 0.18, 0, 0, Math.PI);
  ctx.fillStyle = '#424242';
  ctx.fill();
}

export function drawPan(ctx, x, y, s) {
  ctx.beginPath();
  ctx.ellipse(x, y + s * 0.08, s * 0.32, s * 0.1, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#78909C';
  ctx.fill();
}

export function drawEgg(ctx, x, y, s) {
  ctx.beginPath();
  ctx.ellipse(x, y, s * 0.28, s * 0.22, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#FFF8E1';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y, s * 0.12, 0, Math.PI * 2);
  ctx.fillStyle = '#FFB74D';
  ctx.fill();
}

export function drawSpatula(ctx, x, y, s) {
  ctx.fillStyle = '#FFD54F';
  roundRect(ctx, x - s * 0.06, y - s * 0.28, s * 0.12, s * 0.35, s * 0.02);
  ctx.fill();
  ctx.fillStyle = '#FF6B9D';
  roundRect(ctx, x - s * 0.14, y + s * 0.05, s * 0.28, s * 0.12, s * 0.03);
  ctx.fill();
}

export function drawPepper(ctx, x, y, s) {
  roundRect(ctx, x - s * 0.1, y - s * 0.2, s * 0.2, s * 0.38, s * 0.05);
  ctx.fillStyle = '#EF5350';
  ctx.fill();
}

export function drawGoldenpie(ctx, x, y, s) {
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.ellipse(x, y + i * s * 0.08, s * 0.3 - i * 0.02, s * 0.1, 0, 0, Math.PI * 2);
    ctx.fillStyle = ['#FFD54F', '#FFC107', '#FFB300'][i];
    ctx.fill();
  }
}

export function drawPancake(ctx, x, y, s) {
  [0, 1, 2].forEach((i) => {
    ctx.beginPath();
    ctx.ellipse(x, y + i * s * 0.07, s * 0.28, s * 0.09, 0, 0, Math.PI * 2);
    ctx.fillStyle = ['#FFE082', '#FFD54F', '#FFCA28'][i];
    ctx.fill();
  });
}

export function drawTart(ctx, x, y, s) {
  ctx.beginPath();
  ctx.arc(x, y + s * 0.04, s * 0.22, 0, Math.PI * 2);
  ctx.fillStyle = '#FFCC80';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y, s * 0.12, 0, Math.PI * 2);
  ctx.fillStyle = '#FFF9C4';
  ctx.fill();
}

export function drawDonut(ctx, x, y, s) {
  ctx.beginPath();
  ctx.arc(x, y, s * 0.26, 0, Math.PI * 2);
  ctx.fillStyle = '#F48FB1';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y, s * 0.1, 0, Math.PI * 2);
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
}

export function drawPopcorn(ctx, x, y, s) {
  ctx.fillStyle = '#FF6B9D';
  roundRect(ctx, x - s * 0.2, y, s * 0.4, s * 0.22, s * 0.04);
  ctx.fill();
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(x + (i - 2) * s * 0.1, y - s * 0.1, s * 0.07, 0, Math.PI * 2);
    ctx.fillStyle = '#FFF9C4';
    ctx.fill();
  }
}
