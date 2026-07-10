import { Game, LEVELS } from './game.js';
import { pickEnding, getGoalDetail } from './levels.js';
import { SAVE_KEY, CAFFEINE_SHAKE_MS } from './config.js';
import { drawCrystalTile } from './tile-art.js';
import { getTileSet } from './tile-sets.js';
import { HealingBackground } from './background.js';
import { stopBgm } from './bgm.js';

const bgCanvas = document.getElementById('bg-canvas');
if (bgCanvas) new HealingBackground(bgCanvas).start();

const screens = {
  start: document.getElementById('screen-start'),
  levels: document.getElementById('screen-levels'),
  game: document.getElementById('screen-game'),
  pause: document.getElementById('screen-pause'),
  levelClear: document.getElementById('screen-level-clear'),
  ending: document.getElementById('screen-ending'),
};

let game = null;
let currentLevelIndex = 0;

function showScreen(name) {
  Object.values(screens).forEach(s => {
    if (!s) return;
    s.classList.remove('active');
    if (s.id === 'screen-pause' ||
        s.id === 'screen-level-clear' || s.id === 'screen-ending') {
      s.classList.add('hidden');
    }
  });
  const target = screens[name];
  if (target) {
    target.classList.add('active');
    if (target.classList.contains('overlay')) {
      target.classList.remove('hidden');
    }
  }
}

function renderLevelList() {
  const list = document.getElementById('level-list');
  const stats = game ? game.globalStats : JSON.parse(localStorage.getItem(SAVE_KEY) || '{}');
  const cleared = stats.clearedLevels || [];

  list.innerHTML = '';
  LEVELS.forEach((level, i) => {
    const unlocked = i === 0 || cleared.includes(LEVELS[i - 1].id);
    const done = cleared.includes(level.id);

    const card = document.createElement('div');
    card.className = 'level-card' + (done ? ' completed' : '') + (unlocked ? '' : ' locked');
    card.innerHTML = `
      <div class="level-num">${done ? '✓' : level.id}</div>
      <div class="level-info-text">
        <h3>${level.name}</h3>
        <p>${level.desc}</p>
        <span class="level-theme">${getTileSet(level.tileSet).label}主题</span>
      </div>
    `;
    if (unlocked) {
      card.addEventListener('click', () => {
        currentLevelIndex = i;
        startGame(i);
      });
    }
    list.appendChild(card);
  });

  const statsBar = document.getElementById('stats-bar');
  statsBar.textContent = `已通关 ${cleared.length}/${LEVELS.length} 关 · 累计 ${stats.totalScore || 0} 分`;
}

function startGame(index) {
  showScreen('game');
  const canvas = document.getElementById('board-canvas');
  const boardWrap = document.getElementById('board-wrap');

  if (!game) {
    game = new Game(canvas, {
      onLevelStart: updateHUD,
      onStateChange: updateHUD,
      onCaffeineStart: () => {
        updateBadges();
      },
      onCaffeineShake: () => {
        boardWrap.classList.remove('shake-burst');
        void boardWrap.offsetWidth;
        boardWrap.classList.add('shake-burst');
        clearTimeout(boardWrap._shakeTimer);
        boardWrap._shakeTimer = setTimeout(() => {
          boardWrap.classList.remove('shake-burst');
        }, CAFFEINE_SHAKE_MS);
      },
      onCaffeineEnd: () => updateBadges(),
      onCombo: (chain, mult) => {
        const bar = document.getElementById('combo-bar');
        const val = document.getElementById('combo-value');
        if (chain >= 2) {
          bar.classList.remove('hidden');
          val.textContent = `×${mult.toFixed(1)}`;
        } else {
          bar.classList.add('hidden');
        }
      },
      onMilestone: () => {},
      onLevelClear: (g) => showLevelClear(g),
      onLevelFail: () => showLevelFail(),
    });
  }

  game.startLevel(index);
  updateHUD(game);

  if (!game._resizeBound) {
    game._resizeBound = true;
    window.addEventListener('resize', () => game.resize());
    const wrap = document.getElementById('board-wrap');
    if (wrap && typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(() => game.resize()).observe(wrap);
    }
  }
}

function updateHUD(g) {
  document.getElementById('level-name').textContent = g.level.name;
  document.getElementById('score').textContent = g.score;
  document.getElementById('stress-value').textContent = g.stress;
  document.getElementById('stress-bar').style.width = g.stress + '%';
  document.getElementById('moves-left').textContent = `剩余步数：${g.movesLeft}`;

  const detail = getGoalDetail(g.level, g.progress, g.score, g.stress);
  document.getElementById('goal-main').textContent = detail.main;
  document.getElementById('goal-sub').textContent = detail.sub;
  document.getElementById('goal-progress-fill').style.width = detail.percent + '%';
  document.getElementById('goal-progress-pct').textContent = Math.round(detail.percent) + '%';

  const goalPanel = document.getElementById('goal-panel');
  if (detail.percent >= 100) {
    goalPanel.classList.add('goal-done');
  } else {
    goalPanel.classList.remove('goal-done');
  }

  updateBadges(g);
}

