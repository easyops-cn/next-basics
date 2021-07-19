import React from "react";
import { shallow, mount } from "enzyme";
import { BrickGeneralSearch } from "./BrickGeneralSearch";
import { Input, Button, Select } from "antd";

const onUpdate = jest.fn();
const onChange = jest.fn();
const onSearchTypeChange = jest.fn();

describe("BrickGeneralSearch", () => {
  it("should work", () => {
    const wrapper = shallow(
      <BrickGeneralSearch
        onUpdate={onUpdate}
        onChange={onChange}
        query="1"
        size="extraLarge"
        shape="round"
        placeholder="搜索"
      />
    );
    expect(wrapper).toBeTruthy();
    wrapper.setProps({ size: "small" });
    expect(wrapper).toBeTruthy();
    wrapper.find(Input).simulate("change", {
      target: {
        value: "123",
      },
    });
    wrapper.find(Button).simulate("click");
    expect(onUpdate).toHaveBeenCalled();
  });
  it("should work when shape is default and size is large", () => {
    const wrapper = shallow(
      <BrickGeneralSearch
        onUpdate={onUpdate}
        onChange={onChange}
        query="1"
        size="large"
        shape="default"
        placeholder="搜索"
      />
    );
    expect(wrapper).toBeTruthy();
  });
  it("should work with debounceTime", () => {
    const wrapper = mount(
      <BrickGeneralSearch
        onUpdate={onUpdate}
        onChange={onChange}
        query="1"
        size="large"
        shape="default"
        placeholder="搜索"
        debounceTime={200}
      />
    );
    wrapper.setProps({
      query: "123",
    });
    expect(wrapper.find("Input").prop("value")).toBe("1");
    setTimeout(() => {
      expect(wrapper.find("Input").prop("value")).toBe("123");
    }, 300);
  });
  it("should work with searchTypeEnabled", () => {
    const wrapper = mount(
      <BrickGeneralSearch
        onUpdate={onUpdate}
        onChange={onChange}
        query="1"
        size="large"
        shape="default"
        placeholder="搜索"
        debounceTime={200}
        searchTypeEnabled={true}
        searchType={"all"}
        onSearchTypeChange={onSearchTypeChange}
        searchBoxStyleType={"defalut"}
      />
    );
    wrapper.find(Select).simulate("change", {
      value: "ip",
    });
    setTimeout(() => {
      expect(wrapper.find(Select).prop("value")).toBe("ip");
      expect(onSearchTypeChange).toHaveBeenCalled();
    }, 300);
  });
});
