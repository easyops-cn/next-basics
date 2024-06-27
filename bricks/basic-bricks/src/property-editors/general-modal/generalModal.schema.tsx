export const generalModalSchema = {
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
      name: "modalTitle",
      title: "标题",
      type: "string",
    },
    {
      name: "titleIcon",
      title: "标题图标",
      type: "string",
      component: "IconSelect",
    },
    {
      name: "titleAlign",
      title: "标题对齐方式",
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
          label: "中",
          value: "center",
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
      name: "width",
      title: "模态框宽度",
      type: "number",
      component: "NumberPicker",
      decorator: "FormItem",
    },
    {
      name: "enableFooterSlot",
      title: "启用底部插槽",
      type: "boolean",
    },
    {
      name: "maskClosable",
      title: "点击蒙层可关闭弹框",
      type: "boolean",
      component: {
        props: {
          size: "small",
          defaultValue: true,
        },
      },
    },
    {
      name: "categoryTitle_style",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "样式",
        },
      },
    },
    {
      name: "isHiddenBodyPadding",
      title: "隐藏内容区内边距",
      type: "boolean",
    },
    {
      name: "isHiddenHeaderBorder",
      title: "隐藏头部分割线",
      type: "boolean",
    },
    {
      name: "isHiddenFooterColor",
      title: "隐藏底部背景颜色",
      type: "boolean",
    },
    {
      name: "fullscreen",
      title: "启用全屏模式",
      type: "boolean",
    },
    {
      name: "footerPosition",
      title: "底部对齐方式",
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
          label: "中",
          value: "center",
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
      name: "categoryTitle_confirm",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "确认按钮",
        },
      },
    },
    {
      name: "okText",
      title: "确认按钮文字",
      type: "string",
      component: {
        props: {
          placeholder: "确认",
        },
      },
    },
    {
      name: "okType",
      title: "确认按钮类型",
      type: "string",
      component: {
        name: "Select",
        props: {
          placeholder: "Primary",
          allowClear: true,
          options: [
            { label: "Link", value: "link" },
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" },
            { label: "Ghost", value: "ghost" },
            { label: "Dashed", value: "dashed" },
            { label: "Danger", value: "danger" },
          ].map((item) => ({
            label: item.label,
            value: item.value,
          })),
        },
      },
    },
    {
      name: "okDisabled",
      title: "禁用确认按钮",
      type: "boolean",
    },
    {
      name: "confirmLoading",
      title: "确认按钮显示加载中",
      type: "boolean",
    },
    {
      name: "closeWhenOk",
      title: "确认时自动关闭弹框",
      type: "boolean",
      decorator: {
        props: {
          tooltip: "值为false时，点击确认后需要自行关闭弹框",
        },
      },
      component: {
        props: {
          defaultValue: true,
        },
      },
    },
    {
      name: "categoryTitle_cancel",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "取消按钮",
        },
      },
    },
    {
      name: "cancelText",
      title: "取消按钮文字",
      type: "string",
      component: {
        props: {
          placeholder: "取消",
        },
      },
    },
    {
      name: "hideCancelButton",
      title: "隐藏取消按钮",
      type: "boolean",
    },
    {
      name: "closeWhenCancel",
      title: "取消时自动关闭弹框",
      type: "boolean",
      component: {
        props: {
          defaultValue: true,
        },
      },
    },
    {
      name: "categoryTitle_advaneced",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "高级",
        },
      },
    },
    {
      name: "dataSource",
      title: "数据源",
      type: "string",
      decorator: {
        props: {
          tooltip: "将作为确认和取消事件中detail的值",
        },
      },
      component: {
        name: "Select",
        props: {
          placeholder: "请选择数据源",
          allowClear: true,
        },
      },
    },
    {
      name: "configProps",
      title: "其他设置",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip: "直接透传给antd的Modal属性",
        },
      },
    },
  ],
};
