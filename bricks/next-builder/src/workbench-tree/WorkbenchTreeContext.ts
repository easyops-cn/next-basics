import { createContext, useContext } from "react";

export interface ContextOfWorkbenchTree {
  hoverKey?: string | number;
  mouseEnterFactory?(key: string | number): void;
  mouseLeaveFactory?(key: string | number): void;
}

export const WorkbenchTreeContext = createContext<ContextOfWorkbenchTree>({});

export function useWorkbenchTreeContext(): ContextOfWorkbenchTree {
  return useContext(WorkbenchTreeContext);
}
