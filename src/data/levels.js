export const INTRO_CARDS = [
  {
    "id": "P-I",
    "chapterId": "P",
    "chapterTitle": "序章：出门",
    "kicker": "序章",
    "title": "出门",
    "text": "今天有一场重要见面。你要出门，准时到达。天气、路程、衣服和电量都只是小事。至少现在看起来是这样。",
    "objective": "目标：准时抵达。",
    "buttonLabel": "出门",
    "theme": {
      "primary": "#9B8F80",
      "surface": "#F6F1EA",
      "accent": "#6F6256"
    },
    "type": "chapterIntro"
  },
  {
    "id": "C1-I",
    "chapterId": "C1",
    "chapterTitle": "第一章：筛选",
    "kicker": "第一章",
    "title": "筛选",
    "text": "你需要一个位置。表格、照片、问题和等待区，会比你先开口。这里会看你会做什么，也会看你会不会让流程停下来。",
    "objective": "目标：获得一个位置。",
    "buttonLabel": "进入筛选",
    "theme": {
      "primary": "#7A6D5E",
      "surface": "#F2EDE6",
      "accent": "#4F463D"
    },
    "type": "chapterIntro"
  },
  {
    "id": "C2-I",
    "chapterId": "C2",
    "chapterTitle": "第二章：房间",
    "kicker": "第二章",
    "title": "房间",
    "text": "你需要一扇能关上的门。离公司近一点会贵，便宜一点会远。地图上写着通勤时间，没写楼道灯和夜里回来的路。",
    "objective": "目标：找到能住下来的地方。",
    "buttonLabel": "去看房",
    "theme": {
      "primary": "#68705A",
      "surface": "#EEF1EA",
      "accent": "#3F4638"
    },
    "type": "chapterIntro"
  },
  {
    "id": "C3-I",
    "chapterId": "C3",
    "chapterTitle": "第三章：路上",
    "kicker": "第三章",
    "title": "路上",
    "text": "城市看起来只是路线。车站、电梯、网约车、门禁，都按自己的时间开合。你要赶上它们，也要避开一些没有写在地图上的东西。",
    "objective": "目标：完成这一周的移动。",
    "buttonLabel": "出发",
    "theme": {
      "primary": "#65798A",
      "surface": "#ECF1F4",
      "accent": "#394957"
    },
    "type": "chapterIntro"
  },
  {
    "id": "C4-I",
    "chapterId": "C4",
    "chapterTitle": "第四章：桌面",
    "kicker": "第四章",
    "title": "桌面",
    "text": "你已经坐到桌边。接下来，你要让自己的话留在会议里，让做过的事留在记录里。它们不一定会自然发生。",
    "objective": "目标：完成项目，保住位置。",
    "buttonLabel": "开始工作",
    "theme": {
      "primary": "#9A7A4F",
      "surface": "#F4EFE5",
      "accent": "#5B4528"
    },
    "type": "chapterIntro"
  },
  {
    "id": "C5-I",
    "chapterId": "C5",
    "chapterTitle": "第五章：靠近",
    "kicker": "第五章",
    "title": "靠近",
    "text": "有人靠近，生活会轻一点。也可能多出新的解释、等待和判断。你要判断什么时候往前，什么时候停下。",
    "objective": "目标：靠近别人，同时保留距离。",
    "buttonLabel": "继续靠近",
    "theme": {
      "primary": "#8A5F66",
      "surface": "#F3ECEE",
      "accent": "#56383E"
    },
    "type": "chapterIntro"
  },
  {
    "id": "C6-I",
    "chapterId": "C6",
    "chapterTitle": "第六章：窗口",
    "kicker": "第六章",
    "title": "窗口",
    "text": "你想把一件事说清楚。可在它被处理之前，它要先变成时间、地点、截图、记录，以及别人能读懂的格式。",
    "objective": "目标：让问题被记录。",
    "buttonLabel": "进入流程",
    "theme": {
      "primary": "#5F7180",
      "surface": "#EDF1F3",
      "accent": "#34424C"
    },
    "type": "chapterIntro"
  }
];

