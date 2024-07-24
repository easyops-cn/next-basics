export const brickTableSchema = {
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
      name: "dataSource",
      title: "选择数据",
      type: "string",
      required: true,
      component: {
        name: "Select",
        props: {
          placeholder: "请选择数据",
          allowClear: true,
        },
      },
    },
    {
      name: "columns",
      title: "表格列配置",
      type: "string",
      required: true,
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip: "扩展自antd的table Column相关配置项",
        },
      },
    },
    {
      type: "string",
      name: "rowKey",
      required: true,
      title: "表格行key",
      component: {
        name: "Select",
        props: {
          placeholder: "index",
          allowClear: true,
        },
      },
    },
    {
      name: "hiddenColumns",
      title: "隐藏表格列",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip: "输入对应的dataIndex或者key",
        },
      },
    },
    {
      name: "categoryTitle_page",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "页设置",
        },
      },
    },
    {
      name: "isPagination",
      title: "显示分页",
      type: "boolean",
      component: {
        props: {
          defaultValue: true,
        },
      },
      "x-reactions": [
        {
          target: "pagination",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "storeCheckedByUrl",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          dependencies: ["frontSearch"],
          target: "page",
          fulfill: {
            state: {
              visible: "{{$self.value&&$deps[0]}}",
            },
          },
        },
        {
          dependencies: ["frontSearch"],
          target: "pageSize",
          fulfill: {
            state: {
              visible: "{{$self.value&&$deps[0]}}",
            },
          },
        },
      ],
    },
    {
      name: "pagination",
      title: "分页配置",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
      },
    },
    {
      name: "storeCheckedByUrl",
      title: "翻页时记录已选项",
      type: "boolean",
      component: {
        props: {
          defaultValue: false,
        },
      },
      decorator: {
        name: "FormItem",
        props: {
          tooltip:
            "已选项的rowKey将保存在url中，如果不设置rowKey，该设置不生效。如果选择太多可能会造成url过长，请谨慎使用",
          layout: "horizontal",
        },
      },
    },
    {
      name: "categoryTitle_select",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "选择",
        },
      },
    },
    {
      name: "rowSelection",
      title: "支持选择表格行",
      type: "boolean",
      "x-reactions": [
        {
          target: "type",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "showSelectInfo",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "defaultSelectAll",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          dependencies: ["defaultSelectAll"],
          target: "selectedRowKeys",
          fulfill: {
            state: {
              visible: "{{$self.value&&!$deps[0]}}",
            },
          },
        },
        {
          target: "selectAllChildren",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "autoSelectParentWhenAllChildrenSelected",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "rowDisabledConfig",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "type",
      title: "选框类型",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
      enum: [
        {
          label: "复选",
          value: "checkbox",
        },
        {
          label: "单选",
          value: "radio",
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
      name: "showSelectInfo",
      title: "显示已选信息",
      type: "boolean",
    },
    {
      name: "defaultSelectAll",
      title: "默认选中所有行",
      type: "boolean",
      "x-reactions": [
        {
          dependencies: ["rowSelection"],
          target: "selectedRowKeys",
          fulfill: {
            state: {
              visible: "{{!$self.value&&$deps[0]}}",
            },
          },
        },
      ],
    },
    {
      name: "selectedRowKeys",
      title: "指定选中项",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
      },
    },
    {
      name: "selectAllChildren",
      title: "勾选父节点时同步所有子节点",
      type: "boolean",
      decorator: {
        name: "FormItem",
        props: {
          tooltip:
            "用于表格树形数据展示的场景，且被同步勾选的子节点不能单独取消。该属性必须设置表格行key",
          layout: "horizontal",
        },
      },
    },
    {
      name: "autoSelectParentWhenAllChildrenSelected",
      title: "全选子节点时回选父节点",
      type: "boolean",
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "当所有子节点选中时，自动选中父节点",
          layout: "horizontal",
        },
      },
    },
    {
      name: "rowDisabledConfig",
      title: "行禁用配置",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip: "具体使用查阅文档",
        },
      },
    },
    {
      name: "categoryTitle_sort",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "排序",
        },
      },
    },
    {
      name: "sortable",
      title: "支持排序",
      type: "boolean",
      component: {
        props: {
          defaultValue: true,
        },
      },
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "当对应列的sorter设置成true时则可排序",
          layout: "horizontal",
        },
      },
      "x-reactions": [
        {
          target: "order",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "sort",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "order",
      title: "排序方式",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
      enum: [
        {
          label: "升序",
          value: "ascend",
        },
        {
          label: "降序",
          value: "descend",
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
      name: "sort",
      title: "被排序的列",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          tooltip:
            "输入列的dataIndex，通常来自于url参数，可以设置成${QUERY.sort}",
          layout: "horizontal",
        },
      },
    },
    {
      name: "categoryTitle_expand",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "展开与树形展示",
        },
      },
    },
    {
      name: "expandable",
      title: "支持展开",
      type: "boolean",
      "x-reactions": [
        {
          target: "defaultExpandAllRows",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          dependencies: ["defaultExpandAllRows"],
          target: "expandedRowKeys",
          fulfill: {
            state: {
              visible: "{{$self.value&&!$deps[0]}}",
            },
          },
        },
        {
          target: "expandRowByClick",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "expandedRowBrick",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "expandIcon",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "expandIconAsCell",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          dependencies: ["expandIconAsCell"],
          target: "expandIconColumnIndex",
          fulfill: {
            state: {
              visible: "{{$self.value&&!$deps[0]}}",
            },
          },
        },
        {
          target: "childrenColumnName",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "showHeaderExpandAll",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "stripEmptyExpandableChildren",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "defaultExpandAllRows",
      title: "默认展开所有行",
      type: "boolean",
      "x-reactions": [
        {
          dependencies: ["expandable"],
          target: "expandedRowKeys",
          fulfill: {
            state: {
              visible: "{{!$self.value&&$deps[0]}}",
            },
          },
        },
      ],
    },
    {
      name: "expandedRowKeys",
      title: "指定展开行",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
      },
    },
    {
      name: "expandRowByClick",
      title: "支持点击行展开子行",
      type: "boolean",
    },
    {
      name: "expandedRowBrick",
      title: "自定义展开构件",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
      },
    },
    {
      name: "expandIcon",
      title: "自定义展开图标",
      type: "string",
      component: "IconSelect",
    },
    {
      name: "expandIconAsCell",
      title: "展开图标显示为单元格",
      type: "boolean",
      component: {
        props: {
          defaultValue: true,
        },
      },
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "默认显示在第一列，设置为false时，可以设置展开图标所在列",
          layout: "horizontal",
        },
      },
      "x-reactions": [
        {
          dependencies: ["expandable"],
          target: "expandIconColumnIndex",
          fulfill: {
            state: {
              visible: "{{!$self.value&&$deps[0]}}",
            },
          },
        },
      ],
    },
    {
      name: "expandIconColumnIndex",
      title: "展开图标显示所在列",
      decorator: "FormItem",
      type: "number",
      component: {
        name: "NumberPicker",
      },
    },
    {
      name: "childrenColumnName",
      title: "指定树形结构的列名",
      type: "string",
      component: {
        props: {
          placeholder: "children",
        },
      },
    },
    {
      name: "showHeaderExpandAll",
      title: "显示展开全部按钮",
      type: "boolean",
    },
    {
      name: "stripEmptyExpandableChildren",
      title: "树形数据展示时去除空数组",
      type: "boolean",
    },
    {
      name: "categoryTitle_search",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "搜索与过滤",
        },
      },
    },
    {
      name: "frontSearch",
      title: "使用前端搜索",
      type: "boolean",
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "配合presentational-bricks.brick-input使用",
          layout: "horizontal",
        },
      },
      "x-reactions": [
        {
          dependencies: ["isPagination"],
          target: "page",
          fulfill: {
            state: {
              visible: "{{$self.value&&$deps[0]}}",
            },
          },
        },
        {
          dependencies: ["isPagination"],
          target: "pageSize",
          fulfill: {
            state: {
              visible: "{{$self.value&&$deps[0]}}",
            },
          },
        },
        {
          target: "frontSearchQuery",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "exactSearch",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "frontSearchFilterKeys",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
        {
          target: "qField",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "page",
      title: "页码",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "前台搜索的时候，一般配置成${query.page=1|number}",
          layout: "horizontal",
        },
      },
    },
    {
      name: "pageSize",
      title: "页大小",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          tooltip: "前台搜索的时候，一般配置成${query.pageSize=10|number}",
          layout: "horizontal",
        },
      },
    },
    {
      name: "frontSearchQuery",
      title: "搜索参数",
      type: "string",
    },
    {
      name: "exactSearch",
      title: "精确搜索",
      type: "boolean",
    },
    {
      name: "frontSearchFilterKeys",
      title: "搜索目标字段",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip:
            '支持嵌套的写法如["name","value.a"]，不配置的时候默认为对所有 columns 的 dataIndex[]进行前端搜索',
        },
      },
    },
    {
      name: "qField",
      title: "搜索内容映射到url的字段名",
      type: "string",
      component: {
        props: {
          placeholder: "q",
        },
      },
    },
    {
      name: "filters",
      title: "表头默认过滤配置",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip:
            "以key+value的形式传递，key为column的dataIndex，value为过滤值的集合",
        },
      },
    },
    {
      name: "categoryTitle_drag",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "拖拽",
        },
      },
    },
    {
      name: "tableDraggable",
      title: "表格行可拖拽",
      type: "boolean",
      component: {
        props: {
          size: "small",
        },
      },
      decorator: {
        name: "FormItem",
        props: {
          tooltip:
            '如果是树形数据的表格，则各行需要设置__acceptType，并保证同层级的__acceptType值相同 [ { id: "parent1", __acceptType: "level-1", children: [ { id: "sub1", __acceptType: "parent1-sub" }, { id: "sub2", __acceptType: "parent1-sub" } ] }, { id: "parent2", __acceptType: "level-1", children: [ { id: "sub3", __acceptType: "parent2-sub" } ] } ]',
          layout: "horizontal",
        },
      },
      "x-reactions": [
        {
          target: "acceptType",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "acceptType",
      title: "元素的类型",
      type: "string",
      component: {
        props: {
          placeholder: "DraggableBodyRow",
        },
      },
      decorator: {
        props: {
          tooltip: "只有类型相同的元素才能进行drop操作",
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
      title: "表格大小",
      type: "string",
      decorator: {
        name: "FormItem",
        props: {
          layout: "horizontal",
        },
      },
      enum: [
        {
          label: "XS",
          value: "x-small",
        },
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
      name: "zebraPattern",
      title: "斑马纹样式",
      type: "boolean",
    },
    {
      name: "ellipsisInfo",
      title: "省略溢出内容",
      type: "boolean",
    },
    {
      name: "showCard",
      title: "显示外层卡片",
      type: "boolean",
      component: {
        props: {
          defaultValue: true,
        },
      },
    },
    {
      name: "showHeader",
      title: "显示表头",
      type: "boolean",
      component: {
        props: {
          defaultValue: true,
        },
      },
      "x-reactions": [
        {
          target: "thTransparent",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "thTransparent",
      title: "表头透明",
      type: "boolean",
    },
    {
      name: "categoryTitle_other",
      type: "void",
      decorator: {
        name: "CategoryTitle",
        props: {
          text: "其他",
        },
      },
    },
    {
      name: "scrollConfigs",
      title: "表格滚动配置",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
      },
    },
    {
      name: "emptyUseBrick",
      title: "自定义空状态构件",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
      },
    },
    {
      name: "optimizedColumns",
      title: "需优化渲染的列",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
        props: {
          tooltip:
            "输入对应列的dataIndex。当前 antd 在更新 state 的时候，会全量渲染单元格，如果确定某一列在后续操作中无需重新渲染，例如仅作为展示的单元格，可通过该属性设置以优化性能。注意，在树形表格中，当某一列内包含展开/收起按钮，则不应该设置该列",
        },
      },
    },
    {
      name: "shouldUpdateUrlParams",
      title: "自动更新url参数",
      type: "boolean",
      component: {
        props: {
          defaultValue: true,
        },
      },
      "x-reactions": [
        {
          target: "shouldRenderWhenUrlParamsUpdate",
          fulfill: {
            state: {
              visible: "{{$self.value}}",
            },
          },
        },
      ],
    },
    {
      name: "shouldRenderWhenUrlParamsUpdate",
      title: "更新url时重新渲染页面",
      type: "boolean",
      component: {
        props: {
          defaultValue: true,
        },
      },
    },
    {
      name: "fields",
      title: "字段来源映射",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
      },
    },
    {
      name: "configProps",
      title: "表格透传配置",
      type: "string",
      component: "CodeEditor",
      decorator: {
        name: "FormItemWithoutAdvanced",
      },
    },
  ],
};
