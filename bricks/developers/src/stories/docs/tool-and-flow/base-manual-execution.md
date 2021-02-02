[//]: # "business-bricks/tool-and-flow/base-manual-execution.ts"

# INPUTS

| property        | type                                           | required | default    | description                                   |
| --------------- | ---------------------------------------------- | -------- | ---------- | --------------------------------------------- |
| layout          | "horizontal" &#124; "vertical" &#124; "inline" | false    | horizontal | 表单布局                                      | - |
| labelCol        | ColProps                                       | false    | -          | 表单子项 label 布局样式，跟 anted 相同        | - |
| wrapperCol      | ColProps                                       | false    | -          | 表单子项控件布局样式，跟 anted 相同           | - |
| executeProvider | BrickConfig[]                                  | true     | -          | 流程工具执行所需要的 provider 列表            | - |
| toolSteps       | StepListProps                                  | true     | -          | 工具流程执行相关步骤的配置项， 相关字段如下图 | - |

### toolSteps

| property  | type               | required | default | description                                                                                                                                                         |
| --------- | ------------------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title     | string             | true     | -       | 每一个步骤的描述内容                                                                                                                                                | - |
| fields    | array[]            | true     | -       | 每一个步骤下的表单内容参数配置，fields 的配置项参考 brick-form 中 [fields](developers/brick-book/brick/presentational-bricks.brick-form)                            | - |
| lifeCycle | BrickLifeCycle     | false    | -       | 跟平台 lifeCycle 使用相同，定义的是每个步骤下的 provider 的使用                                                                                                     | - |
| events    | FormEventTypeProps | true     | -       | 跟平台 events 使用相同，步骤切换是会触发 brick.form.update 事件， 表单提交时会触发 brick.form.submit 事件，两个事件会把每个步骤的表单数据作为 event.detail 传递出来 | - |

```typescript
declare type ColSpanType = number | string;
export interface ColSize {
  span?: ColSpanType;
  order?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
}
export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: ColSpanType;
  order?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
  xs?: ColSpanType | ColSize;
  sm?: ColSpanType | ColSize;
  md?: ColSpanType | ColSize;
  lg?: ColSpanType | ColSize;
  xl?: ColSpanType | ColSize;
  xxl?: ColSpanType | ColSize;
  prefixCls?: string;
}
export interface BrickLifeCycle {
  useResolves?: {
    name: string;
    provider: string;
    method?: string;
    args?: any[];
    field?: string | string[];
  }[];
  didMount?: string;
}

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
  $template?: string;
  $params?: Record<string, any>;
}
export type FormEventType = "brick.form.update" | "brick.form.submit";

export type FormEventTypeProps = {
  [key in FormEventType]: BrickEventHandler | BrickEventHandler[];
};

export interface StepListProps {
  title?: string;
  fields?: FieldDefinition[];
  lifeCycle?: BrickLifeCycle;
  events?: FormEventTypeProps;
}
```

# EVENTS

| type              | detail             | description                                    |
| ----------------- | ------------------ | ---------------------------------------------- |
| brick.form.update | 每一步骤的表单数据 | 切换步骤时会触发该事件，并把该步骤表单数据传出 |
| brick.form.submit | 提交的表单数据     | 提交表单时触发该事件，并把该表单数据传出       |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
