import { Story } from "../../../interfaces";
import docMD from "../../../docs/agile/issue-list.md";

export const story: Story = {
  storyId: "agile.issue-list",
  type: "template",
  text: {
    en: "Issue list",
    zh: "issue表格"
  },
  author: "lynette",
  icon: { lib: "fa", icon: "list" },
  description: {
    en: "show issue list",
    zh: "标准的issue表格显示模板"
  },
  conf: {
    template: "agile.issue-list",
    params: {
      showSelectBox: true,
      query: {
        type: "bug"
      },
      rowSelectHandler: {
        action: "console.log"
      },
      detailUrlTemplate: "detail/@{instanceId}",
      productUrlTemplate: "product/@{product[0].instanceId}"
    }
  },
  doc: docMD
};