export const LEVEL_CARDS = [
  {
    "id": "P-01",
    "chapterId": "P",
    "chapterTitle": "序章：出门",
    "title": "镜子",
    "scene": "今天有一场重要见面。你站在镜子前，灯光把衣服上的褶皱照得很清楚。有人说过你“不够认真”，也有人说过你“太用力”。时间不多了，你要决定怎么出门。",
    "choices": [
      {
        "id": "formal",
        "label": "更正式",
        "result": "你抚平领口，镜子里的人看起来更适合今天的房间。衣服没有替你说话，但会先一步到场。",
        "effects": {
          "reputation": 1,
          "energy": -1
        },
        "hiddenEffects": {
          "exposure": 1
        },
        "tagsAdded": [
          "noticed"
        ]
      },
      {
        "id": "low-key",
        "label": "更低调",
        "result": "你把容易被注意的地方收起来。出门时轻了一点，镜子里的你也少了一点。",
        "effects": {
          "safety": 1,
          "self": -1
        },
        "tagsAdded": [
          "low_presence"
        ]
      },
      {
        "id": "comfortable",
        "label": "穿得舒服",
        "result": "你选了一套行动方便的衣服。身体先松下来。至于别人怎么读它，要到见面时才知道。",
        "effects": {
          "energy": 1,
          "self": 1
        },
        "tagsAdded": [
          "self_first"
        ]
      }
    ],
    "type": "level"
  },
  {
    "id": "P-04",
    "chapterId": "P",
    "chapterTitle": "序章：出门",
    "title": "路口",
    "scene": "最近的路要穿过一段人少的地方。大路亮一些，会多走十分钟。你已经不早了。手机导航把两条路标得很平静，像它们只是距离不同。",
    "choices": [
      {
        "id": "shortcut",
        "label": "走近路",
        "result": "你走进那段更短的路。导航快了几分钟，周围的声音却变得很清楚。你开始更留意身后。",
        "effects": {
          "safety": -2
        },
        "hiddenEffects": {
          "time": 1,
          "exposure": 1
        },
        "tagsAdded": [
          "quiet_route"
        ]
      },
      {
        "id": "main-road",
        "label": "走大路",
        "result": "路灯一直在。你多走了十分钟，脚步也慢了一点。至少这一路不需要反复回头。",
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
        "track": {
          "detour": 1
        }
      },
      {
        "id": "taxi",
        "label": "打车",
        "result": "你坐进车里，车窗把人行道隔在外面。屏幕上跳出价格，像一张小小的收据。余额变薄了。",
        "effects": {
          "money": -2,
          "safety": 1
        },
        "hiddenEffects": {
          "time": 1
        },
        "tagsAdded": [
          "platform_trip"
        ],
        "track": {
          "paidSafety": 1
        },
        "requirements": {
          "minStats": {
            "money": 3
          },
          "reason": "余额不够"
        }
      }
    ],
    "type": "level"
  },
  {
    "id": "C1-01",
    "chapterId": "C1",
    "chapterTitle": "第一章：筛选",
    "title": "照片",
    "scene": "申请表要求上传照片。它在页面最上方，比经历和项目都更早出现。系统提示：资料越完整，处理越快。你停在上传按钮前，想了一会儿。",
    "choices": [
      {
        "id": "polished",
        "label": "选更精神的照片",
        "result": "资料很快提交成功。页面上的你更清楚，也更容易被记住。",
        "effects": {
          "reputation": 1
        },
        "hiddenEffects": {
          "exposure": 1
        },
        "tagsAdded": [
          "image_recorded"
        ]
      },
      {
        "id": "plain",
        "label": "选普通证件照",
        "result": "资料顺利提交。它没有替你多说什么，也没有把你推到更前面。",
        "effects": {
          "safety": 1
        },
        "tagsAdded": [
          "plain_file"
        ]
      },
      {
        "id": "skip",
        "label": "先不上传",
        "result": "系统停在未完成状态。你没有违反规则，只是流程多了一道门槛。",
        "effects": {
          "reputation": -2
        },
        "tagsAdded": [
          "file_blocked"
        ]
      }
    ],
    "type": "level"
  },
  {
    "id": "C1-04",
    "chapterId": "C1",
    "chapterTitle": "第一章：筛选",
    "title": "薪资",
    "scene": "对方给出的数字比招聘页低。解释是“试用期先这样，后面看表现”。你需要这份工作，也知道这个数字会跟着你进入下一个月。会议室里很安静。",
    "choices": [
      {
        "id": "accept",
        "label": "接受",
        "result": "流程顺利往前走。那串数字没有再被讨论，但它会跟着你进入下一个月。后面有些选择会变窄。",
        "effects": {
          "reputation": 1,
          "money": -2,
          "self": -1
        },
        "tagsAdded": [
          "low_salary"
        ],
        "track": {
          "concede": 1
        }
      },
      {
        "id": "negotiate",
        "label": "按招聘页争取",
        "result": "对方说可以再申请一下。房间里没有冲突，只有流程短暂停住。你从“合适的人”，变成了“需要再考虑的人”。之后，解释可能会变多一点。",
        "effects": {
          "reputation": -2,
          "money": 1,
          "self": 1
        },
        "tagsAdded": [
          "pending_offer"
        ]
      },
      {
        "id": "write-contract",
        "label": "要求写进合同",
        "result": "气氛从聊天变成了确认条款。你留下了依据，也让对方知道你不只是点头。它没有到这里结束。",
        "effects": {
          "reputation": -1,
          "self": 1
        },
        "hiddenEffects": {
          "evidence": 2
        },
        "tagsAdded": [
          "contract_awareness"
        ],
        "track": {
          "evidenceSaved": 1
        }
      }
    ],
    "type": "level"
  },
  {
    "id": "C1-07",
    "chapterId": "C1",
    "chapterTitle": "第一章：筛选",
    "title": "玩笑",
    "scene": "有人开了一个关于你的玩笑。它不算严重，甚至可以被解释成热络。几个人已经笑了出来，你也被包含在这阵笑声里。你不舒服，但大家都在等你怎么接。",
    "choices": [
      {
        "id": "laugh",
        "label": "笑一下",
        "result": "笑声顺利过去。你也一起过去了，只是那句话还留在身体里。你又往后退了一点。",
        "effects": {
          "reputation": 1,
          "energy": -1,
          "self": -2
        },
        "tagsAdded": [
          "joke_accepted"
        ],
        "track": {
          "silence": 1,
          "concede": 1
        }
      },
      {
        "id": "deflect",
        "label": "用玩笑转移",
        "result": "话题被带走了。桌上的气氛没有停下来，你也没有真的回答那句话。",
        "effects": {
          "energy": -1
        },
        "tagsAdded": [
          "low_conflict"
        ]
      },
      {
        "id": "call-out",
        "label": "说不舒服",
        "result": "有人说只是玩笑。你说出了不舒服，也看见了这句话能让空气变硬。",
        "effects": {
          "reputation": -2,
          "relationship": -1,
          "self": 1
        },
        "tagsAdded": [
          "too_sensitive_flag"
        ],
        "track": {
          "clearRefusal": 1
        },
        "requirements": {
          "minStats": {
            "self": 3
          },
          "reason": "现在说不出口"
        }
      }
    ],
    "type": "level"
  },
  {
    "id": "C2-01",
    "chapterId": "C2",
    "chapterTitle": "第二章：房间",
    "title": "预算",
    "scene": "你打开租房软件。离公司近、门禁好的房子更贵；便宜的房子远一些，楼道灯坏了，评论也少。地图上写着通勤时间，没写夜里回来时的感觉。",
    "choices": [
      {
        "id": "near-expensive",
        "label": "近且贵",
        "result": "房子离公司很近，门禁也亮。转账成功后，余额变得很薄。安全在账单里留下了一行。",
        "effects": {
          "money": -2,
          "safety": 1,
          "energy": 1
        },
        "tagsAdded": [
          "high_rent"
        ],
        "track": {
          "paidSafety": 1
        },
        "requirements": {
          "minStats": {
            "money": 3
          },
          "reason": "余额不够"
        }
      },
      {
        "id": "far-cheap",
        "label": "远且便宜",
        "result": "你保住了现金。地图上回家的那段路，被拉得更长，也更暗。",
        "effects": {
          "money": 1,
          "safety": -2,
          "energy": -1
        },
        "tagsAdded": [
          "remote_home"
        ]
      },
      {
        "id": "keep-looking",
        "label": "继续找",
        "result": "你刷到更晚。收藏夹变长了，合适的房子没有变多。你更累了。",
        "effects": {
          "energy": -1
        },
        "hiddenEffects": {
          "time": -1
        },
        "tagsAdded": [
          "search_fatigue"
        ]
      }
    ],
    "type": "level"
  },
  {
    "id": "C2-03",
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
          "evidence": -2
        },
        "tagsAdded": [
          "contract_risk"
        ]
      },
      {
        "id": "ask",
        "label": "逐条问",
        "result": "中介解释得很快，语气越来越短。你不一定完全懂，但知道哪里以后可能会出问题。",
        "effects": {
          "reputation": -1,
          "energy": -1,
          "self": 1
        },
        "hiddenEffects": {
          "evidence": 1
        },
        "tagsAdded": [
          "asked_terms"
        ]
      },
      {
        "id": "photo-send",
        "label": "拍下找人看",
        "result": "你把合同拍给别人。房子被保留到晚上，压力没有消失，只是多了一个人帮你看。",
        "effects": {
          "relationship": -1
        },
        "hiddenEffects": {
          "evidence": 2,
          "time": -1
        },
        "tagsAdded": [
          "external_check"
        ],
        "track": {
          "seekHelp": 1,
          "evidenceSaved": 1
        },
        "requirements": {
          "minStats": {
            "relationship": 3
          },
          "reason": "不想再麻烦别人"
        }
      }
    ],
    "type": "level"
  },
  {
    "id": "C2-05",
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
          "safety": -2
        },
        "tagsAdded": [
          "address_seen"
        ]
      },
      {
        "id": "daytime",
        "label": "改约白天",
        "result": "你把维修推到明天。今晚的问题还在，明天的请假理由也提前出现了。",
        "effects": {
          "safety": 1,
          "energy": -1,
          "reputation": -1
        },
        "tagsAdded": [
          "leave_request_risk"
        ]
      },
      {
        "id": "call",
        "label": "开电话陪同",
        "result": "电话那头一直有人。维修过程很快，对方也没有多聊。电话挂断后，你看了一会儿联系人名字。",
        "effects": {
          "relationship": -1,
          "safety": 1
        },
        "hiddenEffects": {
          "evidence": 1
        },
        "tagsAdded": [
          "call_witness"
        ],
        "track": {
          "seekHelp": 1
        },
        "requirements": {
          "minStats": {
            "relationship": 3
          },
          "reason": "不想再麻烦别人"
        }
      }
    ],
    "type": "level"
  },
  {
    "id": "C3-03",
    "chapterId": "C3",
    "chapterTitle": "第三章：路上",
    "title": "低电量",
    "scene": "下班时手机只剩 12%。今晚可能要晚回去。公司附近有便利店，但你已经很累，余额也不算宽。屏幕亮度自动降下来，像在提醒你时间不多。",
    "choices": [
      {
        "id": "power-bank",
        "label": "买充电宝",
        "result": "电量重新变得安全。余额少了一点，但手机不再像一个倒计时。",
        "effects": {
          "money": -1,
          "safety": 2
        },
        "tagsAdded": [
          "charged"
        ],
        "track": {
          "paidSafety": 1
        },
        "requirements": {
          "minStats": {
            "money": 3
          },
          "reason": "余额不够"
        }
      },
      {
        "id": "save-money",
        "label": "省钱不买",
        "result": "你把手机扣上，决定快点回去。屏幕变暗时，路好像也跟着变长了。",
        "effects": {
          "safety": -2
        },
        "tagsAdded": [
          "low_battery"
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
        ]
      }
    ],
    "type": "level"
  },
  {
    "id": "C3-04",
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
          "safety": -2
        },
        "hiddenEffects": {
          "time": 1,
          "exposure": 1
        },
        "tagsAdded": [
          "night_quiet_route"
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
        "track": {
          "detour": 1
        }
      },
      {
        "id": "taxi",
        "label": "打车",
        "result": "你坐进车里，不用经过那段路。价格比白天更像一张提醒。余额变薄了。",
        "effects": {
          "money": -2,
          "safety": 2
        },
        "tagsAdded": [
          "platform_trip"
        ],
        "track": {
          "paidSafety": 1
        },
        "requirements": {
          "minStats": {
            "money": 3
          },
          "reason": "余额不够"
        }
      }
    ],
    "type": "level"
  },
  {
    "id": "C3-05",
    "chapterId": "C3",
    "chapterTitle": "第三章：路上",
    "title": "路线偏移",
    "scene": "司机说：“前面堵，我走另一边。”导航上的路线偏了一点。车窗外的街道变得陌生。你不确定这是不是正常，也不想让车里的空气立刻变硬。",
    "choices": [
      {
        "id": "follow-nav",
        "label": "要求按导航走",
        "result": "司机照做了。路线回来了，车里也安静下来。你更安心，气氛也硬了一点。",
        "effects": {
          "safety": 1,
          "self": 1
        },
        "hiddenEffects": {
          "conflict": 1
        },
        "tagsAdded": [
          "route_confirmed"
        ]
      },
      {
        "id": "silent",
        "label": "不说话",
        "result": "车继续往前开。你盯着地图，手指停在通话界面旁边。你开始更留意周围。",
        "effects": {
          "safety": -2,
          "energy": -1
        },
        "tagsAdded": [
          "silent_monitor"
        ],
        "track": {
          "silence": 1
        }
      },
      {
        "id": "call",
        "label": "打电话说快到了",
        "result": "你对着电话说快到了。车里没有人再问你去哪儿。电话挂断后，你看了一会儿联系人名字。",
        "effects": {
          "safety": 1,
          "relationship": -1
        },
        "tagsAdded": [
          "someone_knows"
        ],
        "track": {
          "seekHelp": 1
        },
        "requirements": {
          "minStats": {
            "relationship": 3
          },
          "reason": "不想再麻烦别人"
        }
      }
    ],
    "type": "level"
  },
  {
    "id": "C3-06",
    "chapterId": "C3",
    "chapterTitle": "第三章：路上",
    "title": "楼道",
    "scene": "你到家楼下，后面有人也刷门禁进来。你不确定对方是不是住户。电梯门开了，里面的灯比大厅更白。两个人的脚步声在门口短暂重合。",
    "choices": [
      {
        "id": "share-elevator",
        "label": "一起进电梯",
        "result": "你们一起进了电梯。数字一层层往上跳，你记住了对方按下的楼层。",
        "effects": {
          "safety": -2
        },
        "hiddenEffects": {
          "time": 1
        },
        "tagsAdded": [
          "shared_elevator"
        ]
      },
      {
        "id": "wait",
        "label": "等下一趟",
        "result": "你让电梯先走。大厅里空了一会儿，你也多站了一会儿。",
        "effects": {
          "safety": 1,
          "energy": -1
        },
        "tagsAdded": [
          "avoid_closed_space"
        ],
        "track": {
          "detour": 1
        }
      },
      {
        "id": "parcel",
        "label": "假装取快递",
        "result": "你转身去快递架前停了一下。对方先上楼，你才重新走回电梯口。你又绕了一小段。",
        "effects": {
          "safety": 1,
          "energy": -1,
          "self": -1
        },
        "tagsAdded": [
          "pretend_route"
        ],
        "track": {
          "detour": 1,
          "concede": 1
        }
      }
    ],
    "type": "level"
  },
  {
    "id": "C4-02",
    "chapterId": "C4",
    "chapterTitle": "第四章：桌面",
    "title": "被打断",
    "scene": "你刚讲到关键部分，有人打断你，替你总结了一个并不准确的版本。大家已经开始点头。你的下一页 PPT 还停在屏幕上，轮到你决定要不要接回去。",
    "choices": [
      {
        "id": "correct-live",
        "label": "立刻纠正",
        "result": "你把话题拉回原处。事实更清楚了，房间也更安静了。",
        "effects": {
          "energy": -1,
          "self": 1
        },
        "hiddenEffects": {
          "conflict": 2
        },
        "tagsAdded": [
          "corrected_live"
        ],
        "track": {
          "clearRefusal": 1
        },
        "requirements": {
          "minStats": {
            "self": 3
          },
          "reason": "现在说不出口"
        }
      },
      {
        "id": "wait-add",
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
        ]
      },
      {
        "id": "written",
        "label": "会后书面说明",
        "result": "你没有在现场争。会后那封说明写了很久，终于留下了痕迹。你更累了。",
        "effects": {
          "energy": -2
        },
        "hiddenEffects": {
          "evidence": 2,
          "credit": 1
        },
        "tagsAdded": [
          "written_trace"
        ],
        "track": {
          "evidenceSaved": 1
        },
        "requirements": {
          "minStats": {
            "energy": 3
          },
          "reason": "没有力气再讲一遍"
        }
      }
    ],
    "type": "level"
  },
  {
    "id": "C4-04",
    "chapterId": "C4",
    "chapterTitle": "第四章：桌面",
    "title": "额外任务",
    "scene": "会议纪要、订餐、安抚新人、整理材料，又自然地落到你这里。没人正式安排，但消息一条条跳出来，像它们本来就知道该艾特谁。",
    "choices": [
      {
        "id": "take",
        "label": "接下",
        "result": "事情顺利运转。会议纪要发出时，没有人问这是谁的工作。",
        "effects": {
          "reputation": 1,
          "energy": -2,
          "self": -1
        },
        "tagsAdded": [
          "invisible_labor"
        ],
        "track": {
          "concede": 1
        }
      },
      {
        "id": "share",
        "label": "分派给大家",
        "result": "你把任务拆给大家。有人接了，有人没回。你还要再跟一次。",
        "effects": {
          "energy": -1,
          "self": 1
        },
        "hiddenEffects": {
          "conflict": 1
        },
        "tagsAdded": [
          "task_shared"
        ]
      },
      {
        "id": "refuse",
        "label": "拒绝",
        "result": "场面停了一下。没人指责你，只是后来有些消息没有再艾特你。",
        "effects": {
          "reputation": -2,
          "energy": 1,
          "self": 1
        },
        "tagsAdded": [
          "not_warm_flag"
        ],
        "requirements": {
          "minStats": {
            "self": 3
          },
          "reason": "现在说不出口"
        }
      }
    ],
    "type": "level"
  },
  {
    "id": "C4-06",
    "chapterId": "C4",
    "chapterTitle": "第四章：桌面",
    "title": "别激动",
    "scene": "一个决定明显不公平。你提出异议后，对方说：“你先别激动，我们就事论事。”会议室里有人低头看电脑，有人等你继续说。问题从决定本身，滑向你的语气。",
    "choices": [
      {
        "id": "lower-tone",
        "label": "压低语气继续说",
        "result": "你把声音放慢。讨论继续了，只是你要先证明自己足够平静。你又往后退了一点。",
        "effects": {
          "reputation": 1,
          "energy": -2,
          "self": -1
        },
        "tagsAdded": [
          "tone_control"
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
        "track": {
          "silence": 1
        }
      },
      {
        "id": "name-problem",
        "label": "指出这句话的问题",
        "result": "对方说你把事情复杂化了。问题从决定本身，转向了你的反应。",
        "effects": {
          "reputation": -2,
          "energy": -1,
          "self": 1
        },
        "hiddenEffects": {
          "conflict": 2
        },
        "tagsAdded": [
          "reaction_flag"
        ],
        "requirements": {
          "minStats": {
            "self": 3
          },
          "reason": "现在说不出口"
        }
      }
    ],
    "type": "level"
  },
  {
    "id": "C4-07",
    "chapterId": "C4",
    "chapterTitle": "第四章：桌面",
    "title": "绩效材料",
    "scene": "绩效面谈前，你要整理自己的贡献。很多事你做了，但没有留下明确记录。会议纪要、聊天记录、版本文件都在，却没有一个完整地指向你。",
    "choices": [
      {
        "id": "complete-file",
        "label": "补完整材料",
        "result": "你熬夜把贡献整理出来。文件夹变完整了。你坐在屏幕前，很久没有动。",
        "effects": {
          "energy": -2
        },
        "hiddenEffects": {
          "evidence": 2,
          "credit": 1
        },
        "tagsAdded": [
          "visible_work"
        ],
        "track": {
          "evidenceSaved": 1
        },
        "requirements": {
          "minStats": {
            "energy": 3
          },
          "reason": "没有力气再讲一遍"
        }
      },
      {
        "id": "ally",
        "label": "找同事作证",
        "result": "有人愿意替你说一句。你记下了这份帮助，也知道它不能每次都有。",
        "effects": {
          "reputation": 1,
          "relationship": -1
        },
        "tagsAdded": [
          "ally_statement"
        ],
        "track": {
          "seekHelp": 1
        },
        "requirements": {
          "minStats": {
            "relationship": 3
          },
          "reason": "不想再麻烦别人"
        }
      },
      {
        "id": "core-only",
        "label": "只写核心成果",
        "result": "材料很简洁。那些被你顺手做完的事，也像从来没有发生过。",
        "hiddenEffects": {
          "credit": -2
        },
        "tagsAdded": [
          "missing_contribution"
        ]
      }
    ],
    "type": "level"
  },
  {
    "id": "C5-02",
    "chapterId": "C5",
    "chapterTitle": "第五章：靠近",
    "title": "第一次见面",
    "scene": "有人约你见面。对方提议去一个安静的地方，说那里人少、好聊天。你更想选人多的地方，但又不想显得太防备。聊天记录停在地点那一行。",
    "choices": [
      {
        "id": "private",
        "label": "去安静的地方",
        "result": "你接受了那个安静的地方。对方显得高兴，你开始留意出口在哪里。",
        "effects": {
          "safety": -2,
          "relationship": 1
        },
        "tagsAdded": [
          "private_place"
        ]
      },
      {
        "id": "public",
        "label": "改公共场所",
        "result": "你把地点改到人多的地方。对方说你很谨慎，像在评价，也像在开玩笑。",
        "effects": {
          "safety": 1,
          "relationship": -1
        },
        "tagsAdded": [
          "public_place"
        ]
      },
      {
        "id": "friend",
        "label": "带朋友短暂出现",
        "result": "朋友短暂出现。气氛有些别扭，但这个晚上多了一个知道你在哪的人。",
        "effects": {
          "safety": 1,
          "relationship": -1
        },
        "tagsAdded": [
          "seen_by_friend"
        ],
        "track": {
          "seekHelp": 1
        },
        "requirements": {
          "minStats": {
            "relationship": 3
          },
          "reason": "不想再麻烦别人"
        }
      }
    ],
    "type": "level"
  },
  {
    "id": "C5-05",
    "chapterId": "C5",
    "chapterTitle": "第五章：靠近",
    "title": "靠近",
    "scene": "对方靠近了一点。你没有立刻后退。对方似乎把这理解成允许。灯光和音乐都很柔和，只有你的身体先紧了一下。你只有几秒钟，决定要不要把距离拉回来。",
    "choices": [
      {
        "id": "clear-no",
        "label": "明确说“不”",
        "result": "距离被说清楚了。对方停下来，气氛也一起停了一下。你更清楚自己不想退到哪里。",
        "effects": {
          "safety": 1,
          "relationship": -2,
          "self": 2
        },
        "tagsAdded": [
          "distance_clear"
        ],
        "track": {
          "clearRefusal": 1
        },
        "requirements": {
          "minStats": {
            "self": 3
          },
          "reason": "现在说不出口"
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
        ]
      },
      {
        "id": "endure",
        "label": "暂时忍一下",
        "result": "事情没有立刻变糟。只是你把不舒服先放到了自己身上。你又往后退了一点。",
        "effects": {
          "safety": -1,
          "relationship": 1,
          "self": -2
        },
        "tagsAdded": [
          "distance_retreat"
        ],
        "track": {
          "concede": 1
        }
      }
    ],
    "type": "level"
  },
  {
    "id": "C5-07",
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
        "track": {
          "explain": 1
        },
        "requirements": {
          "minStats": {
            "energy": 3
          },
          "reason": "没有力气再讲一遍"
        }
      },
      {
        "id": "stop-reply",
        "label": "不再回复",
        "result": "手机安静了一会儿。你没有继续喂给这段关系新的理由。",
        "effects": {
          "safety": -1,
          "energy": 1
        },
        "tagsAdded": [
          "unclosed_relation"
        ],
        "track": {
          "silence": 1
        }
      },
      {
        "id": "block-save",
        "label": "拉黑并保存记录",
        "result": "消息停了，记录留下。你没有解决所有问题，只是让门像是关紧了一点。",
        "effects": {
          "safety": 1,
          "relationship": -1,
          "self": 1
        },
        "hiddenEffects": {
          "evidence": 2
        },
        "tagsAdded": [
          "record_saved"
        ],
        "track": {
          "evidenceSaved": 1
        }
      }
    ],
    "type": "level"
  },
  {
    "id": "C6-02",
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
          "evidence": 3
        },
        "tagsAdded": [
          "evidence_complete"
        ],
        "track": {
          "evidenceSaved": 1
        },
        "requirements": {
          "minStats": {
            "energy": 3
          },
          "reason": "没有力气再讲一遍"
        }
      },
      {
        "id": "key",
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
        ]
      },
      {
        "id": "tell",
        "label": "直接说",
        "result": "你保留了事情最原本的样子。只是流程更习惯材料，而不是一段混乱的经历。",
        "effects": {
          "self": 1
        },
        "hiddenEffects": {
          "evidence": -1
        },
        "tagsAdded": [
          "statement_risk"
        ]
      }
    ],
    "type": "level"
  },
  {
    "id": "C6-04",
    "chapterId": "C6",
    "chapterTitle": "第六章：窗口",
    "title": "有没有误会",
    "scene": "对方问：“会不会是误会？有没有可能不是这个意思？”你听过类似的话很多次。每一次都像是在把事情往更轻的地方推。你要决定继续补充，还是把话拉回原处。",
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
        "track": {
          "explain": 1
        },
        "requirements": {
          "minStats": {
            "energy": 3
          },
          "reason": "没有力气再讲一遍"
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
        "track": {
          "clearRefusal": 1
        },
        "requirements": {
          "minStats": {
            "self": 3
          },
          "reason": "现在说不出口"
        }
      }
    ],
    "type": "level"
  },
  {
    "id": "C6-08",
    "chapterId": "C6",
    "chapterTitle": "第六章：窗口",
    "title": "处理结果",
    "scene": "系统给出结果：证据不足，但会提醒相关人员注意。你不能说它完全没用，也不能说它解决了什么。页面上显示“已处理”。这个词很短，短到装不下你花掉的时间。",
    "choices": [
      {
        "id": "accept",
        "label": "接受结果",
        "result": "流程到这里结束。页面显示已处理。你知道它只是停止了，不是解决了。",
        "effects": {
          "energy": 1,
          "self": -2
        },
        "tagsAdded": [
          "unclosed_issue"
        ]
      },
      {
        "id": "appeal",
        "label": "继续申诉",
        "result": "你继续往下走。每多走一步，都要再花掉一点生活。",
        "effects": {
          "money": -1,
          "energy": -2,
          "self": 1
        },
        "tagsAdded": [
          "appeal_continue"
        ],
        "track": {
          "explain": 1
        },
        "requirements": {
          "minStats": {
            "energy": 3
          },
          "reason": "没有力气再讲一遍"
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
        "track": {
          "paidSafety": 1
        },
        "requirements": {
          "minStats": {
            "money": 3
          },
          "reason": "余额不够"
        }
      }
    ],
    "type": "level"
  }
];

