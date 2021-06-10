import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { TimeRangePickerEditor } from "./time-range-picker.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("TimeRangePickerEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "time-range-picker",
      alias: "my-brick",
      $$parsedProperties: {
        label: "time range",
        required: true,
      },
    });
    const wrapper = shallow(<TimeRangePickerEditor nodeUid={1} />);
    expect(wrapper.find(".requireMark").length).toBe(1);
    expect(wrapper.find(".formLabel").text()).toBe("time range");
  });
});
