/** 治愈系动态背景 — 多层动画 + 萌宠角色 */
export class HealingBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.clouds = [];
    this.stars = [];
    this.bubbles = [];
    this.petals = [];
    this.birds = [];
    this.mascots = [];
    this.t = 0;
    this._raf = null;
    this._init();
  }

  _init() {
    for (let i = 0; i < 8; i++) {
      this.clouds.push({
        x: Math.random(), y: 0.05 + Math.random() * 0.5,
        scale: 0.4 + Math.random() * 1.0,
        speed: 0.00006 + Math.random() * 0.0001,
      });
    }
    for (let i = 0; i < 40; i++) {
      this.stars.push({
        x: Math.random(), y: Math.random() * 0.7,
        size: 1 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.2,
      });
    }
    for (let i = 0; i < 14; i++) {
      this.bubbles.push({
        x: Math.random(), y: Math.random(),
        r: 10 + Math.random() * 28,
        hue: [320, 200, 160, 45, 280][Math.floor(Math.random() * 5)],
        phase: Math.random() * Math.PI * 2,
        vy: 0.00012 + Math.random() * 0.00018,
      });
    }
    for (let i = 0; i < 18; i++) {
      this.petals.push({
        x: Math.random(), y: Math.random() * -0.2,
        size: 4 + Math.random() * 8,
        rot: Math.random() * Math.PI,
        speed: 0.0002 + Math.random() * 0.0003,
        sway: Math.random() * Math.PI * 2,
        color: ['#FFB7C5', '#FFCDD2', '#F8BBD9', '#E1BEE7'][Math.floor(Math.random() * 4)],
      });
    }
    for (let i = 0; i < 4; i++) {
      this.birds.push({
        x: Math.random(), y: 0.1 + Math.random() * 0.35,
        speed: 0.00015 + Math.random() * 0.0001,
        size: 6 + Math.random() * 4,
        flap: Math.random() * Math.PI * 2,
      });
    }
    // 萌宠放在两侧与顶部，避免被棋盘挡住
    this.mascots = [
      { type: 'snowman', x: 0.08, y: 0.42, scale: 1.35, phase: 0, action: 'bounce' },
      { type: 'cola', x: 0.92, y: 0.38, scale: 1.25, phase: 1.2, action: 'thumbs' },
      { type: 'toast', x: 0.1, y: 0.62, scale: 1.15, phase: 2.5, action: 'jump' },
      { type: 'star', x: 0.9, y: 0.58, scale: 1.2, phase: 0.8, action: 'wave' },
      { type: 'mug', x: 0.5, y: 0.12, scale: 1.1, phase: 3.1, action: 'bounce' },
    ];
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
  }

  start() {
    const tick = () => {
      this.t += 0.016;
      this.draw();
      this._raf = requestAnimationFrame(tick);
    };
    this.resize();
    window.addEventListener('resize', () => this.resize());
    tick();
  }

  draw() {
    const { ctx, w, h, t } = this;

    const sky = ctx.createLinearGradient(0, 0, w * 0.2, h);
    sky.addColorStop(0, '#FFE8F0');
    sky.addColorStop(0.3, '#E8F4FF');
    sky.addColorStop(0.6, '#E0FFF4');
    sky.addColorStop(1, '#FFF5E6');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // 彩虹弧
    ctx.save();
    ctx.globalAlpha = 0.12;
    const rg = ctx.createLinearGradient(w * 0.2, h * 0.15, w * 0.8, h * 0.15);
    ['#FF6B9D', '#FFB74D', '#FFF176', '#81C784', '#4FC3F7', '#9575CD'].forEach((c, i) => {
      rg.addColorStop(i / 5, c);
    });
    ctx.strokeStyle = rg;
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.55, w * 0.35, Math.PI, 0);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = 'rgba(168, 230, 180, 0.2)';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.72);
    ctx.bezierCurveTo(w * 0.2, h * 0.65, w * 0.4, h * 0.75, w * 0.6, h * 0.68);
    ctx.bezierCurveTo(w * 0.8, h * 0.62, w, h * 0.7, w, h * 0.72);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fill();

    this.bubbles.forEach((b) => {
      const bx = b.x * w + Math.sin(t * 0.5 + b.phase) * 25;
      const by = ((b.y + t * b.vy) % 1.15 - 0.05) * h;
      const g = ctx.createRadialGradient(bx, by, 0, bx, by, b.r);
      g.addColorStop(0, `hsla(${b.hue}, 75%, 82%, 0.3)`);
      g.addColorStop(1, `hsla(${b.hue}, 75%, 82%, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(bx, by, b.r, 0, Math.PI * 2);
      ctx.fill();
    });

    this.stars.forEach((s) => {
      const alpha = 0.2 + 0.5 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.beginPath();
      ctx.arc(s.x * w, s.y * h, s.size, 0, Math.PI * 2);
      ctx.fill();
    });

    this.clouds.forEach((c) => {
      c.x = (c.x + c.speed) % 1.2 - 0.1;
      this.drawCloud(ctx, c.x * w, c.y * h, 36 * c.scale);
    });

    this.birds.forEach((b) => {
      b.x = (b.x + b.speed) % 1.15;
      const bx = b.x * w;
      const by = b.y * h + Math.sin(t * 2 + b.flap) * 8;
      const wing = Math.sin(t * 8 + b.flap) * b.size * 0.4;
      ctx.strokeStyle = 'rgba(100,120,160,0.35)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bx - b.size, by + wing);
      ctx.quadraticCurveTo(bx, by - wing, bx + b.size, by + wing);
      ctx.stroke();
    });

    // 萌宠层（草地前）
    this.mascots.forEach((m) => this.drawMascot(ctx, m, w, h, t));

    this.petals.forEach((p) => {
      p.y += p.speed;
      if (p.y > 1.1) { p.y = -0.05; p.x = Math.random(); }
      const px = p.x * w + Math.sin(t * 1.5 + p.sway) * 30;
      const py = p.y * h;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(p.rot + t * 0.5);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    const grass = ctx.createLinearGradient(0, h * 0.78, 0, h);
    grass.addColorStop(0, 'rgba(168, 230, 180, 0)');
    grass.addColorStop(0.5, 'rgba(168, 230, 180, 0.3)');
    grass.addColorStop(1, 'rgba(130, 210, 150, 0.5)');
    ctx.fillStyle = grass;
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, h * 0.84);
    ctx.bezierCurveTo(w * 0.3, h * 0.8, w * 0.6, h * 0.87, w, h * 0.83);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();

    for (let i = 0; i < 12; i++) {
      const gx = (i / 12) * w + (i % 3) * 20;
      const sway = Math.sin(t * 2 + i) * 6;
      ctx.strokeStyle = `rgba(100, 180, 120, ${0.2 + (i % 3) * 0.1})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(gx, h);
      ctx.quadraticCurveTo(gx + sway, h - 20 - (i % 4) * 8, gx + sway * 0.5, h - 35 - (i % 3) * 10);
      ctx.stroke();
    }
  }

  drawMascot(ctx, m, w, h, t) {
    const s = 42 * m.scale;
    let oy = 0;
    let rot = 0;
    const cycle = Math.sin(t * 3 + m.phase);

    if (m.action === 'bounce') oy = Math.abs(Math.sin(t * 4 + m.phase)) * -18;
    if (m.action === 'jump') oy = Math.max(0, Math.sin(t * 3.5 + m.phase)) * -22;
    if (m.action === 'wave') rot = Math.sin(t * 2 + m.phase) * 0.08;
    if (m.action === 'thumbs') oy = Math.sin(t * 2.5 + m.phase) * -6;

    const x = m.x * w;
    const y = m.y * h + oy;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);

    switch (m.type) {
      case 'snowman': this._drawSnowman(ctx, s, t, m.phase); break;
      case 'cola': this._drawColaCup(ctx, s, t, m.phase, m.action); break;
      case 'toast': this._drawToastBuddy(ctx, s, t, m.phase); break;
      case 'star': this._drawStarBuddy(ctx, s, t, m.phase); break;
      case 'mug': this._drawMugBuddy(ctx, s, t, m.phase); break;
    }
    ctx.restore();
  }

  _drawSnowman(ctx, s, t, phase) {
    const bounce = Math.sin(t * 4 + phase) * 3;
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = 'rgba(0,0,0,0.08)';
    ctx.lineWidth = 1.5;
    [[0, s * 0.35, s * 0.28], [0, 0, s * 0.22], [0, -s * 0.28, s * 0.17]].forEach(([ox, oy, r]) => {
      ctx.beginPath();
      ctx.arc(ox, oy + bounce * 0.3, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(-s * 0.06, -s * 0.32 + bounce * 0.3, 3, 0, Math.PI * 2);
    ctx.arc(s * 0.06, -s * 0.32 + bounce * 0.3, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FF8A65';
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.28 + bounce * 0.3);
    ctx.lineTo(s * 0.12, -s * 0.26 + bounce * 0.3);
    ctx.lineTo(0, -s * 0.24 + bounce * 0.3);
    ctx.fill();
    // 挥手
    const wave = Math.sin(t * 5 + phase) * 0.4;
    ctx.strokeStyle = '#90A4AE';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(s * 0.2, -s * 0.1);
    ctx.quadraticCurveTo(s * 0.45, -s * 0.35 + wave * 10, s * 0.35, -s * 0.05);
    ctx.stroke();
  }

  _drawColaCup(ctx, s, t, phase, action) {
    const w = s * 0.5;
    const h = s * 0.65;
    ctx.fillStyle = '#FFEBEE';
    ctx.strokeStyle = '#EF5350';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-w / 2, h / 2);
    ctx.lineTo(-w / 2 + 4, -h / 2);
    ctx.lineTo(w / 2 - 4, -h / 2);
    ctx.lineTo(w / 2, h / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#D32F2F';
    ctx.fillRect(-w / 2 + 6, -h / 4, w - 12, h / 3);
    // 脸
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(-w * 0.15, 0, 3, 0, Math.PI * 2);
    ctx.arc(w * 0.15, 0, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, s * 0.08, w * 0.2, 0.1, Math.PI - 0.1);
    ctx.stroke();
    // 点赞手
    if (action === 'thumbs') {
      const thumbUp = Math.sin(t * 3 + phase) > 0;
      ctx.fillStyle = '#FFCC80';
      if (thumbUp) {
        ctx.fillRect(s * 0.3, -s * 0.15, s * 0.12, s * 0.22);
        ctx.beginPath();
        ctx.arc(s * 0.36, -s * 0.22, s * 0.07, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  _drawToastBuddy(ctx, s, t, phase) {
    const w = s * 0.7;
    const h = s * 0.55;
    ctx.fillStyle = '#FFF8E1';
    ctx.strokeStyle = '#E0C9A6';
    ctx.lineWidth = 2;
    this._rr(ctx, -w / 2, -h / 2, w, h, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(-w * 0.18, -h * 0.08, 3.5, 0, Math.PI * 2);
    ctx.arc(w * 0.18, -h * 0.08, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, h * 0.12, w * 0.15, 0.2, Math.PI - 0.2);
    ctx.stroke();
    // 跳跃腿
    const leg = Math.sin(t * 6 + phase) * 8;
    ctx.strokeStyle = '#BCAAA4';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-w * 0.2, h / 2);
    ctx.lineTo(-w * 0.2 + leg, h / 2 + s * 0.15);
    ctx.moveTo(w * 0.2, h / 2);
    ctx.lineTo(w * 0.2 - leg, h / 2 + s * 0.15);
    ctx.stroke();
  }

  _drawStarBuddy(ctx, s, t, phase) {
    const r = s * 0.32;
    ctx.fillStyle = '#FFF176';
    ctx.strokeStyle = '#FFB300';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const px = Math.cos(a) * r;
      const py = Math.sin(a) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(-r * 0.3, -r * 0.1, 3, 0, Math.PI * 2);
    ctx.arc(r * 0.3, -r * 0.1, 3, 0, Math.PI * 2);
    ctx.fill();
    // 挥动小手
    const arm = Math.sin(t * 4 + phase) * 12;
    ctx.strokeStyle = '#FFB300';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(r * 0.5, r * 0.1);
    ctx.lineTo(r * 0.7 + arm * 0.3, -r * 0.2 + arm * 0.2);
    ctx.stroke();
  }

  _drawMugBuddy(ctx, s, t, phase) {
    const w = s * 0.45;
    const h = s * 0.5;
    ctx.fillStyle = '#E3F2FD';
    ctx.strokeStyle = '#64B5F6';
    ctx.lineWidth = 2;
    this._rr(ctx, -w / 2, -h / 2, w, h, 6);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = '#64B5F6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(w / 2 + 6, 0, 8, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(-w * 0.15, -h * 0.05, 2.5, 0, Math.PI * 2);
    ctx.arc(w * 0.15, -h * 0.05, 2.5, 0, Math.PI * 2);
    ctx.fill();
    // 蒸汽
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 2;
    for (let i = -1; i <= 1; i++) {
      const sx = i * 8;
      const wave = Math.sin(t * 3 + phase + i) * 4;
      ctx.beginPath();
      ctx.moveTo(sx, -h / 2 - 4);
      ctx.quadraticCurveTo(sx + wave, -h / 2 - 14, sx, -h / 2 - 22);
      ctx.stroke();
    }
  }

  drawCloud(ctx, x, y, size) {
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    [[0, 0, size], [-size * 0.55, size * 0.08, size * 0.7], [size * 0.5, size * 0.06, size * 0.75]].forEach(([ox, oy, r]) => {
      ctx.beginPath();
      ctx.arc(x + ox, y + oy, r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  _rr(ctx, x, y, w, h, r) {
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
}
