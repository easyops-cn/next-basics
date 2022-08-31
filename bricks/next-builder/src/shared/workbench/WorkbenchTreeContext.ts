import { createContext, type MouseEvent, useContext } from "react";
import type { WorkbenchNodeData } from "./interfaces";
import { dragStatusEnum } from "./WorkbenchTreeDndContext";

export interface dropOptions {
  curElement: HTMLElement;
  overElement: HTMLElement;
  parentElement: HTMLElement;
  overStatus: dragStatusEnum;
}

export interface ContextOfWorkbenchTree {
  hoverKey?: string | number;
  activeKey?: string | number;
  basePaddingLeft?: number;
  showMatchedNodeOnly?: boolean;
  isTransformName?: boolean;
  fixedActionsFor?: Record<string, unknown> | Record<string, unknown>[];
  collapsible?: boolean;
  collapsedNodes?: (string | number)[];
  nodeKey?: string;
  clickFactory?(node: WorkbenchNodeData): (event: MouseEvent) => void;
  mouseEnterFactory?(node: WorkbenchNodeData): () => void;
  mouseLeaveFactory?(node: WorkbenchNodeData): () => void;
  contextMenuFactory?(node?: WorkbenchNodeData): (event: MouseEvent) => void;
  matchNode?(node: WorkbenchNodeData, lowerTrimmedQuery?: string): boolean;
  onNodeToggle?(nodeId: string | number, collapsed: boolean): void;
  getCollapsedId?(node: WorkbenchNodeData): string | number;
  onBrickDrop?(e: React.DragEvent<HTMLElement>, options: dropOptions): void;
  skipNotify?: boolean;
}

export const WorkbenchTreeContext = createContext<ContextOfWorkbenchTree>({});

export function useWorkbenchTreeContext(): ContextOfWorkbenchTree {
  return useContext(WorkbenchTreeContext);
}
