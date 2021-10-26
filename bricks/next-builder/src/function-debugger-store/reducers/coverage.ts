import { Reducer } from "react";
import { DebuggerAction } from "./interfaces";
import { getProcessedCoverage } from "../../shared/functions/getProcessedCoverage";
import { ProcessedCoverage } from "../../shared/functions/interfaces";

export const coverage: Reducer<ProcessedCoverage, DebuggerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "initFunction":
    case "updateSource":
    case "updateTypescript":
    case "addTest":
    case "deleteTest":
      return;
    case "updateCoverage":
      return getProcessedCoverage(action.coverage);
    default:
      return state;
  }
};
