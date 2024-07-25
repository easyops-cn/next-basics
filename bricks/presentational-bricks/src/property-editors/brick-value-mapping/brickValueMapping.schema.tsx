export const brickValueMappingSchema = {
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
      name: "value",
      title: "值",
      type: "string",
      decorator: {
        name: "FormItem",
      },
    },
    {
      name: "mapping",
      title: "映射规则",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
      },
    },
    {
      name: "triggerClickEvent",
      title: "支持触发点击事件",
      type: "boolean",
      decorator: {
        name: "FormItem",
      },
      "x-reactions": [
        {
          target: "dataSource",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "link",
          fulfill: {
            state: {
              visible: "{{!$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "dataSource",
      title: "数据源",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "点击事件传出的数据",
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
      name: "link",
      title: "跳转链接",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
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
      name: "showTagCircle",
      title: "显示标签圆点",
      type: "boolean",
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "按照平台规范，通常表示状态的标签需显示圆点",
        },
      },
    },
    {
      name: "isTextEllipsis",
      title: "文案溢出省略",
      type: "boolean",
      decorator: {
        name: "FormItem",
      },
    },
  ],
};
