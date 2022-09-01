import { Story } from "@next-core/brick-types";

export const MarkdownEditorStory: Story = {
  storyId: "presentational-bricks.markdown-editor",
  category: "form-input-advanced",
  type: "brick",
  author: "lynette",
  text: {
    en: "Markdown editor",
    zh: "Markdown编辑",
  },
  description: {
    en: "",
    zh: "Markdown编辑构件",
  },
  icon: {
    lib: "fa",
    icon: "edit",
  },
  conf: [
    {
      brick: "presentational-bricks.markdown-editor",
      description: {
        title: "单独使用",
      },
      properties: {
        value: "### 三级标题\n- 列表1\n- 列表2\n- 列表3",
      },
      events: {
        "markdown.value.change": {
          action: "console.log",
        },
      },
    },
    {
      brick: "presentational-bricks.markdown-editor",
      description: {
        title: "支持粘贴上传图片",
        message:
          "需要设置 `supportUploadImg` 和 `bucketName`，其中 `bucketName` 请与后台同学商量创建",
      },
      properties: {
        value: "### 可以粘贴上传图片\n",
        supportUploadImg: true,
        bucketName: "lytest",
      },
      events: {
        "markdown.value.change": {
          action: "console.log",
        },
        "image.upload": {
          action: "console.log",
        },
      },
    },
    {
      brick: "forms.general-form",
      description: {
        title: "作为表单项，和 `forms.general-form` 构件搭配使用",
      },
      properties: {
        values: {
          content: "### 三级标题\n- 列表1\n- 列表2\n- 列表3",
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
              brick: "presentational-bricks.markdown-editor",
              properties: {
                name: "content",
                label: "内容",
                required: true,
                message: {
                  required: "请输入内容",
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
  ],
};
