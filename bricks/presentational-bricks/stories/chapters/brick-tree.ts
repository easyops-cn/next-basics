import { Story } from "@next-core/brick-types";
import { brickTreeSvg } from "../images";
import { brickTreeNormalSvg } from "../images";
export const BrickTreeStory: Story = {
  storyId: "presentational-bricks.brick-tree",
  type: "brick",
  category: "display-component",
  author: "jo",
  text: {
    en: "Tree",
    zh: "树形构件",
  },
  icon: {
    imgSrc: brickTreeSvg,
  },
  description: {
    en: "tree list",
    zh: "常用于展示应用业务树、模型树等，可以完整展现其中层级关系，并具有展开收起选择等交互功能",
  },
  conf: [
    {
      snippetId: "presentational-bricks.brick-tree[normal]",
      title: {
        zh: "基础用法",
        en: "",
      },
      message: {
        zh: "checkedKeys和configProps.checkable实现多选，expandedKeys可以设置默认展开项，configProps.showIcon设置是否显示图标（图标需要在dataSource中维护）",
        en: "",
      },
      thumbnail: {
        imgSrc: brickTreeNormalSvg,
      },
      bricks: [
        {
          brick: "presentational-bricks.brick-tree",
          properties: {
            dataSource: [
              {
                title: "0",
                key: "0",
                icon: { lib: "fa", icon: "briefcase" },
                children: [
                  {
                    title: "0-0",
                    key: "00",
                    icon: { lib: "fa", icon: "cube" },
                  },
                  {
                    title: "0-1",
                    key: "01",
                    icon: { lib: "fa", icon: "briefcase" },
                    children: [
                      {
                        title: "0-1-0",
                        key: "010",
                        icon: { lib: "fa", icon: "briefcase" },
                        children: [
                          {
                            title: "0-1-0-1",
                            key: "0101",
                            icon: { lib: "fa", icon: "cube" },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                title: "1",
                key: "1",
                icon: { lib: "fa", icon: "briefcase" },
                children: [
                  {
                    title: "1-0",
                    key: "10",
                    icon: { lib: "fa", icon: "cube" },
                  },
                ],
              },
            ],
            configProps: {
              checkable: true,
              showIcon: true,
            },
            searchable: true,
            placeholder: "text here to search",
            checkedKeys: ["00"],
            expandedKeys: ["0"],
            dataset: { testid: "basic-usage-demo" },
          },
          events: {
            "tree.select": {
              action: "console.info",
            },
            "tree.check": {
              action: "console.info",
            },
          },
        },
      ],
    },
    {
      brick: "presentational-bricks.brick-tree",
      properties: {
        dataSource: [
          {
            title: "0",
            key: "0",
            icon: { lib: "fa", icon: "briefcase" },
            children: [
              {
                title: "0-0",
                key: "00",
                icon: { lib: "fa", icon: "cube" },
              },
              {
                title: "0-1",
                key: "01",
                icon: { lib: "fa", icon: "briefcase" },
                children: [
                  {
                    title: "0-1-0",
                    key: "010",
                    icon: { lib: "fa", icon: "briefcase" },
                    children: [
                      {
                        title: "0-1-0-1",
                        key: "0101",
                        icon: { lib: "fa", icon: "cube" },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            title: "1",
            key: "1",
            icon: { lib: "fa", icon: "briefcase" },
            children: [
              {
                title: "1-0",
                key: "10",
                icon: { lib: "fa", icon: "cube" },
              },
            ],
          },
        ],
        configProps: {
          showIcon: true,
        },
        searchable: true,
        placeholder: "text here to search",
        checkedKeys: ["00"],
        expandedKeys: ["0"],
        suffixBrick: {
          useBrick: {
            brick: "span",
            properties: {
              style: {
                color: "#8c8c8c",
              },
              textContent: "1",
            },
          },
        },
      },
      events: {
        "tree.select": {
          action: "console.info",
        },
        "tree.check": {
          action: "console.info",
        },
      },
      description: {
        title: "树节点最右边使用构件",
      },
    },
    {
      snippetId: "presentational-bricks.brick-tree[filter]",
      title: {
        zh: "树过滤",
        en: "",
      },
      message: {
        zh: "在某些场景下我们只需要计数部分节点，如此处需要过滤掉属于分类的节点，可以设置checkedFilterConfig进行筛选",
        en: "",
      },
      bricks: [
        {
          brick: "presentational-bricks.brick-tree",
          events: {
            "tree.check": {
              action: "console.info",
              args: ["${EVENT.detail}"],
            },
          },
          properties: {
            checkAllEnabled: true,
            configProps: {
              checkable: true,
            },
            checkedFilterConfig: {
              field: "category",
              value: "item",
              operator: "$ne",
            },
            dataSource: [
              {
                children: [
                  {
                    key: "00",
                    title: "二级分类1",
                    category: "category",
                    children: [
                      {
                        key: "000",
                        title: "A",
                        category: "item",
                      },
                      {
                        key: "001",
                        title: "B",
                        category: "item",
                      },
                      {
                        key: "002",
                        title: "C",
                        category: "item",
                      },
                    ],
                  },
                  {
                    children: [
                      {
                        key: "010",
                        title: "D",
                        category: "item",
                      },
                      {
                        key: "011",
                        title: "E",
                        category: "item",
                      },
                    ],
                    key: "01",
                    title: "二级分类2",
                    category: "category",
                  },
                ],
                key: "0",
                title: "一级分类1",
                category: "category",
              },
              {
                children: [
                  {
                    key: "10",
                    title: "二级分类1",
                    category: "category",
                    children: [
                      {
                        key: "100",
                        title: "Q",
                        category: "item",
                      },
                      {
                        key: "101",
                        title: "W",
                        category: "item",
                      },
                      {
                        key: "102",
                        title: "R",
                        category: "item",
                      },
                    ],
                  },
                  {
                    children: [
                      {
                        key: "110",
                        title: "T",
                        category: "item",
                      },
                      {
                        key: "111",
                        title: "Y",
                        category: "item",
                      },
                    ],
                    key: "11",
                    title: "二级分类2",
                    category: "category",
                  },
                ],
                key: "1",
                title: "一级分类2",
                category: "category",
              },
              {
                children: [
                  {
                    key: "20",
                    title: "Z",
                    category: "item",
                  },
                  {
                    key: "21",
                    title: "X",
                    category: "item",
                  },
                  {
                    key: "22",
                    title: "V",
                    category: "item",
                  },
                ],
                key: "2",
                title: "其他",
                category: "category",
              },
            ],
            expandedKeys: ["0"],
            placeholder: "text here to search",
            searchable: true,
          },
        },
      ],
    },
  ],
};
