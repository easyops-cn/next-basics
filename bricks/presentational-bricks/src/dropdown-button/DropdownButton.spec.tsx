import React from "react";
import { shallow } from "enzyme";
import { render, fireEvent } from "@testing-library/react";
import { DropdownButton } from "./DropdownButton";
import "@testing-library/jest-dom/extend-expect";

const options = [
  {
    label: "item1",
    value: "test",
  },
  {
    label: "item2",
    value: "test2",
  },
];
describe("DropdownButton", () => {
  it("should work", () => {
    const handleChange = jest.fn();
    const handleClick = jest.fn();
    const wrapper = shallow(
      <DropdownButton
        options={options}
        buttonName="测试"
        onChange={handleChange}
        handleClick={handleClick}
      />
    );
    expect(wrapper.find(".DropdownButtonWrapper").length).toBe(1);
    wrapper.setProps({
      leftButtonIcon: {
        lib: "antd",
        icon: "alert",
        theme: "outlined",
        color: "#167be0",
      },
    });
    wrapper.update();
    expect(wrapper.find("GeneralIcon").length).toBe(1);
    expect(wrapper.find("GeneralIcon").prop("icon")).toMatchObject({
      lib: "antd",
      icon: "alert",
      theme: "outlined",
      color: "#167be0",
    });
  });
  it("should work and events", () => {
    const handleClick = jest.fn();
    let _value;
    const mockOnChange = jest.fn((value, item) => {
      _value = value;
    });
    const option = options[0];
    const value = option.value;
    const { container, rerender, getByTestId } = render(
      <DropdownButton
        options={options}
        buttonName="测试"
        onChange={mockOnChange}
        handleClick={handleClick}
        value={value}
      />
    );
    const dropdownTrigger = getByTestId("dropdown-button-trigger");
    let dropdownTriggerIcon = dropdownTrigger.querySelector(".anticon");
    expect(dropdownTriggerIcon).toHaveClass("anticon-down");
    fireEvent.click(dropdownTrigger);
    dropdownTriggerIcon = dropdownTrigger.querySelector(".anticon");
    expect(dropdownTriggerIcon).toHaveClass("anticon-up");
    const dropdownMenu =
      container.ownerDocument.querySelector(".ant-dropdown-menu");
    const item = options[0];
    const optionEl = dropdownMenu.children[0];
    fireEvent.click(optionEl);
    expect(mockOnChange).toBeCalledWith(item.value, item);
    const leftButtonTrigger = getByTestId("left-button-trigger");
    fireEvent.click(leftButtonTrigger);
    rerender(
      <DropdownButton
        textPlacement="left"
        options={options}
        value={_value}
        onChange={mockOnChange}
      />
    );
    expect(
      container.ownerDocument.querySelector(".LeftButtonLabel").childNodes[0]
        .textContent
    ).toEqual(item.label);
    rerender(
      <DropdownButton
        textPlacement="right"
        options={options}
        value={_value}
        onChange={mockOnChange}
      />
    );
    expect(
      container.ownerDocument.querySelector(".RightButtonLabel").childNodes[0]
        .textContent
    ).toEqual(item.label);
  });
});
