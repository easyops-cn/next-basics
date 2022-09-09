import { Story } from "@next-core/brick-types";
import { generalCascader } from "../images";
export const generalCascaderStory: Story = {
  storyId: "forms.general-cascader",
  category: "form-input-basic",
  type: "brick",
  author: "jo",
  text: {
    en: "General Cascader",
    zh: "级联选择器",
  },
  description: {
    en: "Choose from a set of related data sets, separated by multi-level classification, common scenarios are provinces and cities, company level, thing classification",
    zh: "从一组相关联的数据集合进行选择，用多级分类进行分隔，常见场景为省市区，公司层级，事物分类等",
  },
  icon: {
    imgSrc: generalCascader,
  },
  conf: [
    {
      description: {
        title: "单独使用的场景",
      },
      brick: "forms.general-cascader",
      properties: {
        name: "city",
        placeholder: "自定义自定名",
        fieldNames: { label: "name", value: "code", children: "items" },
        options: [
          {
            code: "zhejiang",
            name: "Zhejiang",
            items: [
              {
                code: "hangzhou",
                name: "Hangzhou",
                items: [
                  {
                    code: "xihu",
                    name: "West Lake",
                  },
                ],
              },
            ],
          },
          {
            code: "jiangsu",
            name: "Jiangsu",
            items: [
              {
                code: "nanjing",
                name: "Nanjing",
                items: [
                  {
                    code: "zhonghuamen",
                    name: "Zhong Hua Men",
                  },
                ],
              },
            ],
          },
        ],
      },
      events: {
        "cascader.change": {
          action: "console.log",
        },
      },
    },
    {
      description: {
        title: "与 general-form 结合的场景",
      },
      brick: "forms.general-form",
      properties: {
        values: {
          city: ["zhejiang", "hangzhou", "xihu"],
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
              brick: "forms.general-cascader",
              properties: {
                name: "city",
                label: "城市选择",
                placeholder: "请选择城市",
                required: true,
                options: [
                  {
                    value: "zhejiang",
                    label: "Zhejiang",
                    children: [
                      {
                        value: "hangzhou",
                        label: "Hangzhou",
                        children: [
                          {
                            value: "xihu",
                            label: "West Lake",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    value: "jiangsu",
                    label: "Jiangsu",
                    children: [
                      {
                        value: "nanjing",
                        label: "Nanjing",
                        children: [
                          {
                            value: "zhonghuamen",
                            label: "Zhong Hua Men",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              events: {
                "cascader.change": {
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
    {
      description: {
        title: "动态拉取数据(单个 provider 调用的简单场景)",
      },
      brick: "forms.general-form",
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-cascader",
              properties: {
                id: "easy-dymaic-cascader",
                name: "dynamic",
                label: "dynamic",
                options: [
                  {
                    value: "APP",
                    label: "APP",
                    isLeaf: false,
                  },
                  {
                    value: "HOST",
                    label: "HOST",
                    isLeaf: false,
                  },
                ],
              },
              context: [{ name: "selectedData" }],
              events: {
                "cascader.loading.data": [
                  {
                    action: "context.replace",
                    args: ["selectedData", "<% EVENT.detail %>"],
                  },
                  {
                    useProvider: "providers-of-cmdb.instance-api-post-search",
                    args: [
                      "<% CTX.selectedData.curOption.value %>",
                      {
                        fields: {
                          name: true,
                          hostname: true,
                        },
                        page_size: 10,
                      },
                    ],
                    callback: {
                      success: [
                        {
                          target: "#easy-dymaic-cascader",
                          method: "setChildrenOption",
                          args: [
                            "<% CTX.selectedData %>",
                            "<% EVENT.detail.list?.map(item => ({label: item.name || item.hostname, value: item.name || item.hostname, instanceId: item.instanceId})) %>",
                          ],
                        },
                      ],
                      error: [
                        {
                          action: "handleHttpError",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              brick: "forms.general-buttons",
              properties: {
                showCancelButton: true,
                submitText: "提交",
                cancelText: "取消",
              },
            },
          ],
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
    },
    {
      description: {
        title: "动态拉取数据(多个 provider 混合调用的复杂场景)",
      },
      brick: "forms.general-form",
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.general-cascader",
              properties: {
                id: "complex-dymaic-cascader",
                name: "dynamic",
                label: "dynamic",
                options: [
                  {
                    value: "APP",
                    label: "APP",
                    isLeaf: false,
                  },
                  {
                    value: "HOST",
                    label: "HOST",
                    isLeaf: false,
                  },
                ],
              },
              context: [{ name: "optionsData" }],
              events: {
                "cascader.loading.data": [
                  {
                    action: "context.replace",
                    args: ["optionsData", "<% EVENT.detail %>"],
                  },
                  {
                    if: "<% CTX.optionsData.layerIndex === 0 %>",
                    useProvider: "providers-of-cmdb.instance-api-post-search",
                    args: [
                      "<% CTX.optionsData.curOption.value %>",
                      {
                        fields: {
                          name: true,
                          hostname: true,
                        },
                        page_size: 10,
                      },
                    ],
                    callback: {
                      success: [
                        {
                          target: "#complex-dymaic-cascader",
                          method: "setChildrenOption",
                          args: [
                            "<% CTX.optionsData %>",
                            "<% EVENT.detail.list?.map(item => ({label: item.name || item.hostname, value: item.name || item.hostname, objectId: CTX.optionsData.curOption.value, instanceId: item.instanceId, isLeaf: false})) %>",
                          ],
                        },
                      ],
                      error: [
                        {
                          action: "handleHttpError",
                        },
                      ],
                    },
                  },
                  {
                    if: "<% CTX.optionsData.layerIndex === 1 %>",
                    useProvider: "providers-of-cmdb.instance-api-get-detail",
                    args: [
                      "<% CTX.optionsData.curOption.objectId %>",
                      "<% CTX.optionsData.curOption.instanceId %>",
                      {
                        fields: ["name"],
                      },
                    ],
                    callback: {
                      success: [
                        {
                          target: "#complex-dymaic-cascader",
                          method: "setChildrenOption",
                          args: [
                            "<% CTX.optionsData %>",
                            "<% [{label: EVENT.detail.instanceId, value: EVENT.detail.instanceId}] %>",
                          ],
                        },
                      ],
                      error: [
                        {
                          action: "handleHttpError",
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              brick: "forms.general-buttons",
              properties: {
                showCancelButton: true,
                submitText: "提交",
                cancelText: "取消",
              },
            },
          ],
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
    },
  ],
};
