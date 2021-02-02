import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-tree-template.md";

export const story: Story = {
  storyId: "cmdb-instances.instance-tree",
  type: "template",
  author: "jo",
  text: {
    en: "Instance Tree Template",
    zh: "资源实例树"
  },
  description: {
    en: "Instance Tree Of Draggable",
    zh: "可拖动的资源实例树"
  },
  icon: {
    lib: "fa",
    icon: "stream"
  },
  conf: {
    brick: "basic-bricks.multiple-columns-card",
    properties: {
      gridColumns: ["350px", 1]
    },
    slots: {
      content: {
        type: "bricks",
        bricks: [
          {
            brick: "container-brick.tabs-container",
            properties: {
              className: "columns-card-no-padding",
              showCard: false,
              tabList: [
                {
                  text: "实例拓扑",
                  key: "0"
                },
                {
                  text: "其他",
                  key: "1"
                }
              ],
              slotType: "bricks",
              activeTabIndex: 0
            },
            slots: {
              content: {
                type: "bricks",
                bricks: [
                  {
                    template: "cmdb-instances.instance-tree",
                    params: {
                      initObjectIds: ["APP", "HOST"],
                      events: {
                        "instance-tree.drag-start": {
                          action: "console.log"
                        },
                        "instance-tree.drag-end": {
                          action: "console.log"
                        }
                      }
                    }
                  },
                  {
                    brick: "div"
                  }
                ]
              }
            }
          },
          {
            brick: "div",
            properties: {
              textContent: "相关信息",
              style: {
                "line-height": "200px",
                "text-align": "center"
              }
            }
          }
        ]
      }
    }
  },
  doc: docMD
};
