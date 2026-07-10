/**
 * 心理学奖励机制 — 可变比率强化 + 进度里程碑 + 连击多巴胺
 */
import { randomSfxLine, showSfxToast, playWin } from './audio.js?v=20260710e';

const COMBO_LINES = [
  '', 'Nice!', 'Double!', 'Triple!!', 'Ultra!!!', 'LEGEND!!!!',
];
const MILESTONE_LINES = [
  '已完成四分之一，手感来了！',
  '进度过半，胜利在望～',
  '最后冲刺，别停！',
  '就差一点点啦！！',
];
const LUCKY_LINES = [
  '幸运暴击 +{n}！', '天降小红包 +{n}～', '意外之喜 +{n}！',
  '欧皇附体 +{n}！！', '隐藏奖励 +{n}～',
];
const NEAR_MISS_LINES = [
  '差一丢丢就三连了！', '就差一个，再来！', '差一点就触发大招！',
];

export class RewardEngine {
  constructor(game) {
    this.game = game;
    this.sessionCombo = 0;
    this.maxCombo = 0;
    this.milestones = new Set();
    this.luckyTotal = 0;
  }

  resetLevel() {
    this.sessionCombo = 0;
    this.maxCombo = 0;
    this.milestones.clear();
    this.luckyTotal = 0;
  }

  /** 连击链 — 递增倍率 + 反馈 */
  onChain(chainCount, basePoints) {
    this.sessionCombo = chainCount;
    this.maxCombo = Math.max(this.maxCombo, chainCount);
    const mult = 1 + (chainCount - 1) * 0.5;
    const bonus = Math.floor(basePoints * (mult - 1));
    const total = basePoints + bonus;

    if (chainCount >= 2) {
      const label = COMBO_LINES[Math.min(chainCount, COMBO_LINES.length - 1)];
      this.game.callbacks.onCombo?.(chainCount, mult);
      if (chainCount >= 3) {
        showSfxToast(`${label} ×${mult.toFixed(1)} 爽感拉满！`);
      }
    }
    return { mult, bonus, total };
  }

  /** 15% 可变比率幸运奖励 */
  rollLucky() {
    if (Math.random() > 0.15) return 0;
    const bonus = [20, 30, 50, 80, 100][Math.floor(Math.random() * 5)];
    this.luckyTotal += bonus;
    const line = LUCKY_LINES[Math.floor(Math.random() * LUCKY_LINES.length)];
    showSfxToast(line.replace('{n}', bonus));
    return bonus;
  }

  /** 进度里程碑 — 25/50/75/90% */
  checkMilestones(progress, level) {
    const pct = this._goalPercent(progress, level);
    const thresholds = [25, 50, 75, 90];
    thresholds.forEach((t, i) => {
      const key = `${level.id}-${t}`;
      if (pct >= t && !this.milestones.has(key)) {
        this.milestones.add(key);
        showSfxToast(MILESTONE_LINES[i] || MILESTONE_LINES[3]);
        this.game.callbacks.onMilestone?.(t);
      }
    });
  }

  /** 接近目标时的近失激励 */
  checkNearMiss(matches, board) {
    if (matches.length > 0 && matches[0].size === 2) {
      if (Math.random() < 0.3) {
        showSfxToast(NEAR_MISS_LINES[Math.floor(Math.random() * NEAR_MISS_LINES.length)]);
      }
    }
  }

  /** 通关星级 — 操作越从容星越多 */
  calcStars(movesLeft, stress, level) {
    let stars = 1;
    const movesRatio = movesLeft / level.moves;
    if (movesRatio >= 0.3) stars++;
    if (movesRatio >= 0.5 && stress <= (level.goal.maxStress || 80)) stars++;
    return stars;
  }

  /** 通关奖励文案 */
  getClearReward(stars) {
    const rewards = {
      1: { title: '通关！', sub: '第一颗星到手，下次可以更从容～' },
      2: { title: '漂亮！', sub: '两颗星！手感越来越丝滑了' },
      3: { title: '完美解压！', sub: '三星满分！你今天状态绝了！' },
    };
    return rewards[stars] || rewards[1];
  }

  _goalPercent(progress, level) {
    const g = level.goal;
    switch (g.type) {
      case 'clear_total': return (progress.clearedTotal / g.target) * 100;
      case 'clear_type':
      case 'clear_type_stress':
        return ((progress.clearedByType[g.tile] || 0) / g.target) * 100;
      case 'trigger_caffeine': return (progress.caffeineTriggers / g.target) * 100;
      case 'pot_throw': return (progress.potThrows / g.target) * 100;
      case 'pie_big_match': return (progress.bigPieMatches / g.target) * 100;
      case 'score_stress': return (progress.score / g.target) * 100;
      default: return 0;
    }
  }
}
