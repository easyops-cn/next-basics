[//]: # "business-bricks/ci/build-actions.ts"

# INPUTS

| property | type       | required | default | description    |
| -------- | ---------- | -------- | ------- | -------------- |
| build    | ModelBuild | true     | -       | 流水线构建信息 |

```typescript
interface ModelBuild {
  /** 任务id, 服务端自动生成 */
  id: string;

  /** 项目id, 服务端自动生成 */
  projectId: string;

  /** 流水线id, 服务端自动生成 */
  pipelineId: string;

  /** git信息, 创建的时候传入，不能修改 */
  git_meta: Partial<ModelGitMeta>;

  /** 触发者，创建的时候传入，不能修改 */
  sender: string;

  /** 制品包信息 */
  artifact: {
    /** 程序包Id */
    packageId?: string;

    /** 版本Id */
    versionId?: string;

    /** 制品包名称 */
    packageName?: string;

    /** 版本号 */
    versionName?: string;

    /** 制品包上传时间 */
    ctime?: string;
  };

  /** 创建时间，创建的时候传入，不能修改 */
  created: number;

  /** workflow定义 */
  yaml_string: string;

  /** stage 状态 */
  stages: Partial<ModelStageStatus>[];

  /** 执行状态 */
  status: Partial<ModelBuildStatus>;

  /** 编号 */
  number: string;

  /** 事件列表 */
  events: string[];
}
```
