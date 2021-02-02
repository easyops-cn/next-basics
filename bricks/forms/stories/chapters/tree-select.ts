import { Story } from "@next-core/brick-types";

export const TreeSelectStory: Story = {
  storyId: "forms.tree-select",
  type: "brick",
  category: "form-input",
  author: "steve",
  text: {
    en: "Tree Select",
    zh: "树选择框",
  },
  description: {
    en: "Tree select brick",
    zh: "树型选择构件",
  },
  icon: {
    lib: "easyops",
    category: "default",
    icon: "tree",
  },
  conf: [
    {
      brick: "forms.tree-select",
      properties: {
        name: "node",
        label: "节点",
        value: "0-0-0",
        showSearch: true,
        placeholder: "请选择节点",
        searchPlaceholder: "请输入节点名",
        treeNodeFilterProp: "title",
        treeData: [
          {
            title: "Node1",
            value: "0-0",
            key: "0-0",
            children: [
              {
                title: "Child Node1",
                value: "0-0-0",
                key: "0-0-0",
              },
            ],
          },
          {
            title: "Node2",
            value: "0-1",
            key: "0-1",
            children: [
              {
                title: "Child Node2",
                value: "0-1-0",
                key: "0-1-0",
              },
              {
                title: "Child Node3",
                value: "0-1-1",
                key: "0-1-1",
              },
              {
                title: "Child Node4",
                value: "0-1-2",
                key: "0-1-2",
              },
            ],
          },
        ],
        inputBoxStyle: {
          width: "200px",
        },
      },
      events: {
        "treeSelect.change": {
          action: "console.log",
        },
      },
    },
    {
      brick: "forms.tree-select",
      properties: {
        name: "node",
        label: "节点",
        value: "0-0-0",
        showSearch: true,
        placeholder: "请选择节点",
        searchPlaceholder: "请输入节点名",
        treeDataSimpleMode: true,
        treeNodeFilterProp: "title",
        treeData: [
          {
            title: "Node1",
            id: "0-0",
            value: "0-0",
            key: "0-0",
          },
          {
            title: "Child Node1",
            id: "0-0-0",
            pId: "0-0",
            value: "0-0-0",
            key: "0-0-0",
          },
          {
            title: "Node2",
            id: "0-1",
            value: "0-1",
            key: "0-1",
          },
          {
            title: "Child Node2",
            id: "0-1-0",
            pId: "0-1",
            value: "0-1-0",
            key: "0-1-0",
          },
          {
            title: "Child Node3",
            id: "0-1-1",
            pId: "0-1",
            value: "0-1-1",
            key: "0-1-1",
          },
          {
            title: "Child Node4",
            id: "0-1-2",
            pId: "0-1",
            value: "0-1-2",
            key: "0-1-2",
          },
        ],
        inputBoxStyle: {
          width: "200px",
        },
      },
      events: {
        "treeSelect.change": {
          action: "console.log",
        },
      },
    },
    {
      brick: "forms.general-form",
      properties: {
        values: {
          node: ["0-0-0", "0-1-0"],
        },
      },
      events: {
        "validate.success": {
          action: "console.log",
        },
        "validate.error": {
          action: "console.warn",
        },
      },
      slots: {
        items: {
          type: "bricks",
          bricks: [
            {
              brick: "forms.tree-select",
              properties: {
                name: "node",
                label: "节点",
                required: true,
                treeCheckable: true,
                showSearch: true,
                allowClear: true,
                placeholder: "请选择节点",
                treeNodeFilterProp: "title",
                treeData: [
                  {
                    title: "Node1",
                    value: "0-0",
                    key: "0-0",
                    children: [
                      {
                        title: "Child Node1",
                        value: "0-0-0",
                        key: "0-0-0",
                      },
                    ],
                  },
                  {
                    title: "Node2",
                    value: "0-1",
                    key: "0-1",
                    children: [
                      {
                        title: "Child Node2",
                        value: "0-1-0",
                        key: "0-1-0",
                      },
                      {
                        title: "Child Node3",
                        value: "0-1-1",
                        key: "0-1-1",
                      },
                      {
                        title: "Child Node4",
                        value: "0-1-2",
                        key: "0-1-2",
                      },
                    ],
                  },
                ],
                inputBoxStyle: {
                  width: "100%",
                },
              },
              events: {
                "treeSelect.change": {
                  action: "console.log",
                },
              },
            },
            {
              brick: "forms.general-buttons",
              properties: {
                submitText: "确定",
              },
            },
          ],
        },
      },
    },
  ],
};
