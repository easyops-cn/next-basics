import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralInputEditor } from "./general-input.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralInputEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-input",
      alias: "my-brick",
      $$parsedProperties: {
        label: "名称",
        requird: true,
        placeholder: "请输入名称",
      },
    });
    const wrapper = shallow(<GeneralInputEditor nodeUid={1} />);

    expect(wrapper.find(".placeholder").text()).toEqual("请输入名称");
    expect(wrapper.find(".formLabel").text()).toEqual("名称");
  });
});
