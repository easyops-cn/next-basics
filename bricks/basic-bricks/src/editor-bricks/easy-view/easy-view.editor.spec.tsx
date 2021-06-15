import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { EasyViewEditor } from "./easy-view.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");
const mockUseOutlineEnabled = jest.spyOn(helper, "useOutlineEnabled");
const mockUseBuilderGroupedChildNodes = jest.spyOn(
  helper,
  "useBuilderGroupedChildNodes"
);

describe("EasyViewEditor", () => {
  it("should work with gridAreas", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "easy-view",
      alias: "my-brick",
      $$parsedProperties: {
        gridAreas: {
          a: [1, 1, 2, 13],
          c: [2, 1, 3, 5],
          d: [2, 5, 3, 13],
        },
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "100px 200px",
        containerStyle: { height: "100%", gap: "10px" },
      },
    });
    mockUseOutlineEnabled.mockReturnValueOnce(false);
    mockUseBuilderGroupedChildNodes.mockReturnValueOnce([
      {
        mountPoint: "a",
        childNodes: [],
      },
      {
        mountPoint: "c",
        childNodes: [
          {
            id: "B-001",
            type: "brick",
            brick: "my-brick",
          },
        ],
      },
    ]);
    const wrapper = shallow(<EasyViewEditor nodeUid={1} />);
    const container = wrapper.find(".wrapper");
    expect(container.hasClass("outlineEnabled")).toBe(false);
    expect(container.hasClass("empty")).toBe(false);
    expect(container.prop("style")).toEqual({
      gridTemplateAreas: undefined,
      gridTemplateColumns: "repeat(12, 1fr)",
      gridTemplateRows: "100px 200px",
      gap: "10px",
    });
    expect(container.children().length).toBe(3);

    const findSlotContainerByName = (slotName: string): ShallowWrapper =>
      container
        .findWhere((child) => child.prop("slotName") === slotName)
        .parent();

    const slotA = findSlotContainerByName("a");
    expect(slotA.prop("style")).toEqual({
      gridArea: "1 / 1 / 2 / 13",
    });
    expect(slotA.hasClass("empty")).toBe(true);

    const slotC = findSlotContainerByName("c");
    expect(slotC.prop("style")).toEqual({
      gridArea: "2 / 1 / 3 / 5",
    });
    expect(slotC.hasClass("empty")).toBe(false);

    const slotD = findSlotContainerByName("d");
    expect(slotD.prop("style")).toEqual({
      gridArea: "2 / 5 / 3 / 13",
    });
    expect(slotD.hasClass("empty")).toBe(true);
  });

  it("should work with gridTemplateAreas", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "easy-view",
      alias: "my-brick",
      $$parsedProperties: {
        gridTemplateAreas: [
          ["a", "a", "a"],
          ["c", ".", "d"],
        ],
        gridTemplateColumns: ["4fr", "2fr", "6fr"],
        gridTemplateRows: ["100px", "200px"],
        containerStyle: { gridGap: "10px" },
        styleByAreas: {
          a: {
            justifySelf: "center",
          },
        },
      },
    });
    mockUseOutlineEnabled.mockReturnValueOnce(true);
    mockUseBuilderGroupedChildNodes.mockReturnValueOnce([]);
    const wrapper = shallow(<EasyViewEditor nodeUid={1} />);
    const container = wrapper.find(".wrapper");
    expect(container.hasClass("outlineEnabled")).toBe(true);
    expect(container.hasClass("empty")).toBe(false);
    expect(container.prop("style")).toEqual({
      gridTemplateAreas: '"a a a" "c . d"',
      gridTemplateColumns: "4fr 2fr 6fr",
      gridTemplateRows: "100px 200px",
      gridGap: "10px",
    });
    expect(container.children().length).toBe(3);

    const findSlotContainerStyleByName = (slotName: string): ShallowWrapper =>
      container
        .findWhere((child) => child.prop("slotName") === slotName)
        .parent()
        .prop("style");
    expect(findSlotContainerStyleByName("a")).toEqual({
      gridArea: "a",
      justifySelf: "center",
    });
    expect(findSlotContainerStyleByName("c")).toEqual({
      gridArea: "c",
    });
    expect(findSlotContainerStyleByName("d")).toEqual({
      gridArea: "d",
    });
  });

  it("should work with no areas", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "easy-view",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    mockUseOutlineEnabled.mockReturnValueOnce(false);
    mockUseBuilderGroupedChildNodes.mockReturnValueOnce([]);
    const wrapper = shallow(<EasyViewEditor nodeUid={1} />);
    const container = wrapper.find(".wrapper");
    expect(container.hasClass("empty")).toBe(true);
    expect(container.prop("style")).toEqual({});
    expect(container.children().length).toBe(0);
  });
});
