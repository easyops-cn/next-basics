import React from "react";
import { BuilderClipboard, BuilderDataType, ToolboxTab } from "./interfaces";
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
  clipboard?: BuilderClipboard;
  setClipboard?: React.Dispatch<React.SetStateAction<BuilderClipboard>>;
  onRouteSelect?: (route: BuilderRouteNode) => void;
  onCurrentRouteClick?: (route: BuilderRouteNode) => void;
  onBuildAndPush?: () => void;
  onPreview?: () => void;
}

export const BuilderUIContext = React.createContext<ContextOfBuilderUI>({});

export function useBuilderUIContext(): ContextOfBuilderUI {
  return React.useContext(BuilderUIContext);
}
