import { Story } from "../../../interfaces";
import docMD from "../../../docs/monitor-alert/monitor-alert.md";

export const story: Story = {
  storyId: "monitor-alert.alert-events",
  type: "template",
  author: "ice",
  text: {
    en: "Alert Events Table Template",
    zh: "告警事件列表模板"
  },
  description: {
    en: "table of alert events",
    zh: "告警事件列表模板"
  },
  icon: {
    lib: "fa",
    icon: "table"
  },
  conf: {
    template: "monitor-alert.alert-events"
  },
  doc: docMD
};
