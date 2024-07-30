export const brickAlertSchema = {
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
      name: "type",
      title: "提示类型",
      type: "string",
      required: true,
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
      enum: [
        {
          label: "Success",
          value: "success",
        },
        {
          label: "Error",
          value: "error",
        },
        {
          label: "Info",
          value: "info",
        },
        {
          label: "Warning",
          value: "warning",
        },
      ],
      component: {
        name: "Radio.Group",
        props: {
          size: "small",
          optionType: "button",
        },
      },
    },
    {
      name: "enableMessageSlot",
      title: "启用提示插槽",
      type: "boolean",
      "x-reactions": [
        {
          target: "message",
          fulfill: {
            state: {
              visible: "{{!$self.value}}",
            },
          },
        },
        {
          target: "messageStyle",
          fulfill: {
            state: {
              visible: "{{!$self.value}}",
            },
          },
        },
        {
          target: "foldDesc",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          dependencies: ["foldDesc"],
          target: "foldDescLabel",
          fulfill: {
            state: {
              visible: "{{$self.value&&$deps[0]}}",
            },
          },
        },
      ],
    },
    {
      name: "message",
      title: "提示内容",
      type: "string",
    },
    {
      name: "messageStyle",
      title: "自定义提示样式",
      type: "string",
      component: "CodeEditor",
      decorator: "FormItemWithoutAdvanced",
    },
    {
      name: "enableDescSlot",
      title: "启用描述插槽",
      type: "boolean",
      "x-reactions": [
        {
          target: "description",
          fulfill: {
            state: {
              visible: "{{!$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "description",
      title: "描述内容",
      type: "string",
    },
    {
      name: "enableActionSlot",
      title: "启用action插槽",
      type: "boolean",
    },
    {
      name: "showIcon",
      title: "显示辅助图标",
      type: "boolean",
      "x-reactions": [
        {
          target: "iconSize",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "iconSize",
      title: "图标大小",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
          tooltip: "为L时使用大图标，否则为根据是否有描述来渲染大小的默认图标",
        },
      },
      enum: [
        {
          label: "S",
          value: "small",
        },
        {
          label: "M",
          value: "default",
        },
        {
          label: "L",
          value: "big",
        },
      ],
      component: {
        name: "Radio.Group",
        props: {
          size: "small",
          optionType: "button",
        },
      },
    },
    {
      name: "closable",
      title: "显示关闭按钮",
      type: "boolean",
      "x-reactions": [
        {
          target: "localStorageKey",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "stripLocalStorageUrlSuffix",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "localStorageKey",
      title: "缓存关闭状态key值",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          tooltip:
            "用户点击关闭后写入 localStorage(浏览器存储), 之后就不再显示该警告提示。以该值和页面 url 为命名空间，注意同一页面下该值的唯一性",
        },
      },
    },
    {
      name: "stripLocalStorageUrlSuffix",
      title: "关闭url命名空间",
      type: "boolean",
    },
    {
      name: "foldDesc",
      title: "描述折叠模式",
      type: "boolean",
      "x-reactions": [
        {
          dependencies: ["enableMessageSlot"],
          target: "foldDescLabel",
          fulfill: {
            state: {
              visible: "{{$self.value&&$deps[0]}}",
            },
          },
        },
      ],
    },
    {
      name: "foldDescLabel",
      title: "描述折叠模式标签文案",
      type: "string",
    },
    {
      name: "noBorderRadio",
      title: "关闭圆角",
      type: "boolean",
    },
  ],
};
