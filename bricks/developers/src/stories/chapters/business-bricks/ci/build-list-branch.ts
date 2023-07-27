import { Story } from "../../../interfaces";
import docMD from "../../../docs/ci/build-list-event.md";

export const story: Story = {
  storyId: "ci.build-list-branch",
  type: "brick",
  text: {
    en: "Git Branch",
    zh: "显示Git Branch",
  },
  description: {
    en: "",
    zh: "根据git元数据，显示git操作对应的的分支信息（source->target）",
  },
  icon: {
    lib: "easyops",
    category: "app",
    icon: "brick-group",
  },
  conf: [
    {
      brick: "ci.build-list-branch",
      properties: {
        gitMeta: {
          author_name: "lynette",
          source: "!123",
          target: "develop",
          ref: "refs/merge-requests/45",
          after: "22435464646",
        },
      },
    },
    {
      brick: "ci.build-list-branch",
      properties: {
        gitMeta: {
          author_name: "lynette",
          ref: "refs/heads/master",
          after: "22435464646",
        },
      },
    },
  ],
  doc: docMD,
};
