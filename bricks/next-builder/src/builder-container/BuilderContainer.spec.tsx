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
      const { dataType, canvasIndex } = useBuilderUIContext();
      return (
        <div>
          BuilderCanvas({dataType},{canvasIndex})
        </div>
      );
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
const mockRemoveListenersOfSnippetApply = jest.fn();

const mockManager = {
  onNodeAdd: jest.fn(() => mockRemoveListenersOfNodeAdd),
  onNodeMove: jest.fn(() => mockRemoveListenersOfNodeMove),
  onNodeReorder: jest.fn(() => mockRemoveListenersOfNodeReorder),
  onNodeClick: jest.fn(() => mockRemoveListenersOfNodeClick),
  onSnippetApply: jest.fn(() => mockRemoveListenersOfSnippetApply),
  dataInit: jest.fn(),
  sharedEditorListInit: jest.fn(),
  storyListInit: jest.fn(),
  getData: jest.fn(() => ({
    rootId: "root",
    nodes: [],
    edges: [],
  })),
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
    expect(mockManager.storyListInit).toBeCalled();
    expect(mockManager.dataInit).toBeCalledWith({
      type: "bricks",
      path: "/home",
      id: "B-001",
    });
    expect(mockConsoleError).not.toBeCalled();
    expect(wrapper.find(BuilderCanvas).text()).toBe(
      `BuilderCanvas(${BuilderDataType.ROUTE_OF_BRICKS},0)`
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
      `BuilderCanvas(${BuilderDataType.ROUTE_OF_ROUTES},0)`
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
        initialCanvasIndex={0}
      />
    );
    expect(mockManager.dataInit).toBeCalledWith({
      type: "redirect",
      path: "/",
      id: "B-001",
    });
    expect(mockConsoleError).not.toBeCalled();
    expect(wrapper.find(BuilderCanvas).text()).toBe(
      `BuilderCanvas(${BuilderDataType.ROUTE_OF_REDIRECT},0)`
    );
  });

  it("should work for custom template", () => {
    mockManager.getData.mockReturnValueOnce({
      rootId: "root",
      nodes: [
        {
          $$uid: 1,
          portal: true,
        },
      ],
      edges: [
        {
          parent: "root",
          child: 1,
        },
      ],
    });
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
      `BuilderCanvas(${BuilderDataType.CUSTOM_TEMPLATE},1)`
    );
  });

  it("should work for snippet", () => {
    mockManager.getData.mockReturnValueOnce({
      rootId: "root",
      nodes: [
        {
          $$uid: 1,
          portal: true,
        },
      ],
      edges: [
        {
          parent: "root",
          child: 1,
        },
      ],
    });
    const wrapper = mount(
      <BuilderContainer
        dataSource={[
          {
            type: "snippet",
            snippetId: "snippet-test",
            id: "S-001",
          },
        ]}
      />
    );
    expect(mockManager.dataInit).toBeCalledWith({
      type: "snippet",
      snippetId: "snippet-test",
      id: "S-001",
    });
    expect(mockConsoleError).not.toBeCalled();
    expect(wrapper.find(BuilderCanvas).text()).toBe(
      `BuilderCanvas(${BuilderDataType.SNIPPET},1)`
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

  it("should invoke onWorkbenchClose when click overlay", () => {
    const onWorkbenchClose = jest.fn();
    const wrapper = mount(
      <BuilderContainer onWorkbenchClose={onWorkbenchClose} />
    );
    wrapper.find(".builderOverlay").invoke("onClick")(null);
    expect(onWorkbenchClose).toBeCalled();
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
