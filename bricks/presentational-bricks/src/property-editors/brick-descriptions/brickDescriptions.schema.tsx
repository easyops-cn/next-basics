export const brickDescriptionsSchema = {
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
      name: "descriptionTitle",
      title: "标题",
      type: "string",
    },
    {
      name: "isMultiDesc",
      title: "配置多个描述列表",
      type: "boolean",
      "x-reactions": [
        {
          target: "descriptionList",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "itemList",
          fulfill: {
            state: {
              visible: "{{!$self.value}}",
            },
          },
        },
        {
          target: "hideGroups",
          fulfill: {
            state: {
              visible: "{{!$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "descriptionList",
      title: "描述列表",
      type: "string",
      component: "CodeEditor",
      decorator: "FormItemWithoutAdvanced",
    },
    {
      name: "itemList",
      title: "描述列表",
      type: "string",
      component: "CodeEditor",
      decorator: "FormItemWithoutAdvanced",
    },
    {
      name: "configProps",
      title: "描述配置",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          layout: "horizontal",
          tooltip: "参考antd Descriptions的配置项",
        },
      },
    },
    {
      name: "categoryTitle_style",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "外观",
        },
      },
    },
    {
      name: "showCard",
      title: "显示卡片背景",
      type: "boolean",
      component: {
        props: {
          size: "small",
          defaultValue: true,
        },
      },
    },
    {
      name: "bordered",
      title: "显示边框",
      type: "boolean",
      "x-reactions": [
        {
          target: "size",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "size",
      title: "列表大小",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
      enum: [
        {
          label: "Default",
          value: "default",
        },
        {
          label: "Middle",
          value: "middle",
        },
        {
          label: "Small",
          value: "small",
        },
      ],
      component: {
        name: "Radio.Group",
        props: {
          size: "small",
          optionType: "button",
          defaultValue: "horizontal",
        },
      },
    },
    {
      name: "layout",
      title: "布局",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
      enum: [
        {
          label: "Horizontal",
          value: "horizontal",
        },
        {
          label: "Vertical",
          value: "vertical",
        },
      ],
      component: {
        name: "Radio.Group",
        props: {
          size: "small",
          optionType: "button",
          defaultValue: "horizontal",
        },
      },
    },
    {
      name: "column",
      title: "列数",
      type: "string",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          layout: "horizontal",
          tooltip:
            "一行包含的描述项数，可以写成像素值或支持响应式的对象写法{ xs: 8, sm: 16, md: 24}",
        },
      },
      component: {
        name: "CodeEditor",
        props: {
          defaultValue: "3",
        },
      },
    },
    {
      name: "hideGroups",
      title: "需隐藏的描述列表项",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          layout: "horizontal",
          tooltip: "请先在描述列表中定义列表项所属group",
        },
      },
    },
  ],
};
