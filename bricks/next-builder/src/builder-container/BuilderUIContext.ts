import React from "react";
import { ToolboxTab } from "./interfaces";

export interface ContextOfBuilderUI {
  processing?: boolean;
  fullscreen?: boolean;
  setFullscreen?: React.Dispatch<React.SetStateAction<boolean>>;
  toolboxTab?: ToolboxTab;
  setToolboxTab?: React.Dispatch<React.SetStateAction<ToolboxTab>>;
  eventStreamActiveNodeUid?: number;
  setEventStreamActiveNodeUid?: React.Dispatch<React.SetStateAction<number>>;
}

export const BuilderUIContext = React.createContext<ContextOfBuilderUI>({});

export function useBuilderUIContext(): ContextOfBuilderUI {
  return React.useContext(BuilderUIContext);
}
