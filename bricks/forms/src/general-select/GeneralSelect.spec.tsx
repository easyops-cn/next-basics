import React from "react";
import { mount, shallow } from "enzyme";
import { Select } from "antd";
import { formatOptions } from "@next-libs/forms";
import { GeneralSelect, match, filterSearch } from "./GeneralSelect";
import * as kit from "@next-core/brick-kit";

const mockQuery = jest.fn().mockImplementation((q) =>
  Promise.resolve({
    list: [
      { label: "A", value: "a" },
      { label: "B", value: "b" },
      { label: "C", value: "c" },
    ].filter((v) => v.value.includes(q)),
  })
);
jest.spyOn(kit, "useProvider").mockReturnValue({
  query: mockQuery,
} as any);

jest.spyOn(kit, "useProvider");
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
    wrapper.setProps({
      mode: "multiple",
    });
    wrapper.find(Select).invoke("onChange")("one", null);
    await (global as any).flushPromises();
    expect(handleChange).toBeCalledWith("one");
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
        value="abc"
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
    wrapper.setProps({
      hiddenCheckedValueSuffix: true,
    });
    wrapper.update();
    expect(wrapper.find("BrickAsComponent").length).toEqual(1);
  });
  it("should render EasyopsEmpty", () => {
    const wrapper = shallow(
      <GeneralSelect
        name="gender"
        suffixBrick={{
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
        }}
        options={[
          { label: "other", value: "other" },
          { label: "one", value: "one" },
        ]}
        label="hello"
        placeholder="who"
        value="abc"
        emptyProps={{ description: "自定义文本" }}
      />
    );
    wrapper.find(Select).invoke("onSearch")("q");
    const EasyopsEmpty = kit.EasyopsEmpty;
    expect(EasyopsEmpty.length).toEqual(1);
    expect(wrapper.find(Select).prop("notFoundContent")).toStrictEqual(
      <EasyopsEmpty description="自定义文本" />
    );
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

  it("should trigger debounceSearch event", async () => {
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

  it("backend search should work", async () => {
    const mockSearch = jest.fn();

    const wrapper = mount(
      <GeneralSelect
        options={[
          { label: "A", value: "a" },
          { label: "B", value: "a" },
        ]}
        value="good"
        useBackend={{
          provider: "easyopsapi.cmdb@search:1.0.0",
          args: (q) => [q, { page: 1 }],
          transform: (data) => data.list,
        }}
        onSearch={mockSearch}
      />
    );

    wrapper.find(Select).invoke("onSearch")("c");
    jest.advanceTimersByTime(300);
    await (global as any).flushPromises();

    wrapper.update();
    expect(wrapper.find(".ant-select").length).toBe(1);
    expect(mockQuery).toHaveBeenCalledWith("easyopsapi.cmdb@search:1.0.0", [
      "c",
      { page: 1 },
    ]);
    expect(mockSearch).toHaveBeenCalledWith("c");
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
    const wrapper = shallow(
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

  it("should execute mouseEnter method", () => {
    const handleMouseEnter = jest.fn();

    const wrapper = shallow(
      <Select
        options={[
          { label: "other", value: "other" },
          { label: "one", value: "one" },
        ]}
        placeholder="who"
        onMouseEnter={handleMouseEnter}
      />
    );

    wrapper.invoke("onMouseEnter")({} as any);
    expect(handleMouseEnter).toBeCalled();
  });
  it("should work when filterByLabelAndValue", () => {
    const mockSearch = jest.fn();
    const wrapper = shallow(
      <GeneralSelect
        options={[
          { label: "one", value: 1 },
          { label: "two", value: 2 },
        ]}
        showSearch={true}
        onSearch={mockSearch}
      />
    );
    wrapper.invoke("onSearch")("1" as string);
    expect(mockSearch).toBeCalledWith("1");
  });
});
describe("functions", () => {
  it("should work with match", () => {
    expect(match("1", 123)).toEqual(true);
    expect(match("a", "ABC")).toEqual(true);
    expect(match(" b ", "ABC")).toEqual(true);
  });
  it("should work with filterSearch", () => {
    expect(
      filterSearch("sh", { value: "shanghai", label: "上海" }, false)
    ).toEqual(false);
    expect(
      filterSearch("sh", { value: "shanghai", label: "上海" }, true)
    ).toEqual(true);
    expect(
      filterSearch("上", { value: "shanghai", label: "上海" }, true)
    ).toEqual(true);
  });
});
