import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-export-modal.md";

export const story: Story = {
  storyId: "cmdb-instances.instance-export-modal",
  type: "brick",
  author: "ice",
  text: {
    en: "Instance Export Modal",
    zh: "实例导出模态框"
  },
  description: {
    en:
      "`objectId` should be provided, or also the query `exportParams` to search instances as you like. If `exportParams` is not present, this `instance-export-modal` will get the query from url, which should be provided by `cmdb-instances.instance-list`. And that means, you have to use it with `cmdb-instances.instance-list` together with `exportParams` absent",
    zh:
      "需要提供 objectId 来导出，你也可以提供查询条件来过滤导出实例。而如果不提供 `exportParams` 属性，此实例导出模态框将会从 url 中获得查询条件，而该查询条件应由 `cmdb-instances.instance-list` 构件提供。这也意味着，如果不提供 `exportParams` 属性，则必须和 `cmdb-instances.instance-list` 来一起使用。"
  },
  icon: {
    lib: "fa",
    icon: "stream"
  },
  conf: {
    brick: "div",
    slots: {
      content: {
        type: "bricks",
        bricks: [
          {
            brick: "basic-bricks.general-button",
            properties: {
              buttonName: "导出"
            },
            events: {
              "general.button.click": {
                target: "cmdb-instances\\.instance-export-modal",
                method: "open"
              }
            }
          },
          {
            brick: "cmdb-instances.instance-export-modal",
            properties: {
              objectId: "HOST",
              exportParams: {
                query: {
                  $and: [
                    { $or: [{ ip: { $like: "%192%" } }] },
                    { $and: [{ hostname: { $like: "%hostname%" } }] }
                  ]
                }
              }
            }
          }
        ]
      }
    }
  },
  doc: docMD
};
