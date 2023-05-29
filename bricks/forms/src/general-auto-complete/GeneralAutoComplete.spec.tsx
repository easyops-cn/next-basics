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
            caption: "bbb",
            options: [
              { label: "b1", value: "b1" },
              { label: "b2", value: "b2" },
            ],
          },
        ]}
        value="f5"
        filterByCaption={true}
      />
    );
    expect(wrapper.find(AutoComplete).length).toBe(1);
    expect(wrapper.find(".caption").length).toBe(1);

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
        caption: "bbb",
        options: [{ label: "b1", value: "b1" }],
      },
    ]);
    autoComplete.invoke("onSearch" as any)("bbb");
    expect(wrapper.find(AutoComplete).prop("options")).toEqual([
      {
        label: "b",
        caption: "bbb",
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
});
