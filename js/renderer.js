import { drawCrystalTile } from './tile-art.js';
import { getTileSet } from './tile-sets.js';

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.cellSize = 0;
    this.tileSet = getTileSet('morning');
    this.offsetX = 0;
    this.offsetY = 0;
    this.animations = [];
    this.selected = null;
    this.highlightCells = new Set();
    this.particles = [];
  }

  resize(containerWidth, containerHeight, gridSize) {
    const padding = 8;
    const availW = Math.max(containerWidth - padding * 2, 280);
    const availH = Math.max(containerHeight - padding * 2, 280);
    const cellSize = Math.floor(Math.min(availW, availH) / gridSize);
    const boardSize = cellSize * gridSize;

    this.canvas.width = boardSize * (window.devicePixelRatio || 1);
    this.canvas.height = boardSize * (window.devicePixelRatio || 1);
    this.canvas.style.width = boardSize + 'px';
    this.canvas.style.height = boardSize + 'px';
    const dpr = window.devicePixelRatio || 1;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.cellSize = cellSize;
    this.gridSize = gridSize;
    this.boardSize = boardSize;
  }

  setTileSet(tileSet) {
    this.tileSet = tileSet;
  }

  artKey(index) {
    return this.tileSet.tiles[index]?.key || 'coffee';
  }

  cellCenter(r, c) {
    return {
      x: c * this.cellSize + this.cellSize / 2,
      y: r * this.cellSize + this.cellSize / 2,
    };
  }

  draw(board, now = Date.now()) {
    const { ctx, cellSize, gridSize, boardSize } = this;
    ctx.clearRect(0, 0, boardSize, boardSize);

    // 棋盘 — 磨砂玻璃台面
    const bgGrad = ctx.createLinearGradient(0, 0, boardSize, boardSize);
    bgGrad.addColorStop(0, 'rgba(255,255,255,0.55)');
    bgGrad.addColorStop(0.5, 'rgba(255,248,252,0.45)');
    bgGrad.addColorStop(1, 'rgba(232,244,255,0.5)');
    ctx.fillStyle = bgGrad;
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(0, 0, boardSize, boardSize, 14);
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, boardSize, boardSize);
    }

    // 内边框光晕
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 2;
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(1, 1, boardSize - 2, boardSize - 2, 13);
      ctx.stroke();
    }

    // 格子槽
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const x = c * cellSize;
        const y = r * cellSize;
        const isHL = this.highlightCells.has(`${r},${c}`);
        const isSel = this.selected && this.selected.r === r && this.selected.c === c;
        const pad = cellSize * 0.06;

        // 凹槽
        const slotGrad = ctx.createRadialGradient(
          x + cellSize / 2, y + cellSize / 2, 0,
          x + cellSize / 2, y + cellSize / 2, cellSize * 0.5
        );
        if (isHL) {
          slotGrad.addColorStop(0, 'rgba(233,69,96,0.25)');
          slotGrad.addColorStop(1, 'rgba(233,69,96,0.08)');
        } else {
          slotGrad.addColorStop(0, 'rgba(255,255,255,0.04)');
          slotGrad.addColorStop(1, 'rgba(0,0,0,0.2)');
        }
        roundRect(ctx, x + pad, y + pad, cellSize - pad * 2, cellSize - pad * 2, cellSize * 0.15);
        ctx.fillStyle = slotGrad;
        ctx.fill();

        if (isSel) {
          ctx.strokeStyle = '#ff6b8a';
          ctx.lineWidth = 2.5;
          ctx.shadowColor = '#e94560';
          ctx.shadowBlur = 12;
          roundRect(ctx, x + pad, y + pad, cellSize - pad * 2, cellSize - pad * 2, cellSize * 0.15);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }
    }

    // 水晶方块
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const tile = board.get(r, c);
        if (tile < 0) continue;

        const anim = this.getAnimOffset(r, c);
        const x = c * cellSize + cellSize / 2 + anim.dx;
        const y = r * cellSize + cellSize / 2 + anim.dy;
        const scale = anim.scale;
        const stunned = board.isStunned(r, c, now);

        drawCrystalTile(ctx, this.artKey(tile), x, y, cellSize * 0.82 * scale, stunned);
      }
    }

    // 粒子
    this.particles = this.particles.filter(p => {
      p.life -= 0.02;
      if (p.life <= 0) return false;
      ctx.globalAlpha = p.life;
      if (p.tileIndex !== undefined) {
        drawCrystalTile(ctx, this.artKey(p.tileIndex), p.x, p.y, p.size, false);
      } else {
        ctx.font = `bold ${p.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#FFE082';
        ctx.fillText(p.emoji, p.x, p.y);
      }
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25;
      ctx.globalAlpha = 1;
      return true;
    });
  }

  getAnimOffset(r, c) {
    for (const a of this.animations) {
      if (a.r === r && a.c === c) {
        return { dx: a.dx || 0, dy: a.dy || 0, scale: a.scale || 1 };
      }
    }
    return { dx: 0, dy: 0, scale: 1 };
  }

  addParticle(x, y, tileIndex) {
    if (typeof tileIndex === 'number') {
      this.particles.push({
        x, y, tileIndex,
        vx: (Math.random() - 0.5) * 5,
        vy: -Math.random() * 5 - 2,
        life: 1,
        size: 18 + Math.random() * 8,
      });
    } else {
      this.particles.push({
        x, y, emoji: tileIndex,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 4 - 2,
        life: 1,
        size: 16 + Math.random() * 8,
      });
    }
  }

  screenToCell(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const c = Math.floor(x / this.cellSize);
    const r = Math.floor(y / this.cellSize);
    if (r >= 0 && r < this.gridSize && c >= 0 && c < this.gridSize) {
      return { r, c };
    }
    return null;
  }

  setSelected(r, c) {
    this.selected = r !== null ? { r, c } : null;
  }

  setHighlight(cells) {
    this.highlightCells = new Set(cells.map(({ r, c }) => `${r},${c}`));
  }

  clearHighlight() {
    this.highlightCells.clear();
  }

  clearAnimations() {
    this.animations = [];
  }

  _waitFrame(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  _easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  _setSwapOffsets(r1, c1, r2, c2, progress, shakeX = 0) {
    const cs = this.cellSize;
    const dr = r2 - r1;
    const dc = c2 - c1;
    const ox = dc * cs * progress + shakeX;
    const oy = dr * cs * progress;
    this.animations = [
      { r: r1, c: c1, dx: ox, dy: oy },
      { r: r2, c: c2, dx: -ox, dy: -oy },
    ];
  }

  /** 交换动画：revert=true 时抖动后归位 */
  async animateSwap(r1, c1, r2, c2, { revert = false } = {}) {
    const steps = 9;
    const frameMs = 14;

    for (let i = 0; i <= steps; i++) {
      const t = this._easeInOut(i / steps);
      this._setSwapOffsets(r1, c1, r2, c2, t);
      await this._waitFrame(frameMs);
    }

    if (revert) {
      for (let s = 0; s < 6; s++) {
        const shake = (s % 2 === 0 ? 6 : -6);
        this._setSwapOffsets(r1, c1, r2, c2, 1, shake);
        await this._waitFrame(32);
      }
      for (let i = steps; i >= 0; i--) {
        const t = this._easeInOut(i / steps);
        this._setSwapOffsets(r1, c1, r2, c2, t);
        await this._waitFrame(frameMs);
      }
    }

    this.clearAnimations();
  }
}

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
