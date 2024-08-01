export const cmdbInstanceSelectSchema = {
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
      name: "categoryTitle_item",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "表单项",
        },
      },
    },
    {
      name: "name",
      title: "字段名",
      type: "string",
    },
    {
      name: "label",
      title: "标签",
      type: "string",
    },
    {
      name: "value",
      title: "值",
      type: "string",
    },
    {
      name: "disabled",
      title: "禁用",
      type: "boolean",
    },
    {
      name: "required",
      title: "必填",
      type: "boolean",
      component: {
        props: {
          size: "small",
        },
      },
    },
    {
      name: "notRender",
      title: "隐藏表单项",
      type: "boolean",
      component: {
        name: "Switch",
      },
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
          tooltip:
            "区别于通用的“隐藏”属性，隐藏表单项时，表单不仅不显示当前项，同时也不会校验当前项；通用隐藏仅仅是不显示，但仍会校验当前项。通常，您应选择此属性来隐藏表单项。",
        },
      },
    },
    {
      name: "allowClear",
      title: "支持清楚选项",
      type: "boolean",
    },
    {
      name: "mode",
      title: "多选模式",
      type: "string",
      component: {
        name: "Select",
        props: {
          options: [
            {
              label: "多选模式",
              value: "multiple",
            },
            {
              label: "标签模式",
              value: "tags",
            },
          ],
        },
      },
    },
    {
      name: "showSearchTip",
      title: "下拉列表提示",
      type: "boolean",
    },
    {
      name: "showTooltip",
      title: "label过长时提示",
      type: "boolean",
    },
    {
      name: "categoryTitle_input",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "模型",
        },
      },
    },
    {
      name: "objectId",
      title: "模型id",
      type: "string",
    },
    {
      name: "instanceQuery",
      title: "下拉框选项的过滤条件",
      type: "string",
      component: "CodeEditor",
      decorator: "FormItemWithoutAdvanced",
    },
    {
      name: "fields",
      title: "自定义 select 下拉选项的 label 和 value 字段",
      type: "string",
      component: "CodeEditor",
      decorator: "FormItemWithoutAdvanced",
    },
    {
      name: "pageSize",
      title: "搜索条数",
      type: "string",
      component: {
        name: "NumberPicker",
        props: {
          defaultValue: 30,
        },
      },
    },
    {
      name: "categoryTitle_itemStyle",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "表单项样式",
        },
      },
    },
    {
      name: "labelAlign",
      title: "标签对齐方式",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
      enum: [
        {
          label: "左对齐",
          value: "left",
        },
        {
          label: "右对齐",
          value: "right",
        },
      ],
      component: {
        name: "Radio.Group",
        props: {
          size: "small",
          optionType: "button",
          defaultValue: "left",
        },
      },
    },
    {
      name: "labelColor",
      title: "标签颜色",
      type: "string",
      component: "ColorPicker",
    },
    {
      name: "labelBold",
      title: "标签加粗",
      type: "boolean",
    },
    {
      name: "labelTooltip",
      title: "标签提示",
      type: "string",
    },
    {
      name: "labelCol",
      title: "标签布局",
      component: {
        name: "CodeEditor",
      },
      decorator: "FormItemWithoutAdvanced",
    },
    {
      name: "labelBrick",
      title: "标签构件",
      component: {
        name: "CodeEditor",
      },
      decorator: "FormItemWithoutAdvanced",
    },
    {
      name: "inputBoxStyle",
      title: "输入框样式",
      type: "string",
      component: {
        name: "CodeEditor",
      },
      decorator: "FormItemWithoutAdvanced",
    },
    {
      name: "wrapperCol",
      title: "控件布局",
      type: "string",
      component: {
        name: "CodeEditor",
      },
      decorator: "FormItemWithoutAdvanced",
    },
    {
      name: "helpBrick",
      title: "帮助构件",
      type: "string",
      component: {
        name: "CodeEditor",
      },
      decorator: "FormItemWithoutAdvanced",
    },
  ],
};
