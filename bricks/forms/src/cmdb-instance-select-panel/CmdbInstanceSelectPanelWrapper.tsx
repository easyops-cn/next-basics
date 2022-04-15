import React from "react";

import { CmdbModels } from "@next-sdk/cmdb-sdk";

import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import { CmdbInstancesSelectPanel } from "@next-libs/cmdb-instances";

export interface CmdbInstanceSelectPanelWrapperProps
  extends FormItemWrapperProps {
  modelData?: Partial<CmdbModels.ModelCmdbObject>;
  objectMap: { [key: string]: Partial<CmdbModels.ModelCmdbObject> };
  objectId: string;
  instanceIdList: string[];
  onChange?: (value: string[]) => void;
  onChangeV2?: (value: any[]) => void;
  addButtonText?: string;
  instanceQuery: any;
  fields: string[];
  addInstancesModalPageSize?: number;
  showSizeChanger?: boolean;
  pageSizeOptions?: string[];
}

const RefCmdbInstancesSelectPanel = React.forwardRef(CmdbInstancesSelectPanel);

export function CmdbInstanceSelectPanelWrapper(
  props: CmdbInstanceSelectPanelWrapperProps
): React.ReactElement {
  const triggerOnChanges = (instanceDataList: any[]): void => {
    props.onChange &&
      props.onChange(
        instanceDataList.map((instanceData) => instanceData.instanceId)
      );
    props.onChangeV2 && props?.onChangeV2(instanceDataList);
  };

  return (
    <FormItemWrapper {...props}>
      <RefCmdbInstancesSelectPanel
        objectMap={props.objectMap}
        objectId={props.objectId}
        modelData={props.modelData}
        value={
          props.name && props.formElement ? undefined : props.instanceIdList
        }
        instanceQuery={props.instanceQuery}
        addTitle={props.addButtonText}
        onChange={triggerOnChanges}
        fields={props.fields}
        addInstancesModalPageSize={props.addInstancesModalPageSize}
        showSizeChanger={props.showSizeChanger}
        pageSizeOptions={props.pageSizeOptions}
      />
    </FormItemWrapper>
  );
}
