import React from "react";
import { shallow } from "enzyme";
import { useCanPaste } from "./useCanPaste";
import { BuilderClipboard, BuilderClipboardType } from "../interfaces";
import {
  BuilderCanvasData,
  BuilderRuntimeNode,
  useBuilderData,
} from "@next-core/editor-bricks-helper";

jest.mock("@next-core/editor-bricks-helper", () => ({
  useBuilderData: jest.fn(),
}));

// Given a tree:
//       1
//      ↙ ↘
//     2   3
//    ↙ ↘
//   4   5
//  ↙ ↘
// 6   7
const mockData: BuilderCanvasData = {
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

(useBuilderData as jest.MockedFunction<typeof useBuilderData>).mockReturnValue(
  mockData
);

function TestComponent({
  clipboard,
  targetNode,
}: {
  clipboard: BuilderClipboard;
  targetNode: BuilderRuntimeNode;
}): React.ReactElement {
  const canPaste = useCanPaste();
  return <div>{String(canPaste(clipboard, targetNode))}</div>;
}

describe("useCanPaste", () => {
  it.each<[BuilderClipboard, BuilderRuntimeNode, boolean]>([
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
      { type: BuilderClipboardType.CUT, sourceInstanceId: "instance-a" },
      null,
      false,
    ],
    [
      { type: BuilderClipboardType.CUT, sourceInstanceId: "instance-x" },
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
      { type: BuilderClipboardType.COPY, sourceId: "B-009" },
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
  ])("should work", (sourceUid, targetUid, canDrop) => {
    const wrapper = shallow(
      <TestComponent
        clipboard={{
          type: BuilderClipboardType.COPY,
          sourceId: mockData.nodes.find((n) => n.$$uid === sourceUid).id,
        }}
        targetNode={mockData.nodes.find((n) => n.$$uid === targetUid)}
      />
    );
    expect(wrapper.text()).toBe(String(canDrop));
  });
});
