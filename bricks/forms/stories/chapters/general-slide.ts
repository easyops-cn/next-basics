import { Story } from "@next-core/brick-types";
import { generalSlide } from "../images";
export const generalSlideStory: Story = {
  storyId: "forms.general-slide",
  category: "form-input-basic",
  type: "brick",
  author: "jo",
  text: {
    en: "General Slide",
    zh: "滑动输入条",
  },
  description: {
    en: "Sliding input device, showing current value and selectable range",
    zh: "滑动型输入器，展示当前值和可选范围",
  },
  icon: {
    imgSrc: generalSlide,
  },
  conf: [
    {
      brick: "forms.general-slide",
      properties: {
        value: 30,
      },
      events: {
        "slider.change": {
          action: "console.log",
        },
        "slider.after.change": {
          action: "console.log",
        },
      },
    },
    {
      brick: "forms.general-slide",
      properties: {
        value: [30, 40],
        range: true,
      },
      events: {
        "slider.change": {
          action: "console.log",
        },
        "slider.after.change": {
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
              brick: "span",
              properties: {
                textContent: "marks && included=true",
              },
            },
            {
              brick: "forms.general-slide",
              properties: {
                value: 40,
                included: true,
                marks: {
                  0: "0°C",
                  26: "26°C",
                  37: "37°C",
                  100: {
                    style: {
                      color: "#f50",
                    },
                    label: "100°C",
                  },
                },
              },
              events: {
                "slider.change": {
                  action: "console.log",
                },
                "slider.after.change": {
                  action: "console.log",
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
              brick: "span",
              properties: {
                textContent: "marks && included=false",
              },
            },
            {
              brick: "forms.general-slide",
              properties: {
                value: 40,
                included: false,
                marks: {
                  0: "0°C",
                  26: "26°C",
                  37: "37°C",
                  100: {
                    style: {
                      color: "#f50",
                    },
                    label: "100°C",
                  },
                },
              },
              events: {
                "slider.change": {
                  action: "console.log",
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
              brick: "span",
              properties: {
                textContent: "marks && step",
              },
            },
            {
              brick: "forms.general-slide",
              properties: {
                value: 40,
                step: 10,
                marks: {
                  0: "0°C",
                  26: "26°C",
                  37: "37°C",
                  100: {
                    style: {
                      color: "#f50",
                    },
                    label: "100°C",
                  },
                },
              },
              events: {
                "slider.change": {
                  action: "console.log",
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
              brick: "span",
              properties: {
                textContent: "marks && step=null",
              },
            },
            {
              brick: "forms.general-slide",
              properties: {
                value: 37,
                step: null,
                marks: {
                  0: "0°C",
                  26: "26°C",
                  37: "37°C",
                  100: {
                    style: {
                      color: "#f50",
                    },
                    label: "100°C",
                  },
                },
              },
              events: {
                "slider.change": {
                  action: "console.log",
                },
              },
            },
          ],
        },
      },
    },
    {
      brick: "forms.general-form",
      properties: {
        values: {
          temperature: 30,
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
              brick: "forms.general-slide",
              properties: {
                label: "温度",
                name: "temperature",
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
      brick: "forms.general-slide",
      description: {
        title: "dashboard 样式",
        message: "",
      },
      properties: {
        value: [20, 60],
        range: true,
        uiType: "dashboard",
      },
      events: {
        "slider.change": {
          action: "console.log",
        },
      },
    },
  ],
  previewColumns: 2,
};
