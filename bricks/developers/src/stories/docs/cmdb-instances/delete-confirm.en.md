[//]: # "business-bricks/cmdb-instances/delete-confirm.ts"

# INPUTS

| params      | type      | required | default | description                                                                                                                                                                                     |
| ----------- | --------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| provider    | BrickConf | ✔️       | -       | The api used to delete the instance, configured the same as the platform provider                                                                                                               |
| redirectUrl | string    | -️       | -       | The url to navigate to after the instance is deleted                                                                                                                                            |
| title       | string    | -️       | -       | The title of the delete confirmation dialog                                                                                                                                                     |
| content     | string    | ️✔️      | -       | The content of the delete confirmation dialog. Template variables are supported, and the context of the variables is the data passed in when calling the open method of the confirmation dialog |

> tips: To trigger the display of the confirmation dialog, you need to call the `open()` method of `presentational-bricks.modal-confirm`. The params passed to this method are assigned to the `presentational-bricks.modal-confirm` brick instance, where the dataSSource property provides the context of the template variables.

```
Usage example:
{
    target: "presentational-bricks.modal-confirm",
    method: "open",
    args: [{detail: {dataSource: {name: "bbb"}}}]
}
```

```typescript
export interface BrickConf<T = any> {
  brick?: string;
  slots?: SlotsConf;
  injectDeep?: boolean;
  properties?: T;
  events?: BrickEventsMap;
  bg?: boolean;
  lifeCycle?: BrickLifeCycle;
  internalUsedBricks?: string[];
  internalUsedTemplates?: string[];
  template?: string;
  params?: Record<string, any>;
}
```
