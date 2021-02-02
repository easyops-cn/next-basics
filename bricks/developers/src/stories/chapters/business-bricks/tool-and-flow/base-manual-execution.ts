import { Story } from "../../../interfaces";
import docMD from "../../../docs/tool-and-flow/base-manual-execution.md";
import {
  TOOL_ID,
  TOOL_VERSION_ID,
  CMDB_HOST_INSTANCE_ID,
  FLOW_ID,
  JOB_ID2
} from "../../../constants";

export const story: Story = {
  storyId: "manual-execution.base-manual-execution",
  type: "template",
  author: "jo",
  text: {
    en: "Manual Execution Template",
    zh: "手动配置参数执行基础模板"
  },
  description: {
    en: "Tool,flow or job execution",
    zh: "可以搭建工具／流程／作业执行场景"
  },
  icon: {
    lib: "fa",
    icon: "running"
  },
  conf: [
    // 工具
    {
      template: "manual-execution.base-manual-execution",
      params: {
        layout: "horizontal",
        labelCol: { span: 5 },
        wrapperCol: { span: 10 },
        executeProvider: [
          {
            brick: "presentational-bricks.brick-utils",
            bg: true
          },
          {
            brick: "providers-of-tool.execute-api-execute-tool",
            injectDeep: true,
            bg: true,
            properties: {
              args: [
                {
                  toolId: TOOL_ID,
                  vId: TOOL_VERSION_ID
                }
              ]
            },
            events: {
              "response.success": [
                {
                  target: "presentational-bricks\\.brick-utils",
                  method: "message",
                  args: ["success", "工具执行中"]
                },
                { action: "history.push" }
              ],
              "response.error": {
                target: "presentational-bricks\\.brick-utils",
                method: "handleHttpError"
              }
            }
          }
        ],
        toolSteps: [
          {
            title: "执行环境",
            fields: [
              {
                field: "execUser",
                fieldPath: "[0].execUser",
                label: "执行用户",
                component: "Input",
                rules: [
                  {
                    required: true,
                    message: "请输入执行用户"
                  }
                ]
              },
              {
                field: "ip",
                fieldPath: "[0].inputs.@agents[0].ip",
                label: "执行目标",
                component: "Input",
                defaultValue: "192.168.100.162",
                rules: [
                  {
                    required: true,
                    message: "请输入执行目标"
                  }
                ]
              },
              {
                field: "instanceId",
                fieldPath: "[0].inputs.@agents[0].instanceId",
                label: "执行目标id",
                component: "Input",
                defaultValue: CMDB_HOST_INSTANCE_ID,
                rules: [
                  {
                    required: true,
                    message: "请输入执行目标id"
                  }
                ]
              }
            ],
            events: {
              "brick.form.update": {
                target: "providers-of-tool\\.execute-api-execute-tool",
                method: "updateArgs"
              }
            }
          },
          {
            title: "更多参数",
            fields: [
              {
                field: "timerange",
                fieldPath: "[0].inputs.timerange",
                label: "时间范围",
                component: "Input",
                defaultValue: "-30d",
                rules: [
                  {
                    required: true,
                    message: "请输入时间范围"
                  }
                ]
              },
              {
                field: "index",
                fieldPath: "[0].inputs.index",
                label: "指标",
                component: "Input",
                defaultValue: "host.cpu.used_total",
                rules: [
                  {
                    required: true,
                    message: "请输入指标"
                  }
                ]
              },
              {
                field: "condition",
                fieldPath: "[0].inputs.condition",
                label: "条件",
                component: "Select",
                rules: [
                  {
                    required: true,
                    message: "请输入条件"
                  }
                ],
                optionList: [
                  {
                    text: "大于",
                    id: "大于"
                  },
                  {
                    text: "等于",
                    id: "等于"
                  },
                  {
                    text: "小于",
                    id: "小于"
                  }
                ]
              },
              {
                field: "threshold",
                fieldPath: "[0].inputs.threshold",
                label: "阈值",
                component: "Input",
                rules: [
                  {
                    required: true,
                    message: "请输入阀值"
                  }
                ]
              }
            ],
            events: {
              "brick.form.update": {
                target: "providers-of-tool\\.execute-api-execute-tool",
                method: "updateArgs"
              }
            }
          },
          {
            title: "分批策略",
            fields: [
              {
                field: "enabled",
                fieldPath: "[0].batchStrategy.enabled",
                label: "分批执行",
                component: "Switch",
                valuePropName: "checked",
                defaultValue: false
              },
              {
                field: "batchNum",
                fieldPath: "[0].batchStrategy.batchNum",
                label: "每批执行数量",
                component: "InputNumber",
                hideFromField: "enabled"
              },
              {
                field: "batchInterval",
                fieldPath: "[0].batchStrategy.batchInterval",
                label: "每批间隔时间",
                component: "InputNumber",
                hideFromField: "enabled"
              },
              {
                field: "failedStop",
                fieldPath: "[0].batchStrategy.failedStop",
                label: "跳过失败机器继续执行",
                component: "Switch",
                valuePropName: "checked",
                defaultValue: false,
                hideFromField: "enabled"
              }
            ],
            events: {
              "brick.form.submit": {
                target: "providers-of-tool\\.execute-api-execute-tool",
                method: "updateArgsAndExecute"
              }
            }
          }
        ]
      }
    },
    // 流程
    {
      template: "manual-execution.base-manual-execution",
      params: {
        layout: "horizontal",
        labelCol: { span: 5 },
        wrapperCol: { span: 10 },
        toolSteps: [
          {
            title: "基本参数",
            fields: [
              {
                field: "user",
                fieldPath: "[0].flowInputs.user",
                label: "执行用户",
                component: "Input",
                rules: [
                  {
                    required: true,
                    message: "请输入执行用户"
                  }
                ]
              },
              {
                field: "ip",
                fieldPath: "[0].flowInputs.@agents[0].ip",
                label: "执行目标",
                component: "Input",
                defaultValue: "192.168.100.162",
                rules: [
                  {
                    required: true,
                    message: "请输入执行目标"
                  }
                ]
              },
              {
                field: "instanceId",
                fieldPath: "[0].flowInputs.@agents[0].instanceId",
                label: "执行目标id",
                component: "Input",
                defaultValue: CMDB_HOST_INSTANCE_ID,
                rules: [
                  {
                    required: true,
                    message: "请输入执行目标id"
                  }
                ]
              }
            ],
            events: {
              "brick.form.update": {
                target: "providers-of-flow\\.execute-api-execute-flow",
                method: "updateArgs"
              }
            }
          },
          {
            title: "流程参数",
            fields: [
              {
                field: "appname",
                fieldPath: "[0].flowInputs.appname",
                label: "应用名",
                component: "Select",
                dataSource: {
                  resolveName: "appList",
                  path: "list",
                  useIdField: "name",
                  useTextField: "name"
                },
                rules: [
                  {
                    required: true,
                    message: "应用名称"
                  }
                ]
              },
              {
                field: "ls",
                fieldPath: "[0].flowInputs.ls",
                label: "ls",
                component: "Input"
              }
            ],
            lifeCycle: {
              useResolves: [
                {
                  name: "appList",
                  provider: "providers-of-cmdb\\.instance-api-post-search"
                }
              ]
            },
            events: {
              "brick.form.submit": {
                target: "providers-of-flow\\.execute-api-execute-flow",
                method: "updateArgsAndExecute"
              }
            }
          }
        ],
        executeProvider: [
          {
            brick: "presentational-bricks.brick-utils",
            bg: true
          },
          {
            brick: "providers-of-cmdb.instance-api-post-search",
            bg: true,
            properties: {
              args: [
                "APP",
                {
                  fields: {
                    "*": true
                  }
                }
              ]
            }
          },
          {
            brick: "providers-of-flow.execute-api-execute-flow",
            injectDeep: true,
            bg: true,
            properties: {
              args: [
                {
                  flowId: FLOW_ID
                }
              ]
            },
            events: {
              "response.success": [
                {
                  target: "presentational-bricks\\.brick-utils",
                  method: "message",
                  args: ["success", "流程执行中"]
                },
                { action: "history.push" }
              ],
              "response.error": {
                target: "presentational-bricks\\.brick-utils",
                method: "handleHttpError"
              }
            }
          }
        ]
      }
    },
    // 作业
    {
      template: "manual-execution.base-manual-execution",
      params: {
        layout: "horizontal",
        labelCol: { span: 5 },
        wrapperCol: { span: 10 },
        executeProvider: [
          {
            brick: "providers-of-ops-automation.jobs-api-get-jobs",
            bg: true
          },
          {
            brick: "providers-of-ops-automation.jobs-api-create-jobs-excution",
            injectDeep: true,
            bg: true,
            properties: {
              args: [
                {
                  jobId: JOB_ID2,
                  trigger: "JOB_MANUAL_EXEC"
                }
              ]
            }
          }
        ],
        toolSteps: [
          {
            title: "作业执行",
            lifeCycle: {
              useResolves: [
                {
                  name: "taskData",
                  provider: "providers-of-ops-automation\\.jobs-api-get-jobs",
                  args: [JOB_ID2]
                }
              ]
            },
            fields: [
              {
                field: "must_input",
                fieldPath: "[0].inputs.must_input",
                label: "必填参数",
                component: "Input",
                computeDefaultValue: {
                  target: "presentational-bricks\\.brick-form",
                  method: "get",
                  args: ["taskData", "bindResource.defaultInputs.must_input"]
                },
                rules: [
                  {
                    required: true,
                    message: "请输入必填参数"
                  }
                ]
              }
            ],
            events: {
              "brick.form.update": {
                target:
                  "providers-of-ops-automation\\.jobs-api-create-jobs-excution",
                method: "updateArgs"
              }
            }
          },
          {
            title: "执行目标",
            fields: [
              {
                field: "ip",
                fieldPath: "[0].inputs.@agents[0].ip",
                label: "执行目标",
                component: "Input",
                computeDefaultValue: {
                  target: "presentational-bricks\\.brick-form",
                  method: "get",
                  args: ["taskData", "bindResource.defaultInputs.@agents[0].ip"]
                },
                rules: [
                  {
                    required: true,
                    message: "请输入执行目标"
                  }
                ]
              },
              {
                field: "instanceId",
                fieldPath: "[0].inputs.@agents[0].instanceId",
                label: "执行目标id",
                component: "Input",
                computeDefaultValue: {
                  target: "presentational-bricks\\.brick-form",
                  method: "get",
                  args: [
                    "taskData",
                    "bindResource.defaultInputs.@agents[0].instanceId"
                  ]
                },
                rules: [
                  {
                    required: true,
                    message: "请输入执行目标id"
                  }
                ]
              }
            ],
            events: {
              "brick.form.update": {
                target:
                  "providers-of-ops-automation\\.jobs-api-create-jobs-excution",
                method: "updateArgsAndExecute"
              }
            }
          }
        ]
      }
    }
  ],
  doc: docMD
};
