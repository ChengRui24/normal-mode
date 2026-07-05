export const INTRO_CARDS = [
  {
    "id": "P-I",
    "chapterId": "P",
    "chapterTitle": "序章：出门",
    "kicker": "序章",
    "title": "出门",
    "text": "今天有一场重要见面，地点在城另一边。你要出门，准时到达。衣服、登记、消息和时间都只是小事。至少现在看起来是这样。",
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
    "text": "你开始找工作。表格、照片、问题和等待区，会比你先开口。这里会看你会做什么，也会看你会不会让流程停下来。",
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
    "text": "你开始找房子。你需要一扇能关上的门。离公司近一点会贵，便宜一点会远。地图上写着通勤时间，没写楼道灯和夜里回来的路。",
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
    "text": "你要从公司回到新租的房子。车站、电梯、网约车、门禁，都按自己的时间开合。你要赶上它们，也要避开一些没有写在地图上的东西。",
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
    "text": "你已经坐到办公室的桌边。接下来，你要让自己的话留在会议里，让做过的事留在记录里。它们不一定会自然发生。",
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
    "text": "一个刚认识不久的人开始进入你的生活。见面地点、回家路线和消息框，都在一点点靠近你。你要判断什么时候往前，什么时候停下。",
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
    "text": "拒绝之后，事情没有完全停下。你打开反馈入口，想把那次见面和之后的消息说清楚。可在它被处理之前，它要先变成时间、地点、截图、记录，以及别人能读懂的格式。",
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
    "scene": "今天有一场重要见面，地点在城另一边。你站在镜子前。深色外套看起来正式，但上次有人说这样显得太强硬；浅色衬衫轻松一点，又可能被说不够重视。时间不多了，你要决定怎么出门。",
    "choices": [
      {
        "id": "formal",
        "label": "穿深色外套",
        "result": "你穿上深色外套。它看起来更正式，也更醒目。出门前，你把袖口重新抚平了一遍。",
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
        "label": "穿浅色衬衫",
        "result": "你换成浅色衬衫。它没那么显眼，也少了一点正式感。你拿起包，想着等会儿可能还要多解释两句。",
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
        "label": "穿行动方便的衣服",
        "result": "你选了行动方便的衣服。坐车和走路都轻松一点。至于对方怎么理解，只能到场再说。",
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
    "title": "到达",
    "scene": "写字楼前台临时要求访客登记。电梯还在排队，预约时间快到了。你打开消息框，想告诉对方自己已经到楼下，又觉得这句话像是在为迟到提前解释。",
    "choices": [
      {
        "id": "shortcut",
        "label": "先发消息说明已经到楼下",
        "result": "你发了一句：我已经到楼下，在登记。消息发出去后，前台还在核对身份证。迟到还没发生，解释已经先发出去了。",
        "effects": {
          "reputation": 1,
          "energy": -1,
          "self": -1
        },
        "tagsAdded": [
          "early_explain"
        ],
        "track": {
          "explain": 1
        }
      },
      {
        "id": "main-road",
        "label": "先完成登记，等进电梯再说",
        "result": "你先填完访客信息。电梯门合上时，预约时间刚跳过一分钟。你没有发消息，只把手机握在手里。",
        "effects": {
          "energy": -1
        },
        "hiddenEffects": {
          "time": -1
        },
        "tagsAdded": [
          "registration_delay"
        ]
      },
      {
        "id": "taxi",
        "label": "不发消息，直接上楼",
        "result": "你把手机息屏，先上楼。对方没有催你，但电梯上升的几十秒里，你一直看着时间。",
        "effects": {
          "reputation": -1,
          "energy": 1
        },
        "tagsAdded": [
          "no_message"
        ],
        "track": {
          "silence": 1
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
    "scene": "求职申请表要求上传照片。它在页面最上方，比经历和项目都更早出现。系统提示：资料越完整，处理越快。你停在上传按钮前，想了一会儿。",
    "choices": [
      {
        "id": "polished",
        "label": "选更精神的照片",
        "result": "你选了光线更好、妆发更整齐的照片。资料提交成功。列表里的头像更醒目，照片也先于经历被看见。",
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
        "result": "你上传了普通证件照。资料顺利提交。页面没有再提醒你补充信息。",
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
        "result": "你跳过照片。系统把资料标成未完成。你还能继续投递，但页面多了一条提醒。",
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
    "scene": "面试快结束时，对方给出的数字比招聘页低。解释是“试用期先这样，后面看表现”。你需要这份工作，也知道这个数字会跟着你进入下一个月。会议室里很安静。",
    "choices": [
      {
        "id": "accept",
        "label": "接受",
        "result": "流程顺利往前走。那串数字没有再被讨论。你算了一下，下个月能用的钱少了一截。",
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
        "result": "对方说可以再申请一下。面试房间安静了几秒。你争取了一次，也把自己放进了重新评估里。",
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
        "result": "对方打开合同条款重新确认。你留下了文字依据。流程慢了一点，对方也不再只把它当聊天。",
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
    "scene": "入职第一周的聚餐快结束时，有人开了一个关于你的玩笑。它不算严重，甚至可以被解释成热络。几个人已经笑了出来，你也被包含在这阵笑声里。你不舒服，但大家都在等你怎么接。",
    "choices": [
      {
        "id": "laugh",
        "label": "笑一下",
        "result": "你跟着笑了一下。聚餐继续往下聊。那句话没有被处理，晚上回去时你还会想起来。",
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
        "result": "你接了一个别的玩笑，把话题带开。桌上的气氛没有停，你也没有说自己不舒服。",
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
        "result": "你说这句让你不舒服。有人说只是开玩笑。桌上安静了几秒，后来话题才继续。",
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
    "scene": "你开始找能长期住下来的房子。租房软件上，离公司近、门禁好的房子更贵；便宜的房子远一些，楼道灯坏了，评论也少。地图上写着通勤时间，没写夜里回来时的感觉。",
    "choices": [
      {
        "id": "near-expensive",
        "label": "近且贵",
        "result": "你选了离公司近、门禁更好的房子。转账成功后，余额少了一大截。今晚回去的路会短一些。",
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
        "result": "你选了更便宜的房子。现金留下来了，通勤和夜里回家的路都变长了。",
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
        "result": "你继续刷房源到很晚。收藏夹变长了，合适的房子没有多出来。第二天还要继续看。",
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
    "scene": "看房后，中介把合同推到你面前。里面有几条你看不懂，对方说“都是模板，大家都这么签”。你已经跑了一下午，房源页面还不断弹出“已有多人咨询”。桌上的笔被推到你面前。",
    "choices": [
      {
        "id": "sign",
        "label": "直接签",
        "result": "你直接签了合同。房子定下来了。那几条没看懂的条款，也会跟着合同一起生效。",
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
        "result": "你逐条问。中介解释得很快，语气也短了。你听懂了一部分，至少知道哪几条以后可能出问题。",
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
        "result": "你拍下合同发给朋友。房子保留到晚上。你多等了几个小时，也多了一个人帮你看。",
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
    "title": "换锁",
    "scene": "搬进来的第三天，你发现门锁很旧。中介说房东、保洁和上一任租客都“可能还有钥匙”，但一般不会出事。换锁要自己付钱，还要先问房东。不换也能住，只是每次关门时，你都会多看一眼。",
    "choices": [
      {
        "id": "change-lock",
        "label": "自己付钱换锁",
        "result": "师傅下午来换了锁，花了 280 元。房东说退租时要交回新钥匙。余额少了一点，但今晚你不用再反复确认门锁。",
        "effects": {
          "money": -2,
          "safety": 2,
          "self": 1
        },
        "hiddenEffects": {
          "lockChanged": 1
        },
        "tagsAdded": [
          "lock_changed"
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
        "id": "ask-landlord",
        "label": "先问房东能不能换",
        "result": "你把照片发给房东。对方几小时后才回：可以换，费用自理，退租时恢复原样。锁还没换，你先解释了一轮。",
        "effects": {
          "energy": -1,
          "safety": 1
        },
        "hiddenEffects": {
          "conflict": 1,
          "askedPermission": 1
        },
        "tagsAdded": [
          "asked_permission"
        ],
        "track": {
          "explain": 1
        }
      },
      {
        "id": "keep-old-lock",
        "label": "先不换",
        "result": "你决定先不换。钱省下来了，也不用和房东来回确认。晚上关门时，你还是多拧了一次反锁。",
        "effects": {
          "safety": -2,
          "self": -1
        },
        "hiddenEffects": {
          "keyUncertain": 1
        },
        "tagsAdded": [
          "key_uncertain"
        ],
        "track": {
          "concede": 1
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
    "scene": "下班时手机只剩 12%。今晚你要从公司回到新租的房子，可能还要转一次车。公司附近有便利店，但你已经很累，余额也不算宽。屏幕亮度自动降下来，像在提醒你时间不多。",
    "choices": [
      {
        "id": "power-bank",
        "label": "买充电宝",
        "result": "你买了充电宝。余额少了一点，手机电量回到能撑到家的程度。",
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
        "result": "你没买。手机剩下的电量要撑到家。你把亮度调低，开始减少看屏幕的次数。",
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
        "result": "同事让你充了一会儿。你晚走了半小时，又陪着聊了几句。",
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
    "scene": "晚上十点，你从地铁口出来，离住处还有一段路。近路人少，大路绕远，打车价格翻倍。地图把它们标成三个普通选项，没有标出路灯、店铺和途中会不会遇到谁。",
    "choices": [
      {
        "id": "shortcut",
        "label": "走近路",
        "result": "你走了近路。导航少了几分钟，路上的人也少了很多。",
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
        "result": "你走大路。路灯和店铺多一些，到家时间也往后推了十几分钟。",
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
        "result": "你打了车，不用走那段路。付款时，余额又少了一截。",
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
    "scene": "你坐上回家的网约车。开到一半，司机说：“前面堵，我走另一边。”导航上的路线偏了一点，车窗外的街道变得陌生。你不确定这是不是正常，也不想让车里的空气立刻变硬。",
    "choices": [
      {
        "id": "follow-nav",
        "label": "要求按导航走",
        "result": "你说想按导航走。司机照做了。路线回到原来的线上，车里也安静了下来。",
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
        "result": "你没开口。车继续往前开。你盯着地图，把通话界面提前打开。",
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
        "result": "你打电话说自己快到了。对方听见你报了路口和车牌。电话挂断后，车里安静了一点。",
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
    "scene": "你回到租住的小区楼下，后面有人也刷门禁进来。你不确定对方是不是住户。电梯门开了，里面的灯比大厅更白。两个人的脚步声在门口短暂重合。",
    "choices": [
      {
        "id": "share-elevator",
        "label": "一起进电梯",
        "result": "你一起进了电梯。你看见对方按下的楼层，也把自己的楼层按了下去。",
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
        "result": "你让电梯先走。大厅里只剩你一个人等下一趟。",
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
        "result": "你转身去快递架前停了一会儿。等对方上楼后，你才回到电梯口。",
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
    "scene": "项目例会上，你刚讲到自己负责的方案。有人打断你，替你总结了一个并不准确的版本。大家已经开始点头。你的下一页 PPT 还停在屏幕上，轮到你决定要不要接回去。",
    "choices": [
      {
        "id": "correct-live",
        "label": "立刻纠正",
        "result": "你当场纠正了那个总结。方案说清楚了，几个人也抬头看向你。",
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
        "result": "你等他说完再补充。错误被补上了，但前半段已经被别人带过去了。",
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
        "result": "你没有现场争。会后写了一封说明，把你的方案和修改点重新发给大家。",
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
    "scene": "项目推进会结束后，会议纪要、订餐、安抚新人、整理材料，又自然地落到你这里。没人正式安排，但消息一条条跳出来，像它们本来就知道该艾特谁。",
    "choices": [
      {
        "id": "take",
        "label": "接下",
        "result": "你接下了。会议纪要按时发出，订餐和材料也都处理完了。没有人问这些是谁做的。",
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
        "result": "你把任务拆给大家。有人接了，有人没回。最后你还要再催一遍。",
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
        "result": "你说这次不能都由你来做。群里停了一会儿。后来有些杂事没有再艾特你。",
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
    "scene": "部门讨论资源分配时，一个决定明显不公平。你提出异议后，对方说：“你先别激动，我们就事论事。”会议室里有人低头看电脑，有人等你继续说。问题从决定本身，滑向你的语气。",
    "choices": [
      {
        "id": "lower-tone",
        "label": "压低语气继续说",
        "result": "你放慢声音继续说。讨论继续了，但你先处理的是自己的语气，不是那个不公平的决定。",
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
        "result": "你停了下来。会议继续推进，记录里没有留下你的异议。",
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
        "result": "你指出这句话把问题转到了你的语气上。对方说你把事情复杂化了。会议里的目光又回到你身上。",
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
    "scene": "月底绩效面谈前，你要整理自己的贡献。很多事你做了，但没有留下明确记录。会议纪要、聊天记录、版本文件都在，却没有一个完整地指向你。",
    "choices": [
      {
        "id": "complete-file",
        "label": "补完整材料",
        "result": "你熬夜把贡献整理成文件。材料更完整了。第二天打开电脑时，你还在想那几页表格。",
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
        "result": "你找同事帮忙确认。对方愿意替你说一句。你记下这份帮助，也知道下次未必还能这样。",
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
        "result": "你只写了最核心的成果。材料变短了，那些临时补上的事也没有写进去。",
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
    "scene": "一个刚认识不久的人约你周五晚上见面。对方提议去一家清吧，说那里人少、好聊天。你更想选商场里的咖啡店，离地铁近，也容易离开。聊天记录停在地点那一行。",
    "choices": [
      {
        "id": "private",
        "label": "去安静的地方",
        "result": "你答应去清吧。对方很高兴。进门后，你先看了一眼出口和地铁方向。",
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
        "result": "你把地点改到商场咖啡店。对方说你很谨慎。你没有接这句话，只把时间确认了一遍。",
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
        "result": "你让朋友短暂出现。气氛有些别扭，但这个晚上多了一个知道你在哪里的人。",
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
    "title": "送你回去",
    "scene": "见面结束时，对方说顺路，可以送你回去。你还没说住哪，只说了大概方向。对方已经打开打车软件，问你“小区叫什么”。夜里风有点冷，地铁口就在另一边。",
    "choices": [
      {
        "id": "clear-no",
        "label": "坚持自己坐地铁回去",
        "result": "对方停了一下，说那你到家说一声。你走向地铁口。回家的路线还是你自己决定。",
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
        "label": "只说到附近路口",
        "result": "你报了离住处还有一段距离的路口。车很快叫好。你少走了一段夜路，也保留了小区地址。",
        "effects": {
          "energy": -1
        },
        "tagsAdded": [
          "distance_blurry"
        ]
      },
      {
        "id": "endure",
        "label": "告诉对方小区名，让他送到门口",
        "result": "你告诉了对方小区名。车停在小区门口。下车时，对方看了一眼门牌，说：原来你住这边。",
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
    "scene": "你决定不再继续见这个人。消息从晚上一直亮到第二天：一会儿道歉，一会儿问你是不是误会了，一会儿又说“我只是想送你回家”。你明天还要上班，每一条新消息都像在要求你重新回到那次见面。",
    "choices": [
      {
        "id": "explain",
        "label": "明确说不再继续见面",
        "result": "你发了一句：我不想继续见面了。对方沉默了一会儿，又发来很长一段。边界说清楚了，消息没有马上停。",
        "effects": {
          "self": 2,
          "relationship": -1
        },
        "tagsAdded": [
          "boundary_clear"
        ],
        "track": {
          "clearRefusal": 1
        }
      },
      {
        "id": "stop-reply",
        "label": "解释得更完整一点",
        "result": "你把理由写得很细。对方安静了一会儿，又开始逐条回应你的理由。",
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
        "id": "block-save",
        "label": "不再回复，先静音",
        "result": "你把对话静音。手机安静了。消息还在，只是暂时不会跳到屏幕上。",
        "effects": {
          "energy": 1,
          "safety": -1
        },
        "tagsAdded": [
          "muted_unclosed"
        ],
        "track": {
          "silence": 1
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
    "scene": "你打开反馈入口，想说明自己已经拒绝继续见面，但对方还在反复发消息。聊天记录、见面时间、地点截图，你都有一点，却没有一样能完整说明那种不安。你需要把它们整理成别人能看懂的样子。",
    "choices": [
      {
        "id": "all",
        "label": "按时间线整理",
        "result": "你按时间把消息、地点和截图排好。材料变清楚了。你也又看了一遍那些消息。",
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
        "label": "只提交最明显的几条",
        "result": "你只提交最明显的几条。材料短了，也更容易读完。有些不安没有写进去，因为它们很难证明。",
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
        "label": "先不提交，等更完整",
        "result": "你先不提交，想等证据更完整。页面停在那里，新的消息还是继续进来。",
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
    "scene": "工作人员回复：“会不会是误会？对方有没有明确威胁？”你看着那几个字，知道事情正在被推向更轻的地方。你要决定继续补充，还是把话拉回原处。",
    "choices": [
      {
        "id": "details",
        "label": "继续补充细节",
        "result": "你又补了几张截图，解释每一次拒绝后对方还在继续联系。材料更完整了，你也又把那些消息看了一遍。",
        "effects": {
          "reputation": 1,
          "energy": -2
        },
        "hiddenEffects": {
          "evidence": 1
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
        "label": "把话拉回“我已经拒绝过”",
        "result": "你删掉多余解释，只留下：我已经明确拒绝继续见面，但对方仍在持续联系。页面安静了一会儿。",
        "effects": {
          "self": 1
        },
        "hiddenEffects": {
          "evidence": 1
        },
        "tagsAdded": [
          "refusal_recorded"
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
        "id": "facts",
        "label": "接受先记作误会",
        "result": "你接受先记作误会。页面很快进入下一步。工作人员不再追问，对方的行为也没有被写得很重。",
        "effects": {
          "energy": 1,
          "self": -2
        },
        "tagsAdded": [
          "accepted_misunderstanding"
        ],
        "track": {
          "concede": 1
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
    "scene": "几天后，系统给出结果：未发现明确违规，但会提醒对方注意沟通边界。你不能说它完全没用，也不能说它解决了什么。页面上显示“已处理”。这个词很短，短到装不下你花掉的时间。",
    "choices": [
      {
        "id": "accept",
        "label": "接受结果，保存记录",
        "result": "你把页面截图保存下来。结果没有解决问题，但至少留下了你反馈过的记录。",
        "effects": {
          "energy": 1,
          "self": -1
        },
        "hiddenEffects": {
          "evidence": 1
        },
        "tagsAdded": [
          "unclosed_issue"
        ],
        "track": {
          "evidenceSaved": 1
        }
      },
      {
        "id": "appeal",
        "label": "继续申诉",
        "result": "你点开申诉入口，又开始整理时间、截图和说明。系统允许你继续，也要求你再说一遍。",
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
        "label": "关闭页面，先让自己休息",
        "result": "你关掉页面，把手机放到一边。问题没有解决，但你今晚先不再继续处理。",
        "effects": {
          "energy": 2,
          "self": -1
        },
        "tagsAdded": [
          "paused_unresolved"
        ],
        "track": {
          "silence": 1
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
    "contentTemplate": "本次代价\n{costLines}\n\n处境说明\n{endingConcept}\n\n女性不是一种性格，也不只是一组特征。\n\n在很多时候，女性意味着一种被反复放置的位置。\n\n这种位置不只属于女性。\n但在现实中，很多普通女性更频繁、更密集地被放在这里。\n\n当一个人长期处在需要被评价、被相信、被允许、被保护、被解释的位置，她就会学会谨慎、计算、讨好、沉默、留证和提前道歉。\n\n这不是因为她天生如此。是因为世界经常这样要求她。\n\n你已经学会了普通生活。",
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
        "result": "你把要求降了一点。流程继续往前走，你原本想要的标准也少了一点。",
        "effects": {
          "reputation": 1,
          "self": -1
        }
      },
      {
        "id": "confirm",
        "label": "找人帮你确认",
        "result": "你找人帮你确认。对方替你说了一句，这句话比你自己说更容易被听完。",
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
        "result": "你暂时不争。流程顺了，后面也少了一个继续处理的机会。",
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
        "result": "你选了更便宜的方案。钱暂时够了，后面可能要补别的成本。",
        "effects": {
          "money": 1,
          "safety": -1
        }
      },
      {
        "id": "borrow",
        "label": "向人求助",
        "result": "你开口借了一点钱。余额被拉回来，人情也要记住。",
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
        "result": "你放弃处理。钱省下来了，事情也按现在的样子留下来。",
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
        "result": "你绕远一点。灯光和人多了，到家的时间也晚了。",
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
        "result": "你联系了别人。至少有一个人知道你现在在哪里。",
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
        "result": "你没有改路线，只加快了脚步。路还是那条路。",
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
        "result": "你停下来休息了一会儿。力气回来一点，处理事情的时间也往后推了。",
        "effects": {
          "energy": 2,
          "reputation": -1
        }
      },
      {
        "id": "simplify",
        "label": "简化处理",
        "result": "你把事情简化处理。流程还能继续，有些细节没有再写进去。",
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
        "result": "你找人帮忙。信息不用全由你一个人处理，也要先向对方说明情况。",
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
        "result": "你决定自己处理。人情省下来了，压力也留在你这里。",
        "effects": {
          "self": 1,
          "energy": -1
        }
      },
      {
        "id": "repair",
        "label": "主动恢复关系",
        "result": "你主动发了消息。联系接上了一点，也需要重新解释近况。",
        "effects": {
          "relationship": 1,
          "energy": -1
        }
      },
      {
        "id": "no-help",
        "label": "放弃求助",
        "result": "你不再找人帮忙。手机安静了一点，事情也只剩你自己处理。",
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
        "result": "你先顺着对方的要求做。场面过去了，你想说的话没有说出来。",
        "effects": {
          "energy": 1,
          "self": -1
        }
      },
      {
        "id": "write",
        "label": "写下来",
        "result": "你先把判断写下来。它没有当场改变局面，但没有被你直接咽下去。",
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
        "result": "你找人确认。对方说他也觉得不对，你才更确定自己不是想太多。",
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
