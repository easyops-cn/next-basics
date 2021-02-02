import { Chapter } from "../../../interfaces";
import { story as toolExecutionResultsTableTemplate } from "./tool-execution-results-table-template";
import { story as executionResultTrendChartTemplate } from "./execution-result-trend-chart-template";
import { story as toolExecutionFormTemplate } from "./tool-execution-form-template";
import { story as flowExecutionFormTemplate } from "./flow-execution-form-template";
import { story as jobExecutionFormTemplate } from "./job-execution-form-template";
import { story as toolOutputTemplate } from "./tool-output";
import { story as baseManualExecution } from "./base-manual-execution";

export const chapter: Chapter = {
  category: "tool-and-flow",
  title: {
    en: "Tool And Flow",
    zh: "工具流程",
  },
  stories: [
    executionResultTrendChartTemplate,
    toolExecutionResultsTableTemplate,
    toolExecutionFormTemplate,
    flowExecutionFormTemplate,
    jobExecutionFormTemplate,
    toolOutputTemplate,
    baseManualExecution,
  ],
};
