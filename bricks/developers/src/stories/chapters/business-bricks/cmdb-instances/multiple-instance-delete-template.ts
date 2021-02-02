import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/multiple-instance-delete-template.md";
import { CMDB_APP_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.multiple-instance-delete",
  type: "template",
  author: "jo",
  text: {
    en: "Instance Multi Delete Template",
    zh: "多实例删除"
  },
  description: {
    en: "Cmdb Multiple Instances Delete Union Between Button And Modal",
    zh: "把按钮和多实例删除的模态框结合起来的场景"
  },
  icon: {
    lib: "fa",
    icon: "trash-alt"
  },
  conf: {
    template: "cmdb-instances.multiple-instance-delete",
    params: {
      btnName: "删除",
      instanceIds: [CMDB_APP_INSTANCE_ID],
      objectId: "APP",
      events: {
        "delete.multi.success": {
          action: "history.replace"
        }
      }
    }
  },
  doc: docMD
};
