export const datetimeSelectorSchema = {
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
      name: "from",
      title: "默认起始时间",
      type: "string",
      component: {
        props: {
          placeholder: "now-1d",
        },
      },
      decorator: {
        name: "FormItem",
        props: {
          tooltip:
            '按下列规则书写: "now-1h", "now-1d", "now/d", "now-7d", "now-30d"',
        },
      },
    },
    {
      name: "to",
      title: "默认结束时间",
      type: "string",
    },
    {
      name: "shouldUpdateUrlParams",
      title: "自动更新url并刷新页面",
      type: "boolean",
      component: {
        props: {
          defaultValue: true,
          size: "small",
        },
      },
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "默认显示常用的几种时间范围，如有需要可自定义",
          layout: "horizontal",
        },
      },
    },
    {
      name: "isCustomType",
      title: "自定义可选时间范围",
      type: "boolean",
      "x-reactions": [
        {
          target: "customTimeRange",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "customTimeRange",
      title: "可选时间范围",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
      },
    },
    {
      name: "resolution",
      title: "时间戳单位",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
      enum: [
        {
          label: "毫秒",
          value: "ms",
        },
        {
          label: "秒",
          value: "s",
        },
      ],
      component: {
        name: "Radio.Group",
        props: {
          size: "small",
          optionType: "button",
          defaultValue: "ms",
        },
      },
    },
    {
      name: "selectNearDays",
      title: "限制选择最近天数",
      type: "number",
      component: {
        name: "NumberPicker",
      },
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "可选范围限制到当天及其前N天",
        },
      },
    },
    {
      name: "rangeDays",
      title: "限制选择范围天数",
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "可选范围天数长度限制为N天",
        },
      },
      type: "number",
      component: {
        name: "NumberPicker",
      },
    },
    {
      name: "format",
      title: "展示日期格式",
      type: "string",
      component: {
        props: {
          placeholder: "yyyy-MM-dd HH:mm:ss",
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
      name: "size",
      title: "按钮大小",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
      enum: [
        {
          label: "S",
          value: "small",
        },
        {
          label: "M",
          value: "default",
        },
        {
          label: "L",
          value: "large",
        },
      ],
      component: {
        name: "Radio.Group",
        props: {
          size: "small",
          optionType: "button",
          defaultValue: "default",
        },
      },
    },
    {
      name: "placement",
      title: "选框弹出位置",
      type: "string",
      decorator: {
        name: "FormItem",
      },
      component: {
        name: "Select",
        props: {
          placeholder: "bottom",
          options: [
            {
              label: "top",
              value: "top",
            },
            {
              label: "left",
              value: "left",
            },
            {
              label: "right",
              value: "right",
            },
            {
              label: "bottom",
              value: "bottom",
            },
            {
              label: "topLeft",
              value: "topLeft",
            },
            {
              label: "topRight",
              value: "topRight",
            },
            {
              label: "bottomLeft",
              value: "bottomLeft",
            },
            {
              label: "bottomRight",
              value: "bottomRight",
            },
            {
              label: "leftTop",
              value: "leftTop",
            },
            {
              label: "leftBottom",
              value: "leftBottom",
            },
            {
              label: "rightTop",
              value: "rightTop",
            },
            {
              label: "rightBottom",
              value: "rightBottom",
            },
          ],
        },
      },
    },
  ],
};
