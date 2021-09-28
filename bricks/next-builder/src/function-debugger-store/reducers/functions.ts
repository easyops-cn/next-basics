import { Reducer } from "react";
import { DebuggerAction, DebuggerStateOriginalFunction } from "./interfaces";

export const functions: Reducer<
  DebuggerStateOriginalFunction[],
  DebuggerAction
> = (state, action) => {
  switch (action.type) {
    case "initFunction":
      return action.functions;
    default:
      return state;
  }
};
