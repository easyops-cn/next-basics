import { pick } from "lodash";
import { Reducer } from "react";
import { DebuggerAction, DebuggerStateModifiedFunction } from "./interfaces";

export const modifiedFunction: Reducer<
  DebuggerStateModifiedFunction,
  DebuggerAction
> = (state, action) => {
  switch (action.type) {
    case "initFunction":
      return pick(action.originalFunction, ["source", "typescript"]);
    case "updateSource":
      return {
        ...state,
        source: action.source,
        modified: true,
      };
    case "updateTypescript":
      return {
        ...state,
        typescript: action.typescript,
        modified: true,
      };
    default:
      return state;
  }
};
