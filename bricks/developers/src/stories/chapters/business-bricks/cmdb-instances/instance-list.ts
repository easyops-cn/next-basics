import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-list.md";

export const story: Story = {
  storyId: "cmdb-instances.instance-list",
  type: "brick",
  author: "cyril",
  text: {
    en: "Instance List",
    zh: "实例列表",
  },
  description: {
    en: "cmdb instance list",
    zh: "cmdb 通用实例列表",
  },
  icon: {
    lib: "fa",
    icon: "list",
  },
  conf: [
    {
      snippetId: "cmdb-instances.instance-list[normal]",
      title: {
        en: "Basic use",
        zh: "基础使用",
      },
      bricks: [
        {
          brick: "cmdb-instances.instance-list",
          properties: {
            objectId: "HOST",
            detailUrlTemplates: {
              HOST: "/cmdb-instances/#{objectId}/instance/#{instanceId}",
            },
            events: {
              "read.selection.change": {
                action: "console.log",
              },
            },
          },
        },
      ],
    },
  ],
  doc: docMD,
};
