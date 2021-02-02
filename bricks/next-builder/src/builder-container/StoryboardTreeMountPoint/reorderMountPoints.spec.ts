import { BuilderGroupedChildNode } from "@next-core/editor-bricks-helper";
import { reorderMountPoints } from "./reorderMountPoints";

describe("reorderMountPoints", () => {
  const siblingGroups = ([
    {
      mountPoint: "toolbar",
      childNodes: [
        { $$uid: 1, id: "a" },
        { $$uid: 2, id: "b" },
      ],
    },
    {
      mountPoint: "titleBar",
      childNodes: [
        { $$uid: 3, id: "c" },
        { $$uid: 4, id: "d" },
      ],
    },
    {
      mountPoint: "content",
      childNodes: [
        { $$uid: 5, id: "e" },
        { $$uid: 6, id: "f" },
      ],
    },
  ] as Partial<BuilderGroupedChildNode[]>) as BuilderGroupedChildNode[];

  it.each<
    [
      draggingMountPoint: string,
      droppingMountPoint: string,
      nodeUids: number[],
      nodeIds: string[]
    ]
  >([
    ["toolbar", "titleBar", [3, 4, 1, 2, 5, 6], ["c", "d", "a", "b", "e", "f"]],
    ["toolbar", "content", [3, 4, 5, 6, 1, 2], ["c", "d", "e", "f", "a", "b"]],
    ["titleBar", "toolbar", [3, 4, 1, 2, 5, 6], ["c", "d", "a", "b", "e", "f"]],
    ["titleBar", "content", [1, 2, 5, 6, 3, 4], ["a", "b", "e", "f", "c", "d"]],
    ["content", "titleBar", [1, 2, 5, 6, 3, 4], ["a", "b", "e", "f", "c", "d"]],
    ["content", "toolbar", [5, 6, 1, 2, 3, 4], ["e", "f", "a", "b", "c", "d"]],
  ])(
    "should reorder mount points when drag '%s' and drop on '%s'",
    (draggingMountPoint, droppingMountPoint, nodeUids, nodeIds) => {
      expect(
        reorderMountPoints({
          draggingMountPoint,
          droppingMountPoint,
          siblingGroups,
        })
      ).toEqual({ nodeUids, nodeIds });
    }
  );
});
