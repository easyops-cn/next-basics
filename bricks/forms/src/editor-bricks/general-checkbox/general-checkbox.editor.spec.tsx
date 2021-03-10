import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralCheckboxEditor } from "./general-checkbox.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralCheckboxEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-checkbox",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<GeneralCheckboxEditor nodeUid={1} />);
    expect(wrapper.find(".option").length).toEqual(3);
  });
});
