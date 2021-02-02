import { Story } from "../../../interfaces";
import doc from "../../../docs/cmdb-instances/relation-path-tree.md";

export const story: Story = {
  storyId: "cmdb-instances.relation-path-tree",
  type: "brick",
  author: "ice",
  text: {
    en: "Relation Path Tree",
    zh: "关系路径实例树"
  },
  description: {
    en: "instance tree based on relation path",
    zh: "基于关系路径的实例树"
  },
  icon: {
    lib: "fa",
    icon: "tree"
  },
  conf: [
    {
      brick: "cmdb-instances.relation-path-tree",
      events: {
        "cmdb-instances.relation-path-tree.click": {
          action: "console.log"
        },
        "cmdb-instances.relation-path-tree.check": {
          action: "console.log"
        }
      },
      properties: {
        style: {
          maxHeight: "500px",
          overflowY: "auto"
        },
        treeRequest: {
          tree: {
            object_id: "BUSINESS",
            query: {},
            child: [
              {
                relation_field_id: "_sub_system",
                child: [
                  {
                    relation_field_id: "_businesses_APP",
                    child: [
                      {
                        relation_field_id: "clusters",
                        child: [
                          {
                            relation_field_id: "deviceList"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      }
    }
  ],
  previewColumns: 2,
  doc
};
