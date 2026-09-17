[//]: # "business-bricks/ci/workflow-step-editor.ts"

# INPUTS

| property         | type                     | required | default | description                                |
| ---------------- | ------------------------ | -------- | ------- | ------------------------------------------ |
| fixedLayout      | boolean                  | -        | -       | Fixed layout or responsive layout of the edit step form |
| onlyFields       | boolean                  | -        | -       | Whether to show only the form fields       |
| step             | PluginStep \| CustomStep | true     | -       | A step of the workflow                     |
| workflow         | Workflow                 | true     | -       | Workflow definition                        |
| pluginCategories | string[]                 | -        | -       | Step plugin category                       |
| plugins          | PipelinePlugin[]         | -        | -       | Step plugin list                           |

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

##### PipelinePlugin Configurations

| property    | type   | required | default | description       |
| ----------- | ------ | -------- | ------- | ----------------- |
| instanceId  | string | true     | -       | Plugin instanceId |
| name        | string | true     | -       | Plugin name       |
| description | string | true     | -       | Plugin description |
| category    | string | true     | -       | Plugin category   |

# EVENTS

| type             | detail                                | description                              |
| ---------------- | ------------------------------------- | ---------------------------------------- |
| validate.success | Step                                  | Triggered when the step is edited successfully |
| validate.error   | { errors: any, stage: Stage }         | Triggered when editing the step fails    |
| show-plugin      | { pluginId:string, versionId:string } | Triggered when viewing the plugin        |
