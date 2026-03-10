---
tagName: presentational-bricks.general-label
displayName: WrappedPresentationalBricksGeneralLabel
description: 可用来展示基本文案、前后缀图标，可配置点击事件和 url 的通用 label 构件
category:
source: "@next-bricks/presentational-bricks"
---

# WrappedPresentationalBricksGeneralLabel

> 可用来展示基本文案、前后缀图标，可配置点击事件和 url 的通用 label 构件

## 导入

```tsx
import { WrappedPresentationalBricksGeneralLabel } from "@easyops/wrapped-components";
```

## Props

| 属性       | 类型       | 必填 | 默认值 | 说明                                                |
| ---------- | ---------- | ---- | ------ | --------------------------------------------------- |
| text       | `string`   | -    | -      | 文字内容                                            |
| prefixIcon | `MenuIcon` | -    | -      | 前缀图标                                            |
| suffixIcon | `MenuIcon` | -    | -      | 后缀图标                                            |
| url        | `string`   | -    | -      | 链接的 URL                                          |
| href       | `string`   | -    | -      | 外链地址，使用原生 `<a>` 标签跳转，通常用于外部链接 |
| dataSource | `any`      | -    | -      | `onLabelClick`事件的传出的数据                      |
| data       | `any`      | -    | -      | `onLabelClick`事件的详情                            |

## Events

| 事件         | detail                                                                               | 说明              |
| ------------ | ------------------------------------------------------------------------------------ | ----------------- |
| onLabelClick | 编排者通过 `dataSource` 属性传入的自定义数据（若未设置则回退到已废弃的 `data` 属性） | 点击 label 时触发 |

## Examples

### Basic

#### 展示带后缀图标的文本标签

```tsx
<WrappedPresentationalBricksGeneralLabel
  text="2020-03-14"
  suffixIcon={{
    lib: "antd",
    icon: "calendar",
    theme: "outlined",
    color: "#0071eb",
  }}
/>
```

#### 展示带前缀图标的文本标签

```tsx
<WrappedPresentationalBricksGeneralLabel
  text="1.0.0"
  prefixIcon={{
    lib: "antd",
    icon: "tag",
    theme: "outlined",
  }}
/>
```

#### 仅展示纯文本标签

```tsx
<WrappedPresentationalBricksGeneralLabel text="示例文本" />
```

### Link

#### 使用 url 属性配置内部链接跳转

```tsx
<WrappedPresentationalBricksGeneralLabel
  text="1.0.0"
  prefixIcon={{
    lib: "antd",
    icon: "tag",
    theme: "outlined",
  }}
  url="/resource-monitor"
/>
```

#### 使用 href 属性配置外部链接跳转

```tsx
<WrappedPresentationalBricksGeneralLabel
  text="访问外部链接"
  suffixIcon={{
    lib: "antd",
    icon: "link",
    theme: "outlined",
  }}
  href="https://www.example.com"
/>
```

### Advanced

#### 点击标签触发事件并传出自定义数据

```tsx
function MyComponent() {
  const handleLabelClick = (event: CustomEvent) => {
    console.log(event.detail);
  };

  return (
    <WrappedPresentationalBricksGeneralLabel
      text="点击触发事件"
      suffixIcon={{
        lib: "antd",
        icon: "calendar",
        theme: "outlined",
        color: "#0071eb",
      }}
      dataSource={{
        id: 1,
        name: "示例数据",
      }}
      onLabelClick={handleLabelClick}
    />
  );
}
```
