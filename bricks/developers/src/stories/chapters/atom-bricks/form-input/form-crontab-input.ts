import { Story } from "../../../interfaces";
import docMD from "../../../docs/forms/crontab-input.md";

const story: Story = {
  storyId: "forms.crontab-input",
  type: "brick",
  author: "jo",
  text: {
    en: "Crontab Of Input",
    zh: "定时器任务的输入"
  },
  description: {
    en: "Crontab Of Form",
    zh: "定时器任务表单项"
  },
  icon: {
    lib: "fa",
    icon: "clock"
  },
  conf: {
    brick: "forms.general-form",
    properties: {
      values: {
        crontab: "6 * * * *"
      }
    },
    events: {
      "validate.success": {
        action: "console.log",
        args: ["${EVENT.type}", "${EVENT.detail}"]
      },
      "validate.error": {
        action: "console.warn",
        args: ["${EVENT.type}", "${EVENT.detail}"]
      }
    },
    slots: {
      items: {
        type: "bricks",
        bricks: [
          {
            brick: "forms.crontab-input",
            properties: {
              name: "crontab",
              label: "执行周期"
            },
            events: {
              "crontab.change": {
                action: "console.log"
              }
            }
          },
          {
            brick: "forms.general-buttons",
            properties: {
              showCancelButton: true,
              submitText: "提交",
              cancelText: "取消"
            },
            events: {
              "submit.button.click": {
                action: "console.log"
              },
              "cancel.button.click": {
                action: "console.log"
              }
            }
          }
        ]
      }
    }
  },
  doc: docMD
};

export default story;
