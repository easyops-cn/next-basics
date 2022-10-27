import { Story } from "@next-core/brick-types";
import { CMDB_APP_INSTANCE_ID } from "../constants";
import { cmdbInstanceSelectPancel } from "../images";

export const cmdbInstanceSelectPanelStory: Story = {
  storyId: "forms.cmdb-instance-select-panel",
  category: "form-input-business",
  type: "brick",
  author: "cyril",
  text: {
    en: "CMDB Instance Select Panel",
    zh: "CMDB 实例选择",
  },
  description: {
    en: "select CMDB instances by instance-list-modal",
    zh: "通过 instance-list-modal 选择 CMDB 实例",
  },
  icon: {
    imgSrc: cmdbInstanceSelectPancel,
  },
  conf: [
    {
      bricks: [
        {
          brick: "forms.cmdb-instance-select-panel",
          events: {
            "instance.select.change": {
              action: "message.info",
              args: ["select.change"],
            },
            "instance.select.change.v2": {
              action: "message.info",
              args: ["select.change.v2"],
            },
          },
          lifeCycle: {
            useResolves: [
              {
                args: [
                  {
                    ref_object: "APP",
                  },
                ],
                field: "data",
                name: "objectList",
                useProvider: "providers-of-cmdb.cmdb-object-api-get-object-ref",
              },
            ],
          },
          properties: {
            addButtonText: "点击选择实例",
            fields: ["name", "memo", "cloud"],
            instanceQuery: {
              $or: [
                {
                  name: {
                    $like: "%cmdb%",
                  },
                },
              ],
            },
            label: "选择应用",
            name: "instanceIdList",
            objectId: "APP",
          },
        },
      ],
      snippetId: "forms.cmdb-instance-select-panel[basic]",
      title: {
        en: "Basic CMDB Instance Select Panel",
        zh: "基础CMDB实例选择",
      },
    },
    {
      brick: "forms.general-form",
      properties: {
        values: {
          instanceIdList: [CMDB_APP_INSTANCE_ID],
        },
      },
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.cmdb-instance-select-panel",
              properties: {
                objectId: "APP",
                label: "选择应用",
                name: "instanceIdList",
                instanceQuery: {
                  $or: [{ name: { $like: "%cmdb%" } }],
                },
                addButtonText: "点击选择实例",
                fields: ["name", "memo", "cloud"],
              },
              lifeCycle: {
                useResolves: [
                  {
                    name: "objectList",
                    field: "data",
                    useProvider:
                      "providers-of-cmdb.cmdb-object-api-get-object-ref",
                    args: [{ ref_object: "APP" }],
                  },
                ],
              },
              events: {
                "instance.select.change": {
                  action: "console.log",
                },
                "instance.select.change.v2": {
                  action: "console.log",
                },
              },
            },
            {
              brick: "forms.general-buttons",
              properties: {
                submitText: "提交",
              },
              events: {
                "submit.button.click": {
                  target: "forms\\.general-form",
                  method: "validate",
                },
              },
            },
          ],
        },
      },
      events: {
        "validate.success": {
          action: "console.log",
        },
      },
    },
  ],
};
