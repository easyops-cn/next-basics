import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralTextareaEditor } from "./general-textarea.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralTextareaEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-textarea",
      alias: "my-brick",
      $$parsedProperties: {
        placeholder: "请输入文本内容",
      },
    });
    const wrapper = shallow(
      <GeneralTextareaEditor nodeUid={1} brick="general-textarea" />
    );
    expect(wrapper.find(".placeholder").text()).toBe("请输入文本内容");
  });
});
