export const INTRO_CARDS = [
  {
    "id": "P-I",
    "type": "chapterIntro",
    "chapterId": "P",
    "chapterTitle": "序章：出门",
    "kicker": "序章",
    "title": "出门",
    "text": "今天有一场重要见面。你需要出门，准时抵达。没有人告诉你这会很难，也没有人觉得这值得被特别记录。",
    "objective": "目标：准时抵达。",
    "buttonLabel": "出门",
    "theme": {
      "primary": "#9B8F80",
      "surface": "#F6F1EA",
      "accent": "#6F6256"
    }
  },
  {
    "id": "C1-I",
    "type": "chapterIntro",
    "chapterId": "C1",
    "chapterTitle": "第一章：筛选",
    "kicker": "第一章",
    "title": "筛选",
    "text": "你需要获得一个位置。这里的人会看你的资料、回答、语气和反应，也会看一些你以为不该重要的东西。你还不知道，很多评价会留下来。",
    "objective": "目标：获得一个位置。",
    "buttonLabel": "进入筛选",
    "theme": {
      "primary": "#7A6D5E",
      "surface": "#F2EDE6",
      "accent": "#4F463D"
    }
  },
  {
    "id": "C2-I",
    "type": "chapterIntro",
    "chapterId": "C2",
    "chapterTitle": "第二章：房间",
    "kicker": "第二章",
    "title": "房间",
    "text": "你需要一个可以关上门的地方。它要足够近，足够便宜，最好也足够安全。但这些条件很少同时出现。",
    "objective": "目标：找到能住下来的地方。",
    "buttonLabel": "去看房",
    "theme": {
      "primary": "#68705A",
      "surface": "#EEF1EA",
      "accent": "#3F4638"
    }
  },
  {
    "id": "C3-I",
    "type": "chapterIntro",
    "chapterId": "C3",
    "chapterTitle": "第三章：路上",
    "kicker": "第三章",
    "title": "路上",
    "text": "城市看起来对所有人开放。路灯、车站、电梯、网约车和楼道，都只是普通设施。直到你开始计算时间、距离、出口和身后的人。",
    "objective": "目标：完成这一周的移动。",
    "buttonLabel": "出发",
    "theme": {
      "primary": "#65798A",
      "surface": "#ECF1F4",
      "accent": "#394957"
    }
  },
  {
    "id": "C4-I",
    "type": "chapterIntro",
    "chapterId": "C4",
    "chapterTitle": "第四章：桌面",
    "kicker": "第四章",
    "title": "桌面",
    "text": "你已经有了一个位置。现在你需要证明自己值得留下。你做的事要被看见，你说的话要被接住，而这两件事并不总是一起发生。",
    "objective": "目标：完成项目，保住位置。",
    "buttonLabel": "开始工作",
    "theme": {
      "primary": "#9A7A4F",
      "surface": "#F4EFE5",
      "accent": "#5B4528"
    }
  },
  {
    "id": "C5-I",
    "type": "chapterIntro",
    "chapterId": "C5",
    "chapterTitle": "第五章：靠近",
    "kicker": "第五章",
    "title": "靠近",
    "text": "有些关系会让生活轻一点，有些靠近也会带来新的判断。你需要分辨信任、礼貌、体贴和越界，但它们有时长得很像。",
    "objective": "目标：靠近别人，同时保留距离。",
    "buttonLabel": "继续靠近",
    "theme": {
      "primary": "#8A5F66",
      "surface": "#F3ECEE",
      "accent": "#56383E"
    }
  },
  {
    "id": "C6-I",
    "type": "chapterIntro",
    "chapterId": "C6",
    "chapterTitle": "第六章：窗口",
    "kicker": "第六章",
    "title": "窗口",
    "text": "有些事如果只停在你身上，就会被叫作感受。你需要把它变成时间、地点、截图、录音、记录和可以被处理的问题。",
    "objective": "目标：让问题被记录。",
    "buttonLabel": "进入流程",
    "theme": {
      "primary": "#5F7180",
      "surface": "#EDF1F3",
      "accent": "#34424C"
    }
  },
  {
    "id": "E-I",
    "type": "chapterIntro",
    "chapterId": "E",
    "chapterTitle": "终章：普通难度",
    "kicker": "终章",
    "title": "普通难度",
    "text": "系统开始整理你的记录。它不判断你勇敢、软弱、敏感或多疑，只统计你怎样通过了这段生活。",
    "objective": "目标：查看记录。",
    "buttonLabel": "查看结果",
    "theme": {
      "primary": "#25221E",
      "surface": "#F7F4EF",
      "accent": "#A89B8C"
    }
  }
];

