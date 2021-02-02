import { Story } from "../../../interfaces";
import docMD from "../../../docs/code-bricks/code-editor.md";

export const story: Story = {
  storyId: "code-bricks.code-editor",
  type: "brick",
  author: "lynette",
  text: {
    en: "Code Editor",
    zh: "代码编辑构件",
  },
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
      brick: "code-bricks.code-editor",
      properties: {
        mode: "yaml",
        theme: "monokai",
        maxLines: "Infinity",
        value: '- a: "b"\n- c: "d"',
        exportFileName: "content.txt",
      },
      events: {
        "code.change": {
          action: "console.log",
        },
        "editor.blur": {
          action: "console.log",
        },
        "error.change": {
          action: "console.log",
        },
      },
    },
    {
      brick: "code-bricks.code-editor",
      properties: {
        mode: "json",
        theme: "tomorrow",
        maxLines: 10,
        value: '{\n  "a": "b"\n}',
      },
      events: {
        "code.change": {
          action: "console.log",
        },
        "editor.blur": {
          action: "console.log",
        },
        "error.change": {
          action: "console.log",
        },
      },
    },
    {
      brick: "forms.general-form",
      properties: {
        values: {
          properties: '{\n  "a": "b"\n}',
        },
      },
      events: {
        "validate.success": {
          action: "console.log",
          args: ["${EVENT.type}", "${EVENT.detail}"],
        },
        "validate.error": {
          action: "console.warn",
          args: ["${EVENT.type}", "${EVENT.detail}"],
        },
      },
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "code-bricks.code-editor",
              properties: {
                mode: "json",
                theme: "monokai",
                maxLines: 10,
                name: "properties",
                label: "Properties",
                required: true,
                message: {
                  required: "请输入 Properties",
                },
              },
              events: {
                "code.change": {
                  action: "console.log",
                },
                "editor.blur": {
                  action: "console.log",
                },
                "error.change": {
                  action: "console.log",
                },
              },
            },
            {
              brick: "forms.general-buttons",
              properties: {
                showCancelButton: true,
                submitText: "提交",
                cancelText: "取消",
              },
              events: {
                "submit.button.click": {
                  action: "console.log",
                },
                "cancel.button.click": {
                  action: "console.log",
                },
              },
            },
          ],
        },
      },
    },
    {
      brick: "code-bricks.code-editor",
      description: {
        title: "自定义Json schema",
        message:
          "当 `mode` 为 json,yaml,brick_next,brick_next_yaml 之一时会根据该 `jsonSchema` 进行校验",
      },
      properties: {
        mode: "json",
        theme: "monokai",
        maxLines: "Infinity",
        value: '{\n  "tags": ["tag1","tag2"]\n}',
        jsonSchema: {
          type: "object",
          additionalProperties: false,
          properties: {
            tags: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
          $schema: "http://json-schema.org/draft-07/schema#",
        },
      },
    },
    {
      brick: "code-bricks.code-editor",
      description: {
        title: "Json schema + schemaRef",
        message:
          "`schemaRef` 可以指向 `jsonSchema` 的部分片段。以 `#` 开头代表根节点，例如可以设置成 `#/properties/subKey`，则直接验证指向的 `subKey` 字段的类型，即 `string`。",
      },
      properties: {
        mode: "json",
        theme: "monokai",
        maxLines: "Infinity",
        value: '"I am a string value"',
        schemaRef: "#/properties/subKey",
        jsonSchema: {
          type: "object",
          properties: {
            subKey: {
              type: "string",
            },
          },
          $schema: "http://json-schema.org/draft-07/schema#",
        },
      },
    },
  ],
  doc: docMD,
};
