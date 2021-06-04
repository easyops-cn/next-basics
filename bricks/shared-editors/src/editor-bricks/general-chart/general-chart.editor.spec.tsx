import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GeneralChartEditor } from "./general-chart.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GeneralChartEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "general-chart",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<GeneralChartEditor nodeUid={1} />);
    expect(wrapper.find(".layout").length).toEqual(4);
  });
});
