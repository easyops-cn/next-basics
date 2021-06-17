import React from "react";
import { mount } from "enzyme";
import { Dropdown, Tooltip } from "antd";
import { LibraryDropdown } from "./LibraryDropdown";
import { LibraryDropdownMenu } from "./LibraryDropdownMenu";

jest.mock("./LibraryDropdownMenu", () => ({
  LibraryDropdownMenu() {
    return <div>LibraryDropdownMenu</div>;
  },
}));

describe("LibraryDropdown", () => {
  it("should work", async () => {
    const wrapper = mount(<LibraryDropdown />);

    expect(wrapper.find(Dropdown).prop("visible")).toBe(false);
    expect(wrapper.find(Tooltip).prop("overlayStyle")).toEqual({
      display: undefined,
    });

    wrapper.find(Dropdown).invoke("onVisibleChange")(true);
    expect(wrapper.find(Dropdown).prop("visible")).toBe(true);
    expect(wrapper.find(Tooltip).prop("overlayStyle")).toEqual({
      display: "none",
    });

    wrapper.find(LibraryDropdownMenu).invoke("onDraggingChange")(true);
    expect(wrapper.find(Dropdown).prop("visible")).toBe(false);
    wrapper.find(Dropdown).invoke("onVisibleChange")(false);

    wrapper.find(LibraryDropdownMenu).invoke("onDraggingChange")(false);
    expect(wrapper.find(Dropdown).prop("visible")).toBe(false);

    wrapper.find(Dropdown).invoke("onVisibleChange")(true);
    expect(wrapper.find(Dropdown).prop("visible")).toBe(true);
    wrapper.find(LibraryDropdownMenu).invoke("onCloseClick")(null);
    expect(wrapper.find(Dropdown).prop("visible")).toBe(false);
  });
});
