/** 高对比彩色图标 — 不依赖 emoji（iOS Canvas 会把 emoji 渲成灰色剪影） */
function rr(ctx, x, y, w, h, r) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.lineTo(x + w - rad, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
  ctx.lineTo(x + w, y + h - rad);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
  ctx.lineTo(x + rad, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
  ctx.lineTo(x, y + rad);
  ctx.quadraticCurveTo(x, y, x + rad, y);
  ctx.closePath();
}

function strokeFill(ctx, fill, stroke = '#333', lw = 2) {
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lw;
  ctx.stroke();
}

export function drawVividIcon(ctx, key, x, y, s) {
  ctx.save();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  const fn = ICONS[key] || ICONS.sticky;
  fn(ctx, x, y, s);
  ctx.restore();
}

const ICONS = {
  coffee(ctx, x, y, s) {
    rr(ctx, x - s * 0.2, y - s * 0.12, s * 0.4, s * 0.32, s * 0.06);
    strokeFill(ctx, '#6F4E37', '#3E2723', s * 0.04);
    ctx.beginPath();
    ctx.arc(x + s * 0.22, y + s * 0.02, s * 0.1, -Math.PI / 2, Math.PI / 2);
    ctx.strokeStyle = '#3E2723';
    ctx.lineWidth = s * 0.05;
    ctx.stroke();
    // steam
    ctx.strokeStyle = '#90CAF9';
    ctx.lineWidth = s * 0.035;
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(x + i * s * 0.08, y - s * 0.16);
      ctx.quadraticCurveTo(x + i * s * 0.08 + 4, y - s * 0.28, x + i * s * 0.08, y - s * 0.36);
      ctx.stroke();
    }
  },
  americano(ctx, x, y, s) { ICONS.coffee(ctx, x, y, s); },
  latte(ctx, x, y, s) {
    rr(ctx, x - s * 0.2, y - s * 0.1, s * 0.4, s * 0.3, s * 0.08);
    strokeFill(ctx, '#D7CCC8', '#5D4037', s * 0.04);
    ctx.beginPath();
    ctx.arc(x, y, s * 0.1, 0, Math.PI * 2);
    strokeFill(ctx, '#FFF8E1', '#8D6E63', s * 0.03);
  },
  energy(ctx, x, y, s) {
    ctx.beginPath();
    ctx.moveTo(x - s * 0.05, y - s * 0.32);
    ctx.lineTo(x + s * 0.12, y - s * 0.02);
    ctx.lineTo(x + s * 0.02, y - s * 0.02);
    ctx.lineTo(x + s * 0.1, y + s * 0.32);
    ctx.lineTo(x - s * 0.12, y + s * 0.02);
    ctx.lineTo(x - s * 0.02, y + s * 0.02);
    ctx.closePath();
    strokeFill(ctx, '#FFEB3B', '#F57F17', s * 0.04);
  },
  toast(ctx, x, y, s) {
    rr(ctx, x - s * 0.28, y - s * 0.2, s * 0.56, s * 0.4, s * 0.12);
    strokeFill(ctx, '#FFCC80', '#E65100', s * 0.045);
    rr(ctx, x - s * 0.18, y - s * 0.08, s * 0.36, s * 0.18, s * 0.04);
    strokeFill(ctx, '#FFE0B2', '#EF6C00', s * 0.03);
  },
  sun(ctx, x, y, s) {
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(a) * s * 0.22, y + Math.sin(a) * s * 0.22);
      ctx.lineTo(x + Math.cos(a) * s * 0.38, y + Math.sin(a) * s * 0.38);
      ctx.strokeStyle = '#FF6F00';
      ctx.lineWidth = s * 0.05;
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(x, y, s * 0.2, 0, Math.PI * 2);
    strokeFill(ctx, '#FFD54F', '#F57F17', s * 0.045);
  },
  alarm(ctx, x, y, s) {
    ctx.beginPath();
    ctx.arc(x - s * 0.18, y - s * 0.22, s * 0.1, 0, Math.PI * 2);
    strokeFill(ctx, '#EF5350', '#C62828', s * 0.03);
    ctx.beginPath();
    ctx.arc(x + s * 0.18, y - s * 0.22, s * 0.1, 0, Math.PI * 2);
    strokeFill(ctx, '#EF5350', '#C62828', s * 0.03);
    ctx.beginPath();
    ctx.arc(x, y + s * 0.02, s * 0.22, 0, Math.PI * 2);
    strokeFill(ctx, '#FF80AB', '#C2185B', s * 0.045);
    ctx.beginPath();
    ctx.moveTo(x, y + s * 0.02);
    ctx.lineTo(x, y - s * 0.1);
    ctx.moveTo(x, y + s * 0.02);
    ctx.lineTo(x + s * 0.1, y + s * 0.08);
    ctx.strokeStyle = '#880E4F';
    ctx.lineWidth = s * 0.04;
    ctx.stroke();
  },
  sticky(ctx, x, y, s) {
    rr(ctx, x - s * 0.22, y - s * 0.24, s * 0.44, s * 0.48, s * 0.04);
    strokeFill(ctx, '#FFF59D', '#F9A825', s * 0.04);
    ctx.strokeStyle = '#FBC02D';
    ctx.lineWidth = s * 0.03;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(x - s * 0.14, y - s * 0.08 + i * s * 0.1);
      ctx.lineTo(x + s * 0.14, y - s * 0.08 + i * s * 0.1);
      ctx.stroke();
    }
  },
  cola(ctx, x, y, s) {
    rr(ctx, x - s * 0.16, y - s * 0.28, s * 0.32, s * 0.52, s * 0.06);
    strokeFill(ctx, '#E53935', '#B71C1C', s * 0.045);
    rr(ctx, x - s * 0.12, y - s * 0.08, s * 0.24, s * 0.14, s * 0.02);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.fillStyle = '#B71C1C';
    ctx.font = `bold ${s * 0.12}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('可乐', x, y - s * 0.01);
    // bubbles
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    [[-0.08, 0.18], [0.06, 0.22], [0, 0.28]].forEach(([ox, oy]) => {
      ctx.beginPath();
      ctx.arc(x + s * ox, y + s * oy, s * 0.03, 0, Math.PI * 2);
      ctx.fill();
    });
  },
  watermelon(ctx, x, y, s) {
    ctx.beginPath();
    ctx.arc(x, y, s * 0.3, 0.15, Math.PI - 0.15);
    ctx.lineTo(x, y);
    ctx.closePath();
    strokeFill(ctx, '#EF5350', '#C62828', s * 0.04);
    ctx.beginPath();
    ctx.arc(x, y, s * 0.3, 0.15, Math.PI - 0.15);
    ctx.strokeStyle = '#43A047';
    ctx.lineWidth = s * 0.06;
    ctx.stroke();
    ctx.fillStyle = '#212121';
    [[-0.1, 0.08], [0.05, 0.12], [-0.02, 0.18]].forEach(([ox, oy]) => {
      ctx.beginPath();
      ctx.ellipse(x + s * ox, y + s * oy, s * 0.025, s * 0.04, 0.3, 0, Math.PI * 2);
      ctx.fill();
    });
  },
  popsicle(ctx, x, y, s) {
    ['#FF6B9D', '#FFD54F', '#4FC3F7'].forEach((c, i) => {
      rr(ctx, x - s * 0.14, y - s * 0.28 + i * s * 0.14, s * 0.28, s * 0.14, s * 0.04);
      strokeFill(ctx, c, '#333', s * 0.03);
    });
    rr(ctx, x - s * 0.04, y + s * 0.14, s * 0.08, s * 0.2, s * 0.02);
    strokeFill(ctx, '#FFCC80', '#E65100', s * 0.03);
  },
  fan(ctx, x, y, s) {
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath();
      ctx.ellipse(x + i * s * 0.07, y, s * 0.09, s * 0.28, i * 0.28, 0, Math.PI * 2);
      strokeFill(ctx, `hsl(${330 + i * 12}, 80%, 70%)`, '#AD1457', s * 0.025);
    }
  },
  soda(ctx, x, y, s) {
    rr(ctx, x - s * 0.16, y - s * 0.26, s * 0.32, s * 0.48, s * 0.06);
    strokeFill(ctx, '#81D4FA', '#0277BD', s * 0.04);
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.arc(x + ((i % 3) - 1) * s * 0.08, y - s * 0.05 + Math.floor(i / 3) * s * 0.12, s * 0.035, 0, Math.PI * 2);
      ctx.fill();
    }
  },
  read(ctx, x, y, s) {
    rr(ctx, x - s * 0.26, y - s * 0.18, s * 0.52, s * 0.36, s * 0.1);
    strokeFill(ctx, '#66BB6A', '#2E7D32', s * 0.04);
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${s * 0.16}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('已读', x, y);
  },
  emoji(ctx, x, y, s) {
    ctx.beginPath();
    ctx.arc(x, y, s * 0.28, 0, Math.PI * 2);
    strokeFill(ctx, '#FFD54F', '#F9A825', s * 0.045);
    ctx.fillStyle = '#5D4037';
    ctx.beginPath();
    ctx.arc(x - s * 0.1, y - s * 0.06, s * 0.045, 0, Math.PI * 2);
    ctx.arc(x + s * 0.1, y - s * 0.06, s * 0.045, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y + s * 0.06, s * 0.12, 0.15, Math.PI - 0.15);
    ctx.strokeStyle = '#5D4037';
    ctx.lineWidth = s * 0.04;
    ctx.stroke();
  },
  heart(ctx, x, y, s) {
    ctx.beginPath();
    ctx.moveTo(x, y + s * 0.22);
    ctx.bezierCurveTo(x - s * 0.35, y + s * 0.02, x - s * 0.3, y - s * 0.25, x, y - s * 0.08);
    ctx.bezierCurveTo(x + s * 0.3, y - s * 0.25, x + s * 0.35, y + s * 0.02, x, y + s * 0.22);
    strokeFill(ctx, '#FF4081', '#C2185B', s * 0.04);
  },
  voice(ctx, x, y, s) {
    rr(ctx, x - s * 0.28, y - s * 0.12, s * 0.56, s * 0.24, s * 0.12);
    strokeFill(ctx, '#81C784', '#2E7D32', s * 0.04);
    ctx.fillStyle = '#fff';
    for (let i = 0; i < 4; i++) {
      const h = s * (0.06 + i * 0.03);
      rr(ctx, x - s * 0.18 + i * s * 0.1, y - h / 2, s * 0.06, h, 2);
      ctx.fill();
    }
  },
  bottle(ctx, x, y, s) {
    rr(ctx, x - s * 0.08, y - s * 0.32, s * 0.16, s * 0.12, s * 0.03);
    strokeFill(ctx, '#4FC3F7', '#0277BD', s * 0.03);
    rr(ctx, x - s * 0.16, y - s * 0.2, s * 0.32, s * 0.42, s * 0.1);
    strokeFill(ctx, '#81D4FA', '#0288D1', s * 0.04);
  },
  cookie(ctx, x, y, s) {
    ctx.beginPath();
    ctx.arc(x, y, s * 0.28, 0, Math.PI * 2);
    strokeFill(ctx, '#D7A86E', '#6D4C41', s * 0.04);
    ctx.fillStyle = '#5D4037';
    [[-0.1, -0.08], [0.1, -0.05], [0, 0.1], [-0.08, 0.12], [0.12, 0.08]].forEach(([ox, oy]) => {
      ctx.beginPath();
      ctx.arc(x + s * ox, y + s * oy, s * 0.035, 0, Math.PI * 2);
      ctx.fill();
    });
  },
  muffin(ctx, x, y, s) {
    ctx.beginPath();
    ctx.ellipse(x, y - s * 0.08, s * 0.24, s * 0.16, 0, 0, Math.PI * 2);
    strokeFill(ctx, '#FFAB91', '#BF360C', s * 0.035);
    rr(ctx, x - s * 0.2, y - s * 0.02, s * 0.4, s * 0.28, s * 0.04);
    strokeFill(ctx, '#FFCC80', '#E65100', s * 0.035);
  },
  wok(ctx, x, y, s) {
    // 炒锅：深灰圆锅 + 橙色火焰
    ctx.beginPath();
    ctx.ellipse(x, y + s * 0.08, s * 0.3, s * 0.16, 0, 0, Math.PI * 2);
    strokeFill(ctx, '#455A64', '#1A237E', s * 0.045);
    ctx.beginPath();
    ctx.moveTo(x - s * 0.32, y + s * 0.02);
    ctx.lineTo(x - s * 0.45, y - s * 0.06);
    ctx.strokeStyle = '#37474F';
    ctx.lineWidth = s * 0.055;
    ctx.stroke();
    // 火焰
    ctx.beginPath();
    ctx.moveTo(x - s * 0.08, y + s * 0.02);
    ctx.quadraticCurveTo(x - s * 0.12, y - s * 0.2, x, y - s * 0.28);
    ctx.quadraticCurveTo(x + s * 0.12, y - s * 0.2, x + s * 0.08, y + s * 0.02);
    strokeFill(ctx, '#FF7043', '#E64A19', s * 0.03);
  },
  pan(ctx, x, y, s) {
    // 平底锅：浅银圆盘 + 长柄（和炒锅明显不同）
    ctx.beginPath();
    ctx.arc(x - s * 0.06, y, s * 0.24, 0, Math.PI * 2);
    strokeFill(ctx, '#B0BEC5', '#546E7A', s * 0.045);
    ctx.beginPath();
    ctx.arc(x - s * 0.06, y, s * 0.14, 0, Math.PI * 2);
    strokeFill(ctx, '#ECEFF1', '#78909C', s * 0.03);
    rr(ctx, x + s * 0.14, y - s * 0.04, s * 0.28, s * 0.08, s * 0.03);
    strokeFill(ctx, '#8D6E63', '#4E342E', s * 0.03);
  },
  pot(ctx, x, y, s) {
    rr(ctx, x - s * 0.22, y - s * 0.08, s * 0.44, s * 0.3, s * 0.06);
    strokeFill(ctx, '#5C6BC0', '#283593', s * 0.04);
    ctx.beginPath();
    ctx.arc(x, y - s * 0.1, s * 0.18, Math.PI, 0);
    ctx.strokeStyle = '#283593';
    ctx.lineWidth = s * 0.05;
    ctx.stroke();
  },
  egg(ctx, x, y, s) {
    ctx.beginPath();
    ctx.ellipse(x, y, s * 0.26, s * 0.3, 0, 0, Math.PI * 2);
    strokeFill(ctx, '#FFFDE7', '#F9A825', s * 0.04);
    ctx.beginPath();
    ctx.arc(x + s * 0.02, y + s * 0.02, s * 0.12, 0, Math.PI * 2);
    strokeFill(ctx, '#FFD54F', '#F57F17', s * 0.035);
  },
  tomato(ctx, x, y, s) {
    ctx.beginPath();
    ctx.arc(x, y + s * 0.04, s * 0.26, 0, Math.PI * 2);
    strokeFill(ctx, '#EF5350', '#C62828', s * 0.045);
    ctx.beginPath();
    ctx.moveTo(x, y - s * 0.18);
    ctx.quadraticCurveTo(x + s * 0.1, y - s * 0.3, x + s * 0.04, y - s * 0.34);
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = s * 0.05;
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(x - s * 0.08, y - s * 0.2, s * 0.08, s * 0.04, -0.4, 0, Math.PI * 2);
    strokeFill(ctx, '#66BB6A', '#2E7D32', s * 0.025);
  },
  spatula(ctx, x, y, s) {
    rr(ctx, x - s * 0.12, y - s * 0.28, s * 0.24, s * 0.28, s * 0.04);
    strokeFill(ctx, '#FFD54F', '#F57F17', s * 0.035);
    rr(ctx, x - s * 0.04, y, s * 0.08, s * 0.3, s * 0.02);
    strokeFill(ctx, '#A1887F', '#5D4037', s * 0.03);
  },
  pepper(ctx, x, y, s) {
    ctx.beginPath();
    ctx.ellipse(x, y + s * 0.05, s * 0.16, s * 0.26, 0.2, 0, Math.PI * 2);
    strokeFill(ctx, '#E53935', '#B71C1C', s * 0.04);
    ctx.beginPath();
    ctx.moveTo(x, y - s * 0.2);
    ctx.quadraticCurveTo(x + s * 0.08, y - s * 0.32, x + s * 0.02, y - s * 0.36);
    ctx.strokeStyle = '#2E7D32';
    ctx.lineWidth = s * 0.05;
    ctx.stroke();
  },
  goldenpie(ctx, x, y, s) {
    ctx.beginPath();
    ctx.arc(x, y + s * 0.05, s * 0.28, Math.PI, 0);
    ctx.lineTo(x + s * 0.28, y + s * 0.18);
    ctx.lineTo(x - s * 0.28, y + s * 0.18);
    ctx.closePath();
    strokeFill(ctx, '#FFD54F', '#F9A825', s * 0.045);
    ctx.beginPath();
    ctx.arc(x, y - s * 0.02, s * 0.12, 0, Math.PI * 2);
    strokeFill(ctx, '#FFE082', '#FF8F00', s * 0.03);
  },
  pie(ctx, x, y, s) { ICONS.goldenpie(ctx, x, y, s); },
  pancake(ctx, x, y, s) {
    for (let i = 2; i >= 0; i--) {
      ctx.beginPath();
      ctx.ellipse(x, y + i * s * 0.06, s * 0.28, s * 0.1, 0, 0, Math.PI * 2);
      strokeFill(ctx, '#FFCC80', '#EF6C00', s * 0.03);
    }
  },
  tart(ctx, x, y, s) {
    ctx.beginPath();
    ctx.arc(x, y, s * 0.26, 0, Math.PI * 2);
    strokeFill(ctx, '#FFB74D', '#E65100', s * 0.04);
    ctx.beginPath();
    ctx.arc(x, y, s * 0.16, 0, Math.PI * 2);
    strokeFill(ctx, '#EF5350', '#C62828', s * 0.03);
  },
  donut(ctx, x, y, s) {
    ctx.beginPath();
    ctx.arc(x, y, s * 0.28, 0, Math.PI * 2);
    strokeFill(ctx, '#F48FB1', '#AD1457', s * 0.04);
    ctx.beginPath();
    ctx.arc(x, y, s * 0.1, 0, Math.PI * 2);
    ctx.fillStyle = '#FFF8E1';
    ctx.fill();
    ctx.strokeStyle = '#AD1457';
    ctx.lineWidth = s * 0.03;
    ctx.stroke();
  },
  popcorn(ctx, x, y, s) {
    [[0, -0.12], [-0.14, 0.05], [0.14, 0.05], [0, 0.16]].forEach(([ox, oy], i) => {
      ctx.beginPath();
      ctx.arc(x + s * ox, y + s * oy, s * 0.12, 0, Math.PI * 2);
      strokeFill(ctx, i % 2 ? '#FFF59D' : '#FFE082', '#F9A825', s * 0.03);
    });
  },
  ppt(ctx, x, y, s) {
    rr(ctx, x - s * 0.24, y - s * 0.2, s * 0.48, s * 0.4, s * 0.06);
    strokeFill(ctx, '#CE93D8', '#6A1B9A', s * 0.04);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = s * 0.04;
    ctx.beginPath();
    ctx.moveTo(x - s * 0.14, y + s * 0.08);
    ctx.lineTo(x - s * 0.02, y - s * 0.06);
    ctx.lineTo(x + s * 0.06, y + s * 0.02);
    ctx.lineTo(x + s * 0.16, y - s * 0.1);
    ctx.stroke();
  },
};
