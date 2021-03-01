import React from "react";
import { mount } from "enzyme";
import { DropZone } from "@next-core/editor-bricks-helper";
import { BuilderCanvas } from "./BuilderCanvas";
import { useBuilderUIContext } from "../BuilderUIContext";
import { EventStreamCanvas } from "../EventStreamCanvas/EventStreamCanvas";
import { BuilderDataType } from "../interfaces";

jest.mock("@next-core/editor-bricks-helper");
jest.mock("../BuilderUIContext");
jest.mock("../EventStreamCanvas/EventStreamCanvas");

const mockUseBuilderUIContext = useBuilderUIContext as jest.MockedFunction<
  typeof useBuilderUIContext
>;

(DropZone as jest.MockedFunction<typeof DropZone>).mockImplementation(
  function MockDropZone() {
    return <div>MockDropZone</div>;
  }
);

(EventStreamCanvas as jest.MockedFunction<
  typeof EventStreamCanvas
>).mockImplementation(function MockEventStreamCanvas() {
  return <div>MockEventStreamCanvas</div>;
});

jest.spyOn(console, "error").mockImplementation(() => void 0);

describe("BuilderCanvas", () => {
  let dataType: BuilderDataType;
  let fullscreen: boolean;
  let eventStreamNodeId: string;
  beforeEach(() => {
    dataType = BuilderDataType.ROUTE;
    fullscreen = false;
    eventStreamNodeId = null;
    mockUseBuilderUIContext.mockImplementation(() => ({
      dataType,
      fullscreen,
      eventStreamNodeId,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work", () => {
    const wrapper = mount(<BuilderCanvas />);
    expect(wrapper.find(".builderCanvas").prop("className")).not.toContain(
      "fullscreen"
    );
    expect(wrapper.find(DropZone).prop("fullscreen")).toBe(false);
  });

  it("should return nothing if dataType is undefined", () => {
    dataType = undefined;
    const wrapper = mount(<BuilderCanvas />);
    expect(wrapper.html()).toBe(null);
  });

  it("should warn if dataType is unknown", () => {
    dataType = BuilderDataType.UNKNOWN;
    const wrapper = mount(<BuilderCanvas />);
    expect(wrapper.text()).toBe("Unexpected dataSource");
  });

  it("should enter fullscreen", () => {
    fullscreen = true;
    const wrapper = mount(<BuilderCanvas />);
    expect(wrapper.find(".builderCanvas").prop("className")).toContain(
      "fullscreen"
    );
    expect(wrapper.find(DropZone).prop("fullscreen")).toBe(true);
  });

  it("should show event stream canvas", () => {
    eventStreamNodeId = "B-007";
    const wrapper = mount(<BuilderCanvas />);
    expect(wrapper.find(EventStreamCanvas).prop("nodeId")).toBe("B-007");
    expect(wrapper.find(DropZone).length).toBe(0);
  });
});
