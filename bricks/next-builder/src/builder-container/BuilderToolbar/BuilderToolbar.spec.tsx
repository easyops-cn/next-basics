import React from "react";
import { shallow } from "enzyme";
import { BuilderToolbar } from "./BuilderToolbar";
import { useBuilderUIContext } from "../BuilderUIContext";
import * as helper from "@next-core/editor-bricks-helper";
import { BuilderDataType } from "../interfaces";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

jest.mock("../BuilderUIContext");

const [mockCurrentRouteClick, mockBuildAndPush, mockPreview] = [
  jest.fn(),
  jest.fn(),
  jest.fn(),
];

describe("BuilderToolbar", () => {
  beforeEach(() => {
    mockCurrentRouteClick.mockClear();
    mockBuildAndPush.mockClear();
    mockPreview.mockClear();
  });

  it("should work", async () => {
    (useBuilderUIContext as jest.Mock).mockReturnValue({
      onCurrentRouteClick: mockCurrentRouteClick,
      onBuildAndPush: mockBuildAndPush,
      onPreview: mockPreview,
      dataType: BuilderDataType.ROUTE_OF_BRICKS,
    });
    mockUseBuilderNode.mockReturnValue({
      id: "R-01",
      type: "bricks",
      path: "/",
    });
    const wrapper = shallow(<BuilderToolbar />);
    expect(wrapper.find(".tabLink").length).toBe(3);
    wrapper.find(".tabLink[data-testid='view-route']").simulate("click");
    expect(mockCurrentRouteClick).toBeCalledWith({
      id: "R-01",
      type: "bricks",
      path: "/",
    });
    wrapper.find(".tabLink[data-testid='build-and-push']").simulate("click");
    expect(mockBuildAndPush).toBeCalled();
    wrapper.find(".tabLink[data-testid='preview']").simulate("click");
    expect(mockPreview).toBeCalled();
  });

  it("should work with custom template", async () => {
    (useBuilderUIContext as jest.Mock).mockReturnValue({
      onCurrentRouteClick: mockCurrentRouteClick,
      onBuildAndPush: mockBuildAndPush,
      onPreview: mockPreview,
      dataType: BuilderDataType.CUSTOM_TEMPLATE,
    });
    mockUseBuilderNode.mockReturnValue({
      id: "T-01",
      type: "custom-template",
      templateId: "tpl-test",
    });
    const wrapper = shallow(<BuilderToolbar />);
    expect(wrapper.find(".tabLink").length).toBe(2);
  });
});
