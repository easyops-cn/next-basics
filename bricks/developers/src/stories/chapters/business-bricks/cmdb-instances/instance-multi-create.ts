import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-multi-create.md";

export const story: Story = {
  storyId: "cmdb-instances.instance-multi-create",
  type: "brick",
  author: "lynette",
  text: {
    en: "instance-multi-create",
    zh: "多实例创建"
  },
  description: {
    en: "cmdb instance multiple create",
    zh: "cmdb 多实例创建"
  },
  icon: {
    lib: "fa",
    icon: "cart-plus"
  },
  conf: {
    brick: "cmdb-instances.instance-multi-create",
    properties: {
      objectId: "HOST",
      attributeKeys: ["hostname", "ip"]
    },
    events: {
      "create.multi.success": {
        action: "console.log"
      },
      "create.multi.failed": {
        action: "console.warn"
      },
      "create.multi.canceled": {
        action: "console.warn"
      }
    }
  },
  doc: docMD
};
