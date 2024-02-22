import { Story } from "@next-core/brick-types";
import {
  markdownEditorNormalSvg,
  markdownEditorSvg,
  markdownEditorUploadImgSvg,
} from "../images";
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
    en: "The Markdown editing component provides a series of features that support editing and real-time preview. The Markdown editor can also be easily integrated into forms or used as a standalone component",
    zh: "Markdown编辑构件，提供了一系列功能，支持编辑并实时预览。也可以将 Markdown 编辑器轻松地集成到表单中，或者作为一个独立的构件使用",
  },
  icon: {
    imgSrc: markdownEditorSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.markdown-editor[normal]",
      title: {
        en: "",
        zh: "基础Markdown编辑构件",
      },
      thumbnail: markdownEditorNormalSvg,
      bricks: [
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
      ],
    },
    {
      snippetId: "presentational-bricks.markdown-editor[upload-img]",
      title: {
        en: "",
        zh: "Markdown编辑构件(支持上传图片)",
      },
      thumbnail: markdownEditorUploadImgSvg,
      bricks: [
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
      ],
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
