export interface BrickOptionItem {
  type: "brick" | "template" | "customTemplate" | "provider";
  name: string;
  scopeName?: string;
  shortName?: string;
}

export interface GroupedBricks {
  scope: string;
  bricks: BrickOptionItem[];
}

export enum StoryboardTreeTransferType {
  MOUNT_POINT = "storyboard-tree/mount-point",
  NODE = "storyboard-tree/node",
}

export interface DraggingNodeItem {
  type: string;
  nodeUid: number;
  nodeId: string;
  nodeInstanceId: string;
}

export interface DraggingMountPointItem {
  type: string;
  nodeUid: number;
  mountPoint: string;
}

export enum ToolboxTab {
  LIBRARY = "library",
  TREE_VIEW = "tree-view",
  EVENTS_VIEW = "events-view",
}
