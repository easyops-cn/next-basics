import { Story } from "@next-core/brick-types";

export const BrickClusterTypeStory: Story = {
  storyId: "presentational-bricks.brick-cluster-type",
  category: "data-view-value-mapping",
  type: "brick",
  author: "ice",
  text: {
    en: "cluster type",
    zh: "集群类型",
  },
  icon: { lib: "fa", icon: "cube" },
  description: {
    en: "render cluster type for human readable",
    zh: "集群类型专用展示：开发、测试、预发布、生产",
  },
  tags: [
    {
      en: "cmdb",
      zh: "cmdb",
    },
  ],
  conf: [
    {
      brick: "presentational-bricks.brick-cluster-type",
      properties: {
        value: "0",
      },
    },
    {
      brick: "presentational-bricks.brick-cluster-type",
      properties: {
        value: "1",
      },
    },
    {
      brick: "presentational-bricks.brick-cluster-type",
      properties: {
        value: "2",
      },
    },
    {
      brick: "presentational-bricks.brick-cluster-type",
      properties: {
        value: "3",
      },
    },
    {
      brick: "presentational-bricks.brick-cluster-type",
      properties: {
        value: "0",
        showBg: false,
      },
    },
  ],
  previewColumns: 2,
};
