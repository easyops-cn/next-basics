import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrickTree, BrickTreeProps } from "./BrickTree";
import { mount, shallow } from "enzyme";
import { Checkbox, Empty, Tree } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import i18n from "i18next";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";

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
    const wrapper = shallow<BrickTreeProps>(<BrickTree dataSource={[]} />);

    expect(wrapper.find(Empty).length).toBe(1);
  });
  it("should expand the nodes that match search value", async () => {
    const { getByTestId, getByText, getAllByText } = render(
      <BrickTree dataSource={dataSource} searchable />
    );

    fireEvent.change(getByTestId("search-input"), { target: { value: "1-0" } });
    await jest.runAllTimers();

    const mockScrollBy = getAllByText("1-0")[0].scrollBy;

    expect(mockScrollBy).toBeCalledTimes(2);
    fireEvent.click(getByText("0"));
    expect(mockScrollBy).toBeCalledTimes(2);
  });

  it("should expand the nodes that match search value by key", async () => {
    const { getByTestId, getByText, getAllByText } = render(
      <BrickTree dataSource={dataSource} searchable alsoSearchByKey />
    );

    fireEvent.change(getByTestId("search-input"), { target: { value: "100" } });
    await jest.runAllTimers();

    const mockScrollBy = getAllByText("0-1-0-0")[0].scrollBy;

    expect(mockScrollBy).toBeCalledTimes(4);
  });

  it("should be able to check all", () => {
    const onCheck = jest.fn();
    const wrapper = shallow<BrickTreeProps>(
      <BrickTree dataSource={dataSource} searchable onCheck={onCheck} />
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
    let checkAllCheckboxProps = wrapper
      .find(Checkbox)
      .filter("[data-testid='check-all-checkbox']")
      .props();
    expect(checkAllCheckboxProps.checked).toBe(false);
    expect(checkAllCheckboxProps.indeterminate).toBe(false);

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
    checkAllCheckboxProps = wrapper
      .find(Checkbox)
      .filter("[data-testid='check-all-checkbox']")
      .props();
    expect(checkAllCheckboxProps.checked).toBe(false);
    expect(checkAllCheckboxProps.indeterminate).toBe(true);
    let checkedNum = wrapper.find(".checkedNum");
    expect(checkedNum.text()).toEqual(
      i18n.t(`${NS_PRESENTATIONAL_BRICKS}:${K.SELECTED_OPTIONS}`, { number: 4 })
    );
    expect(onCheck).lastCalledWith(
      checkedKeys.filter((key) => !key.startsWith("1"))
    );

    // 树全选
    tree.invoke("onCheck")(checkedKeys, {});
    checkAllCheckboxProps = wrapper
      .find(Checkbox)
      .filter("[data-testid='check-all-checkbox']")
      .props();
    expect(checkAllCheckboxProps.checked).toBe(true);
    expect(checkAllCheckboxProps.indeterminate).toBe(false);
    checkedNum = wrapper.find(".checkedNum");
    expect(checkedNum.text()).toEqual(
      i18n.t(`${NS_PRESENTATIONAL_BRICKS}:${K.SELECTED_OPTIONS}`, { number: 6 })
    );
    expect(onCheck).lastCalledWith(checkedKeys);

    // 树全不勾选
    tree.invoke("onCheck")([], {});
    checkAllCheckboxProps = wrapper
      .find(Checkbox)
      .filter("[data-testid='check-all-checkbox']")
      .props();
    expect(checkAllCheckboxProps.checked).toBe(false);
    expect(checkAllCheckboxProps.indeterminate).toBe(false);
    checkedNum = wrapper.find(".checkedNum");
    expect(checkedNum.text()).toEqual(
      i18n.t(`${NS_PRESENTATIONAL_BRICKS}:${K.SELECTED_OPTIONS}`, { number: 0 })
    );
    expect(onCheck).lastCalledWith([]);
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
    expect(checkedNum.text()).toEqual(
      i18n.t(`${NS_PRESENTATIONAL_BRICKS}:${K.SELECTED_OPTIONS}`, { number: 2 })
    );
    expect(onCheck).lastCalledWith(["0100", "10"]);

    // 取消全选
    checkAllCheckbox.invoke("onChange")({
      target: { checked: false },
    } as CheckboxChangeEvent);
    checkedNum = wrapper.find(".checkedNum");
    expect(checkedNum.text()).toEqual(
      i18n.t(`${NS_PRESENTATIONAL_BRICKS}:${K.SELECTED_OPTIONS}`, { number: 0 })
    );
    expect(onCheck).lastCalledWith([]);

    // 树部分选择
    const tree = wrapper.find(Tree);
    tree.invoke("onCheck")(
      checkedKeys.filter((key) => !key.startsWith("0")),
      {}
    );
    checkedNum = wrapper.find(".checkedNum");
    expect(checkedNum.text()).toEqual(
      i18n.t(`${NS_PRESENTATIONAL_BRICKS}:${K.SELECTED_OPTIONS}`, { number: 1 })
    );
    expect(onCheck).lastCalledWith(["10"]);

    // 树全选
    tree.invoke("onCheck")(checkedKeys, {});
    checkedNum = wrapper.find(".checkedNum");
    expect(checkedNum.text()).toEqual(
      i18n.t(`${NS_PRESENTATIONAL_BRICKS}:${K.SELECTED_OPTIONS}`, { number: 3 })
    );
    expect(onCheck).lastCalledWith(["00", "0100", "10"]);
  });

  it("caseSensitiveWhenSearching should work", async () => {
    const data = [
      {
        title: "全部",
        key: "all",
      },
      {
        title: "默认",
        key: "default",
      },
      {
        title: "a",
        key: "a",
        children: [
          {
            title: "b",
            key: "b",
          },
          {
            title: "c",
            key: "c",
            children: [
              {
                title: "abcABCabc",
                key: "abcABCabc",
              },
            ],
          },
        ],
      },
    ];

    const wrapper = mount(
      <BrickTree
        dataSource={data}
        searchable
        showSpecificationTitleStyle={true}
      />
    );

    wrapper.find("[data-testid='search-input']").at(0).invoke("onChange")({
      target: { value: "abc" },
    } as any);
    await jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find(".matchText").at(0).text()).toEqual("abc");
    wrapper.find("[data-testid='search-input']").at(0).invoke("onChange")({
      target: { value: "cab" },
    } as any);
    await jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find(".matchText").at(0).text()).toEqual("cAB");
  });

  it("should support deselectable", () => {
    const onSelect = jest.fn();
    const wrapper = shallow<BrickTreeProps>(
      <BrickTree dataSource={dataSource} onSelect={onSelect} />
    );

    wrapper.find(Tree).invoke("onSelect")([], {} as any);
    expect(onSelect).not.toBeCalled();

    wrapper.setProps({ deselectable: true });

    wrapper.find(Tree).invoke("onSelect")([], {} as any);
    expect(onSelect).toBeCalled();
  });
});
