[//]: # "atom-bricks/layout-and-container/index-card.ts"

# 描述

页面容器，提供了 toolbar、content 2 个挂载点：

`toolBar`: 右上角页面操作栏
`content`: 内容区

与 basic-bricks.micro-app 的区别是：

- 不自带缩进，而 basic-bricks.micro-app 默认提供了`padding: 32px`的缩进，用于标准的平台菜单栏与内容区的分割
- 非挂载点方式支持 title 的设置

# INPUTS

| property       | type   | required | default | description                          |
| -------------- | ------ | -------- | ------- | ------------------------------------ |
| title          | string | no       | -       | 卡片标题                             |
| contentGridGap | number | no       | 24      | 内容区的 gap，内容区固定为 grid 布局 |

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
