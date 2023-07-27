[//]: # "atom-bricks/form-input/time-range-picker.ts"

<details>
<summary>History</summary>

| Version | Change                        |
| ------- | ----------------------------- |
| 1.28.0  | 新增 `time.range.change` 事件 |
| 1.59.0  | 新增 `rangeType` 属性         |

</details>

# INPUTS

| property  | type        | required | default                                            | description |
| --------- | ----------- | -------- | -------------------------------------------------- | ----------- |
| name      | `string`    | ✔️       | -                                                  | 字段名      |
| label     | `string`    | -        | -                                                  | 字段说明    |
| value     | `TimeRange` | -        | { "startTime": "00:00:00", "endTime": "23:59:59" } | 初始值      |
| required  | `boolean`   | -        | false                                              | 是否必填    |
| rangeType | `RangeType` | -        | "time"                                             | 时间段类型  |

```typescript
export interface TimeRange {
  startTime: string;
  endTime: string;
}

export type RangeType = "time" | "date" | "dateTime";
```

# EVENTS

| type                | detail      | description                                                           |
| ------------------- | ----------- | --------------------------------------------------------------------- |
| `time.range.change` | `TimeRange` | 时间段变化时触发，`event.detail` 为包含起始时间和结束时间的时间段范围 |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
