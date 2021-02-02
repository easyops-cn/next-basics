import { Story } from "../../../interfaces";
import docMD from "../../../docs/code-bricks/code-display.md";

export const story: Story = {
  storyId: "code-bricks.code-display",
  type: "brick",
  author: "lynette",
  text: {
    en: "Code Display",
    zh: "代码展示构件",
  },
  description: {
    en: "suport Shell、Python、CSS、HTML highlight",
    zh: "支持Shell、Python、CSS、HTML等语法高亮",
  },
  icon: {
    lib: "fa",
    icon: "file-code",
  },
  conf: [
    {
      brick: "code-bricks.code-display",
      properties: {
        showLineNumber: true,
        language: "js",
        value: "const a = 1;",
      },
    },
    {
      brick: "code-bricks.code-display",
      properties: {
        language: "css",
        value:
          ".container{ \n  background: #ccc;\n  font-size: 16px;\n  line-height: 20px;\n  position: relative;\n}",
        minLines: 3,
        maxLines: 8,
      },
    },
  ],
  doc: docMD,
};
