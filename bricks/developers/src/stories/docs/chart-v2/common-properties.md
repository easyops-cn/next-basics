> 以下为图表的通用属性

| property     | type                                     | required | default | description                                                    |
| ------------ | ---------------------------------------- | -------- | ------- | -------------------------------------------------------------- |
| data         | Record<string, any>[]                    | ✔️       | -       | 图表数据                                                       |
| error        | string                                   | -        | -       | 报错信息, 若该字段不为空，图表不会渲染                         |
| width        | number                                   | -        | -       | 宽度                                                           |
| height       | number                                   | ✔️       | -       | 高度                                                           |
| padding      | ViewPadding                              | -        | -       | 画布 padding                                                   |
| xField       | string                                   | -        | -       | x 轴字段                                                       |
| yField       | string                                   | -        | -       | y 轴字段                                                       |
| yFields      | string[]                                 | -        | -       | 选中 key 展开成 y 轴字段                                       |
| rightYField  | string                                   | -        | -       | 右 y 轴字段                                                    |
| groupField   | string                                   | -        | -       | 分类字段                                                       |
| groupFields  | string[]                                 | -        | -       | 根据指定组成新对象 [a,b]组成以 ab 值拼凑的新属性，图例默认 a-b |
| axis         | AxisConfig                               | -        | -       | 坐标轴配置                                                     |
| thresholds   | Threshold[]                              | -        | -       | 阈值线，对折线图、面积图、柱状图，横向柱状图有效               |
| series       | { [`field`]: SeriesConfig }              | -        | -       | 对 y 值做简单的转换                                            |
| interactions | Record<string,any>[]                     | -        | -       | 调用交互                                                       |
| legends      | LegendOption(暂时只有 boolean 和 format) | -        | -       | 图例                                                           |
| tooltip      | TooltipOption(暂时只有 boolean)          | -        | -       | tooltip                                                        |
| colors       | string[]                                 | -        | -       | 映射颜色队列                                                   |

```typescript
interface Label {
  /** 映射的字段。 */
  field: string;
  rightField?: string; //右y轴,不设置时右Y轴也采用field
  // GeometryLabelCfg: https://g2.antv.vision/en/docs/api/label
  config: GeometryLabelCfg;
}

interface LegendCfgs extends LegendCfg {
  format?: string; //根据指定组成新对象 "{{a}}-{{b}}"组成以 ab 值拼凑的新属性
}
type LegendOption = LegendCfgs | boolean;

type TooltipOption = boolean | TooltipCfg;
```

### interactions 使用例子

```typescript
interactions: [
  {
    type: "custom-brush-x", //自定义
    cfg: {
      enablePushQuery: true,
      fromKey: "lll",
      toKey: "pppp",
    },
  },
];
```

### AxisConfig

| property   | type     | required | default | description |
| ---------- | -------- | -------- | ------- | ----------- |
| xAxis      | BaseAxis | -        | -       | x 轴配置    |
| yAxis      | BaseAxis | -        | -       | y 轴配置    |
| rightYAxis | BaseAxis | -        | -       | 右 y 轴配置 |

### BaseAxis

| property | type                                                                            | required | default | description                                            |
| -------- | ------------------------------------------------------------------------------- | -------- | ------- | ------------------------------------------------------ |
| min      | number                                                                          | -        | -       | 坐标轴最小值                                           |
| max      | number                                                                          | -        | -       | 坐标轴最大值                                           |
| unit     | string                                                                          | -        | -       | 单位，如果设置了单位会做自适应，点击查看支持[单位列表] |
| shape    | "line" \| "dot" \| "dash" \| "hv" \| "smooth" \| "hv" \| "vh" \| "hvh" \| "vhv" | -        | "line"  | 仅对 line-chart 有效                                   |
| type     | "cat" \| "timeCat" \| "linear"                                                  | -        | -       | 度量类型, 仅对 `axis.xAxis` 有效                       |

### Threshold

| property | type              | required | default | description                          |
| -------- | ----------------- | -------- | ------- | ------------------------------------ |
| value    | number            | ✔️       | -       | 阈值                                 |
| color    | string            | -        | -       | 阈值线颜色                           |
| shape    | "dash" \| "line"  | -        | "dash"  | 默认虚线                             |
| fill     | boolean           | -        | false   | 是否显示阈值蒙层                     |
| operator | "gt" \| "lt"      | -        | "gt"    | 阈值比较符，大于或者小于，默认为大于 |
| yAxis    | "left" \| "right" | -        | "left"  | 阈值线归属，默认为左 y 轴阈值线      |

### SeriesConfig

| property   | type    | required | default | description                                      |
| ---------- | ------- | -------- | ------- | ------------------------------------------------ |
| isNegative | boolean | -        | -       | `isNegative` 表示乘以 -1，仅对 `area-chart` 有效 |

[单位列表]: http://docs.developers.easyops.cn/docs/brick-next/units
