import React, { ReactNode, useContext, createContext } from "react";

import useTreeShuttle from "./useTreeShuttle";
type contextType = ReturnType<typeof useTreeShuttle>;
const TreeShuttleContext = createContext<contextType | undefined>(undefined);

interface TreeProviderProps {
  children: ReactNode;
  value: any;
}
function TreeProvider({ children, value }: TreeProviderProps) {
  return (
    <TreeShuttleContext.Provider value={value}>
      {children}
    </TreeShuttleContext.Provider>
  );
}

function useTreeContext() {
  return useContext(TreeShuttleContext);
}

export { TreeProvider, useTreeContext };
