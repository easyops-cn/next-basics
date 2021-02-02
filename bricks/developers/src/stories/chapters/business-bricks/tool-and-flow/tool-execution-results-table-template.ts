import { Story } from "../../../interfaces";
import docMD from "../../../docs/tools/tool-execution-results-table.md";
import {
  TOOL_EXECUTE_TASK_ID,
  CMDB_HOST_INSTANCE_ID
} from "../../../constants";

export const story: Story = {
  storyId: "tools.tool-execution-results-table",
  type: "template",
  author: "lynette",
  text: {
    en: "Tool execution results table",
    zh: "工具执行结果列表"
  },
  description: {
    en: "Tool execution results table template",
    zh: "基于模板搭建的工具执行结果列表场景"
  },
  icon: {
    lib: "fa",
    icon: "table"
  },
  conf: {
    brick: "div",
    slots: {
      "": {
        type: "bricks",
        bricks: [
          {
            brick: "tools.get-execute-result",
            bg: true,
            properties: {
              args: [
                TOOL_EXECUTE_TASK_ID,
                {
                  brief: "false",
                  targetIds: CMDB_HOST_INSTANCE_ID
                },
                "192.168.100.162"
              ]
            }
          },
          {
            template: "tools.tool-execution-results-table",
            lifeCycle: {
              useResolves: [
                {
                  name: "columns",
                  provider: "tools\\.get-execute-result",
                  field: "columns"
                },
                {
                  name: "dataSource",
                  provider: "tools\\.get-execute-result",
                  field: "dataSource"
                }
              ]
            }
          }
        ]
      }
    }
  },
  doc: docMD
};
