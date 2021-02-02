import { Story } from "../../../interfaces";
import docMD from "../../../docs/basic-bricks/fold-brick.md";

export const story: Story = {
  storyId: "basic-bricks.fold-brick",
  type: "brick",
  author: "momo",
  text: {
    en: "fold brick",
    zh: "折叠容器",
  },
  deprecated: true,
  description: {
    en: "",
    zh: "已废弃，请使用basic-bricks.fold-brick-v2",
  },
  icon: {
    lib: "fa",
    icon: "chevron-down",
  },
  conf: {
    brick: "basic-bricks.fold-brick",
    properties: {
      foldName: "查看",
      useBrick: {
        brick: "code-bricks.code-display",
        properties: {
          showLineNumber: true,
          language: "js",
          value: "const a = 1;",
        },
      },
    },
  },
  doc: docMD,
};
