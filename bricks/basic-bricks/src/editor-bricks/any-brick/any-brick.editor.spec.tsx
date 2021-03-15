import React from "react";
import { shallow } from "enzyme";
import * as helper from "@next-core/editor-bricks-helper";
import { AnyBrickEditor } from "./any-brick.editor";
import { SlotContainer } from "@next-core/editor-bricks-helper";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");
const mockUseBuilderNodeMountPoints = jest
  .spyOn(helper, "useBuilderNodeMountPoints")
  .mockReturnValue([]);

describe("AnyBrickEditor", () => {
  it("should show default brick", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "any-brick",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<AnyBrickEditor nodeUid={1} />);
    expect(wrapper.find(".wrapper").hasClass("default")).toBe(true);
    expect(wrapper.find(".icon").length).toBe(0);
    expect(wrapper.find(".name").text()).toBe("my-brick");
  });

  it("should show provider brick by type", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "provider",
      id: "B-001",
      brick: "any-provider",
      alias: "my-provider",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<AnyBrickEditor nodeUid={1} />);
    expect(wrapper.find(".wrapper").hasClass("provider")).toBe(true);
    expect(wrapper.find(".wrapper").hasClass("noChildren")).toBe(true);
    expect(wrapper.find(".icon").length).toBe(1);
    expect(wrapper.find(".name").text()).toBe("my-provider");
  });

  it("should show provider brick by bg", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      bg: true,
      brick: "any-provider",
      alias: "my-provider",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<AnyBrickEditor nodeUid={1} />);
    expect(wrapper.find(".wrapper").hasClass("provider")).toBe(true);
    expect(wrapper.find(".icon").length).toBe(1);
    expect(wrapper.find(".name").text()).toBe("my-provider");
  });

  it("should show legacy template", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "template",
      id: "B-001",
      brick: "any-template",
      alias: "my-template",
      $$parsedProperties: {},
    });
    const wrapper = shallow(<AnyBrickEditor nodeUid={1} />);
    expect(wrapper.find(".wrapper").hasClass("template")).toBe(true);
    expect(wrapper.find(".icon").length).toBe(1);
    expect(wrapper.find(".name").text()).toBe("my-template");
  });

  it("should show portal brick", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "any-portal",
      alias: "my-portal",
      portal: true,
      $$parsedProperties: {},
    });
    const wrapper = shallow(<AnyBrickEditor nodeUid={1} />);
    expect(wrapper.find(".wrapper").hasClass("portal")).toBe(true);
    expect(wrapper.find(".icon").length).toBe(1);
    expect(wrapper.find(".name").text()).toBe("my-portal");
  });

  it("should show mount points if has children", () => {
    mockUseBuilderNode.mockReturnValueOnce({
      type: "brick",
      id: "B-001",
      brick: "any-brick",
      alias: "my-brick",
      $$parsedProperties: {},
    });
    mockUseBuilderNodeMountPoints.mockReturnValueOnce(["toolbar", "content"]);
    const wrapper = shallow(<AnyBrickEditor nodeUid={1} />);
    expect(wrapper.find(".wrapper").hasClass("hasChildren")).toBe(true);
    expect(wrapper.find(SlotContainer).length).toBe(2);
  });
});
