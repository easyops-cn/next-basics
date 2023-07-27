import { Story } from "../../../interfaces";
import doc from "../../../docs/cmdb-object/model-icon-combination-modal.md";

export const story: Story = {
  storyId: "cmdb-object.model-icon-combination-modal",
  type: "brick",
  author: "ice",
  text: {
    en: "CMDB Model icon-color combination selector",
    zh: "CMDB 模型图标-颜色组合选择器"
  },
  icon: { lib: "fa", icon: "pen" },
  description: {
    en: "select icon and color to combine into a new color-icon",
    zh: "可以选择图标和颜色来给合成新的图标"
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
              detail: {
                node: {
                  style: {
                    shape: {
                      icon: "docker"
                    }
                  }
                }
              },
              buttonName: "点击查看图标颜色组合"
            },
            events: {
              "general.button.click": {
                target: "cmdb-object\\.model-icon-combination-modal",
                method: "showModal"
              }
            }
          },
          {
            brick: "cmdb-object.model-icon-combination-modal",
            events: {
              "ModelIconCombinationModal.comfirmIconSelection": {
                action: "console.info"
              }
            }
          }
        ]
      }
    }
  },
  doc
};
