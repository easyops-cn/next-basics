import { Story } from "@next-core/brick-types";
import { uploadFilesV2 } from "../images";
export const UploadFilesV2Story: Story = {
  storyId: "forms.upload-files-v2",
  type: "brick",
  category: "form-input-basic",
  author: "nlicroshan",
  text: {
    en: "Custom storage uploads files",
    zh: "自定义存储上传文件",
  },
  description: {
    en: "upload files by specific API",
    zh: "上传文件，适用于表单项中对接provider",
  },
  icon: {
    imgSrc: uploadFilesV2,
  },
  conf: [
    {
      description: {
        title: "自动上传",
        message: "可以获取到接口的返回信息。",
      },
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-form",
              properties: {
                values: {
                  title: "title",
                  files: [
                    {
                      name: "image",
                      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                    },
                  ],
                },
              },
              events: {
                "validate.success": [
                  {
                    action: "console.log",
                    args: ["${EVENT.detail}"],
                  },
                ],
                "validate.error": {
                  action: "console.warn",
                  args: ["${EVENT.detail}"],
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
                      brick: "forms.upload-files-v2",
                      properties: {
                        name: "files",
                        label: "文件",
                        required: true,
                        maxNumber: 2,
                        autoUpload: true,
                        uploadButtonName: "上传",
                        method: "put",
                        url: "api/gateway/object_store.object_store.PutObject/api/v1/objectStore/bucket/lytest/object",
                      },
                      events: {
                        "upload.files.change": {
                          action: "console.log",
                          args: ["${EVENT.detail}"],
                        },
                        "upload.files.error": {
                          action: "console.log",
                          args: ["${EVENT.detail}"],
                        },
                        "upload.files.remove": {
                          action: "console.log",
                          args: ["${EVENT.detail}"],
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
      description: {
        title: "非自动上传",
        message: "可以获取到本地文件对象。",
      },
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-form",
              properties: {
                values: {
                  title: "title",
                },
              },
              events: {
                "validate.success": [
                  {
                    action: "console.log",
                    args: ["${EVENT.detail}"],
                  },
                  {
                    useProvider:
                      "providers-of-object-store.object-store-api-put-object",
                    args: [
                      "test",
                      { file: "<% EVENT.detail.files[0].file %>" },
                    ],
                    callback: {
                      success: [
                        {
                          action: "console.log",
                          args: ["${EVENT.detail}"],
                        },
                      ],
                      error: [
                        {
                          action: "console.log",
                          args: ["${EVENT.detail}"],
                        },
                      ],
                    },
                  },
                ],
                "validate.error": {
                  action: "console.warn",
                  args: ["${EVENT.detail}"],
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
                      brick: "forms.upload-files-v2",
                      properties: {
                        name: "files",
                        label: "文件",
                        required: true,
                        draggableUploadHint: "支持扩展名：.svg .zip",
                        accept: ".svg,.zip",
                        maxNumber: 1,
                        uploadDraggable: true,
                      },
                      events: {
                        "upload.files.change": {
                          action: "console.log",
                          args: ["${EVENT.detail}"],
                        },
                        "upload.files.error": {
                          action: "console.log",
                          args: ["${EVENT.detail}"],
                        },
                        "upload.files.remove": {
                          action: "console.log",
                          args: ["${EVENT.detail}"],
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
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
  ],
};
