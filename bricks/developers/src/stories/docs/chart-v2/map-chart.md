[//]: # "atom-bricks/chart-v2/map-chart.ts"

<details>
<summary>History</summary>

| Version | Change                        |
| ------- | ----------------------------- |
| 1.6.0   | 新增构件 `chart-v2.map-chart` |

</details>

# INPUTS

| property      | type            | required | default | description                                         |
| ------------- | --------------- | -------- | ------- | --------------------------------------------------- |
| toolTipConfig | ToolTipConfig[] | false    | false   | tooltip 上展示的 label 和 field 字段类似 table 设置 |
| longitude     | string          | false    | x       | 数据经度的映射字段默认 x                            |
| latitude      | string          | false    | y       | 数据纬度的映射字段默认 y                            |

```typescript
interface ToolTipConfig {
  label: string;
  field: string;
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