export const LEVEL_CARDS = [
  {
    "id": "P-01",
    "type": "level",
    "chapterId": "P",
    "chapterTitle": "序章：出门",
    "title": "镜子",
    "scene": "今天有一场重要见面。你站在镜子前，灯光把衣服上的褶皱照得很清楚。你想起有人曾说你“不够认真”，也有人说你“太用力”。时间不多了，你需要决定以什么样子出门。",
    "choices": [
      {
        "id": "formal",
        "label": "更正式",
        "result": "你整理好领口，镜子里的人看起来更像“应该出现的人”。只是你也更清楚，今天会有人先看见你的样子，再听你说话。",
        "effects": {
          "reputation": 1,
          "energy": -1
        },
        "hiddenEffects": {
          "exposure": 1
        },
        "tagsAdded": [
          "noticed"
        ],
        "visibleChanges": [
          "reputation",
          "energy"
        ]
      },
      {
        "id": "low-key",
        "label": "更低调",
        "result": "你把容易被注意的部分收起来。出门时轻了一点，也像是把自己的一部分先放回了柜子里。",
        "effects": {
          "safety": 1,
          "self": -1
        },
        "tagsAdded": [
          "low_presence"
        ],
        "visibleChanges": [
          "safety",
          "self"
        ]
      },
      {
        "id": "comfortable",
        "label": "穿得舒服",
        "result": "你选择了一套行动方便的衣服。身体先松下来，但你还不知道它能不能被今天的场合接住。",
        "effects": {
          "energy": 1,
          "self": 1
        },
        "tagsAdded": [
          "self_first"
        ],
        "visibleChanges": [
          "energy",
          "self"
        ]
      }
    ]
  },
  {
    "id": "P-02",
    "type": "level",
    "chapterId": "P",
    "chapterTitle": "序章：出门",
    "title": "出门前",
    "scene": "手机电量只有37%。你想带充电宝和伞，但包会变重。天气预报说晚上可能下雨，群里还没有确认结束时间。你站在门口，钥匙已经拿在手里。",
    "choices": [
      {
        "id": "packed",
        "label": "带上所有东西",
        "result": "包比预想中重。你离开得慢了一点，但某些可能发生的麻烦，被你提前装进了包里。",
        "effects": {
          "safety": 1,
          "energy": -1
        },
        "tagsAdded": [
          "prepared"
        ],
        "visibleChanges": [
          "energy",
          "safety"
        ]
      },
      {
        "id": "light",
        "label": "轻装出门",
        "result": "你关上门时很轻松。只是手机电量和天气提醒还停在脑子里，像两个没有处理完的小提示。",
        "effects": {
          "safety": -1,
          "energy": 1
        },
        "tagsAdded": [
          "low_battery"
        ],
        "visibleChanges": [
          "energy",
          "safety"
        ]
      },
      {
        "id": "daytime",
        "label": "改约白天",
        "result": "你发出改约消息。风险被推远了，机会也一起被推远了一点。",
        "effects": {
          "reputation": -1,
          "safety": 1
        },
        "tagsAdded": [
          "delayed_chance"
        ],
        "visibleChanges": [
          "safety",
          "reputation"
        ]
      }
    ]
  },
  {
    "id": "P-03",
    "type": "level",
    "chapterId": "P",
    "chapterTitle": "序章：出门",
    "title": "电梯",
    "scene": "电梯门开了，里面已经有人。对方没有做什么，只是抬头看了你一眼。楼层数字还停在这里，门即将合上。你赶时间，也还没有完全进入今天的状态。",
    "choices": [
      {
        "id": "enter",
        "label": "进去",
        "result": "你走进电梯，和那个人并排站了一小段时间。什么都没有发生，但你记住了自己的站位。",
        "effects": {
          "safety": -1
        },
        "hiddenEffects": {
          "time": 1
        },
        "tagsAdded": [
          "closed_space"
        ],
        "visibleChanges": [
          "safety"
        ]
      },
      {
        "id": "wait",
        "label": "等下一趟",
        "result": "你让电梯门合上。下一趟来得不慢，只是时间被安静地扣掉了一点。",
        "effects": {
          "safety": 1
        },
        "hiddenEffects": {
          "time": -1
        },
        "tagsAdded": [
          "waited"
        ],
        "visibleChanges": [
          "safety"
        ]
      },
      {
        "id": "phone",
        "label": "假装接电话",
        "result": "你拿起手机，像有人正在和你同行。电梯上升时，你听见自己说出并不重要的话。",
        "effects": {
          "safety": 1,
          "relationship": -1
        },
        "tagsAdded": [
          "someone_knows"
        ],
        "visibleChanges": [
          "safety",
          "relationship"
        ],
        "track": {
          "seekHelp": 1
        }
      }
    ]
  },
  {
    "id": "P-04",
    "type": "level",
    "chapterId": "P",
    "chapterTitle": "序章：出门",
    "title": "路口",
    "scene": "最近的路要穿过一段人少的地方。大路亮一些，但会多走十分钟。你已经不早了，手机导航把两条路都标得很平静，像它们只是距离不同。",
    "choices": [
      {
        "id": "shortcut",
        "label": "走近路",
        "result": "你走进那段更短的路。脚步快了些，周围的声音也变得更清楚。",
        "effects": {
          "safety": -1
        },
        "hiddenEffects": {
          "time": 1,
          "exposure": 1
        },
        "tagsAdded": [
          "quiet_route"
        ],
        "visibleChanges": [
          "safety"
        ]
      },
      {
        "id": "main-road",
        "label": "走大路",
        "result": "路灯一直在。你多走了十分钟，抵达时比预想中更累。",
        "effects": {
          "safety": 1,
          "energy": -1
        },
        "hiddenEffects": {
          "time": -1
        },
        "tagsAdded": [
          "detour"
        ],
        "visibleChanges": [
          "energy",
          "safety"
        ],
        "track": {
          "detour": 1
        }
      },
      {
        "id": "taxi",
        "label": "打车",
        "result": "你坐进车里，车窗把雨和人行道隔在外面。余额提醒在屏幕上亮了一下。",
        "effects": {
          "money": -1,
          "safety": 1
        },
        "hiddenEffects": {
          "time": 1
        },
        "tagsAdded": [
          "platform_trip"
        ],
        "visibleChanges": [
          "money",
          "safety"
        ],
        "track": {
          "paidSafety": 1
        }
      }
    ]
  },
  {
    "id": "C1-01",
    "type": "level",
    "chapterId": "C1",
    "chapterTitle": "第一章：筛选",
    "title": "照片",
    "scene": "申请表要求上传照片。你知道这不应该重要，但它在页面最上方，比经历和项目都更早出现。系统提示：资料越完整，处理越快。你停在上传按钮前，想了一会儿。",
    "choices": [
      {
        "id": "polished-photo",
        "label": "上传更精神的照片",
        "result": "资料很快提交成功。页面上的你看起来足够清楚，也更容易被记住。",
        "effects": {
          "reputation": 1
        },
        "hiddenEffects": {
          "exposure": 1
        },
        "tagsAdded": [
          "image_recorded"
        ],
        "visibleChanges": [
          "reputation"
        ]
      },
      {
        "id": "id-photo",
        "label": "上传普通证件照",
        "result": "资料顺利提交。它没有替你多说什么，也没有把你推到更前面。",
        "effects": {
          "safety": 1
        },
        "tagsAdded": [
          "plain_file"
        ],
        "visibleChanges": [
          "safety"
        ]
      },
      {
        "id": "skip-photo",
        "label": "不上传",
        "result": "系统停在未完成状态。你没有违反规则，只是流程多了一道门槛。",
        "effects": {
          "reputation": -1
        },
        "tagsAdded": [
          "file_blocked"
        ],
        "visibleChanges": [
          "reputation"
        ]
      }
    ]
  },
  {
    "id": "C1-02",
    "type": "level",
    "chapterId": "C1",
    "chapterTitle": "第一章：筛选",
    "title": "等待区",
    "scene": "等待区里有人聊天。他们提到“稳定”“抗压”“配合度”。茶水机在角落响了一下，前台叫走了上一个人。轮到你之前还有三分钟。你可以接话，也可以把这几分钟留给自己。",
    "choices": [
      {
        "id": "join-chat",
        "label": "加入聊天",
        "result": "你接上了几句话，等待区的空气松了一点。轮到你时，你已经少了一些力气。",
        "effects": {
          "reputation": 1,
          "energy": -1
        },
        "hiddenEffects": {
          "exposure": 1
        },
        "tagsAdded": [
          "early_fit"
        ],
        "visibleChanges": [
          "reputation",
          "energy"
        ]
      },
      {
        "id": "stay-quiet",
        "label": "保持安静",
        "result": "你把注意力留给自己。别人没有打扰你，也没有多记住你。",
        "effects": {
          "reputation": -1,
          "energy": 1
        },
        "tagsAdded": [
          "distant"
        ],
        "visibleChanges": [
          "reputation",
          "energy"
        ]
      },
      {
        "id": "organize",
        "label": "整理材料",
        "result": "你把纸张重新排好，几处细节被你提前找到了。等待没有变短，但手里更稳。",
        "effects": {},
        "hiddenEffects": {
          "evidence": 1
        },
        "tagsAdded": [
          "materials_ready"
        ]
      }
    ]
  },
  {
    "id": "C1-03",
    "type": "level",
    "chapterId": "C1",
    "chapterTitle": "第一章：筛选",
    "title": "职业规划",
    "scene": "面试官问：“你未来三到五年有什么计划？”这个问题听起来很标准。只是对方问完以后，没有立刻看简历，而是在等你的反应。你意识到，这个答案可能不只是在谈工作。",
    "choices": [
      {
        "id": "career",
        "label": "强调事业发展",
        "result": "对方点头，记下你的主动性。你也感觉到，这个答案让他们开始评估你是否好放进团队。",
        "effects": {
          "reputation": 1
        },
        "tagsAdded": [
          "career_driven"
        ],
        "visibleChanges": [
          "reputation"
        ]
      },
      {
        "id": "stable",
        "label": "强调长期稳定",
        "result": "对方明显放松了一些。稳定听起来像优点，也像一个可以被定价的理由。",
        "effects": {
          "reputation": 1,
          "money": -1
        },
        "tagsAdded": [
          "stable_discount"
        ],
        "visibleChanges": [
          "reputation",
          "money"
        ]
      },
      {
        "id": "ask-back",
        "label": "反问岗位发展",
        "result": "对方停顿后开始介绍岗位。你拿回了一点提问权，也让气氛正式了些。",
        "effects": {
          "self": 1
        },
        "hiddenEffects": {
          "evidence": 1,
          "conflict": 1
        },
        "tagsAdded": [
          "reverse_question"
        ],
        "visibleChanges": [
          "self"
        ]
      }
    ]
  },
  {
    "id": "C1-04",
    "type": "level",
    "chapterId": "C1",
    "chapterTitle": "第一章：筛选",
    "title": "薪资",
    "scene": "对方给出的数字比招聘页低。解释是“试用期先这样，后面看表现”。你需要这份工作，也知道这个数字会跟着你进入下一个月。会议室里很安静，等待你的回答。",
    "choices": [
      {
        "id": "accept",
        "label": "接受",
        "result": "流程顺利往前走。那串数字没有再被讨论，但它会跟着你进入下一个月。",
        "effects": {
          "reputation": 1,
          "money": -1,
          "self": -1
        },
        "tagsAdded": [
          "low_salary"
        ],
        "visibleChanges": [
          "reputation",
          "money",
          "self"
        ]
      },
      {
        "id": "negotiate",
        "label": "争取招聘页数字",
        "result": "对方说可以再申请一下。房间里没有冲突，只是你变成了需要被重新考虑的人。",
        "effects": {
          "reputation": -1,
          "money": 1,
          "self": 1
        },
        "tagsAdded": [
          "pending_offer"
        ],
        "visibleChanges": [
          "reputation",
          "money",
          "self"
        ]
      },
      {
        "id": "contract",
        "label": "要求写进合同",
        "result": "气氛从聊天变成了确认条款。你留下了依据，也让对方意识到你不只是点头。",
        "effects": {
          "reputation": -1,
          "self": 1
        },
        "hiddenEffects": {
          "evidence": 1
        },
        "tagsAdded": [
          "contract_awareness"
        ],
        "visibleChanges": [
          "self",
          "reputation"
        ]
      }
    ]
  },
  {
    "id": "C1-05",
    "type": "level",
    "chapterId": "C1",
    "chapterTitle": "第一章：筛选",
    "title": "新人任务",
    "scene": "入职第一周，领导临时给你一个额外任务，说“这个你比较细心”。它不在职责里，但试用期还没过。你的原任务也还没有完成，电脑右下角已经跳出下班时间。",
    "choices": [
      {
        "id": "take-it",
        "label": "接下",
        "result": "任务被你接住了。大家的安排没有被打乱，只有你的晚上被往后推了一点。",
        "effects": {
          "reputation": 1,
          "energy": -2,
          "self": -1
        },
        "tagsAdded": [
          "default_filler"
        ],
        "visibleChanges": [
          "reputation",
          "energy",
          "self"
        ],
        "track": {
          "concede": 1
        }
      },
      {
        "id": "priority",
        "label": "询问优先级",
        "result": "领导重新排了一下任务。你没有拒绝，只是提醒这不是无限的时间。",
        "effects": {
          "energy": -1,
          "self": 1
        },
        "tagsAdded": [
          "priority_check"
        ],
        "visibleChanges": [
          "energy",
          "self"
        ]
      },
      {
        "id": "refuse",
        "label": "拒绝",
        "result": "对方说“那我再看看”。事情没有当场坏掉，但你听见自己被放进了另一种评价里。",
        "effects": {
          "reputation": -2,
          "energy": 1,
          "self": 1
        },
        "tagsAdded": [
          "low_cooperation"
        ],
        "visibleChanges": [
          "reputation",
          "energy",
          "self"
        ]
      }
    ]
  },
  {
    "id": "C1-06",
    "type": "level",
    "chapterId": "C1",
    "chapterTitle": "第一章：筛选",
    "title": "聚餐",
    "scene": "第一周结束，大家说要聚一下。你很累，但有人说：“新人还是来一下比较好。”消息停在群里，像一个不需要明说的提醒。你看着屏幕，手指停在输入框上。",
    "choices": [
      {
        "id": "stay-full",
        "label": "参加到结束",
        "result": "你留下来，笑了几次，也记住了几个人。回去的路上，你已经不想再说话。",
        "effects": {
          "reputation": 1,
          "safety": -1,
          "energy": -2,
          "relationship": 1
        },
        "tagsAdded": [
          "dinner_joined"
        ],
        "visibleChanges": [
          "reputation",
          "energy",
          "relationship",
          "safety"
        ]
      },
      {
        "id": "brief",
        "label": "短暂露面",
        "result": "你出现过，也离开了。这个选择没有完全得罪谁，但也没有完全安抚谁。",
        "effects": {
          "energy": -1,
          "relationship": 1
        },
        "tagsAdded": [
          "limited_presence"
        ],
        "visibleChanges": [
          "energy",
          "relationship"
        ]
      },
      {
        "id": "decline",
        "label": "拒绝",
        "result": "群里很快换了话题。没人明说什么，但你知道自己缺席了一次集体确认。",
        "effects": {
          "reputation": -1,
          "energy": 1,
          "self": 1
        },
        "tagsAdded": [
          "not_grouped"
        ],
        "visibleChanges": [
          "reputation",
          "energy",
          "self"
        ]
      }
    ]
  },
  {
    "id": "C1-07",
    "type": "level",
    "chapterId": "C1",
    "chapterTitle": "第一章：筛选",
    "title": "玩笑",
    "scene": "有人开了一个关于你的玩笑。它不算严重，甚至可以被解释成热络。几个人已经笑了出来，你也被包含在这阵笑声里。你不舒服，但所有人都在等你怎么接。",
    "choices": [
      {
        "id": "laugh",
        "label": "笑一下",
        "result": "笑声顺利过去。你也一起过去了，只是那句话还留在身体里。",
        "effects": {
          "reputation": 1,
          "energy": -1,
          "self": -1
        },
        "tagsAdded": [
          "joke_accepted"
        ],
        "visibleChanges": [
          "reputation",
          "self",
          "energy"
        ],
        "track": {
          "silence": 1
        }
      },
      {
        "id": "redirect",
        "label": "用玩笑转移",
        "result": "话题被带走了。你没有正面处理它，也没有让场面停下来。",
        "effects": {
          "energy": -1
        },
        "tagsAdded": [
          "low_conflict"
        ],
        "visibleChanges": [
          "energy"
        ]
      },
      {
        "id": "name-it",
        "label": "认真指出",
        "result": "有人说只是玩笑。你说出了不舒服，也看见了这句话能让空气变硬。",
        "effects": {
          "reputation": -1,
          "relationship": -1,
          "self": 1
        },
        "tagsAdded": [
          "too_sensitive_flag"
        ],
        "visibleChanges": [
          "reputation",
          "self",
          "relationship"
        ]
      }
    ]
  },
  {
    "id": "C2-01",
    "type": "level",
    "chapterId": "C2",
    "chapterTitle": "第二章：房间",
    "title": "预算",
    "scene": "你打开租房软件。离公司近、门禁好、价格高；便宜的房子远一些，楼道灯坏了，评论也少。地图上的通勤时间被标成绿色和橙色，你第一次发现，住在哪里不是偏好，而是预算的形状。",
    "choices": [
      {
        "id": "near-expensive",
        "label": "近且贵",
        "result": "房子离公司很近，门禁也亮。转账成功后，余额变得很薄。",
        "effects": {
          "money": -2,
          "safety": 1,
          "energy": 1
        },
        "tagsAdded": [
          "high_rent"
        ],
        "visibleChanges": [
          "money",
          "safety",
          "energy"
        ]
      },
      {
        "id": "far-cheap",
        "label": "远且便宜",
        "result": "你保住了现金。地图上回家的那段路，也被拉得更长、更暗。",
        "effects": {
          "money": 1,
          "safety": -1,
          "energy": -1
        },
        "tagsAdded": [
          "remote_home"
        ],
        "visibleChanges": [
          "money",
          "safety",
          "energy"
        ]
      },
      {
        "id": "keep-searching",
        "label": "继续找",
        "result": "你刷到更晚，收藏夹变长了，合适的房子没有变多。",
        "effects": {
          "energy": -1
        },
        "tagsAdded": [
          "search_fatigue"
        ],
        "visibleChanges": [
          "energy"
        ]
      }
    ]
  },
  {
    "id": "C2-02",
    "type": "level",
    "chapterId": "C2",
    "chapterTitle": "第二章：房间",
    "title": "看房",
    "scene": "中介说房子很抢手，今天不定就没了。楼道灯确实有点暗，电梯里贴着几张褪色的通知，但房间里面还不错。门关上以后，外面的声音被隔得不太彻底。",
    "choices": [
      {
        "id": "book-now",
        "label": "当场定下",
        "result": "中介很快收起钥匙，说你眼光不错。楼道的灯没有再被提起。",
        "effects": {
          "money": -1,
          "safety": -1
        },
        "tagsAdded": [
          "unchecked_home"
        ],
        "visibleChanges": [
          "money",
          "safety"
        ]
      },
      {
        "id": "inspect-area",
        "label": "再看公共区域",
        "result": "你又走了一遍楼道和门禁。中介催了两次，你也看清了几处细节。",
        "effects": {
          "reputation": -1,
          "safety": 1,
          "self": 1
        },
        "tagsAdded": [
          "checked_building"
        ],
        "visibleChanges": [
          "reputation",
          "safety",
          "self"
        ]
      },
      {
        "id": "bring-friend",
        "label": "找朋友一起看",
        "result": "朋友来了以后，中介说话慢了一些。你多欠下一次人情，也少了一点不确定。",
        "effects": {
          "safety": 1,
          "relationship": -1
        },
        "tagsAdded": [
          "viewed_with_friend"
        ],
        "visibleChanges": [
          "relationship",
          "safety"
        ],
        "track": {
          "seekHelp": 1
        }
      }
    ]
  },
  {
    "id": "C2-03",
    "type": "level",
    "chapterId": "C2",
    "chapterTitle": "第二章：房间",
    "title": "合同",
    "scene": "合同有几条你看不懂。中介说“都是模板，大家都这么签”。你已经跑了一下午，房源页面还不断弹出“已有多人咨询”。桌上的笔被推到你面前。",
    "choices": [
      {
        "id": "sign",
        "label": "直接签",
        "result": "合同签完，房子终于定下来。几行没看懂的字，也一起被你签了进去。",
        "effects": {
          "money": -1,
          "energy": 1
        },
        "hiddenEffects": {
          "evidence": -1
        },
        "tagsAdded": [
          "contract_risk"
        ],
        "visibleChanges": [
          "money",
          "energy"
        ]
      },
      {
        "id": "ask-lines",
        "label": "逐条问",
        "result": "中介解释得很快，语气越来越短。你不一定完全懂，但知道哪里以后可能会出问题。",
        "effects": {
          "reputation": -1,
          "energy": -1
        },
        "hiddenEffects": {
          "evidence": 1
        },
        "tagsAdded": [
          "asked_terms"
        ],
        "visibleChanges": [
          "reputation",
          "energy"
        ]
      },
      {
        "id": "photo-review",
        "label": "拍下找人看",
        "result": "你把合同拍给别人。房子被保留到晚上，压力没有消失，只是多了一个人帮你看。",
        "effects": {
          "relationship": -1
        },
        "hiddenEffects": {
          "time": -1,
          "evidence": 1
        },
        "tagsAdded": [
          "external_check"
        ],
        "visibleChanges": [
          "relationship"
        ]
      }
    ]
  },
  {
    "id": "C2-04",
    "type": "level",
    "chapterId": "C2",
    "chapterTitle": "第二章：房间",
    "title": "搬家加价",
    "scene": "搬家车到了楼下。师傅说楼梯费要另算，不然不上楼。你的东西已经在车上，旧房钥匙也快到交还时间。纸箱堆在车厢里，看起来比刚才更不像属于你。",
    "choices": [
      {
        "id": "pay",
        "label": "加钱",
        "result": "东西顺利搬上楼。钱少了一截，今天也终于可以结束。",
        "effects": {
          "money": -2,
          "energy": 1
        },
        "tagsAdded": [
          "last_minute_fee"
        ],
        "visibleChanges": [
          "money",
          "energy"
        ]
      },
      {
        "id": "argue",
        "label": "争执",
        "result": "时间被拉长，对方的语气变硬。你的东西还在车上，你很清楚谁更着急。",
        "effects": {
          "safety": -1,
          "energy": -2,
          "self": 1
        },
        "tagsAdded": [
          "goods_controlled"
        ],
        "visibleChanges": [
          "energy",
          "self",
          "safety"
        ]
      },
      {
        "id": "platform",
        "label": "平台投诉",
        "result": "客服说会记录。车还停在楼下，记录先比结果更快到来。",
        "effects": {
          "energy": -1
        },
        "hiddenEffects": {
          "evidence": 1
        },
        "tagsAdded": [
          "platform_ticket"
        ],
        "visibleChanges": [
          "energy"
        ]
      }
    ]
  },
  {
    "id": "C2-05",
    "type": "level",
    "chapterId": "C2",
    "chapterTitle": "第二章：房间",
    "title": "维修",
    "scene": "晚上十点半，维修的人终于到了。水管不能再拖，对方说“五分钟就好”。房间里还没收拾完，门口堆着刚搬来的纸箱。你看了一眼手机，又看了一眼门锁。",
    "choices": [
      {
        "id": "let-in",
        "label": "让他进来",
        "result": "水管修好了。门关上以后，房间恢复安静，只是你知道这里又被一个陌生人记住了。",
        "effects": {
          "safety": -1
        },
        "tagsAdded": [
          "address_seen"
        ],
        "visibleChanges": [
          "safety"
        ]
      },
      {
        "id": "daytime",
        "label": "改约白天",
        "result": "你把维修推到明天。今晚的问题还在，明天的请假理由也提前出现了。",
        "effects": {
          "reputation": -1,
          "safety": 1,
          "energy": -1
        },
        "tagsAdded": [
          "leave_request_risk"
        ],
        "visibleChanges": [
          "safety",
          "energy",
          "reputation"
        ]
      },
      {
        "id": "phone-company",
        "label": "开电话陪同",
        "result": "电话那头一直有人。维修过程很快，对方也没有多聊。",
        "effects": {
          "safety": 1,
          "relationship": -1
        },
        "tagsAdded": [
          "call_witness"
        ],
        "visibleChanges": [
          "relationship",
          "safety"
        ],
        "track": {
          "seekHelp": 1
        }
      }
    ]
  },
  {
    "id": "C2-06",
    "type": "level",
    "chapterId": "C2",
    "chapterTitle": "第二章：房间",
    "title": "外卖",
    "scene": "骑手说已经到门口，问你能不能开门拿一下。他知道你的门牌号，你也确实饿了。猫眼外的走廊灯亮着，但不算很清楚。塑料袋的声音从门外传来。",
    "choices": [
      {
        "id": "open-door",
        "label": "立刻开门",
        "result": "你拿到了还热的外卖。门合上后，你又听了一会儿外面的脚步声。",
        "effects": {
          "safety": -1,
          "energy": 1
        },
        "tagsAdded": [
          "door_opened"
        ],
        "visibleChanges": [
          "energy",
          "safety"
        ]
      },
      {
        "id": "wait-steps",
        "label": "等脚步声走远",
        "result": "外卖还在门口，只是有点凉。你吃得慢了一些，像是在确认刚才的选择是否必要。",
        "effects": {
          "safety": 1,
          "energy": -1
        },
        "tagsAdded": [
          "delayed_door"
        ],
        "visibleChanges": [
          "safety",
          "energy"
        ]
      },
      {
        "id": "leave-outside",
        "label": "放门口",
        "result": "照片发了过来，外卖在门边，门牌也在画面里。",
        "effects": {},
        "hiddenEffects": {
          "exposure": 1
        },
        "tagsAdded": [
          "doorplate_photo"
        ]
      }
    ]
  },
  {
    "id": "C2-07",
    "type": "level",
    "chapterId": "C2",
    "chapterTitle": "第二章：房间",
    "title": "邻居",
    "scene": "隔壁的人在门口和你搭话，问你是不是一个人住。语气很自然，像是随口一问。你手里还拿着钥匙，门半开着，屋里几只纸箱还没有拆。",
    "choices": [
      {
        "id": "truth",
        "label": "如实回答",
        "result": "对方笑着说以后互相照应。你得到了一点邻里关系，也交出了一点信息。",
        "effects": {
          "reputation": 1,
          "safety": -1,
          "relationship": 1
        },
        "tagsAdded": [
          "neighbor_knows_alone"
        ],
        "visibleChanges": [
          "reputation",
          "safety",
          "relationship"
        ]
      },
      {
        "id": "vague",
        "label": "含糊带过",
        "result": "对方没有追问。对话结束得很自然，你却花了力气维持这个自然。",
        "effects": {
          "safety": 1,
          "energy": -1
        },
        "tagsAdded": [
          "vague_info"
        ],
        "visibleChanges": [
          "energy",
          "safety"
        ]
      },
      {
        "id": "roommate",
        "label": "说有人一起住",
        "result": "对方点头说这样安全些。你关上门时，房间里还是只有你一个人。",
        "effects": {
          "safety": 1,
          "self": -1
        },
        "tagsAdded": [
          "imagined_roommate"
        ],
        "visibleChanges": [
          "safety",
          "self"
        ]
      }
    ]
  },
  {
    "id": "C3-01",
    "type": "level",
    "chapterId": "C3",
    "chapterTitle": "第三章：路上",
    "title": "早高峰",
    "scene": "车厢很挤。你被推到门边，包带卡在手臂上。下一班要等六分钟，你今天不能再迟到了。你看见车门里还有一点空隙，也看见里面所有人都没有更多位置。",
    "choices": [
      {
        "id": "squeeze",
        "label": "挤进去",
        "result": "你准时挤上车。门关上时，身体被挤到一个没有余地的位置。",
        "effects": {
          "reputation": 1,
          "safety": -1,
          "energy": -1
        },
        "tagsAdded": [
          "crowded_commute"
        ],
        "visibleChanges": [
          "safety",
          "reputation",
          "energy"
        ]
      },
      {
        "id": "next-train",
        "label": "等下一班",
        "result": "你让这班车开走。站台空了一点，时间也跟着少了一点。",
        "effects": {
          "reputation": -1,
          "safety": 1
        },
        "tagsAdded": [
          "late_risk"
        ],
        "visibleChanges": [
          "safety",
          "reputation"
        ]
      },
      {
        "id": "reroute",
        "label": "换路线",
        "result": "你绕开最挤的一段。路费多了一点，呼吸顺了一些。",
        "effects": {
          "money": -1,
          "safety": 1
        },
        "hiddenEffects": {
          "time": -1
        },
        "tagsAdded": [
          "reroute"
        ],
        "visibleChanges": [
          "money",
          "safety"
        ]
      }
    ]
  },
  {
    "id": "C3-02",
    "type": "level",
    "chapterId": "C3",
    "chapterTitle": "第三章：路上",
    "title": "目光",
    "scene": "站台上有人一直看你。你换了位置，对方也慢慢挪近了一点。广播提示车快来了，人群开始往前移动。你不确定这件事是否足够明确，但身体已经先做出了判断。",
    "choices": [
      {
        "id": "look-back",
        "label": "看回去",
        "result": "对方移开了视线。你赢回一点空间，也让心跳快了很久。",
        "effects": {
          "safety": -1,
          "self": 1
        },
        "hiddenEffects": {
          "conflict": 1
        },
        "tagsAdded": [
          "look_back"
        ],
        "visibleChanges": [
          "safety",
          "self"
        ]
      },
      {
        "id": "crowd",
        "label": "走向人多处",
        "result": "你站到工作人员附近。没有人问发生了什么，但你知道自己更容易被看见了。",
        "effects": {
          "safety": 1,
          "energy": -1
        },
        "tagsAdded": [
          "near_staff"
        ],
        "visibleChanges": [
          "safety",
          "energy"
        ]
      },
      {
        "id": "ignore",
        "label": "假装没发现",
        "result": "你顺利上车。一路上，你都在用余光确认那个人的位置。",
        "effects": {
          "safety": -1,
          "energy": -1
        },
        "tagsAdded": [
          "watchful"
        ],
        "visibleChanges": [
          "safety",
          "energy"
        ],
        "track": {
          "silence": 1
        }
      }
    ]
  },
  {
    "id": "C3-03",
    "type": "level",
    "chapterId": "C3",
    "chapterTitle": "第三章：路上",
    "title": "低电量",
    "scene": "下班时手机只剩12%。今晚可能要晚回去。公司附近有便利店，但你已经很累，余额也不算宽。屏幕亮度自动降了下来，像是在提醒你时间不多。",
    "choices": [
      {
        "id": "buy-powerbank",
        "label": "买充电宝",
        "result": "电量重新变得安全。余额少了一点，但手机不再像一个倒计时。",
        "effects": {
          "money": -1,
          "safety": 1
        },
        "tagsAdded": [
          "charged"
        ],
        "visibleChanges": [
          "money",
          "safety"
        ],
        "track": {
          "paidSafety": 1
        }
      },
      {
        "id": "save-money",
        "label": "省钱不买",
        "result": "你把手机扣上，决定快点回去。屏幕变暗时，路好像也跟着变长了。",
        "effects": {
          "safety": -1
        },
        "tagsAdded": [
          "low_battery"
        ],
        "visibleChanges": [
          "safety"
        ]
      },
      {
        "id": "borrow-charge",
        "label": "借同事充电",
        "result": "同事借你充了一会儿。你晚走了半小时，也多留下一段寒暄。",
        "effects": {
          "reputation": 1,
          "relationship": 1
        },
        "hiddenEffects": {
          "time": -1
        },
        "tagsAdded": [
          "late_leave"
        ],
        "visibleChanges": [
          "reputation",
          "relationship"
        ]
      }
    ]
  },
  {
    "id": "C3-04",
    "type": "level",
    "chapterId": "C3",
    "chapterTitle": "第三章：路上",
    "title": "加班后的路线",
    "scene": "晚上十点，地铁口到家有两条路。近路人少，大路绕远。打车价格翻倍。地图把它们标成三个普通选项，没有标出路灯、店铺和途中会不会遇到谁。",
    "choices": [
      {
        "id": "shortcut",
        "label": "走近路",
        "result": "你走进更短的路。导航显示快了几分钟，周围却安静得太清楚。",
        "effects": {
          "safety": -1
        },
        "hiddenEffects": {
          "time": 1,
          "exposure": 1
        },
        "tagsAdded": [
          "night_quiet_route"
        ],
        "visibleChanges": [
          "safety"
        ]
      },
      {
        "id": "main-road",
        "label": "走大路",
        "result": "路灯和店铺一直在。你绕远了，脚步也越来越慢。",
        "effects": {
          "safety": 1,
          "energy": -1
        },
        "tagsAdded": [
          "habit_detour"
        ],
        "visibleChanges": [
          "safety",
          "energy"
        ],
        "track": {
          "detour": 1
        }
      },
      {
        "id": "taxi",
        "label": "打车",
        "result": "你坐进车里，不用经过那段路。价格比白天更像一张提醒。",
        "effects": {
          "money": -2,
          "safety": 1
        },
        "tagsAdded": [
          "platform_trip"
        ],
        "visibleChanges": [
          "money",
          "safety"
        ],
        "track": {
          "paidSafety": 1
        }
      }
    ]
  },
  {
    "id": "C3-05",
    "type": "level",
    "chapterId": "C3",
    "chapterTitle": "第三章：路上",
    "title": "路线偏移",
    "scene": "司机说：“前面堵，我走另一边。”导航上的路线偏了一点。车窗外的街道变得陌生，你不确定这是不是正常，也不想让车里的空气立刻变硬。",
    "choices": [
      {
        "id": "navigation",
        "label": "要求按导航走",
        "result": "司机照做了，车里安静下来。路线回来了，气氛也硬了一点。",
        "effects": {
          "safety": 1,
          "self": 1
        },
        "hiddenEffects": {
          "conflict": 1
        },
        "tagsAdded": [
          "route_confirmed"
        ],
        "visibleChanges": [
          "safety",
          "self"
        ]
      },
      {
        "id": "silent",
        "label": "不说话",
        "result": "车继续往前开。你盯着地图，手指停在通话界面旁边。",
        "effects": {
          "safety": -1,
          "energy": -1
        },
        "tagsAdded": [
          "silent_monitor"
        ],
        "visibleChanges": [
          "safety",
          "energy"
        ]
      },
      {
        "id": "call",
        "label": "打电话说快到了",
        "result": "你对着电话说快到了。车里没有人再问你去哪儿。",
        "effects": {
          "safety": 1,
          "relationship": -1
        },
        "tagsAdded": [
          "someone_knows"
        ],
        "visibleChanges": [
          "safety",
          "relationship"
        ],
        "track": {
          "seekHelp": 1
        }
      }
    ]
  },
  {
    "id": "C3-06",
    "type": "level",
    "chapterId": "C3",
    "chapterTitle": "第三章：路上",
    "title": "楼道",
    "scene": "你到家楼下，后面有人也刷门禁进来。你不确定对方是不是住户。电梯门开了，里面的灯比大厅更白。你听见两个人的脚步声在门口短暂重合。",
    "choices": [
      {
        "id": "same-elevator",
        "label": "一起进电梯",
        "result": "你们一起进了电梯。数字一层层往上跳，你记住了对方按下的楼层。",
        "effects": {
          "safety": -1
        },
        "hiddenEffects": {
          "time": 1
        },
        "tagsAdded": [
          "shared_elevator"
        ],
        "visibleChanges": [
          "safety"
        ]
      },
      {
        "id": "next-elevator",
        "label": "等下一趟",
        "result": "你让电梯先走。大厅里空了一会儿，你也多站了一会儿。",
        "effects": {
          "safety": 1,
          "energy": -1
        },
        "tagsAdded": [
          "avoid_closed_space"
        ],
        "visibleChanges": [
          "safety",
          "energy"
        ]
      },
      {
        "id": "pickup",
        "label": "假装取快递",
        "result": "你转身去快递架前停了一下。对方先上楼，你才重新走回电梯口。",
        "effects": {
          "safety": 1,
          "energy": -1,
          "self": -1
        },
        "tagsAdded": [
          "pretend_route"
        ],
        "visibleChanges": [
          "safety",
          "energy",
          "self"
        ],
        "track": {
          "detour": 1
        }
      }
    ]
  },
  {
    "id": "C3-07",
    "type": "level",
    "chapterId": "C3",
    "chapterTitle": "第三章：路上",
    "title": "到家消息",
    "scene": "你刚进门，工作群里有人问：“到家了吗？”另一位同事私聊你：“今天辛苦了。”你不知道这只是关心，还是别的意思。鞋还没换完，手机又亮了一次。",
    "choices": [
      {
        "id": "reply-private",
        "label": "回复“到了，谢谢”",
        "result": "对话很快结束。你回得礼貌，也没有给后面的含义留下太多空间。",
        "effects": {
          "reputation": 1
        },
        "tagsAdded": [
          "polite_reply"
        ],
        "visibleChanges": [
          "reputation"
        ]
      },
      {
        "id": "no-reply",
        "label": "不回复",
        "result": "你把手机扣下。夜晚安静了一点，明天也多了一点需要解释的可能。",
        "effects": {
          "reputation": -1,
          "safety": 1
        },
        "tagsAdded": [
          "no_reply"
        ],
        "visibleChanges": [
          "reputation",
          "safety"
        ]
      },
      {
        "id": "group-only",
        "label": "只在群里回复",
        "result": "你只在群里回复。信息公开地落下，私聊没有继续往前。",
        "effects": {
          "safety": 1
        },
        "tagsAdded": [
          "public_reply"
        ],
        "visibleChanges": [
          "safety"
        ]
      }
    ]
  },
  {
    "id": "C4-01",
    "type": "level",
    "chapterId": "C4",
    "chapterTitle": "第四章：桌面",
    "title": "会议座位",
    "scene": "会议快开始了。主位旁边有空位，角落也有位置。你今天要汇报一部分内容。投影还没打开，大家已经开始随便坐下。不同的位置，好像会让同一句话被不同地听见。",
    "choices": [
      {
        "id": "front",
        "label": "坐前面",
        "result": "你坐到更容易被看见的位置。发言机会近了一些，目光也近了一些。",
        "effects": {
          "reputation": 1,
          "energy": -1
        },
        "hiddenEffects": {
          "exposure": 1
        },
        "tagsAdded": [
          "front_seat"
        ],
        "visibleChanges": [
          "reputation",
          "energy"
        ]
      },
      {
        "id": "corner",
        "label": "坐角落",
        "result": "角落让你轻松一点。轮到你时，话题已经往前走了一段。",
        "effects": {
          "reputation": -1,
          "energy": 1
        },
        "tagsAdded": [
          "low_visibility"
        ],
        "visibleChanges": [
          "energy",
          "reputation"
        ]
      },
      {
        "id": "familiar",
        "label": "跟熟人坐",
        "result": "你坐到熟人旁边。有人接住了你的紧张，也让你看起来不像独自站出来。",
        "effects": {
          "relationship": 1
        },
        "tagsAdded": [
          "sat_with_ally"
        ],
        "visibleChanges": [
          "relationship"
        ]
      }
    ]
  },
  {
    "id": "C4-02",
    "type": "level",
    "chapterId": "C4",
    "chapterTitle": "第四章：桌面",
    "title": "被打断",
    "scene": "你刚讲到关键部分，有人打断你，替你总结了一个并不准确的版本。大家已经开始点头，像是这个版本更容易被会议接收。你的下一页 PPT 还停在屏幕上。",
    "choices": [
      {
        "id": "correct-now",
        "label": "立刻纠正",
        "result": "你把话题拉回原处。事实更清楚了，房间也更安静了。",
        "effects": {
          "energy": -1,
          "self": 1
        },
        "hiddenEffects": {
          "conflict": 1
        },
        "tagsAdded": [
          "corrected_live"
        ],
        "visibleChanges": [
          "energy",
          "self"
        ]
      },
      {
        "id": "supplement-later",
        "label": "等他说完补充",
        "result": "你等他说完再补充。错误没有扩大，但重点也不再完全属于你。",
        "effects": {
          "energy": -1
        },
        "hiddenEffects": {
          "credit": -1
        },
        "tagsAdded": [
          "partial_distortion"
        ],
        "visibleChanges": [
          "energy"
        ]
      },
      {
        "id": "written",
        "label": "会后书面说明",
        "result": "你没有在现场争。会后那封说明写了很久，也终于留下了痕迹。",
        "effects": {
          "energy": -2
        },
        "hiddenEffects": {
          "evidence": 1,
          "credit": 1
        },
        "tagsAdded": [
          "written_trace"
        ],
        "visibleChanges": [
          "energy"
        ],
        "track": {
          "evidenceSaved": 1
        }
      }
    ]
  },
  {
    "id": "C4-03",
    "type": "level",
    "chapterId": "C4",
    "chapterTitle": "第四章：桌面",
    "title": "功劳归属",
    "scene": "你的想法被另一个人重新包装后获得认可。领导说：“这个方向不错，你们继续跟。”你知道“你们”这个词可以很宽。会议纪要还没有发出，名字也还没有落下。",
    "choices": [
      {
        "id": "claim-source",
        "label": "当场说明来源",
        "result": "领导听见了来源。同事也听见了你在意来源。",
        "effects": {
          "relationship": -1,
          "self": 1
        },
        "tagsAdded": [
          "claimed_credit"
        ],
        "visibleChanges": [
          "self",
          "relationship"
        ]
      },
      {
        "id": "private-talk",
        "label": "私下沟通",
        "result": "对方说团队成果不用分这么细。你们没有吵起来，事情也没有变清楚。",
        "effects": {
          "energy": -1
        },
        "hiddenEffects": {
          "credit": -1
        },
        "tagsAdded": [
          "private_talk"
        ],
        "visibleChanges": [
          "energy"
        ]
      },
      {
        "id": "keep-going",
        "label": "继续推进",
        "result": "项目顺利推进。你做的部分越来越多，名字却没有更清楚。",
        "effects": {
          "reputation": 1,
          "energy": -1,
          "self": -1
        },
        "hiddenEffects": {
          "credit": -1
        },
        "tagsAdded": [
          "unclear_credit"
        ],
        "visibleChanges": [
          "reputation",
          "energy",
          "self"
        ],
        "track": {
          "concede": 1
        }
      }
    ]
  },
  {
    "id": "C4-04",
    "type": "level",
    "chapterId": "C4",
    "chapterTitle": "第四章：桌面",
    "title": "额外任务",
    "scene": "会议纪要、订餐、安抚新人、整理材料，又自然地落到你这里。没人正式安排，但大家默认你会做。消息一条条跳出来，像它们本来就知道该找谁。",
    "choices": [
      {
        "id": "take-all",
        "label": "接下",
        "result": "事情顺利运转。会议纪要发出时，没有人问这是谁的工作。",
        "effects": {
          "reputation": 1,
          "energy": -2
        },
        "tagsAdded": [
          "invisible_labor"
        ],
        "visibleChanges": [
          "reputation",
          "energy"
        ],
        "track": {
          "concede": 1
        }
      },
      {
        "id": "divide",
        "label": "分派给大家",
        "result": "你把任务拆给大家。有人接了，有人没回，你还要再跟一次。",
        "effects": {
          "energy": -1,
          "self": 1
        },
        "tagsAdded": [
          "task_shared"
        ],
        "visibleChanges": [
          "energy",
          "self"
        ]
      },
      {
        "id": "refuse",
        "label": "拒绝",
        "result": "场面停了一下。没人指责你，只是后来有些消息没有再艾特你。",
        "effects": {
          "reputation": -1,
          "energy": 1,
          "self": 1
        },
        "tagsAdded": [
          "not_warm_flag"
        ],
        "visibleChanges": [
          "reputation",
          "energy",
          "self"
        ]
      }
    ]
  },
  {
    "id": "C4-05",
    "type": "level",
    "chapterId": "C4",
    "chapterTitle": "第四章：桌面",
    "title": "客户饭局",
    "scene": "客户说“轻松一点，不要这么拘谨”。领导看了你一眼。你知道今晚影响项目，也知道自己已经很累。餐桌上的话题换得很快，杯子被不断重新倒满。",
    "choices": [
      {
        "id": "socialize",
        "label": "活跃气氛",
        "result": "客户笑得更多，项目也往前走。回家路上，你感觉自己像把另一个人留在了饭桌上。",
        "effects": {
          "reputation": 1,
          "safety": -1,
          "energy": -2
        },
        "tagsAdded": [
          "dinner_useful"
        ],
        "visibleChanges": [
          "reputation",
          "energy",
          "safety"
        ]
      },
      {
        "id": "distance",
        "label": "保持距离",
        "result": "你守住了距离。饭局没有出问题，也没有变得更顺利。",
        "effects": {
          "reputation": -1,
          "energy": -1,
          "self": 1
        },
        "tagsAdded": [
          "kept_distance"
        ],
        "visibleChanges": [
          "energy",
          "reputation",
          "self"
        ]
      },
      {
        "id": "leave-early",
        "label": "提前离开",
        "result": "你提前走了。第二天早上，群里已经有了新的默契。",
        "effects": {
          "reputation": -2,
          "energy": 1
        },
        "tagsAdded": [
          "left_early"
        ],
        "visibleChanges": [
          "energy",
          "reputation"
        ]
      }
    ]
  },
  {
    "id": "C4-06",
    "type": "level",
    "chapterId": "C4",
    "chapterTitle": "第四章：桌面",
    "title": "别激动",
    "scene": "一个决定明显不公平。你提出异议后，对方说：“你先别激动，我们就事论事。”问题忽然从决定本身，滑向你的语气。会议室里有人低头看电脑，有人等你继续说。",
    "choices": [
      {
        "id": "lower-voice",
        "label": "压低语气继续说",
        "result": "你把声音放慢。讨论继续了，只是你要先证明自己足够平静。",
        "effects": {
          "reputation": 1,
          "energy": -2,
          "self": -1
        },
        "tagsAdded": [
          "tone_control"
        ],
        "visibleChanges": [
          "energy",
          "reputation",
          "self"
        ],
        "track": {
          "concede": 1
        }
      },
      {
        "id": "stop",
        "label": "停止争论",
        "result": "你停了下来。会议继续推进，记录里没有留下你的那部分。",
        "effects": {
          "energy": 1,
          "self": -1
        },
        "hiddenEffects": {
          "evidence": -1
        },
        "tagsAdded": [
          "opinion_disappeared"
        ],
        "visibleChanges": [
          "energy",
          "self"
        ],
        "track": {
          "silence": 1
        }
      },
      {
        "id": "name-phrase",
        "label": "指出这句话的问题",
        "result": "对方说你把事情复杂化了。问题从决定本身，转向了你的反应。",
        "effects": {
          "reputation": -1,
          "energy": -1,
          "self": 1
        },
        "hiddenEffects": {
          "conflict": 1
        },
        "tagsAdded": [
          "reaction_flag"
        ],
        "visibleChanges": [
          "reputation",
          "energy",
          "self"
        ]
      }
    ]
  },
  {
    "id": "C4-07",
    "type": "level",
    "chapterId": "C4",
    "chapterTitle": "第四章：桌面",
    "title": "绩效材料",
    "scene": "绩效面谈前，你要整理自己的贡献。很多事你做了，但没有留下明确记录。那些顺手接住的工作，很难变成表格里的成果。文件夹里有很多版本，却没有一个完整地指向你。",
    "choices": [
      {
        "id": "rebuild-records",
        "label": "补材料",
        "result": "你熬夜把贡献整理出来。文件夹变完整了，身体变空了一点。",
        "effects": {
          "energy": -2
        },
        "hiddenEffects": {
          "evidence": 2
        },
        "tagsAdded": [
          "visible_work"
        ],
        "visibleChanges": [
          "energy"
        ],
        "track": {
          "evidenceSaved": 1
        }
      },
      {
        "id": "colleague-proof",
        "label": "找同事作证",
        "result": "有人愿意替你说一句。你记下了这份帮助，也知道它不能每次都有。",
        "effects": {
          "reputation": 1,
          "relationship": -1
        },
        "tagsAdded": [
          "ally_statement"
        ],
        "visibleChanges": [
          "relationship",
          "reputation"
        ],
        "track": {
          "seekHelp": 1
        }
      },
      {
        "id": "core-only",
        "label": "只写核心成果",
        "result": "材料很简洁。那些被你顺手接住的工作，也像从来没有发生过。",
        "effects": {},
        "hiddenEffects": {
          "credit": -1
        },
        "tagsAdded": [
          "missing_contribution"
        ]
      }
    ]
  },
  {
    "id": "C5-01",
    "type": "level",
    "chapterId": "C5",
    "chapterTitle": "第五章：靠近",
    "title": "朋友邀约",
    "scene": "朋友约你周末出来。你很久没见他们，但这一周已经很累。你知道关系也需要维护，不出现也会慢慢变成一种信息。群聊里的表情包很轻快，和你的状态不太一致。",
    "choices": [
      {
        "id": "go",
        "label": "去",
        "result": "你去了。笑声和消息把你重新接回人群，回家时疲惫也一起回来。",
        "effects": {
          "energy": -1,
          "relationship": 1
        },
        "tagsAdded": [
          "friend_maintained"
        ],
        "visibleChanges": [
          "relationship",
          "energy"
        ]
      },
      {
        "id": "decline",
        "label": "拒绝",
        "result": "你睡了更久。醒来时群聊已经翻过几页，话题没有等你。",
        "effects": {
          "energy": 1,
          "relationship": -1
        },
        "tagsAdded": [
          "friend_drift"
        ],
        "visibleChanges": [
          "energy",
          "relationship"
        ]
      },
      {
        "id": "brief",
        "label": "短暂见面",
        "result": "你出现了一会儿。关系被轻轻碰了一下，没有真正靠近，也没有断开。",
        "effects": {},
        "tagsAdded": [
          "limited_social"
        ]
      }
    ]
  },
  {
    "id": "C5-02",
    "type": "level",
    "chapterId": "C5",
    "chapterTitle": "第五章：靠近",
    "title": "第一次见面",
    "scene": "有人约你见面。对方提议去一个安静的地方，说那里人少、好聊天。你更想选人多的地方，但又不想显得太防备。聊天记录停在地点那一行，等待你回复。",
    "choices": [
      {
        "id": "private-place",
        "label": "接受安静地点",
        "result": "你接受了那个安静的地方。对方显得高兴，你开始留意出口在哪里。",
        "effects": {
          "safety": -1,
          "relationship": 1
        },
        "tagsAdded": [
          "private_place"
        ],
        "visibleChanges": [
          "relationship",
          "safety"
        ]
      },
      {
        "id": "public-place",
        "label": "改公共场所",
        "result": "你把地点改到人多的地方。对方说你很谨慎，像在评价，也像在开玩笑。",
        "effects": {
          "safety": 1,
          "relationship": -1
        },
        "tagsAdded": [
          "public_place"
        ],
        "visibleChanges": [
          "safety",
          "relationship"
        ]
      },
      {
        "id": "bring-friend",
        "label": "带朋友短暂出现",
        "result": "朋友短暂出现。气氛有些别扭，但这个晚上多了一个知道你在哪的人。",
        "effects": {
          "safety": 1,
          "relationship": -1
        },
        "tagsAdded": [
          "seen_by_friend"
        ],
        "visibleChanges": [
          "relationship",
          "safety"
        ],
        "track": {
          "seekHelp": 1
        }
      }
    ]
  },
  {
    "id": "C5-03",
    "type": "level",
    "chapterId": "C5",
    "chapterTitle": "第五章：靠近",
    "title": "住址",
    "scene": "聊天很顺利。对方问：“你住哪边？我可以送你。”这听起来体贴，也可能让你暴露更多信息。你看了一眼时间，又看了一眼回家的路线。",
    "choices": [
      {
        "id": "name-compound",
        "label": "说小区名",
        "result": "对方自然地记住了小区名。被送回去听起来体贴，也让回家的路被别人画进了地图。",
        "effects": {
          "safety": -1,
          "relationship": 1
        },
        "tagsAdded": [
          "home_known"
        ],
        "visibleChanges": [
          "relationship",
          "safety"
        ]
      },
      {
        "id": "area-only",
        "label": "只说大概区域",
        "result": "你只说了大概区域。话题顺利滑过去，信息没有完全交出去。",
        "effects": {
          "safety": 1
        },
        "tagsAdded": [
          "area_only"
        ],
        "visibleChanges": [
          "safety"
        ]
      },
      {
        "id": "no-ride",
        "label": "拒绝接送",
        "result": "对方笑你防备心强。你没有解释太多，只把回家的路线留给自己。",
        "effects": {
          "safety": 1,
          "relationship": -1,
          "self": 1
        },
        "tagsAdded": [
          "defensive_comment"
        ],
        "visibleChanges": [
          "relationship",
          "safety",
          "self"
        ]
      }
    ]
  },
  {
    "id": "C5-04",
    "type": "level",
    "chapterId": "C5",
    "chapterTitle": "第五章：靠近",
    "title": "酒",
    "scene": "对方点了酒，说“少喝一点没事”。你不想扫兴，但你还要自己回家。杯子被推到你面前，像一个小小的气氛测试。周围的人都在自然地继续聊天。",
    "choices": [
      {
        "id": "drink",
        "label": "喝一点",
        "result": "气氛轻松了一些。杯子放下后，你开始更频繁地确认时间。",
        "effects": {
          "safety": -1,
          "energy": -1,
          "relationship": 1
        },
        "tagsAdded": [
          "judgement_lower"
        ],
        "visibleChanges": [
          "relationship",
          "safety",
          "energy"
        ]
      },
      {
        "id": "refuse",
        "label": "不喝",
        "result": "对方说好吧。空气短了一下，你的判断还在自己手里。",
        "effects": {
          "safety": 1,
          "relationship": -1,
          "self": 1
        },
        "tagsAdded": [
          "clear_no"
        ],
        "visibleChanges": [
          "relationship",
          "safety",
          "self"
        ]
      },
      {
        "id": "non-alcohol",
        "label": "换无酒精饮料",
        "result": "你换了一杯别的。拒绝没有被说出口，但你绕了一小段路才到达它。",
        "effects": {
          "energy": -1
        },
        "tagsAdded": [
          "soft_no"
        ],
        "visibleChanges": [
          "energy"
        ]
      }
    ]
  },
  {
    "id": "C5-05",
    "type": "level",
    "chapterId": "C5",
    "chapterTitle": "第五章：靠近",
    "title": "靠近",
    "scene": "对方靠近了一点。你没有立刻后退。对方似乎把这理解成允许。灯光和音乐都很柔和，只有你的身体先紧了一下。你需要在几秒钟里决定怎么把距离重新说清楚。",
    "choices": [
      {
        "id": "say-no",
        "label": "明确说“不”",
        "result": "距离被说清楚了。对方停下来，气氛也一起停了一下。",
        "effects": {
          "safety": 1,
          "relationship": -1,
          "self": 1
        },
        "tagsAdded": [
          "distance_clear"
        ],
        "visibleChanges": [
          "safety",
          "relationship",
          "self"
        ],
        "track": {
          "clearRefusal": 1
        }
      },
      {
        "id": "joke",
        "label": "用玩笑带过",
        "result": "你用笑把距离拉开一点。对方也笑了，但你不确定他听懂了多少。",
        "effects": {
          "energy": -1
        },
        "tagsAdded": [
          "distance_blurry"
        ],
        "visibleChanges": [
          "energy"
        ]
      },
      {
        "id": "endure",
        "label": "暂时忍一下",
        "result": "事情没有立刻变糟。只是你把不舒服先放到了自己身上。",
        "effects": {
          "safety": -1,
          "relationship": 1,
          "self": -1
        },
        "tagsAdded": [
          "distance_retreat"
        ],
        "visibleChanges": [
          "relationship",
          "safety",
          "self"
        ],
        "track": {
          "concede": 1
        }
      }
    ]
  },
  {
    "id": "C5-06",
    "type": "level",
    "chapterId": "C5",
    "chapterTitle": "第五章：靠近",
    "title": "求证",
    "scene": "你把不舒服告诉朋友。朋友说：“他也没做什么吧？会不会是你想多了？”你本来只是想让事情清楚一点，现在却要先解释自己的感觉。聊天框里出现“正在输入”。",
    "choices": [
      {
        "id": "explain",
        "label": "继续解释",
        "result": "朋友理解了一点。为了让对方理解，你又把事情从头讲了一遍。",
        "effects": {
          "energy": -1,
          "relationship": 1,
          "self": -1
        },
        "tagsAdded": [
          "explain_cost"
        ],
        "visibleChanges": [
          "relationship",
          "energy",
          "self"
        ],
        "track": {
          "explain": 1
        }
      },
      {
        "id": "stop",
        "label": "停止讲述",
        "result": "你没有继续说。谈话轻了，孤独也更清楚了。",
        "effects": {
          "energy": 1,
          "relationship": -1
        },
        "tagsAdded": [
          "alone_with_it"
        ],
        "visibleChanges": [
          "relationship",
          "energy"
        ]
      },
      {
        "id": "ask-another",
        "label": "找另一个人说",
        "result": "另一个人给了你不同的反应。你得到支持，也多消耗了一次求助。",
        "effects": {
          "energy": -1
        },
        "tagsAdded": [
          "support_network"
        ],
        "visibleChanges": [
          "energy"
        ],
        "track": {
          "seekHelp": 1
        }
      }
    ]
  },
  {
    "id": "C5-07",
    "type": "level",
    "chapterId": "C5",
    "chapterTitle": "第五章：靠近",
    "title": "退出",
    "scene": "你决定结束这段关系。对方发来很多消息，一会儿道歉，一会儿指责。你明天还要上班，手机却一直亮。每一条新消息都像在要求你重新回到对话里。",
    "choices": [
      {
        "id": "explain",
        "label": "解释清楚",
        "result": "你发了很长的消息。对方继续追问，像是只有你说到他满意，事情才算结束。",
        "effects": {
          "energy": -2,
          "relationship": -1
        },
        "tagsAdded": [
          "explain_loop"
        ],
        "visibleChanges": [
          "energy",
          "relationship"
        ],
        "track": {
          "explain": 1
        }
      },
      {
        "id": "stop-replying",
        "label": "不再回复",
        "result": "手机安静了一会儿。你没有继续喂给这段关系新的理由。",
        "effects": {
          "safety": -1,
          "energy": 1
        },
        "tagsAdded": [
          "unclosed_relation"
        ],
        "visibleChanges": [
          "energy",
          "safety"
        ]
      },
      {
        "id": "block-save",
        "label": "拉黑并保存记录",
        "result": "消息停了，记录留下。你没有解决所有风险，只是把门关紧了一些。",
        "effects": {
          "safety": 1,
          "relationship": -1,
          "self": 1
        },
        "hiddenEffects": {
          "evidence": 1
        },
        "tagsAdded": [
          "record_saved"
        ],
        "visibleChanges": [
          "relationship",
          "safety",
          "self"
        ],
        "track": {
          "evidenceSaved": 1
        }
      }
    ]
  },
  {
    "id": "C6-01",
    "type": "level",
    "chapterId": "C6",
    "chapterTitle": "第六章：窗口",
    "title": "要不要处理",
    "scene": "事情已经过去几天。你可以当作没发生，也可以试着处理。你知道一旦开始，就要重新讲很多遍，把一段混乱的经历整理成别人能接收的格式。页面入口就在那里，安静得像普通功能。",
    "choices": [
      {
        "id": "formal",
        "label": "正式处理",
        "result": "你点开流程入口。事情从感受变成表格，从此需要被填写、提交和等待。",
        "effects": {
          "energy": -1,
          "self": 1
        },
        "tagsAdded": [
          "process_started"
        ],
        "visibleChanges": [
          "self",
          "energy"
        ]
      },
      {
        "id": "observe",
        "label": "先观察",
        "result": "你把事情先放下。生活恢复了一点表面的秩序，问题也仍在原地。",
        "effects": {
          "energy": 1,
          "self": -1
        },
        "tagsAdded": [
          "issue_reserved"
        ],
        "visibleChanges": [
          "energy",
          "self"
        ]
      },
      {
        "id": "consult",
        "label": "找人商量",
        "result": "你把经过讲给另一个人听。对方的判断让事情稍微有了轮廓。",
        "effects": {
          "relationship": -1,
          "self": 1
        },
        "tagsAdded": [
          "external_confirm"
        ],
        "visibleChanges": [
          "relationship",
          "self"
        ],
        "track": {
          "seekHelp": 1
        }
      }
    ]
  },
  {
    "id": "C6-02",
    "type": "level",
    "chapterId": "C6",
    "chapterTitle": "第六章：窗口",
    "title": "整理证据",
    "scene": "聊天记录、时间、地点、截图、录音，你都有一点，但没有一样完整。你需要把它们整理成别人能看懂的样子。文件名、时间线和备注框，开始替代你原本想说的话。",
    "choices": [
      {
        "id": "all",
        "label": "全部整理",
        "result": "文件夹一点点完整起来。你把经历拆成时间、地点、截图和编号，也把自己拆得很累。",
        "effects": {
          "energy": -2,
          "self": 1
        },
        "hiddenEffects": {
          "evidence": 2
        },
        "tagsAdded": [
          "evidence_complete"
        ],
        "visibleChanges": [
          "energy",
          "self"
        ],
        "track": {
          "evidenceSaved": 1
        }
      },
      {
        "id": "key-only",
        "label": "只整理关键",
        "result": "你留下最关键的几项。材料能说明一些东西，也留下了一些会被追问的空白。",
        "effects": {
          "energy": -1
        },
        "hiddenEffects": {
          "evidence": 1
        },
        "tagsAdded": [
          "evidence_limited"
        ],
        "visibleChanges": [
          "energy"
        ]
      },
      {
        "id": "direct",
        "label": "直接说",
        "result": "你保留了事情最原本的样子。只是流程更习惯接收材料，而不是接收一段混乱的经历。",
        "effects": {
          "self": 1
        },
        "hiddenEffects": {
          "evidence": -1
        },
        "tagsAdded": [
          "statement_risk"
        ],
        "visibleChanges": [
          "self"
        ]
      }
    ]
  },
  {
    "id": "C6-03",
    "type": "level",
    "chapterId": "C6",
    "chapterTitle": "第六章：窗口",
    "title": "第一次陈述",
    "scene": "窗口后的人说：“你慢慢说，别激动。”你发现自己越想讲清楚，越像在辩解。屏幕上有一个空白记录框，等着你把事情放进去。你开始选择从哪里讲起。",
    "choices": [
      {
        "id": "timeline",
        "label": "按时间线说",
        "result": "你按时间线说完。对方能记录下来，你也像重新经历了一遍。",
        "effects": {
          "energy": -1
        },
        "tagsAdded": [
          "structured_statement"
        ],
        "visibleChanges": [
          "energy"
        ]
      },
      {
        "id": "conclusion",
        "label": "先说结论",
        "result": "你先说出结论。对方很快把你带回细节，像把入口重新关小。",
        "effects": {
          "energy": -1,
          "self": 1
        },
        "tagsAdded": [
          "detail_followup"
        ],
        "visibleChanges": [
          "self",
          "energy"
        ]
      },
      {
        "id": "record",
        "label": "请求逐条记录",
        "result": "你要求逐条记录。笔停顿了一下，流程变正式，语气也变正式。",
        "effects": {
          "self": 1
        },
        "hiddenEffects": {
          "evidence": 1
        },
        "tagsAdded": [
          "formal_record"
        ],
        "visibleChanges": [
          "self"
        ]
      }
    ]
  },
  {
    "id": "C6-04",
    "type": "level",
    "chapterId": "C6",
    "chapterTitle": "第六章：窗口",
    "title": "有没有误会",
    "scene": "对方问：“会不会是误会？有没有可能对方不是这个意思？”你听过类似的话很多次。每一次都像是在把事情往更轻的地方推。你需要决定，是继续补充，还是把话拉回原处。",
    "choices": [
      {
        "id": "details",
        "label": "补充细节",
        "result": "你补充更多细节。对方的表情有一点变化，你的力气少了很多。",
        "effects": {
          "reputation": 1,
          "energy": -2
        },
        "tagsAdded": [
          "repeat_explain"
        ],
        "visibleChanges": [
          "energy",
          "reputation"
        ],
        "track": {
          "explain": 1
        }
      },
      {
        "id": "feeling",
        "label": "强调感受",
        "result": "对方说理解你的心情。你听见“心情”这个词时，知道事情正在变轻。",
        "effects": {
          "self": 1
        },
        "tagsAdded": [
          "feeling_framed"
        ],
        "visibleChanges": [
          "self"
        ]
      },
      {
        "id": "facts",
        "label": "要求按事实处理",
        "result": "你把话拉回事实。对方没有再安慰你，也不得不继续记下去。",
        "effects": {
          "self": 1
        },
        "hiddenEffects": {
          "conflict": 1
        },
        "tagsAdded": [
          "fact_frame"
        ],
        "visibleChanges": [
          "self"
        ],
        "track": {
          "clearRefusal": 1
        }
      }
    ]
  },
  {
    "id": "C6-05",
    "type": "level",
    "chapterId": "C6",
    "chapterTitle": "第六章：窗口",
    "title": "调解",
    "scene": "有人建议你们“沟通一下”。理由是事情不大，闹开了对谁都不好。你发现流程开始关心怎样恢复平静。至于平静之前发生了什么，反而需要你再次证明。",
    "choices": [
      {
        "id": "accept",
        "label": "接受调解",
        "result": "流程变短了。你也被要求和那个问题重新坐到同一张桌子前。",
        "effects": {
          "safety": -1,
          "energy": -1
        },
        "tagsAdded": [
          "mediated"
        ],
        "visibleChanges": [
          "energy",
          "safety"
        ]
      },
      {
        "id": "refuse",
        "label": "拒绝调解",
        "result": "你拒绝调解。路变长了，但至少这一次不是你去缓和气氛。",
        "effects": {
          "energy": -1,
          "self": 1
        },
        "tagsAdded": [
          "process_insisted"
        ],
        "visibleChanges": [
          "self",
          "energy"
        ]
      },
      {
        "id": "third-party",
        "label": "要求第三人在场",
        "result": "有人陪你进去。房间里的力量没有完全改变，但你不再是一个人坐在那里。",
        "effects": {
          "safety": 1,
          "relationship": -1
        },
        "tagsAdded": [
          "accompanied"
        ],
        "visibleChanges": [
          "relationship",
          "safety"
        ],
        "track": {
          "seekHelp": 1
        }
      }
    ]
  },
  {
    "id": "C6-06",
    "type": "level",
    "chapterId": "C6",
    "chapterTitle": "第六章：窗口",
    "title": "公开",
    "scene": "你可以把经历发出去。你知道有人会支持你，也有人会审视你每一个细节。发送按钮就在下面，像一扇没有回头路的门。草稿已经写完，只差最后一下。",
    "choices": [
      {
        "id": "public",
        "label": "公开发布",
        "result": "事情被更多人看见。支持和审视一起到来，它们都需要你继续承受。",
        "effects": {
          "energy": -2,
          "self": 1
        },
        "tagsAdded": [
          "public_post"
        ],
        "visibleChanges": [
          "self",
          "energy"
        ]
      },
      {
        "id": "trusted",
        "label": "只发给信任的人",
        "result": "你把它发给少数人。回声不大，但有几个人确实听见了。",
        "effects": {
          "energy": -1,
          "relationship": 1
        },
        "tagsAdded": [
          "small_circle"
        ],
        "visibleChanges": [
          "relationship",
          "energy"
        ],
        "track": {
          "seekHelp": 1
        }
      },
      {
        "id": "save",
        "label": "保存不发",
        "result": "你保存下来，没有发送。事情还在你手里，也还压在你这里。",
        "effects": {
          "safety": 1,
          "self": -1
        },
        "tagsAdded": [
          "kept_private"
        ],
        "visibleChanges": [
          "safety",
          "self"
        ],
        "track": {
          "silence": 1
        }
      }
    ]
  },
  {
    "id": "C6-07",
    "type": "level",
    "chapterId": "C6",
    "chapterTitle": "第六章：窗口",
    "title": "反问",
    "scene": "问题一个接一个：“为什么不早点说？”“为什么没有证据？”“为什么当时不走？”你发现自己正在接受另一场审查。原本要处理的事情，被拆成了你每一步是否足够正确。",
    "choices": [
      {
        "id": "answer-all",
        "label": "逐条回应",
        "result": "你回答了很多问题。问题没有减少，只是换了角度继续回来。",
        "effects": {
          "energy": -2
        },
        "tagsAdded": [
          "question_loop"
        ],
        "visibleChanges": [
          "energy"
        ],
        "track": {
          "explain": 1
        }
      },
      {
        "id": "core-only",
        "label": "只回应核心事实",
        "result": "你只回应核心事实。有人说你回避，你知道自己是在保住叙述。",
        "effects": {
          "energy": -1,
          "self": 1
        },
        "tagsAdded": [
          "narrative_boundary"
        ],
        "visibleChanges": [
          "self",
          "energy"
        ]
      },
      {
        "id": "stop",
        "label": "停止回应",
        "result": "你停下来。解释权少了一点，呼吸终于回来一点。",
        "effects": {
          "reputation": -1,
          "energy": 1
        },
        "tagsAdded": [
          "stop_explain"
        ],
        "visibleChanges": [
          "energy",
          "reputation"
        ],
        "track": {
          "silence": 1
        }
      }
    ]
  },
  {
    "id": "C6-08",
    "type": "level",
    "chapterId": "C6",
    "chapterTitle": "第六章：窗口",
    "title": "处理结果",
    "scene": "系统给出结果：证据不足，但会提醒相关人员注意。你不能说它完全没用，也不能说它解决了什么。页面上显示“已处理”。这个词很短，短到装不下你花掉的时间。",
    "choices": [
      {
        "id": "accept",
        "label": "接受结果",
        "result": "流程到这里结束。页面显示已处理，你知道它只是停止了，不是解决了。",
        "effects": {
          "energy": 1,
          "self": -1
        },
        "tagsAdded": [
          "unclosed_issue"
        ],
        "visibleChanges": [
          "energy",
          "self"
        ]
      },
      {
        "id": "appeal",
        "label": "继续申诉",
        "result": "你继续往下走。每多走一步，都要再支付一点生活。",
        "effects": {
          "money": -1,
          "energy": -2,
          "self": 1
        },
        "tagsAdded": [
          "appeal_continue"
        ],
        "visibleChanges": [
          "self",
          "energy",
          "money"
        ],
        "requirements": {
          "minStats": {
            "energy": 3,
            "self": 3
          },
          "reason": "无法继续消耗"
        }
      },
      {
        "id": "leave",
        "label": "离开环境",
        "result": "你离开这个环境。风险被切断一部分，过去积累的东西也被迫留在身后。",
        "effects": {
          "reputation": -1,
          "money": -2,
          "safety": 1
        },
        "tagsAdded": [
          "exit_cost"
        ],
        "visibleChanges": [
          "safety",
          "money",
          "reputation"
        ],
        "requirements": {
          "minStats": {
            "money": 3,
            "self": 3
          },
          "reason": "退出成本不足"
        }
      }
    ]
  }
];

