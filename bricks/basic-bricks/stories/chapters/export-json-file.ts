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
      bricks: [
        {
          brick: "basic-bricks.export-json-file",
          bg: true,
          events: {
            "json-file.export.failed": {
              action: "console.log",
            },
            "json-file.export.success": {
              action: "console.log",
            },
          },
          properties: {
            data: "export content",
            fileName: "test.json",
            id: "export-dashboard",
          },
        },
      ],
      snippetId: "basic-bricks.export-json-file[basic]",
      title: {
        en: "Export JSON File",
        zh: "导出JSON文件",
      },
      actions: [
        {
          text: "export()",
          method: "export",
        },
      ],
    },
  ],
};
