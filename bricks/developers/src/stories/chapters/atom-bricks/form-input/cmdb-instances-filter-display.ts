import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/cmdb-instances-filter-display.md";

import { CMDB_HOST_INSTANCE_ID } from "../../../constants";

const story: Story = {
  storyId: "cmdb-instances.cmdb-instances-filter-display",
  type: "template",
  author: "cyril",
  text: {
    en: "cmdb instances filter display",
    zh: "CMDB 实例动态选择展示项",
  },
  description: {
    en: "show dynamic CMDB instances",
    zh: "展示动态 CMDB 实例",
  },
  icon: {
    lib: "fa",
    icon: "info",
  },
  conf: [
    {
      template: "cmdb-instances.cmdb-instances-filter-display",
      params: {
        objectId: "HOST",
        instances: {
          type: "all",
        },
      },
    },
    {
      template: "cmdb-instances.cmdb-instances-filter-display",
      params: {
        objectId: "HOST",
        instances: {
          type: "constant",
          query: {
            instanceId: {
              $in: [CMDB_HOST_INSTANCE_ID],
            },
          },
        },
      },
    },
    {
      template: "cmdb-instances.cmdb-instances-filter-display",
      params: {
        objectId: "HOST",
        instances: {
          type: "search",
          query: {
            $and: [
              {
                $or: [
                  {
                    instanceId: {
                      $eq: CMDB_HOST_INSTANCE_ID,
                    },
                  },
                ],
              },
            ],
          },
        },
      },
    },
    {
      brick: "cmdb-instances.cmdb-instances-filter-display",
      description: {
        title: "autoPullObjectList为true",
        message:
          "如果为true，则内部直接设置objectList属性，否则需要外部设置objectList属性",
      },
      properties: {
        objectId: "APP",
        autoPullObjectList: true,
        instances: {
          type: "all",
        },
      },
    },
  ],
  doc: docMD,
};

export default story;
