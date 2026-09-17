[//]: # "business-bricks/ci/workflow-editor.ts"

# INPUTS

| property     | type                   | required | default | description                                              |
| ------------ | ---------------------- | -------- | ------- | -------------------------------------------------------- |
| workflow     | Workflow               | true     | -       | Workflow definition (converted from the yaml definition of the workload, see below) |
| features     | WorkflowEditorFeatures | -        | -       | Workflow editing features                                           |
| readonly     | boolean                | -        | -       | Whether it is editable                                               |
| unselectable | boolean                | -        | -       | Whether the stages and steps in the workflow are selectable                           |

### Workflow

| property | type     | required | default | description  |
| -------- | -------- | -------- | ------- | ------------ |
| kind     | string   | true     | -       | Workflow kind   |
| name     | string   | true     | -       | Workflow name   |
| stages   | Stage[]  |          | -       | Workflow steps   |
| volumes  | Volume[] | -        | -       | Workflow volumes |

### WorkflowEditorFeatures

| property    | type    | required | default | description                          |
| ----------- | ------- | -------- | ------- | ------------------------------------ |
| stageEditor | boolean | -        | -       | Whether the stage-step editor is enabled. Enabled by default when not configured |
| stepEditor  | boolean | -        | -       | Whether the step editor is enabled. Enabled by default when not configured |

##### Stage

| property | type                     | required | default | description  |
| -------- | ------------------------ | -------- | ------- | ------------ |
| name     | string                   | true     | -       | Stage name     |
| parallel | boolean                  | true     | -       | Whether the stage runs in parallel |
| steps    | PluginStep \| CustomStep | true     | -       | Stage steps     |

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
| workflow.change  | {workflow:Workflow,hasError:boolean} | Triggered when the workflow changes         |
| isEditing.change | boolean                              | Triggered when the workflow editing state changes |
| stage.select     | { stage:Stage, isAdding:boolean }    | Triggered when a stage is selected           |
| step.select      | {step:Step, isAdding:boolean}        | Triggered when a step is selected           |
