import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralButtonsEditor } from "./general-buttons.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralButtonsEditor", () => {
  it("should work without cancel button", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-buttons",
      alias: "my-brick",
      $$parsedProperties: {
        submitText: "提交",
      },
    });
    const wrapper = shallow(<GeneralButtonsEditor nodeUid={1} />);
    expect(wrapper.find(".submitBtn").text()).toBe("提交");
  });

  it("should work with cancel button", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-buttons",
      alias: "my-brick",
      $$parsedProperties: {
        submitText: "提交",
        cancelText: "取消",
        showCancelButton: true,
      },
    });
    const wrapper = shallow(<GeneralButtonsEditor nodeUid={1} />);
    expect(wrapper.find(".cancelBtn").text()).toBe("取消");
  });
});
