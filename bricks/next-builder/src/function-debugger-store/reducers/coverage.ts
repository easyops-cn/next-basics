import { Reducer } from "react";
import { DebuggerAction } from "./interfaces";
import { getCoverageDetail } from "../../shared/functions/getCoverageDetail";
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
      return getCoverageDetail(action.coverage);
    default:
      return state;
  }
};
