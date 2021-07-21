import React from "react";
import { TreeSelect as AntdTreeSelect } from "antd";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import {
  DataNode,
  DefaultValueType,
  SimpleModeConfig,
} from "rc-tree-select/lib/interface";

export interface TreeSelectProps extends FormItemWrapperProps {
  treeData?: DataNode[];
  treeCheckable?: boolean;
  treeCheckStrictly?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  inputBoxStyle?: React.CSSProperties;
  dropdownMatchSelectWidth?: boolean;
  dropdownStyle?: React.CSSProperties;
  multiple?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  showSearch?: boolean;
  treeDataSimpleMode?: boolean | SimpleModeConfig;
  treeNodeFilterProp?: string;
  treeNodeLabelProp?: string;
  value?: DefaultValueType;
  defaultExpandedKeys?: string[];
  onChange?: (value: DefaultValueType, label: any, extra: any) => void;
}

export function TreeSelect(props: TreeSelectProps): React.ReactElement {
  const {
    treeData,
    treeCheckable,
    treeCheckStrictly,
    allowClear,
    disabled,
    inputBoxStyle,
    dropdownMatchSelectWidth,
    dropdownStyle,
    multiple,
    placeholder,
    searchPlaceholder,
    showSearch,
    treeDataSimpleMode,
    treeNodeFilterProp,
    treeNodeLabelProp,
    value,
    defaultExpandedKeys,
    onChange,
    ...formItemProps
  } = props;

  return (
    <FormItemWrapper {...formItemProps}>
      <AntdTreeSelect
        style={inputBoxStyle}
        treeData={treeData}
        treeCheckable={treeCheckable}
        treeCheckStrictly={treeCheckStrictly}
        allowClear={allowClear}
        disabled={disabled}
        dropdownMatchSelectWidth={dropdownMatchSelectWidth}
        dropdownStyle={dropdownStyle}
        multiple={multiple}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        showSearch={showSearch}
        treeDataSimpleMode={treeDataSimpleMode}
        treeNodeFilterProp={treeNodeFilterProp}
        treeNodeLabelProp={treeNodeLabelProp}
        value={value}
        treeDefaultExpandedKeys={defaultExpandedKeys}
        onChange={onChange}
      />
    </FormItemWrapper>
  );
}
