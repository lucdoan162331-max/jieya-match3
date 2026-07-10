import { getTileDef } from './tile-sets.js?v=20260710e';

/**
 * 难度曲线：
 * 1 教学宽松 → 2 定向消除 → 3 能量约束 → 4 机制教学
 * → 5 操作技巧 → 6 大招条件 → 7 综合挑战
 */
export const LEVELS = [
  {
    id: 1, name: '早安元气弹', tileSet: 'morning',
    desc: '消除 25 个方块',
    goal: { type: 'clear_total', target: 25 },
    moves: 30, stressPerMove: 1,
    tip: '轻松开局：随便消就行，熟悉手感～',
  },
  {
    id: 2, name: '夏日冰爽局', tileSet: 'summer',
    desc: '消除 16 个冰爽可乐',
    goal: { type: 'clear_type', tile: 0, target: 16 },
    moves: 26, stressPerMove: 2,
    tip: '开始要盯着目标元素消啦！',
  },
  {
    id: 3, name: '消息小精灵', tileSet: 'chat',
    desc: '消除 12 个已读不回，能量≤55',
    goal: { type: 'clear_type_stress', tile: 0, target: 12, maxStress: 55 },
    moves: 22, stressPerMove: 3,
    tip: '步数更紧，还要管住能量槽！',
  },
  {
    id: 4, name: '咖啡因乐园', tileSet: 'caffeine',
    desc: '触发 1 次续命加速',
    goal: { type: 'trigger_caffeine', target: 1 },
    moves: 24, stressPerMove: 2,
    tip: '连消 3 组咖啡因方块，触发加速！',
  },
  {
    id: 5, name: '锅锅弹射乐园', tileSet: 'kitchen',
    desc: '锅锅弹射成功 2 次',
    goal: { type: 'pot_throw', target: 2 },
    moves: 24, stressPerMove: 2,
    tip: '把带火焰的锅锅滑到边缘，弹射！',
  },
  {
    id: 6, name: '黄金甜点屋', tileSet: 'golden',
    desc: '触发 1 次大饼泡泡',
    goal: { type: 'pie_big_match', target: 1 },
    moves: 26, stressPerMove: 2,
    tip: '一次凑齐 5 个大饼，金色泡泡雨！',
  },
  {
    id: 7, name: '终极解压派对', tileSet: 'finale',
    desc: '得分 4000，能量≤75',
    goal: { type: 'score_stress', target: 4000, maxStress: 75 },
    moves: 28, stressPerMove: 2,
    tip: '综合考验：分数与能量双线达标！',
  },
];

export const ENDINGS = [
  { id: 'on_time', title: '松弛感大师', badge: '🌈', desc: '能量槽控制得刚刚好，全程轻轻松松，治愈力拉满。', weight: (s) => (s.maxStress < 50 && s.levelsCleared >= 7 ? 100 : 0) },
  { id: 'pot_master', title: '锅锅弹射王', badge: '🍳', desc: '弹射轨迹堪比杂技表演，隔壁小孩都看呆了。', weight: (s) => (s.potThrows >= 8 ? 90 + s.potThrows : 0) },
  { id: 'caffeine_warrior', title: '超速小马达', badge: '☕', desc: '续命加速是你的被动技能，手指快到出残影。', weight: (s) => (s.caffeineTriggers >= 3 ? 85 + s.caffeineTriggers * 5 : 0) },
  { id: 'pie_victim', title: '泡泡收割机', badge: '🥞', desc: '金色泡泡见一次戳一次，解压手感已刻进 DNA。', weight: (s) => (s.bigPieTriggers >= 2 ? 88 : s.bigPieTriggers >= 1 ? 60 : 0) },
  { id: 'spirit_quit', title: '硬核通关侠', badge: '💪', desc: '能量槽差点爆表但还是通关了——这股韧劲绝了！', weight: (s) => (s.maxStress >= 90 && s.levelsCleared >= 7 ? 95 : 0) },
  { id: '卷王', title: '分数收割者', badge: '👑', desc: '分数高到离谱，combo 链长到屏幕装不下。', weight: (s) => (s.totalScore >= 15000 ? 92 : s.totalScore >= 10000 ? 70 : 0) },
  { id: 'zen', title: '佛系治愈官', badge: '🧘', desc: '不追大招、不硬刚，安安静静消消乐，内心一片祥和。', weight: (s) => (s.levelsCleared >= 7 && s.potThrows <= 2 && s.caffeineTriggers <= 1 && s.bigPieTriggers === 0 ? 80 : 0) },
  { id: 'all_rounder', title: '全能解压王', badge: '🎭', desc: '夏日冰可乐到黄金大饼，每种爽感你都体验了个遍！', weight: (s) => (s.caffeineTriggers >= 1 && s.potThrows >= 3 && s.bigPieTriggers >= 1 && s.levelsCleared >= 7 ? 100 : 0) },
  { id: 'default', title: '快乐玩家', badge: '✨', desc: '没有花哨称号，但每一下消除都是真实的小快乐。', weight: () => 10 },
];