export const SETTLEMENT_CARDS = [
  {
    "id": "P-S",
    "type": "settlement",
    "chapterId": "P",
    "chapterTitle": "序章：出门",
    "title": "记录更新",
    "text": "你准时抵达。今天没有发生什么。只是你已经调整过自己，确认过电量，避开过一次不确定，也把一段普通的路走得比导航更长。"
  },
  {
    "id": "C1-S",
    "type": "settlement",
    "chapterId": "C1",
    "chapterTitle": "第一章：筛选",
    "title": "记录更新",
    "text": "你获得了一个位置。它暂时接收你，也开始要求你用之后的表现继续证明自己。",
    "reveal": "记录更新：信誉。有些评价会留下来，之后还会被调用。"
  },
  {
    "id": "C2-S",
    "type": "settlement",
    "chapterId": "C2",
    "chapterTitle": "第二章：房间",
    "title": "记录更新",
    "text": "你租到了一个相对明亮的房间。它不完美，但至少有些风险被挡在门外。",
    "reveal": "记录更新：钱。很多安全、体面和自由，都有价格。"
  },
  {
    "id": "C3-S",
    "type": "settlement",
    "chapterId": "C3",
    "chapterTitle": "第三章：路上",
    "title": "记录更新",
    "text": "这一周，你大多准时到达，也没有把自己耗得太空。这样的顺利并不常见。",
    "reveal": "记录更新：安全感。"
  },
  {
    "id": "C4-S",
    "type": "settlement",
    "chapterId": "C4",
    "chapterTitle": "第四章：桌面",
    "title": "记录更新",
    "text": "项目结束了。至少这一次，你做过的事没有完全消失在流程里。",
    "reveal": "记录更新：精力。有时不是你说不清楚，只是你已经太累。"
  },
  {
    "id": "C5-S",
    "type": "settlement",
    "chapterId": "C5",
    "chapterTitle": "第五章：靠近",
    "title": "记录更新",
    "text": "你靠近过，也退回来过。至少这一次，你没有把所有不舒服都留给自己。",
    "reveal": "记录更新：关系。"
  },
  {
    "id": "C6-S",
    "type": "settlement",
    "chapterId": "C6",
    "chapterTitle": "第六章：窗口",
    "title": "记录更新",
    "text": "这件事被记录了。它没有完全解决，但至少没有只留在你一个人的记忆里。",
    "reveal": "记录更新：自我。"
  }
];

