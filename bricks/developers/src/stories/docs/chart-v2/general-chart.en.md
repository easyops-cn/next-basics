[//]: # "atom-bricks/chart-v2/general-chart.ts"

<details>
<summary>History</summary>

| Version | Change                            |
| ------- | --------------------------------- |
| 1.0.0   | New brick `chart-v2.general-chart` |

</details>

# INPUTS

| property | type                  | required | default | description |
| -------- | --------------------- | -------- | ------- | ----------- |
| data     | Record<string, any>[] | ✔️       | -       | Chart data  |
| options  | [Options]             | ✔️       | -       | Options     |
| width    | number                | -        | -       | Width       |
| height   | number                | -        | -       | Height      |
| padding  | ViewPadding           | -        | -       | Height      |

```typescript
export declare type ViewPadding = number | number[] | "auto";
export interface GeometryConfig {
  type: ChartType;
  yAxisField: string;
  color?: string;
  label?: string;
  labelOption?: GeometryLabelCfg;
  style?: React.CSSProperties;
  adjust?: string | string[] | AdjustOption | AdjustOption[];
}
export interface CoordinateConfig {
  type?: "rect" | "polar" | "theta" | "helix";
  option?: CoordinateCfg;
  isTranspose?: boolean;
  scale?: [number, number];
}

export declare type ScaleConfig = Partial<{
  /** The corresponding field id */
  field: string;
  /** Input domain, domain */
  values: any[];
  /** The minimum value of the domain. domain in d3, limits in ggplot2. Invalid for categorical types */
  min: any;
  /** The maximum value of the domain. Invalid for categorical types */
  max: any;
  /** The minimum domain value in strict mode. Once set, ticks are forced to start from the minimum value */
  minLimit?: any;
  /** The maximum domain value in strict mode. Once set, ticks are forced to end at the maximum value */
  maxLimit?: any;
  /** The display alias of the data field. Not perceived inside scale, injected externally */
  alias: string;
  /** Output domain, range. The default value is [0, 1] */
  range: number[];
  /** Valid for Log, the base */
  base: number;
  /** Valid for Pow, the exponent */
  exponent: number;
  /** Automatically adjust min, max */
  nice: boolean;
  /** Used to specify ticks, with the highest priority */
  ticks: any[];
  /** tick interval. Only applicable to categorical and time types, with a higher priority than tickCount */
  tickInterval: number;
  /** Minimum tick interval. Only applicable to linear types */
  minTickInterval: number;
  /** The number of ticks. The default value is 5 */
  tickCount: number;
  /** The maximum value of ticks. The default value is 10 */
  maxTickCount: number;
  /** The tick formatter function. It affects how data is displayed on the axis, legend, and tooltip */
  formatter: (v: any, k?: number) => any;
  /** The algorithm for calculating ticks */
  tickMethod: string | TickMethod;
  /** Valid for the time and timeCat time measures */
  mask?: string;
}>;
```

[axiscfg]: https://g2.antv.vision/zh/docs/api/interfaces/axiscfg
[legendcfg]: https://g2.antv.vision/zh/docs/api/interfaces/legendcfg
[tooltipcfg]: https://g2.antv.vision/zh/docs/api/interfaces/tooltipcfg

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
