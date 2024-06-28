export const generalTextareaSchema = {
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
      component: {
        name: "Input.TextArea",
      },
      decorator: "FormItem",
    },
    {
      name: "disabled",
      title: "禁用",
      type: "boolean",
    },
    {
      name: "readOnly",
      title: "只读",
      type: "boolean",
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
      name: "categoryTitle_textarea",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "文本框",
        },
      },
    },
    {
      name: "autoSize",
      title: "自适应内容高度",
      type: "boolean",
    },
    {
      name: "minRows",
      title: "最小行数",
      type: "number",
      component: {
        name: "NumberPicker",
      },
      decorator: "FormItem",
    },
    {
      name: "maxRows",
      title: "最大行数",
      type: "number",
      component: {
        name: "NumberPicker",
      },
      decorator: "FormItem",
    },
    {
      name: "placeholder",
      title: "占位文本",
      type: "string",
    },
    {
      name: "trim",
      title: "去除前后的空白符",
      type: "boolean",
      component: {
        name: "Switch",
        props: {
          defaultValue: true,
        },
      },
    },
    {
      name: "categoryTitle_validator",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "校验",
        },
      },
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
      "x-reactions": [
        {
          target: "requiredValidatorText",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "requiredValidatorText",
      title: "必填提示文字",
      type: "string",
    },
    {
      name: "pattern",
      title: "正则校验规则",
      type: "string",
      "x-reactions": [
        {
          target: "patternValidatorText",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "patternValidatorText",
      title: "正则提示文字",
      type: "string",
    },
    {
      name: "max",
      title: "最大长度",
      type: "number",
      component: {
        name: "NumberPicker",
      },
      decorator: "FormItem",
    },
    {
      name: "min",
      title: "最小长度",
      type: "number",
      component: {
        name: "NumberPicker",
      },
      decorator: "FormItem",
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
      type: "string",
      component: {
        name: "CodeEditor",
      },
      decorator: "FormItemWithoutAdvanced",
    },
    {
      name: "labelBrick",
      title: "标签构件",
      type: "string",
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
