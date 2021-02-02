[//]: # "atom-bricks/chart-v2/bar-chart.ts"

<details>
<summary>History</summary>

| Version | Change                        |
| ------- | ----------------------------- |
| 1.0.0   | 新增构件 `chart-v2.bar-chart` |

</details>

# INPUTS

| property   | type               | required | default | description  |
| ---------- | ------------------ | -------- | ------- | ------------ |
| adjustType | "stack" \| "dodge" |          | "stack" | 数据调整方式 |
| xRange     | xRange             | -        |         | 设置 x 轴    |

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
