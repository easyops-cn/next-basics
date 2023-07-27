[//]: # "business-bricks/cmdb-instances/delete-confirm.ts"

# INPUTS

| params      | type      | required | default | description                                                                    |
| ----------- | --------- | -------- | ------- | ------------------------------------------------------------------------------ |
| provider    | BrickConf | ✔️       | -       | 删除实例所调用的 api 接口， 同平台 provider 配置相同                           |
| redirectUrl | string    | -️       | -       | 删除实例后跳转到相应 url                                                       |
| title       | string    | -️       | -       | 删除确认框标题                                                                 |
| content     | string    | ️✔️      | -       | 删除确认框内容，支持模板变量，变量的上下文为调用确认框 open 方法时所传入的数据 |

> tips: 触发确认框显示需要调用 `presentational-bricks.modal-confirm` 中 `open()` 方法, 该方法所传入的参数会赋值到 `presentational-bricks.modal-confirm` 该构件实例上, 其中 dataSSource 属性为提供模板变量的上下文。

```
调用示例:
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
