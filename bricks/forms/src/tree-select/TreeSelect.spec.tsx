import React from "react";
import { shallow } from "enzyme";
import { TreeSelect as AntdTreeSelect } from "antd";
import { TreeNode, TreeNodeValue } from "antd/lib/tree-select/interface";
import { FormItemWrapper } from "@next-libs/forms";

import { TreeSelect } from "./TreeSelect";

const formItemProps = {
  name: "host",
  label: "主机",
  required: true,
  message: { required: "不能为空" },
};
const treeSelectProps = {
  treeData: [] as TreeNode[],
  treeCheckable: true,
  allowClear: true,
  disabled: true,
  inputBoxStyle: {},
  dropdownMatchSelectWidth: false,
  dropdownStyle: {},
  multiple: true,
  placeholder: "placeholder",
  searchPlaceholder: "searchPlaceholder",
  showSearch: true,
  treeDataSimpleMode: true,
  treeNodeFilterProp: "name",
  treeNodeLabelProp: "name",
  value: [] as TreeNodeValue,
  onChange: jest.fn(),
};

describe("TreeSelect", () => {
  it("should work", () => {
    const wrapper = shallow(
      <TreeSelect {...formItemProps} {...treeSelectProps} />
    );
    expect(wrapper.find(FormItemWrapper).props()).toEqual(
      expect.objectContaining(formItemProps)
    );
    const antdTreeSelectProps = {
      ...treeSelectProps,
      style: treeSelectProps.inputBoxStyle,
    };
    delete antdTreeSelectProps.inputBoxStyle;
    expect(wrapper.find(AntdTreeSelect).props()).toEqual(
      expect.objectContaining(antdTreeSelectProps)
    );
  });
});
