import { Story } from "@next-core/brick-types";
import { generalInputSvg } from "../images";
export const generalInputStory: Story = {
  storyId: "forms.general-input",
  category: "form-input-basic",
  type: "brick",
  author: "steve",
  text: {
    en: "Input",
    zh: "输入框",
  },
  description: {
    en: "",
    zh: "",
  },
  icon: {
    imgSrc: generalInputSvg,
  },
  conf: [
    {
      bricks: [
        {
          brick: "forms.general-input",
          description: {
            title: "基本使用",
          },
          properties: {
            name: "username",
            type: "text",
            label: "用户名",
            value: "test",
            placeholder: "请输入用户名",
          },
          events: {
            "general.input.change": {
              action: "console.log",
              args: ["username", "<% EVENT.detail %>"],
            },
            "general.input.blur": {
              action: "console.log",
            },
          },
        },
      ],
      snippetId: "forms.general-input[basic]",
      title: {
        en: "Basic General Input",
        zh: "基础输入框",
      },
    },
    {
      bricks: [
        {
          brick: "forms.general-input",
          description: {
            title: "复制按钮",
          },
          properties: {
            name: "email",
            type: "email",
            label: "邮箱",
            value: "",
            placeholder: "请输入邮箱地址",
            copyButton: true,
          },
          events: {
            "general.input.change": {
              action: "console.log",
              args: ["username", "<% EVENT.detail %>"],
            },
            "general.input.blur": {
              action: "console.log",
            },
          },
        },
      ],
      snippetId: "forms.general-input[copyable]",
      title: {
        en: "Copyable General Input",
        zh: "可复制输入框",
      },
    },
    {
      bricks: [
        {
          brick: "forms.general-input",
          description: {
            title: "密码框",
          },
          properties: {
            name: "password",
            type: "password",
            label: "密码",
            value: "123456",
            placeholder: "请输入密码",
          },
          events: {
            "general.input.change": {
              action: "console.log",
              args: ["username", "<% EVENT.detail %>"],
            },
            "general.input.blur": {
              action: "console.log",
            },
          },
        },
      ],
      snippetId: "forms.general-input[password]",
      title: {
        en: "Password General Input",
        zh: "密码输入框",
      },
    },
    {
      brick: "forms.general-form",
      description: {
        title: "正则校验，错误信息提示",
      },
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-input",
              properties: {
                name: "production",
                type: "text",
                label: "产品",
                pattern: "\\w{10}",
                required: true,
                message: {
                  required: "请输入相应产品",
                  pattern: "包含下划线，a-z 和 0-9最少10个字符",
                },
              },
              events: {
                "general.input.change": {
                  action: "console.log",
                  args: ["production", "<% EVENT.detail %>"],
                },
                "general.input.press.enter": {
                  action: "console.log",
                  args: [
                    "<% EVENT.detail.key %>",
                    "<% EVENT.detail.keyCode %>",
                  ],
                },
              },
            },
          ],
        },
      },
    },
    {
      bricks: [
        {
          brick: "forms.general-input",
          description: {
            title: "前缀，后缀",
          },
          properties: {
            name: "url",
            type: "url",
            label: "url",
            value: "",
            placeholder: "请输入url",
            addonBefore: "Http://",
            addonAfter: ".com",
          },
          events: {
            "general.input.change": {
              action: "console.log",
              args: ["username", "<% EVENT.detail %>"],
            },
            "general.input.blur": {
              action: "console.log",
            },
          },
        },
      ],
      snippetId: "forms.general-input[with-addon]",
      title: {
        en: "General Input with Addon",
        zh: "带前后缀的输入框",
      },
    },
  ],
};
