import {
  SnippetRuntimeContext,
  WorkbenchBackendActionForInsertDetail,
} from "@next-types/preview";
import { snippetEvaluate } from "@next-core/brick-utils";

export function processWithParamsSnippet(
  snippetNode: WorkbenchBackendActionForInsertDetail["nodeData"],
  snippetContext: SnippetRuntimeContext
): WorkbenchBackendActionForInsertDetail["nodeData"] {
  const { params, ...snippetNodeData } = snippetNode;
  const { inputParams = {} } = snippetContext;

  const mergeParams = Object.fromEntries(
    Object.entries(params || {}).map(([key, data]) => [
      key,
      inputParams[key] === undefined ? data.defaultValue : inputParams[key],
    ])
  );

  const result = snippetEvaluate(snippetNodeData, {
    ...snippetContext,
    declareParams: params,
    inputParams: mergeParams,
  });

  return result;
}
