import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-list.md";

export const story: Story = {
  storyId: "cmdb-instances.instance-list",
  type: "template",
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
  conf: {
    template: "cmdb-instances.instance-list",
    params: {
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
  doc: docMD,
};
