import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { BrickQuickEntriesEditor } from "./brick-quick-entries.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

describe("BrickQuickEntriesEditor", () => {
  it("should display 1x1 by default", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "brick-quick-entries",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<BrickQuickEntriesEditor nodeUid={1} />);
    expect(wrapper.find(".row").length).toBe(1);
    expect(wrapper.find(".row").prop("style")).toMatchObject({
      gridTemplateColumns: "repeat(1, 1fr)",
    });
    expect(wrapper.find(".cell").length).toBe(1);
  });

  it("should display 2x2", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "brick-quick-entries",
      alias: "my-brick",
      $$parsedProperties: {
        column: 2,
        row: 2,
      },
    });
    const wrapper = shallow(<BrickQuickEntriesEditor nodeUid={1} />);
    expect(wrapper.find(".row").length).toBe(2);
    expect(wrapper.find(".row").at(0).prop("style")).toMatchObject({
      gridTemplateColumns: "repeat(2, 1fr)",
    });
    expect(wrapper.find(".row").at(0).find(".cell").length).toBe(2);
  });
});
