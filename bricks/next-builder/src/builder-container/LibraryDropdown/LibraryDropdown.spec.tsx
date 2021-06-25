import React from "react";
import { mount } from "enzyme";
import { Dropdown, Button } from "antd";
import { LibraryDropdown } from "./LibraryDropdown";
import { LibraryDropdownMenu } from "./LibraryDropdownMenu";

jest.mock("./LibraryDropdownMenu", () => ({
  LibraryDropdownMenu() {
    return <div>LibraryDropdownMenu</div>;
  },
}));

describe("LibraryDropdown", () => {
  it("should work", async () => {
    const wrapper = mount(
      <LibraryDropdown>
        <Button type="link">add library</Button>
      </LibraryDropdown>
    );

    wrapper.find(Dropdown).invoke("onVisibleChange")(true);
    expect(wrapper.find(Dropdown).prop("visible")).toBe(true);

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
