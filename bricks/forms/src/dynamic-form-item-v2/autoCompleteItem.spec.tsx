import React from "react";
import { mount } from "enzyme";
import { AutoComplete } from "antd";
import { AutoCompleteItem } from "./autoCompleteItem";

describe("GeneralAutoComplete", () => {
  it("should work", () => {
    const wrapper = mount(
      <AutoCompleteItem
        options={[
          { label: "a", value: "a" },
          { label: "b", value: "b" },
          { label: "c", value: "c" },
          { label: "d", value: "d" },
        ]}
        value="c"
      />
    );
    expect(wrapper.find(AutoComplete).length).toBe(1);
    const autoComplete = wrapper.find(AutoComplete).first();
    autoComplete.invoke("onSearch" as any)("a");
    expect(wrapper.find(AutoComplete).prop("options")).toEqual([
      {
        label: "a",
        value: "a",
      },
    ]);
    autoComplete.invoke("onSearch" as any)("b");
    expect(wrapper.find(AutoComplete).prop("options")).toEqual([
      {
        label: "b",
        value: "b",
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

    wrapper.setProps({
      options: [
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
      ],
    });
    wrapper.update();
    const autoComplete2 = wrapper.find(AutoComplete).first();
    autoComplete2.invoke("onSearch" as any)("b");
    expect(wrapper.find(AutoComplete).prop("options")).toEqual([
      {
        label: "b",
        options: [
          { label: "b1", value: "b1" },
          { label: "b2", value: "b2" },
        ],
      },
    ]);
  });
});
