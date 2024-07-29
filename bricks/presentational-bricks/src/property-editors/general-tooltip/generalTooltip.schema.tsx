export const generalTooltipSchema = {
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
      name: "categoryTitle_show",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "展示",
        },
      },
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
      enum: [
        {
          label: "Tooltip",
          value: "tooltip",
        },
        {
          label: "Popover",
          value: "popover",
        },
      ],
      component: {
        name: "Radio.Group",
        props: {
          size: "small",
          optionType: "button",
          defaultValue: "tooltip",
        },
      },
      "x-reactions": [
        {
          target: "header",
          fulfill: {
            state: {
              visible: "{{$self.value==='popover'}}",
            },
          },
        },
      ],
    },
    {
      name: "isCustomDisplayBrick",
      title: "自定义展示构件",
      type: "boolean",
      "x-reactions": [
        {
          target: "displayBrick",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "text",
          fulfill: {
            state: {
              visible: "{{!$self.value}}",
            },
          },
        },
        {
          target: "icon",
          fulfill: {
            state: {
              visible: "{{!$self.value}}",
            },
          },
        },
        {
          target: "triggerByIcon",
          fulfill: {
            state: {
              visible: "{{!$self.value}}",
            },
          },
        },
        {
          target: "iconContainerStyle",
          fulfill: {
            state: {
              visible: "{{!$self.value}}",
            },
          },
        },
        {
          target: "textEllipsis",
          fulfill: {
            state: {
              visible: "{{!$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "displayBrick",
      title: "展示构件",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
      },
    },
    {
      name: "text",
      title: "展示内容",
      type: "string",
    },
    {
      name: "icon",
      title: "图标",
      type: "string",
      component: "IconSelect",
    },
    {
      name: "triggerByIcon",
      title: "由图标触发提示",
      type: "boolean",
      component: {
        props: {
          defaultValue: true,
          size: "small",
        },
      },
    },
    {
      name: "iconContainerStyle",
      title: "图标容器样式",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
      },
    },
    {
      name: "textEllipsis",
      title: "展示内容溢出省略",
      type: "boolean",
    },
    {
      name: "categoryTitle_tooltip",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "提示",
        },
      },
    },
    {
      name: "content",
      title: "提示内容",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip: "输入数组则多行显示",
        },
      },
    },
    {
      name: "header",
      title: "提示内容标题",
      type: "string",
    },
    {
      name: "tooltipConfig",
      title: "提示配置",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip:
            "可配置placement、overlayStyle、arrowPointAtCenter等属性，具体查阅TooltipConfig的文档",
        },
      },
    },
  ],
};
