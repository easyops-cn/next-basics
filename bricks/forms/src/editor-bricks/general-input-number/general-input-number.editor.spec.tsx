import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralInputNumberEditor } from "./general-input-number.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralInputNumberEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-input-number",
      alias: "my-brick",
      $$parsedProperties: {
        placeholder: "请输入数字",
      },
    });
    const wrapper = shallow(<GeneralInputNumberEditor nodeUid={1} />);
    expect(wrapper.find(".placeholder").text()).toBe("请输入数字");
  });
});
