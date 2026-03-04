import type { ValidationRule } from "@ant-design/compatible/lib/form";
import type { AutoSizeType } from "rc-textarea/lib/ResizableTextArea";

export enum ControlType {
  Text = "text",
  Textarea = "textarea",
  Number = "number",
  Radio = "radio",
  Select = "select",
  Checkbox = "checkbox",
}

export interface SingleFieldEditProps {
  visible?: boolean;
  title?: string;
  modalTitle?: string;
  label?: string;
  type?: ControlType;
  placeholder?: string;
  initialValue?: any;
  options?: Record<string, any>[];
  labelKey?: string;
  valueKey?: string;
  rules?: ValidationRule[];
  autoSize?: boolean | AutoSizeType;
}

export interface SingleFieldEditEvents {
  "single-field-edit.ok": CustomEvent<any>;
  "single-field-edit.cancel": CustomEvent<any>;
}

export interface SingleFieldEditEventsMap {
  onSingleFieldEditOk: "single-field-edit.ok";
  onSingleFieldEditCancel: "single-field-edit.cancel";
}

export declare class SingleFieldEditElement extends HTMLElement {
  visible: boolean | undefined;
  title: string;
  modalTitle: string | undefined;
  label: string | undefined;
  type: ControlType | undefined;
  placeholder: string | undefined;
  initialValue: any | undefined;
  options: Record<string, any>[] | undefined;
  labelKey: string | undefined;
  valueKey: string | undefined;
  rules: ValidationRule[] | undefined;
  autoSize: boolean | AutoSizeType | undefined;
  open(event?: CustomEvent): void;
  close(): void;
}
