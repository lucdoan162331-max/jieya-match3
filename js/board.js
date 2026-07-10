import { TILE, GRID_SIZE, MATCH_MIN } from './config.js?v=20260710e';

export class Board {
  constructor(size = GRID_SIZE, weights = null) {
    this.size = size;
    this.weights = weights || [20, 20, 20, 20, 20];
    this.grid = [];
    this.stunTimers = [];
    this.init();
  }

  init() {
    this.grid = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => TILE.EMPTY)
    );
    this.stunTimers = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => 0)
    );
    this.fillNoMatches();
  }

  randomTile() {
    const total = this.weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let t = 0; t < 5; t++) {
      r -= this.weights[t];
      if (r <= 0) return t;
    }
    return 0;
  }

  fillNoMatches() {
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        let tile;
        let attempts = 0;
        do {
          tile = this.randomTile();
          attempts++;
        } while (attempts < 80 && this.wouldCreateMatch(r, c, tile));
        this.grid[r][c] = tile;
      }
    }
    // 兜底：若仍有三连则整盘重洗
    let guard = 0;
    while (this.findMatches().length > 0 && guard < 20) {
      this._breakAllMatches();
      guard++;
    }
    if (this.findMatches().length > 0 || !this.hasValidMoves()) {
      // 最后手段：重新随机（限制递归）
      if (!this._refilling) {
        this._refilling = true;
        this.fillNoMatches();
        this._refilling = false;
      }
    }
  }

  _breakAllMatches() {
    const matches = this.findMatches();
    for (const m of matches) {
      for (const { r, c } of m.cells) {
        let t;
        let attempts = 0;
        do {
          t = this.randomTile();
          attempts++;
        } while (attempts < 40 && this.wouldCreateMatch(r, c, t));
        this.grid[r][c] = t;
      }
    }
  }

  wouldCreateMatch(r, c, tile) {
    // 水平：看左侧已有两连
    if (c >= 2 && this.get(r, c - 1) === tile && this.get(r, c - 2) === tile) return true;
    // 垂直：看上方已有两连
    if (r >= 2 && this.get(r - 1, c) === tile && this.get(r - 2, c) === tile) return true;
    return false;
  }

  get(r, c) {
    if (r < 0 || r >= this.size || c < 0 || c >= this.size) return TILE.EMPTY;
    return this.grid[r][c];
  }

  set(r, c, val) {
    if (r >= 0 && r < this.size && c >= 0 && c < this.size) {
      this.grid[r][c] = val;
    }
  }

  isStunned(r, c, now = Date.now()) {
    return this.stunTimers[r][c] > now;
  }

  stunCell(r, c, duration, now = Date.now()) {
    this.stunTimers[r][c] = now + duration;
  }

  swap(r1, c1, r2, c2) {
    const tmp = this.grid[r1][c1];
    this.grid[r1][c1] = this.grid[r2][c2];
    this.grid[r2][c2] = tmp;
  }

  isAdjacent(r1, c1, r2, c2) {
    return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
  }

  isOnEdge(r, c) {
    return r === 0 || r === this.size - 1 || c === 0 || c === this.size - 1;
  }

  /**
   * 找所有匹配：先收集所有 ≥3 连的格子，再按类型连通合并。
   * 修复旧逻辑在 L/T 形时漏消的问题。
   */
  findMatches() {
    const matched = new Map(); // key -> {r,c,type}

    const markRun = (cells, type) => {
      if (cells.length < MATCH_MIN) return;
      for (const cell of cells) {
        matched.set(`${cell.r},${cell.c}`, { ...cell, type });
      }
    };

    // 水平
    for (let r = 0; r < this.size; r++) {
      let c = 0;
      while (c < this.size) {
        const tile = this.get(r, c);
        if (tile < 0) { c++; continue; }
        let end = c + 1;
        while (end < this.size && this.get(r, end) === tile) end++;
        const cells = [];
        for (let i = c; i < end; i++) cells.push({ r, c: i });
        markRun(cells, tile);
        c = end;
      }
    }

    // 垂直
    for (let c = 0; c < this.size; c++) {
      let r = 0;
      while (r < this.size) {
        const tile = this.get(r, c);
        if (tile < 0) { r++; continue; }
        let end = r + 1;
        while (end < this.size && this.get(end, c) === tile) end++;
        const cells = [];
        for (let i = r; i < end; i++) cells.push({ r: i, c });
        markRun(cells, tile);
        r = end;
      }
    }

    if (matched.size === 0) return [];

    // BFS 按类型连通成组
    const visited = new Set();
    const result = [];
    for (const [key, cell] of matched) {
      if (visited.has(key)) continue;
      const type = cell.type;
      const cells = [];
      const queue = [cell];
      visited.add(key);
      while (queue.length) {
        const cur = queue.shift();
        cells.push({ r: cur.r, c: cur.c });
        for (const [dr, dc] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
          const nk = `${cur.r + dr},${cur.c + dc}`;
          if (!visited.has(nk) && matched.has(nk) && matched.get(nk).type === type) {
            visited.add(nk);
            queue.push(matched.get(nk));
          }
        }
      }
      if (cells.length >= MATCH_MIN) {
        result.push({ cells, type, size: cells.length });
      }
    }
    return result;
  }

  removeCells(cells) {
    for (const { r, c } of cells) {
      this.grid[r][c] = TILE.EMPTY;
    }
  }

  /** 下落填充：尽量避免立刻形成新三连 */
  applyGravity() {
    const moves = [];
    for (let c = 0; c < this.size; c++) {
      let writeRow = this.size - 1;
      for (let r = this.size - 1; r >= 0; r--) {
        if (this.grid[r][c] !== TILE.EMPTY) {
          if (r !== writeRow) {
            moves.push({ from: { r, c }, to: { r: writeRow, c }, tile: this.grid[r][c] });
            this.grid[writeRow][c] = this.grid[r][c];
            this.grid[r][c] = TILE.EMPTY;
            this.stunTimers[writeRow][c] = this.stunTimers[r][c];
            this.stunTimers[r][c] = 0;
          }
          writeRow--;
        }
      }
      for (let r = writeRow; r >= 0; r--) {
        let tile;
        let attempts = 0;
        do {
          tile = this.randomTile();
          attempts++;
        } while (attempts < 30 && this.wouldCreateMatch(r, c, tile));
        this.grid[r][c] = tile;
        moves.push({ from: { r: -1, c }, to: { r, c }, tile, isNew: true });
      }
    }
    return moves;
  }

  throwPot(fromR, fromC) {
    const neighbors = [];
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    for (const [dr, dc] of dirs) {
      const nr = fromR + dr;
      const nc = fromC + dc;
      if (nr >= 0 && nr < this.size && nc >= 0 && nc < this.size) {
        if (this.get(nr, nc) >= 0) neighbors.push({ r: nr, c: nc });
      }
    }
    if (neighbors.length === 0) return null;
    const target = neighbors[Math.floor(Math.random() * neighbors.length)];
    return { from: { r: fromR, c: fromC }, to: target };
  }

  hasValidMoves() {
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (this.isStunned(r, c)) continue;
        for (const [dr, dc] of [[0, 1], [1, 0]]) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr < this.size && nc < this.size && !this.isStunned(nr, nc)) {
            this.swap(r, c, nr, nc);
            const matches = this.findMatches();
            this.swap(r, c, nr, nc);
            if (matches.length > 0) return true;
          }
        }
      }
    }
    return false;
  }

  shuffle() {
    const tiles = [];
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (this.get(r, c) >= 0) tiles.push(this.get(r, c));
      }
    }
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    let idx = 0;
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (this.get(r, c) >= 0) this.grid[r][c] = tiles[idx++];
      }
    }
    if (!this.hasValidMoves() || this.findMatches().length > 0) {
      this.init();
    }
  }
}
