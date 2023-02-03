import React from "react";
import { mount } from "enzyme";
import { AutoComplete } from "antd";
import { GeneralAutoComplete } from "./GeneralAutoComplete";

describe("GeneralAutoComplete", () => {
  it("should work", () => {
    const wrapper = mount(
      <GeneralAutoComplete
        options={[
          {
            label: "a",
            options: [
              { label: "a1", value: "a1" },
              { label: "a2", value: "a2" },
            ],
          },
          {
            label: "b",
            options: [
              { label: "b1", value: "b1" },
              { label: "b2", value: "b2" },
            ],
          },
        ]}
        value="f5"
      />
    );
    expect(wrapper.find(AutoComplete).length).toBe(1);
    const autoComplete = wrapper.find(AutoComplete).first();
    autoComplete.invoke("onSearch" as any)("a");
    expect(wrapper.find(AutoComplete).prop("options")).toEqual([
      {
        label: "a",
        options: [
          { label: "a1", value: "a1" },
          { label: "a2", value: "a2" },
        ],
      },
    ]);
    autoComplete.invoke("onSearch" as any)("1");
    expect(wrapper.find(AutoComplete).prop("options")).toEqual([
      {
        label: "a",
        options: [{ label: "a1", value: "a1" }],
      },
      {
        label: "b",
        options: [{ label: "b1", value: "b1" }],
      },
    ]);
    wrapper.setProps({
      options: ["1", "2"],
    });
    wrapper.update();
    expect(wrapper.find(AutoComplete).prop("options")).toEqual([
      { label: "1", value: "1" },
      { label: "2", value: "2" },
    ]);
  });

  it("should work when isAppendMode is true", () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <GeneralAutoComplete
        options={[
          { label: "a", value: "a" },
          { label: "b", value: "b" },
          { label: "c", value: "c" },
          { label: "d", value: "d" },
        ]}
        value="c"
        isAppendMode={true}
        onChange={handleChange}
      />
    );
    expect(wrapper.find(AutoComplete).length).toBe(1);
    const autoComplete = wrapper.find(AutoComplete).first();
    expect(wrapper.find(AutoComplete).prop("options")).toEqual([
      {
        label: "a",
        value: "a",
      },
      {
        label: "b",
        value: "b",
      },
      {
        label: "c",
        value: "c",
      },
      {
        label: "d",
        value: "d",
      },
    ]);
    autoComplete.invoke("onChange" as any)("username");
    expect(handleChange).toBeCalledWith("username");

    autoComplete.invoke("onChange" as any)("d");
    expect(handleChange).toBeCalledWith("cd");

    autoComplete.invoke("onChange" as any)(undefined);
    expect(handleChange).toBeCalledWith("");

    autoComplete.invoke("onFocus" as any)({ target: { id: "testId" } });

    autoComplete.invoke("onSelect" as any)("g");
    expect(handleChange).toBeCalledWith("cg");

    autoComplete.invoke("onSelect" as any)(undefined);
    expect(handleChange).toHaveBeenCalledTimes(4);
  });
});
