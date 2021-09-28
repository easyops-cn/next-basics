import { Reducer } from "react";
import { DebuggerAction, DebuggerStateOriginalFunction } from "./interfaces";

export const originalFunction: Reducer<
  DebuggerStateOriginalFunction,
  DebuggerAction
> = (state, action) => {
  switch (action.type) {
    case "initFunction":
      return action.originalFunction;
    default:
      return state;
  }
};
