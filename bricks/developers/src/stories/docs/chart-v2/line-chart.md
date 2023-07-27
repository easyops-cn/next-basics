[//]: # "atom-bricks/chart-v2/line-chart.ts"

<details>
<summary>History</summary>

| Version | Change                             |
| ------- | ---------------------------------- |
| 1.37.0  | 新增属性 `fill` `operator` `yAxis` |
| 1.29.0  | 新增事件 `chart-v2.plot.click`     |
| 1.0.0   | 新增构件 `chart-v2.line-chart`     |

</details>

# INPUTS

| property  | type    | required | default | description |
| --------- | ------- | -------- | ------- | ----------- |
| showPoint | boolean | -        | false   | 是否显示点  |
| xRange    | xRange  | -        |         | 设置 x 轴   |

```typescript
interface xRange {
  from: number;
  to: number;
  step: number;
}
```

# COMMON INPUTS

<!-- common properties will be inserted here -->

# EVENTS

<!-- common events will be inserted here -->

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
