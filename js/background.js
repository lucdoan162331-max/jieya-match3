/** 治愈系动态背景 — 多层动画，不空不闷 */
export class HealingBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.clouds = [];
    this.stars = [];
    this.bubbles = [];
    this.petals = [];
    this.birds = [];
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

    // 远处山丘
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

    // 前景小草摇摆
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
}
