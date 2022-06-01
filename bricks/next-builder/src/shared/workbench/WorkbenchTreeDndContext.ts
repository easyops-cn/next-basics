import { createContext, useContext } from "react";

export enum dragStatusEnum {
  inside = "inside",
  top = "top",
  bottom = "bottom",
}

interface WorkbenchTreeDndContext {
  allow?: boolean;
  dragNode: HTMLElement;
  dragStatus: dragStatusEnum;
  dragOverNode: HTMLElement;
  onDragStart: (e: React.DragEvent<HTMLElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLElement>) => void;
}

export const WorkbenchTreeDndContext = createContext<WorkbenchTreeDndContext>(
  {} as WorkbenchTreeDndContext
);

export function useWorkbenchTreeDndContext(): WorkbenchTreeDndContext {
  return useContext(WorkbenchTreeDndContext);
}
