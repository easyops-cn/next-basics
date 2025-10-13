import React from "react";
import { shallow, mount } from "enzyme";
import { GeneralCustomButtons } from "./GeneralCustomButtons";
import { CustomButton } from ".";
import { Menu, Dropdown, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";

describe("topology view admin buttons", () => {
  it("should work", () => {
    const mockSave = jest.fn();
    const wrapper = shallow(
      <GeneralCustomButtons buttons={[]} handleClick={mockSave} />
    );
    expect(wrapper.find("Menu").length).toBe(0);
  });

  it("should work with buttons", () => {
    const buttons: CustomButton[] = [
      {
        isDropdown: true,
        text: "a-button",
        icon: "save",
        buttonUrl: "search",
        eventName: "save",
      },
      {
        isDropdown: false,
        text: "b-button",
        icon: "edit",
        buttonHref: "http://x.y.z",
        eventName: "edit",
      },
      {
        isDropdown: false,
        text: "bb-button",
        icon: "saveAs",
        eventName: "saveAs",
      },
      {
        isDropdown: true,
        text: "c-button",
        icon: "delete",
        eventName: "delete",
      },
    ];
    const mockSave = jest.fn();
    const wrapper = shallow(
      <GeneralCustomButtons
        buttons={buttons}
        handleClick={mockSave}
        isMoreButton={true}
      />
    );
    const editButton = wrapper.find(Button).at(0);
    expect(
      (editButton.prop("icon") as React.ReactElement).props["data-icon"]
    ).toBe("edit");
    editButton.simulate("click");
    expect(mockSave).toBeCalledWith("edit", buttons[1]);
  });

  it("disabled should work", () => {
    const mockSave = jest.fn();
    const buttons: Partial<CustomButton>[] = [
      {
        isDropdown: true,
        disabled: true,
        text: "a-button",
        icon: "save",
        eventName: "save",
      },
      {
        isDropdown: true,
        isDivider: true,
      },
    ];
    const wrapper = shallow(
      <GeneralCustomButtons
        buttons={buttons}
        handleClick={mockSave}
        dropdownPlacement="topLeft"
      />
    );
    const saveButton = wrapper.find(Button).at(0);
    expect(saveButton.prop("icon")).toEqual(<SettingOutlined />);
    (wrapper.instance() as any).handleMenuClick({
      key: "save",
      item: { props: { ["data-button"]: buttons[0] } },
    });
    expect(mockSave).toBeCalledWith("save", buttons[0]);
  });

  it("danger should work", () => {
    const mockClick = jest.fn();
    const buttons: CustomButton[] = [
      {
        danger: true,
        text: "a-button",
        icon: "save",
        eventName: "save",
      },
      {
        isDropdown: true,
        danger: true,
        text: "b-button",
        icon: "close",
        eventName: "close",
      },
      {
        isDropdown: true,
        disabled: true,
        danger: true,
        text: "c-button",
        icon: "clear",
        eventName: "clear",
      },
    ];
    const wrapper = shallow(
      <GeneralCustomButtons buttons={buttons} handleClick={mockClick} />
    );
    const saveButton = wrapper.find(Button).at(0);
    const menuItems = (
      wrapper.find(Dropdown).prop("overlay") as React.ReactElement
    ).props.children;
    const closeButton = menuItems[0];
    const clearButton = menuItems[1];
    expect(saveButton.prop("danger")).toEqual(true);
    expect(closeButton.props["danger"]).toEqual(true);
    expect(clearButton.props["danger"]).toEqual(undefined);
  });

  it("dropdownBtnIcon should work", () => {
    const mockSave = jest.fn();
    const buttons: Partial<CustomButton>[] = [
      {
        isDropdown: true,
        disabled: true,
        text: "a-button",
        icon: "save",
        eventName: "save",
      },
      {
        isDropdown: true,
        isDivider: true,
      },
    ];
    const wrapper = shallow(
      <GeneralCustomButtons
        buttons={buttons}
        handleClick={mockSave}
        dropdownPlacement="topLeft"
        dropdownBtnIcon="plus"
      />
    );
    const saveButton = wrapper.find(Button).at(0);
    expect(saveButton.prop("icon").props.type).toEqual("plus");

    const wrapper2 = shallow(
      <GeneralCustomButtons
        buttons={buttons}
        handleClick={mockSave}
        dropdownPlacement="topLeft"
        dropdownBtnIcon={{
          lib: "fa",
          icon: "plus",
          prefix: "fas",
        }}
      />
    );
    const saveButton2 = wrapper2.find(Button).at(0);
    expect(saveButton2.prop("icon").props.icon).toEqual(
      expect.objectContaining({
        lib: "fa",
        icon: "plus",
        prefix: "fas",
      })
    );
  });

  it("more button style should work", () => {
    const buttons: Partial<CustomButton>[] = [
      {
        isDropdown: true,
        text: "a-button",
        icon: "save",
        eventName: "save",
      },
    ];
    const wrapper = shallow(
      <GeneralCustomButtons
        buttons={buttons}
        isMoreButton={true}
        moreButtonShape="circle"
        moreButtonType="link"
        moreBtnIcon="plus"
      />
    );
    const moreButton = wrapper.find(Button).at(0);
    expect(moreButton.prop("type")).toEqual("link");
    expect(moreButton.hasClass("circleShapeButton")).toBeTruthy();
    expect(moreButton.prop("icon").props.type).toEqual("plus");

    const wrapper2 = shallow(
      <GeneralCustomButtons
        buttons={buttons}
        isMoreButton={true}
        moreButtonShape="circle"
        moreButtonType="link"
        moreBtnIcon={{ lib: "fa", icon: "plus", prefix: "fas" }}
      />
    );
    const moreButton2 = wrapper2.find(Button).at(0);
    expect(moreButton2.prop("icon").props.icon).toEqual(
      expect.objectContaining({
        lib: "fa",
        icon: "plus",
        prefix: "fas",
      })
    );
  });

  it("dropdownBtnType should work", () => {
    const buttons: Partial<CustomButton>[] = [
      {
        isDropdown: true,
        text: "a-button",
        icon: "save",
        eventName: "save",
      },
    ];

    const mockOnDropdownVisibleChange = jest.fn();
    const wrapper = shallow(
      <GeneralCustomButtons
        buttons={buttons}
        dropdownBtnType="link"
        onDropdownVisibleChange={mockOnDropdownVisibleChange}
      />
    );
    const moreButton = wrapper.find(Button).at(0);
    expect(moreButton.prop("type")).toEqual("link");
    expect(moreButton.hasClass("dropdownBtnContainer")).toBeTruthy();
    expect(moreButton.text()).toEqual("管理");
    wrapper.find(Dropdown).invoke("onVisibleChange")(true);
    expect(mockOnDropdownVisibleChange).toHaveBeenCalledWith(true);
  });
});
