import { Story } from "@next-core/brick-types";

export const popoverContainerStory: Story = {
  storyId: "basic-bricks.popover-container",
  category: "layout",
  type: "brick",
  author: "lynette",
  text: {
    en: "popover container",
    zh: "气泡卡片容器",
  },
  description: {
    en: "",
    zh: "可以配置显示构件和弹出框构件，常用于快速编辑和详情展示",
  },
  icon: {
    lib: "fa",
    icon: "comment",
    prefix: "fas",
  },
  conf: [
    {
      brick: "presentational-bricks.brick-descriptions",
      properties: {
        descriptionTitle: "Issue Detail",
        dataSource: {
          storyPoint: "1",
          assignee: [
            {
              name: "alrenhuang",
              instanceId: "59bc76cddd8cd",
            },
          ],
        },
        itemList: [
          {
            label: "估时",
            useBrick: {
              brick: "basic-bricks.popover-container",
              properties: {
                showPopoverBg: false,
                id: "story-point-edit",
                displayBrick: {
                  useBrick: {
                    brick: "div",
                    properties: {
                      id: "story-point-display",
                    },
                    transform: {
                      textContent: "@{storyPoint}",
                    },
                  },
                },
                popoverContentStyle: {
                  width: "60px",
                },
                popoverBrick: {
                  useBrick: {
                    brick: "forms.general-select",
                    properties: {
                      inputBoxStyle: {
                        width: 60,
                      },
                      allowClear: false,
                      options: [
                        {
                          label: "0.5",
                          value: "0.5",
                        },
                        {
                          label: "1",
                          value: "1",
                        },
                        {
                          label: "1.5",
                          value: "1.5",
                        },
                        {
                          label: "2",
                          value: "2",
                        },
                        {
                          label: "2.5",
                          value: "2.5",
                        },
                        {
                          label: "3",
                          value: "3",
                        },
                      ],
                    },
                    transform: {
                      value: "@{storyPoint}",
                    },
                    events: {
                      "general.select.change": [
                        {
                          action: "console.log",
                          args: ["${EVENT.detail}"],
                        },
                        {
                          target: "#story-point-display",
                          properties: {
                            textContent: "${EVENT.detail}",
                          },
                        },
                        {
                          target: "#story-point-edit",
                          properties: {
                            visible: false,
                          },
                        },
                      ],
                    },
                  },
                },
              },
              events: {
                "visible.change": {
                  action: "console.log",
                },
              },
              transform: {
                data: "@{}",
              },
            },
          },
          {
            label: "负责人",
            useBrick: {
              brick: "basic-bricks.popover-container",
              properties: {
                dataset: { testid: "basic-usage-click-demo" },
                showPopoverBg: false,
                id: "user-quick-edit",
                displayBrick: {
                  useBrick: {
                    brick: "presentational-bricks.brick-user",
                    properties: {
                      id: "show-user",
                      size: "large",
                    },
                    transform: {
                      userNameOrId: "@{assignee[0].name}",
                    },
                  },
                },
                popoverBrick: {
                  useBrick: {
                    brick: "forms.cmdb-instance-select",
                    properties: {
                      objectId: "USER",
                    },
                    events: {
                      "forms.cmdb-instance-select.change": [
                        {
                          target: "#user-quick-edit",
                          properties: {
                            visible: false,
                          },
                        },
                        {
                          target: "#show-user",
                          properties: {
                            userNameOrId: "${EVENT.detail}",
                          },
                        },
                        {
                          action: "console.log",
                        },
                      ],
                    },
                  },
                },
              },
              events: {
                "visible.change": {
                  action: "console.log",
                },
              },
              transform: {
                data: "@{}",
              },
            },
          },
        ],
      },
    },
    {
      brick: "presentational-bricks.brick-descriptions",
      properties: {
        descriptionTitle: "服务信息",
        dataSource: {
          name: "emily_test",
          data: [
            {
              clusterName: "emily_test",
              namespace: "test",
            },
          ],
        },
        itemList: [
          {
            label: "所属资源池",
            useBrick: {
              brick: "basic-bricks.popover-container",
              properties: {
                dataset: { testid: "basic-usage-hover-demo" },
                showIcon: "always",
                popoverContentStyle: {
                  width: 200,
                  height: 200,
                },
                placement: "top",
                trigger: "hover",
                popoverIcon: {
                  lib: "easyops",
                  category: "app",
                  icon: "search",
                },
                displayBrick: {
                  useBrick: {
                    brick: "div",
                    transform: {
                      textContent: "@{name}",
                    },
                  },
                },
                popoverBrick: {
                  useBrick: {
                    brick: "presentational-bricks.brick-table",
                    properties: {
                      showCard: false,
                      columns: [
                        {
                          title: "集群名称",
                          dataIndex: "clusterName",
                        },
                        {
                          title: "命名空间",
                          dataIndex: "namespace",
                        },
                      ],
                      configProps: {
                        pagination: false,
                      },
                    },
                    transform: {
                      dataSource: {
                        list: "@{data}",
                      },
                    },
                  },
                },
              },
              events: {
                "visible.change": {
                  action: "console.log",
                },
              },
              transform: {
                data: "@{}",
              },
            },
          },
        ],
      },
    },
    {
      brick: "basic-bricks.popover-container",
      properties: {
        showIcon: "never",
        triggerByIcon: false,
        placement: "top",
        trigger: "hover",
        displayBrick: {
          useBrick: {
            brick: "presentational-bricks.brick-value-mapping",
            properties: {
              showTagCircle: true,
              value: 0,
              mapping: {
                0: { text: "紧急", color: "red" },
              },
            },
          },
        },
        popoverContentStyle: {
          width: 160,
          height: 20,
        },
        popoverBrick: {
          useBrick: {
            brick: "div",
            properties: {
              textContent: "紧急：cpu.util大于 70%",
            },
          },
        },
      },
    },
  ],
};
