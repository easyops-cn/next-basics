import React from "react";
import type { UseBrickConf } from "@next-core/brick-types";
import type React from "react";

export interface Option {
  label: React.ReactText;
  content?: React.ReactText;
  value: any;
  [propName: string]: any;
}

export interface DropdownSelectProps {
  options?: Option[];
  dataSource?: any[];
  value?: any[];
  label?: string;
  disabled?: boolean;
  heightFix?: boolean;
  buttonIcon?: any;
  dropdownButtonType?: "default" | "shape";
  labelFontSize?: string;
  placeholder?: string;
  optionTitle?: string;
  optionContent?: string;
  valuePath?: string;
  multipleSelect?: boolean;
  selectedKeys?: string[];
  selectTipText?: string;
  selectBoxStyle?: React.CSSProperties;
  defaultSelectedKeys?: string[];
  minSelectedItemLength?: number;
  multipleLabel?: string;
  tipBrick?: { useBrick: UseBrickConf };
  hideLabel?: boolean;
  dropdownTriggerStyle?: React.CSSProperties;
  labelBrick?: {
    useBrick: UseBrickConf;
  };
}

export interface DropdownSelectEvents {
  "select.change": CustomEvent<{ value: any; item: any }>;
  "multiple.select.change": CustomEvent<{ value: any }>;
}

export interface DropdownSelectEventsMap {
  onSelectChange: "select.change";
  onMultipleSelectChange: "multiple.select.change";
}

export declare class DropdownSelectElement extends HTMLElement {
  options: Option[] | undefined;
  dataSource: any[] | undefined;
  value: any[] | undefined;
  label: string | undefined;
  disabled: boolean | undefined;
  heightFix: boolean | undefined;
  buttonIcon: any | undefined;
  dropdownButtonType: "default" | "shape" | undefined;
  labelFontSize: string | undefined;
  placeholder: string | undefined;
  optionTitle: string | undefined;
  optionContent: string | undefined;
  valuePath: string | undefined;
  multipleSelect: boolean | undefined;
  selectedKeys: string[] | undefined;
  selectTipText: string | undefined;
  selectBoxStyle: React.CSSProperties | undefined;
  defaultSelectedKeys: string[] | undefined;
  minSelectedItemLength: number | undefined;
  multipleLabel: string | undefined;
  tipBrick: { useBrick: UseBrickConf } | undefined;
  hideLabel: boolean | undefined;
  dropdownTriggerStyle: React.CSSProperties | undefined;
  labelBrick:
    | {
        useBrick: UseBrickConf;
      }
    | undefined;
}
