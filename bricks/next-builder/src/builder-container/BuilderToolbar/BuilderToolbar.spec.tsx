import React from "react";
import { shallow } from "enzyme";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import * as helper from "@next-core/editor-bricks-helper";
import { BuilderToolbar } from "./BuilderToolbar";
import { useBuilderUIContext } from "../BuilderUIContext";
import { BuilderDataType } from "../interfaces";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");

jest.mock("../BuilderUIContext");

const mockUseBuilderUIContext = useBuilderUIContext as jest.MockedFunction<
  typeof useBuilderUIContext
>;

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
    mockUseBuilderUIContext.mockReturnValue({
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
    expect(wrapper.find(".tabLink").length).toBe(4);
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
    mockUseBuilderUIContext.mockReturnValue({
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
    expect(wrapper.find(".tabLink").length).toBe(4);
  });

  it("should enter fullscreen", () => {
    let fullscreen = false;
    const setFullscreen = jest.fn((update) => {
      fullscreen = update(fullscreen);
    });
    mockUseBuilderUIContext.mockImplementation(() => ({
      fullscreen,
      setFullscreen,
    }));
    const wrapper = shallow(<BuilderToolbar />);
    expect(wrapper.find(FullscreenOutlined).length).toBe(1);
    expect(wrapper.find(FullscreenExitOutlined).length).toBe(0);
    wrapper.find(".tabLink[data-testid='toggle-fullscreen']").invoke("onClick")(
      null
    );
    expect(setFullscreen).toBeCalled();
    expect(fullscreen).toBe(true);
  });

  it("should exit fullscreen", () => {
    let fullscreen = true;
    const setFullscreen = jest.fn((update) => {
      fullscreen = update(fullscreen);
    });
    mockUseBuilderUIContext.mockImplementation(() => ({
      fullscreen,
      setFullscreen,
    }));
    const wrapper = shallow(<BuilderToolbar />);
    expect(wrapper.find(FullscreenOutlined).length).toBe(0);
    expect(wrapper.find(FullscreenExitOutlined).length).toBe(1);
    wrapper.find(".tabLink[data-testid='toggle-fullscreen']").invoke("onClick")(
      null
    );
    expect(setFullscreen).toBeCalled();
    expect(fullscreen).toBe(false);
  });
});
