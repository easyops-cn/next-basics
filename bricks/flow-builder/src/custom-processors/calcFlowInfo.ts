import { getRuntime } from "@next-core/brick-kit";
import { isEmpty, isNil, omit } from "lodash";

interface FieldsMappingFrontend {
  name: string;
  value: string;
  source?: string;
  fields?: FieldsMappingFrontend[];
}

interface Action {
  type?: string;
  function?: {
    contractName: string;
    contractVersion: string;
  };
  fieldsMapping?: Record<string, unknown>;
  fieldsMappingFrontend?: FieldsMappingFrontend[];
  fieldsMappingType?: string;
  err_handler?: unknown;
}

interface FlowInfo {
  stepId: string;
  action: Action;
  parents?: string[];
  condition?: string;
}

interface FieldValue {
  stepId: string;
  name: string;
  value: string;
  source: string;
}

export function calcFlowInfo(flowList: FlowInfo[], fieldData: FieldValue): any {
  const selectedFlow = flowList.find(
    (item) => item.stepId === fieldData.stepId
  );

  if (!selectedFlow) {
    // eslint-disable-next-line no-console
    console.warn(`The ${fieldData.stepId} of step don't exist`);
    return flowList;
  }

  const fieldsMappingFrontend = selectedFlow.action.fieldsMappingFrontend;

  if (isNil(fieldsMappingFrontend)) {
    selectedFlow.action.fieldsMappingFrontend = [omit(fieldData, "stepId")];
    return flowList;
  }

  if (isEmpty(fieldsMappingFrontend) && Array.isArray(fieldsMappingFrontend)) {
    fieldsMappingFrontend.push(omit(fieldData, "stepId"));
    return flowList;
  }

  const selectedField = selectedFlow.action.fieldsMappingFrontend?.find(
    (item) => item.name === fieldData.name
  );

  if (!selectedField) {
    fieldsMappingFrontend.push(omit(fieldData, "stepId"));
    return flowList;
  }

  selectedField.value = fieldData.value;
  selectedField.source = fieldData.source;
  selectedFlow.action.fieldsMappingType = "form";

  return flowList;
}

getRuntime().registerCustomProcessor("flowBuilder.calcFlowInfo", calcFlowInfo);
