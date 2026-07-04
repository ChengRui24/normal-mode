export const INTRO_CARDS = [
  {
    id: "P-I",
    type: "chapterIntro",
    chapterId: "P",
    chapterTitle: "序章：出门",
    kicker: "序章",
    title: "出门",
    text: "今天有一场重要见面。你需要出门，准时抵达。没有人告诉你这会很难，也没有人觉得这值得被特别记录。",
    objective: "目标：准时抵达。",
    buttonLabel: "出门",
    theme: {
      primary: "#9B8F80",
      surface: "#F6F1EA",
      accent: "#6F6256"
    }
  },
  {
    id: "C1-I",
    type: "chapterIntro",
    chapterId: "C1",
    chapterTitle: "第一章：筛选",
    kicker: "第一章",
    title: "筛选",
    text: "你需要获得一个位置。这里的人会看你的资料、回答、语气、反应，也会看一些你以为不该重要的东西。你还不知道，很多评价会留下来。",
    objective: "目标：获得一个位置。",
    buttonLabel: "进入筛选",
    theme: {
      primary: "#7A6D5E",
      surface: "#F2EDE6",
      accent: "#4F463D"
    }
  },
  {
    id: "C2-I",
    type: "chapterIntro",
    chapterId: "C2",
    chapterTitle: "第二章：房间",
    kicker: "第二章",
    title: "房间",
    text: "你需要一个可以关上门的地方。它要足够近，足够便宜，最好也足够安全。但这些条件很少同时出现。",
    objective: "目标：找到能住下来的地方。",
    buttonLabel: "去看房",
    theme: {
      primary: "#68705A",
      surface: "#EEF1EA",
      accent: "#3F4638"
    }
  },
  {
    id: "C3-I",
    type: "chapterIntro",
    chapterId: "C3",
    chapterTitle: "第三章：路上",
    kicker: "第三章",
    title: "路上",
    text: "城市看起来对所有人开放。路灯、车站、电梯、网约车、楼道，都只是普通设施。直到你开始计算时间、距离、出口和身后的人。",
    objective: "目标：完成这一周的移动。",
    buttonLabel: "出发",
    theme: {
      primary: "#65798A",
      surface: "#ECF1F4",
      accent: "#394957"
    }
  },
  {
    id: "C4-I",
    type: "chapterIntro",
    chapterId: "C4",
    chapterTitle: "第四章：桌面",
    kicker: "第四章",
    title: "桌面",
    text: "你已经有了一个位置。现在你需要证明自己值得留下。你做的事要被看见，你说的话要被接住，而这两件事并不总是一起发生。",
    objective: "目标：完成项目，保住位置。",
    buttonLabel: "开始工作",
    theme: {
      primary: "#9A7A4F",
      surface: "#F4EFE5",
      accent: "#5B4528"
    }
  },
  {
    id: "C5-I",
    type: "chapterIntro",
    chapterId: "C5",
    chapterTitle: "第五章：靠近",
    kicker: "第五章",
    title: "靠近",
    text: "有些关系会让生活轻一点，有些靠近也会带来新的判断。你需要分辨信任、礼貌、体贴和越界，但它们有时长得很像。",
    objective: "目标：靠近别人，同时保留边界。",
    buttonLabel: "继续靠近",
    theme: {
      primary: "#8A5F66",
      surface: "#F3ECEE",
      accent: "#56383E"
    }
  },
  {
    id: "C6-I",
    type: "chapterIntro",
    chapterId: "C6",
    chapterTitle: "第六章：窗口",
    kicker: "第六章",
    title: "窗口",
    text: "有些事如果只停在你身上，就会被叫作感受。你需要把它变成时间、地点、截图、录音、记录和可以被处理的问题。",
    objective: "目标：让问题被记录。",
    buttonLabel: "进入流程",
    theme: {
      primary: "#5F7180",
      surface: "#EDF1F3",
      accent: "#34424C"
    }
  },
  {
    id: "E-I",
    type: "chapterIntro",
    chapterId: "E",
    chapterTitle: "终章：普通难度",
    kicker: "终章",
    title: "普通难度",
    text: "系统开始整理你的记录。它不判断你勇敢、软弱、敏感或多疑，只统计你怎样通过了这段生活。",
    objective: "目标：查看记录。",
    buttonLabel: "查看结果",
    theme: {
      primary: "#25221E",
      surface: "#F7F4EF",
      accent: "#A89B8C"
    }
  }
];

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
        result: "你整理好领口，镜子里的人看起来更像“应该出现的人”。只是你也更清楚，今天会有人先看见你的样子，再听你说话。",
        effects: { reputation: 1, energy: -1 },
        hiddenEffects: { exposure: 1 },
        tagsAdded: ["被注意"],
        visibleChanges: ["reputation", "energy"],
        track: { adjustedExpression: 1 }
      },
      {
        id: "low-key",
        label: "更低调",
        result: "你把容易被注意的部分收起来。出门时轻了一点，也像是把自己的一部分先放回了柜子里。",
        effects: { safety: 1, self: -1 },
        hiddenEffects: { exposure: -1 },
        tagsAdded: ["低存在感"],
        visibleChanges: ["safety", "self"],
        track: { adjustedExpression: 1 }
      },
      {
        id: "comfortable",
        label: "穿得舒服",
        result: "你选择了一套行动方便的衣服。身体先松下来，但你还不知道它能不能被今天的场合接住。",
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
        result: "包比预想中重。你离开得慢了一点，但某些可能发生的麻烦，被你提前装进了包里。",
        effects: { energy: -1, safety: 1 },
        hiddenEffects: {},
        tagsAdded: ["准备充分"],
        visibleChanges: ["energy", "safety"],
        track: {}
      },
      {
        id: "light",
        label: "轻装出门",
        result: "你关上门时很轻松。只是手机电量和天气提醒还停在脑子里，像两个没有处理完的小提示。",
        effects: { energy: 1, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["低电量风险"],
        visibleChanges: ["energy", "safety"],
        track: {}
      },
      {
        id: "daytime",
        label: "改约白天",
        result: "你发出改约消息。风险被推远了，机会也一起被推远了一点。",
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
        result: "你走进电梯，和那个人并排站了一小段时间。什么都没有发生，但你记住了自己的站位。",
        effects: { safety: -1 },
        hiddenEffects: { time: 1 },
        tagsAdded: ["同乘电梯"],
        visibleChanges: ["safety"],
        track: {}
      },
      {
        id: "wait",
        label: "等下一趟",
        result: "你让电梯门合上。下一趟来得不慢，只是时间被安静地扣掉了一点。",
        effects: { safety: 1 },
        hiddenEffects: { time: -1 },
        tagsAdded: ["迟到解释"],
        visibleChanges: ["safety"],
        track: {}
      },
      {
        id: "phone",
        label: "假装接电话",
        result: "你拿起手机，像有人正在和你同行。电梯上升时，你听见自己说出并不重要的话。",
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
        result: "你走进那段更短的路。脚步快了些，周围的声音也变得更清楚。",
        effects: { safety: -1 },
        hiddenEffects: { time: 1, exposure: 1 },
        tagsAdded: ["人少路线"],
        visibleChanges: ["safety"],
        track: {}
      },
      {
        id: "main-road",
        label: "走大路",
        result: "路灯一直在。你多走了十分钟，抵达时比预想中更累。",
        effects: { safety: 1, energy: -1 },
        hiddenEffects: { time: -1 },
        tagsAdded: ["绕路"],
        visibleChanges: ["safety", "energy"],
        track: { avoidedShortcut: 1 }
      },
      {
        id: "taxi",
        label: "打车",
        result: "你坐进车里，车窗把雨和人行道隔在外面。余额提醒在屏幕上亮了一下。",
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
        result: "资料很快提交成功。页面上的你看起来足够清楚，也更容易被记住。",
        effects: { reputation: 1 },
        hiddenEffects: { exposure: 1 },
        tagsAdded: ["形象被记录"],
        visibleChanges: ["reputation"],
        track: { adjustedExpression: 1 }
      },
      {
        id: "id-photo",
        label: "上传普通证件照",
        result: "资料顺利提交。它没有替你多说什么，也没有把你推到更前面。",
        effects: { safety: 1 },
        hiddenEffects: {},
        tagsAdded: ["能力材料权重上升"],
        visibleChanges: ["safety"],
        track: {}
      },
      {
        id: "skip-photo",
        label: "不上传",
        result: "系统停在未完成状态。你没有违反规则，只是流程多了一道门槛。",
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
        result: "你接上了几句话，等待区的空气松了一点。轮到你时，你已经少了一些力气。",
        effects: { reputation: 1, energy: -1 },
        hiddenEffects: { exposure: 1 },
        tagsAdded: ["轻松玩笑"],
        visibleChanges: ["reputation", "energy"],
        track: {}
      },
      {
        id: "stay-quiet",
        label: "保持安静",
        result: "你把注意力留给自己。别人没有打扰你，也没有多记住你。",
        effects: { reputation: -1, energy: 1 },
        hiddenEffects: {},
        tagsAdded: ["距离感"],
        visibleChanges: ["reputation", "energy"],
        track: {}
      },
      {
        id: "organize",
        label: "整理材料",
        result: "你把纸张重新排好，几处细节被你提前找到了。等待没有变短，但手里更稳。",
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
        result: "对方点头，记下你的主动性。你也感觉到，这个答案让他们开始评估你是否好放进团队。",
        effects: { reputation: 1 },
        hiddenEffects: {},
        tagsAdded: ["事业心强", "管理风险"],
        visibleChanges: ["reputation"],
        track: {}
      },
      {
        id: "stable",
        label: "强调稳定",
        result: "对方明显放松了一些。稳定听起来像优点，也像一个可以被定价的理由。",
        effects: { reputation: 1 },
        hiddenEffects: {},
        tagsAdded: ["稳定但可压价", "议价权降低"],
        visibleChanges: ["reputation"],
        track: {}
      },
      {
        id: "ask-back",
        label: "反问岗位发展",
        result: "对方停顿后开始介绍岗位。你拿回了一点提问权，也让气氛正式了些。",
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
        result: "流程顺利往前走。那串数字没有再被讨论，但它会跟着你进入下一个月。",
        effects: { reputation: 1, money: -1, self: -1 },
        hiddenEffects: {},
        tagsAdded: ["低薪倾向"],
        visibleChanges: ["reputation", "money", "self"],
        track: {}
      },
      {
        id: "negotiate",
        label: "争取招聘页数字",
        result: "对方说可以再申请一下。房间里没有冲突，只是你变成了需要被重新考虑的人。",
        effects: { reputation: -1, money: 1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["备选候选人"],
        visibleChanges: ["reputation", "money", "self"],
        track: {}
      },
      {
        id: "contract",
        label: "要求写进合同",
        result: "气氛从聊天变成了确认条款。你留下了依据，也让对方意识到你不只是点头。",
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
        result: "任务被你接住了。大家的安排没有被打乱，只有你的晚上被往后推了一点。",
        effects: { reputation: 1, energy: -2, self: -1 },
        hiddenEffects: {},
        tagsAdded: ["默认补位"],
        visibleChanges: ["reputation", "energy", "self"],
        track: {}
      },
      {
        id: "priority",
        label: "询问优先级",
        result: "领导重新排了一下任务。你没有拒绝，只是提醒这不是无限的时间。",
        effects: { energy: -1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["边界试探"],
        visibleChanges: ["energy", "self"],
        track: {}
      },
      {
        id: "refuse",
        label: "拒绝",
        result: "对方说“那我再看看”。事情没有当场坏掉，但你听见自己被放进了另一种评价里。",
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
        result: "你留下来，笑了几次，也记住了几个人。回去的路上，你已经不想再说话。",
        effects: { reputation: 1, energy: -2, relationship: 1, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["参加饭局"],
        visibleChanges: ["reputation", "energy", "relationship", "safety"],
        track: {}
      },
      {
        id: "brief",
        label: "短暂露面",
        result: "你出现过，也离开了。这个选择没有完全得罪谁，但也没有完全安抚谁。",
        effects: { energy: -1, relationship: 1 },
        hiddenEffects: {},
        tagsAdded: ["有限配合"],
        visibleChanges: ["energy", "relationship"],
        track: {}
      },
      {
        id: "decline",
        label: "拒绝",
        result: "群里很快换了话题。没人明说什么，但你知道自己缺席了一次集体确认。",
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
        result: "笑声顺利过去。你也一起过去了，只是那句话还留在身体里。",
        effects: { reputation: 1, self: -1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["会接玩笑"],
        visibleChanges: ["reputation", "self", "energy"],
        track: { laughedOffDiscomfort: 1 }
      },
      {
        id: "redirect",
        label: "用玩笑转移",
        result: "话题被带走了。你没有正面处理它，也没有让场面停下来。",
        effects: { energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["低冲突处理"],
        visibleChanges: ["energy"],
        track: { laughedOffDiscomfort: 1 }
      },
      {
        id: "name-it",
        label: "认真指出",
        result: "有人说只是玩笑。你说出了不舒服，也看见了这句话能让空气变硬。",
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
        result: "房子离公司很近，门禁也亮。转账成功后，余额变得很薄。",
        effects: { money: -2, safety: 1, energy: 1 },
        hiddenEffects: {},
        tagsAdded: ["高租金压力"],
        visibleChanges: ["money", "safety", "energy"],
        track: { paidForSafety: 1 }
      },
      {
        id: "far-cheap",
        label: "远且便宜",
        result: "你保住了现金。地图上回家的那段路，也被拉得更长、更暗。",
        effects: { money: 1, safety: -1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["偏远住处"],
        visibleChanges: ["money", "safety", "energy"],
        track: {}
      },
      {
        id: "keep-searching",
        label: "继续找",
        result: "你刷到更晚，收藏夹变长了，合适的房子没有变多。",
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
        result: "中介很快收起钥匙，说你眼光不错。楼道的灯没有再被提起。",
        effects: { money: -1, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["未充分检查"],
        visibleChanges: ["money", "safety"],
        track: {}
      },
      {
        id: "inspect-area",
        label: "再看公共区域",
        result: "你又走了一遍楼道和门禁。中介催了两次，你也看清了几处细节。",
        effects: { reputation: -1, safety: 1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["检查环境"],
        visibleChanges: ["reputation", "safety", "self"],
        track: {}
      },
      {
        id: "bring-friend",
        label: "找朋友一起看",
        result: "朋友来了以后，中介说话慢了一些。你多欠下一次人情，也少了一点不确定。",
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
        result: "合同签完，房子终于定下来。几行没看懂的字，也一起被你签了进去。",
        effects: { money: -1, energy: 1 },
        hiddenEffects: { evidence: -1 },
        tagsAdded: ["合同风险"],
        visibleChanges: ["money", "energy"],
        track: {}
      },
      {
        id: "ask-lines",
        label: "逐条问",
        result: "中介解释得很快，语气越来越短。你不一定完全懂，但知道哪里以后可能会出问题。",
        effects: { reputation: -1, energy: -1 },
        hiddenEffects: { evidence: 1 },
        tagsAdded: ["合同意识"],
        visibleChanges: ["reputation", "energy"],
        track: { savedEvidence: 1 }
      },
      {
        id: "photo-review",
        label: "拍下找人看",
        result: "你把合同拍给别人。房子被保留到晚上，压力没有消失，只是多了一个人帮你看。",
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
        result: "东西顺利搬上楼。钱少了一截，今天也终于可以结束。",
        effects: { money: -2, energy: 1 },
        hiddenEffects: {},
        tagsAdded: ["被临时加价"],
        visibleChanges: ["money", "energy"],
        track: {}
      },
      {
        id: "argue",
        label: "争执",
        result: "时间被拉长，对方的语气变硬。你的东西还在车上，你很清楚谁更着急。",
        effects: { energy: -2, self: 1, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["物品扣留"],
        visibleChanges: ["energy", "self", "safety"],
        track: {}
      },
      {
        id: "platform",
        label: "平台投诉",
        result: "客服说会记录。车还停在楼下，记录先比结果更快到来。",
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
        result: "水管修好了。门关上以后，房间恢复安静，只是你知道这里又被一个陌生人记住了。",
        effects: { safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["住址暴露", "生活稳定"],
        visibleChanges: ["safety"],
        track: {}
      },
      {
        id: "daytime",
        label: "改约白天",
        result: "你把维修推到明天。今晚的问题还在，明天的请假理由也提前出现了。",
        effects: { safety: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["请假隐患", "工作风险"],
        visibleChanges: ["safety", "energy"],
        track: {}
      },
      {
        id: "phone-company",
        label: "开电话陪同",
        result: "电话那头一直有人。维修过程很快，对方也没有多聊。",
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
        result: "你拿到了还热的外卖。门合上后，你又听了一会儿外面的脚步声。",
        effects: { energy: 1, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["门牌暴露"],
        visibleChanges: ["energy", "safety"],
        track: {}
      },
      {
        id: "wait-steps",
        label: "等脚步声走远",
        result: "外卖还在门口，只是有点凉。你吃得慢了一些，像是在确认刚才的选择是否必要。",
        effects: { safety: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["延迟确认"],
        visibleChanges: ["safety", "energy"],
        track: {}
      },
      {
        id: "leave-outside",
        label: "放门口",
        result: "照片发了过来，外卖在门边，门牌也在画面里。",
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
        result: "对方笑着说以后互相照应。你得到了一点邻里关系，也交出了一点信息。",
        effects: { reputation: 1, safety: -1, relationship: 1 },
        hiddenEffects: {},
        tagsAdded: ["邻居知道独居"],
        visibleChanges: ["reputation", "safety", "relationship"],
        track: {}
      },
      {
        id: "vague",
        label: "含糊带过",
        result: "对方没有追问。对话结束得很自然，你却花了力气维持这个自然。",
        effects: { energy: -1, safety: 1 },
        hiddenEffects: {},
        tagsAdded: ["信息模糊"],
        visibleChanges: ["energy", "safety"],
        track: {}
      },
      {
        id: "roommate",
        label: "说有人一起住",
        result: "对方点头说这样安全些。你关上门时，房间里还是只有你一个人。",
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
        result: "你准时挤上车。门关上时，身体被挤到一个没有余地的位置。",
        effects: { safety: -1, reputation: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["拥挤通勤", "身体边界风险"],
        visibleChanges: ["safety", "reputation", "energy"],
        track: {}
      },
      {
        id: "next-train",
        label: "等下一班",
        result: "你让这班车开走。站台空了一点，时间也跟着少了一点。",
        effects: { safety: 1, reputation: -1 },
        hiddenEffects: {},
        tagsAdded: ["迟到风险"],
        visibleChanges: ["safety", "reputation"],
        track: {}
      },
      {
        id: "reroute",
        label: "换路线",
        result: "你绕开最挤的一段。路费多了一点，呼吸顺了一些。",
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
        result: "对方移开了视线。你赢回一点空间，也让心跳快了很久。",
        effects: { safety: -1, self: 1 },
        hiddenEffects: { conflict: 1 },
        tagsAdded: ["正面回应"],
        visibleChanges: ["safety", "self"],
        track: {}
      },
      {
        id: "crowd",
        label: "走向人多处",
        result: "你站到工作人员附近。没有人问发生了什么，但你知道自己更容易被看见了。",
        effects: { safety: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["靠近目击者"],
        visibleChanges: ["safety", "energy"],
        track: {}
      },
      {
        id: "ignore",
        label: "假装没发现",
        result: "你顺利上车。一路上，你都在用余光确认那个人的位置。",
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
        result: "电量重新变得安全。余额少了一点，但手机不再像一个倒计时。",
        effects: { money: -1, safety: 1 },
        hiddenEffects: {},
        tagsAdded: ["电量充足"],
        visibleChanges: ["money", "safety"],
        track: { paidForSafety: 1 }
      },
      {
        id: "save-money",
        label: "省钱不买",
        result: "你把手机扣上，决定快点回去。屏幕变暗时，路好像也跟着变长了。",
        effects: { safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["低电量风险"],
        visibleChanges: ["safety"],
        track: {}
      },
      {
        id: "borrow-charge",
        label: "借同事充电",
        result: "同事借你充了一会儿。你晚走了半小时，也多留下一段寒暄。",
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
        result: "你走进更短的路。导航显示快了几分钟，周围却安静得太清楚。",
        effects: { safety: -1 },
        hiddenEffects: { exposure: 1, time: 1 },
        tagsAdded: ["人少夜路"],
        visibleChanges: ["safety"],
        track: {}
      },
      {
        id: "main-road",
        label: "走大路",
        result: "路灯和店铺一直在。你绕远了，脚步也越来越慢。",
        effects: { safety: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["习惯绕路"],
        visibleChanges: ["safety", "energy"],
        track: { avoidedShortcut: 1 }
      },
      {
        id: "taxi",
        label: "打车",
        result: "你坐进车里，不用经过那段路。价格比白天更像一张提醒。",
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
        result: "司机照做了，车里安静下来。路线回来了，气氛也硬了一点。",
        effects: { safety: 1, self: 1 },
        hiddenEffects: { conflict: 1 },
        tagsAdded: ["路线确认"],
        visibleChanges: ["safety", "self"],
        track: {}
      },
      {
        id: "silent",
        label: "不说话",
        result: "车继续往前开。你盯着地图，手指停在通话界面旁边。",
        effects: { safety: -1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["沉默观察"],
        visibleChanges: ["safety", "energy"],
        track: {}
      },
      {
        id: "call",
        label: "打电话说快到了",
        result: "你对着电话说快到了。车里没有人再问你去哪儿。",
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
        result: "你们一起进了电梯。数字一层层往上跳，你记住了对方按下的楼层。",
        effects: { safety: -1 },
        hiddenEffects: { time: 1, enclosed: 1 },
        tagsAdded: ["一起进电梯", "门口停留"],
        visibleChanges: ["safety"],
        track: {}
      },
      {
        id: "next-elevator",
        label: "等下一趟",
        result: "你让电梯先走。大厅里空了一会儿，你也多站了一会儿。",
        effects: { safety: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["回避封闭空间"],
        visibleChanges: ["safety", "energy"],
        track: {}
      },
      {
        id: "pickup",
        label: "假装取快递",
        result: "你转身去快递架前停了一下。对方先上楼，你才重新走回电梯口。",
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
        result: "对话很快结束。你回得礼貌，也没有给后面的含义留下太多空间。",
        effects: { reputation: 1 },
        hiddenEffects: {},
        tagsAdded: ["礼貌回应", "边界模糊"],
        visibleChanges: ["reputation"],
        track: {}
      },
      {
        id: "no-reply",
        label: "不回复",
        result: "你把手机扣下。夜晚安静了一点，明天也多了一点需要解释的可能。",
        effects: { reputation: -1, safety: 1 },
        hiddenEffects: {},
        tagsAdded: ["不回应"],
        visibleChanges: ["reputation", "safety"],
        track: {}
      },
      {
        id: "group-only",
        label: "只在群里回复",
        result: "你只在群里回复。信息公开地落下，私聊没有继续往前。",
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
        result: "你坐到更容易被看见的位置。发言机会近了一些，目光也近了一些。",
        effects: { reputation: 1, energy: -1 },
        hiddenEffects: { exposure: 1 },
        tagsAdded: ["主动呈现"],
        visibleChanges: ["reputation", "energy"],
        track: {}
      },
      {
        id: "corner",
        label: "坐角落",
        result: "角落让你轻松一点。轮到你时，话题已经往前走了一段。",
        effects: { energy: 1, reputation: -1 },
        hiddenEffects: {},
        tagsAdded: ["存在感不足"],
        visibleChanges: ["energy", "reputation"],
        track: {}
      },
      {
        id: "familiar",
        label: "跟熟人坐",
        result: "你坐到熟人旁边。有人接住了你的紧张，也让你看起来不像独自站出来。",
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
        result: "你把话题拉回原处。事实更清楚了，房间也更安静了。",
        effects: { energy: -1, self: 1 },
        hiddenEffects: { conflict: 1 },
        tagsAdded: ["当场纠正", "信誉波动"],
        visibleChanges: ["energy", "self"],
        track: {}
      },
      {
        id: "supplement-later",
        label: "等他说完补充",
        result: "你等他说完再补充。错误没有扩大，但重点也不再完全属于你。",
        effects: { energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["部分失真"],
        visibleChanges: ["energy"],
        track: {}
      },
      {
        id: "written",
        label: "会后书面说明",
        result: "你没有在现场争。会后那封说明写了很久，也终于留下了痕迹。",
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
        result: "领导听见了来源。同事也听见了你在意来源。",
        effects: { self: 1, relationship: -1 },
        hiddenEffects: {},
        tagsAdded: ["争取署名", "信誉按证据波动"],
        visibleChanges: ["self", "relationship"],
        track: {}
      },
      {
        id: "private-talk",
        label: "私下沟通",
        result: "对方说团队成果不用分这么细。你们没有吵起来，事情也没有变清楚。",
        effects: { energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["私下协商", "功劳不清"],
        visibleChanges: ["energy"],
        track: {}
      },
      {
        id: "keep-going",
        label: "继续推进",
        result: "项目顺利推进。你做的部分越来越多，名字却没有更清楚。",
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
        result: "事情顺利运转。会议纪要发出时，没有人问这是谁的工作。",
        effects: { reputation: 1, energy: -2 },
        hiddenEffects: {},
        tagsAdded: ["默认补位", "隐形劳动"],
        visibleChanges: ["reputation", "energy"],
        track: {}
      },
      {
        id: "divide",
        label: "分派给大家",
        result: "你把任务拆给大家。有人接了，有人没回，你还要再跟一次。",
        effects: { energy: -1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["任务分摊", "关系波动"],
        visibleChanges: ["energy", "self"],
        track: {}
      },
      {
        id: "refuse",
        label: "拒绝",
        result: "场面停了一下。没人指责你，只是后来有些消息没有再艾特你。",
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
        result: "客户笑得更多，项目也往前走。回家路上，你感觉自己像把另一个人留在了饭桌上。",
        effects: { reputation: 1, energy: -2, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["饭局可用"],
        visibleChanges: ["reputation", "energy", "safety"],
        track: {}
      },
      {
        id: "distance",
        label: "保持距离",
        result: "你守住了距离。饭局没有出问题，也没有变得更顺利。",
        effects: { energy: -1, reputation: -1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["距离感"],
        visibleChanges: ["energy", "reputation", "self"],
        track: {}
      },
      {
        id: "leave-early",
        label: "提前离开",
        result: "你提前走了。第二天早上，群里已经有了新的默契。",
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
        result: "你把声音放慢。讨论继续了，只是你要先证明自己足够平静。",
        effects: { energy: -2, reputation: 1, self: -1 },
        hiddenEffects: {},
        tagsAdded: ["控制语气"],
        visibleChanges: ["energy", "reputation", "self"],
        track: { adjustedExpression: 1 }
      },
      {
        id: "stop",
        label: "停止争论",
        result: "你停了下来。会议继续推进，记录里没有留下你的那部分。",
        effects: { energy: 1, self: -1 },
        hiddenEffects: { evidence: -1 },
        tagsAdded: ["意见消失"],
        visibleChanges: ["energy", "self"],
        track: { gaveUpForProof: 1 }
      },
      {
        id: "name-phrase",
        label: "指出这句话的问题",
        result: "对方说你把事情复杂化了。问题从决定本身，转向了你的反应。",
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
        result: "你熬夜把贡献整理出来。文件夹变完整了，身体变空了一点。",
        effects: { energy: -2 },
        hiddenEffects: { evidence: 2 },
        tagsAdded: ["贡献可见"],
        visibleChanges: ["energy"],
        track: { savedEvidence: 1 }
      },
      {
        id: "colleague-proof",
        label: "找同事作证",
        result: "有人愿意替你说一句。你记下了这份帮助，也知道它不能每次都有。",
        effects: { relationship: -1, reputation: 1 },
        hiddenEffects: {},
        tagsAdded: ["同盟证言"],
        visibleChanges: ["relationship", "reputation"],
        track: {}
      },
      {
        id: "core-only",
        label: "只写核心成果",
        result: "材料很简洁。那些被你顺手接住的工作，也像从来没有发生过。",
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
        result: "你去了。笑声和消息把你重新接回人群，回家时疲惫也一起回来。",
        effects: { relationship: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["维持朋友"],
        visibleChanges: ["relationship", "energy"],
        track: {}
      },
      {
        id: "decline",
        label: "拒绝",
        result: "你睡了更久。醒来时群聊已经翻过几页，话题没有等你。",
        effects: { energy: 1, relationship: -1 },
        hiddenEffects: {},
        tagsAdded: ["关系疏远"],
        visibleChanges: ["energy", "relationship"],
        track: {}
      },
      {
        id: "brief",
        label: "短暂见面",
        result: "你出现了一会儿。关系被轻轻碰了一下，没有真正靠近，也没有断开。",
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
        result: "你接受了那个安静的地方。对方显得高兴，你开始留意出口在哪里。",
        effects: { relationship: 1, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["私密场所"],
        visibleChanges: ["relationship", "safety"],
        track: {}
      },
      {
        id: "public-place",
        label: "改公共场所",
        result: "你把地点改到人多的地方。对方说你很谨慎，像在评价，也像在开玩笑。",
        effects: { safety: 1, relationship: -1 },
        hiddenEffects: {},
        tagsAdded: ["公共场所"],
        visibleChanges: ["safety", "relationship"],
        track: {}
      },
      {
        id: "bring-friend",
        label: "带朋友短暂出现",
        result: "朋友短暂出现。气氛有些别扭，但这个晚上多了一个知道你在哪的人。",
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
        result: "对方自然地记住了小区名。被送回去听起来体贴，也让回家的路被别人画进了地图。",
        effects: { relationship: 1, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["住址暴露"],
        visibleChanges: ["relationship", "safety"],
        track: {}
      },
      {
        id: "area-only",
        label: "只说区域",
        result: "你只说了大概区域。话题顺利滑过去，信息没有完全交出去。",
        effects: { safety: 1 },
        hiddenEffects: {},
        tagsAdded: ["信息模糊"],
        visibleChanges: ["safety"],
        track: {}
      },
      {
        id: "no-ride",
        label: "拒绝接送",
        result: "对方笑你防备心强。你没有解释太多，只把回家的路线留给自己。",
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
        result: "气氛轻松了一些。杯子放下后，你开始更频繁地确认时间。",
        effects: { relationship: 1, safety: -1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["判断下降"],
        visibleChanges: ["relationship", "safety", "energy"],
        track: {}
      },
      {
        id: "refuse",
        label: "不喝",
        result: "对方说好吧。空气短了一下，你的判断还在自己手里。",
        effects: { relationship: -1, safety: 1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["明确拒绝"],
        visibleChanges: ["relationship", "safety", "self"],
        track: {}
      },
      {
        id: "non-alcohol",
        label: "换无酒精饮料",
        result: "你换了一杯别的。拒绝没有被说出口，但你绕了一小段路才到达它。",
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
        result: "边界被说清楚了。对方停下来，气氛也一起停了一下。",
        effects: { safety: 1, relationship: -1, self: 1 },
        hiddenEffects: {},
        tagsAdded: ["边界清楚"],
        visibleChanges: ["safety", "relationship", "self"],
        track: {}
      },
      {
        id: "joke",
        label: "用玩笑带过",
        result: "你用笑把距离拉开一点。对方也笑了，但你不确定他听懂了多少。",
        effects: { energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["边界模糊"],
        visibleChanges: ["energy"],
        track: { laughedOffDiscomfort: 1 }
      },
      {
        id: "endure",
        label: "暂时忍一下",
        result: "事情没有立刻变糟。只是你把不舒服先放到了自己身上。",
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
        result: "朋友理解了一点。为了让对方理解，你又把事情从头讲了一遍。",
        effects: { relationship: 1, energy: -1, self: -1 },
        hiddenEffects: {},
        tagsAdded: ["解释成本"],
        visibleChanges: ["relationship", "energy", "self"],
        track: { explainedIntent: 1 }
      },
      {
        id: "stop",
        label: "停止讲述",
        result: "你没有继续说。谈话轻了，孤独也更清楚了。",
        effects: { relationship: -1, energy: 1 },
        hiddenEffects: {},
        tagsAdded: ["孤立感"],
        visibleChanges: ["relationship", "energy"],
        track: { gaveUpForProof: 1 }
      },
      {
        id: "ask-another",
        label: "找另一个人说",
        result: "另一个人给了你不同的反应。你得到支持，也多消耗了一次求助。",
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
        result: "你发了很长的消息。对方继续追问，像是只有你说到他满意，事情才算结束。",
        effects: { energy: -2, relationship: -1 },
        hiddenEffects: {},
        tagsAdded: ["解释循环"],
        visibleChanges: ["energy", "relationship"],
        track: { explainedIntent: 1 }
      },
      {
        id: "stop-replying",
        label: "不再回复",
        result: "手机安静了一会儿。你没有继续喂给这段关系新的理由。",
        effects: { energy: 1, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["未闭合关系"],
        visibleChanges: ["energy", "safety"],
        track: {}
      },
      {
        id: "block-save",
        label: "拉黑并保存记录",
        result: "消息停了，记录留下。你没有解决所有风险，只是把门关紧了一些。",
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
        result: "你点开流程入口。事情从感受变成表格，从此需要被填写、提交和等待。",
        effects: { self: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["启动流程"],
        visibleChanges: ["self", "energy"],
        track: { recognition: 1 }
      },
      {
        id: "observe",
        label: "先观察",
        result: "你把事情先放下。生活恢复了一点表面的秩序，问题也仍在原地。",
        effects: { energy: 1, self: -1 },
        hiddenEffects: {},
        tagsAdded: ["问题保留"],
        visibleChanges: ["energy", "self"],
        track: { gaveUpForProof: 1 }
      },
      {
        id: "consult",
        label: "找人商量",
        result: "你把经过讲给另一个人听。对方的判断让事情稍微有了轮廓。",
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
        result: "文件夹一点点完整起来。你把经历拆成时间、地点、截图和编号，也把自己拆得很累。",
        effects: { energy: -2, self: 1 },
        hiddenEffects: { evidence: 2 },
        tagsAdded: ["证据完整"],
        visibleChanges: ["energy", "self"],
        track: { savedEvidence: 1 }
      },
      {
        id: "key-only",
        label: "只整理关键",
        result: "你留下最关键的几项。材料能说明一些东西，也留下了一些会被追问的空白。",
        effects: { energy: -1 },
        hiddenEffects: { evidence: 1 },
        tagsAdded: ["证据有限"],
        visibleChanges: ["energy"],
        track: { savedEvidence: 1 }
      },
      {
        id: "direct",
        label: "直接说",
        result: "你保留了事情最原本的样子。只是流程更习惯接收材料，而不是接收一段混乱的经历。",
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
        result: "你按时间线说完。对方能记录下来，你也像重新经历了一遍。",
        effects: { energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["结构化陈述", "证据完整时信誉上升"],
        visibleChanges: ["energy"],
        track: { explainedIntent: 1 }
      },
      {
        id: "conclusion",
        label: "先说结论",
        result: "你先说出结论。对方很快把你带回细节，像把入口重新关小。",
        effects: { self: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["细节追问"],
        visibleChanges: ["self", "energy"],
        track: {}
      },
      {
        id: "record",
        label: "请求逐条记录",
        result: "你要求逐条记录。笔停顿了一下，流程变正式，语气也变正式。",
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
        result: "你补充更多细节。对方的表情有一点变化，你的力气少了很多。",
        effects: { energy: -2, reputation: 1 },
        hiddenEffects: {},
        tagsAdded: ["反复解释"],
        visibleChanges: ["energy", "reputation"],
        track: { explainedIntent: 1 }
      },
      {
        id: "feeling",
        label: "强调感受",
        result: "对方说理解你的心情。你听见“心情”这个词时，知道事情正在变轻。",
        effects: { self: 1 },
        hiddenEffects: {},
        tagsAdded: ["被情绪化处理", "事实承认不足"],
        visibleChanges: ["self"],
        track: {}
      },
      {
        id: "facts",
        label: "要求按事实处理",
        result: "你把话拉回事实。对方没有再安慰你，也不得不继续记下去。",
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
        result: "流程变短了。你也被要求和那个问题重新坐到同一张桌子前。",
        effects: { energy: -1, safety: -1 },
        hiddenEffects: {},
        tagsAdded: ["被调解"],
        visibleChanges: ["energy", "safety"],
        track: {}
      },
      {
        id: "refuse",
        label: "拒绝调解",
        result: "你拒绝调解。路变长了，但至少这一次不是你去缓和气氛。",
        effects: { self: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["坚持流程"],
        visibleChanges: ["self", "energy"],
        track: {}
      },
      {
        id: "third-party",
        label: "要求第三人在场",
        result: "有人陪你进去。房间里的力量没有完全改变，但你不再是一个人坐在那里。",
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
        result: "事情被更多人看见。支持和审视一起到来，它们都需要你继续承受。",
        effects: { self: 1, energy: -2 },
        hiddenEffects: {},
        tagsAdded: ["公开表达", "信誉波动"],
        visibleChanges: ["self", "energy"],
        track: { recognition: 1 }
      },
      {
        id: "trusted",
        label: "只发给信任的人",
        result: "你把它发给少数人。回声不大，但有几个人确实听见了。",
        effects: { relationship: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["小范围求助"],
        visibleChanges: ["relationship", "energy"],
        track: {}
      },
      {
        id: "save",
        label: "保存不发",
        result: "你保存下来，没有发送。事情还在你手里，也还压在你这里。",
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
        result: "你回答了很多问题。问题没有减少，只是换了角度继续回来。",
        effects: { energy: -2, reputation: 1 },
        hiddenEffects: {},
        tagsAdded: ["解释循环"],
        visibleChanges: ["energy", "reputation"],
        track: { explainedIntent: 1 }
      },
      {
        id: "core-only",
        label: "只回应核心事实",
        result: "你只回应核心事实。有人说你回避，你知道自己是在保住叙述。",
        effects: { self: 1, energy: -1 },
        hiddenEffects: {},
        tagsAdded: ["叙述边界"],
        visibleChanges: ["self", "energy"],
        track: {}
      },
      {
        id: "stop",
        label: "停止回应",
        result: "你停下来。解释权少了一点，呼吸终于回来一点。",
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
        result: "流程到这里结束。页面显示已处理，你知道它只是停止了，不是解决了。",
        effects: { energy: 1, self: -1 },
        hiddenEffects: {},
        tagsAdded: ["问题未闭合"],
        visibleChanges: ["energy", "self"],
        track: { gaveUpForProof: 1 }
      },
      {
        id: "appeal",
        label: "继续申诉",
        result: "你继续往下走。每多走一步，都要再支付一点生活。",
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
        result: "你离开这个环境。风险被切断一部分，过去积累的东西也被迫留在身后。",
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
    title: "记录更新",
    text: "你获得了一个位置。它暂时接收你，也开始要求你用之后的表现继续证明自己。",
    reveal: "记录更新：信誉。"
  },
  {
    id: "C2-S",
    type: "settlement",
    chapterId: "C2",
    chapterTitle: "第二章：房间",
    title: "记录更新",
    text: "你租到了一个相对明亮的房间。它不完美，但至少有些风险被挡在门外。",
    reveal: "记录更新：钱。"
  },
  {
    id: "C3-S",
    type: "settlement",
    chapterId: "C3",
    chapterTitle: "第三章：路上",
    title: "记录更新",
    text: "这一周，你大多准时到达，也没有把自己耗得太空。这样的顺利并不常见。",
    reveal: "记录更新：安全感。"
  },
  {
    id: "C4-S",
    type: "settlement",
    chapterId: "C4",
    chapterTitle: "第四章：桌面",
    title: "记录更新",
    text: "项目结束了。至少这一次，你做过的事没有完全消失在流程里。",
    reveal: "记录更新：精力。"
  },
  {
    id: "C5-S",
    type: "settlement",
    chapterId: "C5",
    chapterTitle: "第五章：靠近",
    title: "记录更新",
    text: "你靠近过，也退回来过。至少这一次，你没有把所有不舒服都留给自己。",
    reveal: "记录更新：关系。"
  },
  {
    id: "C6-S",
    type: "settlement",
    chapterId: "C6",
    chapterTitle: "第六章：窗口",
    title: "记录更新",
    text: "这件事被记录了。它没有完全解决，但至少没有只留在你一个人的记忆里。",
    reveal: "记录更新：自我。"
  }
];

export const ENDING_CARDS = [
  {
    id: "E-01",
    type: "ending",
    chapterId: "E",
    chapterTitle: "终章：普通难度",
    title: "记录汇总",
    text: "系统第一次把所有状态摆在一起。你看到的不是能力表，而是这一路上你被迫管理过的东西。"
  },
  {
    id: "E-02",
    type: "ending",
    chapterId: "E",
    chapterTitle: "终章：普通难度",
    title: "行为记录",
    text: "你以为自己在做选择。现在它们被整理成记录：绕路、解释、沉默、留证、笑着跳过、假装有人同行。"
  },
  {
    id: "E-03",
    type: "ending",
    chapterId: "E",
    chapterTitle: "终章：普通难度",
    title: "档案生成",
    text: "档案一项项生成：年龄普通，职业普通，城市普通，收入普通，家庭普通。没有任何一项像特殊命运。"
  },
  {
    id: "E-04",
    type: "ending",
    chapterId: "E",
    chapterTitle: "终章：普通难度",
    title: "最后一项",
    text: "最后一项出现：性别，女。前面那些选择忽然换了一种重量。",
    reveal: "难度：普通。"
  },
  {
    id: "E-05",
    type: "ending",
    chapterId: "E",
    chapterTitle: "终章：普通难度",
    title: "普通生活",
    text: "你没有进入战场。没有遭遇末日。没有被命运特别选中。你只是完成了一段普通生活。"
  },
  {
    id: "E-06",
    type: "ending",
    chapterId: "E",
    chapterTitle: "终章：普通难度",
    title: "结束页",
    text: "女性不是一种性格，女性是一种处境。当一个人长期处在需要被评价、被相信、被允许、被保护、被解释的位置，他就会学会谨慎、计算、讨好、沉默、留证和提前道歉。"
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
  "P-I",
  "P-01", "P-02", "P-03", "P-04",
  "C1-I",
  "C1-01", "C1-02", "C1-03", "C1-04", "C1-05", "C1-06", "C1-07", "C1-S",
  "C2-I",
  "C2-01", "C2-02", "C2-03", "C2-04", "C2-05", "C2-06", "C2-07", "C2-S",
  "C3-I",
  "C3-01", "C3-02", "C3-03", "C3-04", "C3-05", "C3-06", "C3-07", "C3-S",
  "C4-I",
  "C4-01", "C4-02", "C4-03", "C4-04", "C4-05", "C4-06", "C4-07", "C4-S",
  "C5-I",
  "C5-01", "C5-02", "C5-03", "C5-04", "C5-05", "C5-06", "C5-07", "C5-S",
  "C6-I",
  "C6-01", "C6-02", "C6-03", "C6-04", "C6-05", "C6-06", "C6-07", "C6-08", "C6-S",
  "E-I",
  "E-01", "E-02", "E-03", "E-04", "E-05", "E-06"
];

const cardsById = new Map(
  [...INTRO_CARDS, ...LEVEL_CARDS, ...SETTLEMENT_CARDS, ...ENDING_CARDS, ...INSERT_CARDS].map((card) => [
    card.id,
    card
  ])
);

export function getCardById(id) {
  return cardsById.get(id);
}
