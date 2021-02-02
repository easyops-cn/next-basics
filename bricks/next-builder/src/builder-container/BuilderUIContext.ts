import React from "react";

export interface ContextOfBuilderUI {
  processing?: boolean;
  fullscreen?: boolean;
  setFullscreen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BuilderUIContext = React.createContext<ContextOfBuilderUI>({});

export function useBuilderUIContext(): ContextOfBuilderUI {
  return React.useContext(BuilderUIContext);
}
