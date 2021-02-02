[//]: # "atom-bricks/chart-v2/time-bar-chart.ts"

<details>
<summary>History</summary>

| Version | Change                             |
| ------- | ---------------------------------- |
| 1.6.0   | 新增构件 `chart-v2.time-bar-chart` |

</details>

# INPUTS

| property | type            | required   | default | description                                                               |
| -------- | --------------- | ---------- | ------- | ------------------------------------------------------------------------- |
| range    | [string,string] | true       | -       | y 轴聚合的两个字段，例如 startTime,endTime                                |
| tooltip  | Tooltip         | false      | -       | tooltip 展示 name 字段的展示，value 字段的格式，可以转换时间如 'HH:mm:ss' |
| xField   | string          | true       | -       | x 轴字段                                                                  |
| xRange   | xRange          | -          |         | 设置 x 轴                                                                 |
| timeType | 'relative'      | 'absolute' | -       | 'relative'                                                                | 设置 x 轴显示是相对时间还是绝对时间 |

```typescript
interface xRange {
  from: number;
  to: number;
  step: number;
}
```

```typescript
interface Tooltip {
  name: string;
  valueFormat: string;
}
```

# EVENTS

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
