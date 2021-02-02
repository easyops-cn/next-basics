import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-remove-relation-wrapper.md";
import {
  CMDB_HOST_INSTANCE_ID,
  CMDB_USER_INSTANCE_ID
} from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.instance-remove-relation-wrapper",
  type: "template",
  author: "cyril",
  text: {
    en: "instance-remove-relation",
    zh: "移除实例关系（含提示）"
  },
  description: {
    en: "cmdb instance remove relation wrapper",
    zh: "cmdb 移除实例关系（含提示）"
  },
  icon: {
    lib: "fa",
    icon: "unlink"
  },
  conf: {
    template: "cmdb-instances.instance-remove-relation-wrapper",
    params: {
      description: "从当前主机中移除该备份负责人",
      objectId: "HOST",
      instanceId: CMDB_HOST_INSTANCE_ID,
      selectedKeys: [CMDB_USER_INSTANCE_ID],
      relationSideId: "owner",
      configProps: {
        type: "danger"
      }
    }
  },
  doc: docMD
};
