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
    default:
      return state;
  }
};
