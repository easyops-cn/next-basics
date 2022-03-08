import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { TplNavigationBarWidgetEditor } from "./tpl-navigation-bar-widget.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("TplNavigationBarWidgetEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "tpl-navigation-bar-widget",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<TplNavigationBarWidgetEditor nodeUid={1} />);
    expect(wrapper.find(".logo").length).toBe(1);
    expect(wrapper.find(".appName").length).toBe(1);
    expect(wrapper.find(".lanuchpadButton").length).toBe(1);
    expect(wrapper.find(".appName").text()).toBe("app name");
  });

  it("should work when the element was hidden", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "tpl-navigation-bar-widget",
      alias: "my-brick",
      $$parsedProperties: {
        isShowLogo: false,
        isShowAppName: false,
        isShowLaunchpadButton: false,
      },
    });
    const wrapper = shallow(<TplNavigationBarWidgetEditor nodeUid={1} />);
    expect(wrapper.find(".logo").length).toBe(0);
    expect(wrapper.find(".appName").length).toBe(0);
    expect(wrapper.find(".lanuchpadButton").length).toBe(0);
  });
});