function updateBadges(g = game) {
  const el = document.getElementById('status-badges');
  if (!el || !g) return;
  el.innerHTML = '';
  if (g.caffeineActive) {
    const b = document.createElement('span');
    b.className = 'badge caffeine';
    b.textContent = '☕ 续命加速 ×1.8';
    el.appendChild(b);
  }
  if (g.coffeeComboCount > 0) {
    const b = document.createElement('span');
    b.className = 'badge';
    b.textContent = `美式连击 ${g.coffeeComboCount}/3`;
    el.appendChild(b);
  }
}

function showLevelClear(g) {
  const modal = document.getElementById('screen-level-clear');
  const stars = g.rewards.calcStars(g.movesLeft, g.stress, g.level);
  const reward = g.rewards.getClearReward(stars);
  const starStr = '★'.repeat(stars) + '☆'.repeat(3 - stars);

  document.getElementById('clear-title').textContent = `${g.level.name} — ${reward.title}`;
  document.getElementById('clear-desc').textContent = `${starStr}\n${reward.sub}`;

  const stats = document.getElementById('clear-stats');
  stats.innerHTML = `
    <div>本关得分：${g.score}</div>
    <div>能量槽：${g.stress}</div>
    <div>锅锅弹射：${g.progress.potThrows}</div>
    <div>续命加速：${g.progress.caffeineTriggers}</div>
  `;

  const isLast = g.levelIndex >= LEVELS.length - 1;
  const btnNext = document.getElementById('btn-next-level');
  btnNext.textContent = isLast ? '查看结局' : '下一关';
  btnNext.onclick = () => {
    modal.classList.add('hidden');
    if (isLast) {
      showEnding(g);
    } else {
      currentLevelIndex = g.levelIndex + 1;
      startGame(currentLevelIndex);
    }
  };

  modal.classList.remove('hidden');
  modal.classList.add('active');
}

function showLevelFail() {
  const modal = document.getElementById('screen-level-clear');
  document.getElementById('clear-title').textContent = '步数用尽…';
  document.getElementById('clear-desc').textContent = '步数用完啦～再来一把，解压不嫌多！';
  document.getElementById('clear-stats').innerHTML = `
    <div>本关得分：${game.score}</div>
    <div>能量槽：${game.stress}</div>
  `;
  const btnNext = document.getElementById('btn-next-level');
  btnNext.textContent = '重新挑战';
  btnNext.onclick = () => {
    modal.classList.add('hidden');
    startGame(currentLevelIndex);
  };
  modal.classList.remove('hidden');
  modal.classList.add('active');
}

function showEnding(g) {
  showScreen('ending');
  const stats = {
    ...g.globalStats,
    levelsCleared: g.globalStats.clearedLevels.length,
  };
  const ending = pickEnding(stats);

  document.getElementById('ending-badge').textContent = ending.badge;
  document.getElementById('ending-title').textContent = ending.title;
  document.getElementById('ending-desc').textContent = ending.desc;
  document.getElementById('ending-stats').innerHTML = `
    <div>总得分：${stats.totalScore}</div>
    <div>最高能量：${stats.maxStress}</div>
    <div>锅锅弹射：${stats.potThrows}</div>
    <div>续命加速：${stats.caffeineTriggers}</div>
    <div>大饼泡泡：${stats.bigPieTriggers}</div>
    <div>通关关卡：${stats.levelsCleared}/${LEVELS.length}</div>
  `;
}

document.getElementById('btn-start').addEventListener('click', () => {
  renderLevelList();
  showScreen('levels');
});

document.getElementById('btn-pause').addEventListener('click', () => {
  if (game) game.pause();
  screens.pause.classList.remove('hidden');
  screens.pause.classList.add('active');
});

document.getElementById('btn-resume').addEventListener('click', () => {
  screens.pause.classList.add('hidden');
  if (game) game.resume();
});

document.getElementById('btn-quit').addEventListener('click', () => {
  screens.pause.classList.add('hidden');
  stopBgm();
  renderLevelList();
  showScreen('levels');
});

document.getElementById('btn-level-select').addEventListener('click', () => {
  document.getElementById('screen-level-clear').classList.add('hidden');
  renderLevelList();
  showScreen('levels');
});

document.getElementById('btn-replay').addEventListener('click', () => {
  localStorage.removeItem(SAVE_KEY);
  if (game) game.globalStats = game.loadStats();
  renderLevelList();
  showScreen('start');
});

document.getElementById('btn-share').addEventListener('click', () => {
  const stats = game?.globalStats || {};
  const ending = pickEnding({ ...stats, levelsCleared: (stats.clearedLevels || []).length });
  const text = `【精神状态消消乐】\n我的结局：${ending.title} ${ending.badge}\n总得分 ${stats.totalScore || 0} · 锅锅弹射 ${stats.potThrows || 0} 次 · 续命加速 ${stats.caffeineTriggers || 0} 次`;
  navigator.clipboard?.writeText(text).then(() => {
    alert('战绩已复制到剪贴板！');
  }).catch(() => {
    alert(text);
  });
});

// 启动页水晶预览 — 夏日主题展示多样性
const previewSet = getTileSet('summer');
document.querySelectorAll('.preview-gem').forEach((canvas, i) => {
  const key = previewSet.tiles[i]?.key || 'cola';
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = 64 * dpr;
  canvas.height = 64 * dpr;
  ctx.scale(dpr, dpr);
  drawCrystalTile(ctx, key, 32, 32, 56, false);
});
