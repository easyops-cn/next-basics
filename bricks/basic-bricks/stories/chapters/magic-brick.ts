import { Story } from "@next-core/brick-types";
import { CMDB_HOST_INSTANCE_ID, CMDB_HOST_INSTANCE_IP } from "../constants";

export const magicBrickStory: Story = {
  storyId: "basic-bricks.magic-brick",
  category: "other",
  type: "brick",
  author: "lynette",
  deprecated: true,
  text: {
    en: "Magic Brick",
    zh: "魔法构件",
  },
  description: {
    en: "Deprecated",
    zh: "已废弃",
  },
  icon: {
    lib: "fa",
    icon: "magic",
  },
  conf: [
    {
      brick: "basic-bricks.magic-brick",
      properties: {
        showType: "HOST.ip",
        data: {
          instanceId: CMDB_HOST_INSTANCE_ID,
          ip: CMDB_HOST_INSTANCE_IP,
        },
      },
    },
    {
      brick: "basic-bricks.magic-brick",
      properties: {
        showType: "clusterType",
        data: "0",
      },
    },
  ],
};
