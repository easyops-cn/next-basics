import { Reducer } from "react";
import { processSerializableValue } from "../../shared/functions/processSerializableValue";
import { DebuggerAction, DebuggerStateDebugInput } from "./interfaces";

export const debugInput: Reducer<DebuggerStateDebugInput, DebuggerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "initFunction":
      return state?.functionName === action.originalFunction.name
        ? {
            ...state,
            userInput: false,
          }
        : {
            functionName: action.originalFunction.name,
            raw: "[\n  \n]",
            ok: true,
          };
    case "updateDebugInput": {
      return {
        ...state,
        ...processSerializableValue(action.input),
        userInput: true,
      };
    }
    default:
      return state;
  }
};
