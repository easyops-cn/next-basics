import { Story } from "@next-core/brick-types";

export const ModalConfirmStory: Story = {
  storyId: "presentational-bricks.modal-confirm",
  category: "feedback-and-tooltip",
  type: "brick",
  author: "jo",
  text: {
    en: "Modal confirm",
    zh: "确认对话框",
  },
  description: {
    en: "used for prompts and secondary confirmations",
    zh: "用于提示和二次确认的场景",
  },
  icon: {
    lib: "fa",
    icon: "check-circle",
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
                buttonName: "Confirm",
              },
              events: {
                "general.button.click": {
                  target: "presentational-bricks\\.modal-confirm#confirmModal",
                  method: "open",
                },
              },
            },
            {
              brick: "presentational-bricks.modal-confirm",
              properties: {
                id: "confirmModal",
                modalTitle: "普通确认框",
                content: "是否执行此操作",
              },
              events: {
                "confirm.ok": {
                  action: "console.info",
                },
                "confirm.cancel": {
                  action: "console.info",
                },
              },
            },
          ],
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
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "Delete",
              },
              events: {
                "general.button.click": {
                  target: "presentational-bricks\\.modal-confirm#deleteModal",
                  method: "open",
                },
              },
            },
            {
              brick: "presentational-bricks.modal-confirm",
              properties: {
                id: "deleteModal",
                dataSource: {
                  name: "测试程序包",
                  version: "1.0.0",
                },
                modalTitle: "删除提示确认框",
                content:
                  "请确认后在下方输入<strong>pipeline</strong>来解锁确定按钮",
                isDelete: true,
                expect: "pipeline",
              },
              events: {
                "confirm.ok": {
                  action: "console.info",
                },
                "confirm.cancel": {
                  action: "console.info",
                },
              },
            },
          ],
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
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "Info",
              },
              events: {
                "general.button.click": {
                  target: "presentational-bricks\\.modal-confirm#infoModal",
                  method: "open",
                },
              },
            },
            {
              brick: "presentational-bricks.modal-confirm",
              properties: {
                id: "infoModal",
                type: "info",
                dataSource: {
                  name: "测试程序包",
                  version: "1.0.0",
                },
                modalTitle: "info",
                content: "#{name}更新中",
              },
              events: {
                "confirm.ok": {
                  action: "console.info",
                },
                "confirm.cancel": {
                  action: "console.info",
                },
              },
            },
          ],
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
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "Success",
              },
              events: {
                "general.button.click": {
                  target: "presentational-bricks\\.modal-confirm#successModal",
                  method: "open",
                },
              },
            },
            {
              brick: "presentational-bricks.modal-confirm",
              properties: {
                id: "successModal",
                type: "success",
                dataSource: {
                  name: "测试程序包",
                  version: "1.0.0",
                },
                modalTitle: "success",
                content: "#{name}更新成功",
              },
              events: {
                "confirm.ok": {
                  action: "console.info",
                },
                "confirm.cancel": {
                  action: "console.info",
                },
              },
            },
          ],
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
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "Error",
              },
              events: {
                "general.button.click": {
                  target: "presentational-bricks\\.modal-confirm#errorModal",
                  method: "open",
                },
              },
            },
            {
              brick: "presentational-bricks.modal-confirm",
              properties: {
                id: "errorModal",
                type: "error",
                dataSource: {
                  name: "测试程序包",
                  version: "1.0.0",
                },
                modalTitle: "error",
                content: "#{name}更新失败",
              },
              events: {
                "confirm.ok": {
                  action: "console.info",
                },
                "confirm.cancel": {
                  action: "console.info",
                },
              },
            },
          ],
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
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "Warning",
              },
              events: {
                "general.button.click": {
                  target: "presentational-bricks\\.modal-confirm#warningModal",
                  method: "open",
                },
              },
            },
            {
              brick: "presentational-bricks.modal-confirm",
              properties: {
                id: "warningModal",
                type: "warning",
                dataSource: {
                  name: "测试程序包",
                  version: "1.0.0",
                },
                modalTitle: "warning",
                content: "#{name}更新警告",
              },
              events: {
                "confirm.ok": {
                  action: "console.info",
                },
                "confirm.cancel": {
                  action: "console.info",
                },
              },
            },
          ],
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
              brick: "presentational-bricks.brick-utils",
              bg: true,
            },
            {
              brick: "providers-of-cmdb.instance-api-delete-instance",
              injectDeep: true,
              bg: true,
              properties: {
                args: ["HOST", "1"],
              },
              events: {
                "response.success": [
                  {
                    target:
                      "presentational-bricks\\.modal-confirm#instance-delete-modal",
                    properties: {
                      confirmLoading: false,
                      cancelButtonProps: {
                        disabled: false,
                      },
                    },
                  },
                  {
                    target:
                      "presentational-bricks\\.modal-confirm#confirmLoadingModal",
                    method: "close",
                  },
                ],
                "response.error": [
                  {
                    target:
                      "presentational-bricks\\.modal-confirm#instance-delete-modal",
                    properties: {
                      confirmLoading: false,
                      cancelButtonProps: {
                        disabled: false,
                      },
                    },
                  },
                  {
                    target:
                      "presentational-bricks\\.modal-confirm#confirmLoadingModal",
                    method: "close",
                  },
                  {
                    target: "presentational-bricks\\.brick-utils",
                    method: "handleHttpError",
                  },
                ],
              },
            },
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "confirmLoading Demo",
              },
              events: {
                "general.button.click": {
                  target:
                    "presentational-bricks\\.modal-confirm#confirmLoadingModal",
                  method: "open",
                },
              },
            },
            {
              brick: "presentational-bricks.modal-confirm",
              properties: {
                id: "confirmLoadingModal",
                dataSource: {
                  name: "测试demo",
                },
                modalTitle: "删除提示确认框",
                content: "确认删除 <strong>#{name}</strong> 吗？",
                isDelete: true,
                closeWhenOk: false,
              },
              events: {
                "confirm.ok": [
                  {
                    target: "providers-of-cmdb\\.instance-api-delete-instance",
                    method: "execute",
                  },
                  {
                    target:
                      "presentational-bricks\\.modal-confirm#confirmLoadingModal",
                    properties: {
                      confirmLoading: true,
                      cancelButtonProps: {
                        disabled: true,
                      },
                    },
                  },
                ],
              },
            },
          ],
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
              brick: "presentational-bricks.modal-confirm",
              properties: {
                id: "delete-confirm",
                modalTitle: "工作空间删除确认",
                extraContent: "有关联的不能删除",
                isDelete: true,
              },
            },
            {
              brick: "basic-bricks.general-custom-buttons",
              properties: {
                dataSource: {
                  title: "role",
                  count: 1,
                },
                customButtons: [
                  {
                    isDropdown: true,
                    text: "另存为",
                    icon: "file-add",
                    eventName: "instance.saveAs",
                  },
                  {
                    isDropdown: true,
                    text: "删除工作区间",
                    icon: "delete",
                    color: "#E02020",
                    eventName: "workload.delete",
                  },
                ],
              },
              events: {
                "workload.delete": [
                  {
                    action: "console.log",
                    args: ["${event.detail.count|boolean}"],
                  },
                  {
                    target: "#delete-confirm",
                    method: "openWithArgs",
                    args: [
                      {
                        content:
                          "确认要删除工作空间<strong>${event.detail.title}</strong>吗？",
                        okButtonProps: {
                          disabled: "${event.detail.count|boolean}",
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      },
    },
  ],
  previewColumns: 2,
};
