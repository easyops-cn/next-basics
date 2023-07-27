[//]: # "atom-bricks/data-view/brick-timeline.ts"

# INPUTS

| property  | type                                                                                          | required | default | description                        |
| --------- | --------------------------------------------------------------------------------------------- | -------- | ------- | ---------------------------------- |
| itemList  | TimelineItem[]                                                                                | object[] | ✔️      | -                                  | 数据源 |
| statusMap | Record<string, StatusColor>                                                                   | -        | -       | 根据数据源状态值映射到相应的颜色   |
| showCard  | boolean                                                                                       | -        | true    | 是否显示 card 边框                 |
| link      | string                                                                                        | -        | -       | 时间轴右侧跳转链接                 |
| type      | base \| extension                                                                             | -        | base    | 时间轴类型，支持基本类型和扩展类型 |
| timeType  | second \| default                                                                             | -        | default | 时间轴每一项具体配置，详情如下所示 |
| useBrick  | [UseBrickConf](http://docs.developers.easyops.cn/docs/api-reference/brick-types.usebrickconf) | ✔️       | -       | 自定义构件                         |

## useBrick

自定义展示子构件时，子构件收到的数据格式为：

```ts
interface Data {
  item: object; // 单项数据
  index: number; // 序号
  list: object[]; // 所有数据
}
```

## 其它

```typescript
// 根据时间轴UI规范不同颜色代表不同的状态，通常绿色表示已完成或者成功状态的，红色表示告警或者错误状态，蓝色表示正在进行的当前状态，灰色表示普通状态
export type StatusColor = "green" | "red" | "gray" | "blue";
```

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
