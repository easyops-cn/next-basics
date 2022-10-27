import { Story } from "@next-core/brick-types";
import { crontabInput } from "../images";
export const crontabInputStory: Story = {
  storyId: "forms.crontab-input",
  category: "form-input-business",
  type: "brick",
  author: "jo",
  text: {
    en: "Crontab Of Input",
    zh: "定时器任务的输入",
  },
  description: {
    en: "Crontab Of Form",
    zh: "定时器任务表单项",
  },
  icon: {
    imgSrc: crontabInput,
  },
  conf: [
    {
      bricks: [
        {
          brick: "forms.crontab-input",
          events: {
            "crontab.change": {
              action: "console.log",
            },
          },
          properties: {
            label: "执行周期",
            name: "crontab",
            value: "6 * * * *",
          },
        },
      ],
      snippetId: "forms.crontab-input[basic]",
      title: {
        en: "Basic Crontab Input",
        zh: "基础定时器任务输入",
      },
    },
    {
      brick: "forms.general-form",
      properties: {
        values: {
          crontab: "6 * * * *",
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
              brick: "forms.crontab-input",
              properties: {
                name: "crontab",
                label: "执行周期",
              },
              events: {
                "crontab.change": {
                  action: "console.log",
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
