import { Story } from "../../../interfaces";
import doc from "../../../docs/cmdb-object/object-tree.md";

export const story: Story = {
  storyId: "cmdb-object.object-tree",
  type: "brick",
  author: "ice",
  text: {
    en: "CMDB Object Tree",
    zh: "CMDB 模型对象树"
  },
  icon: { lib: "fa", icon: "tree" },
  description: {
    en: "display cmdb object as tree, by its category accordingly",
    zh: "根据分类，使用树的方式来展示 CMDB 模型对象"
  },
  conf: {
    brick: "div",
    properties: {
      backgroundColor: "white"
    },
    slots: {
      content: {
        type: "bricks",
        bricks: [
          {
            brick: "providers-of-cmdb.cmdb-object-api-get-object-all",
            bg: true
          },
          {
            brick: "cmdb-object.object-tree",
            lifeCycle: {
              useResolves: [
                {
                  name: "objectList",
                  field: "data",
                  provider: "providers-of-cmdb\\.cmdb-object-api-get-object-all"
                }
              ]
            }
          }
        ]
      }
    }
  },
  doc
};
