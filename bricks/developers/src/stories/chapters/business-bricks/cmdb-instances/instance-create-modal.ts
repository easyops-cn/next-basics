import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-create-modal.md";

export const story: Story = {
  storyId: "cmdb-instances.instance-create-modal",
  type: "brick",
  author: "cyril",
  text: {
    en: "instance-create-modal",
    zh: "实例创建模态框",
  },
  description: {
    en: "cmdb instance create modal",
    zh: "cmdb 单实例创建模态框",
  },
  icon: {
    lib: "fa",
    icon: "plus-square",
  },
  conf: [
    {
      snippetId: "cmdb-instances.instance-create-modal[normal]",
      title: {
        en: "Basic use",
        zh: "基础使用",
      },
      bricks: [
        {
          brick: "cmdb-instances.instance-create-modal",
          properties: {
            objectId: "HOST",
            id: "modal-v2",
            title: "单实例创建模态框",
            attributeKeys: ["hostname", "ip"],
          },
          events: {
            "create.single.success": {
              action: "console.log",
            },
            "create.single.failed": {
              action: "console.warn",
            },
          },
        },
      ],
      actions: [
        {
          text: "Open Modal",
          method: "openModal",
        },
      ],
    },
  ],

  doc: docMD,
};
