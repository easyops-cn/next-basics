import React from "react";
import { mount, shallow } from "enzyme";
import { BuilderCanvas } from "./BuilderCanvas";
import {
  DropZone,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";
import { useBuilderUIContext } from "../BuilderUIContext";

jest.mock("@next-core/editor-bricks-helper");
jest.mock("../BuilderUIContext");

const mockUseBuilderUIContext = useBuilderUIContext as jest.MockedFunction<
  typeof useBuilderUIContext
>;

(DropZone as jest.MockedFunction<typeof DropZone>).mockImplementation(
  function MockDropZone() {
    return <div>MockDropZone</div>;
  }
);

const mockManager = {
  dataInit: jest.fn(),
};
(useBuilderDataManager as jest.Mock).mockReturnValue(mockManager);

jest.spyOn(console, "error").mockImplementation(() => void 0);
jest.spyOn(window, "dispatchEvent");

describe("BuilderCanvas", () => {
  let eventStreamActiveNodeUid: number = null;
  let fullscreen = false;
  beforeEach(() => {
    mockUseBuilderUIContext.mockImplementation(() => ({
      fullscreen,
      eventStreamActiveNodeUid,
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
    expect(wrapper.find("DropZone").prop("fullscreen")).toBe(false);
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
    const wrapper = shallow(
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
    expect(wrapper.find("DropZone").prop("fullscreen")).toBe(true);
    fullscreen = false;
  });

  it("should show event stream canvas", () => {
    eventStreamActiveNodeUid = 1;
    const wrapper = shallow(
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
    expect(wrapper.find("EventStreamCanvas").prop("nodeUid")).toBe(1);
    expect(wrapper.find("DropZone").length).toBe(0);
    eventStreamActiveNodeUid = null;
  });
});
