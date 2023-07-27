import React from "react";
import { mount, shallow } from "enzyme";
import Operations from "./Operations";
import { LeftOutlined } from "@ant-design/icons";

describe("Operations", () => {
  it("should work", () => {
    const props = {
      visible: true,
      showSwitch: false,
      showProgress: false,
      current: 0,
      count: 1,
      icons: {},
      customOperationPosition: false,
      scale: 1,
      onSwitchLeft: jest.fn(),
      onSwitchRight: jest.fn(),
      onZoomIn: jest.fn(),
      onZoomOut: jest.fn(),
      onRotateRight: jest.fn(),
      onRotateLeft: jest.fn(),
      onFlipX: jest.fn(),
      onFlipY: jest.fn(),
    };
    const wrapper = mount(<Operations {...props} />);
    expect(wrapper.find("ul").length).toEqual(1);
  });

  it("should work when showSwitch is true", () => {
    const props = {
      visible: true,
      showSwitch: true,
      showProgress: true,
      current: 0,
      count: 1,
      icons: {},
      customOperationPosition: false,
      scale: 1,
      onSwitchLeft: jest.fn(),
      onSwitchRight: jest.fn(),
      onZoomIn: jest.fn(),
      onZoomOut: jest.fn(),
      onRotateRight: jest.fn(),
      onRotateLeft: jest.fn(),
      onFlipX: jest.fn(),
      onFlipY: jest.fn(),
    };
    const wrapper = mount(<Operations {...props} />);
    expect(wrapper.find(LeftOutlined).length).toEqual(1);
  });
});
