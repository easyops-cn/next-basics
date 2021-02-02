import { Story } from "../../../interfaces";
import docMD from "../../../docs/presentational-bricks/code-editor.md";

export const story: Story = {
  storyId: "presentational-bricks.code-editor",
  type: "brick",
  author: "lynette",
  text: {
    en: "Code Editor(Legacy)",
    zh: "代码编辑构件",
  },
  deprecated: true,
  description: {
    en: "suport Shell、Python、CSS、HTML highlight",
    zh: "支持Shell、Python、CSS、HTML等语法高亮",
  },
  icon: {
    lib: "antd",
    type: "code",
  },
  conf: [
    {
      brick: "presentational-bricks.code-editor",
      properties: {
        mode: "yaml",
        theme: "monokai",
        setOptions: {
          printMargin: false,
          maxLines: "Infinity",
          tabSize: 2,
        },
        configProps: {
          width: "100%",
        },
        value: '- a: "b"\n- c: "d"',
      },
      events: {
        "code.change": {
          action: "console.log",
        },
        "editor.blur": {
          action: "console.log",
        },
        "code.error.change": {
          action: "console.log",
        },
      },
    },
    {
      brick: "presentational-bricks.code-editor",
      properties: {
        mode: "json",
        theme: "tomorrow",
        setOptions: {
          printMargin: false,
          maxLines: 10,
          tabSize: 2,
        },
        configProps: {
          width: "100%",
        },
        value: '{\n  "a": "b"\n}',
      },
      events: {
        "code.change": {
          action: "console.log",
        },
        "editor.blur": {
          action: "console.log",
        },
        "code.error.change": {
          action: "console.log",
        },
      },
    },
  ],
  doc: docMD,
};
