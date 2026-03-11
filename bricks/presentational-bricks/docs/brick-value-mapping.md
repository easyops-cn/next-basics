---
tagName: presentational-bricks.brick-value-mapping
displayName: WrappedPresentationalBricksBrickValueMapping
description: 适用于将基本类型的数值转换成有意义的文本进行展示
category: data-transform
source: "@next-bricks/presentational-bricks"
---

# presentational-bricks.brick-value-mapping

> 适用于将基本类型的数值转换成有意义的文本进行展示

## Props

| 属性              | 类型                                                 | 必填 | 默认值  | 说明                                                              |
| ----------------- | ---------------------------------------------------- | ---- | ------- | ----------------------------------------------------------------- |
| value             | `string \| number`                                   | -    | -       | 原始值                                                            |
| fields            | `{     value: string;   }`                           | -    | -       | [已废弃]字段映射, 跟 dataSource 一起使用来获得运行时 value        |
| mapping           | `Record<     string \| number,     MappingValue   >` | 是   | -       | 映射规则                                                          |
| showTagCircle     | `boolean`                                            | -    | -       | 显示文字旁边的小圈圈，按照平台规范通常表示状态的标签可设置为 true |
| dataSource        | `Record<string, any>`                                | -    | -       | 替代 `data` 属性，click 事件时传出的数据                          |
| triggerClickEvent | `boolean`                                            | -    | `false` | 是否触发点击事件                                                  |
| isTextEllipsis    | `boolean`                                            | -    | `false` | 文案超出时是否隐藏溢出文本并在鼠标悬停时显示 Tooltip              |
| link              | `LinkProps`                                          | -    | -       | 配置跳转链接，在 `triggerClickEvent` 为 false 生效                |
| data              | `any`                                                | -    | -       | [已废弃]可用于接收 useBrick 传递过来的数据                        |

## Events

| 事件                      | detail                                   | 说明                                                  |
| ------------------------- | ---------------------------------------- | ----------------------------------------------------- |
| brick-value-mapping.click | `{ data: any; value: string \| number }` | 点击事件，需设置 `triggerClickEvent` 为 true 才会触发 |

## Memo

### 注意

> 如果需要区间的条件规则映射，比如大于、小于等，请使用[条件展示](developers/brick-book/brick/presentational-bricks.brick-conditional-display)

### MappingValue

```typescript
interface MappingValue {
  text?: string;
  color?: Color;
  icon?: MenuIcon;
  iconSize?: number;
}
```

### LinkProps

```typescript
interface LinkProps {
  to?: string;
  href?: string;
  innerRef?: string;
  replace?: boolean;
  target?: string;
}
```

### 映射规则说明

映射支持正则匹配，匹配规则如下：

1. 首先以 `value` 为 key 来获取映射，若成功匹配则使用该规则来展示；若不成功，则走下一步
2. 将 `映射规则` 中的 key 作为正则，来匹配 `value`, 使用成功匹配的第一个规则

例如

```typescript
// 以下将展示 `hi`
const mapping = { hello: { text: "hi" }, ".*": { text: "anything else" } };
const value = "hello";

// 以下将展示 `anything else`
const mapping = {
  www: { text: "world wide web" },
  ".*": { text: "anything else" },
};
const value = "hello";
```

## Examples

### 基本用法 - 映射为多彩标签（带圆点）

使用 `showTagCircle` 显示状态圆点，通过 `mapping` 将不同值映射为对应的颜色标签。

```yaml
brick: presentational-bricks.brick-value-mapping
properties:
  showTagCircle: true
  value: success
  mapping:
    failed:
      color: red
      text: 失败
    success:
      color: green
      text: 正常
    warning:
      color: orange
      text: 异常
```

### 触发点击事件（填充色标签）

设置 `triggerClickEvent` 为 true 并监听 `brick-value-mapping.click` 事件，同时通过 `dataSource` 传递附加数据。

```yaml
brick: presentational-bricks.brick-value-mapping
properties:
  triggerClickEvent: true
  showTagCircle: false
  value: warning
  dataSource:
    id: 1001
    name: 示例数据
  mapping:
    warning:
      color: red-inverse
      text: 紧急
    safe:
      color: green-inverse
      text: 正常
events:
  brick-value-mapping.click:
    - action: console.log
      args:
        - "<% EVENT.detail %>"
```

### 映射为 icon 加文字

映射结果可以包含图标和文字，通过 `icon` 和 `text` 字段配置。

```yaml
brick: presentational-bricks.brick-value-mapping
properties:
  value: 1
  mapping:
    1:
      text: mapping-text
      color: green
      icon:
        lib: fa
        icon: link
```

### 仅映射为 icon（自定义图标大小）

不设置 `text` 时仅展示图标，通过 `iconSize` 自定义图标大小。

```yaml
brick: presentational-bricks.brick-value-mapping
properties:
  value: 2
  mapping:
    2:
      iconSize: 36
      color: red
      icon:
        lib: fa
        icon: bell
```

### 正则匹配

当精确匹配不到时，会将 mapping 的 key 作为正则进行匹配，使用第一个匹配成功的规则。

```yaml
brick: presentational-bricks.brick-value-mapping
properties:
  value: hello
  mapping:
    ".*":
      color: orange
      text: remapping
      icon:
        lib: fa
        icon: star
    2:
      iconSize: 36
      color: red
      icon:
        lib: fa
        icon: bell
```

### 配置跳转链接

通过 `link` 配置跳转链接，点击标签时会跳转到指定地址。注意 `link` 在 `triggerClickEvent` 为 false 时才生效。

```yaml
brick: presentational-bricks.brick-value-mapping
properties:
  style:
    display: inline-block
  value: hello
  link:
    to: /developers/brick-book
  mapping:
    ".*":
      color: orange
      text: remapping
      icon:
        lib: fa
        icon: star
```

### 文案超出隐藏

设置 `isTextEllipsis` 为 true 时，文案超出容器会隐藏并在鼠标悬停时显示 Tooltip。

```yaml
brick: presentational-bricks.brick-value-mapping
properties:
  style:
    width: 80px
  isTextEllipsis: true
  value: longText
  mapping:
    longText:
      color: blue
      text: 这是一段非常非常长的文案用于演示超出隐藏效果
```

### 无匹配时显示原始值

当 value 无法匹配到任何映射规则时，直接显示原始值。

```yaml
brick: presentational-bricks.brick-value-mapping
properties:
  value: 1
  mapping:
    0:
      text: error
```
