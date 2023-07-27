import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralSlideEditor } from "./general-slide.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralSlideEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-slide",
      alias: "my-brick",
      $$parsedProperties: {
        label: "滑动条",
      },
    });
    const wrapper = shallow(<GeneralSlideEditor nodeUid={1} />);
    expect(wrapper.find(".formLabel").text()).toBe("滑动条");
  });
});
