export const STAT_KEYS = [
  "reputation",
  "money",
  "safety",
  "energy",
  "relationship",
  "self"
];

export const STAT_LABELS = {
  "reputation": "信誉",
  "money": "钱",
  "safety": "安全感",
  "energy": "精力",
  "relationship": "关系",
  "self": "自我"
};

export const INITIAL_STATS = {
  "reputation": 6,
  "money": 5,
  "safety": 6,
  "energy": 7,
  "relationship": 5,
  "self": 6
};

export const STAT_MIN = 0;
export const STAT_MAX = 12;
export const DANGER_MAX = 2;

export const CHAPTER_VISIBLE_STATS = {
  "P": [],
  "C1": [
    "reputation"
  ],
  "C2": [
    "reputation",
    "money"
  ],
  "C3": [
    "reputation",
    "money",
    "safety"
  ],
  "C4": [
    "reputation",
    "money",
    "safety",
    "energy"
  ],
  "C5": [
    "reputation",
    "money",
    "safety",
    "energy",
    "relationship"
  ],
  "C6": [
    "reputation",
    "money",
    "safety",
    "energy",
    "relationship",
    "self"
  ],
  "E": [
    "reputation",
    "money",
    "safety",
    "energy",
    "relationship",
    "self"
  ]
};

export const HIDDEN_KEYS = [
  "time",
  "evidence",
  "exposure",
  "credit",
  "conflict",
  "lockChanged",
  "askedPermission",
  "keyUncertain"
];

export const STATE_WORDS = [
  {
    "min": 9,
    "word": "较高"
  },
  {
    "min": 6,
    "word": "稳定"
  },
  {
    "min": 3,
    "word": "紧张"
  },
  {
    "min": Number.NEGATIVE_INFINITY,
    "word": "危险"
  }
];
