[//]: # "atom-bricks/form-input/input-with-unit.ts"

<details>
<summary>History</summary>

| Version | Change                                  |
| ------- | --------------------------------------- |
| 1.43.0  | 新增构件 `forms.input-with-unit`        |
| 1.55.0  | 新增属性，`precision`, `availableUnits` |

</details>

# INPUTS

| property       | type       | required | default | description                                       |
| -------------- | ---------- | -------- | ------- | ------------------------------------------------- |
| name           | `string`   | ✔️       | -       | 字段名                                            |
| label          | `string`   | -        | -       | 字段说明                                          |
| unit           | `string`   | ✔️       | -       | 使用单位                                          |
| unitType       | `UnitType` | ✔️       | -       | 单位类型，目前支持 "time" \| "byte" \| "byteRate" |
| value          | `number`   | -        | -       | 初始值                                            |
| required       | `boolean`  | -        | false   | 是否必填                                          |
| placeholder    | `string`   | -        | -       | 占位说明                                          |
| inputBoxStyle  | `object`   | -        |         | 输入框样式                                        |
| precision      | `number`   | -        | 0       | 单位转换精确度；如果为 0，仅当整除时才转换        |
| availableUnits | `string[]` | -        | -       | 可使用单位列表                                    |

```typescript
// 不同类型的可用单位列表
const timeUnits = ["ms", "s", "min", "hour", "day", "week"];
const byteUnits = ["b", "B", "KB", "MB", "GB"];
const byteRateUnits = ["bps", "Bps", "KBps", "MBps", "GBps"];
```

# EVENTS

| type                             | detail   | description            |
| -------------------------------- | -------- | ---------------------- |
| `general.input-with-unit.change` | `number` | 输入框或单位变化时触发 |

<!-- uncomment this block when applicable.
# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
-->
