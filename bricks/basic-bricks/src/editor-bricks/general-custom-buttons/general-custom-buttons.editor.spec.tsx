import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  GeneralCustomButtonsEditor,
  BaseButton,
  DropdownBtn,
} from "./general-custom-buttons.editor";

jest.mock("@next-libs/basic-components", () => ({
  GeneralIcon: function GeneralIcon() {
    return <div> general icon </div>;
  },
}));

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralCustomButtonsEditor", () => {
  it("should work if no default", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-custom-buttons",
      alias: "custom-button",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<GeneralCustomButtonsEditor nodeUid={1} />);
    const custonButton = wrapper.find(BaseButton).render();
    expect(custonButton.text()).toEqual("custom-button");
  });

  it("should render button group", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-custom-buttons",
      alias: "custom-button",
      $$parsedProperties: {
        isMoreButton: false,
        customButtons: [
          {
            buttonType: "primary",
            text: "新建",
            icon: {
              icon: "plus-circle",
              lib: "antd",
              theme: "outlined",
            },
          },
          {
            icon: "save",
            text: "保存",
          },
          {
            icon: "search",
            text: "搜索",
            isDropdown: true,
          },
        ],
      },
    });

    const wrapper = shallow(<GeneralCustomButtonsEditor nodeUid={1} />);
    expect(wrapper.find(BaseButton).length).toEqual(2);
    expect(wrapper.find(BaseButton).at(0).render().text()).toEqual(
      expect.stringContaining("新建")
    );
  });

  it("should render dropdown button", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-custom-buttons",
      alias: "custom-button",
      $$parsedProperties: {
        isMoreButton: false,
        customButtons: [
          {
            buttonType: "primary",
            text: "新建",
            icon: {
              icon: "plus-circle",
              lib: "antd",
              theme: "outlined",
            },
          },
          {
            icon: "save",
            text: "保存",
            isDropdown: true,
          },
          {
            icon: "search",
            text: "搜索",
            isDropdown: true,
          },
        ],
      },
    });

    const wrapper = shallow(<GeneralCustomButtonsEditor nodeUid={1} />);
    const dropDownWrapper = wrapper.find(DropdownBtn).shallow();
    expect(dropDownWrapper.find(BaseButton).render().text()).toEqual(
      expect.stringContaining("管理")
    );
  });

  it("should render dropdown button with more button", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-custom-buttons",
      alias: "custom-button",
      $$parsedProperties: {
        isMoreButton: true,
        customButtons: [
          {
            buttonType: "primary",
            text: "新建",
            icon: {
              icon: "plus-circle",
              lib: "antd",
              theme: "outlined",
            },
          },
          {
            icon: "save",
            text: "保存",
            isDropdown: true,
          },
          {
            icon: "search",
            text: "搜索",
            isDropdown: true,
          },
        ],
      },
    });

    const wrapper = shallow(<GeneralCustomButtonsEditor nodeUid={1} />);
    const dropDownWrapper = wrapper.find(DropdownBtn).shallow();
    expect(dropDownWrapper.find(EllipsisOutlined).length).toEqual(1);
  });
});
