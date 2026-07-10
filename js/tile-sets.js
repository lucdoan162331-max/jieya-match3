/**
 * 每关独立元素主题 — index 0~4 对应该关 5 种水晶方块
 * tags: caffeine | pie | pot — 驱动特殊机制
 */
export const TILE_SETS = {
  morning: {
    label: '早安元气',
    tiles: [
      { key: 'coffee', name: '续命美式', tags: ['caffeine'] },
      { key: 'toast', name: '烤吐司', tags: [] },
      { key: 'sun', name: '小太阳', tags: [] },
      { key: 'alarm', name: '元气闹钟', tags: [] },
      { key: 'sticky', name: '今日便签', tags: [] },
    ],
    weights: [22, 20, 18, 20, 20],
  },
  summer: {
    label: '夏日冰爽',
    tiles: [
      { key: 'cola', name: '冰爽可乐', tags: ['caffeine'] },
      { key: 'watermelon', name: '冰镇西瓜', tags: [] },
      { key: 'popsicle', name: '彩虹冰棍', tags: [] },
      { key: 'fan', name: '清凉小扇', tags: [] },
      { key: 'soda', name: '气泡苏打', tags: [] },
    ],
    weights: [28, 22, 20, 15, 15],
  },
  chat: {
    label: '消息精灵',
    tiles: [
      { key: 'read', name: '已读不回', tags: [] },
      { key: 'emoji', name: '表情包', tags: [] },
      { key: 'heart', name: '小红心', tags: [] },
      { key: 'voice', name: '语音条', tags: [] },
      { key: 'bottle', name: '漂流瓶', tags: [] },
    ],
    weights: [30, 20, 18, 17, 15],
  },
  caffeine: {
    label: '咖啡因乐园',
    tiles: [
      { key: 'americano', name: '冰美式', tags: ['caffeine'] },
      { key: 'latte', name: '绵云拿铁', tags: ['caffeine'] },
      { key: 'energy', name: '激浪饮料', tags: ['caffeine'] },
      { key: 'cookie', name: '曲奇饼干', tags: [] },
      { key: 'muffin', name: '蓝莓玛芬', tags: [] },
    ],
    weights: [30, 25, 20, 13, 12],
  },
  kitchen: {
    label: '锅锅厨房',
    tiles: [
      { key: 'wok', name: '飞天锅锅', tags: ['pot'] },
      { key: 'egg', name: '荷包蛋', tags: [] },
      { key: 'tomato', name: '小番茄', tags: [] },
      { key: 'spatula', name: '金铲子', tags: [] },
      { key: 'pepper', name: '小辣椒', tags: [] },
    ],
    // 锅锅略多方便弹射关，但其余四种区分度高
    weights: [26, 20, 20, 17, 17],
  },
  golden: {
    label: '黄金甜点',
    tiles: [
      { key: 'goldenpie', name: '黄金大饼', tags: ['pie'] },
      { key: 'pancake', name: '松饼塔', tags: ['pie'] },
      { key: 'tart', name: '蛋挞仔', tags: [] },
      { key: 'donut', name: '甜甜圈', tags: [] },
      { key: 'popcorn', name: '爆米花', tags: [] },
    ],
    weights: [30, 25, 18, 14, 13],
  },
  finale: {
    label: '终极混搭',
    tiles: [
      { key: 'cola', name: '冰爽可乐', tags: ['caffeine'] },
      { key: 'goldenpie', name: '黄金大饼', tags: ['pie'] },
      { key: 'wok', name: '飞天锅锅', tags: ['pot'] },
      { key: 'read', name: '已读不回', tags: [] },
      { key: 'watermelon', name: '冰镇西瓜', tags: [] },
    ],
    weights: [20, 20, 20, 20, 20],
  },
};

export function getTileSet(id) {
  return TILE_SETS[id] || TILE_SETS.morning;
}

export function getTileDef(setId, index) {
  const set = getTileSet(setId);
  return set.tiles[index] || set.tiles[0];
}

export function findTileIndexByTag(setId, tag) {
  const set = getTileSet(setId);
  return set.tiles.findIndex((t) => t.tags.includes(tag));
}

export function hasTag(setId, index, tag) {
  const def = getTileDef(setId, index);
  return def?.tags.includes(tag) ?? false;
}