export const SETTLEMENT_CARDS = [];

export const ENDING_CARDS = [
  {
    "id": "E-01",
    "title": "记录完成",
    "text": "你走到了这一段生活的末尾。系统没有判断你勇敢、软弱、敏感或多疑。它只整理你怎样来到这里。",
    "contentTemplate": "筛选：{C1}\n房间：{C2}\n路上：{C3}\n桌面：{C4}\n靠近：{C5}\n窗口：{C6}",
    "buttonLabel": "查看状态",
    "type": "ending",
    "chapterId": "E",
    "chapterTitle": "终章：普通难度"
  },
  {
    "id": "E-02",
    "title": "状态总览",
    "text": "系统第一次把所有状态摆在一起。你看到的不是能力表，而是这一路上你反复处理过的东西。",
    "contentTemplate": "状态\n{statusBlock}\n\n本次记录\n{topCounters}\n\n被拿走的选择\n{blockedChoiceBlock}",
    "buttonLabel": "继续",
    "type": "ending",
    "chapterId": "E",
    "chapterTitle": "终章：普通难度"
  },
  {
    "id": "E-03",
    "title": "角色档案生成中",
    "text": "系统开始补全你的身份。没有任何一项看起来像特殊命运。",
    "content": "年龄：27。\n职业：普通职员。\n城市：普通城市。\n收入：普通。\n家庭：普通。\n关系状态：普通。",
    "buttonLabel": "继续生成",
    "reveal": "性别：女。\n难度：普通。\n\n你刚才经历的，不是战场，不是末日，不是传奇，也不是一段特别糟糕的人生。\n\n它只是一次普通难度。",
    "type": "ending",
    "chapterId": "E",
    "chapterTitle": "终章：普通难度"
  },
  {
    "id": "E-04",
    "title": "普通难度 · 通关记录",
    "text": "本次处境\n{endingTitle}\n\n{endingSummary}",
    "contentTemplate": "本次代价\n{costLines}\n\n处境说明\n{endingConcept}\n\n女性不是一种性格，也不只是一组特征。\n\n在很多时候，女性意味着一种被反复放置的位置。\n\n当一个人长期处在需要被评价、被相信、被允许、被保护、被解释的位置，她就会学会谨慎、计算、讨好、沉默、留证和提前道歉。\n\n这不是因为她天生如此。是因为世界经常这样要求她。\n\n你已经学会了普通生活。",
    "buttonLabel": "重新开始",
    "type": "ending",
    "chapterId": "E",
    "chapterTitle": "终章：普通难度"
  }
];

