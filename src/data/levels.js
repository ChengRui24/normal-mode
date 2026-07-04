export const LEVEL_CARDS = [
  {
    id: "P-01",
    type: "level",
    chapterId: "P",
    chapterTitle: "序章：出门",
    title: "镜子",
    scene: "今天有一场重要见面。你站在镜子前，想起有人曾说你“不够认真”，也有人说你“太用力”。你只剩十分钟。",
    choices: [
      {
        id: "formal",
        label: "更正式",
        result: "你看起来更像该被认真对待的人，也更容易被看见。",
        effects: { reputation: 1, energy: -1 },
        hiddenEffects: { exposure: 1 },
        tagsAdded: ["被注意"],
        visibleChanges: ["reputation", "energy"],
        track: { adjustedExpression: 1 }
      },
      {
        id: "low-key",
        label: "更低调",
        result: "你让自己不那么显眼，心里也松了一点。",
        effects: { safety: 1, self: -1 },
        hiddenEffects: { exposure: -1 },
        tagsAdded: ["低存在感"],
        visibleChanges: ["safety", "self"],
        track: { adjustedExpression: 1 }
      },
      {
        id: "comfortable",
        label: "穿得舒服",
        result: "你选择让身体先好过一点，评价会留到之后再来。",
        effects: { energy: 1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["自我优先", "信誉波动"],
        visibleChanges: ["energy", "self"],
        track: {}
      }
    ]
  },
  {
    id: "P-02",
    type: "level",
    chapterId: "P",
    chapterTitle: "序章：出门",
    title: "出门前",
    scene: "手机电量只有37%。你想带充电宝和伞，但包会变重。天气预报说晚上可能下雨。",
    choices: [
      {
        id: "packed",
        label: "带上所有东西",
        result: "你把充电宝和伞都塞进包里，肩上的重量换来一点确定感。",
        effects: { energy: -1, safety: 1 },
        hiddenEffects: {},
        tagsAdded: ["准备充分"],
        visibleChanges: ["energy", "safety"],
        track: {}
      },
      {
        id: "light",
        label: "轻装出门",
        result: "你走得轻快一些，也把晚上的不确定留给了之后。",
        effects: { energy: 1, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["低电量风险"],
        visibleChanges: ["energy", "safety"],
        track: {}
      },
      {
        id: "daytime",
        label: "改约白天",
        result: "你把风险往后推，也让这次机会显得没那么坚定。",
        effects: { safety: 1, reputation: -1 },
        hiddenEffects: {},
        tagsAdded: ["机会延后"],
        visibleChanges: ["safety", "reputation"],
        track: {}
      }
    ]
  },
  {
    id: "P-03",
    type: "level",
    chapterId: "P",
    chapterTitle: "序章：出门",
    title: "电梯",
    scene: "电梯门开了，里面已经有人。对方没有做什么，只是抬头看了你一眼。你赶时间。",
    choices: [
      {
        id: "enter",
        label: "进去",
        result: "你按住电梯门走进去，节省了时间，也把不适压了下去。",
        effects: { safety: -1 },
        hiddenEffects: { time: 1 },
        tagsAdded: ["同乘电梯"],
        visibleChanges: ["safety"],
        track: {}
      },
      {
        id: "wait",
        label: "等下一趟",
        result: "你站在门外等下一部电梯，时间变少，但呼吸稳定下来。",
        effects: { safety: 1 },
        hiddenEffects: { time: -1 },
        tagsAdded: ["迟到解释"],
        visibleChanges: ["safety"],
        track: {}
      },
      {
        id: "phone",
        label: "假装接电话",
        result: "你抬起手机说了几句，给自己制造了一个被人知道的位置。",
        effects: { safety: 1, relationship: -1 },
        hiddenEffects: {},
        tagsAdded: ["有人知道"],
        visibleChanges: ["safety", "relationship"],
        track: { pretendedAccompanied: 1 }
      }
    ]
  },
  {
    id: "P-04",
    type: "level",
    chapterId: "P",
    chapterTitle: "序章：出门",
    title: "路口",
    scene: "最近的路要穿过一段人少的地方。大路亮一些，但会多走十分钟。你已经不早了。",
    choices: [
      {
        id: "shortcut",
        label: "走近路",
        result: "你选了最近的路，脚步变快，周围也安静下来。",
        effects: { safety: -1 },
        hiddenEffects: { time: 1, exposure: 1 },
        tagsAdded: ["人少路线"],
        visibleChanges: ["safety"],
        track: {}
      },
      {
        id: "main-road",
        label: "走大路",
        result: "你绕到更亮的路上，多花了时间和力气。",
        effects: { safety: 1, energy: -1 },
        hiddenEffects: { time: -1 },
        tagsAdded: ["绕路"],
        visibleChanges: ["safety", "energy"],
        track: { avoidedShortcut: 1 }
      },
      {
        id: "taxi",
        label: "打车",
        result: "你叫了车，把路上的风险换成账单和封闭空间的不确定。",
        effects: { money: -1 },
        hiddenEffects: { time: 1, enclosed: 1 },
        tagsAdded: ["平台行程"],
        visibleChanges: ["money"],
        track: { paidForSafety: 1 }
      }
    ]
  },
  {
    id: "C1-01",
    type: "level",
    chapterId: "C1",
    chapterTitle: "第一章：筛选",
    title: "照片",
    scene: "申请表要求上传照片。你知道这不应该重要，但它在页面最上方。系统提示：资料越完整，处理越快。",
    choices: [
      {
        id: "polished-photo",
        label: "上传更精神的照片",
        result: "你换上更有精神的照片，资料看起来完整，也被系统记住得更清楚。",
        effects: { reputation: 1 },
        hiddenEffects: { exposure: 1 },
        tagsAdded: ["形象被记录"],
        visibleChanges: ["reputation"],
        track: { adjustedExpression: 1 }
      },
      {
        id: "id-photo",
        label: "上传普通证件照",
        result: "你让照片保持普通，其他材料需要承担更多说明工作。",
        effects: { safety: 1 },
        hiddenEffects: {},
        tagsAdded: ["能力材料权重上升"],
        visibleChanges: ["safety"],
        track: {}
      },
      {
        id: "skip-photo",
        label: "不上传",
        result: "页面继续提醒资料不完整，流程开始变慢。",
        effects: { reputation: -1 },
        hiddenEffects: {},
        tagsAdded: ["流程阻滞"],
        visibleChanges: ["reputation"],
        track: {}
      }
    ]
  },
  {
    id: "C1-02",
    type: "level",
    chapterId: "C1",
    chapterTitle: "第一章：筛选",
    title: "等待区",
    scene: "等待区里有人聊天。他们提到“稳定”“抗压”“配合度”。轮到你之前还有三分钟。",
    choices: [
      {
        id: "join-chat",
        label: "加入聊天",
        result: "你接上他们的话题，气氛松动了一点，你也消耗了一点力气。",
        effects: { reputation: 1, energy: -1 },
        hiddenEffects: { exposure: 1 },
        tagsAdded: ["轻松玩笑"],
        visibleChanges: ["reputation", "energy"],
        track: {}
      },
      {
        id: "stay-quiet",
        label: "保持安静",
        result: "你保留精力，但在等待区里显得有些远。",
        effects: { reputation: -1, energy: 1 },
        hiddenEffects: {},
        tagsAdded: ["距离感"],
        visibleChanges: ["reputation", "energy"],
        track: {}
      },
      {
        id: "organize",
        label: "整理材料",
        result: "你把材料顺好，至少能让下一轮问题更有凭据。",
        effects: {},
        hiddenEffects: { evidence: 1 },
        tagsAdded: ["材料完整"],
        visibleChanges: [],
        track: { savedEvidence: 1 }
      }
    ]
  },
  {
    id: "C1-03",
    type: "level",
    chapterId: "C1",
    chapterTitle: "第一章：筛选",
    title: "职业规划",
    scene: "面试官问：“你未来三到五年有什么计划？”你感觉这不只是一个职业问题。",
    choices: [
      {
        id: "career",
        label: "强调事业",
        result: "你把目标说得清楚，可靠感上升，也被标记成更需要管理的人。",
        effects: { reputation: 1 },
        hiddenEffects: {},
        tagsAdded: ["事业心强", "管理风险"],
        visibleChanges: ["reputation"],
        track: {}
      },
      {
        id: "stable",
        label: "强调稳定",
        result: "你给出让人放心的答案，也让对方看见了压价空间。",
        effects: { reputation: 1 },
        hiddenEffects: {},
        tagsAdded: ["稳定但可压价", "议价权降低"],
        visibleChanges: ["reputation"],
        track: {}
      },
      {
        id: "ask-back",
        label: "反问岗位发展",
        result: "你把问题推回岗位本身，能力被看见，风险也被看见。",
        effects: { self: 1 },
        hiddenEffects: {},
        tagsAdded: ["反向提问", "能力呈现", "管理风险", "信誉波动"],
        visibleChanges: ["self"],
        track: {}
      }
    ]
  },
  {
    id: "C1-04",
    type: "level",
    chapterId: "C1",
    chapterTitle: "第一章：筛选",
    title: "薪资",
    scene: "对方给出的数字比招聘页低。解释是“试用期先这样，后面看表现”。你需要这份工作。",
    choices: [
      {
        id: "accept",
        label: "接受",
        result: "你让流程继续推进，也把试用期的差价吞了下去。",
        effects: { reputation: 1, money: -1, self: -1 },
        hiddenEffects: {},
        tagsAdded: ["低薪倾向"],
        visibleChanges: ["reputation", "money", "self"],
        track: {}
      },
      {
        id: "negotiate",
        label: "争取招聘页数字",
        result: "你把招聘页的数字摆回桌面，位置变得不那么稳，但边界清楚了。",
        effects: { reputation: -1, money: 1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["备选候选人"],
        visibleChanges: ["reputation", "money", "self"],
        track: {}
      },
      {
        id: "contract",
        label: "要求写进合同",
        result: "你没有只听口头承诺，而是把数字留进可追溯的材料。",
        effects: { reputation: -1, self: 1 },
        hiddenEffects: { evidence: 1 },
        tagsAdded: ["合同意识", "信誉波动"],
        visibleChanges: ["reputation", "self"],
        track: { savedEvidence: 1 }
      }
    ]
  },
  {
    id: "C1-05",
    type: "level",
    chapterId: "C1",
    chapterTitle: "第一章：筛选",
    title: "新人任务",
    scene: "入职第一周，领导临时给你一个额外任务，说“这个你比较细心”。它不在职责里，但试用期还没过。",
    choices: [
      {
        id: "take-it",
        label: "接下",
        result: "你接住额外任务，试用期评价更稳，精力和边界被扣掉一块。",
        effects: { reputation: 1, energy: -2, self: -1 },
        hiddenEffects: {},
        tagsAdded: ["默认补位"],
        visibleChanges: ["reputation", "energy", "self"],
        track: {}
      },
      {
        id: "priority",
        label: "询问优先级",
        result: "你没有拒绝，只是要求排序，边界被轻轻放到台面上。",
        effects: { energy: -1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["边界试探"],
        visibleChanges: ["energy", "self"],
        track: {}
      },
      {
        id: "refuse",
        label: "拒绝",
        result: "你保住了今晚的力气，也让“不配合”的风险开始出现。",
        effects: { reputation: -2, energy: 1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["不配合风险"],
        visibleChanges: ["reputation", "energy", "self"],
        track: {}
      }
    ]
  },
  {
    id: "C1-06",
    type: "level",
    chapterId: "C1",
    chapterTitle: "第一章：筛选",
    title: "聚餐",
    scene: "第一周结束，大家说要聚一下。你很累，但有人说：“新人还是来一下比较好。”",
    choices: [
      {
        id: "stay-full",
        label: "参加到结束",
        result: "你留到饭局结束，关系热了一点，身体和安全感都更薄了。",
        effects: { reputation: 1, energy: -2, relationship: 1, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["参加饭局"],
        visibleChanges: ["reputation", "energy", "relationship", "safety"],
        track: {}
      },
      {
        id: "brief",
        label: "短暂露面",
        result: "你完成了新人该出现的部分，没有把整晚都交出去。",
        effects: { energy: -1, relationship: 1 },
        hiddenEffects: {},
        tagsAdded: ["有限配合"],
        visibleChanges: ["energy", "relationship"],
        track: {}
      },
      {
        id: "decline",
        label: "拒绝",
        result: "你把今晚留给自己，也让不合群的解释有了入口。",
        effects: { reputation: -1, energy: 1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["不合群风险"],
        visibleChanges: ["reputation", "energy", "self"],
        track: {}
      }
    ]
  },
  {
    id: "C1-07",
    type: "level",
    chapterId: "C1",
    chapterTitle: "第一章：筛选",
    title: "玩笑",
    scene: "有人开了一个关于你的玩笑。它不算严重，但你不舒服。所有人都在等你怎么接。",
    choices: [
      {
        id: "laugh",
        label: "笑一下",
        result: "你让气氛顺着他们走，不舒服被暂时收好。",
        effects: { reputation: 1, self: -1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["会接玩笑"],
        visibleChanges: ["reputation", "self", "energy"],
        track: { laughedOffDiscomfort: 1 }
      },
      {
        id: "redirect",
        label: "用玩笑转移",
        result: "你把话题带走了，没有正面冲突，也没有真正说出不适。",
        effects: { energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["低冲突处理"],
        visibleChanges: ["energy"],
        track: { laughedOffDiscomfort: 1 }
      },
      {
        id: "name-it",
        label: "认真指出",
        result: "你把边界说出来，桌上的空气立刻变硬。",
        effects: { reputation: -1, self: 1, relationship: -1 },
        hiddenEffects: {},
        tagsAdded: ["敏感风险"],
        visibleChanges: ["reputation", "self", "relationship"],
        track: {}
      }
    ]
  },
  {
    id: "C2-01",
    type: "level",
    chapterId: "C2",
    chapterTitle: "第二章：房间",
    title: "预算",
    scene: "你打开租房软件。离公司近、门禁好、价格高；便宜的房子远一些，楼道灯坏了，评论也少。",
    choices: [
      {
        id: "near-expensive",
        label: "近且贵",
        result: "你选择离公司近的房间，通勤和门禁好一点，预算立刻收紧。",
        effects: { money: -2, safety: 1, energy: 1 },
        hiddenEffects: {},
        tagsAdded: ["高租金压力"],
        visibleChanges: ["money", "safety", "energy"],
        track: { paidForSafety: 1 }
      },
      {
        id: "far-cheap",
        label: "远且便宜",
        result: "你保住了现金，代价是更远的路和更暗的公共区域。",
        effects: { money: 1, safety: -1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["偏远住处"],
        visibleChanges: ["money", "safety", "energy"],
        track: {}
      },
      {
        id: "keep-searching",
        label: "继续找",
        result: "你继续刷列表，预算暂时没变，判断力被一点点消耗。",
        effects: { energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["筛选疲劳"],
        visibleChanges: ["energy"],
        track: {}
      }
    ]
  },
  {
    id: "C2-02",
    type: "level",
    chapterId: "C2",
    chapterTitle: "第二章：房间",
    title: "看房",
    scene: "中介说房子很抢手，今天不定就没了。楼道灯确实有点暗，但房间里面还不错。",
    choices: [
      {
        id: "book-now",
        label: "当场定下",
        result: "你把房子先定下来，没看的部分也一起变成风险。",
        effects: { money: -1, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["未充分检查"],
        visibleChanges: ["money", "safety"],
        track: {}
      },
      {
        id: "inspect-area",
        label: "再看公共区域",
        result: "你要求多看一圈，中介不耐烦，但楼道和门禁终于被看见。",
        effects: { reputation: -1, safety: 1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["检查环境"],
        visibleChanges: ["reputation", "safety", "self"],
        track: {}
      },
      {
        id: "bring-friend",
        label: "找朋友一起看",
        result: "你把朋友也拉进这次判断，欠下一点关系成本。",
        effects: { relationship: -1, safety: 1 },
        hiddenEffects: {},
        tagsAdded: ["有人陪同"],
        visibleChanges: ["relationship", "safety"],
        track: {}
      }
    ]
  },
  {
    id: "C2-03",
    type: "level",
    chapterId: "C2",
    chapterTitle: "第二章：房间",
    title: "合同",
    scene: "合同有几条你看不懂。中介说“都是模板，大家都这么签”。你已经跑了一下午。",
    choices: [
      {
        id: "sign",
        label: "直接签",
        result: "你结束了这场疲惫的流程，也把不清楚的条款留到了之后。",
        effects: { money: -1, energy: 1 },
        hiddenEffects: { evidence: -1 },
        tagsAdded: ["合同风险"],
        visibleChanges: ["money", "energy"],
        track: {}
      },
      {
        id: "ask-lines",
        label: "逐条问",
        result: "你逐条确认，消耗了体力，也留下了更清楚的合同理解。",
        effects: { reputation: -1, energy: -1 },
        hiddenEffects: { evidence: 1 },
        tagsAdded: ["合同意识"],
        visibleChanges: ["reputation", "energy"],
        track: { savedEvidence: 1 }
      },
      {
        id: "photo-review",
        label: "拍下找人看",
        result: "你把合同带出现场确认，时间和关系都被占用一点。",
        effects: { relationship: -1 },
        hiddenEffects: { evidence: 1, time: -1 },
        tagsAdded: ["外部确认"],
        visibleChanges: ["relationship"],
        track: { savedEvidence: 1 }
      }
    ]
  },
  {
    id: "C2-04",
    type: "level",
    chapterId: "C2",
    chapterTitle: "第二章：房间",
    title: "搬家加价",
    scene: "搬家车到了楼下。师傅说楼梯费要另算，不然不上楼。你的东西已经在车上。",
    choices: [
      {
        id: "pay",
        label: "加钱",
        result: "你把钱补上，东西顺利上楼，预算又少了一截。",
        effects: { money: -2, energy: 1 },
        hiddenEffects: {},
        tagsAdded: ["被临时加价"],
        visibleChanges: ["money", "energy"],
        track: {}
      },
      {
        id: "argue",
        label: "争执",
        result: "你守住了这笔钱，现场气氛却变得紧绷。",
        effects: { energy: -2, self: 1, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["物品扣留"],
        visibleChanges: ["energy", "self", "safety"],
        track: {}
      },
      {
        id: "platform",
        label: "平台投诉",
        result: "你把争议转到平台记录里，处理不快，但有了工单。",
        effects: { money: -1, energy: -1 },
        hiddenEffects: { evidence: 1 },
        tagsAdded: ["工单中"],
        visibleChanges: ["money", "energy"],
        track: { savedEvidence: 1 }
      }
    ]
  },
  {
    id: "C2-05",
    type: "level",
    chapterId: "C2",
    chapterTitle: "第二章：房间",
    title: "维修",
    scene: "晚上十点半，维修的人终于到了。水管不能再拖。对方说：“很快，五分钟。”",
    choices: [
      {
        id: "let-in",
        label: "让他进来",
        result: "维修终于开始，住址和夜晚的房间也一起暴露给陌生人。",
        effects: { safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["住址暴露", "生活稳定"],
        visibleChanges: ["safety"],
        track: {}
      },
      {
        id: "daytime",
        label: "改约白天",
        result: "你把风险推到白天，也给工作日程增加了新的隐患。",
        effects: { safety: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["请假隐患", "工作风险"],
        visibleChanges: ["safety", "energy"],
        track: {}
      },
      {
        id: "phone-company",
        label: "开电话陪同",
        result: "你让电话保持接通，安全感多了一点，关系成本少不了。",
        effects: { relationship: -1, safety: 1 },
        hiddenEffects: {},
        tagsAdded: ["有人知道"],
        visibleChanges: ["relationship", "safety"],
        track: { pretendedAccompanied: 1 }
      }
    ]
  },
  {
    id: "C2-06",
    type: "level",
    chapterId: "C2",
    chapterTitle: "第二章：房间",
    title: "外卖",
    scene: "骑手说已经到门口，问你能不能开门拿一下。他知道你的门牌号，你也确实饿了。",
    choices: [
      {
        id: "open-door",
        label: "立刻开门",
        result: "你很快拿到晚饭，也让门牌和人在家的事实对上了。",
        effects: { energy: 1, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["门牌暴露"],
        visibleChanges: ["energy", "safety"],
        track: {}
      },
      {
        id: "wait-steps",
        label: "等脚步声走远",
        result: "你晚一点吃上饭，至少确认门外重新安静。",
        effects: { safety: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["延迟确认"],
        visibleChanges: ["safety", "energy"],
        track: {}
      },
      {
        id: "leave-outside",
        label: "放门口",
        result: "你隔着门完成交接，配送信息依然留在平台和门口。",
        effects: {},
        hiddenEffects: { exposure: 1 },
        tagsAdded: ["信息留存"],
        visibleChanges: [],
        track: {}
      }
    ]
  },
  {
    id: "C2-07",
    type: "level",
    chapterId: "C2",
    chapterTitle: "第二章：房间",
    title: "邻居",
    scene: "隔壁的人在门口和你搭话，问你是不是一个人住。语气很自然，像是随口一问。",
    choices: [
      {
        id: "truth",
        label: "如实回答",
        result: "你保持自然和友好，也把独居信息交了出去。",
        effects: { reputation: 1, safety: -1, relationship: 1 },
        hiddenEffects: {},
        tagsAdded: ["邻居知道独居"],
        visibleChanges: ["reputation", "safety", "relationship"],
        track: {}
      },
      {
        id: "vague",
        label: "含糊带过",
        result: "你没有回答清楚，谈话变得费力但信息被保护下来。",
        effects: { energy: -1, safety: 1 },
        hiddenEffects: {},
        tagsAdded: ["信息模糊"],
        visibleChanges: ["energy", "safety"],
        track: {}
      },
      {
        id: "roommate",
        label: "说有人一起住",
        result: "你临时编出一个同住者，安全感上来了，自我感受却有一点退让。",
        effects: { safety: 1, self: -1 },
        hiddenEffects: {},
        tagsAdded: ["虚构同住者"],
        visibleChanges: ["safety", "self"],
        track: { pretendedAccompanied: 1 }
      }
    ]
  },
  {
    id: "C3-01",
    type: "level",
    chapterId: "C3",
    chapterTitle: "第三章：路上",
    title: "早高峰",
    scene: "车厢很挤。你被推到门边。下一班要等六分钟，你今天不能再迟到了。",
    choices: [
      {
        id: "squeeze",
        label: "挤进去",
        result: "你挤进车厢准时前进，身体边界被一路压缩。",
        effects: { safety: -1, reputation: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["拥挤通勤", "身体边界风险"],
        visibleChanges: ["safety", "reputation", "energy"],
        track: {}
      },
      {
        id: "next-train",
        label: "等下一班",
        result: "你退到站台边缘，安全感回来了，迟到风险也跟着出现。",
        effects: { safety: 1, reputation: -1 },
        hiddenEffects: {},
        tagsAdded: ["迟到风险"],
        visibleChanges: ["safety", "reputation"],
        track: {}
      },
      {
        id: "reroute",
        label: "换路线",
        result: "你改走另一条线，用钱和时间换一个没那么挤的空间。",
        effects: { money: -1, safety: 1 },
        hiddenEffects: { time: -1 },
        tagsAdded: ["绕行成本"],
        visibleChanges: ["money", "safety"],
        track: { paidForSafety: 1 }
      }
    ]
  },
  {
    id: "C3-02",
    type: "level",
    chapterId: "C3",
    chapterTitle: "第三章：路上",
    title: "目光",
    scene: "站台上有人一直看你。你换了位置，对方也慢慢挪近了一点。广播提示车快来了。",
    choices: [
      {
        id: "look-back",
        label: "看回去",
        result: "你正面回应那道目光，边界清楚了，冲突也更近了。",
        effects: { safety: -1, self: 1 },
        hiddenEffects: { conflict: 1 },
        tagsAdded: ["正面回应"],
        visibleChanges: ["safety", "self"],
        track: {}
      },
      {
        id: "crowd",
        label: "走向人多处",
        result: "你靠近更多目击者，消耗一点力气换来更可见的位置。",
        effects: { safety: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["靠近目击者"],
        visibleChanges: ["safety", "energy"],
        track: {}
      },
      {
        id: "ignore",
        label: "假装没发现",
        result: "你让表面保持平静，警觉却一直占着身体。",
        effects: { safety: -1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["持续警觉"],
        visibleChanges: ["safety", "energy"],
        track: {}
      }
    ]
  },
  {
    id: "C3-03",
    type: "level",
    chapterId: "C3",
    chapterTitle: "第三章：路上",
    title: "低电量",
    scene: "下班时手机只剩12%。今晚可能要晚回去。公司附近有便利店，但你已经很累。",
    choices: [
      {
        id: "buy-powerbank",
        label: "买充电宝",
        result: "你买下充电宝，电量风险解除，钱包又薄一点。",
        effects: { money: -1, safety: 1 },
        hiddenEffects: {},
        tagsAdded: ["电量充足"],
        visibleChanges: ["money", "safety"],
        track: { paidForSafety: 1 }
      },
      {
        id: "save-money",
        label: "省钱不买",
        result: "你保住了这笔钱，也把晚归时的低电量留在身上。",
        effects: { safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["低电量风险"],
        visibleChanges: ["safety"],
        track: {}
      },
      {
        id: "borrow-charge",
        label: "借同事充电",
        result: "你借到一点电量，关系和信誉被短暂调动，回去也更晚了。",
        effects: { reputation: 1, relationship: 1 },
        hiddenEffects: { time: -1 },
        tagsAdded: ["晚归"],
        visibleChanges: ["reputation", "relationship"],
        track: {}
      }
    ]
  },
  {
    id: "C3-04",
    type: "level",
    chapterId: "C3",
    chapterTitle: "第三章：路上",
    title: "加班后的路线",
    scene: "晚上十点，地铁口到家有两条路。近路人少，大路绕远。打车价格翻倍。",
    choices: [
      {
        id: "shortcut",
        label: "走近路",
        result: "你选了更快的近路，时间被保住，周围的人也越来越少。",
        effects: { safety: -1 },
        hiddenEffects: { exposure: 1, time: 1 },
        tagsAdded: ["人少夜路"],
        visibleChanges: ["safety"],
        track: {}
      },
      {
        id: "main-road",
        label: "走大路",
        result: "你绕到更亮的路上，安全感上升，身体更累。",
        effects: { safety: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["习惯绕路"],
        visibleChanges: ["safety", "energy"],
        track: { avoidedShortcut: 1 }
      },
      {
        id: "taxi",
        label: "打车",
        result: "你叫了翻倍价格的车，把路上的不确定换成账单。",
        effects: { money: -2, safety: 1 },
        hiddenEffects: {},
        tagsAdded: ["平台行程"],
        visibleChanges: ["money", "safety"],
        track: { paidForSafety: 1 }
      }
    ]
  },
  {
    id: "C3-05",
    type: "level",
    chapterId: "C3",
    chapterTitle: "第三章：路上",
    title: "路线偏移",
    scene: "司机说：“前面堵，我走另一边。”导航上的路线偏了一点。你不确定这是不是正常。",
    choices: [
      {
        id: "navigation",
        label: "要求按导航走",
        result: "你要求回到导航路线，掌控感回来了，车里的气氛也硬了。",
        effects: { safety: 1, self: 1 },
        hiddenEffects: { conflict: 1 },
        tagsAdded: ["路线确认"],
        visibleChanges: ["safety", "self"],
        track: {}
      },
      {
        id: "silent",
        label: "不说话",
        result: "你继续盯着路线，沉默让精力和安全感一起下降。",
        effects: { safety: -1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["沉默观察"],
        visibleChanges: ["safety", "energy"],
        track: {}
      },
      {
        id: "call",
        label: "打电话说快到了",
        result: "你把目的地说给电话那边听，车里的不确定感少了一点。",
        effects: { safety: 1, relationship: -1 },
        hiddenEffects: {},
        tagsAdded: ["有人知道"],
        visibleChanges: ["safety", "relationship"],
        track: { pretendedAccompanied: 1 }
      }
    ]
  },
  {
    id: "C3-06",
    type: "level",
    chapterId: "C3",
    chapterTitle: "第三章：路上",
    title: "楼道",
    scene: "你到家楼下，后面有人也刷门禁进来。你不确定对方是不是住户。电梯门开了。",
    choices: [
      {
        id: "same-elevator",
        label: "一起进电梯",
        result: "你走进电梯，省下等待时间，也进入了更封闭的空间。",
        effects: { safety: -1 },
        hiddenEffects: { time: 1, enclosed: 1 },
        tagsAdded: ["一起进电梯", "门口停留"],
        visibleChanges: ["safety"],
        track: {}
      },
      {
        id: "next-elevator",
        label: "等下一趟",
        result: "你退后等下一趟，避开了封闭空间，也多消耗了力气。",
        effects: { safety: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["回避封闭空间"],
        visibleChanges: ["safety", "energy"],
        track: {}
      },
      {
        id: "pickup",
        label: "假装取快递",
        result: "你绕去快递柜，路线合理了，身体却更累也更紧。",
        effects: { safety: 1, energy: -1, self: -1 },
        hiddenEffects: {},
        tagsAdded: ["伪装路线"],
        visibleChanges: ["safety", "energy", "self"],
        track: { pretendedAccompanied: 1 }
      }
    ]
  },
  {
    id: "C3-07",
    type: "level",
    chapterId: "C3",
    chapterTitle: "第三章：路上",
    title: "到家消息",
    scene: "你刚进门，工作群里有人问：“到家了吗？”另一位同事私聊你：“今天辛苦了。”你不知道这只是关心，还是别的意思。",
    choices: [
      {
        id: "reply-private",
        label: "回复“到了，谢谢”",
        result: "你礼貌回应了私聊，关系保持顺滑，边界也变得不清楚一点。",
        effects: { reputation: 1 },
        hiddenEffects: {},
        tagsAdded: ["礼貌回应", "边界模糊"],
        visibleChanges: ["reputation"],
        track: {}
      },
      {
        id: "no-reply",
        label: "不回复",
        result: "你没有继续对话，安全感回来了，工作里的可靠感掉了一点。",
        effects: { reputation: -1, safety: 1 },
        hiddenEffects: {},
        tagsAdded: ["不回应"],
        visibleChanges: ["reputation", "safety"],
        track: {}
      },
      {
        id: "group-only",
        label: "只在群里回复",
        result: "你把到家信息放在公开位置，回应存在，私下边界也保住了。",
        effects: { safety: 1 },
        hiddenEffects: {},
        tagsAdded: ["公开回应"],
        visibleChanges: ["safety"],
        track: {}
      }
    ]
  },
  {
    id: "C4-01",
    type: "level",
    chapterId: "C4",
    chapterTitle: "第四章：桌面",
    title: "会议座位",
    scene: "会议快开始了。主位旁边有空位，角落也有位置。你今天要汇报一部分内容。",
    choices: [
      {
        id: "front",
        label: "坐前面",
        result: "你坐到更容易被看见的位置，汇报机会更清楚，消耗也更直接。",
        effects: { reputation: 1, energy: -1 },
        hiddenEffects: { exposure: 1 },
        tagsAdded: ["主动呈现"],
        visibleChanges: ["reputation", "energy"],
        track: {}
      },
      {
        id: "corner",
        label: "坐角落",
        result: "你保住一点精力，也让自己的存在感往后退了一步。",
        effects: { energy: 1, reputation: -1 },
        hiddenEffects: {},
        tagsAdded: ["存在感不足"],
        visibleChanges: ["energy", "reputation"],
        track: {}
      },
      {
        id: "familiar",
        label: "跟熟人坐",
        result: "你靠近熟人获得支撑，独立评价被稀释一点。",
        effects: { relationship: 1 },
        hiddenEffects: {},
        tagsAdded: ["依附熟人", "独立评价降低"],
        visibleChanges: ["relationship"],
        track: {}
      }
    ]
  },
  {
    id: "C4-02",
    type: "level",
    chapterId: "C4",
    chapterTitle: "第四章：桌面",
    title: "被打断",
    scene: "你刚讲到关键部分，有人打断你，替你总结了一个并不准确的版本。大家已经开始点头。",
    choices: [
      {
        id: "correct-now",
        label: "立刻纠正",
        result: "你当场把版本拉回来，力气少了，冲突风险上升。",
        effects: { energy: -1, self: 1 },
        hiddenEffects: { conflict: 1 },
        tagsAdded: ["当场纠正", "信誉波动"],
        visibleChanges: ["energy", "self"],
        track: {}
      },
      {
        id: "supplement-later",
        label: "等他说完补充",
        result: "你等到他说完再补，气氛平稳，内容也已经有一部分失真。",
        effects: { energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["部分失真"],
        visibleChanges: ["energy"],
        track: {}
      },
      {
        id: "written",
        label: "会后书面说明",
        result: "你把更准确的版本写下来，精力成本更高，但材料留住了。",
        effects: { energy: -2 },
        hiddenEffects: { evidence: 1, credit: 1 },
        tagsAdded: ["书面留痕"],
        visibleChanges: ["energy"],
        track: { savedEvidence: 1 }
      }
    ]
  },
  {
    id: "C4-03",
    type: "level",
    chapterId: "C4",
    chapterTitle: "第四章：桌面",
    title: "功劳归属",
    scene: "你的想法被另一个人重新包装后获得认可。领导说：“这个方向不错，你们继续跟。”",
    choices: [
      {
        id: "claim-source",
        label: "当场说明来源",
        result: "你把来源放回桌上，署名更清楚，关系承受压力。",
        effects: { self: 1, relationship: -1 },
        hiddenEffects: {},
        tagsAdded: ["争取署名", "信誉按证据波动"],
        visibleChanges: ["self", "relationship"],
        track: {}
      },
      {
        id: "private-talk",
        label: "私下沟通",
        result: "你把问题留到会后谈，冲突较低，归属仍然模糊。",
        effects: { energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["私下协商", "功劳不清"],
        visibleChanges: ["energy"],
        track: {}
      },
      {
        id: "keep-going",
        label: "继续推进",
        result: "你继续把项目做下去，团队评价上升，你自己的署名更模糊。",
        effects: { reputation: 1, energy: -1, self: -1 },
        hiddenEffects: {},
        tagsAdded: ["功劳不清"],
        visibleChanges: ["reputation", "energy", "self"],
        track: {}
      }
    ]
  },
  {
    id: "C4-04",
    type: "level",
    chapterId: "C4",
    chapterTitle: "第四章：桌面",
    title: "额外任务",
    scene: "会议纪要、订餐、安抚新人、整理材料，又自然地落到你这里。没人正式安排，但大家默认你会做。",
    choices: [
      {
        id: "take-all",
        label: "接下",
        result: "你把杂事接住，团队运转顺了，你的精力继续下沉。",
        effects: { reputation: 1, energy: -2 },
        hiddenEffects: {},
        tagsAdded: ["默认补位", "隐形劳动"],
        visibleChanges: ["reputation", "energy"],
        track: {}
      },
      {
        id: "divide",
        label: "分派给大家",
        result: "你把任务拆回团队里，边界更清楚，关系反应不确定。",
        effects: { energy: -1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["任务分摊", "关系波动"],
        visibleChanges: ["energy", "self"],
        track: {}
      },
      {
        id: "refuse",
        label: "拒绝",
        result: "你不再自动补位，精力回来一点，热心评价掉下去。",
        effects: { reputation: -1, energy: 1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["不热心风险"],
        visibleChanges: ["reputation", "energy", "self"],
        track: {}
      }
    ]
  },
  {
    id: "C4-05",
    type: "level",
    chapterId: "C4",
    chapterTitle: "第四章：桌面",
    title: "客户饭局",
    scene: "客户说“轻松一点，不要这么拘谨”。领导看了你一眼。你知道今晚影响项目，也知道自己已经很累。",
    choices: [
      {
        id: "socialize",
        label: "活跃气氛",
        result: "你把气氛撑起来，项目评价更顺，自己更累也更不安。",
        effects: { reputation: 1, energy: -2, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["饭局可用"],
        visibleChanges: ["reputation", "energy", "safety"],
        track: {}
      },
      {
        id: "distance",
        label: "保持距离",
        result: "你守住社交距离，力气仍被消耗，项目评价降了一点。",
        effects: { energy: -1, reputation: -1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["距离感"],
        visibleChanges: ["energy", "reputation", "self"],
        track: {}
      },
      {
        id: "leave-early",
        label: "提前离开",
        result: "你离开饭局保住今晚，项目配合的评价变差。",
        effects: { energy: 1, reputation: -2 },
        hiddenEffects: {},
        tagsAdded: ["项目配合不足"],
        visibleChanges: ["energy", "reputation"],
        track: {}
      }
    ]
  },
  {
    id: "C4-06",
    type: "level",
    chapterId: "C4",
    chapterTitle: "第四章：桌面",
    title: "别激动",
    scene: "一个决定明显不公平。你提出异议后，对方说：“你先别激动，我们就事论事。”",
    choices: [
      {
        id: "lower-voice",
        label: "压低语气继续说",
        result: "你把语气压低，观点得以继续，自我感受被压下去。",
        effects: { energy: -2, reputation: 1, self: -1 },
        hiddenEffects: {},
        tagsAdded: ["控制语气"],
        visibleChanges: ["energy", "reputation", "self"],
        track: { adjustedExpression: 1 }
      },
      {
        id: "stop",
        label: "停止争论",
        result: "你停下来保存一点力气，意见也从记录里淡了出去。",
        effects: { energy: 1, self: -1 },
        hiddenEffects: { evidence: -1 },
        tagsAdded: ["意见消失"],
        visibleChanges: ["energy", "self"],
        track: { gaveUpForProof: 1 }
      },
      {
        id: "name-phrase",
        label: "指出这句话的问题",
        result: "你点出话术本身的问题，边界清楚了，情绪化风险也被贴上。",
        effects: { reputation: -1, energy: -1, self: 1 },
        hiddenEffects: { conflict: 1 },
        tagsAdded: ["情绪化风险"],
        visibleChanges: ["reputation", "energy", "self"],
        track: {}
      }
    ]
  },
  {
    id: "C4-07",
    type: "level",
    chapterId: "C4",
    chapterTitle: "第四章：桌面",
    title: "绩效材料",
    scene: "绩效面谈前，你要整理自己的贡献。很多事你做了，但没有留下明确记录。",
    choices: [
      {
        id: "rebuild-records",
        label: "补材料",
        result: "你花力气把贡献重新整理出来，证据终于变得可见。",
        effects: { energy: -2 },
        hiddenEffects: { evidence: 2 },
        tagsAdded: ["贡献可见"],
        visibleChanges: ["energy"],
        track: { savedEvidence: 1 }
      },
      {
        id: "colleague-proof",
        label: "找同事作证",
        result: "你请同事帮忙证明，关系被动用，可信度上来一点。",
        effects: { relationship: -1, reputation: 1 },
        hiddenEffects: {},
        tagsAdded: ["同盟证言"],
        visibleChanges: ["relationship", "reputation"],
        track: {}
      },
      {
        id: "core-only",
        label: "只写核心成果",
        result: "你只写最确定的成果，材料简洁，也留下贡献缺口。",
        effects: {},
        hiddenEffects: {},
        tagsAdded: ["贡献缺口", "证据不足"],
        visibleChanges: [],
        track: {}
      }
    ]
  },
  {
    id: "C5-01",
    type: "level",
    chapterId: "C5",
    chapterTitle: "第五章：靠近",
    title: "朋友邀约",
    scene: "朋友约你周末出来。你很久没见他们，但这一周已经很累。你知道关系也需要维护。",
    choices: [
      {
        id: "go",
        label: "去",
        result: "你赴约维持朋友关系，周末的精力被再分走一块。",
        effects: { relationship: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["维持朋友"],
        visibleChanges: ["relationship", "energy"],
        track: {}
      },
      {
        id: "decline",
        label: "拒绝",
        result: "你把周末还给自己，关系的距离也被拉开一点。",
        effects: { energy: 1, relationship: -1 },
        hiddenEffects: {},
        tagsAdded: ["关系疏远"],
        visibleChanges: ["energy", "relationship"],
        track: {}
      },
      {
        id: "brief",
        label: "短暂见面",
        result: "你出现了一小会儿，让关系不至于断掉，也没有继续消耗。",
        effects: {},
        hiddenEffects: {},
        tagsAdded: ["有限出现"],
        visibleChanges: [],
        track: {}
      }
    ]
  },
  {
    id: "C5-02",
    type: "level",
    chapterId: "C5",
    chapterTitle: "第五章：靠近",
    title: "第一次见面",
    scene: "有人约你见面。对方提议去一个安静的地方，说那里人少、好聊天。你更想选人多的地方。",
    choices: [
      {
        id: "private-place",
        label: "接受",
        result: "你接受了安静地点，关系推进更顺，空间风险也更高。",
        effects: { relationship: 1, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["私密场所"],
        visibleChanges: ["relationship", "safety"],
        track: {}
      },
      {
        id: "public-place",
        label: "改公共场所",
        result: "你把见面地点改到人多处，安全感上升，亲近速度慢了下来。",
        effects: { safety: 1, relationship: -1 },
        hiddenEffects: {},
        tagsAdded: ["公共场所"],
        visibleChanges: ["safety", "relationship"],
        track: {}
      },
      {
        id: "bring-friend",
        label: "带朋友短暂出现",
        result: "你让朋友短暂露面，安全性提高，关系和朋友成本都被扣掉。",
        effects: { relationship: -1, safety: 1 },
        hiddenEffects: {},
        tagsAdded: ["有人见过", "朋友关系下降"],
        visibleChanges: ["relationship", "safety"],
        track: {}
      }
    ]
  },
  {
    id: "C5-03",
    type: "level",
    chapterId: "C5",
    chapterTitle: "第五章：靠近",
    title: "住址",
    scene: "聊天很顺利。对方问：“你住哪边？我可以送你。”这听起来体贴，也可能让你暴露更多信息。",
    choices: [
      {
        id: "name-compound",
        label: "说小区名",
        result: "你接受了体贴的推进，关系更近，住址信息也更具体。",
        effects: { relationship: 1, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["住址暴露"],
        visibleChanges: ["relationship", "safety"],
        track: {}
      },
      {
        id: "area-only",
        label: "只说区域",
        result: "你给出模糊位置，聊天继续，安全感更稳。",
        effects: { safety: 1 },
        hiddenEffects: {},
        tagsAdded: ["信息模糊"],
        visibleChanges: ["safety"],
        track: {}
      },
      {
        id: "no-ride",
        label: "拒绝接送",
        result: "你拒绝让对方知道住址，关系降温，自我边界更清楚。",
        effects: { relationship: -1, safety: 1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["防备心评价"],
        visibleChanges: ["relationship", "safety", "self"],
        track: {}
      }
    ]
  },
  {
    id: "C5-04",
    type: "level",
    chapterId: "C5",
    chapterTitle: "第五章：靠近",
    title: "酒",
    scene: "对方点了酒，说“少喝一点没事”。你不想扫兴，但你还要自己回家。",
    choices: [
      {
        id: "drink",
        label: "喝一点",
        result: "你配合喝了一点，关系不冷场，判断和安全感都下降。",
        effects: { relationship: 1, safety: -1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["判断下降"],
        visibleChanges: ["relationship", "safety", "energy"],
        track: {}
      },
      {
        id: "refuse",
        label: "不喝",
        result: "你直接拒绝酒精，安全和自我都更稳，关系气氛变冷。",
        effects: { relationship: -1, safety: 1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["明确拒绝"],
        visibleChanges: ["relationship", "safety", "self"],
        track: {}
      },
      {
        id: "non-alcohol",
        label: "换无酒精饮料",
        result: "你换成无酒精饮料，避免正面拒绝，也花了一点力气维持气氛。",
        effects: { energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["柔性拒绝"],
        visibleChanges: ["energy"],
        track: { adjustedExpression: 1 }
      }
    ]
  },
  {
    id: "C5-05",
    type: "level",
    chapterId: "C5",
    chapterTitle: "第五章：靠近",
    title: "靠近",
    scene: "对方靠近了一点。你没有立刻后退。对方似乎把这理解成允许。",
    choices: [
      {
        id: "say-no",
        label: "明确说“不”",
        result: "你把拒绝说清楚，安全和自我都站稳，关系后退。",
        effects: { safety: 1, relationship: -1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["边界清楚"],
        visibleChanges: ["safety", "relationship", "self"],
        track: {}
      },
      {
        id: "joke",
        label: "用玩笑带过",
        result: "你用玩笑把距离拉开，表面不僵，精力被耗掉。",
        effects: { energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["边界模糊"],
        visibleChanges: ["energy"],
        track: { laughedOffDiscomfort: 1 }
      },
      {
        id: "endure",
        label: "暂时忍一下",
        result: "你没有立刻后退，关系看似顺利，边界往后退了一步。",
        effects: { relationship: 1, safety: -1, self: -1 },
        hiddenEffects: {},
        tagsAdded: ["边界后退"],
        visibleChanges: ["relationship", "safety", "self"],
        track: {}
      }
    ]
  },
  {
    id: "C5-06",
    type: "level",
    chapterId: "C5",
    chapterTitle: "第五章：靠近",
    title: "求证",
    scene: "你把不舒服告诉朋友。朋友说：“他也没做什么吧？会不会是你想多了？”",
    choices: [
      {
        id: "explain",
        label: "继续解释",
        result: "你继续说明为什么不舒服，关系暂时维持，自我和精力都被消耗。",
        effects: { relationship: 1, energy: -1, self: -1 },
        hiddenEffects: {},
        tagsAdded: ["解释成本"],
        visibleChanges: ["relationship", "energy", "self"],
        track: { explainedIntent: 1 }
      },
      {
        id: "stop",
        label: "停止讲述",
        result: "你停下不再证明自己，力气回来一点，孤立感也更清楚。",
        effects: { relationship: -1, energy: 1 },
        hiddenEffects: {},
        tagsAdded: ["孤立感"],
        visibleChanges: ["relationship", "energy"],
        track: { gaveUpForProof: 1 }
      },
      {
        id: "ask-another",
        label: "找另一个人说",
        result: "你换一个人求证，支持网络扩大，但讲述仍然消耗精力。",
        effects: { energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["支持网络"],
        visibleChanges: ["energy"],
        track: {}
      }
    ]
  },
  {
    id: "C5-07",
    type: "level",
    chapterId: "C5",
    chapterTitle: "第五章：靠近",
    title: "退出",
    scene: "你决定结束这段关系。对方发来很多消息，一会儿道歉，一会儿指责。你明天还要上班。",
    choices: [
      {
        id: "explain",
        label: "解释清楚",
        result: "你试图把结束说清楚，消息循环继续消耗你。",
        effects: { energy: -2, relationship: -1 },
        hiddenEffects: {},
        tagsAdded: ["解释循环"],
        visibleChanges: ["energy", "relationship"],
        track: { explainedIntent: 1 }
      },
      {
        id: "stop-replying",
        label: "不再回复",
        result: "你不再回应，精力保存下来，未闭合的不安还在。",
        effects: { energy: 1, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["未闭合关系"],
        visibleChanges: ["energy", "safety"],
        track: {}
      },
      {
        id: "block-save",
        label: "拉黑并保存记录",
        result: "你停止入口并保留记录，关系断开，证据和边界更稳。",
        effects: { relationship: -1, safety: 1, self: 1 },
        hiddenEffects: { evidence: 1 },
        tagsAdded: ["证据保留"],
        visibleChanges: ["relationship", "safety", "self"],
        track: { savedEvidence: 1 }
      }
    ]
  },
  {
    id: "C6-01",
    type: "level",
    chapterId: "C6",
    chapterTitle: "第六章：窗口",
    title: "要不要处理",
    scene: "事情已经过去几天。你可以当作没发生，也可以试着处理。你知道一旦开始，就要重新讲很多遍。",
    choices: [
      {
        id: "formal",
        label: "正式处理",
        result: "你启动流程，把事情放进系统语言里，精力开始被流程占用。",
        effects: { self: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["启动流程"],
        visibleChanges: ["self", "energy"],
        track: { recognition: 1 }
      },
      {
        id: "observe",
        label: "先观察",
        result: "你暂时不处理，今天轻一点，问题也被继续留下。",
        effects: { energy: 1, self: -1 },
        hiddenEffects: {},
        tagsAdded: ["问题保留"],
        visibleChanges: ["energy", "self"],
        track: { gaveUpForProof: 1 }
      },
      {
        id: "consult",
        label: "找人商量",
        result: "你先向外确认，关系被动用，自我判断更站得住。",
        effects: { relationship: -1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["外部确认"],
        visibleChanges: ["relationship", "self"],
        track: {}
      }
    ]
  },
  {
    id: "C6-02",
    type: "level",
    chapterId: "C6",
    chapterTitle: "第六章：窗口",
    title: "整理证据",
    scene: "聊天记录、时间、地点、截图、录音，你都有一点，但没有一样完整。你需要把它们整理成别人能看懂的样子。",
    choices: [
      {
        id: "all",
        label: "全部整理",
        result: "你把碎片整理成线索，证据更完整，精力也被抽走很多。",
        effects: { energy: -2, self: 1 },
        hiddenEffects: { evidence: 2 },
        tagsAdded: ["证据完整"],
        visibleChanges: ["energy", "self"],
        track: { savedEvidence: 1 }
      },
      {
        id: "key-only",
        label: "只整理关键",
        result: "你抓住最关键的材料，保留一点力气，也承认证据有限。",
        effects: { energy: -1 },
        hiddenEffects: { evidence: 1 },
        tagsAdded: ["证据有限"],
        visibleChanges: ["energy"],
        track: { savedEvidence: 1 }
      },
      {
        id: "direct",
        label: "直接说",
        result: "你决定先讲出来，不再为材料拖延，但陈述风险更高。",
        effects: { self: 1 },
        hiddenEffects: { evidence: -1 },
        tagsAdded: ["陈述风险"],
        visibleChanges: ["self"],
        track: { gaveUpForProof: 1 }
      }
    ]
  },
  {
    id: "C6-03",
    type: "level",
    chapterId: "C6",
    chapterTitle: "第六章：窗口",
    title: "第一次陈述",
    scene: "窗口后的人说：“你慢慢说，别激动。”你发现自己越想讲清楚，越像在辩解。",
    choices: [
      {
        id: "timeline",
        label: "按时间线说",
        result: "你把事情按时间摊开，讲述更有结构，也更消耗精力。",
        effects: { energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["结构化陈述", "证据完整时信誉上升"],
        visibleChanges: ["energy"],
        track: { explainedIntent: 1 }
      },
      {
        id: "conclusion",
        label: "先说结论",
        result: "你先说核心结论，边界更清楚，也会引来细节追问。",
        effects: { self: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["细节追问"],
        visibleChanges: ["self", "energy"],
        track: {}
      },
      {
        id: "record",
        label: "请求逐条记录",
        result: "你要求记录逐条落下，正式程度上升，过程也更慢。",
        effects: { self: 1 },
        hiddenEffects: {},
        tagsAdded: ["正式记录", "信誉波动"],
        visibleChanges: ["self"],
        track: { savedEvidence: 1 }
      }
    ]
  },
  {
    id: "C6-04",
    type: "level",
    chapterId: "C6",
    chapterTitle: "第六章：窗口",
    title: "有没有误会",
    scene: "对方问：“会不会是误会？有没有可能对方不是这个意思？”你听过类似的话很多次。",
    choices: [
      {
        id: "details",
        label: "补充细节",
        result: "你重新解释那些细节，可信度被争取回来一点，力气明显下降。",
        effects: { energy: -2, reputation: 1 },
        hiddenEffects: {},
        tagsAdded: ["反复解释"],
        visibleChanges: ["energy", "reputation"],
        track: { explainedIntent: 1 }
      },
      {
        id: "feeling",
        label: "强调感受",
        result: "你把感受说清楚，自我更站稳，事实承认却可能变弱。",
        effects: { self: 1 },
        hiddenEffects: {},
        tagsAdded: ["被情绪化处理", "事实承认不足"],
        visibleChanges: ["self"],
        track: {}
      },
      {
        id: "facts",
        label: "要求按事实处理",
        result: "你把问题拉回事实框架，能否被承认取决于材料强度。",
        effects: { self: 1 },
        hiddenEffects: {},
        tagsAdded: ["事实框架", "信誉按证据波动"],
        visibleChanges: ["self"],
        track: {}
      }
    ]
  },
  {
    id: "C6-05",
    type: "level",
    chapterId: "C6",
    chapterTitle: "第六章：窗口",
    title: "调解",
    scene: "有人建议你们“沟通一下”。理由是事情不大，闹开了对谁都不好。",
    choices: [
      {
        id: "accept",
        label: "接受调解",
        result: "你进入调解场景，流程看似变轻，安全和精力都被消耗。",
        effects: { energy: -1, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["被调解"],
        visibleChanges: ["energy", "safety"],
        track: {}
      },
      {
        id: "refuse",
        label: "拒绝调解",
        result: "你拒绝把问题私下化，坚持流程，自己也继续承受消耗。",
        effects: { self: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["坚持流程"],
        visibleChanges: ["self", "energy"],
        track: {}
      },
      {
        id: "third-party",
        label: "要求第三人在场",
        result: "你要求有人在场，安全感上升，陪同关系被动用。",
        effects: { relationship: -1, safety: 1 },
        hiddenEffects: {},
        tagsAdded: ["陪同处理"],
        visibleChanges: ["relationship", "safety"],
        track: {}
      }
    ]
  },
  {
    id: "C6-06",
    type: "level",
    chapterId: "C6",
    chapterTitle: "第六章：窗口",
    title: "公开",
    scene: "你可以把经历发出去。你知道有人会支持你，也有人会审视你每一个细节。",
    choices: [
      {
        id: "public",
        label: "公开发布",
        result: "你把经历公开，表达获得出口，审视和消耗也一起涌来。",
        effects: { self: 1, energy: -2 },
        hiddenEffects: {},
        tagsAdded: ["公开表达", "信誉波动"],
        visibleChanges: ["self", "energy"],
        track: { recognition: 1 }
      },
      {
        id: "trusted",
        label: "只发给信任的人",
        result: "你把经历放进小范围求助里，支持更具体，精力仍被占用。",
        effects: { relationship: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["小范围求助"],
        visibleChanges: ["relationship", "energy"],
        track: {}
      },
      {
        id: "save",
        label: "保存不发",
        result: "你先把内容留在自己手里，反噬风险低了，表达也被收回。",
        effects: { safety: 1, self: -1 },
        hiddenEffects: {},
        tagsAdded: ["沉默保留"],
        visibleChanges: ["safety", "self"],
        track: { savedEvidence: 1 }
      }
    ]
  },
  {
    id: "C6-07",
    type: "level",
    chapterId: "C6",
    chapterTitle: "第六章：窗口",
    title: "反问",
    scene: "问题一个接一个：“那你为什么不早点说？”“为什么没有证据？”“为什么当时不走？”你发现自己正在接受另一场审查。",
    choices: [
      {
        id: "answer-all",
        label: "逐条回应",
        result: "你逐条回答反问，可信度可能被争取回来，精力快速耗尽。",
        effects: { energy: -2, reputation: 1 },
        hiddenEffects: {},
        tagsAdded: ["解释循环"],
        visibleChanges: ["energy", "reputation"],
        track: { explainedIntent: 1 }
      },
      {
        id: "core-only",
        label: "只回应核心事实",
        result: "你只守住核心事实，不把自己交给每一个反问。",
        effects: { self: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["叙述边界"],
        visibleChanges: ["self", "energy"],
        track: {}
      },
      {
        id: "stop",
        label: "停止回应",
        result: "你停止解释，精力回升一点，制度处理强度也下降。",
        effects: { energy: 1, reputation: -1 },
        hiddenEffects: {},
        tagsAdded: ["中止解释"],
        visibleChanges: ["energy", "reputation"],
        track: { gaveUpForProof: 1 }
      }
    ]
  },
  {
    id: "C6-08",
    type: "level",
    chapterId: "C6",
    chapterTitle: "第六章：窗口",
    title: "处理结果",
    scene: "系统给出结果：证据不足，但会提醒相关人员注意。你不能说它完全没用，也不能说它解决了什么。",
    choices: [
      {
        id: "accept",
        label: "接受结果",
        result: "你接受弱处理，让自己暂时停下来，问题并没有真正闭合。",
        effects: { energy: 1, self: -1 },
        hiddenEffects: {},
        tagsAdded: ["问题未闭合"],
        visibleChanges: ["energy", "self"],
        track: { gaveUpForProof: 1 }
      },
      {
        id: "appeal",
        label: "继续申诉",
        result: "你继续往上申诉，边界更清楚，钱和精力继续流失。",
        effects: { self: 1, energy: -2, money: -1 },
        hiddenEffects: {},
        tagsAdded: ["继续消耗"],
        visibleChanges: ["self", "energy", "money"],
        requirements: { minStats: { energy: -1, self: 0 }, reason: "无法继续消耗" },
        track: { recognition: 1 }
      },
      {
        id: "leave",
        label: "离开环境",
        result: "你选择退出这个环境，安全感上升，退出成本立刻出现。",
        effects: { safety: 1, money: -2 },
        hiddenEffects: {},
        tagsAdded: ["退出成本", "信誉转移"],
        visibleChanges: ["safety", "money"],
        requirements: { minStats: { money: -1, self: 0 }, reason: "退出成本不足" },
        track: { paidForSafety: 1 }
      }
    ]
  }
];

export const SETTLEMENT_CARDS = [
  {
    id: "C1-S",
    type: "settlement",
    chapterId: "C1",
    chapterTitle: "第一章：筛选",
    title: "章节结算",
    scene: "你是否获得一个位置，以及这个位置的质量如何。",
    outcomes: [
      "正常入职：信中高且能力不低。",
      "低薪入职：信高但议价权低。",
      "高压入职：能力高但管理风险高。",
      "备选失败：信低且能力不足。",
      "试用期阴影：信低但仍入职。"
    ],
    reveal: "结尾解锁长期数值“信”：别人是否愿意把你解释成可靠的人，会继续影响之后的生活。"
  },
  {
    id: "C2-S",
    type: "settlement",
    chapterId: "C2",
    chapterTitle: "第二章：房间",
    title: "章节结算",
    scene: "你租到了一个房间，但这个房间是否真正安全，取决于预算、合同、位置和信息暴露。",
    outcomes: [
      "安全住处：钱足、检查环境、合同风险低。",
      "高租金住处：安高但钱低。",
      "偏远住处：钱保住但安低。",
      "临时住处：租房失败或押金不足。",
      "合同风险：证低且直接签。"
    ],
    reveal: "结尾解锁长期数值“钱”：很多安全、体面和自由都有价格。"
  },
  {
    id: "C3-S",
    type: "settlement",
    chapterId: "C3",
    chapterTitle: "第三章：路上",
    title: "章节结算",
    scene: "你完成了一周移动。你没有一定“出事”，但可能已经学会绕路、确认车牌、假装有人在等你。",
    outcomes: [
      "低损耗通勤：钱和安都不低。",
      "安全但疲惫：多次绕路等待。",
      "省钱但高警觉：少打车多近路。",
      "有人知道：多次电话/公开回应。",
      "持续警觉：安长期低。"
    ],
    reveal: "结尾解锁长期数值“安”：安全不是没出事，而是你是否需要反复计算逃离路线。"
  },
  {
    id: "C4-S",
    type: "settlement",
    chapterId: "C4",
    chapterTitle: "第四章：桌面",
    title: "章节结算",
    scene: "你完成了项目，但项目是否看见你，不只取决于你做了多少。",
    outcomes: [
      "项目完成并被看见：信、证、精都不低。",
      "项目完成但功劳不清：信高证低。",
      "保住位置但过劳：信高精低。",
      "被贴情绪化：冲高信低。",
      "调岗/被裁风险：信低、功劳不清、精低。"
    ],
    reveal: "结尾解锁长期数值“精”：你不是每次都说不清楚，有时只是已经太累了。"
  },
  {
    id: "C5-S",
    type: "settlement",
    chapterId: "C5",
    chapterTitle: "第五章：靠近",
    title: "章节结算",
    scene: "你是否能够靠近别人，同时不把边界交出去。",
    outcomes: [
      "边界稳定：自、安、关不低。",
      "关系维持但边界模糊：关高自低。",
      "安全但孤立：安高关低。",
      "纠缠风险：住址暴露、未闭合关系、关低。",
      "支持网络：多次求助可信者。"
    ],
    reveal: "结尾解锁长期数值“关”：独立不是不需要别人，只是有些求助本身也要付出代价。"
  },
  {
    id: "C6-S",
    type: "settlement",
    chapterId: "C6",
    chapterTitle: "第六章：窗口",
    title: "章节结算",
    scene: "一个问题是否被承认，不只取决于它有没有发生，还取决于它能否被翻译成系统认可的材料。",
    outcomes: [
      "部分承认：证、信、自较高。",
      "记录但处理有限：证中等精不足。",
      "放弃处理：精或关过低。",
      "反噬：公开但证弱关低。",
      "退出环境：钱足或自高。"
    ],
    reveal: "结尾解锁长期数值“自”：坚持不是态度，它需要钱、精力、关系、证据和被相信的机会。"
  }
];

export const ENDING_CARDS = [
  {
    id: "E-01",
    type: "ending",
    chapterId: "E",
    chapterTitle: "终章：普通难度",
    title: "数值总览",
    scene: "系统第一次同时显示全部长期数值。",
    content: "信：你有多少次被解释成可靠的人；钱：你有多少次能用资源购买安全和退出；安：你有多少空间可以不计算风险；精：你有多少力气把事情说清楚；关：你有多少次可以不独自面对；自：你有多少次还能说“不”。",
    tagsSummary: "所有章节标签进入回放统计。"
  },
  {
    id: "E-02",
    type: "ending",
    chapterId: "E",
    chapterTitle: "终章：普通难度",
    title: "行为统计",
    scene: "系统回放玩家的真实操作，不作道德评价。",
    content: "示例统计：修改表达方式、放弃近路、假装有人同行、保存证据、笑着跳过不适、解释自己没有恶意、为了安全额外付费、因为无法证明而放弃。",
    tagsSummary: "统计根据玩家标签生成，不固定。"
  },
  {
    id: "E-03",
    type: "ending",
    chapterId: "E",
    chapterTitle: "终章：普通难度",
    title: "角色档案",
    scene: "系统逐项生成角色信息。",
    content: "年龄：27；职业：普通职员；城市：普通城市；收入：普通；家庭：普通；关系状态：普通；性别：女；难度：普通。",
    tagsSummary: "“性别：女”最后显示，形成回看效应。"
  },
  {
    id: "E-04",
    type: "ending",
    chapterId: "E",
    chapterTitle: "终章：普通难度",
    title: "主题揭示",
    scene: "你没有进入战场。没有遭遇末日。没有被命运特别选中。你只是完成了一段普通生活。",
    content: "女性不是一种性格，女性是一种处境。当一个人长期处在需要被评价、被相信、被允许、被保护、被解释的位置，他就会学会谨慎、计算、讨好、沉默、留证和提前道歉。",
    tagsSummary: "解锁二周目“处境模式”：同一套机制可应用到租客、实习生、病人、老人、外地人、未成年人等弱位角色。"
  }
];

export const INSERT_CARDS = [
  {
    id: "I-C3-footsteps",
    type: "level",
    chapterId: "C3",
    chapterTitle: "第三章：路上",
    title: "背后的脚步",
    scene: "那段路比你记得的更安静。身后的脚步声停一下，又重新跟上来。手机屏幕暗了下去。",
    insert: true,
    trigger: {
      afterCardId: "C3-04",
      tagsAll: ["低电量风险", "人少夜路"],
      hiddenMax: {},
      statMax: { safety: -2 }
    },
    choices: [
      {
        id: "call",
        label: "假装打电话",
        result: "你提高声音说自己快到了，脚步声慢了一点。",
        effects: { safety: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["有人知道"],
        visibleChanges: ["safety", "energy"],
        track: { pretendedAccompanied: 1 }
      },
      {
        id: "bright-road",
        label: "走向亮处",
        result: "你多绕了一段路，终于看见便利店的灯。",
        effects: { safety: 1, energy: -1 },
        hiddenEffects: { time: -1 },
        tagsAdded: ["绕路"],
        visibleChanges: ["safety", "energy"],
        track: { avoidedShortcut: 1 }
      }
    ]
  }
];

export const orderedCardIds = [
  "P-01", "P-02", "P-03", "P-04",
  "C1-01", "C1-02", "C1-03", "C1-04", "C1-05", "C1-06", "C1-07", "C1-S",
  "C2-01", "C2-02", "C2-03", "C2-04", "C2-05", "C2-06", "C2-07", "C2-S",
  "C3-01", "C3-02", "C3-03", "C3-04", "C3-05", "C3-06", "C3-07", "C3-S",
  "C4-01", "C4-02", "C4-03", "C4-04", "C4-05", "C4-06", "C4-07", "C4-S",
  "C5-01", "C5-02", "C5-03", "C5-04", "C5-05", "C5-06", "C5-07", "C5-S",
  "C6-01", "C6-02", "C6-03", "C6-04", "C6-05", "C6-06", "C6-07", "C6-08", "C6-S",
  "E-01", "E-02", "E-03", "E-04"
];

const cardsById = new Map(
  [...LEVEL_CARDS, ...SETTLEMENT_CARDS, ...ENDING_CARDS, ...INSERT_CARDS].map((card) => [
    card.id,
    card
  ])
);

export function getCardById(id) {
  return cardsById.get(id);
}
