import { Story } from "@next-core/brick-types";
import { CMDB_HOST_INSTANCE_ID } from "../constants";
import { exportJsonFileSvg } from "../images";
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
    imgSrc: exportJsonFileSvg,
  },
  conf: [
    {
      brick: "div",
      slots: {
        "": {
          bricks: [
            {
              bg: true,
              brick: "basic-bricks.export-json-file",
              events: {
                "json-file.export.failed": {
                  action: "console.log",
                },
                "json-file.export.success": {
                  action: "console.log",
                },
              },
              properties: {
                id: "export-dashboard",
                data: "export content",
                fileName: "test.json",
              },
            },
            {
              brick: "basic-bricks.general-button",
              events: {
                "general.button.click": [
                  {
                    method: "export",
                    target: "#export-dashboard",
                  },
                ],
              },
              properties: {
                buttonIcon: {
                  icon: "export",
                  lib: "antd",
                },
                buttonName: "导出",
              },
            },
          ],
          type: "bricks",
        },
      },
    },
  ],
};
