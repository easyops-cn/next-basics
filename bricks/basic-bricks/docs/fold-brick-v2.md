---
tagName: basic-bricks.fold-brick-v2
displayName: WrappedBasicBricksFoldBrickV2
description: 折叠面板容器，支持自定义折叠展示名称、默认展开状态、面板类型（normal/primary），可选显示分割线，点击标题区域切换折叠/展开状态
category:
source: "@next-bricks/basic-bricks"
---

# basic-bricks.fold-brick-v2

> 折叠面板容器，支持自定义折叠展示名称、默认展开状态、面板类型（normal/primary），可选显示分割线，点击标题区域切换折叠/展开状态

## Props

| 属性               | 类型                            | 必填 | 默认值 | 说明                                                                      |
| ------------------ | ------------------------------- | ---- | ------ | ------------------------------------------------------------------------- |
| foldName           | `string`                        | 是   | -      | 折叠展示名称                                                              |
| defaultShow        | `boolean`                       | -    | -      | 是否默认展开，仅在初始化时生效，之后由 show 属性控制                      |
| type               | `"normal" \| "primary"`         | -    | -      | 折叠面板类型                                                              |
| isShowFoldIcon     | `any`                           | -    | `true` | 是否显示展开图标                                                          |
| foldStyle          | `Record<string, string>`        | -    | -      | 折叠标题区域的自定义样式                                                  |
| showDivider        | `boolean`                       | -    | -      | 是否展示分割线                                                            |
| dividerOrientation | `"left" \| "right" \| "center"` | -    | -      | 分割线标题的位置                                                          |
| dividerDashed      | `boolean`                       | -    | -      | 是否虚线                                                                  |
| show               | `boolean`                       | -    | -      | 是否展开，初始值由 defaultShow 决定，之后通过点击标题区域或外部设置来控制 |
| hideFoldName       | `boolean`                       | 是   | -      |                                                                           |
| foldIcon           | `MenuIcon`                      | 是   | -      |                                                                           |
| foldIconStyle      | `any`                           | 是   | -      |                                                                           |

## Events

| 事件        | detail                                                  | 说明                            |
| ----------- | ------------------------------------------------------- | ------------------------------- |
| fold.change | `boolean` — 当前展开状态，true 表示展开，false 表示折叠 | 点击标题区域切换折叠/展开时触发 |

## Slots

| 名称    | 说明                                        |
| ------- | ------------------------------------------- |
| content | 折叠/展开的内容区域，展开时显示，折叠时隐藏 |

## Examples

### Basic

基本用法，通过 foldName 设置折叠标题文本。

```yaml preview
- brick: basic-bricks.fold-brick-v2
  properties:
    foldName: "查看"
  slots:
    content:
      type: bricks
      bricks:
        - brick: div
          properties:
            textContent: "这是被折叠的内容"
```

### Default Expanded

通过 defaultShow 设置面板初始化时为展开状态。

```yaml preview
- brick: basic-bricks.fold-brick-v2
  properties:
    foldName: "查看详情"
    defaultShow: true
  slots:
    content:
      type: bricks
      bricks:
        - brick: div
          properties:
            textContent: "默认展开的内容"
```

### Primary Type

设置 type 为 primary，标题区域使用主题色高亮显示。

```yaml preview
- brick: basic-bricks.fold-brick-v2
  properties:
    foldName: "查看"
    type: "primary"
  slots:
    content:
      type: bricks
      bricks:
        - brick: div
          properties:
            textContent: "primary 类型的折叠内容"
```

### Hide Fold Icon

设置 isShowFoldIcon 为 false，隐藏标题区域的展开/折叠图标。

```yaml preview
- brick: basic-bricks.fold-brick-v2
  properties:
    foldName: "查看"
    isShowFoldIcon: false
    type: "primary"
  slots:
    content:
      type: bricks
      bricks:
        - brick: div
          properties:
            textContent: "无图标的折叠内容"
```

### With Divider

设置 showDivider 为 true，在标题区域显示分割线，并通过 dividerOrientation 控制标题在分割线中的位置。

```yaml preview
- brick: basic-bricks.fold-brick-v2
  properties:
    foldName: "查看"
    showDivider: true
    dividerOrientation: "center"
  slots:
    content:
      type: bricks
      bricks:
        - brick: div
          properties:
            textContent: "带分割线的折叠内容"
```

### Dashed Divider with Left Orientation

设置 dividerDashed 为 true 显示虚线分割线，dividerOrientation 为 left 使标题居左。

```yaml preview
- brick: basic-bricks.fold-brick-v2
  properties:
    foldName: "更多信息"
    showDivider: true
    dividerDashed: true
    dividerOrientation: "left"
  slots:
    content:
      type: bricks
      bricks:
        - brick: div
          properties:
            textContent: "虚线分割线、标题居左的折叠内容"
```

### Custom Fold Style

通过 foldStyle 自定义折叠标题区域的样式。

```yaml preview
- brick: basic-bricks.fold-brick-v2
  properties:
    foldName: "自定义样式"
    foldStyle:
      fontSize: "16px"
      color: "#1890ff"
      fontWeight: "bold"
  slots:
    content:
      type: bricks
      bricks:
        - brick: div
          properties:
            textContent: "自定义样式的折叠内容"
```

### Controlled Show State

通过 show 属性从外部控制面板的展开/折叠状态。

```yaml preview
- brick: basic-bricks.fold-brick-v2
  properties:
    foldName: "外部控制"
    show: true
  slots:
    content:
      type: bricks
      bricks:
        - brick: div
          properties:
            textContent: "通过 show 属性控制的内容"
```

### Fold Change Event

监听 fold.change 事件，获取当前展开状态。

```yaml preview
- brick: basic-bricks.fold-brick-v2
  properties:
    foldName: "点击切换"
  events:
    fold.change:
      action: console.log
  slots:
    content:
      type: bricks
      bricks:
        - brick: div
          properties:
            textContent: "切换时会在控制台打印当前状态"
```
