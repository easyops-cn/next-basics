import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrickTree, BrickTreeProps } from "./BrickTree";
import { shallow } from "enzyme";
import { Checkbox, Empty, Tree } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

Element.prototype.scrollBy = jest.fn();

const dataSource = [
  {
    title: "0",
    key: "0",
    icon: { lib: "fa", icon: "briefcase" },
    filter: "a",
    children: [
      {
        title: "0-0",
        key: "00",
        filter: "b",
        disabled: true, // disabled
      },
      {
        title: "0-1",
        key: "01",
        icon: { lib: "fa", icon: "briefcase" },
        filter: "a",
        children: [
          {
            title: "0-1-0",
            key: "010",
            icon: { lib: "fa", icon: "briefcase" },
            filter: "a",
            children: [
              {
                title: "0-1-0-0",
                key: "0100",
                icon: { lib: "fa", icon: "cube" },
                filter: "b",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "1",
    key: "1",
    icon: { lib: "fa", icon: "briefcase" },
    filter: "a",
    children: [
      {
        title: "1-0",
        key: "10",
        icon: { lib: "fa", icon: "cube" },
        filter: "b",
      },
    ],
  },
];

describe("BrickTree", () => {
  it("should show up empty component when tree data is null", () => {
    const wrapper = shallow<BrickTreeProps>(
      <BrickTree dataSource={[]} searchable />
    );

    expect(wrapper.find(Empty).length).toBe(1);
  });
  it("should expand the nodes that match search value", () => {
    const { getByTestId, getByText, getAllByText } = render(
      <BrickTree dataSource={dataSource} searchable />
    );

    fireEvent.change(getByTestId("search-input"), { target: { value: "1-0" } });

    const mockScrollBy = getAllByText("1-0")[0].scrollBy;

    expect(mockScrollBy).toBeCalledTimes(1);
    fireEvent.click(getByText("0"));
    expect(mockScrollBy).toBeCalledTimes(1);
  });

  it("should be able to check all", () => {
    const wrapper = shallow<BrickTreeProps>(
      <BrickTree dataSource={dataSource} searchable />
    );

    let checkAllCheckbox = wrapper
      .find(Checkbox)
      .filter("[data-testid='check-all-checkbox']");
    expect(checkAllCheckbox).toHaveLength(0);
    wrapper.setProps({ checkAllEnabled: true });
    checkAllCheckbox = wrapper
      .find(Checkbox)
      .filter("[data-testid='check-all-checkbox']");
    expect(checkAllCheckbox).toHaveLength(0);
    wrapper.setProps({ configProps: { checkable: true } });
    checkAllCheckbox = wrapper
      .find(Checkbox)
      .filter("[data-testid='check-all-checkbox']");
    expect(checkAllCheckbox).toHaveLength(1);

    // 全选
    checkAllCheckbox.invoke("onChange")({
      target: { checked: true },
    } as CheckboxChangeEvent);
    let tree = wrapper.find(Tree);
    const checkedKeys = ["0", "01", "010", "0100", "1", "10"];
    expect(tree.prop("checkedKeys")).toEqual(checkedKeys);

    // 取消全选
    checkAllCheckbox.invoke("onChange")({
      target: { checked: false },
    } as CheckboxChangeEvent);
    tree = wrapper.find(Tree);
    expect(tree.prop("checkedKeys")).toEqual([]);

    // 树部分选择
    tree.invoke("onCheck")(
      checkedKeys.filter((key) => !key.startsWith("1")),
      {}
    );
    let checkAllCheckboxProps = wrapper
      .find(Checkbox)
      .filter("[data-testid='check-all-checkbox']")
      .props();
    expect(checkAllCheckboxProps.checked).toBe(false);
    expect(checkAllCheckboxProps.indeterminate).toBe(true);

    // 树全选
    tree.invoke("onCheck")(checkedKeys, {});
    checkAllCheckboxProps = wrapper
      .find(Checkbox)
      .filter("[data-testid='check-all-checkbox']")
      .props();
    expect(checkAllCheckboxProps.checked).toBe(true);
    expect(checkAllCheckboxProps.indeterminate).toBe(false);

    // 树全不勾选
    tree.invoke("onCheck")([], {});
    checkAllCheckboxProps = wrapper
      .find(Checkbox)
      .filter("[data-testid='check-all-checkbox']")
      .props();
    expect(checkAllCheckboxProps.checked).toBe(false);
    expect(checkAllCheckboxProps.indeterminate).toBe(false);
  });

  it("should work when set checkedFilterConfig", () => {
    const onCheck = jest.fn();
    const wrapper = shallow<BrickTreeProps>(
      <BrickTree
        dataSource={dataSource}
        searchable
        checkAllEnabled
        onCheck={onCheck}
        configProps={{
          checkable: true,
        }}
        checkedFilterConfig={{
          field: "filter",
          value: "b",
          operator: "$ne",
        }}
      />
    );

    const checkedKeys = ["0", "00", "01", "010", "0100", "1", "10"];

    // 全选
    const checkAllCheckbox = wrapper
      .find(Checkbox)
      .filter("[data-testid='check-all-checkbox']");
    expect(checkAllCheckbox).toHaveLength(1);

    checkAllCheckbox.invoke("onChange")({
      target: { checked: true },
    } as CheckboxChangeEvent);
    let checkedNum = wrapper.find(".checkedNum");
    expect(checkedNum.text()).toEqual("已选 2 项");
    expect(onCheck).lastCalledWith(["0100", "10"]);

    // 取消全选
    checkAllCheckbox.invoke("onChange")({
      target: { checked: false },
    } as CheckboxChangeEvent);
    checkedNum = wrapper.find(".checkedNum");
    expect(checkedNum.text()).toEqual("已选 0 项");
    expect(onCheck).lastCalledWith([]);

    // 树部分选择
    const tree = wrapper.find(Tree);
    tree.invoke("onCheck")(
      checkedKeys.filter((key) => !key.startsWith("0")),
      {}
    );
    checkedNum = wrapper.find(".checkedNum");
    expect(checkedNum.text()).toEqual("已选 1 项");
    expect(onCheck).lastCalledWith(["10"]);

    // 树全选
    tree.invoke("onCheck")(checkedKeys, {});
    checkedNum = wrapper.find(".checkedNum");
    expect(checkedNum.text()).toEqual("已选 3 项");
    expect(onCheck).lastCalledWith(["00", "0100", "10"]);
  });
});
