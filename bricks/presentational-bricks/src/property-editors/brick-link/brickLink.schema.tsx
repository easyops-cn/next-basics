export const eoLinkSchema = {
  name: "layout",
  type: "void",
  component: {
    name: "FormLayout",
    props: {
      layout: "vertical",
    },
  },
  children: [
    {
      name: "categoryTitle_basic",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "基础",
        },
      },
    },
    {
      name: "label",
      title: "文本",
      type: "string",
    },
    {
      name: "link",
      title: "链接",
      type: "string",
      component: {
        name: "InputWithUrl",
        props: {
          transform: {
            url: "url",
            href: "href",
          },
        },
      },
    },
    {
      type: "boolean",
      title: "隐藏外链标识",
      name: "hideExternalIcon",
    },
    {
      name: "type",
      title: "类型",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
      component: {
        name: "Radio.Group",
        props: {
          size: "small",
          options: [
            { label: "链接", value: "link" },
            { label: "文本", value: "text" },
          ],
          optionType: "button",
          defaultValue: "link",
        },
      },
    },
    {
      name: "target",
      title: "跳转方式",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
      component: {
        name: "Radio.Group",
        props: {
          size: "small",
          optionType: "button",
          options: [
            {
              label: "当前页面加载",
              value: "_self",
            },
            {
              label: "新标签打开",
              value: "_blank",
            },
          ],
          defaultValue: "_self",
        },
      },
    },
    {
      name: "tooltip",
      title: "文字提示",
      type: "string",
    },
    {
      name: "disabled",
      title: "禁用",
      type: "boolean",
    },
    {
      name: "categoryTitle_style",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "外观",
        },
      },
    },
    {
      name: "icon",
      title: "图标",
      type: "string",
      component: "IconSelect",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
      "x-reactions": [
        {
          target: "iconAlign",
          fulfill: {
            state: {
              display: '{{$self.value === undefined ? "none" : "visible"}}',
            },
          },
        },
      ],
    },
    {
      name: "iconAlign",
      title: "图标位置",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
      component: {
        name: "Radio.Group",
        props: {
          size: "small",
          options: [
            { label: "文本左侧", value: "left" },
            { label: "文本右侧", value: "right" },
          ],
          optionType: "button",
          defaultValue: "left",
        },
      },
    },
    {
      type: "boolean",
      title: "显示下划线",
      name: "underLine",
    },
    {
      name: "labelColor",
      type: "string",
      title: "文本颜色",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
      component: "ColorPicker",
    },
  ],
};
