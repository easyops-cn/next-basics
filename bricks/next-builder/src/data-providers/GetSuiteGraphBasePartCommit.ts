import { createProviderClass } from "@next-core/brick-utils";
import { processGraphDataWithDiff } from "./utils/processDataWithDiff";
import { pipes } from "@next-core/brick-utils";
import { GitApi_CodeDiffResponseBody_diffs_item } from "@next-sdk/next-builder-sdk";

export interface GetSuiteGraphBasePartCommitParams {
  graphData: pipes.GraphData;
  diffs: GitApi_CodeDiffResponseBody_diffs_item;
  selectedDiffs?: string[];
}

export async function GetSuiteGraphBasePartCommit({
  graphData,
  diffs,
  selectedDiffs = [],
}: GetSuiteGraphBasePartCommitParams): Promise<pipes.GraphData> {
  const selectedDiffSet = new Set(selectedDiffs);

  return processGraphDataWithDiff(graphData, diffs, selectedDiffSet);
}

customElements.define(
  "next-builder.provider-get-suite-graph-base-part-commit",
  createProviderClass(GetSuiteGraphBasePartCommit)
);
