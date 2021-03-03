import React from "react";
import { BuilderDataType, ToolboxTab } from "./interfaces";
import { BuilderRouteNode } from "@next-core/brick-types";

export interface ContextOfBuilderUI {
  dataType?: BuilderDataType;
  processing?: boolean;
  fullscreen?: boolean;
  setFullscreen?: React.Dispatch<React.SetStateAction<boolean>>;
  toolboxTab?: ToolboxTab;
  setToolboxTab?: React.Dispatch<React.SetStateAction<ToolboxTab>>;
  eventStreamNodeId?: string;
  setEventStreamNodeId?: React.Dispatch<React.SetStateAction<string>>;
  onRouteSelect?: (route: BuilderRouteNode) => void;
}

export const BuilderUIContext = React.createContext<ContextOfBuilderUI>({});

export function useBuilderUIContext(): ContextOfBuilderUI {
  return React.useContext(BuilderUIContext);
}
