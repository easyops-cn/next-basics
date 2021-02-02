import doc from "../../../docs/forms/cmdb-instance-select.md";
import { Story } from "../../../interfaces";

import {
  CMDB_HOST_INSTANCE_ID,
  CMDB_MYSQL_SERVICE_INSTANCE_ID,
} from "../../../constants";

const story: Story = {
  storyId: "forms.cmdb-instance-select",
  type: "brick",
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
    lib: "fa",
    icon: "pen",
  },
  conf: [
    {
      brick: "forms.cmdb-instance-select",
      properties: {
        name: "app",
        label: "选择应用",
        objectId: "APP",
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
        value: [CMDB_HOST_INSTANCE_ID],
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
          "MYSQL_SERVICE.instanceId": CMDB_MYSQL_SERVICE_INSTANCE_ID,
        },
      },
    },
    {
      brick: "forms.cmdb-instance-select",
      properties: {
        name: "issue",
        allowClear: true,
        label: "选择问题自定义多个字段",
        objectId: "_ISSUE",
        fields: {
          label: ["name", "title"],
        },
      },
    },
  ],
  previewColumns: 2,
  doc,
};

export default story;
