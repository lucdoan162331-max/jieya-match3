/** 方块类型定义 */
export const TILE = {
  COFFEE: 0,
  PIE: 1,
  POT: 2,
  PPT: 3,
  READ: 4,
  EMPTY: -1,
  STUNNED: -2,
};

export const TILE_META = {
  [TILE.COFFEE]: { name: '续命美式' },
  [TILE.PIE]:    { name: '黄金大饼' },
  [TILE.POT]:    { name: '飞天锅锅' },
  [TILE.PPT]:    { name: '灵感曲线' },
  [TILE.READ]:   { name: '已读不回' },
};

export const GRID_SIZE = 8;
export const MATCH_MIN = 3;
export const ANIM_SPEED_NORMAL = 1;
export const ANIM_SPEED_CAFFEINE = 1.8;

/** 消除爽感文案 — 多元化池 */
export const SFX_LINES = [
  '啪！爽到！', '连击美美哒～', '解压 +10086', '丝滑！', '太治愈了叭',
  'combo 起飞！', '脑袋空空好舒服', '叮！烦恼-1', '这波血赚', '消除快乐！',
  '咔嚓咔嚓～', '爽感拉满！', '小确幸 +1', '耶！又消掉一堆', '解压模式 ON',
  '舒服了～', '快乐来得太快', '像戳泡泡一样爽', '烦恼蒸发中…', '今日份开心到账',
  '哇哦三连！', '手感火热！', '解压小能手就是你', '噗嗤——没了！', '治愈力 MAX',
  '闪闪发亮！', '好运连连～', '能量充满！', '轻松一刻', '烦恼拜拜～',
];

/** 大饼泡泡 QTE 文案 */
export const MEETING_LINES = [
  '泡泡要飞起来啦！', '戳戳戳，全戳破！', '金色泡泡来袭～',
  '快乐大爆炸预备！', '一口气戳完超解压！', '泡泡里藏着小惊喜',
  '叮叮当当～', '满屏金光闪闪！', '戳破就舒服了！', '泡泡雨来啦～',
];

export const MEETING_TAP_TARGET = 28;
export const MEETING_TAP_TIMEOUT = 7000;

export const CAFFEINE_TRIGGER = 3;
export const CAFFEINE_DURATION = 6000;
export const CAFFEINE_SHAKE_MS = 480;

export const POT_STUN_DURATION = 2500;

export const SAVE_KEY = 'jieya-match3-save-v2';