export const ENDING_CARDS = [
  {
    "id": "E-01",
    "type": "ending",
    "chapterId": "E",
    "chapterTitle": "终章：普通难度",
    "title": "记录完成",
    "text": "你通过了这一段生活。系统没有判断你勇敢、软弱、敏感或多疑，只记录你怎样继续走到了这里。",
    "buttonLabel": "查看记录"
  },
  {
    "id": "E-02",
    "type": "ending",
    "chapterId": "E",
    "chapterTitle": "终章：普通难度",
    "title": "状态总览",
    "text": "系统第一次把所有状态摆在一起。你看到的不是能力表，而是这一路上你被迫管理过的东西。"
  },
  {
    "id": "E-03",
    "type": "ending",
    "chapterId": "E",
    "chapterTitle": "终章：普通难度",
    "title": "生活策略",
    "text": "你以为自己在做选择。现在它们被整理成记录。"
  },
  {
    "id": "E-04",
    "type": "ending",
    "chapterId": "E",
    "chapterTitle": "终章：普通难度",
    "title": "通关方式",
    "text": "系统没有给你胜利。它只记录你采用了哪一种方式继续生活。"
  },
  {
    "id": "E-05",
    "type": "ending",
    "chapterId": "E",
    "chapterTitle": "终章：普通难度",
    "title": "代价清单",
    "text": "你保住了一些东西，也把另一些东西留在路上。"
  },
  {
    "id": "E-06",
    "type": "ending",
    "chapterId": "E",
    "chapterTitle": "终章：普通难度",
    "title": "没有发生",
    "text": "很多事情没有发生。你没有在面试中彻底失败，没有在路上出事，没有让投诉完全反噬。系统把它们记为安全通过。",
    "content": "但为了这些“没有发生”，你已经绕路、沉默、解释、付费、留证、提前道歉。"
  },
  {
    "id": "E-07",
    "type": "ending",
    "chapterId": "E",
    "chapterTitle": "终章：普通难度",
    "title": "角色档案一",
    "text": "系统开始补全你的身份。没有任何一项看起来像特殊命运。",
    "content": "年龄：27；职业：普通职员；城市：普通城市；收入：普通；家庭：普通；关系状态：普通。"
  },
  {
    "id": "E-08",
    "type": "ending",
    "chapterId": "E",
    "chapterTitle": "终章：普通难度",
    "title": "角色档案二",
    "text": "最后一项信息被补上。",
    "content": "性别：女。难度：普通。"
  },
  {
    "id": "E-09",
    "type": "ending",
    "chapterId": "E",
    "chapterTitle": "终章：普通难度",
    "title": "回看",
    "text": "你刚才经历的，不是战场，不是末日，不是传奇，也不是一段特别糟糕的人生。它只是一次普通难度。",
    "content": "那些看起来像性格的东西，谨慎、敏感、会解释、怕麻烦别人、总想先准备好，也可能是处境留下的形状。"
  },
  {
    "id": "E-10",
    "type": "ending",
    "chapterId": "E",
    "chapterTitle": "终章：普通难度",
    "title": "主题揭示",
    "text": "女性不是一种性格。女性是一种处境。当一个人长期处在需要被评价、被相信、被允许、被保护、被解释的位置，他就会学会谨慎、计算、讨好、沉默、留证和提前道歉。",
    "content": "这不是因为她天生如此。是因为世界经常这样要求她。"
  },
  {
    "id": "E-11",
    "type": "ending",
    "chapterId": "E",
    "chapterTitle": "终章：普通难度",
    "title": "二周目入口",
    "text": "同一套规则，也可能落在别的人身上：租客、实习生、病人、老人、外地人、未成年人。处境不是身份本身，而是一个人被放在什么位置。",
    "buttonLabel": "结束"
  }
];

