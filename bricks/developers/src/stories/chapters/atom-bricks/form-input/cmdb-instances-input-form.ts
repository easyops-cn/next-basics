import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/cmdb-instances-input-form.md";

import { CMDB_HOST_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.cmdb-instances-input-form",
  type: "brick",
  author: "cyril",
  text: {
    en: "cmdb-instances-input-form",
    zh: "CMDB 实例输入表单项",
  },
  description: {
    en:
      "select instances by the instance list or pasting an attribute value list",
    zh: "通过实例列表或粘贴某属性的值列表来选择实例",
  },
  icon: {
    lib: "fa",
    icon: "pen",
  },
  conf: [
    {
      brick: "forms.general-form",
      properties: {
        values: {
          instanceIdList: [CMDB_HOST_INSTANCE_ID],
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
              brick: "cmdb-instances.cmdb-instances-input-form",
              properties: {
                label: "单执行主机",
                name: "instanceIdList",
                objectId: "HOST",
                fieldId: "ip",
                singleSelect: true,
                checkAgentStatus: true,
                checkPermission: true,
              },
              lifeCycle: {
                useResolves: [
                  {
                    name: "objectList",
                    field: "data",
                    useProvider:
                      "providers-of-cmdb.cmdb-object-api-get-object-ref",
                    args: [{ ref_object: "HOST" }],
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
      brick: "forms.general-form",
      properties: {
        values: {
          instanceIdList: [CMDB_HOST_INSTANCE_ID],
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
              brick: "cmdb-instances.cmdb-instances-input-form",
              properties: {
                label: "多执行主机",
                name: "instanceIdList",
                objectId: "HOST",
                fieldId: "ip",
                checkAgentStatus: true,
                checkPermission: true,
              },
              lifeCycle: {
                useResolves: [
                  {
                    name: "objectList",
                    field: "data",
                    useProvider:
                      "providers-of-cmdb.cmdb-object-api-get-object-ref",
                    args: [{ ref_object: "HOST" }],
                  },
                ],
              },
              events: {
                "cmdb.instance.form.change": {
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
  doc: docMD,
};

export default story;
