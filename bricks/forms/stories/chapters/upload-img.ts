import { Story } from "@next-core/brick-types";
import { uploadImgSvg } from "../images";
export const uploadImgStory: Story = {
  storyId: "forms.upload-img",
  type: "brick",
  category: "form-input-basic",
  author: "lynette",
  text: {
    en: "upload img",
    zh: "上传图片",
  },
  description: {
    en: "upload image",
    zh: "对接平台对象存储，提供上传图片功能的构件",
  },
  icon: {
    imgSrc: uploadImgSvg,
  },
  conf: [
    {
      bricks: [
        {
          brick: "forms.upload-img",
          properties: {
            maxNumber: 1,
            bucketName: "lytest",
          },
          events: {
            "upload.img.change": {
              action: "console.log",
            },
          },
        },
      ],
      snippetId: "forms.upload-img[basic]",
      title: {
        en: "Basic Upload Img",
        zh: "基础上传图片",
      },
    },
    {
      brick: "forms.upload-img",
      properties: {
        bucketName: "lytest",
        listType: "picture",
        value: {
          images: [
            {
              name: "image",
              url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            },
          ],
        },
      },
      events: {
        "upload.img.change": {
          action: "console.log",
        },
      },
    },
    {
      brick: "forms.upload-img",
      properties: {
        bucketName: "lytest",
        listType: "text",
        value: {
          images: [
            {
              name: "image",
              url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            },
          ],
        },
      },
      events: {
        "upload.img.change": {
          action: "console.log",
        },
      },
    },
    {
      brick: "forms.upload-img",
      properties: {
        bucketName: "lytest",
        value: {
          images: [
            {
              name: "image",
              url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            },
          ],
        },
      },
      events: {
        "upload.img.change": {
          action: "console.log",
        },
      },
    },
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-form",
              properties: {
                staticValues: {
                  product: [
                    {
                      name: "lynette",
                      instanceId: "59eda18431871",
                      title: "lynette",
                      description: "",
                      sprints: [],
                    },
                  ],
                },
                values: {
                  title: "title",
                  type: "story",
                  priority: "high",
                  descAndImages: {
                    images: [
                      {
                        name: "image",
                        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                      },
                    ],
                  },
                },
              },
              events: {
                "validate.success": [
                  {
                    action: "console.log",
                    args: ["${EVENT.type}", "${EVENT.detail}"],
                  },
                ],
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
                      brick: "forms.general-input",
                      properties: {
                        name: "title",
                        label: "标题",
                        required: true,
                      },
                    },
                    {
                      brick: "forms.general-input",
                      properties: {
                        name: "type",
                        label: "类型",
                        required: true,
                      },
                    },
                    {
                      brick: "forms.upload-img",
                      properties: {
                        maxNumber: 5,
                        showTextarea: true,
                        bucketName: "lytest",
                        name: "descAndImages",
                        label: "描述",
                        required: true,
                        placeholder: "请输入描述信息",
                      },
                      events: {
                        "upload.img.change": {
                          action: "console.log",
                        },
                      },
                    },
                    {
                      brick: "forms.general-input",
                      properties: {
                        name: "priority",
                        label: "优先级",
                        required: true,
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
        },
      },
    },
    {
      brick: "forms.upload-img",
      properties: {
        bucketName: "lytest",
        uploadDraggable: true,
        listType: "picture",
      },
      events: {
        "upload.img.change": {
          action: "console.log",
        },
      },
    },
  ],
};
