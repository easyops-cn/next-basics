import { Story } from "@next-core/brick-types";
import { timeRangePicker } from "../images";
export const timeRangePickerStory: Story = {
  storyId: "forms.time-range-picker",
  category: "form-input-basic",
  type: "brick",
  author: "ice",
  text: {
    en: "Time Range Picker",
    zh: "时间段选择器",
  },
  description: {
    en: "combined by two time pickers",
    zh: "由两个时间选择器组成",
  },
  icon: {
    imgSrc: timeRangePicker,
  },
  conf: [
    {
      brick: "forms.general-form",
      properties: {
        values: {
          time: {
            startTime: null,
            endTime: null,
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
              brick: "forms.time-range-picker",
              properties: {
                name: "time",
                required: true,
                label: "hello",
                rangeType: "time",
              },
              events: {
                "time.range.change": {
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
    {
      brick: "forms.time-range-picker",
      properties: {
        rangeType: "dateTime",
        name: "time",
        required: true,
        value: {
          startTime: "2020-03-16 01:23:45",
          endTime: "2020-03-16 12:34:56",
        },
        label: "hello",
      },
      events: {
        "time.range.change": {
          action: "console.log",
        },
      },
    },
  ],
  previewColumns: 2,
};
