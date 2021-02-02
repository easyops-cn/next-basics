import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-timeline-template.md";
import { CMDB_HOST_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.instance-timeline",
  type: "template",
  author: "lynette",
  text: {
    en: "instance timeline template",
    zh: "时间线事件列表模版"
  },
  description: {
    en: "cmdb instance change history timeline template",
    zh: "cmdb 实例变更历史时间线模版，包括了详情模态框"
  },
  icon: {
    lib: "fa",
    icon: "stream"
  },
  conf: {
    template: "cmdb-instances.instance-timeline",
    params: {
      instanceId: CMDB_HOST_INSTANCE_ID,
      objectId: "HOST",
      showFilter: true,
      detailUrlTemplates: {
        default: "/cmdb-instances/#{objectId}/instance/#{instanceId}"
      }
    }
  },
  doc: docMD
};
