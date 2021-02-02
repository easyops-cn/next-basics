import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralButtonEditor } from "./general-button.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralButtonEditor", () => {
  it("should show node alias by default", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-button",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(
      <GeneralButtonEditor nodeUid={1} brick="general-button" />
    );
    expect(wrapper.find(".button").text()).toBe("my-brick");
    expect(wrapper.find(".button").prop("className")).not.toContain("primary");
  });

  it("should show buttonName if set", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-button",
      alias: "my-brick",
      $$parsedProperties: {
        buttonName: "Save",
      },
    });
    const wrapper = shallow(
      <GeneralButtonEditor nodeUid={1} brick="general-button" />
    );
    expect(wrapper.find(".button").text()).toBe("Save");
  });

  it("should set primary by buttonType", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-button",
      alias: "my-brick",
      $$parsedProperties: {
        buttonType: "primary",
      },
    });
    const wrapper = shallow(
      <GeneralButtonEditor nodeUid={1} brick="general-button" />
    );
    expect(wrapper.find(".button").prop("className")).toContain("primary");
  });
});
