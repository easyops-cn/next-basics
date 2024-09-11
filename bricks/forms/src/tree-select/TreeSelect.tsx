import React from "react";
import { TreeSelect as AntdTreeSelect } from "antd";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import {
  DataNode,
  DefaultValueType,
  SimpleModeConfig,
} from "rc-tree-select/lib/interface";

const showCheckedStrategyMap = {
  all: AntdTreeSelect.SHOW_ALL,
  parent: AntdTreeSelect.SHOW_PARENT,
  child: AntdTreeSelect.SHOW_CHILD,
};

export type showCheckedStrategyType = keyof typeof showCheckedStrategyMap;

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
  defaultExpandAll?: boolean;
  defaultExpandedKeys?: string[];
  onChange?: (value: DefaultValueType, label: any, extra: any) => void;
  showCheckedStrategy?: showCheckedStrategyType;
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
    defaultExpandAll,
    defaultExpandedKeys,
    onChange,
    showCheckedStrategy,
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
        treeDefaultExpandAll={defaultExpandAll}
        treeDefaultExpandedKeys={defaultExpandedKeys}
        onChange={onChange}
        showCheckedStrategy={showCheckedStrategyMap[showCheckedStrategy]}
      />
    </FormItemWrapper>
  );
}
