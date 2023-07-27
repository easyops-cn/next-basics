import { Story } from "../../../interfaces";
import docMD from "../../../docs/forms/tpl-cmdb-object-attr-add.md";

export const story: Story = {
  storyId: "cmdb-object.tpl-cmdb-object-attr-add",
  type: "brick",
  author: "dophi",
  text: {
    en: "add a new CMDB object attribute",
    zh: "添加cmdb模型属性",
  },
  icon: {
    lib: "fa",
    icon: "comments",
    prefix: "fas",
  },
  description: {
    en: "add a new CMDB object attribute",
    zh: "添加cmdb模型属性",
  },
  conf: [
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "div",
              properties: {
                style: {
                  border: "1px solid #ccc",
                  padding: "20px",
                },
              },
              slots: {
                "": {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "h4",
                      properties: {
                        textContent: "添加模型属性",
                      },
                    },
                    {
                      brick: "providers-of-cmdb.object-attribute-api-create",
                      bg: true,
                    },
                    {
                      brick: "forms.tpl-cmdb-object-attr-add",
                      properties: {
                        values: {
                          id: "",
                          name: "",
                          attrValue: "",
                          tag: "",
                          attrOptions: [],
                        },
                      },
                      events: {
                        "validate.success": [
                          {
                            target:
                              "providers-of-cmdb\\.object-attribute-api-create",
                            method: "setArgsAndExecute",
                            args: [
                              {
                                "0": "object_2_child_2",
                                "1": `<% {
                                      id:EVENT.detail.id,
                                      name:EVENT.detail.name,
                                      value:EVENT.detail.attrValue,
                                      tag:[EVENT.detail.tag],
                                      required:''+EVENT.detail.attrOptions.includes('required'),
                                      readonly:''+EVENT.detail.attrOptions.includes('readonly'),
                                      unique:''+EVENT.detail.attrOptions.includes('unique'),
                                    } %>`,
                              },
                            ],
                            callback: {
                              success: [
                                {
                                  action: "message.success",
                                  args: ["添加属性成功"],
                                },
                              ],
                            },
                          },
                        ],
                        "validate.error": {
                          action: "console.log",
                          args: ["<% EVENT.detail %>"],
                        },
                      },
                    },
                  ],
                },
              },
            },
            {
              brick: "div",
              properties: {
                style: {
                  border: "1px solid #ccc",
                  padding: "20px",
                  "margin-top": "20px",
                },
              },
              slots: {
                "": {
                  type: "bricks",
                  bricks: [
                    {
                      brick: "h4",
                      properties: {
                        textContent: "编辑模型属性",
                      },
                    },
                    {
                      brick: "providers-of-cmdb.instance-api-update-instance",
                      bg: true,
                    },
                    {
                      brick: "providers-of-cmdb.instance-api-get-detail",
                      bg: true,
                    },
                    {
                      brick: "forms.tpl-cmdb-object-attr-add",
                      lifeCycle: {
                        useResolves: [
                          {
                            provider:
                              "providers-of-cmdb\\.instance-api-get-detail",
                            args: ["MODEL_ATTRIBUTE", "5a9e9338d1287"],
                            transform: {
                              values: {
                                id: "@{id}",
                                name: "@{name}",
                                attrValue: "@{value}",
                                tag: "@{tag[0]}",
                                attrOptions:
                                  '<% _.compact([DATA.readonly?"readonly":"",DATA.required?"required":"",DATA.unique?"unique":""]) %>',
                              },
                            },
                          },
                        ],
                      },
                      properties: {
                        attrIdInputDisabled: true,
                      },
                      events: {
                        "validate.success": [
                          {
                            target:
                              "providers-of-cmdb\\.instance-api-update-instance",
                            method: "resolve",
                            args: [
                              "MODEL_ATTRIBUTE",
                              "5a9e9338d1287",
                              `<% {
                                      id:EVENT.detail.id,
                                      name:EVENT.detail.name,
                                      value:EVENT.detail.attrValue,
                                      tag:[EVENT.detail.tag],
                                      required:''+EVENT.detail.attrOptions.includes('required'),
                                      readonly:''+EVENT.detail.attrOptions.includes('readonly'),
                                      unique:''+EVENT.detail.attrOptions.includes('unique'),
                                    } %>`,
                            ],
                            callback: {
                              success: [
                                {
                                  action: "message.success",
                                  args: ["编辑属性成功"],
                                },
                              ],
                            },
                          },
                        ],
                        "validate.error": {
                          action: "console.log",
                          args: ["<% EVENT.detail %>"],
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