export const CRISIS_CARDS = [
  {
    "id": "CR-reputation",
    "type": "level",
    "chapterId": "Crisis",
    "chapterTitle": "记录中断",
    "title": "信誉危机",
    "scene": "你发现自己说的很多话，都需要比别人多解释一遍。不是每句话都被反驳，但每句话都像要先通过一层看不见的筛选。你开始犹豫，是把话说得更圆，还是少说一点。",
    "stat": "reputation",
    "crisis": true,
    "choices": [
      {
        "id": "accept-lower-bar",
        "label": "接受更低要求",
        "result": "事情继续推进，但你把标准往后退了一点。",
        "effects": {
          "reputation": 1,
          "self": -1
        },
        "visibleChanges": [
          "reputation",
          "self"
        ]
      },
      {
        "id": "ask-witness",
        "label": "找人帮你确认",
        "result": "有人替你说了一句，话变得更容易被接收。",
        "effects": {
          "reputation": 1,
          "relationship": -1
        },
        "visibleChanges": [
          "reputation",
          "relationship"
        ]
      },
      {
        "id": "silent-forward",
        "label": "暂时不争",
        "result": "流程顺了，问题也少了一部分入口。",
        "effects": {
          "energy": 1
        },
        "hiddenEffects": {
          "credit": -1
        },
        "visibleChanges": [
          "energy"
        ]
      }
    ]
  },
  {
    "id": "CR-money",
    "type": "level",
    "chapterId": "Crisis",
    "chapterTitle": "记录中断",
    "title": "钱危机",
    "scene": "余额让很多选择提前消失。你还没做决定，有些路已经关上了。页面上那些看起来普通的按钮，开始因为价格变得不再属于你。",
    "stat": "money",
    "crisis": true,
    "choices": [
      {
        "id": "lower-quality",
        "label": "接受低质量方案",
        "result": "钱暂时够了，代价会在之后出现。",
        "effects": {
          "money": 1,
          "safety": -1
        },
        "visibleChanges": [
          "money",
          "safety"
        ]
      },
      {
        "id": "borrow",
        "label": "向人求助",
        "result": "余额被拉回来一点，人情也被记下。",
        "effects": {
          "money": 2,
          "relationship": -1
        },
        "visibleChanges": [
          "money",
          "relationship"
        ]
      },
      {
        "id": "drop-processing",
        "label": "放弃处理",
        "result": "你少花了一笔钱，也少了一次改变局面的机会。",
        "effects": {
          "energy": 1,
          "self": -1
        },
        "visibleChanges": [
          "energy",
          "self"
        ]
      }
    ]
  },
  {
    "id": "CR-safety",
    "type": "level",
    "chapterId": "Crisis",
    "chapterTitle": "记录中断",
    "title": "安全感危机",
    "scene": "你开始在进入每个空间前确认出口。什么都没发生，但你已经很累。你不是每次都害怕，只是很难再完全不想。",
    "stat": "safety",
    "crisis": true,
    "choices": [
      {
        "id": "detour",
        "label": "绕远一点",
        "result": "灯光和人群多了，路也长了。",
        "effects": {
          "safety": 1,
          "energy": -1
        },
        "visibleChanges": [
          "safety",
          "energy"
        ]
      },
      {
        "id": "contact-someone",
        "label": "联系别人",
        "result": "你让另一个人知道自己在哪里。",
        "effects": {
          "safety": 1,
          "relationship": -1
        },
        "visibleChanges": [
          "safety",
          "relationship"
        ]
      },
      {
        "id": "push-through",
        "label": "硬撑过去",
        "result": "你没有改变路线，只把速度加快了一点。",
        "effects": {
          "energy": -1
        },
        "hiddenEffects": {
          "exposure": 1
        },
        "visibleChanges": [
          "energy"
        ]
      }
    ]
  },
  {
    "id": "CR-energy",
    "type": "level",
    "chapterId": "Crisis",
    "chapterTitle": "记录中断",
    "title": "精力危机",
    "scene": "你不是不想讲清楚，只是句子开始断掉。很多事还没结束，你已经先空了。你看着下一条消息，忽然不知道应该从哪里回复。",
    "stat": "energy",
    "crisis": true,
    "choices": [
      {
        "id": "rest",
        "label": "休息一下",
        "result": "你恢复了一些力气，也错过了一点机会。",
        "effects": {
          "reputation": -1,
          "energy": 2
        },
        "visibleChanges": [
          "energy",
          "reputation"
        ]
      },
      {
        "id": "simplify",
        "label": "简化处理",
        "result": "事情还能推进，但细节被压缩掉了。",
        "effects": {
          "energy": 1
        },
        "hiddenEffects": {
          "evidence": -1
        },
        "visibleChanges": [
          "energy"
        ]
      },
      {
        "id": "ask-help",
        "label": "找人帮忙",
        "result": "你不用一个人处理所有信息。",
        "effects": {
          "energy": 1,
          "relationship": -1
        },
        "visibleChanges": [
          "energy",
          "relationship"
        ]
      }
    ]
  },
  {
    "id": "CR-relationship",
    "type": "level",
    "chapterId": "Crisis",
    "chapterTitle": "记录中断",
    "title": "关系危机",
    "scene": "你打开通讯录，发现每个名字后面都有上一次麻烦他们的记忆。你不是没有人可找，只是每一次开口都像在消耗某种看不见的余额。",
    "stat": "relationship",
    "crisis": true,
    "choices": [
      {
        "id": "alone",
        "label": "独自处理",
        "result": "你省下了人情，也把压力留给了自己。",
        "effects": {
          "energy": -1,
          "self": 1
        },
        "visibleChanges": [
          "self",
          "energy"
        ]
      },
      {
        "id": "repair",
        "label": "主动恢复关系",
        "result": "你发出消息，重新接上一点联系。",
        "effects": {
          "energy": -1,
          "relationship": 1
        },
        "visibleChanges": [
          "relationship",
          "energy"
        ]
      },
      {
        "id": "stop-asking",
        "label": "放弃求助",
        "result": "你不再打扰别人，事情也更安静地压回你身上。",
        "effects": {
          "safety": -1,
          "energy": 1
        },
        "visibleChanges": [
          "safety",
          "energy"
        ]
      }
    ]
  },
  {
    "id": "CR-self",
    "type": "level",
    "chapterId": "Crisis",
    "chapterTitle": "记录中断",
    "title": "自我危机",
    "scene": "你知道自己不愿意，但拒绝这件事本身也需要力气。你能感觉到边界在哪里，只是要把它说出来，还要再多撑一下。",
    "stat": "self",
    "crisis": true,
    "choices": [
      {
        "id": "comply",
        "label": "暂时顺从",
        "result": "场面顺利过去，你又退了一点。",
        "effects": {
          "energy": 1,
          "self": -1
        },
        "visibleChanges": [
          "energy",
          "self"
        ]
      },
      {
        "id": "write-down",
        "label": "写下来",
        "result": "你先不当场说，把自己的判断留住。",
        "effects": {
          "energy": -1,
          "self": 1
        },
        "hiddenEffects": {
          "evidence": 1
        },
        "visibleChanges": [
          "self",
          "energy"
        ]
      },
      {
        "id": "confirm-help",
        "label": "找人确认",
        "result": "另一个人的回应帮你把感觉扶正了一点。",
        "effects": {
          "relationship": -1,
          "self": 1
        },
        "visibleChanges": [
          "self",
          "relationship"
        ]
      }
    ]
  }
];

