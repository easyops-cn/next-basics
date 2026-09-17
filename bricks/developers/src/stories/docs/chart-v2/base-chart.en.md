[//]: # "atom-bricks/chart-v2/base-chart.ts"

<details>
<summary>History</summary>

| Version | Change                                                  |
| ------- | ------------------------------------------------------- |
| 1.0.0   | Add brick `chart-v2.base-chart`                          |
| 1.3.0   | Add properties `axis.xAxis.type`, `series.[field].isNegative` |
| 1.32.0  | Add property `label`, add event `chart-v2.plot.click`         |

</details>

This is an encapsulation of other chart types. As a base class, its subclasses are

- line-chart
- area-chart
- bar-chart
- horizontal-bar-chart
- pie-chart
- donut-chart

# INPUTS

| property    | type                      | required | default | description                                      |
| ----------- | ------------------------- | -------- | ------- | ------------------------------------------------ |
| data        | Record<string, any>[]     | ✔️       | -       | Chart data                                         |
| width       | number                    | -        | -       | Width                                             |
| height      | number                    | -        | -       | Height                                             |
| padding     | ViewPadding               | -        | -       | Canvas padding                                     |
| xField      | string                    | -        | -       | x-axis field                                         |
| yField      | string                    | -        | -       | y-axis field                                         |
| label       | Label                     | -        | -       | Configure the shape text                                     |
| rightYField | string                    | -        | -       | Right y-axis field                                      |
| groupField  | string                    | -        | -       | Classification field                                         |
| axis        | Record<`field`, BaseAxis> | -        | -       | Axis settings                                       |
| threshold   | Threshold                 | -        | -       | Threshold line, effective for line charts, area charts, bar charts and horizontal bar charts |

### BaseAxis

| property   | type   | required | default | description                     |
| ---------- | ------ | -------- | ------- | ------------------------------- |
| min        | number | -        | -       | Minimum value of the axis                    |
| max        | number | -        | -       | Maximum value of the axis                    |
| unit       | string | -        | -       | Unit                            |
| labelField | string | -        | -       | The value of this field will be displayed as a label |

### Threshold

| property    | type              | required | default | description |
| ----------- | ----------------- | -------- | ------- | ----------- |
| value       | number            | ✔️       | -       | Threshold value        |
| textContent | string            | ✔️       | -       | Threshold text    |
| color       | string            | -        | -       | Threshold line color  |
| lineType    | "dash" \| "solid" | -        | "solid" | Solid line by default    |

# EVENTS

| type           | detail                                          | description                                                              |
| -------------- | ----------------------------------------------- | ------------------------------------------------------------------------ |
| chart-v2.click | { data: any, clientX: number, clientY: number } | data represents the data of that point and is an object; clientX, clientY are the screen position where the click event occurred |

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
