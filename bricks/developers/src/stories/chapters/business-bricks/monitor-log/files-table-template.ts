import { Story } from "../../../interfaces";
import docMD from "../../../docs/monitor-log/files-table-template.md";
import { CMDB_HOST_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "monitor-log.files-table",
  type: "template",
  author: "jo",
  text: {
    en: "File List Presentation",
    zh: "文件列表展示"
  },
  description: {
    en: "Show Files In A directory",
    zh: "显示一个目录下问文件列表"
  },
  icon: {
    lib: "fa",
    icon: "table"
  },
  conf: [
    {
      template: "monitor-log.files-table",
      params: {
        fPath: ".",
        targets: [{ instanceId: CMDB_HOST_INSTANCE_ID }],
        detailUrlTemplate: "path/#{filename}"
      }
    }
  ],
  doc: docMD
};
