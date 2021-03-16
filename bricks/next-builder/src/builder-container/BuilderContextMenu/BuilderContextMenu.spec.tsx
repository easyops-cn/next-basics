import React from "react";
import { shallow } from "enzyme";
import { Menu } from "antd";
import {
  useBuilderContextMenuStatus,
  useBuilderDataManager,
  isBrickNode,
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

const mockUseBuilderContextMenuStatus = useBuilderContextMenuStatus as jest.MockedFunction<
  typeof useBuilderContextMenuStatus
>;

let clipboard: BuilderClipboard;
const setClipboard = jest.fn();
const setToolboxTab = jest.fn();
const setEventStreamNodeId = jest.fn();

(useBuilderUIContext as jest.MockedFunction<
  typeof useBuilderUIContext
>).mockImplementation(() => ({
  clipboard,
  setClipboard,
  setToolboxTab,
  setEventStreamNodeId,
}));

(isBrickNode as jest.MockedFunction<typeof isBrickNode>).mockImplementation(
  (node) => node.type === "brick"
);

const mockManager = {
  contextMenuChange: jest.fn(),
};
(useBuilderDataManager as jest.Mock).mockReturnValue(mockManager);

describe("BuilderContextMenu", () => {
  beforeEach(() => {
    clipboard = null;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display nothing if context menu is not active", () => {
    mockUseBuilderContextMenuStatus.mockReturnValueOnce({
      active: false,
    });
    const wrapper = shallow(<BuilderContextMenu />);
    expect(wrapper.find(".menuWrapper").prop("style").display).toBe("none");
    expect(wrapper.find(".menuWrapper").text()).toBe("");
  });

  it("should show menu for bricks if context menu is active", () => {
    mockUseBuilderContextMenuStatus.mockReturnValueOnce({
      active: true,
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
      },
    });
    const wrapper = shallow(<BuilderContextMenu />);
    expect(wrapper.find(".menuWrapper").prop("style").display).toBe("block");

    const menuItems = wrapper.find(Menu.Item);
    expect(menuItems.length).toBe(5);
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
      }
    });
  });

  it("should close menu when click the delete menu item", () => {
    mockUseBuilderContextMenuStatus.mockReturnValueOnce({
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
    mockUseBuilderContextMenuStatus.mockReturnValueOnce({
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
    mockUseBuilderContextMenuStatus.mockReturnValueOnce({
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

  it("should show menu for routes", () => {
    mockUseBuilderContextMenuStatus.mockReturnValueOnce({
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
    expect(menuItems.length).toBe(4);
    menuItems.forEach((item) => {
      switch (item.key()) {
        case "events-view":
          throw new Error("should not happen");
        case "copy":
        case "cut":
        case "paste":
          expect(item.prop("disabled")).toBe(true);
          break;
      }
    });
  });

  it("should go to events view", () => {
    mockUseBuilderContextMenuStatus.mockReturnValueOnce({
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
    mockUseBuilderContextMenuStatus.mockReturnValueOnce({
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
    mockUseBuilderContextMenuStatus.mockReturnValueOnce({
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
      .filterWhere((n) => n.key() === "copy")
      .invoke("onClick")(null);
    expect(setClipboard).toBeCalledWith({
      type: BuilderClipboardType.COPY,
      sourceId: "B-001",
    });
  });

  it("should cut a node", () => {
    mockUseBuilderContextMenuStatus.mockReturnValueOnce({
      active: true,
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "my-brick",
        instanceId: "instance-a",
      },
    });
    const wrapper = shallow(<BuilderContextMenu />);
    wrapper
      .find(Menu.Item)
      .filterWhere((n) => n.key() === "cut")
      .invoke("onClick")(null);
    expect(setClipboard).toBeCalledWith({
      type: BuilderClipboardType.CUT,
      sourceInstanceId: "instance-a",
    });
  });

  it("should copy and paste a node", () => {
    clipboard = {
      type: BuilderClipboardType.COPY,
      sourceId: "B-007",
    };
    mockUseBuilderContextMenuStatus.mockReturnValueOnce({
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
    expect(setClipboard).toBeCalledWith(null);
    expect(onNodeCopyPaste).toBeCalledWith({
      sourceId: "B-007",
      targetId: "B-001",
    });
  });

  it("should cut and paste a node", () => {
    clipboard = {
      type: BuilderClipboardType.CUT,
      sourceInstanceId: "instance-b",
    };
    mockUseBuilderContextMenuStatus.mockReturnValueOnce({
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
    expect(setClipboard).toBeCalledWith(null);
    expect(onNodeCutPaste).toBeCalledWith({
      sourceInstanceId: "instance-b",
      targetInstanceId: "instance-a",
    });
  });
});
