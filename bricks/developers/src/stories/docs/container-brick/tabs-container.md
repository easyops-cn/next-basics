[//]: # "atom-bricks/layout-and-container/tabs-container.ts"

<details>
<summary>History</summary>

| Version | Change                                               |
| ------- | ---------------------------------------------------- |
| 2.12.0  | 新增 `extraContent` 插槽                             |
| 2.7.0   | 新增 `TabInfo.disabled` 属性和 `TabInfo.hidden` 属性 |

</details>

> Tips: 该示例为`slotType`为`"bricks"`的示例，由于现阶段`BrickBook`还不支持`slotType`为`"routes"`的示例，可到`micro-apps/search/detail.ts`中看具体示例。`slotType`为`"bricks"`，用于 tab 栏个数确定且切换 tab 栏不需改变路由的情况，dataSource 定义的 tab 栏数组需要跟插槽中的定义的 bricks 数组的索引一一对应，进入页面实际上会加载 bricks 中的所有构件，内部通过 css 控制是否在页面上显示。`slotType`为`"routes"`，可用于 tab 栏个数确定或者不确定的两种情况，切换 tab 栏需要改变路由，进入页面只会加载该路由下的对应构件。

# INPUTS

| property              | type                      | required | default | description                                                                     |
| --------------------- | ------------------------- | -------- | ------- | ------------------------------------------------------------------------------- |
| tabList               | TabInfo[]                 | ✔️       | -       | 标签页列表，每项两个字符串字段：`text`: 名称，`key`: 唯一键。                   |
| <del>dataSource</del> | any                       | -        | -       | Deprecated。数据源，通过 useResolves 从后台接口获取或者直接在 storyboard 中配置 |
| <del>fields</del>     | object                    | -        | -       | Deprecated。设置相关字段取自哪里，具体描述见下表                                |
| slotType              | "bricks"或"routes"        | ✔️       | -       | 插槽类型："bricks"或者"routes"，对应插槽配置的 slots.content.type。             |
| activeTabIndex        | number                    | -        | 0       | slotType 为 bricks 时可设置，激活状态的 tab 栏的索引                            |
| activeKey             | string                    | -        | -       | slotType 为 routes 时可设置，激活状态的 tab 栏的 key                            |
| type                  | normal \| panel           | -        | normal  | 提供两种样式的 tab 类型                                                         |
| size                  | small \| default \| large | -        | default | type = normal 时提供三种大小                                                    |
| showCard              | boolean                   | -        | true    | 是否显示外层卡片                                                                |

### <del>fields</del>

Deprecated。

<details>
<summary>展开</summary>

| property   | type   | required | default | description                                                                                                                                     |
| ---------- | ------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| dataSource | string | -        | -       | 指定 tab 栏的数据（下表中的 tabsList）从哪个字段中来，例如从后台获取的数据为[{text:xx,key:xx}]，则不需指定；如果数据为{list: []}则可指定为 list |
| text       | string | -        | -       | 指定 tabsList 每一项的 text 从哪里来，例如 dataSource 为 [{name: "123", id: "1"}]，则可指定该项为 name                                          |
| key        | string | -        | -       | 同上，可指定该项为 id                                                                                                                           |

</details>

### TabInfo

| property | type    | required | default | description                                                                                                                                                                                                                                           |
| -------- | ------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text     | string  | ✔️       | -       | 标签文案                                                                                                                                                                                                                                              |
| key      | string  | ✔️       | -       | 标签唯一 key                                                                                                                                                                                                                                          |
| disabled | boolean | -        | -       | 是否禁用标签。可以配合平台特性开关使用，在`slotType`为`"bricks"`的模式下，如果希望配置之后不渲染该 tab 下的构件，可配合平台[条件渲染](http://docs.developers.easyops.cn/docs/brick-next/conditional-rendering)能力，另外写个 div 代替。具体看示例 2。 |
| hidden   | boolean | -        | -       | 是否隐藏标签，用法与`disabled`一致。开启后隐藏标签。                                                                                                                                                                                                  |

# EVENTS

| type       | detail | description                                                                                         |
| ---------- | ------ | --------------------------------------------------------------------------------------------------- |
| tab.select | string | 切换 tab 栏会触发的事件，detail 为目标 tab 对应的 key，可通过该事件去触发 "history.push" 来切换路由 |

# SLOTS

| name         | description                    |
| ------------ | ------------------------------ |
| content      | 内容插槽位                     |
| extraContent | tab bar 上右上角额外内容插槽位 |
