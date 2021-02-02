import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-delete.md";
import { CMDB_APP_DELETE_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.instance-delete",
  type: "brick",
  author: "jo",
  text: {
    en: "Instance Multi Delete Modal",
    zh: "多实例删除模态框"
  },
  description: {
    en: "cmdb multiple instances delete Modal",
    zh: "cmdb 多实例删除模态框"
  },
  icon: {
    lib: "fa",
    icon: "trash-alt"
  },
  conf: {
    brick: "cmdb-instances.instance-delete",
    properties: {
      selectedKeys: [CMDB_APP_DELETE_ID],
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
