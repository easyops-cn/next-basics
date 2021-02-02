[//]: # "atom-bricks/chart-v2/pie-chart.ts"

<details>
<summary>History</summary>

| Version | Change                        |
| ------- | ----------------------------- |
| 1.0.0   | 新增构件 `chart-v2.pie-chart` |

</details>

# INPUTS

| property           | type              | required | default | description                            |
| ------------------ | ----------------- | -------- | ------- | -------------------------------------- |
| radius             | `number`          | -        | -       | 配置极坐标半径，0 - 1 范围的数值       |
| innerRadius        | `number`          | -        | -       | 配置极坐标内半径，0 - 1 范围的数值     |
| showPercentOnly    | `boolean`         | -        | -       | tooltip 仅显示百分比(最多显示两位小数) |
| showPercentWithVal | `boolean`         | -        | -       | tooltip 显示原值(百分比)               |
| innerTextCfg       | `EnhancedTextCfg` | -        | -       | 内部文字配置，默认位于中心，多用于环图 |

```typescript
// @antv/component/lib/types.d.ts
export interface EnhancedTextCfg {
  /** 文本标注内容 */
  content: string | number;
  /** 旋转，弧度制 */
  rotate?: number;
  /** 文本标注样式 */
  style?: ShapeAttrs;
  /** 文字包围盒样式设置 */
  background?: EnhancedTextBackgroundCfg;
  /** 文本的最大长度 */
  maxLength?: number;
  /** 超出 maxLength 是否自动省略 */
  autoEllipsis?: boolean;
  /** 文本在二维坐标系的显示位置，是沿着 x 轴显示 还是沿着 y 轴显示 */
  isVertical?: boolean;
  /** 文本截断的位置 */
  ellipsisPosition?: "head" | "middle" | "tail";
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
