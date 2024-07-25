export const modalConfirmSchema = {
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
          label: "确认",
          value: "confirm",
        },
        {
          label: "说明",
          value: "info",
        },
        {
          label: "成功",
          value: "success",
        },
        {
          label: "错误",
          value: "error",
        },
        {
          label: "警告",
          value: "warning",
        },
      ],
      component: {
        name: "Radio.Group",
        props: {
          size: "small",
          optionType: "button",
          defaultValue: "confirm",
        },
      },
    },
    {
      name: "width",
      title: "宽度",
      type: "string",
      decorator: {
        name: "FormItem",
      },
    },
    {
      name: "modalTitle",
      title: "标题",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "支持模板，可通过#{xxx}的方式获取数据源字段上的值",
        },
      },
    },
    {
      name: "content",
      title: "内容",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "支持模板和HTML",
        },
      },
    },
    {
      name: "extraContent",
      title: "额外内容",
      type: "string",
    },
    {
      name: "contentBrick",
      title: "内容构件",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip: "使用useBrick，会覆盖整个内容区域",
        },
      },
    },
    {
      name: "dataSource",
      title: "数据源",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          tooltip:
            "解析模板时的数据源，配合内容属性使用，并作为点击事件的detail值",
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
      name: "categoryTitle_ok",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "确定",
        },
      },
    },
    {
      name: "okType",
      title: "按钮类型",
      type: "string",
      descorator: "FormItem",
      component: {
        name: "Select",
        props: {
          placeholder: "Default",
          allowClear: true,
          options: [
            {
              label: "Default",
              value: "default",
            },
            {
              label: "Link",
              value: "link",
            },
            {
              label: "Primary",
              value: "primary",
            },
            {
              label: "Ghost",
              value: "ghost",
            },
            {
              label: "Dashed",
              value: "dashed",
            },
            {
              label: "Danger",
              value: "danger",
            },
          ],
        },
      },
    },
    {
      name: "okText",
      title: "按钮文案",
      type: "string",
      decorator: {
        name: "FormItem",
      },
    },
    {
      name: "okButtonProps",
      title: "按钮属性",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip: "同antd Modal的okButtonProps",
        },
      },
    },
    {
      name: "confirmLoading",
      title: "按钮显示加载中",
      type: "boolean",
      decorator: {
        name: "FormItem",
        props: {
          tooltip:
            "在发起后台请求并且请求较慢的情况下可以设置loading状态优化用户体验",
          layout: "horizontal",
        },
      },
    },
    {
      name: "expect",
      title: "二次确认关键字",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "支持模板，用户需输入该关键字才会启用确定按钮",
          layout: "horizontal",
        },
      },
    },
    {
      name: "closeWhenOk",
      title: "点击确定即关闭模态框",
      type: "boolean",
      component: {
        props: {
          size: "small",
          defaultValue: true,
        },
      },
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
    },
    {
      name: "categoryTitle_cancel",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "取消",
        },
      },
    },
    {
      name: "cancelText",
      title: "取消按钮文案",
      type: "string",
      decorator: {
        name: "FormItem",
      },
    },
    {
      name: "cancelButtonProps",
      title: "取消按钮属性",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip: "同antd Modal的cancelButtonProps",
        },
      },
    },
  ],
};
