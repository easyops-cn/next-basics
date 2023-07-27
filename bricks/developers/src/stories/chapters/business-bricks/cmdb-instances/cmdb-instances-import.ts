import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/cmdb-instances-import.md";

export const story: Story = {
  storyId: "cmdb-instances.cmdb-instances-import",
  type: "brick",
  author: "jimmyli",
  text: {
    en: "Cmdb Instances Import",
    zh: "实例导入构件",
  },
  description: {
    en: "cmdb instances import",
    zh: "使用Excel或CSV文件导入模型实例",
  },
  icon: {
    lib: "easyops",
    category: "default",
    icon: "import",
  },
  conf: [
    {
      snippetId: "cmdb-instances.cmdb-instances-import[normal]",
      title: {
        en: "Basic use",
        zh: "基础使用",
      },
      bricks: [
        {
          brick: "cmdb-instances.cmdb-instances-import",
          properties: {
            objectId: "HOST",
          },
          events: {
            "import.cancel": {
              action: "console.log",
            },
            "import.success.ok": {
              action: "console.log",
            },
            "import.error.ok": {
              action: "console.log",
            },
          },
        },
      ],
    },
    {
      description: {
        title: "弹窗模式",
      },
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-button",
              events: {
                "general.button.click": [
                  {
                    target: "#cmdb-instances-import-modal",
                    method: "open",
                  },
                ],
              },
              properties: {
                buttonName: "Open",
                buttonType: "primary",
              },
            },
            {
              brick: "cmdb-instances.cmdb-instances-import",
              properties: {
                id: "cmdb-instances-import-modal",
                objectId: "HOST",
                modalMode: true,
              },
              events: {
                "modal.open": {
                  action: "console.log",
                },
                "modal.close": {
                  action: "console.log",
                },
                "import.success.ok": {
                  action: "console.log",
                },
                "import.error.ok": {
                  action: "console.log",
                },
              },
            },
          ],
        },
      },
    },
  ],
  doc: docMD,
};
