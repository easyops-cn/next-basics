[//]: # "business-bricks/monitor-alert/alert-events-template.ts"

# 描述

告警事件列表

- 支持跳转 url 可配置, 见 `detailUrlTemplate`
  > detailUrlTemplate 跳转 url 配置模板示例 '/alert-events/#{id}/#{time}', 结合告警事件详情数据得到 '/alert-events/5db03d9359b8ce4f99f0f947/1571888594'。模板里面的 key(#{key}) 来自于该行告警记录的数据，支持的具体字段请查看浏览器 network 看告警事件列表的返回
- 可根据 time、ip、appId、alertId 进行过滤，见 `requestParams`
  > time 过滤示例 { time: { base: 1571888600, diffRange: [-600, 600] }}, 将转变成 st = ${base + -600}, et = ${base + 600}, 表示基于 base 时间截的前后 10 分钟范围里
- 也可直接配置 st, et 时间截
- 是否显示卡片、行选择配置，见 `options`

# INPUTS

| params            | type   | required | default | description                                                             |
| ----------------- | ------ | -------- | ------- | ----------------------------------------------------------------------- |
| detailUrlTemplate | string | -        | -       | 告警时间列（第一列）是否可以跳转，跳转 url 通过该配置和告警事件一起得到 |
| requestParams     | 如下   | -        | -       | 告警事件请求参数                                                        |
| options           | 如下   | -        | -       | 是否显示卡片，是否显示列选择选项                                        |

```typescript
interface requestParams?: {
    time?: { base: string; diffRange?: [number, number] };
    st?: number;
    et?: number;
    objectId?: string;
    instanceId?: string;
    ip?: string;
    appId?: string;
    alertId?: string;
  };

 interface options?: {
    rowSelection?: boolean;
    showCard?: boolean;
  };
```

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
