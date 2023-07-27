import React from "react";
import { mount, shallow } from "enzyme";
import { useDrag } from "react-dnd";
import {
  BuildFilled,
  CopyFilled,
  DatabaseFilled,
  GoldenFilled,
  NumberOutlined,
} from "@ant-design/icons";
import { BuilderDataTransferType } from "@next-core/editor-bricks-helper";
import { GeneralIcon } from "@next-libs/basic-components";
import { BrickItem } from "./BrickItem";
import { LayerType } from "../interfaces";

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
          id: "my.awesome-brick",
          title: "awesome-brick",
          description: "My awesome brick",
        }}
        onDraggingChange={mockOnDraggingChange}
      />
    );
    expect(wrapper.find(".brickItem").hasClass("brick")).toBe(true);
    expect(wrapper.find(".brickItem").prop("title")).toBe("My awesome brick");
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
          id: "my.awesome-provider",
          title: "awesome-provider",
        }}
      />
    );
    expect(wrapper.find(".brickItem").hasClass("provider")).toBe(true);
    expect(wrapper.find(".brickItem").prop("title")).toBe("awesome-provider");
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
          id: "my.awesome-template",
          title: "awesome-template",
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
          id: "my.awesome-custom-template",
          title: "awesome-custom-template",
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

  it("should display a snippet", () => {
    const dragRef = jest.fn();
    mockUseDrag.mockReturnValueOnce([{ isDragging: false }, dragRef]);
    const wrapper = shallow(
      <BrickItem
        brick={{
          type: "snippet",
          id: "my.snippet",
          title: "My Snippet",
          bricks: [
            {
              brick: "easy-view",
            },
          ],
          thumbnail: "test.svg",
        }}
      />
    );
    expect(wrapper.find(".brickItem").hasClass("snippet")).toBe(true);
    expect(wrapper.find(".brickIcon img").prop("src")).toBe("test.svg");
    expect(wrapper.find(NumberOutlined).length).toBe(0);
    expect(wrapper.find(".brickName").text()).toBe("My Snippet");
    expect(mockUseDrag).toBeCalledWith(
      expect.objectContaining({
        item: {
          type: BuilderDataTransferType.SNIPPET_TO_APPLY,
          bricks: [
            {
              brick: "easy-view",
            },
          ],
        },
      })
    );
  });

  it("should display a snippet without thumbnail", () => {
    const dragRef = jest.fn();
    mockUseDrag.mockReturnValueOnce([{ isDragging: false }, dragRef]);
    const wrapper = shallow(
      <BrickItem
        brick={{
          type: "snippet",
          id: "my.snippet",
          title: "My Snippet",
          bricks: [
            {
              brick: "easy-view",
            },
          ],
        }}
      />
    );
    expect(wrapper.find(".brickItem").hasClass("snippet")).toBe(true);
    expect(wrapper.find(NumberOutlined).length).toBe(1);
    expect(wrapper.find(".brickIcon img").length).toBe(0);
  });

  it("should render icon", () => {
    const dragRef = jest.fn();
    mockUseDrag.mockReturnValueOnce([{ isDragging: false }, dragRef]);
    const wrapper = shallow(
      <BrickItem
        brick={{
          category: "form-input",
          icon: {
            lib: "fa",
            icon: "abacus",
          },
          type: "brick",
          id: "my.awesome-brick",
          title: "awesome-brick",
        }}
      />
    );
    expect(wrapper.find(GeneralIcon).prop("icon")).toEqual({
      icon: "abacus",
      lib: "fa",
    });
  });

  it("should show thumbnail while layerType was widget", () => {
    const dragRef = jest.fn();
    mockUseDrag.mockReturnValueOnce([{ isDragging: false }, dragRef]);
    const wrapper = shallow(
      <BrickItem
        brick={{
          type: "brick",
          id: "widget-project.my-widget",
          title: "my-widget",
          thumbnail: "xxx.png",
        }}
        layerType={LayerType.WIDGET}
      />
    );

    expect(wrapper.find(".brickIcon img").prop("src")).toBe("xxx.png");
  });

  it("should show BuildFilled while layType was widget and thumbnail was null", () => {
    const dragRef = jest.fn();
    mockUseDrag.mockReturnValueOnce([{ isDragging: false }, dragRef]);
    const wrapper = shallow(
      <BrickItem
        brick={{
          type: "brick",
          id: "widget-project.my-widget",
          title: "my-widget",
          thumbnail: null,
        }}
        layerType={LayerType.WIDGET}
      />
    );

    expect(wrapper.find(BuildFilled).length).toBe(1);
  });
});
