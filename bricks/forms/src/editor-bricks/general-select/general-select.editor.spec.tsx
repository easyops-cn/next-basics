import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralSelectEditor } from "./general-select.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralSelectEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-select",
      alias: "my-brick",
      $$parsedProperties: {
        label: "用户列表",
        requred: true,
      },
    });
    const wrapper = shallow(<GeneralSelectEditor nodeUid={1} />);
    expect(wrapper.find(".formLabel").text()).toEqual("用户列表");
  });
});
