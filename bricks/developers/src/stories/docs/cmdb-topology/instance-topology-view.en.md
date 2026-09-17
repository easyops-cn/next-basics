[//]: # "business-bricks/cmdb-topology/instance-topology-view-template.ts"

This is a template brick. A parameter must be passed in when using it.

# INPUTS

| params                       | type                     | required | default                       | description                                                         |
| ---------------------------- | ------------------------ | -------- | ----------------------------- | ------------------------------------------------------------------- |
| objectId                     | string                   | ✔️       | -                             | CMDB object id                                                      |
| instanceId                   | string                   | ✔️       | -                             | CMDB instance id                                                    |
| viewId                       | string                   | -️       | -                             | The saved view id. (The data is saved in CMDB, with the model `_TOPO_INSTANCE_VIEW`) |
| initViewData                 | InstanceTopologyViewData | -️       | -                             | The initialized view data                                                      |
| disabledZoom                 | boolean                  | -️       | false                         | Disable the zoom feature                                                        |
| disabledDrag                 | boolean                  | -️       | false                         | Disable the drag feature                                                        |
| disabledHideEmptyNodesButton | boolean                  | -️       | false                         | Disable the feature of hiding nodes without instances                                              |
| hideEmptyNodes               | boolean                  | -️       | false                         | Hide nodes without instances by default                                                  |
| disabledCenterButton         | boolean                  | -️       | false                         | Disable the center button feature                                                    |
| autoCenter                   | boolean                  | -️       | false                         | Enable auto centering (on first display)                                          |
| autoScale                    | boolean                  | -️       | false                         | Enable auto scaling (on first display)                                          |
| popoverButtons               | PopoverButton[]          | -        | `DEFAULT_POPOVERBUTTONS` as below | The redirect link configuration at the bottom of the detail popover                                        |

**The placeholders of urlTemplate in PopoverButton only support `objectId` and `instanceId`**

```typescript
interface PopoverButton {
  text: string;
  urlTemplate: string;
  buttonType?: ButtonType;
  target?: string;
}

// The default popoverButtons
const DEFAULT_POPOVERBUTTONS: PopoverButton[] = [
  {
    text: "Instance Details",
    urlTemplate: `/#{objectId}/instance/#{instanceId}`,
    target: "_blank",
  },
  {
    text: "Relation Query",
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
