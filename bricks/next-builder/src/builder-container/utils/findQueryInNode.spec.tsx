import { findQueryInNode } from "./findQueryInNode";
import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";

describe("findQueryInNode", () => {
  it.each<[string, BuilderRuntimeNode, string, boolean]>([
    [
      "should find brick",
      {
        $$uid: 1,
        type: "brick",
        brick: "my-brick",
        id: "B-001",
        instanceId: "instance-a",
      },
      "my-brick",
      true,
    ],
    [
      "should find properties",
      {
        $$uid: 1,
        type: "brick",
        brick: "my-brick",
        properties: '{↵  "buttonName": 123↵}',
        id: "B-001",
        instanceId: "instance-a",
      },
      "button",
      true,
    ],
    [
      "should find context",
      {
        $$uid: 1,
        type: "brick",
        brick: "my-brick",
        context: [
          {
            name: "data-1",
          },
        ],
        id: "B-001",
        instanceId: "instance-a",
      },
      "data-1",
      true,
    ],
    [
      "should not find null",
      {
        $$uid: 1,
        type: "brick",
        brick: "my-brick",
        context: null,
        id: "B-001",
        instanceId: "instance-a",
      },
      "null",
      false,
    ],
    [
      "letter case should be ignored",
      {
        $$uid: 1,
        type: "brick",
        brick: "MY-brick",
        id: "B-001",
        instanceId: "instance-a",
      },
      "my",
      true,
    ],
  ])("searchList(%j) should work", async (condition, node, query, found) => {
    expect(findQueryInNode(node, query)).toEqual(found);
  });
});
