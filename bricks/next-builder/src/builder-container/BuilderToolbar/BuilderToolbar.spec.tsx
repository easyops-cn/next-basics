import React from "react";
import { shallow } from "enzyme";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { Tooltip, Switch } from "antd";
import * as helper from "@next-core/editor-bricks-helper";
import { BuilderToolbar } from "./BuilderToolbar";
import { LibraryDropdown } from "../LibraryDropdown/LibraryDropdown";
import { useBuilderUIContext } from "../BuilderUIContext";
import { BuilderDataType } from "../interfaces";

import { getRuntime } from "@next-core/brick-kit";

const mockUseBuilderNode = jest.spyOn(helper, "useBuilderNode");
const mockUseBuilderData = jest
  .spyOn(helper, "useBuilderData")
  .mockReturnValue({
    wrapper: null,
  } as any);

jest.mock("../BuilderUIContext");
jest.mock("@next-core/brick-kit");

(getRuntime as jest.Mock).mockReturnValue({
  getFeatureFlags: jest
    .fn()
    .mockReturnValue({ "next-builder-layer-view": false }),
});

const mockUseBuilderUIContext = useBuilderUIContext as jest.MockedFunction<
  typeof useBuilderUIContext
>;

const [
  mockCurrentSnippetClick,
  mockCurrentTemplateClick,
  mockCurrentRouteClick,
  mockBuildAndPush,
  mockPreview,
  mockSetHiddenWrapper,
] = [jest.fn(), jest.fn(), jest.fn(), jest.fn(), jest.fn(), jest.fn()];

describe("BuilderToolbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
    expect(wrapper.find(".tabLink").length).toBe(6);
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
      onCurrentTemplateClick: mockCurrentTemplateClick,
      onCurrentSnippetClick: mockCurrentSnippetClick,
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
    expect(wrapper.find(".tabLink").length).toBe(6);
    expect(
      wrapper.find(".tabLink").filter("[data-testid='view-template']").length
    ).toBe(1);
    wrapper
      .find(".tabLink")
      .filter("[data-testid='view-template']")
      .simulate("click");
    expect(mockCurrentTemplateClick).toBeCalled();
  });

  it("should work with snippet", async () => {
    mockUseBuilderUIContext.mockReturnValue({
      onCurrentTemplateClick: mockCurrentTemplateClick,
      onCurrentSnippetClick: mockCurrentSnippetClick,
      onCurrentRouteClick: mockCurrentRouteClick,
      onBuildAndPush: mockBuildAndPush,
      onPreview: mockPreview,
      dataType: BuilderDataType.SNIPPET,
    });
    mockUseBuilderNode.mockReturnValue({
      id: "S-01",
      type: "snippet",
      snippetId: "snippet-test",
    });
    const wrapper = shallow(<BuilderToolbar />);
    expect(wrapper.find(".tabLink").length).toBe(6);
    expect(
      wrapper.find(".tabLink").filter("[data-testid='view-snippet']").length
    ).toBe(1);
    wrapper
      .find(".tabLink")
      .filter("[data-testid='view-snippet']")
      .simulate("click");
    expect(mockCurrentSnippetClick).toBeCalled();
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

  it("should invoke onWorkbenchClose", () => {
    const onWorkbenchClose = jest.fn();
    mockUseBuilderUIContext.mockImplementation(() => ({
      onWorkbenchClose,
    }));
    const wrapper = shallow(<BuilderToolbar />);
    wrapper.find(".tabLink[data-testid='workbench-close']").invoke("onClick")(
      null
    );
    expect(onWorkbenchClose).toBeCalled();
  });

  it("should show layer viewer ", () => {
    (getRuntime as jest.Mock).mockReturnValueOnce({
      getFeatureFlags: jest
        .fn()
        .mockReturnValue({ "next-builder-layer-view": true }),
    });

    const wrapper = shallow(<BuilderToolbar />);
    expect(wrapper.find(LibraryDropdown).length).toEqual(3);
    wrapper.find(LibraryDropdown).at(0).invoke("onVisbleChange")(true);
    wrapper.find(LibraryDropdown).at(1).invoke("onVisbleChange")(true);
    wrapper.find(LibraryDropdown).at(2).invoke("onVisbleChange")(true);
    const tooltipWrapper = wrapper.find(LibraryDropdown).at(0).shallow();
    expect(tooltipWrapper.find(Tooltip).at(0).prop("overlayStyle")).toEqual({
      display: "none",
    });
  });

  it("should show the hidden wrapper switch", () => {
    mockUseBuilderUIContext.mockReturnValue({
      onCurrentRouteClick: mockCurrentRouteClick,
      onBuildAndPush: mockBuildAndPush,
      onPreview: mockPreview,
      dataType: BuilderDataType.ROUTE_OF_BRICKS,
      hiddenWrapper: true,
      setHiddenWrapper: mockSetHiddenWrapper,
    });
    mockUseBuilderNode.mockReturnValue({
      id: "R-01",
      type: "bricks",
      path: "/",
    });
    mockUseBuilderData.mockReturnValue({
      wrapperNode: {
        $$uid: 1,
      },
    } as any);
    const wrapper = shallow(<BuilderToolbar />);
    expect(wrapper.find(Switch).length).toBe(1);
    wrapper.find(Switch).prop("onChange")(true, {} as MouseEvent);
    expect(mockSetHiddenWrapper).toBeCalled();
  });
});
