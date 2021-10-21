import { Reducer } from "react";
import { DebuggerAction, DebuggerStateActiveTab } from "./interfaces";

export const activeTab: Reducer<DebuggerStateActiveTab, DebuggerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "initFunction":
      return {
        value: "function",
        group: "function",
      };
    case "switchTab": {
      const [group, index] = action.tab.split(":");
      return {
        value: action.tab,
        group,
        index: index && Number(index),
      };
    }
    case "saveDebugAsTest":
    case "addTest":
      return {
        value: `test:${action.nextTestIndex}`,
        group: "test",
        index: action.nextTestIndex,
      };
    case "deleteTest":
      return {
        value: "function",
        group: "function",
      };
    default:
      return state;
  }
};
