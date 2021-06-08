import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { EasyViewEditor } from "./easy-view.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");
const mockUseOutlineEnabled = jest.spyOn(helper, "useOutlineEnabled");

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
    const wrapper = shallow(<EasyViewEditor nodeUid={1} />);
    const container = wrapper.find(".wrapper");
    expect(container.hasClass("outlineEnabled")).toBe(false);
    expect(container.prop("style")).toEqual({
      gridTemplateAreas: undefined,
      gridTemplateColumns: "repeat(12, 1fr)",
      gridTemplateRows: "100px 200px",
      gap: "10px",
    });
    expect(container.children().length).toBe(3);
    expect(
      container
        .findWhere((child) => child.prop("slotName") === "a")
        .parent()
        .prop("style")
    ).toEqual({
      gridArea: "1 / 1 / 2 / 13",
    });
    expect(
      container
        .findWhere((child) => child.prop("slotName") === "c")
        .parent()
        .prop("style")
    ).toEqual({
      gridArea: "2 / 1 / 3 / 5",
    });
    expect(
      container
        .findWhere((child) => child.prop("slotName") === "d")
        .parent()
        .prop("style")
    ).toEqual({
      gridArea: "2 / 5 / 3 / 13",
    });
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
    const wrapper = shallow(<EasyViewEditor nodeUid={1} />);
    const container = wrapper.find(".wrapper");
    expect(container.hasClass("outlineEnabled")).toBe(true);
    expect(container.prop("style")).toEqual({
      gridTemplateAreas: '"a a a" "c . d"',
      gridTemplateColumns: "4fr 2fr 6fr",
      gridTemplateRows: "100px 200px",
      gridGap: "10px",
    });
    expect(container.children().length).toBe(3);
    expect(
      container
        .findWhere((child) => child.prop("slotName") === "a")
        .parent()
        .prop("style")
    ).toEqual({
      gridArea: "a",
      justifySelf: "center",
    });
    expect(
      container
        .findWhere((child) => child.prop("slotName") === "c")
        .parent()
        .prop("style")
    ).toEqual({
      gridArea: "c",
    });
    expect(
      container
        .findWhere((child) => child.prop("slotName") === "d")
        .parent()
        .prop("style")
    ).toEqual({
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
    const wrapper = shallow(<EasyViewEditor nodeUid={1} />);
    const container = wrapper.find(".wrapper");
    expect(container.prop("style")).toEqual({});
    expect(container.children().length).toBe(0);
  });
});
