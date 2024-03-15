import React from "react";
import { mount } from "enzyme";
import { AutoComplete } from "antd";
import { GeneralAutoComplete } from "./GeneralAutoComplete";

describe("GeneralAutoComplete", () => {
  it("should work", () => {
    const handleBlur = jest.fn();
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
        onBlur={handleBlur}
      />
    );
    expect(wrapper.find(AutoComplete).length).toBe(1);
    const autoComplete = wrapper.find(AutoComplete).first();
    autoComplete.invoke("onSearch" as any)("a");
    expect(wrapper.find(AutoComplete).prop("options")).toEqual([
      {
        label: expect.anything(),
        options: [
          { label: expect.anything(), value: "a1" },
          { label: expect.anything(), value: "a2" },
        ],
      },
    ]);
    autoComplete.invoke("onSearch" as any)("1");
    expect(wrapper.find(AutoComplete).prop("options")).toEqual([
      {
        label: expect.anything(),
        options: [{ label: expect.anything(), value: "a1" }],
      },
      {
        label: expect.anything(),
        caption: "bbb",
        options: [{ label: expect.anything(), value: "b1" }],
      },
    ]);
    wrapper.setProps({
      options: ["1", "2"],
    });
    wrapper.update();
    expect(wrapper.find(AutoComplete).prop("options")).toEqual([
      { label: expect.anything(), value: "1" },
      { label: expect.anything(), value: "2" },
    ]);
    wrapper.find(AutoComplete).invoke("onBlur")({
      target: undefined,
    } as React.FocusEvent<HTMLInputElement>);
    expect(handleBlur).toHaveBeenCalled();
  });
});
