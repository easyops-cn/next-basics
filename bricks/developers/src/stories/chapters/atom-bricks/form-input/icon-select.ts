import { Story } from "../../../interfaces";
import docMD from "../../../docs/forms/icon-select.md";

export const story: Story = {
  storyId: "forms.icon-select",
  type: "brick",
  author: "lynette",
  text: {
    en: "icon select",
    zh: "图标选择构件",
  },
  description: {
    en: "support for selecting icon and output data in specific format",
    zh: "支持选择图标并且输出特定格式的数据",
  },
  icon: {
    lib: "fa",
    icon: "image",
  },
  conf: [
    {
      brick: "forms.icon-select",
      properties: {
        value: {
          icon: "car",
          lib: "antd",
          theme: "outlined",
          color: "cyan",
        },
      },
      events: {
        "icon.change": {
          action: "console.log",
        },
      },
    },
    {
      brick: "forms.icon-select",
      properties: {
        value: {
          lib: "fa",
          icon: "image",
        },
        bg: false,
      },
      events: {
        "icon.change": {
          action: "console.log",
        },
      },
    },
    {
      brick: "forms.general-form",
      properties: {
        values: {
          icon: {
            lib: "fa",
            icon: "image",
          },
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
              brick: "forms.icon-select",
              properties: {
                name: "icon",
                label: "选择图标",
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
  doc: docMD,
};

export default story;
