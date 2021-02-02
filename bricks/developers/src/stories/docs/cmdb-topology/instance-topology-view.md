[//]: # "business-bricks/cmdb-topology/instance-topology-view-template.ts"

这是一个模板构件，使用时需要传入一个  参数

# INPUTS

| params                       | type                     | required | default                       | description                                                         |
| ---------------------------- | ------------------------ | -------- | ----------------------------- | ------------------------------------------------------------------- |
| objectId                     | string                   | ✔️       | -                             | CMDB object id                                                      |
| instanceId                   | string                   | ✔️       | -                             | CMDB instance id                                                    |
| viewId                       | string                   | -️       | -                             | 已保存的视图 id. (数据保存在 CMDB 中，模型为 `_TOPO_INSTANCE_VIEW`) |
| initViewData                 | InstanceTopologyViewData | -️       | -                             | 初始化视图数据                                                      |
| disabledZoom                 | boolean                  | -️       | false                         | 禁用缩放功能                                                        |
| disabledDrag                 | boolean                  | -️       | false                         | 禁用拖动功能                                                        |
| disabledHideEmptyNodesButton | boolean                  | -️       | false                         | 禁用隐藏无实例节点功能                                              |
| hideEmptyNodes               | boolean                  | -️       | false                         | 默认隐藏无实例节点                                                  |
| disabledCenterButton         | boolean                  | -️       | false                         | 禁用居中按钮功能                                                    |
| autoCenter                   | boolean                  | -️       | false                         | 启用自动居中（初次展示时）                                          |
| autoScale                    | boolean                  | -️       | false                         | 启用自动缩放（初次展示时）                                          |
| popoverButtons               | PopoverButton[]          | -        | `DEFAULT_POPOVERBUTTONS` 如下 | 详情弹框中下方的跳转链接配置                                        |

**PopoverButton 中的 urlTemplate 其占位符仅支持 `objectId` and `instanceId`**

```typescript
interface PopoverButton {
  text: string;
  urlTemplate: string;
  buttonType?: ButtonType;
  target?: string;
}

// 默认的 popoverButtons
const DEFAULT_POPOVERBUTTONS: PopoverButton[] = [
  {
    text: "实例详情",
    urlTemplate: `/#{objectId}/instance/#{instanceId}`,
    target: "_blank",
  },
  {
    text: "关系查询",
    urlTemplate: `/#{objectId}/list/relation-query-multiple?leftInstanceIds=#{instanceId}`,
    target: "_blank",
  },
];

interface InstanceTopologyChildNodeViewData {
  parentOut: string;
  fileds?: string[];
  query?: any;
  child?: InstanceTopologyChildNodeViewData[];
}

interface InstanceTopologyViewData {
  object_id: string;
  fileds?: string[];
  query?: any;
  child?: InstanceTopologyChildNodeViewData[];
}
```

# EVENTS

| type | detail | description |
| ---- | ------ | ----------- |
| -    | -      | -           |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
