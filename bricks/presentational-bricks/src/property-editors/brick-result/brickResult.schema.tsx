export const IllustrationsStatusOptions = [
  {
    label: "自定义插画",
    value: "illustrations",
  },
];

export const BrickResultStatusOptions = [
  {
    label: "403",
    value: "403",
  },
  {
    label: "404",
    value: "404",
  },
  {
    label: "500",
    value: "500",
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
    label: "警告",
    value: "warning",
  },
  {
    label: "错误",
    value: "error",
  },
];

export const EmptyResultStatusOptions = [
  {
    label: "浏览器版本过低",
    value: "browser-too-old",
  },
  {
    label: "空内容",
    value: "empty",
  },
  {
    label: "没有数据",
    value: "no-data",
  },
  {
    label: "没有历史版本",
    value: "no-history-version",
  },
  {
    label: "没有浏览记录",
    value: "no-visit-record",
  },
  {
    label: "搜索为空",
    value: "search-empty",
  },
  {
    label: "引导创建",
    value: "welcome-to-create",
  },
];

export const brickResultSchema = {
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
      name: "status",
      title: "类型",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "类型决定展示的样式",
        },
      },
      component: {
        name: "Select",
        props: {
          options: [
            ...IllustrationsStatusOptions,
            ...BrickResultStatusOptions,
            ...EmptyResultStatusOptions,
          ],
        },
      },
      "x-reactions": [
        {
          target: "icon",
          fulfill: {
            state: {
              visible:
                "{{BrickResultStatusOptions.some(item => item.value === $self.value)}}",
            },
          },
        },
        {
          target: "illustrationsConfig",
          fulfill: {
            state: {
              visible:
                "{{IllustrationsStatusOptions.some(item => item.value === $self.value)}}",
            },
          },
        },
        {
          target: "emptyResultSize",
          fulfill: {
            state: {
              visible:
                "{{EmptyResultStatusOptions.some(item => item.value === $self.value)}}",
            },
          },
        },
      ],
    },
    {
      name: "useNewIllustration",
      title: "使用新图标",
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
          tooltip: "使用新版本的图标替换插画库default分类图标",
          layout: "horizontal",
        },
      },
    },
    {
      name: "customTitle",
      title: "主标题",
      type: "string",
    },
    {
      name: "subTitle",
      title: "副标题",
      type: "string",
    },
    {
      name: "icon",
      type: "string",
      title: "自定义图标",
      component: "IconSelect",
    },
    {
      name: "illustrationsConfig",
      title: "自定义插画配置",
      type: "string",
      component: {
        name: "CodeEditor",
        props: {
          placeholder:
            "category: default\nimageStyle: \n  backgroundColor: red \nname: search-empty\nsize: large",
        },
      },
      decorator: "FormItemWithoutAdvanced",
    },
    {
      name: "emptyResultSize",
      title: "空状态插画大小",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
      component: {
        name: "Radio.Group",
        props: {
          size: "small",
          optionType: "button",
          defaultValue: "middle",
          options: [
            {
              label: "S",
              value: "small",
            },
            {
              label: "M",
              value: "middle",
            },
            {
              label: "L",
              value: "large",
            },
            {
              label: "XL",
              value: "xlarge",
            },
          ],
        },
      },
    },
  ],
};
