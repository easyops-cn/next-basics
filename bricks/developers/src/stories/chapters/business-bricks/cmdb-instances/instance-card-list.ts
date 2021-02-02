import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-card-list.md";

export const story: Story = {
  storyId: "cmdb-instances.instance-card-list",
  type: "brick",
  author: "lynette",
  text: {
    en: "Instance Card List",
    zh: "实例卡片列表"
  },
  description: {
    en: "cmdb instance card list",
    zh: "cmdb 实例卡片列表"
  },
  icon: {
    lib: "fa",
    icon: "clone"
  },
  conf: {
    brick: "cmdb-instances.instance-card-list",
    properties: {
      objectId: "APP",
      q: "${query.q}",
      selectedCategory: "${query.selectedCategory}",
      category: {
        field: "modifier",
        pageSize: 10
      },
      column: 4,
      card: {
        fields: ["creator", "modifier"],
        btnLeft: {
          style: { width: "60px", padding: 0 },
          text: "编辑"
        },
        btnRight: {
          style: { color: "red" },
          text: "删除"
        },
        badge: {
          field: "modifier",
          default: {
            text: "默认"
          }
        }
      },
      showStatistics: false
    },
    events: {
      "read.search.change": {
        action: "console.warn"
      },
      "read.category.change": {
        action: "console.warn"
      },
      "read.multiple.clickItem": {
        action: "console.log"
      },
      "read.card.leftBtn.click": {
        action: "console.log"
      },
      "read.card.rightBtn.click": {
        action: "console.warn"
      }
    }
  },
  doc: docMD
};
