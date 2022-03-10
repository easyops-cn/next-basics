import { createContext, type MouseEvent, useContext } from "react";
import type { WorkbenchNodeData } from "./interfaces";

export interface ContextOfWorkbenchTree {
  hoverKey?: string | number;
  mouseEnterFactory?(node: WorkbenchNodeData): () => void;
  mouseLeaveFactory?(node: WorkbenchNodeData): () => void;
  contextMenuFactory?(node: WorkbenchNodeData): (event: MouseEvent) => void;
}

export const WorkbenchTreeContext = createContext<ContextOfWorkbenchTree>({});

export function useWorkbenchTreeContext(): ContextOfWorkbenchTree {
  return useContext(WorkbenchTreeContext);
}
