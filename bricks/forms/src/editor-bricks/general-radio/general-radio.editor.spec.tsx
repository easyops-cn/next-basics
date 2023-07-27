import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralRadioEditor } from "./general-radio.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralRadioEditor", () => {
  it("should work with default type", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-radio",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<GeneralRadioEditor nodeUid={1} />);
    expect(wrapper.find(".option").length).toEqual(3);
  });

  it("should work with button type", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-radio",
      alias: "my-brick",
      $$parsedProperties: {
        type: "button",
      },
    });
    const wrapper = shallow(<GeneralRadioEditor nodeUid={1} />);
    expect(wrapper.find(".buttonOption").length).toEqual(3);
  });
});
