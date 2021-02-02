[//]: # "business-bricks/cmdb-instances/multiple-instance-delete-template.ts"

# 描述

基于[多实例删除模态框](developers/brick-book/brick/cmdb-instances.instance-delete)构造的多实例删除场景，表现形式为按钮状态

# INPUTS

| property    | type                                                      | required | default | description                                                                       |
| ----------- | --------------------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------- |
| btnName     | `string`                                                  | -        | 删除    | 按钮名称                                                                          |
| instanceIds | `string[]`                                                | ✔️       | -       | 需要删除的实例 Id                                                                 |
| objectId    | `string`                                                  | ✔️       | -       | 模型 Id                                                                           |
| type        | `default \| primary \| ghost \| dashed \| danger \| link` | -        | danger  | 删除样式                                                                          |
| events      | BrickEventsMap                                            | -        | -       | 跟平台一样的事件配置， 目前支持 delete.multi.success 和 delete.multi.success 事件 |

```typescript
export interface BrickEventsMap {
  [key: string]: BrickEventHandler | BrickEventHandler[];
}
export declare type BrickEventHandler =
  | BuiltinBrickEventHandler
  | CustomBrickEventHandler;
export interface BuiltinBrickEventHandler {
  action:
    | "history.push"
    | "history.replace"
    | "console.log"
    | "console.error"
    | "console.warn"
    | "console.info";
  args?: any[];
}
export interface CustomBrickEventHandler {
  target: string;
  method: string;
  multiple?: boolean;
  args?: any[];
}
```
