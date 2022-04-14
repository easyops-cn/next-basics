import { Story } from "@next-core/brick-types";

export const RankTableStory: Story = {
  storyId: "presentational-bricks.rank-table",
  category: "general-tables",
  type: "brick",
  author: "Alex",
  text: {
    en: "rank table",
    zh: "排名表格",
  },
  description: {
    en: "rank table",
    zh: "排名表格",
  },
  icon: {
    lib: "fa",
    icon: "table",
  },
  conf: [
    {
      description: {
        title: "基础用法",
      },
      brick: "presentational-bricks.rank-table",
      properties: {
        rowKey: "id",
        showCard: true,
        header: {
          title: "Top10",
        },
        columns: [
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Age",
            dataIndex: "age",
            key: "age",
          },
          {
            dataIndex: "address",
            key: "address",
            headerBrick: {
              useBrick: {
                brick: "presentational-bricks.general-tooltip",
                properties: {
                  icon: {
                    lib: "fa",
                    icon: "info-circle",
                  },
                  content: "这是一个 tooltips",
                  text: "Address",
                },
              },
            },
          },
          {
            title: "Tags",
            key: "tags",
            dataIndex: "tags",
            useBrick: {
              brick: "presentational-bricks.brick-tag",
              transform: {
                tagList: "@{cellData}",
              },
              properties: {
                showCard: false,
                configProps: {
                  color: "var(--color-brand)",
                },
              },
            },
          },
        ],
        dataSource: {
          list: [
            {
              id: "1",
              name: "John Brown",
              age: 32,
              address: "New York No. 1 Lake Park",
              tags: ["nice", "good"],
            },
            {
              id: "2",
              name: "Jim Green",
              age: 42,
              address: "London No. 2 Lake Park",
              tags: ["loser", "bad"],
            },
            {
              id: "3",
              name: "Joe Black",
              age: 32,
              address: "Sidney No. 3 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
            {
              id: "4",
              name: "Jim Red",
              age: 34,
              address: "Sidney No. 4 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
            {
              id: "5",
              name: "Mathéo Girard",
              age: 35,
              address: "Sidney No. 5 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
            {
              id: "6",
              name: "Camille Roy",
              age: 36,
              address: "Sidney No. 6 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
            {
              id: "7",
              name: "Troy Owens",
              age: 37,
              address: "Sidney No. 7 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
            {
              id: "8",
              name: "Marie Cole",
              age: 38,
              address: "Sidney No. 8 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
            {
              id: "9",
              name: "Jennifer Young",
              age: 38,
              address: "Sidney No. 8 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
            {
              id: "10",
              name: "Clinton Cruz",
              age: 38,
              address: "Sidney No. 8 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
          ],
        },
      },
    },
    {
      description: {
        title: "不含头部的排名表格",
      },
      brick: "presentational-bricks.rank-table",
      properties: {
        rowKey: "id",
        columns: [
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Age",
            dataIndex: "age",
            key: "age",
          },
          {
            dataIndex: "address",
            key: "address",
            headerBrick: {
              useBrick: {
                brick: "presentational-bricks.general-tooltip",
                properties: {
                  icon: {
                    lib: "fa",
                    icon: "info-circle",
                  },
                  content: "这是一个 tooltips",
                  text: "Address",
                },
              },
            },
          },
          {
            title: "Tags",
            key: "tags",
            dataIndex: "tags",
            useBrick: {
              brick: "presentational-bricks.brick-tag",
              transform: {
                tagList: "@{cellData}",
              },
              properties: {
                showCard: false,
                configProps: {
                  color: "var(--color-brand)",
                },
              },
            },
          },
        ],
        dataSource: {
          list: [
            {
              id: "1",
              name: "John Brown",
              age: 32,
              address: "New York No. 1 Lake Park",
              tags: ["nice", "good"],
            },
            {
              id: "2",
              name: "Jim Green",
              age: 42,
              address: "London No. 2 Lake Park",
              tags: ["loser", "bad"],
            },
            {
              id: "3",
              name: "Troy Owens",
              age: 32,
              address: "Sidney No. 3 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
            {
              id: "4",
              name: "Clinton Cruz",
              age: 34,
              address: "Sidney No. 4 Lake Park",
              tags: ["teacher", "lucky", "lay"],
            },
          ],
          page: 1,
          pageSize: 10,
          total: 2,
        },
      },
    },
  ],
};
