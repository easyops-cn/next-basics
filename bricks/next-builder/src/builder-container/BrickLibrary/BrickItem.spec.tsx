import React from "react";
import { mount, shallow } from "enzyme";
import { useDrag } from "react-dnd";
import {
  BuildFilled,
  CopyFilled,
  DatabaseFilled,
  GoldenFilled,
} from "@ant-design/icons";
import { BuilderDataTransferType } from "@next-core/editor-bricks-helper";
import { BrickItem } from "./BrickItem";

jest.mock("react-dnd", () => ({
  useDrag: jest.fn(),
}));

const mockUseDrag = useDrag as jest.Mock;

describe("BrickItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display a brick", () => {
    const dragRef = jest.fn();
    mockUseDrag.mockReturnValueOnce([{ isDragging: false }, dragRef]);
    const mockOnDraggingChange = jest.fn();
    const wrapper = mount(
      <BrickItem
        brick={{
          type: "brick",
          name: "my.awesome-brick",
          shortName: "awesome-brick",
        }}
        onDraggingChange={mockOnDraggingChange}
      />
    );
    expect(wrapper.find(".brickItem").hasClass("brick")).toBe(true);
    expect(wrapper.find(BuildFilled).length).toBe(1);
    expect(wrapper.find(".brickName").text()).toBe("awesome-brick");
    expect(mockUseDrag).toBeCalledWith(
      expect.objectContaining({
        item: {
          type: BuilderDataTransferType.NODE_TO_ADD,
          brickType: undefined,
          brick: "my.awesome-brick",
        },
      })
    );
    expect(mockOnDraggingChange).toBeCalledWith(false);
  });

  it("should display a provider", () => {
    const dragRef = jest.fn();
    mockUseDrag.mockReturnValueOnce([{ isDragging: false }, dragRef]);
    const wrapper = shallow(
      <BrickItem
        brick={{
          type: "provider",
          name: "my.awesome-provider",
          shortName: "awesome-provider",
        }}
      />
    );
    expect(wrapper.find(".brickItem").hasClass("provider")).toBe(true);
    expect(wrapper.find(DatabaseFilled).length).toBe(1);
    expect(wrapper.find(".brickName").text()).toBe("awesome-provider");
    expect(mockUseDrag).toBeCalledWith(
      expect.objectContaining({
        item: {
          type: BuilderDataTransferType.NODE_TO_ADD,
          brickType: "provider",
          brick: "my.awesome-provider",
        },
      })
    );
  });

  it("should display a legacy template", () => {
    const dragRef = jest.fn();
    mockUseDrag.mockReturnValueOnce([{ isDragging: false }, dragRef]);
    const wrapper = shallow(
      <BrickItem
        brick={{
          type: "template",
          name: "my.awesome-template",
          shortName: "awesome-template",
        }}
      />
    );
    expect(wrapper.find(".brickItem").hasClass("template")).toBe(true);
    expect(wrapper.find(GoldenFilled).length).toBe(1);
    expect(wrapper.find(".brickName").text()).toBe("awesome-template");
    expect(mockUseDrag).toBeCalledWith(
      expect.objectContaining({
        item: {
          type: BuilderDataTransferType.NODE_TO_ADD,
          brickType: "template",
          brick: "my.awesome-template",
        },
      })
    );
  });

  it("should display a custom template", () => {
    const dragRef = jest.fn();
    mockUseDrag.mockReturnValueOnce([{ isDragging: false }, dragRef]);
    const wrapper = shallow(
      <BrickItem
        brick={{
          type: "customTemplate",
          name: "my.awesome-custom-template",
          shortName: "awesome-custom-template",
        }}
      />
    );
    expect(wrapper.find(".brickItem").hasClass("customTemplate")).toBe(true);
    expect(wrapper.find(CopyFilled).length).toBe(1);
    expect(wrapper.find(".brickName").text()).toBe("awesome-custom-template");
    expect(mockUseDrag).toBeCalledWith(
      expect.objectContaining({
        item: {
          type: BuilderDataTransferType.NODE_TO_ADD,
          brickType: undefined,
          brick: "my.awesome-custom-template",
        },
      })
    );
  });
});
