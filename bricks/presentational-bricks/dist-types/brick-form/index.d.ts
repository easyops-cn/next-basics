import type { FormLayout } from "@ant-design/compatible/lib/form/Form";
import type { ValidationRule } from "@ant-design/compatible/lib/form";
import type { ColProps } from "antd/lib/col";

export interface LegacyBrickFormProps
  extends WithTranslation,
    FormComponentProps {
  contractName?: string;
  fields: FieldDefinition[];
  showCancel?: boolean;
  cancelText?: string;
  showConfirm?: boolean;
  confirmText?: string;
  layout?: FormLayout;
  labelCol?: ColProps;
  wrapperCol?: ColProps;
  tailFormBtnLayout?: Record<"wrapperCol", ColProps>;
  onSubmit?(data: Record<string, any>): void;
  onCancel?(): void;
  onBrickFormRef: any;
  showCard: boolean;
  onFieldChange: (value: any, field: string) => void;
  dispatchCustomEvent: (field: FieldDefinition, detail: any) => void;
}

export interface FieldDefinition {
  field: string;
  label: string;
  fieldPath: string;
  component: string;
  isRequire?: boolean;
  valuePropName?: string;
  properties?: any;
  defaultValue?: boolean | string | number;
  hideFromField?: string;
  optionList?: string[] | BrickOptionProps[];
  emitChangeEvent?: string;
  emitCustomEvent?: string;
  dataSource?: {
    resolveName: string;
    path?: string;
    useIdField?: string;
    useTextField?: string;
  };
  // for brick-select control
  searchInCmdb?: SearchInCmdb;
  // for brick-switch control
  switchMap?: SwitchMap;
  // for brick-instance-selector control
  instanceList?: {
    query?: Record<string, any>;
    columns: CustomColumn[];
  };
  computeDefaultValue?: {
    target: string;
    method: string;
    args: any;
  };
  rules: ValidationRule & flags[];
  configProps: Record<string, any>;
}

export interface BrickFormProps {
  contractName?: string;
  fields?: LegacyBrickFormProps["fields"];
  showCancel?: boolean;
  cancelText?: string;
  showConfirm?: boolean;
  confirmText?: string;
  tailFormBtnLayout?: LegacyBrickFormProps["tailFormBtnLayout"];
  layout?: FormLayout;
  labelCol?: LegacyBrickFormProps["labelCol"];
  wrapperCol?: LegacyBrickFormProps["wrapperCol"];
  showCard?: boolean;
  resetDataAfterCancel?: boolean;
  submitFormDataKey?: string | number;
  fieldData?: any;
}

export declare class BrickFormElement extends HTMLElement {
  contractName: string | undefined;
  fields: LegacyBrickFormProps["fields"] | undefined;
  showCancel: boolean | undefined;
  cancelText: string | undefined;
  showConfirm: boolean | undefined;
  confirmText: string | undefined;
  tailFormBtnLayout: LegacyBrickFormProps["tailFormBtnLayout"] | undefined;
  layout: FormLayout | undefined;
  labelCol: LegacyBrickFormProps["labelCol"] | undefined;
  wrapperCol: LegacyBrickFormProps["wrapperCol"] | undefined;
  showCard: boolean | undefined;
  resetDataAfterCancel: boolean | undefined;
  submitFormDataKey: string | number | undefined;
  fieldData: any | undefined;
}
