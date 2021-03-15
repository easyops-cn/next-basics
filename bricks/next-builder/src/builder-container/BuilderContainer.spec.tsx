import React from "react";
import { mount } from "enzyme";
import { useBuilderDataManager } from "@next-core/editor-bricks-helper";
import { BuilderContainer } from "./BuilderContainer";
import { BuilderDataType, ToolboxTab } from "./interfaces";
import { BuilderCanvas } from "./BuilderCanvas/BuilderCanvas";

jest.mock("@next-core/editor-bricks-helper");
jest.mock("./BuilderToolbox/BuilderToolbox", () => ({
  BuilderToolbox() {
    return <div>BuilderToolbox</div>;
  },
}));
jest.mock("./BuilderToolbar/BuilderToolbar", () => ({
  BuilderToolbar() {
    return <div>BuilderToolbar</div>;
  },
}));
jest.mock("./BuilderCanvas/BuilderCanvas", () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useBuilderUIContext } = require("./BuilderUIContext");
  return {
    BuilderCanvas() {
      const { dataType } = useBuilderUIContext();
      return <div>BuilderCanvas({dataType})</div>;
    },
  };
});
jest.mock("./BuilderContextMenu/BuilderContextMenu", () => ({
  BuilderContextMenu() {
    return <div>BuilderContextMenu</div>;
  },
}));

const mockConsoleError = jest
  .spyOn(console, "error")
  .mockImplementation(() => void 0);

const mockRemoveListenersOfNodeAdd = jest.fn();
const mockRemoveListenersOfNodeMove = jest.fn();
const mockRemoveListenersOfNodeReorder = jest.fn();
const mockRemoveListenersOfNodeClick = jest.fn();

const mockManager = {
  onNodeAdd: jest.fn(() => mockRemoveListenersOfNodeAdd),
  onNodeMove: jest.fn(() => mockRemoveListenersOfNodeMove),
  onNodeReorder: jest.fn(() => mockRemoveListenersOfNodeReorder),
  onNodeClick: jest.fn(() => mockRemoveListenersOfNodeClick),
  dataInit: jest.fn(),
  routeListInit: jest.fn(),
};
(useBuilderDataManager as jest.Mock).mockReturnValue(mockManager);

describe("BuilderContainer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work", () => {
    const ref = React.createRef<any>();
    const wrapper = mount(
      <BuilderContainer
        ref={ref}
        dataSource={[
          {
            type: "bricks",
            path: "/home",
            id: "B-001",
          },
        ]}
      />
    );
    expect(ref.current).toBe(mockManager);
    expect(wrapper.find(".builderContainer").prop("className")).not.toContain(
      "fullscreen"
    );
    expect(mockManager.onNodeAdd).toBeCalled();
    expect(mockManager.onNodeMove).toBeCalled();
    expect(mockManager.onNodeReorder).toBeCalled();
    expect(mockManager.onNodeClick).toBeCalled();
    expect(mockManager.dataInit).toBeCalledWith({
      type: "bricks",
      path: "/home",
      id: "B-001",
    });
    expect(mockConsoleError).not.toBeCalled();
    expect(wrapper.find(BuilderCanvas).text()).toBe(
      `BuilderCanvas(${BuilderDataType.ROUTE_OF_BRICKS})`
    );
    wrapper.unmount();
    expect(mockRemoveListenersOfNodeAdd).toBeCalled();
    expect(mockRemoveListenersOfNodeMove).toBeCalled();
    expect(mockRemoveListenersOfNodeReorder).toBeCalled();
    expect(mockRemoveListenersOfNodeClick).toBeCalled();
  });

  it("should work for route of routes", () => {
    const wrapper = mount(
      <BuilderContainer
        dataSource={[
          {
            type: "routes",
            path: "/",
            id: "B-001",
          },
        ]}
      />
    );
    expect(mockManager.dataInit).toBeCalledWith({
      type: "routes",
      path: "/",
      id: "B-001",
    });
    expect(mockConsoleError).not.toBeCalled();
    expect(wrapper.find(BuilderCanvas).text()).toBe(
      `BuilderCanvas(${BuilderDataType.ROUTE_OF_ROUTES})`
    );
  });

  it("should work for route of redirect", () => {
    const wrapper = mount(
      <BuilderContainer
        dataSource={[
          {
            type: "redirect",
            path: "/",
            id: "B-001",
          },
        ]}
      />
    );
    expect(mockManager.dataInit).toBeCalledWith({
      type: "redirect",
      path: "/",
      id: "B-001",
    });
    expect(mockConsoleError).not.toBeCalled();
    expect(wrapper.find(BuilderCanvas).text()).toBe(
      `BuilderCanvas(${BuilderDataType.ROUTE_OF_REDIRECT})`
    );
  });

  it("should work for custom template", () => {
    const wrapper = mount(
      <BuilderContainer
        dataSource={[
          {
            type: "custom-template",
            templateId: "tpl-test",
            id: "B-001",
          },
        ]}
      />
    );
    expect(mockManager.dataInit).toBeCalledWith({
      type: "custom-template",
      templateId: "tpl-test",
      id: "B-001",
    });
    expect(mockConsoleError).not.toBeCalled();
    expect(wrapper.find(BuilderCanvas).text()).toBe(
      `BuilderCanvas(${BuilderDataType.CUSTOM_TEMPLATE})`
    );
  });

  it("should warn if data source is unknown", () => {
    mount(
      <BuilderContainer
        dataSource={[
          {
            type: "brick",
            brick: "my-brick",
            id: "B-001",
          },
        ]}
      />
    );
    expect(mockManager.dataInit).not.toBeCalled();
    expect(mockConsoleError).toBeCalled();
  });

  it("should warn if data source is empty", () => {
    mount(<BuilderContainer dataSource={[]} />);
    expect(mockManager.dataInit).not.toBeCalled();
    expect(mockConsoleError).toBeCalled();
  });

  it("should enter fullscreen", () => {
    const onToggleFullscreen = jest.fn();
    const wrapper = mount(
      <BuilderContainer
        initialFullscreen
        onToggleFullscreen={onToggleFullscreen}
      />
    );
    expect(wrapper.find(".builderContainer").prop("className")).toContain(
      "fullscreen"
    );
    expect(onToggleFullscreen).toBeCalledWith(true);
  });

  it("should switch toolbox tab", () => {
    const onSwitchToolboxTab = jest.fn();
    mount(
      <BuilderContainer
        initialToolboxTab={ToolboxTab.EVENTS_VIEW}
        onSwitchToolboxTab={onSwitchToolboxTab}
      />
    );
    expect(onSwitchToolboxTab).toBeCalledWith(ToolboxTab.EVENTS_VIEW);
  });
});
