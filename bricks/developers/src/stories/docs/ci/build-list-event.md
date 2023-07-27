[//]: # "business-bricks/ci/build-list-event.ts"
[//]: # "business-bricks/ci/build-list-branch.ts"

# INPUTS

| property | type    | required | default | description |
| -------- | ------- | -------- | ------- | ----------- |
| gitMeta  | GitMeta | true     | -       | git 元数据  |

```typescript
interface GitMeta {
  /** git事件 */
  event: "push" | "tag" | "pull_request";

  /** 前一个commit sha */
  before: string;

  /** 当前commit sha */
  after: string;

  /** 提交者图像 */
  author_avatar: string;

  /** 提交者邮箱 */
  author_email: string;

  /** 提交者 */
  author_name: string;

  /** 提交信息 */
  message: string;

  /** 引用 */
  ref: string;

  /** 源分支 */
  source: string;

  /** 目标分支 */
  target: string;

  /** 触发方式 */
  trigger: "hook" | "exec";

  /** 动作 */
  action: string;

  /** 链接 */
  link: string;
}
```
