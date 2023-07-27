[//]: # "atom-bricks/chart-v2/time-series-chart.ts"

<details>
<summary>History</summary>

| Version | Change                                          |
| ------- | ----------------------------------------------- |
| 1.2.0   | 新增构件 `chart-v2.time-series-chart`           |
| 1.11.0  | 新增属性 `showPoint`, `pointSize`, `pointShape` |

</details>

# INPUTS

| property     | type       | required | default  | description           |
| ------------ | ---------- | -------- | -------- | --------------------- |
| yFields      | string[]   | -        | -        | 同属左 y 轴的多个维度 |
| timeFormat   | string     | -        | -        | 时间格式              |
| connectNulls | boolean    | -        | -        | 是否连接空值          |
| showPoint    | boolean    | -        | false    | 是否显示点            |
| pointSize    | number     | -        | 4        | 点大小                |
| pointShape   | PointShape | -        | "circle" | 点形状                |
| xRange       | xRange     | -        |          | 设置 x 轴             |

```typescript
interface xRange {
  from: number;
  to: number;
  step: number; // step会去计算间隔从而自适应显示的format格式，优先级低于timeFormat
}
```

```typescript
type PointShape =
  | "circle"
  | "square"
  | "bowtie"
  | "diamond"
  | "hexagon"
  | "triangle"
  | "triangle-down"
  | "hollow-circle"
  | "hollow-square"
  | "hollow-bowtie"
  | "hollow-diamond"
  | "hollow-hexagon"
  | "hollow-triangle"
  | "hollow-triangle-down"
  | "cross"
  | "tick"
  | "plus"
  | "hyphen"
  | "line";
```

# COMMON INPUTS

<!-- common properties will be inserted here -->

# EVENTS

<!-- common events will be inserted here -->

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
