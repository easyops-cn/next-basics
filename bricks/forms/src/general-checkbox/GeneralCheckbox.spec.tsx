import React from "react";
import { mount } from "enzyme";
import { GeneralCheckbox, IconCheckbox } from "./GeneralCheckbox";
import { formatOptions } from "@next-libs/forms";
import { Checkbox, Collapse } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { GeneralIcon } from "@next-libs/basic-components";
describe("GeneralCheckbox", () => {
  it("should work", async () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <GeneralCheckbox
        options={[
          { label: "苹果", value: "Apple" },
          { label: "梨子", value: "Pear" },
        ]}
        onChange={handleChange}
      />
    );
    wrapper.find(Checkbox.Group).invoke("onChange")(["Apple"]);
    await (global as any).flushPromises();
    expect(handleChange).toBeCalledWith(["Apple"]);
  });

  it("should be grid layout", () => {
    const wrapper = mount(
      <GeneralCheckbox
        colSpan={8}
        options={[
          { label: "苹果", value: "Apple" },
          { label: "梨子", value: "Pear" },
        ]}
      />
    );

    expect(wrapper.find("Col").at(1).prop("span")).toEqual(8);
  });

  it("should update value", () => {
    const wrapper = mount(
      <GeneralCheckbox
        options={formatOptions(["good", "better"])}
        value={["good"]}
      />
    );
    expect(wrapper.find(Checkbox.Group).prop("value")).toEqual(["good"]);

    wrapper.setProps({
      value: ["better"],
    });
    wrapper.update();
    expect(wrapper.find(Checkbox.Group).prop("value")).toEqual(["better"]);
  });

  it("should work with isGroup", () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <GeneralCheckbox
        isGroup={true}
        onChange={handleChange}
        optionGroups={[
          {
            name: "水果",
            key: "fruits",
            options: [
              {
                label: "苹果",
                value: "apple",
              },
              {
                label: "香蕉",
                value: "banana",
              },
            ],
          },
          {
            name: "蔬菜",
            key: "vegetables",
            options: [
              {
                label: "土豆",
                value: "potato",
              },
            ],
          },
        ]}
        value={["banana", "potato"]}
      />
    );
    expect(wrapper.find(Collapse).length).toBe(1);
    expect(wrapper.find(Checkbox.Group).length).toBe(3);
    expect(wrapper.find(Checkbox.Group).at(0).prop("value")).toEqual([
      "banana",
      "potato",
    ]);
    expect(wrapper.find(Checkbox.Group).at(2).prop("value")).toEqual([
      "vegetables",
    ]);
    wrapper.find(Checkbox.Group).at(2).invoke("onChange")([]);
    expect(handleChange).toBeCalledWith(["banana"]);
    wrapper.setProps({
      value: ["banana", "potato"],
    });
    wrapper.find(Checkbox.Group).at(1).invoke("onChange")(["fruits"]);
    expect(handleChange).toBeCalledWith(["banana", "potato", "apple"]);
    wrapper.setProps({
      value: ["apple"],
    });
    wrapper.update();
    expect(wrapper.find(Checkbox.Group).at(0).prop("value")).toEqual(["apple"]);
  });

  it("should work as single checkbox", () => {
    const text = "text";
    const value = true;
    const disabled = true;
    const handleChange = jest.fn();
    const wrapper = mount(
      <GeneralCheckbox
        text={text}
        value={value}
        disabled={disabled}
        onChange={handleChange}
      />
    );

    expect(wrapper.find(Checkbox.Group)).toHaveLength(0);

    const checkboxNode = wrapper.find(Checkbox);

    expect(checkboxNode).toHaveLength(1);
    expect(checkboxNode.props()).toEqual(
      expect.objectContaining({ children: text, checked: value, disabled })
    );
    const onChangeChecked = false;
    checkboxNode.invoke("onChange")({
      target: { checked: onChangeChecked },
    } as CheckboxChangeEvent);
    expect(handleChange).toBeCalledWith(onChangeChecked);
  });

  it("should type as icon checkbox", async () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <GeneralCheckbox
        options={[
          {
            icon: {
              icon: "area-chart",
              lib: "antd",
              theme: "outlined",
            },
            value: "area-chart",
          },
          {
            icon: {
              icon: "bar-chart",
              lib: "antd",
              theme: "outlined",
            },
            value: "bar-chart",
          },
          {
            icon: {
              icon: "pie-chart",
              lib: "antd",
              theme: "outlined",
            },
            value: "pie-chart",
            disabled: true,
          },
        ]}
        name="icon"
        value={["pie-chart", "bar-chart"]}
        onChange={handleChange}
        type="icon"
      />
    );
    expect(wrapper.find('input[id="area-chart"]').simulate("change"));
    expect(wrapper.find('input[id="bar-chart"]').simulate("change"));
    wrapper.find(IconCheckbox).invoke("onChange")(["pie-chart", "bar-chart"]);
    await (global as any).flushPromises();
    expect(handleChange).toBeCalledWith(["pie-chart", "bar-chart"]);
  });

  it("should isCustom as true with type as icon checkbox", async () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <GeneralCheckbox
        options={[
          {
            icon: {
              icon: "area-chart",
              lib: "antd",
              theme: "outlined",
            },
            value: "area-chart",
          },
          {
            icon: {
              icon: "bar-chart",
              lib: "antd",
              theme: "outlined",
            },
            value: "bar-chart",
          },
          {
            icon: {
              icon: "pie-chart",
              lib: "antd",
              theme: "outlined",
            },
            value: "pie-chart",
            disabled: true,
          },
        ]}
        isCustom={true}
        name="icon"
        value={["pie-chart", "bar-chart"]}
        onChange={handleChange}
        type="icon"
      />
    );
    expect(wrapper.find(".iconCustomCheckbox").length).not.toBe(0);
    expect(wrapper.find(".iconCustomCheckbox").length).toBeGreaterThanOrEqual(
      1
    );
    expect(wrapper.find('input[id="area-chart"]').simulate("change"));
    expect(wrapper.find('input[id="bar-chart"]').simulate("change"));
    wrapper.find(IconCheckbox).invoke("onChange")(["pie-chart", "bar-chart"]);
    await (global as any).flushPromises();
    expect(handleChange).toBeCalledWith(["pie-chart", "bar-chart"]);
  });

  it("should add color-className to checkbox", () => {
    const wrapper = mount(
      <GeneralCheckbox
        options={[
          { label: "苹果", value: "Apple", checkboxColor: "red" },
          { label: "梨子", value: "Pear", checkboxColor: "orange" },
        ]}
        value={["Apple", "Pear"]}
      />
    );

    expect(wrapper.find(".checkbox-red").at(0).prop("value")).toEqual("Apple");
    expect(wrapper.find(".checkbox-orange").at(0).prop("value")).toEqual(
      "Pear"
    );
  });

  it("should render general-icon for default checkbox", () => {
    const wrapper = mount(
      <GeneralCheckbox
        options={[
          {
            icon: {
              icon: "area-chart",
              lib: "antd",
              theme: "outlined",
            },
            value: "area-chart",
          },
          {
            icon: {
              icon: "bar-chart",
              lib: "antd",
              theme: "outlined",
            },
            value: "bar-chart",
          },
        ]}
      />
    );
    expect(wrapper.find(GeneralIcon).length).toEqual(2);
  });
});
