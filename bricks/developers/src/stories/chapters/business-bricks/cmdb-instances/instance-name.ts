import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-name.md";
import { CMDB_HOST_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.instance-name",
  type: "brick",
  author: "cyril",
  text: {
    en: "instance-name",
    zh: "实例名称"
  },
  description: {
    en: "cmdb instance name",
    zh: "cmdb 实例名称"
  },
  icon: {
    lib: "fa",
    icon: "info"
  },
  conf: {
    brick: "cmdb-instances.instance-name",
    properties: {
      objectId: "HOST",
      instanceId: CMDB_HOST_INSTANCE_ID
    }
  },
  doc: docMD
};
