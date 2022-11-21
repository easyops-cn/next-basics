import React from "react";

interface ContextOfVariable {
  ellipsis?: boolean;
}

export const VariableContext = React.createContext<ContextOfVariable>({});