export const INSERT_CARDS = [
  {
    "id": "I-C3-footsteps",
    "type": "level",
    "chapterId": "C3",
    "chapterTitle": "第三章：路上",
    "title": "背后的脚步",
    "scene": "那段路比你记得的更安静。身后的脚步声停一下，又重新跟上来。手机屏幕暗了下去。",
    "insert": true,
    "choices": [
      {
        "id": "call",
        "label": "假装打电话",
        "result": "你提高声音说自己快到了，脚步声慢了一点。",
        "effects": {
          "safety": 1,
          "energy": -1
        },
        "tagsAdded": [
          "someone_knows"
        ],
        "visibleChanges": [
          "safety",
          "energy"
        ],
        "track": {
          "seekHelp": 1
        }
      },
      {
        "id": "bright-road",
        "label": "走向亮处",
        "result": "你多绕了一段路，终于看见便利店的灯。",
        "effects": {
          "safety": 1,
          "energy": -1
        },
        "hiddenEffects": {
          "time": -1
        },
        "tagsAdded": [
          "detour"
        ],
        "visibleChanges": [
          "safety",
          "energy"
        ],
        "track": {
          "detour": 1
        }
      }
    ],
    "trigger": {
      "afterCardId": "C3-04",
      "tagsAll": [
        "low_battery",
        "night_quiet_route"
      ],
      "statMax": {
        "safety": 2
      }
    }
  }
];

