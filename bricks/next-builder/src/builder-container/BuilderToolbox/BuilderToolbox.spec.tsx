import React from "react";
import { act } from "react-dom/test-utils";
import { mount, shallow } from "enzyme";
import { JsonStorage } from "@next-libs/storage";
import { BuilderToolbox } from "./BuilderToolbox";
import { useBuilderUIContext } from "../BuilderUIContext";
import { defaultToolboxTab } from "../constants";
import { BuilderDataType, ToolboxTab } from "../interfaces";
import {
  useBuilderDataManager,
  useShowRelatedNodesBasedOnEvents,
} from "@next-core/editor-bricks-helper";

jest.mock("@next-libs/storage");
jest.mock("../BuilderUIContext");
jest.mock("../StoryboardTreeView/StoryboardTreeView", () => ({
  StoryboardTreeView() {
    return <div>StoryboardTreeView</div>;
  },
}));
jest.mock("@next-core/editor-bricks-helper");

const mockSetShowRelatedNodesBasedOnEvents = jest.fn();
const mockManager = {
  setShowRelatedNodesBasedOnEvents: mockSetShowRelatedNodesBasedOnEvents,
};
(useBuilderDataManager as jest.Mock).mockReturnValue(mockManager);
(useShowRelatedNodesBasedOnEvents as jest.Mock).mockReturnValue(true);

const mockUseBuilderUIContext = useBuilderUIContext as jest.MockedFunction<
  typeof useBuilderUIContext
>;

const mockJsonStorage = JsonStorage as jest.MockedClass<typeof JsonStorage>;

jest
  .spyOn(document.documentElement, "clientWidth", "get")
  .mockReturnValue(1280);

describe("BuilderToolbox", () => {
  let toolboxTab: ToolboxTab;
  let dataType: BuilderDataType;

  beforeEach(() => {
    jest.clearAllMocks();
    toolboxTab = defaultToolboxTab;
    dataType = BuilderDataType.ROUTE_OF_BRICKS;
    mockUseBuilderUIContext.mockImplementation(() => ({
      dataType,
      toolboxTab,
      setToolboxTab: ((tab: ToolboxTab) => {
        toolboxTab = tab;
      }) as any,
    }));
  });

  it("should show storyboard tree view by default", () => {
    const wrapper = shallow(<BuilderToolbox />);
    expect(wrapper.find("StoryboardTreeView").length).toBe(1);
    expect(wrapper.find("BrickLibrary").length).toBe(0);
  });

  it("should switch to library", () => {
    expect(toolboxTab).toBe(defaultToolboxTab);
    const wrapper = shallow(<BuilderToolbox />);
    wrapper.find(".tabLink").at(1).invoke("onClick")(null);
    expect(toolboxTab).toBe(ToolboxTab.LIBRARY);
    const wrapper2 = shallow(<BuilderToolbox />);
    expect(wrapper2.find("BrickLibrary").length).toBe(1);
  });

  it("should switch to events view", () => {
    expect(toolboxTab).toBe(defaultToolboxTab);
    const wrapper = shallow(<BuilderToolbox />);
    wrapper.find(".tabLink").at(2).invoke("onClick")(null);
    expect(toolboxTab).toBe(ToolboxTab.EVENTS_VIEW);
    const wrapper2 = shallow(<BuilderToolbox />);
    expect(wrapper2.find("EventsView").length).toBe(1);
  });

  it("should switch to data view", () => {
    const wrapper = shallow(<BuilderToolbox />);
    wrapper.find(".tabLink").at(3).invoke("onClick")(null);
    expect(toolboxTab).toBe(ToolboxTab.DATA_VIEW);
    const wrapper2 = shallow(<BuilderToolbox />);
    expect(wrapper2.find("DataView").length).toBe(1);
  });

  it("should display 3 tabLink", () => {
    dataType = BuilderDataType.CUSTOM_TEMPLATE;
    const wrapper = shallow(<BuilderToolbox />);
    expect(wrapper.find(".tabLink").length).toBe(3);
  });

  it("should handle col-resize", () => {
    const wrapper = mount(<BuilderToolbox />);
    const getWidth = (): number =>
      wrapper.find(".builderToolbox").prop("style").width as number;

    expect(getWidth()).toBe(273);

    const mockPreventDefault = jest.fn();
    wrapper.find(".toolboxResizer").invoke("onMouseDown")({
      clientX: 300,
      preventDefault: mockPreventDefault,
    } as any);
    expect(mockPreventDefault).toBeCalled();

    act(() => {
      window.dispatchEvent(
        new MouseEvent("mousemove", {
          clientX: 310,
        })
      );
    });
    wrapper.update();
    expect(getWidth()).toBe(283);

    act(() => {
      window.dispatchEvent(new MouseEvent("mouseup"));
    });
    const mockJsonStorageSetItem = mockJsonStorage.mock.instances[0].setItem;
    expect(mockJsonStorageSetItem).toBeCalledWith(
      "next-builder-toolbox-width",
      283
    );
  });
});
