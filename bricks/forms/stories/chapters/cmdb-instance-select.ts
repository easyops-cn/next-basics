import { Story } from "@next-core/brick-types";
import { cmdbInstanceSelectSvg } from "../images";
export const cmdbInstanceSelectStory: Story = {
  storyId: "forms.cmdb-instance-select",
  type: "brick",
  category: "form-input-business",
  author: "jo",
  text: {
    en: "Cmdb Instance Select",
    zh: "cmdb 实例下拉框",
  },
  description: {
    en: "The Select which fetch cmdb instance data as a data source",
    zh: "通过拉取 cmdb 实例数据作为数据源的下拉框",
  },
  icon: {
    imgSrc: cmdbInstanceSelectSvg,
  },
  conf: [
    {
      bricks: [
        {
          brick: "forms.cmdb-instance-select",
          properties: {
            name: "app",
            label: "选择应用",
            objectId: "APP",
            dataset: {
              testid: "basic-usage-demo",
            },
          },
          events: {
            "forms.cmdb-instance-select.change": {
              action: "console.log",
            },
            "forms.cmdb-instance-select.change.v2": {
              action: "console.log",
            },
          },
        },
      ],
      snippetId: "forms.cmdb-instance-select[basic]",
      title: {
        en: "Basic CMDB Instance Select",
        zh: "基础CMDB实例下拉框",
      },
    },
    {
      brick: "forms.general-select",
      events: {
        "general.select.change": {
          action: "console.log",
          args: ["模型", "<% EVENT.detail %>"],
        },
      },
      description: {
        title: "后端搜索",
        message:
          "后端搜索，默认Debounce为`300ms`（只能使用契约类型的provider）",
      },
      properties: {
        dataset: {
          testid: "basic-usage-demo",
        },
        inputBoxStyle: {
          width: 120,
        },
        label: "模型",
        name: "model",
        placeholder: "请选择性别",
        options: [
          {
            label: "A",
            value: "MODEL_A",
          },
          {
            label: "MODEL_B",
            value: "B",
          },
        ],
        fields: {
          label: "name",
          value: "objectId",
        },
        useBackend: {
          provider: "easyops.api.cmdb.cmdb_object@ListObjectBasic:1.1.0",
          args: '<% (q) => [{ q: `${q}` , fields: ["ID", "name", "address", "age"], page: 1, page_size: 10 }] %>',
          transform: "<% (data) => data.list %>",
        },
      },
    },
    {
      bricks: [
        {
          brick: "forms.cmdb-instance-select",
          properties: {
            name: "app",
            allowClear: true,
            label: "选择应用创建时间(自定义字段显示)",
            objectId: "APP",
            fields: {
              label: "ctime",
            },
          },
          events: {
            "forms.cmdb-instance-select.change": {
              action: "console.log",
            },
            "forms.cmdb-instance-select.change.v2": {
              action: "console.log",
            },
          },
        },
      ],
      snippetId: "forms.cmdb-instance-select[custom-label]",
      title: {
        en: "CMDB Instance Select with Custom Label",
        zh: "带自定义字段的CMDB实例下拉框",
      },
    },
    {
      bricks: [
        {
          brick: "forms.cmdb-instance-select",
          properties: {
            name: "instanceIds",
            label: "选择主机(多选)",
            objectId: "HOST",
            mode: "multiple",
            value: ["5c6f6cf0d8079"],
            dataset: {
              testid: "basic-usage-checkbox-demo",
            },
          },
          events: {
            "forms.cmdb-instance-select.change": {
              action: "console.log",
            },
            "forms.cmdb-instance-select.change.v2": {
              action: "console.log",
            },
          },
        },
      ],
      snippetId: "forms.cmdb-instance-select[multi]",
      title: {
        en: "Multi CMDB Instance Select",
        zh: "多选CMDB实例下拉框",
      },
    },
    {
      bricks: [
        {
          brick: "forms.cmdb-instance-select",
          properties: {
            name: "instanceIds",
            label: "选择服务节点(自定义query)",
            objectId: "_SERVICENODE",
            mode: "multiple",
            instanceQuery: {
              "MYSQL_SERVICE.instanceId": "592f2cad471bf",
            },
          },
        },
      ],
      snippetId: "forms.cmdb-instance-select[custom-query]",
      title: {
        en: "CMDB Instance Select with Custom Query",
        zh: "带自定义query的CMDB实例下拉框",
      },
    },
    {
      brick: "forms.cmdb-instance-select",
      properties: {
        name: "name",
        allowClear: true,
        label: "自定义label(默认状态)",
        objectId: "HOST",
        fields: {
          label: ["hostname", "ip"],
        },
      },
      description: {
        title: "默认",
        message: "`label`默认显示样式",
      },
      events: {
        "forms.cmdb-instance-select.change": {
          action: "console.log",
        },
        "forms.cmdb-instance-select.change.v2": {
          action: "console.log",
        },
      },
    },
    {
      brick: "forms.cmdb-instance-select",
      properties: {
        name: "issue",
        allowClear: true,
        label: "自定义label",
        objectId: "_ISSUE",
        isMultiLabel: false,
        fields: {
          label: ["name", "title"],
        },
      },
      description: {
        title: "isMultiLabel 为 false",
        message:
          "适用于某些场景，需要在`forms.cmdb-instance-select.change.v2` 拿取多个字段，但是不希望在label中全部显示的情况",
      },
      events: {
        "forms.cmdb-instance-select.change": {
          action: "console.log",
        },
        "forms.cmdb-instance-select.change.v2": {
          action: "console.log",
        },
      },
    },
    {
      bricks: [
        {
          brick: "forms.cmdb-instance-select",
          properties: {
            name: "issue",
            allowClear: true,
            label: "自定义label(其他状态)",
            objectId: "_ISSUE",
            labelTemplate: "#{name}：#{title}",
            fields: {
              label: ["name", "title"],
            },
          },
          description: {
            title: "使用labelTemplate，自定义label样式",
            message:
              "适用于其他特殊场景需求，需要自定义`label`显示的拼接方式，优先级最高",
          },
          events: {
            "forms.cmdb-instance-select.change": {
              action: "console.log",
            },
            "forms.cmdb-instance-select.change.v2": {
              action: "console.log",
            },
          },
        },
      ],
      snippetId: "forms.cmdb-instance-select[custom-style]",
      title: {
        en: "CMDB Instance Select with Custom Style",
        zh: "带自定义样式的CMDB实例下拉框",
      },
    },
  ],
  previewColumns: 2,
};
