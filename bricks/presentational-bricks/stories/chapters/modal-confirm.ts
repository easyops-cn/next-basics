import { Story } from "@next-core/brick-types";
import { modalConfirmSvg } from "../images";
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
    imgSrc: modalConfirmSvg,
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
                modalTitle: "warning",
                content: "补丁更新警告",
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
      description: {
        title: "基本",
        message: "各种类型的确认对话框",
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
                buttonName: "Template Demo",
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
                  name: "春节热更新",
                  version: "1.0.0",
                },
                modalTitle: "warning",
                content: "正在更新补丁 <strong>#{name}</strong>",
                extraContent: "版本号 <strong>#{version}</strong>",
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
      description: {
        title: "使用模板语言",
        message: "通过dataSource配合模板语言，实现内容的动态渲染",
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
                    action: "message.info",
                    args: ["requesting some api..."],
                  },
                  {
                    target:
                      "presentational-bricks\\.modal-confirm#confirmLoadingModal",
                    properties: {
                      confirmLoading: true,
                    },
                  },
                ],
                "confirm.cancel": [
                  {
                    action: "message.warn",
                    args: ["cancel requesting api..."],
                  },
                  {
                    target:
                      "presentational-bricks\\.modal-confirm#confirmLoadingModal",
                    properties: {
                      confirmLoading: false,
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      description: {
        title: "Loading状态",
        message:
          "在发起后台请求并且请求较慢的情况下可以设置 loading 状态优化用户体验",
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
                extraContent: "Tips: 有关联的不能删除",
                okType: "danger",
              },
            },
            {
              brick: "basic-bricks.general-custom-buttons",
              properties: {
                dataSource: {
                  title: "MyWorkspace",
                  relatedCount: 1,
                },
                customButtons: [
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
                  },
                  {
                    target: "#delete-confirm",
                    method: "openWithArgs",
                    args: [
                      {
                        content:
                          "<% `确认要删除工作空间<strong>${EVENT.detail.title}</strong>吗?` %>",
                        okButtonProps: {
                          disabled: "<% EVENT.detail.relatedCount %>",
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
      description: {
        title: "设置按钮的高级属性",
        message:
          "通过设置okButtonProps和cancelButtonProps来改变按钮样式，例如设置禁用",
      },
    },
  ],
  previewColumns: 2,
};
