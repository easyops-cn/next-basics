import {
  BuilderGroupedChildNode,
  BuilderRuntimeNode,
} from "@next-core/editor-bricks-helper";
import { StoryboardTreeTransferType } from "../interfaces";
import { handleDropOnNode } from "./handleDropOnNode";

describe("handleDropOnNode", () => {
  const droppingSiblingGroups: BuilderGroupedChildNode[] = [
    {
      mountPoint: "toolbar",
      childNodes: [
        {
          $$uid: 1,
          id: "B-001",
          type: "brick",
          brick: "general-button",
        },
        {
          $$uid: 2,
          id: "B-002",
          type: "brick",
          brick: "general-select",
        },
      ],
    },
    {
      mountPoint: "content",
      childNodes: [
        {
          $$uid: 3,
          id: "B-003",
          type: "brick",
          brick: "general-card",
        },
        {
          $$uid: 4,
          id: "B-004",
          type: "brick",
          brick: "brick-table",
        },
        {
          $$uid: 5,
          id: "B-005",
          type: "brick",
          brick: "grid-layout",
        },
      ],
    },
  ];

  const manager = {
    nodeMove: jest.fn(),
    nodeReorder: jest.fn(),
  } as any;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should move a node inside a mount point", () => {
    handleDropOnNode({
      draggingItem: {
        type: StoryboardTreeTransferType.NODE,
        nodeUid: 4,
        nodeId: "B-004",
        nodeInstanceId: "instance-b",
      },
      droppingIndex: 0,
      droppingParentNode: ({
        $$uid: 100,
        instanceId: "instance-a",
      } as Partial<BuilderRuntimeNode>) as BuilderRuntimeNode,
      droppingMountPoint: "content",
      droppingSiblingGroups,
      manager,
    });
    expect(manager.nodeReorder).toBeCalledWith({
      parentUid: 100,
      nodeUids: [1, 2, 4, 3, 5],
      nodeIds: ["B-001", "B-002", "B-004", "B-003", "B-005"],
    });
  });

  it("should do nothing if order is not changed", () => {
    handleDropOnNode({
      draggingItem: {
        type: StoryboardTreeTransferType.NODE,
        nodeUid: 4,
        nodeId: "B-004",
        nodeInstanceId: "instance-b",
      },
      droppingIndex: 1,
      droppingParentNode: ({
        $$uid: 100,
        instanceId: "instance-a",
      } as Partial<BuilderRuntimeNode>) as BuilderRuntimeNode,
      droppingMountPoint: "content",
      droppingSiblingGroups,
      manager,
    });
    expect(manager.nodeMove).not.toBeCalled();
    expect(manager.nodeReorder).not.toBeCalled();
  });

  it("should move a node across mount points", () => {
    handleDropOnNode({
      draggingItem: {
        type: StoryboardTreeTransferType.NODE,
        nodeUid: 4,
        nodeId: "B-004",
        nodeInstanceId: "instance-b",
      },
      droppingIndex: 1,
      droppingParentNode: ({
        $$uid: 100,
        instanceId: "instance-a",
      } as Partial<BuilderRuntimeNode>) as BuilderRuntimeNode,
      droppingMountPoint: "toolbar",
      droppingSiblingGroups,
      manager,
    });
    expect(manager.nodeMove).toBeCalledWith({
      nodeUid: 4,
      parentUid: 100,
      nodeInstanceId: "instance-b",
      nodeUids: [1, 4, 2, 3, 5],
      nodeIds: ["B-001", "B-004", "B-002", "B-003", "B-005"],
      nodeData: {
        parent: "instance-a",
        mountPoint: "toolbar",
      },
    });
  });
});
