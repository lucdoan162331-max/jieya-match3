import { Board } from './board.js';
import { Renderer } from './renderer.js';
import { LEVELS, checkLevelGoal, getGoalText } from './levels.js';
import {
  CAFFEINE_TRIGGER, CAFFEINE_DURATION, CAFFEINE_SHAKE_MS,
  POT_STUN_DURATION, MEETING_TAP_TARGET, MEETING_TAP_TIMEOUT,
  ANIM_SPEED_NORMAL, ANIM_SPEED_CAFFEINE, SAVE_KEY,
} from './config.js';
import {
  playMatchTile, playSwap, playInvalid, playPotThrow,
  playCaffeine, playMeetingTap, playWin,
  randomSfxLine, showSfxToast, resumeAudio,
} from './audio.js';
import { startBgm, stopBgm } from './bgm.js';
import { MEETING_LINES } from './config.js';
import { getTileSet, hasTag, getTileDef } from './tile-sets.js';
import { RewardEngine } from './rewards.js';

export class Game {
  constructor(canvas, callbacks = {}) {
    this.canvas = canvas;
    this.renderer = new Renderer(canvas);
    this.callbacks = callbacks;
    this.board = null;
    this.level = null;
    this.levelIndex = 0;

    this.score = 0;
    this.movesLeft = 0;
    this.stress = 0;
    this.progress = this.freshProgress();

    this.busy = false;
    this.paused = false;
    this.caffeineActive = false;
    this.caffeineEnd = 0;
    this.coffeeComboCount = 0;

    this.globalStats = this.loadStats();

    this.touchStart = null;
    this.animFrame = null;
    this.meetingTaps = 0;
    this.meetingActive = false;
    this.tileSetId = 'morning';
    this.tileSet = getTileSet('morning');
    this.rewards = new RewardEngine(this);

    this._bindInput();
  }

  freshProgress() {
    return {
      clearedTotal: 0,
      clearedByType: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
      caffeineTriggers: 0,
      potThrows: 0,
      bigPieMatches: 0,
      score: 0,
      stress: 0,
    };
  }

