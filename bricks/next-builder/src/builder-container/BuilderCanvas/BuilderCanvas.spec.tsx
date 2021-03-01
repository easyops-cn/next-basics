import React from "react";
import { mount } from "enzyme";
import { BuilderCanvas } from "./BuilderCanvas";
import {
  DropZone,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";
import { useBuilderUIContext } from "../BuilderUIContext";
import { EventStreamCanvas } from "../EventStreamCanvas/EventStreamCanvas";

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

const mockManager = {
  dataInit: jest.fn(),
};
(useBuilderDataManager as jest.Mock).mockReturnValue(mockManager);

jest.spyOn(console, "error").mockImplementation(() => void 0);
jest.spyOn(window, "dispatchEvent");

describe("BuilderCanvas", () => {
  let eventStreamNodeId: string = null;
  let fullscreen = false;
  beforeEach(() => {
    mockUseBuilderUIContext.mockImplementation(() => ({
      fullscreen,
      eventStreamNodeId,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should warn initialize builder event listeners", () => {
    const wrapper = mount(
      <BuilderCanvas
        dataSource={[
          {
            type: "bricks",
            path: "/home",
            id: "B-001",
          },
        ]}
      />
    );
    expect(mockManager.dataInit).toBeCalled();
    expect(wrapper.find(".builderCanvas").prop("className")).not.toContain(
      "fullscreen"
    );
    expect(wrapper.find(DropZone).prop("fullscreen")).toBe(false);
  });

  it("should warn if dataSource is unexpected empty array", () => {
    const wrapper = mount(<BuilderCanvas dataSource={[]} />);
    expect(wrapper.text()).toBe("Unexpected dataSource");
    expect(mockManager.dataInit).not.toBeCalled();
  });

  it("should warn if dataSource is unexpected brick node", () => {
    const wrapper = mount(
      <BuilderCanvas
        dataSource={[
          {
            type: "brick",
            brick: "any-brick",
            id: "B-001",
          },
        ]}
      />
    );
    expect(wrapper.text()).toBe("Unexpected dataSource");
    expect(mockManager.dataInit).not.toBeCalled();
  });

  it("should enter fullscreen", () => {
    fullscreen = true;
    const wrapper = mount(
      <BuilderCanvas
        dataSource={[
          {
            type: "bricks",
            path: "/home",
            id: "B-001",
          },
        ]}
      />
    );
    expect(wrapper.find(".builderCanvas").prop("className")).toContain(
      "fullscreen"
    );
    expect(wrapper.find(DropZone).prop("fullscreen")).toBe(true);
    fullscreen = false;
  });

  it("should show event stream canvas", () => {
    eventStreamNodeId = "B-007";
    const wrapper = mount(
      <BuilderCanvas
        dataSource={[
          {
            type: "bricks",
            path: "/home",
            id: "B-001",
          },
        ]}
      />
    );
    expect(wrapper.find(EventStreamCanvas).prop("nodeId")).toBe("B-007");
    expect(wrapper.find(DropZone).length).toBe(0);
    eventStreamNodeId = null;
  });
});
