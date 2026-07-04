# 内容表格使用说明

这些 CSV 是游戏文案和数值配置的可编辑版本。

## 常用命令

```bash
npm run export:content
npm run import:content
npm test
```

## 文件

- `cards.csv`：章节页、关卡页、结算页、终章页的标题和正文。
- `choices.csv`：按钮文案、结果文案、长期数值、隐性数值、标签、终章统计、选项限制。
- `triggers.csv`：条件插卡触发规则。
- `stat-config.csv`：初始数值、显化章节、状态词阈值。

## 建议改的列

- `title`
- `text`
- `scene`
- `content`
- `objective`
- `buttonLabel`
- `reveal`
- `label`
- `result`
- `stat_*`
- `hidden_*`
- `tagsAdded`
- `track_*`
- `require_*`
- `requirementReason`

## 谨慎改的列

- `id`
- `cardId`
- `choiceOrder`
- `group`
- `playOrder`
- `type`

这些列决定关卡顺序和数据关联。需要新增、删除、重排关卡时，最好先让 Codex 处理。
