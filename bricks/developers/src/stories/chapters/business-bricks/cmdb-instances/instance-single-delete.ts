import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-single-delete.md";
import { CMDB_APP_DELETE_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.instance-single-delete",
  type: "brick",
  author: "jo",
  deprecated: true,
  text: {
    en: "Instance Single Delete",
    zh: "单实例删除",
  },
  description: {
    en: "cmdb single instance delete",
    zh: "cmdb 单实例删除",
  },
  icon: {
    lib: "fa",
    icon: "trash",
  },
  conf: {
    brick: "cmdb-instances.instance-single-delete",
    properties: {
      instanceId: CMDB_APP_DELETE_ID,
      objectId: "APP",
    },
  },
  doc: docMD,
};
