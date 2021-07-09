import { Story } from "@next-core/brick-types";

export const datePickerStory: Story = {
  storyId: "forms.general-date-picker",
  category: "form-input",
  type: "brick",
  author: "steve",
  text: {
    en: "General Date Picker",
    zh: "普通日期选择框",
  },
  description: {
    en: "",
    zh: "",
  },
  icon: {
    lib: "fa",
    icon: "calendar",
  },
  conf: [
    {
      brick: "forms.general-date-picker",
      properties: {
        name: "date",
        label: "hello",
        placeholder: "when",
        value: "2019-10-01",
        inputBoxStyle: {
          width: 300,
        },
      },
      events: {
        "general.date.change": {
          action: "console.log",
          args: ["date", "${EVENT.detail}"],
        },
      },
    },
    {
      brick: "forms.general-form",
      properties: {
        values: {
          time: "2020-02-01 14:30:00",
        },
        valueTypes: {
          time: "moment|YYYY-MM-DD HH:mm:ss",
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
              brick: "forms.general-input",
              properties: {
                name: "username",
                label: "用户名",
                required: true,
                pattern: "^[a-z][-a-z0-9]{0,63}$",
                message: {
                  required: "用户名为必填项",
                  pattern:
                    "只能包含小写字母、数字和-，且要以字母开头，不能超过64个字符",
                },
                placeholder: "请输入用户名",
              },
            },
            {
              brick: "forms.general-date-picker",
              properties: {
                name: "time",
                label: "hello",
                showTime: true,
                format: "YYYY-MM-DD HH:mm:ss",
                placeholder: "when",
              },
              events: {
                "general.date.ok": {
                  action: "console.log",
                  args: ["date", "${EVENT.detail}"],
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
      description: {
        title: "设置禁选日期",
        message:
          "该demo表示禁选周四、2010-2020年每月10-15号，每周三 12-18点期间的0-29分钟。",
      },
      brick: "forms.general-date-picker",
      events: {
        "general.date.change": {
          action: "console.log",
          args: ["date", "${EVENT.detail}"],
        },
      },
      properties: {
        disabledDate: [
          {
            weekday: 4,
          },
          {
            date: "10-15",
            year: "2010-2020",
          },
          {
            weekday: 3,
            hour: "12-18",
            minute: "0-29",
          },
        ],
        showTime: true,
        format: "YYYY-MM-DD HH:mm:ss",
        value: "2019-10-01 00:00:00",
      },
    },
  ],
};
