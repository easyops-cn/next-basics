import React from "react";
import { shallow, mount } from "enzyme";
import { Select } from "antd";
import { formatOptions } from "@next-libs/forms";
import { GeneralSelect } from "./GeneralSelect";

describe("GeneralSelect", () => {
  it("should execute change method", async () => {
    const handleChange = jest.fn();
    const handleChangeV2 = jest.fn();

    const wrapper = shallow(
      <GeneralSelect
        name="gender"
        options={[
          { label: "other", value: "other" },
          { label: "one", value: "one" },
        ]}
        label="hello"
        placeholder="who"
        value="world"
        onChange={handleChange}
        onChangeV2={handleChangeV2}
      />
    );

    wrapper.find(Select).invoke("onChange")("one", null);
    await (global as any).flushPromises();
    expect(handleChange).toBeCalledWith("one");
    await (global as any).flushPromises();
    expect(handleChangeV2).toBeCalledWith({ label: "one", value: "one" });
  });

  it("should render suffix brick", () => {
    const wrapper = shallow(
      <GeneralSelect
        name="gender"
        options={
          [
            { label: "1.0.0", value: "abc", status: "success" },
            { label: "2.0.0", value: "bcd", status: "failed" },
          ] as any[]
        }
        label="hello"
        placeholder="who"
        value="world"
        suffix={{
          useBrick: {
            brick: "presentational-bricks.brick-value-mapping",
            properties: {
              mapping: {
                success: {
                  text: "成功",
                  color: "green",
                },
                failed: {
                  text: "成功",
                  color: "green",
                },
              },
            },
            transform: {
              value: "@status",
            },
          },
        }}
      />
    );

    expect(wrapper.find("BrickAsComponent").at(0).prop("data")).toEqual({
      label: "1.0.0",
      status: "success",
      value: "abc",
    });
    expect(wrapper.find("BrickAsComponent").at(1).prop("data")).toEqual({
      label: "2.0.0",
      status: "failed",
      value: "bcd",
    });
  });

  it("should trigger change event", () => {
    const handleDebounceSearch = jest.fn();

    const wrapper = shallow(
      <GeneralSelect
        name="gender"
        options={[
          { label: "other", value: "other" },
          { label: "one", value: "one" },
        ]}
        label="hello"
        placeholder="who"
        value="world"
        onDebounceSearch={handleDebounceSearch}
      />
    );

    wrapper.find(Select).invoke("onSearch")("q");
    wrapper.find(Select).invoke("onSearch")("qu");

    expect(handleDebounceSearch).not.toBeCalled();
    jest.advanceTimersByTime(300);
    expect(handleDebounceSearch).toBeCalledTimes(1);
    expect(handleDebounceSearch).toHaveBeenCalledWith("qu");
  });

  it("should trigger debounceSearch event", () => {
    const handleSearch = jest.fn();

    const wrapper = shallow(
      <GeneralSelect
        name="gender"
        options={[
          { label: "other", value: "other" },
          { label: "one", value: "one" },
        ]}
        label="hello"
        placeholder="who"
        value="world"
        onSearch={handleSearch}
      />
    );

    wrapper.find(Select).invoke("onSearch")("q");

    expect(handleSearch).toHaveBeenCalledWith("q");
  });

  it("should update value", () => {
    const wrapper = mount(
      <GeneralSelect
        options={formatOptions(["good", "better"])}
        value="good"
        popoverPositionType="parent"
      />
    );

    expect(wrapper.find(Select).prop("value")).toBe("good");
    wrapper.setProps({
      value: "better",
    });
    wrapper.update();
    expect(wrapper.find(Select).prop("value")).toBe("better");
  });

  it("should render group options", () => {
    const wrapper = shallow(
      <GeneralSelect
        name="city"
        options={
          [
            { label: "中国", value: "China", location: "亚洲" },
            { label: "日本", value: "Japan", location: "亚洲" },
            { label: "美国", value: "USA", location: "北美洲" },
          ] as any[]
        }
        label="城市"
        value="China"
        groupBy="location"
      />
    );

    const optGroup = wrapper.find(Select.OptGroup).at(0);
    expect(optGroup.prop("label")).toEqual("亚洲");
    expect(optGroup.find(Select.Option).length).toEqual(2);
  });
  it("popoverPositionType should work", () => {
    const wrapper = mount(
      <GeneralSelect
        options={[
          { label: "苹果", value: "apple" },
          { label: "水", value: "water" },
        ]}
        value="apple"
        popoverPositionType="parent"
      />
    );
    const childElement = document.createElement("div");
    const parnetElement = document.createElement("div");

    parnetElement.append(childElement);

    expect(
      wrapper.find(Select).invoke("getPopupContainer")(childElement)
    ).toEqual(parnetElement);
  });
});
