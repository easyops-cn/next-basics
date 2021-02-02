import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { GridLayoutEditor } from "./grid-layout.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("GridLayoutEditor", () => {
  it("should work", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "grid-layout",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(
      <GridLayoutEditor nodeUid={1} brick="grid-layout" />
    );
    expect(wrapper.find(helper.SlotContainer).prop("dropZoneBodyStyle")).toBe(
      undefined
    );
  });

  it("should set `dropZoneBodyStyle` if `columns` is set", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "grid-layout",
      alias: "my-brick",
      $$parsedProperties: {
        columns: 3,
      },
    });
    const wrapper = shallow(
      <GridLayoutEditor nodeUid={1} brick="grid-layout" />
    );
    expect(
      wrapper.find(helper.SlotContainer).prop("dropZoneBodyStyle")
    ).toEqual({
      gridTemplateColumns: "repeat(3, 1fr)",
    });
  });
});
