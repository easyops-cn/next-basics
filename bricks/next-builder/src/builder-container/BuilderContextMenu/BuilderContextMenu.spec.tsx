import React from "react";
import { mount, shallow } from "enzyme";
import { Menu } from "antd";
import {
  useBuilderContextMenuStatus,
  useBuilderDataManager,
  useBuilderData,
  isBrickNode,
  isRouteNode,
} from "@next-core/editor-bricks-helper";
import { BuilderContextMenu } from "./BuilderContextMenu";
import { useBuilderUIContext } from "../BuilderUIContext";
import {
  BuilderClipboard,
  BuilderClipboardType,
  ToolboxTab,
} from "../interfaces";

jest.mock("@next-core/editor-bricks-helper");
jest.mock("../BuilderUIContext");
jest.mock("./useCanPaste", () => ({
  useCanPaste: () => (clipboard: BuilderClipboard) => !!clipboard,
}));

const mockUseBuilderContextMenuStatus =
  useBuilderContextMenuStatus as jest.MockedFunction<
    typeof useBuilderContextMenuStatus
  >;

let clipboard: BuilderClipboard;
const legacySetClipboard = jest.fn();
const setToolboxTab = jest.fn();
const setEventStreamNodeId = jest.fn();
const onConvertToTemplate = jest.fn();
const onRouteSelect = jest.fn();
let migrateClipboard = false;
(
  useBuilderUIContext as jest.MockedFunction<typeof useBuilderUIContext>
).mockImplementation(() => ({
  clipboard,
  migrateClipboard,
  legacySetClipboard,
  setToolboxTab,
  setEventStreamNodeId,
  onConvertToTemplate,
  onRouteSelect,
}));

(isBrickNode as jest.MockedFunction<typeof isBrickNode>).mockImplementation(
  (node) => node.type === "brick"
);

(isRouteNode as jest.MockedFunction<typeof isRouteNode>).mockImplementation(
  (node) => node.type === "bricks"
);

const mockManager = {
  contextMenuChange: jest.fn(),
  getData: jest.fn(() => ({
    edges: [
      {
        child: 1,
        parent: 2,
      },
      {
        child: 3,
        parent: 1,
      },
    ],
  })),
};
(useBuilderDataManager as jest.Mock).mockReturnValue(mockManager);

(useBuilderData as jest.Mock).mockReturnValue({
  rootId: 1000,
});

jest
  .spyOn(document.documentElement, "clientWidth", "get")
  .mockReturnValue(1280);
jest
  .spyOn(document.documentElement, "clientHeight", "get")
  .mockReturnValue(800);

