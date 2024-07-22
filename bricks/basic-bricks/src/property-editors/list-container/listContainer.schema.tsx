export const listContainerSchema = {
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
      name: "data",
      title: "数据列表",
      type: "string",
      component: "CodeEditor",
      decorator: "FormItemWithoutAdvanced",
    },
    {
      name: "useBrick",
      title: "子构件配置",
      type: "string",
      component: {
        name: "CodeEditor",
        props: {
          placeholder:
            "brick: presentational-bricks.agent-status\nproperties:\n  value: <% DATA %>",
        },
      },
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip: "具体查阅文档UseBrickConf",
        },
      },
    },
    {
      name: "itemKey",
      title: "数据项Key",
      type: "string",
      component: {
        name: "CodeEditor",
      },
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip: "不设置则默认使用index",
        },
      },
    },
    {
      name: "isGridLayout",
      title: "容器使用grid布局",
      type: "boolean",
      decorator: {
        props: {
          tooltip: "容器本身默认是grid布局",
        },
      },
      "x-reactions": [
        {
          target: "extraContainerStyle",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "gap",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "containerStyle",
          fulfill: {
            state: {
              visible: "{{!$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "extraContainerStyle",
      title: "容器额外样式",
      type: "CodeEditor",
      component: {
        name: "CodeEditor",
      },
    },
    {
      name: "gap",
      title: "间距",
      type: "string",
      component: {
        props: {
          placeholder: "var(--card-content-gap)",
        },
      },
    },
    {
      name: "containerStyle",
      title: "自定义容器的样式",
      type: "CodeEditor",
      decorator: {
        props: {
          tooltip: "会覆盖容器默认的样式配置",
        },
      },
    },
  ],
};
