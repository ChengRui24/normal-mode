export const STAT_KEYS = [
  "reputation",
  "money",
  "safety",
  "energy",
  "relationship",
  "self"
];

export const STAT_LABELS = {
  reputation: "信誉",
  money: "钱",
  safety: "安全感",
  energy: "精力",
  relationship: "关系",
  self: "自我"
};

export const CHAPTER_VISIBLE_STATS = {
  P: [],
  C1: ["reputation"],
  C2: ["reputation", "money"],
  C3: ["reputation", "money", "safety"],
  C4: ["reputation", "money", "safety", "energy"],
  C5: ["reputation", "money", "safety", "energy", "relationship"],
  C6: ["reputation", "money", "safety", "energy", "relationship", "self"],
  E: ["reputation", "money", "safety", "energy", "relationship", "self"]
};

export const HIDDEN_KEYS = [
  "time",
  "evidence",
  "exposure",
  "credit",
  "conflict",
  "enclosed"
];

export const STATE_WORDS = [
  { min: 3, word: "较高" },
  { min: 0, word: "稳定" },
  { min: -2, word: "紧张" },
  { min: Number.NEGATIVE_INFINITY, word: "危险" }
];
