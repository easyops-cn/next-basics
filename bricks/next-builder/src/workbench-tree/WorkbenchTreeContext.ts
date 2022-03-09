import { createContext, useContext } from "react";
import type { WorkbenchNodeData } from "./WorkbenchTree";

export interface ContextOfWorkbenchTree {
  hoverKey?: string | number;
  mouseEnterFactory?(node: WorkbenchNodeData): void;
  mouseLeaveFactory?(node: WorkbenchNodeData): void;
}

export const WorkbenchTreeContext = createContext<ContextOfWorkbenchTree>({});

export function useWorkbenchTreeContext(): ContextOfWorkbenchTree {
  return useContext(WorkbenchTreeContext);
}
