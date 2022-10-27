import { Story } from "@next-core/brick-types";
import { informMethodsForm } from "../images";
export const informMethodsFormStory: Story = {
  storyId: "forms.inform-methods-form",
  category: "form-input-business",
  type: "brick",
  author: "cyril",
  text: {
    en: "【Platform】inform-methods-form",
    zh: "【平台】通知方式多选框",
  },
  description: {
    en: "select inform methods by checkbox",
    zh: "选择通知方式",
  },
  icon: {
    imgSrc: informMethodsForm,
  },
  conf: [
    {
      bricks: [
        {
          brick: "forms.inform-methods-form",
          properties: {
            label: "通知方式",
            name: "inform_methods",
            required: true,
          },
        },
      ],
      snippetId: "forms.inform-methods-form[basic]",
      title: {
        en: "Basic Inform Methods Form",
        zh: "基础通知方式多选框",
      },
    },
    {
      brick: "forms.general-form",
      properties: {
        values: {
          inform_methods: ["phone", "email"],
        },
      },
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.inform-methods-form",
              properties: {
                name: "inform_methods",
                label: "通知方式",
                required: true,
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