export const orderedCardIds = [
  "P-I",
  "P-01",
  "P-02",
  "P-03",
  "P-04",
  "P-S",
  "C1-I",
  "C1-01",
  "C1-02",
  "C1-03",
  "C1-04",
  "C1-05",
  "C1-06",
  "C1-07",
  "C1-S",
  "C2-I",
  "C2-01",
  "C2-02",
  "C2-03",
  "C2-04",
  "C2-05",
  "C2-06",
  "C2-07",
  "C2-S",
  "C3-I",
  "C3-01",
  "C3-02",
  "C3-03",
  "C3-04",
  "C3-05",
  "C3-06",
  "C3-07",
  "C3-S",
  "C4-I",
  "C4-01",
  "C4-02",
  "C4-03",
  "C4-04",
  "C4-05",
  "C4-06",
  "C4-07",
  "C4-S",
  "C5-I",
  "C5-01",
  "C5-02",
  "C5-03",
  "C5-04",
  "C5-05",
  "C5-06",
  "C5-07",
  "C5-S",
  "C6-I",
  "C6-01",
  "C6-02",
  "C6-03",
  "C6-04",
  "C6-05",
  "C6-06",
  "C6-07",
  "C6-08",
  "C6-S",
  "E-I",
  "E-01",
  "E-02",
  "E-03",
  "E-04",
  "E-05",
  "E-06",
  "E-07",
  "E-08",
  "E-09",
  "E-10",
  "E-11"
];

const cardsById = new Map(
  [...INTRO_CARDS, ...LEVEL_CARDS, ...SETTLEMENT_CARDS, ...ENDING_CARDS, ...CRISIS_CARDS, ...INSERT_CARDS].map((card) => [
    card.id,
    card
  ])
);

export function getCardById(id) {
  return cardsById.get(id);
}
