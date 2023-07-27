import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { MultipleColumnsCardEditor } from "./multiple-columns-card.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("MultipleColumnsCardEditor", () => {
  it("should work no default", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "multiple-columns-card",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<MultipleColumnsCardEditor nodeUid={1} />);
    expect(
      wrapper.find(helper.SlotContainer).prop("dropZoneBodyStyle")
    ).toEqual({ display: "grid", gridTemplateColumns: "1fr" });
  });

  it("should work with value", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "multiple-columns-card",
      alias: "my-brick",
      $$parsedProperties: {
        gridColumns: ["500px", 1],
      },
    });
    const wrapper = shallow(<MultipleColumnsCardEditor nodeUid={1} />);
    expect(
      wrapper.find(helper.SlotContainer).prop("dropZoneBodyStyle")
    ).toEqual({ display: "grid", gridTemplateColumns: "500px 1fr " });
  });
});
