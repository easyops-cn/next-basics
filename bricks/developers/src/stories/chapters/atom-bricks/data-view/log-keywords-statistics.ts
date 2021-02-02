import { Story } from "../../../interfaces";
import docMD from "../../../docs/monitor-log/keywords-statistics.md";

export const story: Story = {
  storyId: "monitor-log.keywords-statistics",
  type: "brick",
  author: "jo",
  text: {
    en: "Log Keywords Statistics",
    zh: "日志关键字统计"
  },
  description: {
    en: "Log Statistics Presentation",
    zh: "日志关键字统计"
  },
  icon: {
    lib: "fa",
    icon: "search"
  },
  conf: [
    {
      brick: "monitor-log.keywords-statistics",
      properties: {
        textConfig: {
          ERROR: 50,
          INFO: 20
        }
      }
    },
    {
      brick: "monitor-log.keywords-statistics",
      properties: {
        dataSource: {
          errorValue: 20,
          warnValue: 100
        },
        textConfig: {
          ERROR: "errorValue",
          WARN: "warnValue"
        }
      }
    }
  ],
  previewColumns: 2,
  doc: docMD
};
