import { Story } from "../../../interfaces";
import docMD from "../../../docs/deploy-history/deploy-history.md";

export const story: Story = {
  storyId: "deploy-history.list",
  type: "template",
  author: "jo",
  text: {
    en: "Deploy List",
    zh: "部署列表"
  },
  description: {
    en: "Show History Deploy Record",
    zh: "展示历史部署的记录"
  },
  icon: {
    lib: "fa",
    icon: "history"
  },
  conf: {
    template: "deploy-history.list",
    params: {
      cardProps: {
        cardTitle: "部署列表"
      },
      start_time: "now-30d",
      linkUrl: "deploy/#{app_id}"
    }
  },
  doc: docMD
};
