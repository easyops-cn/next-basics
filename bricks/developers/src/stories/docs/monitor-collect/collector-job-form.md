[//]: # "business-bricks/monitor-collect/collector-job-form.ts"

# INPUTS

| property             | type                     | required | default | description                                             |
| -------------------- | ------------------------ | -------- | ------- | ------------------------------------------------------- |
| objectId             | string                   | ✔️       | -       | CMDB 模型 ID                                            |
| jobId                | string                   | -        | -       | 采集任务 ID, 若设置则更新采集任务，若为空则新建采集任务 |
| submitSuccessHandler | BuiltinBrickEventHandler | ✔️       | -       | 更新或新建采集任务成功后的事件处理, 通常为跳转 url      |

```typescript
export interface BuiltinBrickEventHandler {
  action:
    | "history.push"
    | "history.replace"
    | "history.goBack"
    | "history.goForward"
    | "location.reload"
    | "console.log"
    | "console.error"
    | "console.warn"
    | "console.info";
  args?: any[];
}

const propertiesExample = {
  objectId: "HOST",
  submitSuccessHandler: {
    action: "history.push",
    args: ["/collector-job/${EVENT.detail.instanceId}"],
  },
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
