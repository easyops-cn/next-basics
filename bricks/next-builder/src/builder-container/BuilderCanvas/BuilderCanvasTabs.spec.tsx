import React from "react";
import { shallow } from "enzyme";
import { BuilderCanvasTabs } from "./BuilderCanvasTabs";
import { BuilderCanvasType } from "../interfaces";
import { useBuilderUIContext, ContextOfBuilderUI } from "../BuilderUIContext";

jest.mock("../BuilderUIContext");

const mockUseBuilderUIContext = useBuilderUIContext as jest.MockedFunction<
  typeof useBuilderUIContext
>;

describe("BuilderCanvasTabs", () => {
  it("should work when canvas type is null", () => {
    const ctx: ContextOfBuilderUI = {
      canvasType: null,
    };
    mockUseBuilderUIContext.mockReturnValueOnce(ctx);
    const wrapper = shallow(<BuilderCanvasTabs />);
    expect(wrapper.find(".active").length).toBe(0);
  });

  it("should work when canvas type is main", () => {
    const ctx: ContextOfBuilderUI = {
      canvasType: BuilderCanvasType.MAIN,
      setCanvasType: jest.fn(),
    };
    mockUseBuilderUIContext.mockReturnValueOnce(ctx);
    const wrapper = shallow(<BuilderCanvasTabs />);
    expect(wrapper.find(".active").text()).toBe("CANVAS_TYPE_MAIN");
    wrapper.find("li:not(.active)").invoke("onClick")(null);
    expect(ctx.setCanvasType).toBeCalledWith(BuilderCanvasType.PORTAL);
  });

  it("should work when canvas type is portal", () => {
    const ctx: ContextOfBuilderUI = {
      canvasType: BuilderCanvasType.PORTAL,
      setCanvasType: jest.fn(),
    };
    mockUseBuilderUIContext.mockReturnValueOnce(ctx);
    const wrapper = shallow(<BuilderCanvasTabs />);
    expect(wrapper.find(".active").text()).toBe("CANVAS_TYPE_PORTAL");
    wrapper.find("li:not(.active)").invoke("onClick")(null);
    expect(ctx.setCanvasType).toBeCalledWith(BuilderCanvasType.MAIN);
  });
});
