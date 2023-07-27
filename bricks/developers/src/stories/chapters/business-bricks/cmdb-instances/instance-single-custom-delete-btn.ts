import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-single-custom-delete-btn.md";
import { CMDB_APP_DELETE_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.general-instance-delete",
  type: "template",
  author: "jo",
  text: {
    en: "Instance Single custom Delete button",
    zh: "单实例删除按钮（自定义提示）"
  },
  description: {
    en: "cmdb single instance delete custom message",
    zh: "cmdb 单实例删除按钮，可自定义提示内容 "
  },
  icon: {
    lib: "fa",
    icon: "trash"
  },
  conf: {
    template: "cmdb-instances.general-instance-delete",
    params: {
      objectId: "APP",
      instanceId: CMDB_APP_DELETE_ID,
      msg: "自定义内容",
      redirectUrl: "/xxxxx",
      btnName: "删除"
    }
  },
  doc: docMD
};
