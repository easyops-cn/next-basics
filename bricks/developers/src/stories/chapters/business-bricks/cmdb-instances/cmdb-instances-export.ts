import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/cmdb-instances-export.md";

export const story: Story = {
  storyId: "cmdb-instances.cmdb-instances-export",
  type: "brick",
  author: "jimmyli",
  text: {
    en: "Cmdb Instances Export",
    zh: "实例导出构件",
  },
  description: {
    en: "cmdb instances export",
    zh: "CMDB实例导出",
  },
  icon: {
    lib: "easyops",
    category: "default",
    icon: "export",
  },
  conf: [
    {
      brick: "cmdb-instances.cmdb-instances-export",
      properties: {
        objectId: "_MICROAPP_CONTAINER",
      },
      events: {
        "export.cancel": {
          action: "console.log",
        },
        "export.success": {
          action: "console.log",
        },
        "export.error": {
          action: "console.log",
        },
      },
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
                    target: "#cmdb-instances-export-modal",
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
              brick: "cmdb-instances.cmdb-instances-export",
              properties: {
                id: "cmdb-instances-export-modal",
                objectId: "_MICROAPP_CONTAINER",
                modalMode: true,
              },
              events: {
                "modal.open": {
                  action: "console.log",
                },
                "modal.close": {
                  action: "console.log",
                },
                "export.success": {
                  action: "console.log",
                },
                "export.error": {
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
