import { BuilderCanvasData } from "@next-core/editor-bricks-helper";
import { getGraphTreeByBuilderData } from "./getGraphTreeByBuilderData";

describe("getGraphTreeByBuilderData", () => {
  it("should work", () => {
    const nodeData = {
      rootId: 1,
      nodes: [
        {
          id: "B-001",
          type: "bricks",
          instanceId: "route-a",
          path: "/home",
          $$uid: 1,
          $$matchedSelectors: [],
          $$normalized: {
            type: "bricks",
            path: "/home",
          },
          $$parsedProperties: {},
          $$parsedEvents: {},
          $$parsedLifeCycle: {},
        },
        {
          id: "B-002",
          brick: "tpl-page-base-page-module-1",
          type: "brick",
          instanceId: "abc",
          alias: "tpl-page-base-page-module-1",
          $$uid: 2,
          $$matchedSelectors: ["tpl-page-base-page-module-1"],
          $$normalized: {
            brick: "tpl-page-base-page-module-1",
            iid: "abc",
          },
          $$parsedProperties: {},
          $$parsedEvents: {},
          $$parsedLifeCycle: {},
          layoutType: "wrapper",
          $$isExpandableTemplate: true,
          $$templateRefToUid: {},
        },
        {
          id: "B-007",
          brick: "basic-bricks.easy-view",
          type: "brick",
          alias: "easy-view",
          $$uid: 3,
          $$matchedSelectors: ["basic-bricks\\.easy-view"],
          $$isTemplateInternalNode: true,
          $$normalized: {
            brick: "basic-bricks.easy-view",
          },
          $$parsedProperties: {},
          $$parsedEvents: {},
          $$parsedLifeCycle: {},
        },
        {
          id: "B-008",
          brick: "basic-bricks.general-button",
          type: "brick",
          alias: "general-button",
          $$uid: 4,
          $$matchedSelectors: ["basic-bricks\\.general-button"],
          $$isTemplateInternalNode: true,
          $$normalized: {
            brick: "basic-bricks.general-button",
          },
          $$parsedProperties: {},
          $$parsedEvents: {},
          $$parsedLifeCycle: {},
        },
        {
          id: "B-003",
          type: "brick",
          brick: "basic-bricks.micro-view",
          sort: 0,
          instanceId: "brick-b",
          alias: "micro-view",
          $$uid: 5,
          $$matchedSelectors: ["basic-bricks\\.micro-view"],
          $$normalized: {
            brick: "basic-bricks.micro-view",
            iid: "brick-b",
          },
          $$parsedProperties: {},
          $$parsedEvents: {},
          $$parsedLifeCycle: {},
        },
        {
          id: "B-004",
          type: "brick",
          brick: "basic-bricks.general-button",
          sort: 0,
          alias: "general-button",
          $$uid: 6,
          $$matchedSelectors: ["basic-bricks\\.general-button"],
          $$normalized: {
            brick: "basic-bricks.general-button",
          },
          $$parsedProperties: {},
          $$parsedEvents: {},
          $$parsedLifeCycle: {},
        },
        {
          id: "B-005",
          type: "brick",
          brick: "basic-bricks.general-button",
          sort: 1,
          alias: "general-button",
          $$uid: 7,
          $$matchedSelectors: ["basic-bricks\\.general-button"],
          $$normalized: {
            brick: "basic-bricks.general-button",
          },
          $$parsedProperties: {},
          $$parsedEvents: {},
          $$parsedLifeCycle: {},
        },
      ],
      edges: [
        {
          child: 4,
          parent: 3,
          mountPoint: "top",
          sort: 0,
          $$isTemplateInternal: true,
        },
        {
          child: 3,
          parent: 2,
          mountPoint: "",
          sort: 0,
          $$isTemplateInternal: true,
        },
        {
          child: 6,
          parent: 5,
          mountPoint: "toolbar",
          sort: 0,
        },
        {
          child: 5,
          parent: 2,
          mountPoint: "content",
          sort: 0,
          $$isTemplateDelegated: true,
        },
        {
          child: 7,
          parent: 2,
          mountPoint: "content",
          sort: 1,
          $$isTemplateDelegated: true,
        },
        {
          child: 2,
          parent: 1,
          mountPoint: "bricks",
          sort: 0,
        },
      ],
    } as BuilderCanvasData;

    const result = getGraphTreeByBuilderData(nodeData);

    expect(result).toMatchInlineSnapshot(`
      Object {
        "children": Array [
          Object {
            "alias": "tpl-page-base-page-module-1",
            "brick": "tpl-page-base-page-module-1",
            "children": Array [
              Object {
                "alias": "easy-view",
                "brick": "basic-bricks.easy-view",
                "children": Array [
                  Object {
                    "alias": "general-button",
                    "brick": "basic-bricks.general-button",
                    "children": Array [],
                    "id": "B-008",
                    "mountPoint": "top",
                    "type": "brick",
                  },
                ],
                "id": "B-007",
                "mountPoint": "",
                "type": "brick",
              },
              Object {
                "alias": "micro-view",
                "brick": "basic-bricks.micro-view",
                "children": Array [
                  Object {
                    "alias": "general-button",
                    "brick": "basic-bricks.general-button",
                    "children": Array [],
                    "id": "B-004",
                    "mountPoint": "toolbar",
                    "sort": 0,
                    "type": "brick",
                  },
                ],
                "id": "B-003",
                "instanceId": "brick-b",
                "mountPoint": "content",
                "sort": 0,
                "type": "brick",
              },
              Object {
                "alias": "general-button",
                "brick": "basic-bricks.general-button",
                "children": Array [],
                "id": "B-005",
                "mountPoint": "content",
                "sort": 1,
                "type": "brick",
              },
            ],
            "id": "B-002",
            "instanceId": "abc",
            "layoutType": "wrapper",
            "mountPoint": "bricks",
            "type": "brick",
          },
        ],
        "id": "B-001",
        "instanceId": "route-a",
        "path": "/home",
        "type": "bricks",
      }
    `);
  });
});
