export const cardItemSchema = {
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
      name: "cardLayoutType",
      title: "布局类型",
      type: "string",
      descorator: "FormItem",
      component: {
        name: "Select",
        props: {
          placeholder: "icon-as-background",
          allowClear: true,
          options: [
            {
              label: "icon-as-background",
              value: "icon-as-background",
            },
            {
              label: "block-icon-align-left",
              value: "block-icon-align-left",
            },
            {
              label: "icon-align-left",
              value: "icon-align-left",
            },
            {
              label: "icon-align-middle",
              value: "icon-align-middle",
            },
            {
              label: "icon-align-right",
              value: "icon-align-right",
            },
            {
              label: "icon-small-align-left",
              value: "icon-small-align-left",
            },
          ],
        },
      },
      "x-reactions": [
        {
          target: "useAfterDescriptionSlot",
          fulfill: {
            state: {
              visible: "{{$self.value==='icon-as-background'}}",
            },
          },
        },
        {
          dependencies: ["showImg"],
          target: "iconColor",
          fulfill: {
            state: {
              visible:
                "{{$deps[0]===false&&($self.value==='icon-small-align-left'||$self.value==='icon-align-right'||$self.value==='icon-align-left')}}",
            },
          },
        },
        {
          dependencies: ["showImg"],
          target: "iconSize",
          fulfill: {
            state: {
              visible:
                "{{$deps[0]===false&&$self.value==='icon-as-background'}}",
            },
          },
        },
        {
          dependencies: ["showImg"],
          target: "iconOffsetX",
          fulfill: {
            state: {
              visible:
                "{{$deps[0]===false&&$self.value==='icon-as-background'}}",
            },
          },
        },
        {
          dependencies: ["showImg"],
          target: "iconOffsetY",
          fulfill: {
            state: {
              visible:
                "{{$deps[0]===false&&$self.value==='icon-as-background'}}",
            },
          },
        },
        {
          dependencies: ["showImg"],
          target: "iconOpacity",
          fulfill: {
            state: {
              visible:
                "{{$deps[0]===false&&$self.value==='icon-as-background'}}",
            },
          },
        },
      ],
    },
    {
      name: "useOldDesc",
      title: "支持多行描述",
      type: "boolean",
      "x-reactions": [
        {
          target: "cardSubtitle",
          fulfill: {
            state: {
              visible: "{{$self.value===true}}",
            },
          },
        },
        {
          target: "descriptionList",
          fulfill: {
            state: {
              visible: "{{$self.value===true}}",
            },
          },
        },
        {
          target: "descMaxLine",
          fulfill: {
            state: {
              visible: "{{$self.value===true}}",
            },
          },
        },
        {
          target: "hideDescCircle",
          fulfill: {
            state: {
              visible: "{{$self.value===true}}",
            },
          },
        },
        {
          target: "descriptionDataType",
          fulfill: {
            state: {
              visible: "{{$self.value===true}}",
            },
          },
        },
        {
          target: "newDescription",
          fulfill: {
            state: {
              visible: "{{$self.value===false}}",
            },
          },
        },
      ],
    },
    {
      name: "cardTitle",
      title: "标题",
      type: "string",
    },
    {
      name: "cardSubtitle",
      title: "副标题",
      type: "string",
    },
    {
      name: "descriptionList",
      title: "描述",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip: "以字符串或字符串数组的形式填入描述列表",
        },
      },
    },
    {
      name: "descMaxLine",
      title: "描述最大行数",
      type: "number",
      component: {
        name: "NumberPicker",
        props: {
          placeholder: 3,
        },
      },
      decorator: "FormItem",
    },
    {
      name: "hideDescCircle",
      title: "隐藏描述前的圆点",
      type: "boolean",
    },
    {
      name: "descriptionDataType",
      title: "描述类型",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
          tooltip:
            "若描述为数组时，应选择list；若描述为字符串时，应选择section",
        },
      },
      enum: [
        {
          label: "list",
          value: "list",
        },
        {
          label: "section",
          value: "section",
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
      name: "newDescription",
      title: "描述",
      type: "string",
    },
    {
      name: "alwaysShowDescription",
      title: "总是保留描述区",
      type: "boolean",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
          tooltip: "保留描述区，则没有描述时也会有相应的空间留白",
        },
      },
    },
    {
      name: "topInformation",
      title: "头部辅助信息",
      type: "string",
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
      name: "bordered",
      title: "显示外边框",
      type: "boolean",
      component: {
        props: {
          size: "small",
          defaultValue: true,
        },
      },
    },
    {
      name: "hoverable",
      title: "启用hover样式",
      type: "boolean",
      component: {
        props: {
          size: "small",
          defaultValue: true,
        },
      },
    },
    {
      name: "showOperationAreaWhenHovering",
      title: "hover时显示操作区",
      type: "boolean",
    },
    {
      name: "disabled",
      title: "禁用状态",
      type: "boolean",
    },
    {
      name: "categoryTitle_link",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "跳转链接",
        },
      },
    },
    {
      name: "href",
      title: "跳转href",
      type: "string",
      decorator: {
        props: {
          tooltip: "优先级最高",
        },
      },
    },
    {
      name: "url",
      title: "跳转url",
      type: "string",
      decorator: {
        props: {
          tooltip: "优先级次于href",
        },
      },
    },
    {
      name: "urlTemplate",
      title: "跳转模板url",
      type: "string",
      decorator: {
        props: {
          tooltip: "优先级次于url，支持模板变量",
        },
      },
    },
    {
      name: "target",
      title: "跳转目标",
      type: "string",
      decorator: {
        props: {
          tooltip: "例如可设置为_blank",
        },
      },
    },
    {
      name: "categoryTitle_icon",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "图标",
        },
      },
    },
    {
      name: "showImg",
      title: "使用图片图标",
      type: "boolean",
      "x-reactions": [
        {
          target: "icon",
          fulfill: {
            state: {
              visible: "{{$self.value===false}}",
            },
          },
        },
        {
          dependencies: ["cardLayoutType"],
          target: "iconColor",
          fulfill: {
            state: {
              visible:
                "{{$self.value===false&&($deps[0]==='icon-small-align-left'||$deps[0]==='icon-align-right'||$deps[0]==='icon-align-left')}}",
            },
          },
        },
        {
          dependencies: ["cardLayoutType"],
          target: "iconSize",
          fulfill: {
            state: {
              visible:
                "{{$self.value===false&&$deps[0]==='icon-as-background'}}",
            },
          },
        },
        {
          dependencies: ["cardLayoutType"],
          target: "iconOffsetX",
          fulfill: {
            state: {
              visible:
                "{{$self.value===false&&$deps[0]==='icon-as-background'}}",
            },
          },
        },
        {
          dependencies: ["cardLayoutType"],
          target: "iconOffsetY",
          fulfill: {
            state: {
              visible:
                "{{$self.value===false&&$deps[0]==='icon-as-background'}}",
            },
          },
        },
        {
          dependencies: ["cardLayoutType"],
          target: "iconOpacity",
          fulfill: {
            state: {
              visible:
                "{{$self.value===false&&$deps[0]==='icon-as-background'}}",
            },
          },
        },
        {
          target: "reverseBgColor",
          fulfill: {
            state: {
              visible: "{{$self.value===false}}",
            },
          },
        },
        {
          target: "iconStyle",
          fulfill: {
            state: {
              visible: "{{$self.value===false}}",
            },
          },
        },
        {
          target: "imgSrc",
          fulfill: {
            state: {
              visible: "{{$self.value===true}}",
            },
          },
        },
        {
          target: "imgSize",
          fulfill: {
            state: {
              visible: "{{$self.value===true}}",
            },
          },
        },
      ],
    },
    {
      name: "icon",
      title: "图标",
      type: "string",
      component: "IconSelect",
    },
    {
      name: "iconColor",
      title: "图标颜色",
      type: "string",
      component: "ColorPicker",
    },
    {
      name: "iconSize",
      title: "图标大小",
      type: "number",
      component: {
        name: "NumberPicker",
        props: {
          placeholder: 100,
        },
      },
      decorator: "FormItem",
    },
    {
      name: "iconOffsetX",
      title: "图标X轴偏移",
      type: "number",
      component: "NumberPicker",
      decorator: "FormItem",
    },
    {
      name: "iconOffsetY",
      title: "图标Y轴偏移",
      type: "number",
      component: "NumberPicker",
      decorator: "FormItem",
    },
    {
      name: "iconOpacity",
      title: "图标透明度",
      type: "number",
      component: {
        name: "NumberPicker",
        props: {
          placeholder: 0.45,
        },
      },
      decorator: "FormItem",
    },
    {
      name: "reverseBgColor",
      title: "反转背景色",
      type: "boolean",
    },
    {
      name: "iconStyle",
      title: "图标样式",
      type: "string",
      component: "CodeEditor",
      decorator: "FormItemWithoutAdvanced",
    },
    {
      name: "imgSrc",
      title: "图标链接",
      type: "string",
    },
    {
      name: "imgSize",
      title: "图标大小",
      type: "number",
      component: "NumberPicker",
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "默认铺满",
        },
      },
    },
    {
      name: "shape",
      title: "形状",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
      enum: [
        {
          label: "圆形",
          value: "circle",
        },
        {
          label: "方形",
          value: "square",
        },
        {
          label: "圆角",
          value: "round-square",
        },
      ],
      component: {
        name: "Radio.Group",
        props: {
          size: "small",
          optionType: "button",
          defaultValue: "circle",
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
      name: "tagConfig",
      title: "右上角标签",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
      },
    },
    {
      name: "dataSource",
      title: "数据源",
      type: "string",
      required: true,
      component: {
        name: "Select",
        props: {
          placeholder: "请选择数据源",
          allowClear: true,
        },
      },
    },
    {
      name: "fields",
      title: "字段映射",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip: "配合数据源一起使用来获得运行时必要字段",
        },
      },
    },
    {
      name: "useAfterDescriptionSlot",
      title: "支持afterDescription插槽",
      type: "boolean",
    },
    {
      name: "useLinkBehavior",
      title: "内部使用a标签实现点击",
      type: "boolean",
      component: {
        props: {
          size: "small",
          defaultValue: true,
        },
      },
    },
    {
      name: "configProps",
      title: "其他配置",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip: "完全透传给antd的Card属性",
        },
      },
    },
  ],
};
