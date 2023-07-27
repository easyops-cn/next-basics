import React from "react";
import { mount } from "enzyme";
import * as brickKit from "@next-core/brick-kit";
import {
  EventDetailOfNodeAdd,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";
import { BuilderContainer } from "./BuilderContainer";
import { BuilderDataType, ToolboxTab } from "./interfaces";
import { BuilderCanvas } from "./BuilderCanvas/BuilderCanvas";
import { InstallExpandInfo } from "./BuilderContainer";

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

const getFeatureFlags = jest.fn().mockReturnValue({});
jest.spyOn(brickKit, "getRuntime").mockReturnValue({
  getFeatureFlags,
} as any);

const mockInstall = jest.fn();
const mockGetStoryList = jest.fn();
jest.mock("../data-providers/utils/StoriesCache", () => ({
  StoriesCache: {
    getInstance: () => ({
      hasInstalled: (isInstall: boolean) => {
        return !+isInstall;
      },
      install: mockInstall,
      getStoryList: mockGetStoryList,
    }),
  },
}));

const mockRemoveListenersOfNodeAdd = jest.fn();
const mockRemoveListenersOfNodeMove = jest.fn();
const mockRemoveListenersOfNodeReorder = jest.fn();
const mockRemoveListenersOfNodeClick = jest.fn();
const mockRemoveListenersOfSnippetApply = jest.fn();
const mockUpdateBrick = jest.fn();

const mockManager = {
  onNodeAdd: jest.fn(() => mockRemoveListenersOfNodeAdd),
  onNodeMove: jest.fn(() => mockRemoveListenersOfNodeMove),
  onNodeReorder: jest.fn(() => mockRemoveListenersOfNodeReorder),
  onNodeClick: jest.fn(() => mockRemoveListenersOfNodeClick),
  onSnippetApply: jest.fn(() => mockRemoveListenersOfSnippetApply),
  dataInit: jest.fn(),
  sharedEditorListInit: jest.fn(),
  storyListInit: jest.fn(),
  updateBrick: mockUpdateBrick,
  getData: jest.fn(() => ({
    rootId: "root",
    nodes: [],
    edges: [],
  })),
} as any;
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
        migrateClipboard
        dataSource={[
          {
            type: "bricks",
            path: "/home",
            id: "B-001",
          },
        ]}
        templateSources={[
          {
            type: "custom-template",
            templateId: "tpl-basic-view",
            id: "T-001",
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
    expect(mockManager.dataInit).toBeCalledWith(
      {
        type: "bricks",
        path: "/home",
        id: "B-001",
      },
      new Map([
        [
          "tpl-basic-view",
          {
            type: "custom-template",
            templateId: "tpl-basic-view",
            id: "T-001",
          },
        ],
      ])
    );
    expect(mockConsoleError).not.toBeCalled();
    expect(wrapper.find(BuilderCanvas).text()).toBe(
      `BuilderCanvas(${BuilderDataType.ROUTE_OF_BRICKS},0)`
    );
    wrapper.unmount();
    expect(mockRemoveListenersOfNodeAdd).toBeCalled();
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
    expect(mockManager.dataInit).toBeCalledWith(
      {
        type: "routes",
        path: "/",
        id: "B-001",
      },
      undefined
    );
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
    expect(mockManager.dataInit).toBeCalledWith(
      {
        type: "redirect",
        path: "/",
        id: "B-001",
      },
      undefined
    );
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
    expect(mockManager.dataInit).toBeCalledWith(
      {
        type: "custom-template",
        templateId: "tpl-test",
        id: "B-001",
      },
      undefined
    );
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
    expect(mockManager.dataInit).toBeCalledWith(
      {
        type: "snippet",
        snippetId: "snippet-test",
        id: "S-001",
      },
      undefined
    );
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

describe("InstallExpandInfo should work", () => {
  it("feature flag return false", () => {
    getFeatureFlags.mockImplementation(() => ({
      "next-builder-stories-json-lazy-loading": false,
    }));
    InstallExpandInfo(
      {
        detail: {
          nodeData: {
            brick: "0",
          },
        },
      } as CustomEvent<EventDetailOfNodeAdd>,
      mockManager
    );
    expect(mockInstall).toBeCalledTimes(0);
  });

  it("feature flag return true and brick had installed", () => {
    getFeatureFlags.mockImplementation(() => ({
      "next-builder-stories-json-lazy-loading": true,
    }));
    InstallExpandInfo(
      {
        detail: {
          nodeData: {
            brick: "0",
          },
        },
      } as CustomEvent<EventDetailOfNodeAdd>,
      mockManager
    );
    expect(mockInstall).toBeCalledTimes(0);
    expect(mockGetStoryList).toBeCalledTimes(0);
  });

  describe("feature flag return true", () => {
    getFeatureFlags.mockImplementation(() => ({
      "next-builder-stories-json-lazy-loading": true,
    }));
    let updateBrick: any;
    mockUpdateBrick.mockImplementation((args) => {
      updateBrick = args;
    });
    it("brick unInstalled but response was undefiend", async () => {
      mockInstall.mockImplementation(() => []);
      await InstallExpandInfo(
        {
          detail: {
            nodeData: {
              brick: "1",
            },
          },
        } as CustomEvent<EventDetailOfNodeAdd>,
        mockManager
      );
      expect(mockInstall).toBeCalledTimes(1);
      expect(updateBrick).toBeUndefined();
    });

    it("had response but don't had originData", async () => {
      mockInstall.mockImplementation(() => [
        {
          storyId: 1,
          originData: null,
        },
      ]);
      await InstallExpandInfo(
        {
          detail: {
            nodeData: {
              brick: "1",
            },
          },
        } as CustomEvent<EventDetailOfNodeAdd>,
        mockManager
      );
      expect(mockInstall).toBeCalledTimes(2);
      expect(updateBrick).toBeUndefined();
    });

    it("had response and had originData", async () => {
      mockInstall.mockImplementation(() => [
        {
          storyId: 1,
          originData: [{ id: 2 }],
        },
      ]);
      await InstallExpandInfo(
        {
          detail: {
            nodeData: {
              brick: "1",
            },
          },
        } as CustomEvent<EventDetailOfNodeAdd>,
        mockManager
      );
      expect(mockInstall).toBeCalledTimes(3);
      expect(updateBrick).toEqual({
        nodeData: {
          brick: "1",
        },
      });
    });
  });
});
