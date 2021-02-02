import { Story } from "../../../interfaces";
import docMD from "../../../docs/ci/build-list-event.md";

export const story: Story = {
  storyId: "ci.build-list-event",
  type: "brick",
  text: {
    en: "Git Event",
    zh: "显示Git Event",
  },
  description: {
    en: "",
    zh: "根据git元数据，显示git操作对应的事件信息（mr,push,tag）",
  },
  icon: {
    lib: "easyops",
    category: "ci",
    icon: "gitlab",
  },
  conf: [
    {
      brick: "ci.build-list-event",
      properties: {
        gitMeta: {
          author_name: "lynette",
          source: "!123",
          ref: "refs/merge-requests/45",
          after: "22435464646",
        },
      },
    },
    {
      brick: "ci.build-list-event",
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
