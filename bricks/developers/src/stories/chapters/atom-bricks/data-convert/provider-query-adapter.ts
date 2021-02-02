import doc from "../../../docs/cmdb-instances/provider-query-adapter.md";
import { Story } from "../../../interfaces";

export const story: Story = {
  storyId: "cmdb-instances.provider-query-adapter",
  type: "brick",
  author: "lynette",
  text: {
    en: "cmdb query adapter",
    zh: "cmdb query 转换provider",
  },
  description: {
    en: "",
    zh: "用于转换cmdb query，自动清洗空值／undefined／null等非法值",
  },
  icon: {
    lib: "fa",
    icon: "pen",
  },
  conf: [
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "cmdb-instances.provider-query-adapter",
              bg: true,
              injectDeep: true,
              properties: {
                args: [
                  {
                    op: "$and",
                    query: [
                      {
                        hostname: {
                          $like: "%@{hostname}%",
                        },
                      },
                      {
                        ip: {
                          $like: "%@{ip}%",
                        },
                      },
                    ],
                    values: {
                      hostname: "${query.hostname}",
                      ip: "${query.ip}",
                    },
                  },
                ],
              },
            },
            {
              brick: "providers-of-cmdb.instance-api-post-search",
              bg: true,
              injectDeep: true,
              properties: {
                args: [
                  "HOST",
                  {
                    page: "${query.page=1|number}",
                    page_size: "${query.pageSize=10|number}",
                  },
                ],
              },
              lifeCycle: {
                useResolves: [
                  {
                    provider: "cmdb-instances\\.provider-query-adapter",
                    transform: {
                      "args[1].query": "@{}",
                    },
                  },
                ],
              },
            },
            {
              brick: "forms.general-form",
              injectDeep: true,
              properties: {
                layout: "inline",
                values: {
                  hostname: "${query.hostname}",
                  ip: "${query.ip}",
                },
              },
              events: {
                "validate.success": [
                  {
                    action: "console.log",
                    args: ["${EVENT.type}", "${EVENT.detail}"],
                  },
                  {
                    action: "history.pushQuery",
                    args: ["${event.detail}"],
                  },
                ],
                "validate.error": {
                  action: "console.warn",
                  args: ["${EVENT.type}", "${EVENT.detail}"],
                },
              },
              slots: {
                items: {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "forms.general-input",
                      properties: {
                        name: "hostname",
                        label: "主机名",
                      },
                    },
                    {
                      brick: "forms.general-input",
                      properties: {
                        name: "ip",
                        label: "IP",
                      },
                    },
                    {
                      brick: "forms.general-buttons",
                      properties: {
                        submitText: "搜索",
                      },
                    },
                  ],
                },
              },
            },
            {
              brick: "presentational-bricks.brick-table",
              properties: {
                page: "${query.page=1|number}",
                pageSize: "${query.pageSize=10|number}",
                columns: [
                  {
                    title: "ip",
                    dataIndex: "ip",
                    key: "ip",
                    useBrick: {
                      brick: "basic-bricks.magic-brick",
                      properties: {
                        showType: "HOST.ip",
                      },
                      transform: {
                        data: "@{rowData}",
                      },
                    },
                  },
                  {
                    title: "主机名",
                    dataIndex: "hostname",
                    key: "hostname",
                  },
                  {
                    title: "agent状态",
                    dataIndex: "_agentStatus",
                    key: "_agentStatus",
                    useBrick: {
                      brick: "basic-bricks.magic-brick",
                      properties: {
                        showType: "HOST._agentStatus",
                      },
                      transform: {
                        data: "@{rowData}",
                      },
                    },
                  },
                ],
              },
              lifeCycle: {
                useResolves: [
                  {
                    name: "dataSource",
                    provider: "providers-of-cmdb\\.instance-api-post-search",
                  },
                ],
              },
            },
          ],
        },
      },
    },
  ],
  doc,
};
