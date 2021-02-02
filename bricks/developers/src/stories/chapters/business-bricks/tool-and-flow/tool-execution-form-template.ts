import { Story } from "../../../interfaces";
import docMD from "../../../docs/tools/tool-execution-form.md";
import { TOOL_ID2 } from "../../../constants";

export const story: Story = {
  storyId: "tools.tool-execution-form",
  type: "template",
  author: "jo",
  text: {
    en: "Dynamic Tool execution Form Template",
    zh: "动态参数的工具执行"
  },
  description: {
    en: "Dynamic Tool Execution Template",
    zh: "基于模板搭建的动态参数工具执行场景"
  },
  icon: {
    lib: "fa",
    icon: "running"
  },
  conf: {
    brick: "div",
    slots: {
      "": {
        type: "bricks",
        bricks: [
          {
            brick: "presentational-bricks.brick-utils",
            bg: true
          },
          {
            brick: "providers-of-tool.basic-api-get-tool",
            injectDeep: true,
            bg: true,
            properties: {
              args: [TOOL_ID2]
            }
          },
          {
            template: "tools.tool-execution-form",
            lifeCycle: {
              useResolves: [
                {
                  name: "toolData",
                  provider: "providers-of-tool\\.basic-api-get-tool"
                }
              ]
            },
            params: {
              events: {
                "response.success": [
                  {
                    target: "presentational-bricks\\.brick-utils",
                    method: "message",
                    args: ["success", "工具执行中"]
                  },
                  {
                    action: "history.replace"
                  }
                ]
              }
            }
          }
        ]
      }
    }
  },
  doc: docMD
};
