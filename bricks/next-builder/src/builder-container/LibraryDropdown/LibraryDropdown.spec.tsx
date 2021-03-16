import React from "react";
import { mount } from "enzyme";
import { LibraryDropdown } from "./LibraryDropdown";

jest.mock("../BrickLibrary/BrickLibrary", () => ({
  BrickLibrary() {
    return <div>BrickLibrary</div>;
  },
}));

describe("LibraryDropdown", () => {
  it("should work for bricks", async () => {
    const wrapper = mount(<LibraryDropdown />);

    wrapper.find("Button").simulate("click");
    expect(wrapper.find("BrickLibrary").length).toBe(1);

    // isOpen to be false
    wrapper.find("Button").simulate("click");
    expect(wrapper.find("Dropdown").prop("visible")).toBe(false);
    wrapper.find("BrickLibrary").invoke("onDraggingChange")(false);
    expect(wrapper.find("Dropdown").prop("visible")).toBe(false);

    // isOpen to be true
    wrapper.find("Button").simulate("click");
    wrapper.find("BrickLibrary").invoke("onDraggingChange")(true);
    expect(wrapper.find("Dropdown").prop("visible")).toBe(false);

    wrapper.find("BrickLibrary").invoke("onDraggingChange")(false);
    expect(wrapper.find("Dropdown").prop("visible")).toBe(true);
  });
});
