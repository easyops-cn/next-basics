[//]: # "business-bricks/ci/pipeline-trigger.ts"

# INPUTS

| property     | type                                  | required | default | description    |
| ------------ | ------------------------------------- | -------- | ------- | -------------- |
| projectId    | string                                | true     | -       | 项目 id        |
| pipelineData | Partial<PipelineModels.ModelPipeline> | true     | -       | 项目流水线信息 |

```typescript
interface ModelPipeline {
  /** 流水线id，服务端自动生成 */
  id: string;

  /** 流水线名称 */
  alias_name: string;

  /** yaml文件内容 */
  workflow_type: "yaml_path" | "yaml_string" | "yaml_url" | "yaml_template";

  /** 模版版本 */
  template_version: "produce" | "test";

  /** workflow yaml存放位置 */
  yaml_path: string;

  /** workflow定义字符串 */
  yaml_string: string;

  /** workflow定义url */
  yaml_url: string;

  /** timeout Minute */
  step_timeout: number;

  /** 流水线全局变量 */
  variables: {
    /** name */
    name?: string;

    /** value */
    value?: string;
  }[];

  /** 通知 */
  notify: {
    /** 通知时间点，构建开始时/构建成功时/构建失败时 */
    mode?: ("OnStart" | "OnSucceed" | "OnFail")[];

    /** 通知方式 */
    methods?: string[];

    /** 通知用户列表 */
    users?: string[];

    /** 通知用户组列表 */
    user_groups?: string[];
  };

  /** 创建者, 服务端自动生成 */
  creator: string;

  /** 创建时间, 服务端自动生成 */
  ctime: string;

  /** 修改时间, 服务端自动生成 */
  mtime: string;
}
```
