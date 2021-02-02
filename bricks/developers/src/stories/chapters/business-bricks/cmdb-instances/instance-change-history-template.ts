import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-change-history-template.md";

export const story: Story = {
  storyId: "cmdb-instances.instance-change-history",
  type: "template",
  author: "lynette",
  text: {
    en: "instance change history template",
    zh: "实例变更详情模版"
  },
  description: {
    en: "cmdb instance change history template",
    zh: "cmdb 实例变更详情模版"
  },
  icon: {
    lib: "fa",
    icon: "stream"
  },
  conf: {
    template: "cmdb-instances.instance-change-history",
    params: {
      event_id: "eb34dbeb83fdffff1186ed8c3ad8ca2ab3a68fc1",
      event: "event.instance_relation.create",
      showCard: true,
      detailUrlTemplates: {
        default: "/cmdb-instances/#{objectId}/instance/#{instanceId}"
      }
    }
  },
  doc: docMD
};
