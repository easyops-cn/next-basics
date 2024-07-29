export const generalFormItemV2Schema = {
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
      name: "categoryTitle_base",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "基础",
        },
      },
    },
    {
      name: "value",
      title: "值",
      type: "string",
      component: "CodeEditor",
      decorator: "FormItemWithoutAdvanced",
    },
    {
      name: "required",
      title: "必填",
      type: "boolean",
    },
    {
      name: "name",
      title: "name",
      type: "string",
      required: true,
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "相当于唯一ID",
        },
      },
    },
    {
      name: "notRender",
      title: "不渲染该表单项",
      type: "boolean",
    },
    {
      name: "trim",
      title: "自动去除前后空白字符",
      type: "boolean",
      component: {
        props: {
          size: "small",
          defaultValue: true,
        },
      },
    },
    {
      name: "categoryTitle_tag",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "标签",
        },
      },
    },
    {
      name: "label",
      title: "标签",
      type: "string",
    },
    {
      name: "labelAlign",
      title: "对齐方式",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
      enum: [
        {
          label: "左",
          value: "left",
        },
        {
          label: "右",
          value: "right",
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
      name: "labelColor",
      type: "string",
      title: "颜色",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
      component: "ColorPicker",
    },
    {
      name: "labelBold",
      title: "加粗",
      type: "boolean",
    },
    {
      name: "labelTooltip",
      title: "Tooltip",
      type: "string",
      component: "CodeEditor",
      decorator: "FormItemWithoutAdvanced",
    },
    {
      name: "labelCol",
      title: "布局",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip: "可设置span offset值",
        },
      },
    },
    {
      name: "categoryTitle_advanced",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "高级",
        },
      },
    },
    {
      name: "labelBrick",
      title: "标签构件",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip: "可指定额外构件作为标签展示",
        },
      },
    },
    {
      name: "helpBrick",
      title: "帮助构件",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip: "通常用于在表单项右侧和下方，展示此表单项的帮助信息",
        },
      },
    },
    {
      name: "pattern",
      title: "数据校验格式",
      type: "string",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip: "正则表达式",
        },
      },
    },
    {
      name: "message",
      title: "校验错误提示",
      type: "string",
      component: "CodeEditor",
      decorator: "FormItemWithoutAdvanced",
    },
    {
      name: "validator",
      title: "自定义校验规则",
      type: "string",
      component: "CodeEditor",
      decorator: "FormItemWithoutAdvanced",
    },
    {
      name: "wrapperCol",
      title: "控件布局",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip: "可设置span offset值",
        },
      },
    },
    {
      name: "controlBrick",
      title: "构件配置",
      type: "string",
      component: "CodeEditor",
      decorator: "FormItemWithoutAdvanced",
    },
  ],
};
