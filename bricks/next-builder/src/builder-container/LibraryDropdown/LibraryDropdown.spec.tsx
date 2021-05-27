import React from "react";
import { mount } from "enzyme";
import { LibraryDropdown } from "./LibraryDropdown";
import { LibraryMenu } from "../LibraryMenu/LibraryMenu";
import { Button } from "antd";

jest.mock("../AdvancedBrickLibrary/AdvancedBrickLibrary", () => ({
  AdvancedBrickLibrary() {
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
    expect(wrapper.find("AdvancedBrickLibrary").length).toBe(1);

    // isOpen to be false
    wrapper
      .find(Button)
      .filter("[data-testid='trigger-btn']")
      .simulate("click");
    expect(wrapper.find("Dropdown").prop("visible")).toBe(false);
    wrapper.find("AdvancedBrickLibrary").invoke("onDraggingChange")(false);
    expect(wrapper.find("Dropdown").prop("visible")).toBe(false);

    // isOpen to be true
    wrapper
      .find(Button)
      .filter("[data-testid='trigger-btn']")
      .simulate("click");
    wrapper.find("AdvancedBrickLibrary").invoke("onDraggingChange")(true);
    expect(wrapper.find("Dropdown").prop("visible")).toBe(false);

    wrapper.find("AdvancedBrickLibrary").invoke("onDraggingChange")(false);
    expect(wrapper.find("Dropdown").prop("visible")).toBe(true);

    wrapper.find(Button).filter("[data-testid='close-btn']").simulate("click");
    expect(wrapper.find("Dropdown").prop("visible")).toBe(false);

    wrapper.find(LibraryMenu).invoke("onItemClick")("all");
    expect(wrapper.find(".ant-menu-item").length).toEqual(14);
  });
});
