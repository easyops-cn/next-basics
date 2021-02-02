[//]: # "atom-bricks/topology-v2/item-with-tag.ts"

<details>
<summary>History</summary>

| Version | Change                         |
| ------- | ------------------------------ |
| 1.2.0   | 新增构件 `graph.item-with-tag` |

</details>

# INPUTS

| property | type                                                               | required | default | description |
| -------- | ------------------------------------------------------------------ | -------- | ------- | ----------- |
| text     | string                                                             | -        | -       | 文字        |
| icon     | [MenuIcon](http://docs.developers.easyops.cn/docs/brick-next/icon) | -        | -       | 图标        |
| tagText  | string                                                             | -        | -       | 标签文字    |
| tagColor | string                                                             | -        | -       | 标签颜色    |

# EVENTS

| type       | detail | description      |
| ---------- | ------ | ---------------- |
| item.click | -      | 点击项发出的事件 |
