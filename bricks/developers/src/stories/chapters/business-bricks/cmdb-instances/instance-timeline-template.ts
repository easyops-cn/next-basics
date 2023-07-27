import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-timeline-template.md";
import { CMDB_HOST_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.instance-timeline",
  type: "template",
  author: "lynette",
  text: {
    en: "instance timeline template",
    zh: "时间线事件列表模版",
  },
  description: {
    en: "Deprecated",
    zh: "已废弃，请使用`cmdb-instance-widgets.tpl-cmdb-instance-timeline`",
  },
  icon: {
    lib: "fa",
    icon: "stream",
  },
  conf: {
    template: "cmdb-instances.instance-timeline",
    params: {
      instanceId: CMDB_HOST_INSTANCE_ID,
      objectId: "HOST",
      showFilter: true,
      detailUrlTemplates: {
        default: "/cmdb-instances/#{objectId}/instance/#{instanceId}",
      },
    },
  },
  doc: docMD,
};