  loadStats() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) { /* silent */ }
    return {
      levelsCleared: 0,
      clearedLevels: [],
      totalScore: 0,
      maxStress: 0,
      caffeineTriggers: 0,
      potThrows: 0,
      bigPieTriggers: 0,
    };
  }

  saveStats() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(this.globalStats));
  }

  getAnimSpeed() {
    return this.caffeineActive ? ANIM_SPEED_CAFFEINE : ANIM_SPEED_NORMAL;
  }

  startLevel(index) {
    resumeAudio();
    this.levelIndex = index;
    this.level = LEVELS[index];
    this.tileSetId = this.level.tileSet;
    this.tileSet = getTileSet(this.tileSetId);
    this.board = new Board(8, this.tileSet.weights);
    this.renderer.setTileSet(this.tileSet);
    this.score = 0;
    this.movesLeft = this.level.moves;
    this.stress = 0;
    this.progress = this.freshProgress();
    this.coffeeComboCount = 0;
    this.caffeineActive = false;
    this.busy = false;
    this.paused = false;
    this.rewards.resetLevel();

    this.callbacks.onLevelStart?.(this);
    startBgm(this.tileSetId);
    this._scheduleResize();
    this.loop();
  }

  _scheduleResize() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => this.resize());
    });
  }

  resize() {
    const wrap = document.getElementById('board-wrap');
    if (!wrap || !this.board) return;
    const w = wrap.clientWidth || window.innerWidth - 24;
    const h = wrap.clientHeight || window.innerHeight * 0.55;
    this.renderer.resize(w, h, this.board.size);
  }

  loop() {
    cancelAnimationFrame(this.animFrame);
    const tick = () => {
      if (!this.renderer.cellSize && this.board) {
        this.resize();
      }
      if (!this.paused && !this.meetingActive && this.board) {
        const now = Date.now();
        if (this.caffeineActive && now > this.caffeineEnd) {
          this.caffeineActive = false;
          this.callbacks.onCaffeineEnd?.();
        }
        this.renderer.draw(this.board, now);
      }
      this.animFrame = requestAnimationFrame(tick);
    };
    tick();
  }

  _bindInput() {
    const onStart = (x, y) => {
      if (this.busy || this.paused || this.meetingActive) return;
      resumeAudio();
      const cell = this.renderer.screenToCell(x, y);
      if (!cell) return;
      if (this.board.isStunned(cell.r, cell.c)) return;

      if (this.renderer.selected) {
        const sel = this.renderer.selected;
        if (sel.r === cell.r && sel.c === cell.c) {
          this.renderer.setSelected(null);
          return;
        }
        if (this.board.isAdjacent(sel.r, sel.c, cell.r, cell.c)) {
          this.trySwap(sel.r, sel.c, cell.r, cell.c);
        } else {
          this.renderer.setSelected(cell.r, cell.c);
        }
      } else {
        this.renderer.setSelected(cell.r, cell.c);
      }
    };

    const onEnd = (x, y) => {
      if (!this.touchStart || this.busy || this.paused) return;
      const dx = x - this.touchStart.x;
      const dy = y - this.touchStart.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 20) return;

      const cell = this.renderer.screenToCell(this.touchStart.x, this.touchStart.y);
      if (!cell || this.board.isStunned(cell.r, cell.c)) return;

      let tr = cell.r, tc = cell.c;
      if (Math.abs(dx) > Math.abs(dy)) {
        tc += dx > 0 ? 1 : -1;
      } else {
        tr += dy > 0 ? 1 : -1;
      }

      if (tr >= 0 && tr < 8 && tc >= 0 && tc < 8) {
        this.trySwap(cell.r, cell.c, tr, tc);
      }
      this.touchStart = null;
    };

    this.canvas.addEventListener('mousedown', (e) => {
      this.touchStart = { x: e.clientX, y: e.clientY };
      onStart(e.clientX, e.clientY);
    });
    this.canvas.addEventListener('mouseup', (e) => onEnd(e.clientX, e.clientY));

    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const t = e.touches[0];
      this.touchStart = { x: t.clientX, y: t.clientY };
      onStart(t.clientX, t.clientY);
    }, { passive: false });

    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      const t = e.changedTouches[0];
      onEnd(t.clientX, t.clientY);
    }, { passive: false });
  }

  async trySwap(r1, c1, r2, c2) {
    if (this.busy) return;
    this.renderer.setSelected(null);
    this.busy = true;

    const tile1 = this.board.get(r1, c1);
    const tile2 = this.board.get(r2, c2);
    if (tile1 < 0 || tile2 < 0) {
      this.busy = false;
      return;
    }

    const isPot = (idx) => hasTag(this.tileSetId, idx, 'pot');
    const potOnEdge =
      (isPot(tile1) && this.board.isOnEdge(r2, c2)) ||
      (isPot(tile2) && this.board.isOnEdge(r1, c1));

    if (potOnEdge) {
      const potR = isPot(tile1) ? r2 : r1;
      const potC = isPot(tile1) ? c2 : c1;
      const otherR = isPot(tile1) ? r1 : r2;
      const otherC = isPot(tile1) ? c1 : c2;
      const potIdx = isPot(tile1) ? tile1 : tile2;

      this.board.swap(r1, c1, r2, c2);
      await this.renderer.animateSwap(r1, c1, r2, c2);
      await this.handlePotThrow(potR, potC, otherR, otherC, potIdx);
      this.useMove();
      return;
    }

    this.board.swap(r1, c1, r2, c2);
    playSwap();
    await this.renderer.animateSwap(r1, c1, r2, c2);

    const matches = this.board.findMatches();
    if (matches.length === 0) {
      await this.renderer.animateSwap(r1, c1, r2, c2, { revert: true });
      this.board.swap(r1, c1, r2, c2);
      playInvalid();
      this.busy = false;
      return;
    }

    this.useMove();
    await this.processMatches(matches);
  }

  useMove() {
    this.movesLeft--;
    this.stress = Math.min(100, this.stress + this.level.stressPerMove);
    this.progress.stress = this.stress;
    this.globalStats.maxStress = Math.max(this.globalStats.maxStress, this.stress);
    this.callbacks.onStateChange?.(this);
    this.checkEnd();
  }

  async handlePotThrow(potR, potC, otherR, otherC, potIdx) {
    playPotThrow();
    showSfxToast('锅锅弹射！');

    const throwResult = this.board.throwPot(potR, potC);
    if (throwResult) {
      const { to } = throwResult;
      const targetTile = this.board.get(to.r, to.c);
      this.board.stunCell(to.r, to.c, POT_STUN_DURATION);
      this.progress.potThrows++;
      this.globalStats.potThrows++;

      const fromPos = this.renderer.cellCenter(potR, potC);
      const toPos = this.renderer.cellCenter(to.r, to.c);
      for (let i = 0; i < 5; i++) {
        this.renderer.addParticle(
          fromPos.x + (toPos.x - fromPos.x) * i / 5,
          fromPos.y + (toPos.y - fromPos.y) * i / 5,
          potIdx
        );
      }

      const names = getTileDef(this.tileSetId, targetTile).name;
      showSfxToast(`撞到了${names}，晕乎乎～`);
      await this.delay(400 / this.getAnimSpeed());
    }

    this.busy = false;
    this.callbacks.onStateChange?.(this);
    this.checkEnd();
  }

  async processMatches(initialMatches) {
    this.busy = true;
    let matches = initialMatches;
    let chainCount = 0;

    while (matches.length > 0) {
      chainCount++;
      const allCells = [];
      let hasBigPie = false;
      let coffeeGroups = 0;

      for (const m of matches) {
        for (const cell of m.cells) allCells.push(cell);
        this.progress.clearedTotal += m.cells.length;
        this.progress.clearedByType[m.type] = (this.progress.clearedByType[m.type] || 0) + m.cells.length;

        const basePts = m.cells.length * 10;
        const { total, bonus } = this.rewards.onChain(chainCount, basePts);
        const lucky = this.rewards.rollLucky();
        const pts = total + lucky;
        this.score += pts;
        this.progress.score = this.score;
        this.globalStats.totalScore += pts;

        if (hasTag(this.tileSetId, m.type, 'caffeine')) coffeeGroups++;
        if (hasTag(this.tileSetId, m.type, 'pie') && m.size >= 5) {
          hasBigPie = true;
          this.progress.bigPieMatches++;
          this.globalStats.bigPieTriggers++;
        }

        for (const cell of m.cells) {
          const pos = this.renderer.cellCenter(cell.r, cell.c);
          this.renderer.addParticle(pos.x, pos.y, m.type);
        }
      }

      // 去重
      const unique = [...new Map(allCells.map(c => [`${c.r},${c.c}`, c])).values()];
      this.renderer.setHighlight(unique);

      const matchTypes = [...new Set(matches.map((m) => m.type))];
      matchTypes.forEach((typeIdx, i) => {
        const key = this.tileSet.tiles[typeIdx]?.key || 'default';
        setTimeout(() => playMatchTile(key, chainCount), i * 60);
      });
      showSfxToast(randomSfxLine());

      // 冰美式连击 → 心悸模式
      if (coffeeGroups > 0) {
        this.coffeeComboCount += coffeeGroups;
        if (this.coffeeComboCount >= CAFFEINE_TRIGGER && !this.caffeineActive) {
          this.triggerCaffeine();
        }
      }

      await this.delay(300 / this.getAnimSpeed());

      this.board.removeCells(unique);
      this.renderer.clearHighlight();
      await this.delay(150 / this.getAnimSpeed());

      this.board.applyGravity();
      await this.delay(250 / this.getAnimSpeed());

      matches = this.board.findMatches();

      // 天降大饼
      if (hasBigPie) {
        await this.triggerMeeting();
      }
    }

    if (!this.board.hasValidMoves()) {
      this.board.shuffle();
      showSfxToast('局面太挤啦，自动换个排列～');
    }

    this.busy = false;
    this.rewards.checkMilestones(this.progress, this.level);
    this.callbacks.onStateChange?.(this);
    this.checkEnd();
  }

  triggerCaffeine() {
    this.caffeineActive = true;
    this.caffeineEnd = Date.now() + CAFFEINE_DURATION;
    this.coffeeComboCount = 0;
    this.progress.caffeineTriggers++;
    this.globalStats.caffeineTriggers++;
    playCaffeine();
    showSfxToast('续命加速！抖一下更带感～');
    this.callbacks.onCaffeineStart?.();
    this.callbacks.onCaffeineShake?.();
  }

  async triggerMeeting() {
    this.meetingActive = true;
    this.meetingTaps = 0;
    this.callbacks.onMeetingStart?.();

    return new Promise((resolve) => {
      const screen = document.getElementById('screen-meeting');
      const progress = document.getElementById('tap-progress');
      const count = document.getElementById('tap-count');
      const text = document.getElementById('meeting-text');
      screen.classList.remove('hidden');
      screen.classList.add('active');

      let lineIdx = 0;
      const lineTimer = setInterval(() => {
        text.textContent = MEETING_LINES[lineIdx % MEETING_LINES.length];
        lineIdx++;
      }, 600);

      const timeout = setTimeout(() => {
        cleanup();
        showSfxToast('泡泡戳完啦，超解压！');
        resolve();
      }, MEETING_TAP_TIMEOUT);

      const onTap = () => {
        this.meetingTaps++;
        playMeetingTap();
        const pct = (this.meetingTaps / MEETING_TAP_TARGET) * 100;
        progress.style.width = pct + '%';
        count.textContent = `${this.meetingTaps} / ${MEETING_TAP_TARGET}`;
        if (this.meetingTaps >= MEETING_TAP_TARGET) {
          cleanup();
          playWin();
          showSfxToast('金色泡泡全部戳破！爽！');
          resolve();
        }
      };

      const cleanup = () => {
        clearInterval(lineTimer);
        clearTimeout(timeout);
        screen.classList.remove('active');
        screen.classList.add('hidden');
        screen.removeEventListener('click', onTap);
        screen.removeEventListener('touchstart', onTap);
        this.meetingActive = false;
        progress.style.width = '0%';
        count.textContent = '0 / 30';
      };

      screen.addEventListener('click', onTap);
      screen.addEventListener('touchstart', onTap, { passive: true });
    });
  }

  checkEnd() {
    if (checkLevelGoal(this.level, { ...this.progress, score: this.score, stress: this.stress })) {
      this.onLevelClear();
      return;
    }
    if (this.movesLeft <= 0) {
      this.callbacks.onLevelFail?.(this);
    }
  }

  onLevelClear() {
    playWin();
    if (!this.globalStats.clearedLevels.includes(this.level.id)) {
      this.globalStats.clearedLevels.push(this.level.id);
      this.globalStats.levelsCleared = this.globalStats.clearedLevels.length;
    }
    this.saveStats();
    this.callbacks.onLevelClear?.(this);
  }

  delay(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  pause() { this.paused = true; }
  resume() { this.paused = false; }
}

export { LEVELS, getGoalText };
