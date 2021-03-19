import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralModalEditor } from "./general-modal.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralModalEditor", () => {
  it("should work with default properties", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-modal",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<GeneralModalEditor nodeUid={1} />);

    expect(wrapper.find(".cancelBtn").text()).toEqual("取消");
    expect(wrapper.find(".okBtn").text()).toEqual("确认");
  });

  it("should work with properties", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-modal",
      alias: "my-brick",
      $$parsedProperties: {
        modalTitle: "modal-title",
        cancelText: "cancel",
        okText: "save",
      },
    });
    const wrapper = shallow(<GeneralModalEditor nodeUid={1} />);

    expect(wrapper.find(".title").text()).toBe("modal-title");
    expect(wrapper.find(".cancelBtn").text()).toEqual("cancel");
    expect(wrapper.find(".okBtn").text()).toEqual("save");
  });
});
