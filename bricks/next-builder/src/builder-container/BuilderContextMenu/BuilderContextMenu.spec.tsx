import React from "react";
import { shallow } from "enzyme";
import { Menu } from "antd";
import {
  useBuilderContextMenuStatus,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";
import { BuilderContextMenu } from "./BuilderContextMenu";

jest.mock("@next-core/editor-bricks-helper");

const mockUseBuilderContextMenuStatus = useBuilderContextMenuStatus as jest.MockedFunction<
  typeof useBuilderContextMenuStatus
>;

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

  it("should invoke onAskForDeletingNode", () => {
    mockUseBuilderContextMenuStatus.mockReturnValueOnce({
      active: true,
      node: {
        $$uid: 1,
        type: "brick",
        id: "B-001",
        brick: "$kebab-brick-last-name$",
      },
    });
    const mockOnAskForDeletingNode = jest.fn();
    const wrapper = shallow(
      <BuilderContextMenu onAskForDeletingNode={mockOnAskForDeletingNode} />
    );
    wrapper.find(Menu.Item).invoke("onClick")(null);
    expect(mockOnAskForDeletingNode).toBeCalledWith({
      $$uid: 1,
      type: "brick",
      id: "B-001",
      brick: "$kebab-brick-last-name$",
    });
  });
});
