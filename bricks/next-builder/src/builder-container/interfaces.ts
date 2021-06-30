import {
  BrickConf,
  BuilderRouteOrBrickNode,
  MenuIcon,
} from "@next-core/brick-types";
import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";

export interface BrickOptionItem {
  type: "brick" | "template" | "customTemplate" | "provider" | "snippet";
  id: string;
  title: string;
  category?: string;
  description?: string;
  icon?: MenuIcon;
  thumbnail?: string;
  bricks?: BrickConf[];
  layerType?: LayerType;
  nodeId?: string;
  isHostedSnippet?: boolean;
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
  nodeType: Pick<BuilderRouteOrBrickNode, "type">;
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
  DATA_VIEW = "data-view",
}

export enum BuilderDataType {
  ROUTE_OF_BRICKS = "route-of-bricks",
  ROUTE_OF_ROUTES = "route-of-routes",
  ROUTE_OF_REDIRECT = "route-of-redirect",
  CUSTOM_TEMPLATE = "custom-template",
  SNIPPET = "snippet",
  UNKNOWN = "unknown",
}

export type BuilderClipboard = BuilderClipboardOfCopy | BuilderClipboardOfCut;

export interface BuilderClipboardOfCopy {
  type: BuilderClipboardType.COPY;
  sourceId: string;
}

export interface BuilderClipboardOfCut {
  type: BuilderClipboardType.CUT;
  sourceInstanceId: string;
}

export enum BuilderClipboardType {
  CUT = "cut",
  COPY = "copy",
}

export interface BuilderPasteDetailOfCopy {
  sourceId: string;
  targetId: string;
}

export interface BuilderPasteDetailOfCut {
  sourceInstanceId: string;
  targetInstanceId: string;
}

export interface BuilderAppendBrickOrRouteDetail {
  node: BuilderRuntimeNode;
  defaultSort?: number;
}

export interface LibraryMenuItem {
  key?: string;
  type?: "group" | "default";
  title?: string;
  children?: {
    key: string;
    text: string;
  }[];
}

export type InstalledBrickType = "atom-brick" | "snippet" | "custom-template";

export type LazyDataStatus = "ok" | "loading" | "failed";

export interface StateOfLazyData<T = unknown> {
  status?: LazyDataStatus;
  error?: unknown;
  data?: T;
}

export enum LayerType {
  LAYOUT = "layout",
  WIDGET = "widget",
  BRICK = "brick",
}
