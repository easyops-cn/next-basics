import { Story } from "@next-core/brick-types";

export const generalTimePickerStory: Story = {
  storyId: "forms.general-time-picker",
  type: "brick",
  category: "form-input-basic",
  author: "steve",
  text: {
    en: "Time Picker",
    zh: "时间选择器",
  },
  description: {
    en: "",
    zh: "",
  },
  icon: {
    lib: "fa",
    icon: "clock",
  },
  conf: [
    {
      brick: "forms.general-time-picker",
      properties: {
        configProps: {
          format: "HH:mm",
          minuteStep: 5,
        },
        name: "time",
        label: "hello",
        placeholder: "when",
        value: "09:14:30",
      },
      events: {
        "general.time.change": {
          action: "console.log",
          args: ["time", "${EVENT.detail}"],
        },
        "general.time.close": {
          action: "console.log",
        },
      },
    },
    {
      brick: "forms.general-form",
      properties: {
        values: {
          time: "14:30:00",
        },
        valueTypes: {
          time: "moment|HH:mm:ss",
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
              brick: "forms.general-time-picker",
              properties: {
                name: "time",
                label: "hello",
                placeholder: "when",
              },
              events: {
                "general.time.change": {
                  action: "console.log",
                  args: ["time", "${EVENT.detail}"],
                },
                "general.time.close": {
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
