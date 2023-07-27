import React from "react";
import { shallow } from "enzyme";
import { useCanPaste } from "./useCanPaste";
import { BuilderClipboard, BuilderClipboardType } from "../interfaces";
import * as editorBricksHelper from "@next-core/editor-bricks-helper";

// Given a tree:
//       1
//      ↙ ↘
//     2   3
//    ↙ ↘
//   4   5
//  ↙ ↘
// 6   7
const mockData: editorBricksHelper.BuilderCanvasData = {
  rootId: 1,
  nodes: [
    {
      $$uid: 1,
      type: "brick",
      brick: "my-brick",
      id: "B-001",
      instanceId: "instance-a",
    },
    {
      $$uid: 2,
      type: "brick",
      brick: "my-brick",
      id: "B-002",
      instanceId: "instance-b",
    },
    {
      $$uid: 3,
      type: "brick",
      brick: "my-brick",
      id: "B-003",
      instanceId: "instance-c",
    },
    {
      $$uid: 4,
      type: "brick",
      brick: "my-brick",
      id: "B-004",
      instanceId: "instance-d",
    },
    {
      $$uid: 5,
      type: "brick",
      brick: "my-brick",
      id: "B-005",
      instanceId: "instance-e",
    },
    {
      $$uid: 6,
      type: "brick",
      brick: "my-brick",
      id: "B-006",
      instanceId: "instance-f",
    },
    {
      $$uid: 7,
      type: "brick",
      brick: "my-brick",
      id: "B-007",
      instanceId: "instance-g",
    },
    {
      $$uid: 100,
      type: "routes",
      path: "/",
      id: "R-100",
      instanceId: "instance-z",
    },
    {
      $$uid: 101,
      type: "bricks",
      path: "/",
      id: "R-101",
      instanceId: "instance-y",
    },
  ],
  edges: [
    {
      parent: 1,
      child: 2,
      mountPoint: "x",
      sort: 0,
    },
    {
      parent: 1,
      child: 3,
      mountPoint: "x",
      sort: 0,
    },
    {
      parent: 2,
      child: 4,
      mountPoint: "x",
      sort: 0,
    },
    {
      parent: 2,
      child: 5,
      mountPoint: "x",
      sort: 0,
    },
    {
      parent: 4,
      child: 6,
      mountPoint: "x",
      sort: 0,
    },
    {
      parent: 4,
      child: 7,
      mountPoint: "x",
      sort: 0,
    },
  ],
};

jest.spyOn(editorBricksHelper, "useBuilderData").mockReturnValue(mockData);

function TestComponent({
  clipboard,
  targetNode,
}: {
  clipboard: BuilderClipboard;
  targetNode: editorBricksHelper.BuilderRuntimeNode;
}): React.ReactElement {
  const canPaste = useCanPaste();
  return <div>{String(canPaste(clipboard, targetNode))}</div>;
}

describe("useCanPaste", () => {
  it.each<[BuilderClipboard, editorBricksHelper.BuilderRuntimeNode, boolean]>([
    [
      null,
      {
        $$uid: 1,
        type: "brick",
        brick: "my-brick",
        id: "B-001",
        instanceId: "instance-a",
      },
      false,
    ],
    [
      {
        type: BuilderClipboardType.CUT,
        sourceInstanceId: "instance-a",
        nodeType: "brick",
      },
      null,
      false,
    ],
    [
      {
        type: BuilderClipboardType.CUT,
        sourceInstanceId: "instance-x",
        nodeType: "brick",
      },
      {
        $$uid: 1,
        type: "brick",
        brick: "my-brick",
        id: "B-001",
        instanceId: "instance-a",
      },
      true,
    ],
    [
      { type: BuilderClipboardType.COPY, sourceId: "B-009", nodeType: "brick" },
      {
        $$uid: 1,
        type: "brick",
        brick: "my-brick",
        id: "B-001",
        instanceId: "instance-a",
      },
      true,
    ],
  ])("should work", (clipboard, targetNode, canPaste) => {
    const wrapper = shallow(
      <TestComponent clipboard={clipboard} targetNode={targetNode} />
    );
    expect(wrapper.text()).toBe(String(canPaste));
  });

  it.each<[number, number, boolean]>([
    [4, 4, false],
    [4, 6, false],
    [4, 7, false],
    [4, 1, true],
    [4, 2, true],
    [4, 3, true],
    [4, 5, true],
    [2, 2, false],
    [2, 4, false],
    [2, 5, false],
    [2, 6, false],
    [2, 7, false],
    [2, 1, true],
    [2, 3, true],
    [2, 100, false],
    [2, 101, true],
    [100, 2, false],
    [100, 101, false],
    [101, 100, true],
  ])("should work", (sourceUid, targetUid, canDrop) => {
    const wrapper = shallow(
      <TestComponent
        clipboard={{
          type: BuilderClipboardType.COPY,
          sourceId: mockData.nodes.find((n) => n.$$uid === sourceUid).id,
          nodeType: "brick",
        }}
        targetNode={mockData.nodes.find((n) => n.$$uid === targetUid)}
      />
    );
    expect(wrapper.text()).toBe(String(canDrop));
  });

  it.each<[number, string, boolean]>([
    [100, "brick", false],
    [101, "brick", true],
    [100, "bricks", true],
    [101, "bricks", false],
    [100, undefined, true],
    [101, undefined, true],
  ])(
    "should work when sourceNode is not found",
    (targetUid, nodeType, canDrop) => {
      const wrapper = shallow(
        <TestComponent
          clipboard={{
            type: BuilderClipboardType.COPY,
            sourceId: "not-existed",
            nodeType,
          }}
          targetNode={mockData.nodes.find((n) => n.$$uid === targetUid)}
        />
      );
      expect(wrapper.text()).toBe(String(canDrop));
    }
  );
});
