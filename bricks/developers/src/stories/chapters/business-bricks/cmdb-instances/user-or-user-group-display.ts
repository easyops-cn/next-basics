import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/user-or-user-group-display.md";

export const story: Story = {
  storyId: "cmdb-instances.user-or-user-group-display",
  type: "brick",
  author: "lynette",
  text: {
    en: "user or user group display",
    zh: "用户（组）展示构件",
  },
  description: {
    en: "user or user group display",
    zh: "用户（组）展示构件",
  },
  icon: {
    lib: "fa",
    icon: "users",
  },
  conf: [
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "cmdb-instances.user-or-user-group-display",
              properties: {
                value: {
                  user: [
                    "easyops",
                    "lightjiao_test_user",
                    "cmdbResourceUser4333717516",
                  ],
                  userGroup: [":5924236efb80c"],
                },
              },
              lifeCycle: {
                useResolves: [
                  {
                    name: "objectList",
                    field: "data",
                    useProvider:
                      "providers-of-cmdb.cmdb-object-api-get-object-ref",
                    args: [{ ref_object: "USER,USER_GROUP" }],
                  },
                ],
              },
            },
          ],
        },
      },
    },
  ],
  doc: docMD,
};
