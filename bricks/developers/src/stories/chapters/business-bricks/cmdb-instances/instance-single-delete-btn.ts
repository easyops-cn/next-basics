import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-single-delete-btn.md";
import { CMDB_APP_DELETE_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.cmdb-instance-delete",
  type: "template",
  author: "jo",
  text: {
    en: "Instance Single Delete button",
    zh: "单实例删除按钮"
  },
  description: {
    en: "cmdb single instance delete",
    zh: "cmdb 单实例删除（单个按钮形式删除）"
  },
  icon: {
    lib: "fa",
    icon: "trash"
  },
  conf: {
    template: "cmdb-instances.cmdb-instance-delete",
    params: {
      objectId: "APP",
      instanceId: CMDB_APP_DELETE_ID,
      redirectUrl: "/xxxxx",
      btnName: "删除",
      events: {
        action: "history.goBack"
      }
    }
  },
  doc: docMD
};
