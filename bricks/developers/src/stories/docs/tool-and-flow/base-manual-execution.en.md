[//]: # "business-bricks/tool-and-flow/base-manual-execution.ts"

# INPUTS

| property        | type                                           | required | default    | description                                   |
| --------------- | ---------------------------------------------- | -------- | ---------- | --------------------------------------------- |
| layout          | "horizontal" &#124; "vertical" &#124; "inline" | false    | horizontal | Form layout                                      | - |
| labelCol        | ColProps                                       | false    | -          | Layout style of the form item label, same as anted        | - |
| wrapperCol      | ColProps                                       | false    | -          | Layout style of the form item control, same as anted           | - |
| executeProvider | BrickConfig[]                                  | true     | -          | List of providers required for the flow tool execution            | - |
| toolSteps       | StepListProps                                  | true     | -          | Configuration items of the steps related to the tool flow execution. The related fields are shown in the figure below | - |

### toolSteps

| property  | type               | required | default | description                                                                                                                                                         |
| --------- | ------------------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title     | string             | true     | -       | Description of each step                                                                                                                                                | - |
| fields    | array[]            | true     | -       | Parameter configuration of the form content under each step. For the configuration items of fields, refer to [fields](developers/brick-book/brick/presentational-bricks.brick-form) in brick-form                            | - |
| lifeCycle | BrickLifeCycle     | false    | -       | The same usage as the platform lifeCycle; it defines the use of providers under each step                                                                                                     | - |
| events    | FormEventTypeProps | true     | -       | The same usage as the platform events. Switching steps triggers the brick.form.update event, and submitting the form triggers the brick.form.submit event. Both events pass the form data of each step out as event.detail | - |

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
| brick.form.update | Form data of each step | This event is triggered when switching steps, and the form data of that step is passed out |
| brick.form.submit | Submitted form data     | This event is triggered when the form is submitted, and the form data is passed out       |

# METHODS

| name | params | description |
| ---- | ------ | ----------- |
| -    | -      | -           |
