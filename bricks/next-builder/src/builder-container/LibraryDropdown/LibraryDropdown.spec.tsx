import React from "react";
import { mount } from "enzyme";
import { LibraryDropdown } from "./LibraryDropdown";
import { Button } from "antd";

jest.mock("../BrickLibrary/BrickLibrary", () => ({
  BrickLibrary() {
    return <div>BrickLibrary</div>;
  },
}));

describe("LibraryDropdown", () => {
  it("should work for bricks", async () => {
    const wrapper = mount(<LibraryDropdown />);

    wrapper
      .find(Button)
      .filter("[data-testid='trigger-btn']")
      .simulate("click");
    expect(wrapper.find("BrickLibrary").length).toBe(1);

    // isOpen to be false
    wrapper
      .find(Button)
      .filter("[data-testid='trigger-btn']")
      .simulate("click");
    expect(wrapper.find("Dropdown").prop("visible")).toBe(false);
    wrapper.find("BrickLibrary").invoke("onDraggingChange")(false);
    expect(wrapper.find("Dropdown").prop("visible")).toBe(false);

    // isOpen to be true
    wrapper
      .find(Button)
      .filter("[data-testid='trigger-btn']")
      .simulate("click");
    wrapper.find("BrickLibrary").invoke("onDraggingChange")(true);
    expect(wrapper.find("Dropdown").prop("visible")).toBe(false);

    wrapper.find("BrickLibrary").invoke("onDraggingChange")(false);
    expect(wrapper.find("Dropdown").prop("visible")).toBe(true);

    wrapper
      .find(Button)
      .filter("[data-testid='close-btn']")
      .simulate("click");
    expect(wrapper.find("Dropdown").prop("visible")).toBe(false);
  });
});