export const CRISIS_CARDS = [
  {
    "id": "CR-reputation",
    "stat": "reputation",
    "title": "信誉危险",
    "scene": "你发现自己说的很多话，都要比别人多绕一圈。不是每句话都被反驳，但每句话都像要先通过一层筛选。",
    "choices": [
      {
        "id": "lower",
        "label": "接受更低要求",
        "result": "事情继续推进，但你把标准往后退了一点。",
        "effects": {
          "reputation": 1,
          "self": -1
        }
      },
      {
        "id": "confirm",
        "label": "找人帮你确认",
        "result": "有人替你说了一句。话变得更容易被听完。",
        "effects": {
          "reputation": 1,
          "relationship": -1
        },
        "track": {
          "seekHelp": 1
        }
      },
      {
        "id": "pause",
        "label": "暂时不争",
        "result": "流程顺了，问题也少了一部分入口。",
        "effects": {
          "energy": 1
        },
        "hiddenEffects": {
          "credit": -1
        }
      }
    ],
    "type": "level",
    "chapterId": "CR",
    "chapterTitle": "记录中断",
    "crisis": true
  },
  {
    "id": "CR-money",
    "stat": "money",
    "title": "钱危险",
    "scene": "余额让很多选择提前消失。你还没做决定，有些路已经关上了。",
    "choices": [
      {
        "id": "lower-quality",
        "label": "接受低质量方案",
        "result": "钱暂时够了，代价会在之后出现。",
        "effects": {
          "money": 1,
          "safety": -1
        }
      },
      {
        "id": "borrow",
        "label": "向人求助",
        "result": "余额被拉回来一点，人情也被记下。",
        "effects": {
          "money": 2,
          "relationship": -1
        },
        "track": {
          "seekHelp": 1
        }
      },
      {
        "id": "give-up",
        "label": "放弃处理",
        "result": "你少花了一笔钱，也少了一次改变局面的机会。",
        "effects": {
          "energy": 1,
          "self": -1
        }
      }
    ],
    "type": "level",
    "chapterId": "CR",
    "chapterTitle": "记录中断",
    "crisis": true
  },
  {
    "id": "CR-safety",
    "stat": "safety",
    "title": "安全感危险",
    "scene": "你开始在进入每个空间前确认出口。什么都没发生，但你已经很累。",
    "choices": [
      {
        "id": "detour",
        "label": "绕远一点",
        "result": "灯光和人群多了，路也长了。",
        "effects": {
          "safety": 1,
          "energy": -1
        },
        "track": {
          "detour": 1
        }
      },
      {
        "id": "call",
        "label": "联系别人",
        "result": "你让另一个人知道自己在哪里。",
        "effects": {
          "safety": 1,
          "relationship": -1
        },
        "track": {
          "seekHelp": 1
        }
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
        }
      }
    ],
    "type": "level",
    "chapterId": "CR",
    "chapterTitle": "记录中断",
    "crisis": true
  },
  {
    "id": "CR-energy",
    "stat": "energy",
    "title": "精力危险",
    "scene": "你不是不想讲清楚，只是句子开始断掉。很多事还没结束，你已经先空了。",
    "choices": [
      {
        "id": "rest",
        "label": "休息一下",
        "result": "你恢复了一些力气，也错过了一点机会。",
        "effects": {
          "energy": 2,
          "reputation": -1
        }
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
        }
      },
      {
        "id": "ask-help",
        "label": "找人帮忙",
        "result": "你不用一个人处理所有信息。",
        "effects": {
          "energy": 1,
          "relationship": -1
        },
        "track": {
          "seekHelp": 1
        }
      }
    ],
    "type": "level",
    "chapterId": "CR",
    "chapterTitle": "记录中断",
    "crisis": true
  },
  {
    "id": "CR-relationship",
    "stat": "relationship",
    "title": "关系危险",
    "scene": "你打开通讯录，发现每个名字后面都有上一次麻烦他们的记忆。",
    "choices": [
      {
        "id": "alone",
        "label": "独自处理",
        "result": "你省下了人情，也把压力留给了自己。",
        "effects": {
          "self": 1,
          "energy": -1
        }
      },
      {
        "id": "repair",
        "label": "主动恢复关系",
        "result": "你发出消息，重新接上一点联系。",
        "effects": {
          "relationship": 1,
          "energy": -1
        }
      },
      {
        "id": "no-help",
        "label": "放弃求助",
        "result": "你不再打扰别人，事情也更安静地压回你身上。",
        "effects": {
          "safety": -1,
          "energy": 1
        }
      }
    ],
    "type": "level",
    "chapterId": "CR",
    "chapterTitle": "记录中断",
    "crisis": true
  },
  {
    "id": "CR-self",
    "stat": "self",
    "title": "自我危险",
    "scene": "你知道自己不愿意，但拒绝这件事本身也需要力气。",
    "choices": [
      {
        "id": "comply",
        "label": "暂时顺从",
        "result": "场面顺利过去，你又退了一点。",
        "effects": {
          "energy": 1,
          "self": -1
        }
      },
      {
        "id": "write",
        "label": "写下来",
        "result": "你先不当场说，把自己的判断留住。",
        "effects": {
          "self": 1,
          "energy": -1
        },
        "hiddenEffects": {
          "evidence": 1
        },
        "track": {
          "evidenceSaved": 1
        }
      },
      {
        "id": "confirm",
        "label": "找人确认",
        "result": "另一个人的回应帮你把感觉扶正了一点。",
        "effects": {
          "self": 1,
          "relationship": -1
        },
        "track": {
          "seekHelp": 1
        }
      }
    ],
    "type": "level",
    "chapterId": "CR",
    "chapterTitle": "记录中断",
    "crisis": true
  }
];

export const INSERT_CARDS = [];

export const orderedCardIds = [
  "P-I",
  "P-01",
  "P-04",
  "C1-I",
  "C1-01",
  "C1-04",
  "C1-07",
  "C2-I",
  "C2-01",
  "C2-03",
  "C2-05",
  "C3-I",
  "C3-03",
  "C3-04",
  "C3-05",
  "C3-06",
  "C4-I",
  "C4-02",
  "C4-04",
  "C4-06",
  "C4-07",
  "C5-I",
  "C5-02",
  "C5-05",
  "C5-07",
  "C6-I",
  "C6-02",
  "C6-04",
  "C6-08",
  "E-01",
  "E-02",
  "E-03",
  "E-04"
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
