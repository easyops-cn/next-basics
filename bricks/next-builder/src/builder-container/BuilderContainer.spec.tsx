import React from "react";
import { mount } from "enzyme";
import { useBuilderDataManager } from "@next-core/editor-bricks-helper";
import { BuilderContainer } from "./BuilderContainer";
import { ToolboxTab } from "./interfaces";

jest.mock("@next-core/editor-bricks-helper");
jest.mock("./BuilderToolbox/BuilderToolbox", () => ({
  BuilderToolbox() {
    return <div>BuilderToolbox</div>;
  },
}));
jest.mock("./BuilderCanvas/BuilderCanvas", () => ({
  BuilderCanvas() {
    return <div>BuilderCanvas</div>;
  },
}));
jest.mock("./BuilderContextMenu/BuilderContextMenu", () => ({
  BuilderContextMenu() {
    return <div>BuilderContextMenu</div>;
  },
}));

const mockRemoveListenersOfNodeAdd = jest.fn();
const mockRemoveListenersOfNodeMove = jest.fn();
const mockRemoveListenersOfNodeReorder = jest.fn();
const mockRemoveListenersOfNodeClick = jest.fn();

const mockManager = {
  onNodeAdd: jest.fn(() => mockRemoveListenersOfNodeAdd),
  onNodeMove: jest.fn(() => mockRemoveListenersOfNodeMove),
  onNodeReorder: jest.fn(() => mockRemoveListenersOfNodeReorder),
  onNodeClick: jest.fn(() => mockRemoveListenersOfNodeClick),
};
(useBuilderDataManager as jest.Mock).mockReturnValue(mockManager);

describe("BuilderContainer", () => {
  it("should work", () => {
    const ref = React.createRef<any>();
    const wrapper = mount(<BuilderContainer ref={ref} />);
    expect(ref.current).toBe(mockManager);
    expect(wrapper.find(".builderContainer").prop("className")).not.toContain(
      "fullscreen"
    );
    expect(mockManager.onNodeAdd).toBeCalled();
    expect(mockManager.onNodeMove).toBeCalled();
    expect(mockManager.onNodeReorder).toBeCalled();
    expect(mockManager.onNodeClick).toBeCalled();
    wrapper.unmount();
    expect(mockRemoveListenersOfNodeAdd).toBeCalled();
    expect(mockRemoveListenersOfNodeMove).toBeCalled();
    expect(mockRemoveListenersOfNodeReorder).toBeCalled();
    expect(mockRemoveListenersOfNodeClick).toBeCalled();
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
