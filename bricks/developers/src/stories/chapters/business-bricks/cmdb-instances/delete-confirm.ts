import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/delete-confirm.md";

import { CMDB_APP_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.delete-confirm",
  type: "template",
  deprecated: true,
  author: "jo",
  text: {
    en: "Delete Confirm Modal",
    zh: "删除确认框",
  },
  description: {
    en: "General Delete Confirm Modal(deprecated, use presentational-bricks.modal-confirm instead)",
    zh: "通用的删除确认框(已废弃，请使用确认对话框)",
  },
  icon: {
    lib: "fa",
    icon: "trash",
  },
  conf: {
    brick: "div",
    slots: {
      "": {
        type: "bricks",
        bricks: [
          {
            template: "cmdb-instances.delete-confirm",
            params: {
              content: "确定要删除 <strong>#{name}</strong> 吗？",
              provider: {
                brick: "providers-of-cmdb.instance-api-delete-instance",
                bg: true,
                properties: {
                  args: ["APP", CMDB_APP_INSTANCE_ID],
                },
              },
            },
          },
          {
            brick: "basic-bricks.general-custom-buttons",
            properties: {
              customButtons: [
                {
                  isDropdown: true,
                  text: "另存为",
                  icon: "file-add",
                  eventName: "instance.saveAs",
                },
                {
                  isDropdown: true,
                  text: "删除视图",
                  icon: "delete",
                  color: "#E02020",
                  eventName: "instance.delete",
                },
              ],
            },
            events: {
              "instance.delete": {
                target: "presentational-bricks\\.modal-confirm",
                method: "open",
                args: [
                  {
                    detail: {
                      dataSource: { name: "测试程序包" },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
  doc: docMD,
};
