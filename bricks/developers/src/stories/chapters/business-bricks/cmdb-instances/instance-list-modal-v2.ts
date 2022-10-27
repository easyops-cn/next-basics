import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-list-modal-v2.md";

export const story: Story = {
  storyId: "cmdb-instances.instance-list-modal-v2",
  type: "brick",
  author: "ice",
  text: {
    en: "Instance List Modal v2",
    zh: "实例列表模态框 v2",
  },
  description: {
    en: "CMDB instance list modal v2",
    zh: "CMDB 通用实例列表模态框 v2",
  },
  icon: {
    lib: "fa",
    icon: "list-alt",
  },
  conf: [
    {
      snippetId: "cmdb-instances.instance-list-modal-v2[normal]",
      title: {
        en: "Basic use",
        zh: "基础使用",
      },
      bricks: [
        {
          brick: "cmdb-instances.instance-list-modal-v2",
          lifeCycle: {
            useResolves: [
              {
                useProvider: "providers-of-cmdb.cmdb-object-api-get-object-ref",
                name: "objectList",
                args: [{ ref_object: "HOST" }],
                field: "data",
              },
            ],
          },
          properties: {
            id: "modal-v2",
            objectId: "HOST",
            modalTitle: "查看实例",
            presetConfigs: {
              query: { ip: { $like: "%100.1%" }, _agentStatus: "正常" },
            },
          },
          events: {
            "cmdb-instances.modal-v2.selection-change": {
              action: "console.info",
            },
          },
        },
      ],
      actions: [
        {
          text: "open Modal",
          method: "open",
        },
      ],
    },
    {
      brick: "div",
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "basic-bricks.general-custom-buttons",
              properties: {
                alignment: "start",
                customButtons: [
                  {
                    text: "query1 open",
                    buttonType: "primary",
                    eventName: "query1.click",
                  },
                  {
                    text: "query2 open",
                    eventName: "query2.click",
                  },
                ],
              },
              events: {
                "query1.click": [
                  {
                    target: "#modal-v2",
                    properties: {
                      presetConfigs: {
                        query: { ip: { $like: "%192%" } },
                      },
                    },
                  },
                  {
                    target: "#modal-v2",
                    method: "open",
                  },
                ],
                "query2.click": [
                  {
                    target: "#modal-v2",
                    properties: {
                      presetConfigs: {
                        query: {
                          ip: { $like: "%100.1%" },
                          _agentStatus: "正常",
                        },
                      },
                    },
                  },
                  {
                    target: "#modal-v2",
                    method: "open",
                  },
                ],
              },
            },
            {
              brick: "cmdb-instances.instance-list-modal-v2",
              lifeCycle: {
                useResolves: [
                  {
                    useProvider:
                      "providers-of-cmdb.cmdb-object-api-get-object-ref",
                    name: "objectList",
                    args: [{ ref_object: "HOST" }],
                    field: "data",
                  },
                ],
              },
              properties: {
                id: "modal-v2",
                objectId: "HOST",
                modalTitle: "查看实例",
                presetConfigs: {
                  query: { ip: { $like: "%100.1%" }, _agentStatus: "正常" },
                },
              },
              events: {
                "cmdb-instances.modal-v2.selection-change": {
                  action: "console.info",
                },
              },
            },
          ],
        },
      },
    },
  ],
  doc: docMD,
};
