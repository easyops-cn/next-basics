import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-create.md";

export const story: Story = {
  storyId: "cmdb-instances.instance-create",
  type: "brick",
  author: "cyril",
  text: {
    en: "Instance Create",
    zh: "单实例创建",
  },
  description: {
    en: "cmdb instance create",
    zh: "cmdb 单实例创建",
  },
  icon: {
    lib: "fa",
    icon: "plus",
  },
  conf: [
    {
      snippetId: "cmdb-instances.instance-create[normal]",
      title: {
        en: "Basic use",
        zh: "基础使用",
      },
      bricks: [
        {
          brick: "cmdb-instances.instance-create",
          properties: {
            objectId: "HOST",
            fieldsByTag: [
              {
                name: "基本信息",
                fields: ["hostname", "ip"],
              },
              {
                name: "默认属性",
                fields: ["_mac", "_agentStatus", "_agentHeartBeat", "APP"],
              },
            ],
          },
          events: {
            "create.single.success": {
              action: "console.log",
            },
            "create.single.failed": {
              action: "console.warn",
            },
            "create.single.cancel": {
              action: "console.log",
            },
          },
        },
      ],
    },
  ],
  doc: docMD,
};
