---
tagName: presentational-bricks.brick-user
displayName: WrappedPresentationalBricksBrickUser
description: 展示用户头像和用户名的构件，支持昵称显示、showKey 显示、自定义 Tooltip 及头像大小和形状配置
category: display-component
source: "@next-bricks/presentational-bricks"
---

# WrappedPresentationalBricksBrickUser

> 展示用户头像和用户名的构件，支持昵称显示、showKey 显示、自定义 Tooltip 及头像大小和形状配置

## 导入

```tsx
import { WrappedPresentationalBricksBrickUser } from "@easyops/wrapped-components";
```

## Props

| 属性                   | 类型                              | 必填 | 默认值      | 说明                                                                                                          |
| ---------------------- | --------------------------------- | ---- | ----------- | ------------------------------------------------------------------------------------------------------------- |
| username               | `string`                          | 是   | -           | [已废弃]用户名 (废弃属性，请使用 `userNameOrId`)                                                              |
| userNameOrId           | `string`                          | 是   | -           | 用户名或用户 instanceId                                                                                       |
| iconUrl                | `string`                          | -    | -           | 用户头像 url                                                                                                  |
| hideAvatar             | `boolean`                         | -    | -           | 是否隐藏头像                                                                                                  |
| hideUsername           | `boolean`                         | -    | -           | 是否隐藏用户名                                                                                                |
| size                   | `"large" \| "small" \| "default"` | -    | `"default"` | 设置头像的大小                                                                                                |
| shape                  | `"circle" \| "square"`            | -    | -           | 指定头像的形状                                                                                                |
| showNickname           | `boolean`                         | -    | -           | [已废弃,最新用法以 showNicknameOrUsername 为准]是否展示昵称,当用户不含昵称昵称时不展示                        |
| showNicknameOrUsername | `boolean`                         | -    | -           | 当有昵称时显示昵称，无昵称时显示用户名                                                                        |
| displayShowKey         | `boolean`                         | -    | -           | 是否显示 showKey，启用后当用户拥有 showKey 时显示为 `name(showKey)` 格式（如 `alan(hero)`），否则仅显示用户名 |
| iconMargin             | `number \| string`                | -    | -           | 头像与用户名之间的间距，支持数字（像素）或 CSS 字符串（如 `"0 8px"`）                                         |
| customTooltip          | `string`                          | -    | -           | 自定义 Tooltip 替换字符串，支持 `#{name}` 和 `#{showKey}` 占位符，例如 `"发起人：#{name}"`                    |

## Examples

### Basic 基础用法

#### 默认展示用户

通过 userNameOrId 传入用户名或 instanceId，展示用户头像和用户名。

```tsx
<WrappedPresentationalBricksBrickUser userNameOrId="easyops" />
```

#### 自定义头像图片

通过 iconUrl 属性指定自定义头像图片地址。

```tsx
<WrappedPresentationalBricksBrickUser
  userNameOrId="easyops"
  iconUrl="assets/favicon.png"
/>
```

#### 设置头像大小和形状

通过 size 和 shape 属性控制头像的大小和形状。

```tsx
<WrappedPresentationalBricksBrickUser
  userNameOrId="easyops"
  size="large"
  shape="square"
/>
```

### Display 显示控制

#### 隐藏头像

通过 hideAvatar 属性隐藏用户头像，仅显示用户名。

```tsx
<WrappedPresentationalBricksBrickUser
  userNameOrId="easyops"
  hideAvatar={true}
/>
```

#### 隐藏用户名

通过 hideUsername 属性隐藏用户名，仅显示头像。

```tsx
<WrappedPresentationalBricksBrickUser
  userNameOrId="easyops"
  hideUsername={true}
/>
```

### Advanced 高级用法

#### 显示昵称

通过 showNicknameOrUsername 属性，当用户有昵称时显示昵称，无昵称时显示用户名。

```tsx
<WrappedPresentationalBricksBrickUser
  userNameOrId="easyops"
  showNicknameOrUsername={true}
/>
```

#### 显示 showKey

通过 displayShowKey 属性，显示用户的 showKey 信息，格式为 `name(showKey)`。

```tsx
<WrappedPresentationalBricksBrickUser
  userNameOrId="easyops"
  displayShowKey={true}
/>
```

#### 自定义 Tooltip

通过 customTooltip 属性自定义鼠标悬浮提示文字，支持 `#{name}` 和 `#{showKey}` 占位符。

```tsx
<WrappedPresentationalBricksBrickUser
  userNameOrId="easyops"
  customTooltip="发起人：#{name}"
/>
```

#### 自定义头像间距

通过 iconMargin 属性设置头像与用户名之间的间距。

```tsx
<WrappedPresentationalBricksBrickUser
  userNameOrId="easyops"
  iconMargin="0 8px 0 0"
/>
```
