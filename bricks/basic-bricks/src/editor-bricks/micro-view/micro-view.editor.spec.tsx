import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { MicroViewEditor } from "./micro-view.editor";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");
const mockUseBuilderNodeMountPoints = jest.spyOn(
  helper,
  "useBuilderNodeMountPoints"
);

describe("MicroViewEditor", () => {
  it("should show untitled page", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "micro-view",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    mockUseBuilderNodeMountPoints.mockReturnValueOnce([]);
    const wrapper = shallow(<MicroViewEditor nodeUid={1} />);
    expect(wrapper.find(".pageTitle.untitled").length).toBe(1);
  });

  it("should show page title", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "micro-view",
      alias: "my-brick",
      $$parsedProperties: {
        pageTitle: "Hello World",
      },
    });
    mockUseBuilderNodeMountPoints.mockReturnValueOnce([]);
    const wrapper = shallow(<MicroViewEditor nodeUid={1} />);
    expect(wrapper.find(".pageTitle.untitled").length).toBe(0);
    expect(wrapper.find(".pageTitle").text()).toBe("Hello World");
  });

  it("should show page title with an I18N evaluation", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "micro-view",
      alias: "my-brick",
      $$parsedProperties: {
        pageTitle: "<% I18N('HELLO_WORLD') %>",
      },
    });
    mockUseBuilderNodeMountPoints.mockReturnValueOnce([]);
    const wrapper = shallow(<MicroViewEditor nodeUid={1} />);
    expect(wrapper.find(".pageTitle.untitled").length).toBe(0);
    expect(wrapper.find(".pageTitle").text()).toBe("HELLO_WORLD");
  });

  it("should show page title with an unknown evaluation", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "micro-view",
      alias: "my-brick",
      $$parsedProperties: {
        pageTitle: "<% CTX.pageTitle %>",
      },
    });
    mockUseBuilderNodeMountPoints.mockReturnValueOnce([]);
    const wrapper = shallow(<MicroViewEditor nodeUid={1} />);
    expect(wrapper.find(".pageTitle.untitled").length).toBe(0);
    expect(wrapper.find(".pageTitle").text()).toBe("<% … %>");
  });

  it("should show titleBar and other minor slots", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "micro-view",
      alias: "my-brick",
      $$parsedProperties: {
        pageTitle: "<% CTX.pageTitle %>",
      },
    });
    mockUseBuilderNodeMountPoints.mockReturnValueOnce(["titleBar", "banner"]);
    const wrapper = shallow(<MicroViewEditor nodeUid={1} />);
    expect(wrapper.find(".pageTitle").length).toBe(0);
    expect(
      wrapper
        .find(helper.SlotContainer)
        .filterWhere((wrp) => wrp.prop("slotName") === "titleBar").length
    ).toBe(1);
    expect(
      wrapper
        .find(helper.SlotContainer)
        .filterWhere((wrp) => wrp.prop("slotName") === "banner").length
    ).toBe(1);
  });
});
