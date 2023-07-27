import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-multi-edit.md";
import { CMDB_APP_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.instance-multi-edit",
  type: "brick",
  author: "lynette",
  text: {
    en: "Instance Multi Edit",
    zh: "多实例单属性编辑"
  },
  description: {
    en: "cmdb multiple instances edit",
    zh: "cmdb 多实例单属性编辑"
  },
  icon: {
    lib: "fa",
    icon: "edit"
  },
  conf: {
    brick: "cmdb-instances.instance-multi-edit",
    properties: {
      selectedKeys: [CMDB_APP_INSTANCE_ID],
      objectId: "APP"
    }
  },
  actions: [
    {
      text: "Open Modal",
      method: "onHandleVisible",
      args: [true]
    },
    {
      text: "Close Modal",
      method: "onHandleVisible",
      args: [false]
    }
  ],
  doc: docMD
};
