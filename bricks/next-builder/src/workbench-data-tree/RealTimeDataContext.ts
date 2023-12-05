import { RealTimeDataAnnotation } from "@next-types/preview";
import { createContext } from "react";
import type { WorkbenchNodeData } from "../shared/workbench/interfaces";

export interface RealTimeDataContextValue {
  realTimeDataValues?: Record<string, RealTimeDataAnnotation>;
  onClick?: (node: WorkbenchNodeData) => void;
}

export const RealTimeDataContext = createContext<RealTimeDataContextValue>({});
