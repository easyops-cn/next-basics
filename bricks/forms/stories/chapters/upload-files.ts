import { Story } from "@next-core/brick-types";
import { uploadFiles } from "../images";
export const UploadFilesStory: Story = {
  storyId: "forms.upload-files",
  type: "brick",
  category: "form-input-basic",
  author: "cyril",
  text: {
    en: "upload files",
    zh: "上传文件",
  },
  description: {
    en: "upload files by specific API",
    zh: "通过指定 API 上传文件",
  },
  icon: {
    imgSrc: uploadFiles,
  },
  conf: [
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-button",
              properties: {
                id: "upload-files-button",
                buttonName: "上传",
                buttonIcon: "cloud-upload",
                disabled: true,
              },
              events: {
                "general.button.click": {
                  target: "#upload-files",
                  method: "upload",
                },
              },
            },
            {
              brick: "forms.upload-files",
              properties: {
                id: "upload-files",
                url: "api/gateway/cmdb.instance.ImportInstanceWithJson/import/object/_DASHBOARD/instance/json",
                name: "attachment",
                data: {
                  "keys[0]": "instanceId",
                },
                text: {
                  main: "请点击或拖拽仪表盘文件到此区域",
                  hint: "文件大小最多10M，支持扩展名：.json",
                },
                style: {
                  marginTop: "20px",
                },
              },
              events: {
                "upload.files.change": [
                  {
                    target: "#upload-files-button",
                    properties: {
                      disabled: "<% EVENT.detail.fileList.length === 0 %>",
                    },
                  },
                  {
                    action: "console.log",
                  },
                ],
                "upload.files.success": [
                  {
                    action: "message.success",
                    args: ["上传成功"],
                  },
                  {
                    action: "console.log",
                  },
                ],
                "upload.files.failed": [
                  {
                    action: "message.error",
                    args: ["上传失败"],
                  },
                  {
                    action: "console.log",
                  },
                ],
              },
            },
          ],
        },
      },
    },
    {
      brick: "forms.upload-files",
      properties: {
        autoUpload: true,
        url: "/api/gateway/cmdb.instance.ImportInstanceWithJson/import/object/_DASHBOARD/instance/json",
        name: "attachment",
        data: {
          "keys[0]": "instanceId",
        },
        accept: ".json",
        text: {
          main: "请点击或拖拽仪表盘文件到此区域",
          hint: "文件大小最多10M，支持扩展名：.json",
        },
      },
      events: {
        "upload.files.change": [
          {
            action: "console.log",
          },
        ],
        "upload.files.success": [
          {
            action: "message.success",
            args: ["上传成功"],
          },
          {
            action: "console.log",
          },
        ],
        "upload.files.failed": [
          {
            action: "message.error",
            args: ["上传失败"],
          },
          {
            action: "console.log",
          },
        ],
      },
    },
  ],
};
