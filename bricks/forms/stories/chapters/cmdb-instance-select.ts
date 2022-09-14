import { Story } from "@next-core/brick-types";
import { cmdbInstanceSelectSvg } from "../images";
export const cmdbInstanceSelectStory: Story = {
  storyId: "forms.cmdb-instance-select",
  type: "brick",
  category: "form-input",
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
  previewColumns: 2,
};
