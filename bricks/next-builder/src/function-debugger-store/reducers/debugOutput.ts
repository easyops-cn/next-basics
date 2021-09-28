import { Reducer } from "react";
import { DebuggerAction, DebuggerStateDebugOutput } from "./interfaces";

export const debugOutput: Reducer<DebuggerStateDebugOutput, DebuggerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "initFunction":
    case "updateDebugInput":
    case "updateSource":
    case "updateTypescript":
      return null;
    case "debugReturn":
      return action.output;
    default:
      return state;
  }
};
