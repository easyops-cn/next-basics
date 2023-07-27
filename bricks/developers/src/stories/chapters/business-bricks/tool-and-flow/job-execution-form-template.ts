import { Story } from "../../../interfaces";
import docMD from "../../../docs/tool-and-flow/job-execution-form.md";
import { JOB_ID2 } from "../../../constants";

export const story: Story = {
  storyId: "tools.job-execution-form",
  type: "template",
  author: "jo",
  text: {
    en: "Dynamic Job execution Form Template",
    zh: "动态参数的作业执行"
  },
  description: {
    en: "Dynamic Job Execution Template",
    zh: "基于模板搭建的动态参数作业执行场景"
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
            template: "tools.job-execution-form",
            params: {
              jobId: JOB_ID2,
              events: {
                "response.success": [
                  {
                    target: "presentational-bricks\\.brick-utils",
                    method: "message",
                    args: ["success", "作业执行中"]
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