describe("BuilderContextMenu", () => {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
  beforeEach(() => {
    clipboard = null;
    migrateClipboard = false;
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 100,
      height: 400,
    })) as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  it("should display nothing if context menu is not active", () => {
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: false,
    });
    const wrapper = mount(<BuilderContextMenu />);
    expect(wrapper.find(".menuWrapper").prop("style").display).toBe("none");
    expect(wrapper.find(".menuWrapper").text()).toBe("");
  });

  it("should show menu for bricks if context menu is active", () => {
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: true,
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
      },
      x: 200,
      y: 300,
    });
    const wrapper = mount(<BuilderContextMenu />);

    expect(wrapper.find(".menuWrapper").prop("style").display).toBe("block");

    expect(wrapper.find(Menu).prop("style")).toMatchObject({
      left: 200,
      top: 300,
    });

    const menuItems = wrapper.find(Menu.Item);
    expect(menuItems.length).toBe(8);
    menuItems.forEach((item) => {
      switch (item.key()) {
        case "events-view":
          expect(item.prop("disabled")).toBeFalsy();
          break;
        case "copy":
        case "cut":
          expect(item.prop("disabled")).toBe(false);
          break;
        case "paste":
          expect(item.prop("disabled")).toBe(true);
          break;
        case "convert-to-template":
        case "append-brick":
        case "append-route":
        case "delete":
          break;
        default:
          throw new Error(`should not contain ${item.key()}`);
      }
    });
  });

  it("should keep menu in viewport", () => {
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: true,
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
      },
      x: 1200,
      y: 600,
    });
    const wrapper = mount(<BuilderContextMenu />);

    expect(wrapper.find(Menu).prop("style")).toMatchObject({
      left: 1100,
      top: 200,
    });
  });

  it("should close menu when click the delete menu item", () => {
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: true,
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
      },
    });
    const wrapper = shallow(<BuilderContextMenu />);
    const mockEvent = {
      preventDefault: jest.fn(),
    } as any;
    wrapper.find(".menuWrapper").invoke("onClick")(mockEvent);
    expect(mockEvent.preventDefault).toBeCalled();
    expect(mockManager.contextMenuChange).toBeCalledWith({
      active: false,
    });
  });

  it("should close menu when click", () => {
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: true,
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
      },
    });
    const wrapper = shallow(<BuilderContextMenu />);
    const mockEvent = {
      preventDefault: jest.fn(),
    } as any;
    wrapper.find(".menuWrapper").invoke("onClick")(mockEvent);
    expect(mockEvent.preventDefault).toBeCalled();
    expect(mockManager.contextMenuChange).toBeCalledWith({
      active: false,
    });
  });

  it("should close menu when right click", () => {
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: true,
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
      },
    });
    const wrapper = shallow(<BuilderContextMenu />);
    const mockEvent = {
      preventDefault: jest.fn(),
    } as any;
    wrapper.find(".menuWrapper").invoke("onContextMenu")(mockEvent);
    expect(mockEvent.preventDefault).toBeCalled();
    expect(mockManager.contextMenuChange).toBeCalledWith({
      active: false,
    });
  });

  it("should show menu for root of route", () => {
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: true,
      node: {
        $$uid: 1000,
        type: "bricks",
        path: "/",
        id: "B-001",
      },
    });
    const wrapper = shallow(<BuilderContextMenu />);
    const menuItems = wrapper.find(Menu.Item);
    expect(menuItems.length).toBe(3);
    menuItems.forEach((item) => {
      switch (item.key()) {
        case "copy":
        case "cut":
        case "paste":
          expect(item.prop("disabled")).toBe(true);
          break;
        default:
          throw new Error(`should not contain ${item.key()}`);
      }
    });
  });

  it("should show menu for non-root of route", () => {
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: true,
      node: {
        $$uid: 1,
        type: "bricks",
        path: "/",
        id: "B-001",
      },
    });
    const wrapper = shallow(<BuilderContextMenu />);
    const menuItems = wrapper.find(Menu.Item);
    expect(menuItems.length).toBe(6);
    menuItems.forEach((item) => {
      switch (item.key()) {
        case "copy":
        case "cut":
          expect(item.prop("disabled")).toBe(false);
          break;
        case "paste":
          expect(item.prop("disabled")).toBe(true);
          break;
        case "view-route":
        case "convert-to-template":
        case "delete":
          break;
        default:
          throw new Error(`should not contain ${item.key()}`);
      }
    });
  });

  it("should select the active route", () => {
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: true,
      node: {
        $$uid: 1,
        type: "bricks",
        path: "/",
        id: "B-001",
      },
    });
    const wrapper = shallow(<BuilderContextMenu />);
    wrapper
      .find(Menu.Item)
      .filterWhere((n) => n.key() === "view-route")
      .invoke("onClick")(null);
    expect(onRouteSelect).toBeCalledWith({
      $$uid: 1,
      type: "bricks",
      path: "/",
      id: "B-001",
    });
  });

  it("should go to events view", () => {
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: true,
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
      },
    });
    const wrapper = shallow(<BuilderContextMenu />);
    wrapper
      .find(Menu.Item)
      .filterWhere((n) => n.key() === "events-view")
      .invoke("onClick")(null);
    expect(setToolboxTab).toBeCalledWith(ToolboxTab.EVENTS_VIEW);
    expect(setEventStreamNodeId).toBeCalledWith("B-001");
  });

  it("should invoke onAskForDeletingNode", () => {
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: true,
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
      },
    });
    const mockOnAskForDeletingNode = jest.fn();
    const wrapper = shallow(
      <BuilderContextMenu onAskForDeletingNode={mockOnAskForDeletingNode} />
    );
    wrapper
      .find(Menu.Item)
      .filterWhere((n) => n.key() === "delete")
      .invoke("onClick")(null);
    expect(mockOnAskForDeletingNode).toBeCalledWith({
      $$uid: 1,
      type: "brick",
      id: "B-001",
      brick: "my-brick",
    });
  });

  it("should copy a node", () => {
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: true,
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
      },
    });
    const onNodeCopy = jest.fn();
    const wrapper = shallow(<BuilderContextMenu onNodeCopy={onNodeCopy} />);
    wrapper
      .find(Menu.Item)
      .filterWhere((n) => n.key() === "copy")
      .invoke("onClick")(null);
    expect(legacySetClipboard).toBeCalledWith({
      type: BuilderClipboardType.COPY,
      sourceId: "B-001",
      nodeType: "brick",
    });
    expect(onNodeCopy).toBeCalledWith({
      type: BuilderClipboardType.COPY,
      sourceId: "B-001",
      nodeType: "brick",
    });
  });

  it("should cut a node", () => {
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: true,
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
        instanceId: "instance-a",
      },
    });
    const onNodeCut = jest.fn();
    const wrapper = shallow(<BuilderContextMenu onNodeCut={onNodeCut} />);
    wrapper
      .find(Menu.Item)
      .filterWhere((n) => n.key() === "cut")
      .invoke("onClick")(null);
    expect(legacySetClipboard).toBeCalledWith({
      type: BuilderClipboardType.CUT,
      sourceInstanceId: "instance-a",
      nodeType: "brick",
    });
    expect(onNodeCut).toBeCalledWith({
      type: BuilderClipboardType.CUT,
      sourceInstanceId: "instance-a",
      nodeType: "brick",
    });
  });

  it("should copy and paste a node", () => {
    clipboard = {
      type: BuilderClipboardType.COPY,
      sourceId: "B-007",
      nodeType: "brick",
      nodeAlias: "my-brick",
      sourceInstanceId: "abc",
      sourceProjectInstanceId: "project-a",
    };
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: true,
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
        instanceId: "instance-a",
      },
    });
    const onNodeCopyPaste = jest.fn();
    const wrapper = shallow(
      <BuilderContextMenu onNodeCopyPaste={onNodeCopyPaste} />
    );
    wrapper
      .find(Menu.Item)
      .filterWhere((n) => n.key() === "paste")
      .invoke("onClick")(null);
    expect(legacySetClipboard).toBeCalledWith(null);
    expect(onNodeCopyPaste).toBeCalledWith({
      sourceId: "B-007",
      targetId: "B-001",
      sourceInstanceId: "abc",
      sourceProjectInstanceId: "project-a",
    });
  });

  it("should cut and paste a node", () => {
    clipboard = {
      type: BuilderClipboardType.CUT,
      sourceInstanceId: "instance-b",
      nodeType: "brick",
      sourceProjectInstanceId: "project-a",
    };
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: true,
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
        instanceId: "instance-a",
      },
    });
    const onNodeCutPaste = jest.fn();
    const wrapper = shallow(
      <BuilderContextMenu onNodeCutPaste={onNodeCutPaste} />
    );
    wrapper
      .find(Menu.Item)
      .filterWhere((n) => n.key() === "paste")
      .invoke("onClick")(null);
    expect(legacySetClipboard).toBeCalledWith(null);
    expect(onNodeCutPaste).toBeCalledWith({
      sourceInstanceId: "instance-b",
      targetInstanceId: "instance-a",
      sourceProjectInstanceId: "project-a",
    });
  });

  it("should clear clipboard", () => {
    migrateClipboard = true;
    clipboard = {
      type: BuilderClipboardType.COPY,
      sourceId: "B-007",
      nodeType: "brick",
    };
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: true,
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
        instanceId: "instance-a",
      },
    });
    const onClipboardClear = jest.fn();
    const wrapper = shallow(
      <BuilderContextMenu onClipboardClear={onClipboardClear} />
    );
    wrapper
      .find(Menu.Item)
      .filterWhere((n) => n.key() === "clear-clipboard")
      .invoke("onClick")(null);
    expect(legacySetClipboard).not.toBeCalled();
    expect(onClipboardClear).toBeCalled();
  });

  it("should invoke onAskForAppendingBrick", () => {
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: true,
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
      },
    });
    const mockOnAskForAppendingBrick = jest.fn();
    const wrapper = shallow(
      <BuilderContextMenu onAskForAppendingBrick={mockOnAskForAppendingBrick} />
    );
    wrapper
      .find(Menu.Item)
      .filterWhere((n) => n.key() === "append-brick")
      .invoke("onClick")(null);
    expect(mockOnAskForAppendingBrick).toBeCalledWith({
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
      },
      defaultSort: 1,
    });
  });

  it("should invoke onAskForAppendingRoute", () => {
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: true,
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
      },
    });
    const mockOnAskForAppendingRoute = jest.fn();
    const wrapper = shallow(
      <BuilderContextMenu onAskForAppendingRoute={mockOnAskForAppendingRoute} />
    );
    wrapper
      .find(Menu.Item)
      .filterWhere((n) => n.key() === "append-route")
      .invoke("onClick")(null);
    expect(mockOnAskForAppendingRoute).toBeCalledWith({
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
      },
    });
  });

  it("should invoke onConvertToTemplate", () => {
    mockUseBuilderContextMenuStatus.mockReturnValue({
      active: true,
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
      },
    });
    const wrapper = shallow(<BuilderContextMenu />);
    wrapper
      .find(Menu.Item)
      .filterWhere((n) => n.key() === "convert-to-template")
      .invoke("onClick")(null);
    expect(onConvertToTemplate).toBeCalledWith({
      $$uid: 1,
      type: "brick",
      id: "B-001",
      brick: "my-brick",
    });
  });
});
