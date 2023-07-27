[//]: # "business-bricks/ci/workflow-editor.ts"

# INPUTS

| property     | type                   | required | default | description                                              |
| ------------ | ---------------------- | -------- | ------- | -------------------------------------------------------- |
| workflow     | Workflow               | true     | -       | 工作流定义（从 workload 的 yaml 定义转换而来，参考如下） |
| features     | WorkflowEditorFeatures | -        | -       | 工作流编辑功能                                           |
| readonly     | boolean                | -        | -       | 是否可编辑                                               |
| unselectable | boolean                | -        | -       | 工作流中的阶段，步骤是否可选择                           |

### Workflow

| property | type     | required | default | description  |
| -------- | -------- | -------- | ------- | ------------ |
| kind     | string   | true     | -       | 工作流类型   |
| name     | string   | true     | -       | 工作流名称   |
| stages   | Stage[]  |          | -       | 工作流步骤   |
| volumes  | Volume[] | -        | -       | 工作流存储卷 |

### WorkflowEditorFeatures

| property    | type    | required | default | description                          |
| ----------- | ------- | -------- | ------- | ------------------------------------ |
| stageEditor | boolean | -        | -       | 是否阶段步骤编辑器，未配置时默认启用 |
| stepEditor  | boolean | -        | -       | 是否启用步骤编辑器，未配置时默认启用 |

##### Stage

| property | type                     | required | default | description  |
| -------- | ------------------------ | -------- | ------- | ------------ |
| name     | string                   | true     | -       | 阶段名称     |
| parallel | boolean                  | true     | -       | 阶段是否并行 |
| steps    | PluginStep \| CustomStep | true     | -       | 阶段步骤     |

##### Step

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

##### Volume

```typescript
interface BaseVolume {
  name: string;
}

interface EmptyDirVolume extends BaseVolume {
  emptyDir: {};
}

interface HostPathVolume extends BaseVolume {
  hostPath: {
    path: string;
  };
}

type Volume = EmptyDirVolume | HostPathVolume;
```

# EVENTS

| type             | detail                               | description              |
| ---------------- | ------------------------------------ | ------------------------ |
| workflow.change  | {workflow:Workflow,hasError:boolean} | 工作流变更时触发         |
| isEditing.change | boolean                              | 工作流编辑状态改变时触发 |
| stage.select     | { stage:Stage, isAdding:boolean }    | 选中阶段时触发           |
| step.select      | {step:Step, isAdding:boolean}        | 选中步骤时触发           |
