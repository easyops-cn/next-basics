import { Story } from "@next-core/brick-types";
import { iconSelect } from "../images";
export const iconSelectStory: Story = {
  storyId: "forms.icon-select",
  category: "form-input-basic",
  type: "brick",
  author: "lynette",
  text: {
    en: "Icon Select",
    zh: "图标选择器",
  },
  description: {
    en: "support for selecting icon and output data in specific format",
    zh: "支持选择图标并且输出特定格式的数据",
  },
  icon: {
    imgSrc: iconSelect,
  },
  conf: [
    {
      bricks: [
        {
          brick: "forms.icon-select",
          properties: {
            value: {
              icon: "car",
              lib: "antd",
              theme: "outlined",
              color: "cyan",
            },
            dataset: {
              testid: "basic-usage-demo",
            },
          },
          events: {
            "icon.change": {
              action: "console.log",
            },
          },
        },
      ],
      snippetId: "forms.icon-select[basic]",
      title: {
        en: "Basic Icon Select",
        zh: "基础图标选择器",
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
};
