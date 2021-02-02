import { Story } from "@next-core/brick-types";
import { CMDB_HOST_INSTANCE_ID } from "../constants";

export const exportJsonFileStory: Story = {
  storyId: "basic-bricks.export-json-file",
  category: "other",
  type: "brick",
  author: "cyril",
  text: {
    en: "export json file",
    zh: "导出 JSON 文件",
  },
  description: {
    en: "export the data as an JSON file",
    zh: "把数据导出为 JSON 文件",
  },
  icon: {
    lib: "antd",
    icon: "export",
  },
  conf: [
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "providers-of-cmdb.instance-api-get-detail",
              bg: true,
            },
            {
              brick: "basic-bricks.export-json-file",
              properties: {
                id: "export-dashboard",
              },
              lifeCycle: {
                useResolves: [
                  {
                    provider: "providers-of-cmdb\\.instance-api-get-detail",
                    args: [
                      "HOST",
                      CMDB_HOST_INSTANCE_ID,
                      {
                        fields: "hostname,ip",
                      },
                    ],
                    transform: {
                      data: "<% DATA %>",
                      fileName: "<% DATA.hostname + '.json' %>",
                    },
                  },
                ],
              },
              events: {
                "json-file.export.success": {
                  action: "console.log",
                },
                "json-file.export.failed": {
                  action: "console.log",
                },
              },
              bg: true,
            },
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "导出",
                buttonIcon: {
                  lib: "antd",
                  icon: "export",
                },
              },
              events: {
                "general.button.click": [
                  {
                    target: "#export-dashboard",
                    method: "export",
                  },
                ],
              },
            },
          ],
        },
      },
    },
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "providers-of-cmdb.instance-api-get-detail",
              bg: true,
            },
            {
              brick: "basic-bricks.export-json-file",
              properties: {
                id: "export-dashboard",
              },
              events: {
                "json-file.export.success": {
                  action: "console.log",
                },
                "json-file.export.failed": {
                  action: "console.log",
                },
              },
              bg: true,
            },
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "导出",
                buttonIcon: {
                  lib: "antd",
                  icon: "export",
                },
              },
              events: {
                "general.button.click": [
                  {
                    target: "#export-dashboard",
                    method: "export",
                    args: [
                      {
                        detail: {
                          data: "<% EVENT.target.data %>",
                          fileName:
                            "<% EVENT.target.data.hostname + '.json' %>",
                        },
                      },
                    ],
                  },
                ],
              },
              lifeCycle: {
                useResolves: [
                  {
                    provider: "providers-of-cmdb\\.instance-api-get-detail",
                    args: [
                      "HOST",
                      CMDB_HOST_INSTANCE_ID,
                      {
                        fields: "hostname,ip",
                      },
                    ],
                    transform: {
                      data: "<% DATA %>",
                      fileName: "<% DATA.hostname + '.json' %>",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  ],
};
