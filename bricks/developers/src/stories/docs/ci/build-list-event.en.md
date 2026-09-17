[//]: # "business-bricks/ci/build-list-event.ts"
[//]: # "business-bricks/ci/build-list-branch.ts"

# INPUTS

| property | type    | required | default | description  |
| -------- | ------- | -------- | ------- | ------------ |
| gitMeta  | GitMeta | true     | -       | git metadata |

```typescript
interface GitMeta {
  /** git event */
  event: "push" | "tag" | "pull_request";

  /** Previous commit sha */
  before: string;

  /** Current commit sha */
  after: string;

  /** Author avatar */
  author_avatar: string;

  /** Author email */
  author_email: string;

  /** Author */
  author_name: string;

  /** Commit message */
  message: string;

  /** Ref */
  ref: string;

  /** Source branch */
  source: string;

  /** Target branch */
  target: string;

  /** Trigger method */
  trigger: "hook" | "exec";

  /** Action */
  action: string;

  /** Link */
  link: string;
}
```
