import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/cmdb-instances-filter-form.md";

const story: Story = {
  storyId: "cmdb-instances.cmdb-instances-filter-form",
  type: "brick",
  author: "cyril",
  text: {
    en: "cmdb instances filter form",
    zh: "CMDB 实例动态选择表单项",
  },
  description: {
    en: "select CMDB instances dynamicly",
    zh: "动态筛选 CMDB 实例",
  },
  icon: {
    lib: "fa",
    icon: "pen",
  },
  conf: [
    {
      brick: "div",
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-form",
              properties: {
                id: "filterForm",
                values: {
                  target: "HOST",
                  instances: {
                    objectId: "HOST",
                    instances: {
                      type: "all",
                      query: {},
                    },
                  },
                },
              },
              events: {
                "validate.success": {
                  action: "console.log",
                  args: ["${EVENT.type}", "${EVENT.detail}"],
                },
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
                      brick: "forms.general-select",
                      properties: {
                        name: "target",
                        label: "资源对象",
                        inputBoxStyle: {
                          width: "100%",
                        },
                      },
                      lifeCycle: {
                        useResolves: [
                          {
                            useProvider:
                              "providers-of-cmdb.instance-api-post-search",
                            args: [
                              "_RES_MONITOR_CONFIG",
                              {
                                query: {
                                  enabled: true,
                                },
                                fields: {
                                  objectName: 1,
                                  objectId: 1,
                                },
                                pageSize: 3000,
                              },
                            ],
                            transformFrom: "list",
                            transform: {
                              options: {
                                label: "@{objectName}",
                                value: "@{objectId}",
                              },
                            },
                          },
                        ],
                      },
                      context: [
                        {
                          name: "obejctId",
                          value: "HOST",
                        },
                      ],
                      events: {
                        "general.select.change": [
                          {
                            action: "context.replace",
                            args: ["objectId", "${EVENT.detail}"],
                          },
                          {
                            target: "#filterForm",
                            method: "setInitValue",
                            args: [
                              {
                                instances: {
                                  objectId: "${EVENT.detail}",
                                  instances: {
                                    type: "all",
                                    query: {},
                                  },
                                },
                              },
                            ],
                          },
                        ],
                      },
                    },
                    {
                      brick: "cmdb-instances.cmdb-instances-filter-form",
                      properties: {
                        name: "instances",
                        id: "instances",
                        label: "指定实例范围",
                        autoPullObjectList: true,
                      },
                      events: {
                        "instances.filter.form.change": {
                          action: "console.log",
                        },
                      },
                    },
                    {
                      brick: "forms.general-buttons",
                      properties: {
                        showCancelButton: true,
                        submitText: "提交",
                        cancelText: "取消",
                      },
                      events: {
                        "submit.button.click": {
                          action: "console.log",
                        },
                        "cancel.button.click": {
                          action: "console.log",
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
      description: {
        title: "autoPullObjectList为true",
        message: "内部拉去`objectList`",
      },
    },
    {
      brick: "div",
      slots: {
        content: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-form",
              properties: {
                values: {
                  target: {
                    objectId: "HOST",
                    instances: {
                      type: "all",
                      query: {},
                    },
                  },
                },
              },
              events: {
                "validate.success": {
                  action: "console.log",
                  args: ["${EVENT.type}", "${EVENT.detail}"],
                },
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
                      brick: "cmdb-instances.cmdb-instances-filter-form",
                      properties: {
                        name: "target",
                        label: "指定实例范围",
                      },
                      lifeCycle: {
                        useResolves: [
                          {
                            name: "objectList",
                            useProvider:
                              "providers-of-cmdb.cmdb-object-api-get-object-all",
                            field: "data",
                          },
                        ],
                      },
                      events: {
                        "instances.filter.form.change": {
                          action: "console.log",
                        },
                      },
                    },
                    {
                      brick: "forms.general-buttons",
                      properties: {
                        showCancelButton: true,
                        submitText: "提交",
                        cancelText: "取消",
                      },
                      events: {
                        "submit.button.click": {
                          action: "console.log",
                        },
                        "cancel.button.click": {
                          action: "console.log",
                        },
                      },
                    },
                  ],
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

export default story;
