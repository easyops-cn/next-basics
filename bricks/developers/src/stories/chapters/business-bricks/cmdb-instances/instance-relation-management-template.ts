import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-relation-management-template.md";
import { CMDB_HOST_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.instance-relation",
  type: "template",
  author: "jo",
  text: {
    en: "Instance Relation Management",
    zh: "通用实例关系管理"
  },
  description: {
    en: "Instance Relation Management template",
    zh: "通过模板搭建的通用实例场景"
  },
  icon: {
    lib: "fa",
    icon: "praying-hands"
  },
  conf: {
    template: "cmdb-instances.instance-relation",
    params: {
      instanceId: CMDB_HOST_INSTANCE_ID,
      objectId: "HOST",
      relationSideId: "owner",
      cardTitle: "负责人"
    }
  },
  doc: docMD
};