export function pickEnding(stats) {
  let best = ENDINGS[ENDINGS.length - 1];
  let bestWeight = 0;
  for (const ending of ENDINGS) {
    const w = ending.weight(stats);
    if (w > bestWeight) { bestWeight = w; best = ending; }
  }
  return best;
}

export function getGoalText(level) {
  const g = level.goal;
  const tileName = (i) => getTileDef(level.tileSet, i).name;
  switch (g.type) {
    case 'clear_total': return `消除 ${g.target} 个方块`;
    case 'clear_type': return `消除 ${g.target} 个${tileName(g.tile)}`;
    case 'clear_type_stress': return `消除 ${g.target} 个${tileName(g.tile)}，能量≤${g.maxStress}`;
    case 'trigger_caffeine': return `触发续命加速 ×${g.target}`;
    case 'pot_throw': return `锅锅弹射 ×${g.target}`;
    case 'pie_big_match': return `大饼泡泡 ×${g.target}`;
    case 'score_stress': return `得分 ${g.target}，能量≤${g.maxStress}`;
    default: return level.desc;
  }
}

export function getGoalDetail(level, progress, score, stress) {
  const g = level.goal;
  const tileName = (i) => getTileDef(level.tileSet, i).name;
  let current = 0;
  let target = g.target;
  let sub = '';
  let percent = 0;
  let stressOk = true;

  switch (g.type) {
    case 'clear_total':
      current = progress.clearedTotal;
      sub = `已消除 ${current} / ${target} 个方块`;
      percent = (current / target) * 100;
      break;
    case 'clear_type':
      current = progress.clearedByType[g.tile] || 0;
      sub = `已消除 ${current} / ${target} 个${tileName(g.tile)}`;
      percent = (current / target) * 100;
      break;
    case 'clear_type_stress':
      current = progress.clearedByType[g.tile] || 0;
      stressOk = stress <= g.maxStress;
      sub = `${tileName(g.tile)} ${current}/${target} · 能量 ${stress}/${g.maxStress}`;
      percent = Math.min((current / target) * 100, stressOk ? 100 : (current / target) * 80);
      break;
    case 'trigger_caffeine':
      current = progress.caffeineTriggers;
      sub = `续命加速 ${current} / ${target} 次`;
      percent = (current / target) * 100;
      break;
    case 'pot_throw':
      current = progress.potThrows;
      sub = `锅锅弹射 ${current} / ${target} 次`;
      percent = (current / target) * 100;
      break;
    case 'pie_big_match':
      current = progress.bigPieMatches;
      sub = `大饼泡泡 ${current} / ${target} 次`;
      percent = (current / target) * 100;
      break;
    case 'score_stress':
      current = score;
      stressOk = stress <= g.maxStress;
      sub = `得分 ${score} / ${target} · 能量 ${stress}/${g.maxStress}`;
      percent = Math.min((score / target) * 100, stressOk ? 100 : (score / target) * 80);
      break;
    default:
      sub = level.desc;
      percent = 0;
  }

  return {
    main: getGoalText(level),
    sub,
    percent: Math.min(100, Math.max(0, percent)),
    current,
    target,
    stressOk,
  };
}

export function checkLevelGoal(level, progress) {
  const g = level.goal;
  switch (g.type) {
    case 'clear_total': return progress.clearedTotal >= g.target;
    case 'clear_type': return (progress.clearedByType[g.tile] || 0) >= g.target;
    case 'clear_type_stress':
      return (progress.clearedByType[g.tile] || 0) >= g.target && progress.stress <= g.maxStress;
    case 'trigger_caffeine': return progress.caffeineTriggers >= g.target;
    case 'pot_throw': return progress.potThrows >= g.target;
    case 'pie_big_match': return progress.bigPieMatches >= g.target;
    case 'score_stress': return progress.score >= g.target && progress.stress <= g.maxStress;
    default: return false;
  }
}
