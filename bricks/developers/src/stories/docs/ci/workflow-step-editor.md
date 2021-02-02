[//]: # "business-bricks/ci/workflow-step-editor.ts"

# INPUTS

| property         | type                     | required | default | description                        |
| ---------------- | ------------------------ | -------- | ------- | ---------------------------------- |
| fixedLayout      | boolean                  | -        | -       | 编辑步骤表单固定布局 or 响应式布局 |
| onlyFields       | boolean                  | -        | -       | 是否只展示表单字段                 |
| step             | PluginStep \| CustomStep | true     | -       | 工作流某步骤                       |
| workflow         | Workflow                 | true     | -       | 工作流定义                         |
| pluginCategories | string[]                 | -        | -       | 步骤插件分类                       |
| plugins          | PipelinePlugin[]         | -        | -       | 步骤插件列表                       |

```typescript
interface BaseStep {
  name?: string;
  image?: string;
  description?: string;
  privileged?: boolean;
  env?: { name: string; value?: string | number | boolean }[];
  volumeMounts?: VolumeMount[];
  imagePullPolicy?: "always" | "if-not-present" | "never";
  timeout?: number;
}

interface PluginStep extends BaseStep {
  category?: string;
  mode?: "plugin";
  plugin?: string;
  version?: string;
  settings?: Record<string, any>;
}

interface CustomStep extends BaseStep {
  category?: "custom";
  commands?: string[];
}
```

##### PipelinePlugin 配置项

| property    | type   | required | default | description     |
| ----------- | ------ | -------- | ------- | --------------- |
| instanceId  | string | true     | -       | 插件 instanceId |
| name        | string | true     | -       | 插件名称        |
| description | string | true     | -       | 插件描述        |
| category    | string | true     | -       | 插件分类        |

# EVENTS

| type             | detail                                | description      |
| ---------------- | ------------------------------------- | ---------------- |
| validate.success | Step                                  | 编辑步骤成功触发 |
| validate.error   | { errors: any, stage: Stage }         | 编辑步骤失败触发 |
| show-plugin      | { pluginId:string, versionId:string } | 查看插件时触发   |
