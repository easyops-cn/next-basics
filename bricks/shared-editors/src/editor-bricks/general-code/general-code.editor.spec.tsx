import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralCodeEditor } from "./general-code.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralCodeEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-code",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<GeneralCodeEditor nodeUid={1} />);
    expect(wrapper.find(".leftView").length).toEqual(1);
  });
});
