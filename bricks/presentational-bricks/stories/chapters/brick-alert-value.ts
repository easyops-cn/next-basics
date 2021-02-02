import { Story } from "@next-core/brick-types";

export const BrickAlertValueStory: Story = {
  storyId: "presentational-bricks.brick-alert-value",
  category: "value-mapping",
  type: "brick",
  author: "ice",
  text: {
    en: "alert value",
    zh: "告警值",
  },
  description: {
    en: "",
    zh: "将告警数值组合触发条件，显示成 90%↑ 的模式",
  },
  icon: {
    lib: "fa",
    icon: "bell-slash",
  },
  conf: [
    {
      brick: "presentational-bricks.brick-alert-value",
      properties: {
        dataSource: {
          alert_conditions: {
            alert_type: "host",
            comparators: [
              {
                threshold: 80,
                type: "bigger_than",
                level: 1,
              },
              {
                threshold: 95,
                type: "bigger_than",
                level: 2,
              },
            ],
            alert_sub_type: "host",
            attr_id: "host.disk.max_used_percent",
            alert_table: "host",
            unit: "%",
          },
          value: 85,
          level: 1,
        },
      },
    },
    {
      brick: "presentational-bricks.brick-alert-value",
      properties: {
        dataSource: {
          alert_conditions: {
            alert_type: "host",
            comparators: [
              {
                threshold: 1000,
                type: "smaller_than",
                level: 1,
              },
              {
                threshold: 500,
                type: "smaller_than",
                level: 2,
              },
            ],
            alert_sub_type: "host",
            attr_id: "host.net.traffic_in",
            alert_table: "host",
            unit: "kbps",
          },
          value: 600,
          level: 2,
        },
      },
    },
  ],
  previewColumns: 2,
};
