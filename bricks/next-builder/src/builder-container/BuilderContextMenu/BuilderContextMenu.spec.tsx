import React from "react";
import { shallow } from "enzyme";
import { Menu } from "antd";
import {
  useBuilderContextMenuStatus,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";
import { BuilderContextMenu } from "./BuilderContextMenu";
import { ContextOfBuilderUI, useBuilderUIContext } from "../BuilderUIContext";
import { ToolboxTab } from "../interfaces";

jest.mock("@next-core/editor-bricks-helper");
jest.mock("../BuilderUIContext");

const mockUseBuilderContextMenuStatus = useBuilderContextMenuStatus as jest.MockedFunction<
  typeof useBuilderContextMenuStatus
>;

const mockBuilderUIContext: ContextOfBuilderUI = {
  setToolboxTab: jest.fn(),
  setEventStreamNodeId: jest.fn(),
};

(useBuilderUIContext as jest.MockedFunction<
  typeof useBuilderUIContext
>).mockReturnValue(mockBuilderUIContext);

const mockManager = {
  contextMenuChange: jest.fn(),
};
(useBuilderDataManager as jest.Mock).mockReturnValue(mockManager);

describe("BuilderContextMenu", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display nothing if context menu is not active", () => {
    mockUseBuilderContextMenuStatus.mockReturnValueOnce({
      active: false,
    });
    const wrapper = shallow(<BuilderContextMenu />);
    expect(wrapper.find(".menuWrapper").prop("style").display).toBe("none");
    expect(wrapper.find(Menu).length).toBe(0);
  });

  it("should show menu if context menu is not active", () => {
    mockUseBuilderContextMenuStatus.mockReturnValueOnce({
      active: true,
    });
    const wrapper = shallow(<BuilderContextMenu />);
    expect(wrapper.find(".menuWrapper").prop("style").display).toBe("block");
    expect(wrapper.find(Menu).length).toBe(1);
  });

  it("should close menu when click", () => {
    mockUseBuilderContextMenuStatus.mockReturnValueOnce({
      active: true,
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

  it("should show events view", () => {
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
    wrapper.find(Menu.Item).at(0).invoke("onClick")(null);
    expect(mockBuilderUIContext.setToolboxTab).toBeCalledWith(
      ToolboxTab.EVENTS_VIEW
    );
    expect(mockBuilderUIContext.setEventStreamNodeId).toBeCalledWith("B-001");
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
    wrapper.find(Menu.Item).at(1).invoke("onClick")(null);
    expect(mockOnAskForDeletingNode).toBeCalledWith({
      $$uid: 1,
      type: "brick",
      id: "B-001",
      brick: "my-brick",
    });
  });
});
