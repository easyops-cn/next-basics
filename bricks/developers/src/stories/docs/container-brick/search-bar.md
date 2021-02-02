[//]: # "atom-bricks/layout-and-container/search-bar.ts"

<details>
<summary>History</summary>

| Version | Change                                |
| ------- | ------------------------------------- |
| 2.9.0   | 新增构件 `container-brick.search-bar` |
| 2.9.2   | 新增配置 `marginBottom`               |

</details>

# 描述

仅提供了 start、end 2 个挂载点：

- `start`: 左侧搜索栏
- `end`: 右侧操作栏

# INPUTS

| property     | type   | required | default                 | description                                                                    |
| ------------ | ------ | -------- | ----------------------- | ------------------------------------------------------------------------------ |
| marginBottom | string | -        | var(--card-content-gap) | bottom 偏移，`search-bar`常适配于`brick-table`，故默认加这个偏移，符合设计规范 |

<!-- uncomment this block when applicable.
# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
