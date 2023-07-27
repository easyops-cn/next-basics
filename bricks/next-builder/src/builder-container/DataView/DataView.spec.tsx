import React from "react";
import { shallow, mount } from "enzyme";
import { Button } from "antd";
import {
  useBuilderDataManager,
  useBuilderNode,
  useBuilderData,
} from "@next-core/editor-bricks-helper";
import { DataView } from "./DataView";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { ContextItemFormModal } from "./ContextItemFormModal";
import { ContextItem } from "./ContextItem";

jest.mock("@next-core/editor-bricks-helper");
jest.mock("./ContextItem", () => ({
  ContextItem() {
    return <div>ContextItem</div>;
  },
}));

(useBuilderNode as jest.Mock).mockReturnValue({
  context: [
    {
      name: "dataA",
      resolve: {
        useProvider: "provider-a",
        args: ["args1"],
        if: false,
        transform: {
          value: "<% DATA %>",
        },
      },
    },
    {
      name: "dataB",
      value: {
        id: 1,
      },
    },
    {
      name: "dataC",
      value: "<% CTX.dataA %>",
    },
  ],
});

(useBuilderData as jest.Mock).mockReturnValue({
  nodes: [
    {
      brick: "brick-a",
      $$uid: 1,
      $$normalized: {
        properties: {
          data: "<% CTX.dataA %>",
        },
      },
    },
    {
      brick: "brick-b",
      $$uid: 2,
      $$normalized: {
        properties: {
          data: "<% CTX.dataB %>",
        },
      },
    },
    {
      brick: "brick-c",
      $$uid: 3,
      $$normalized: {
        events: {
          click: {
            action: "console.log",
            args: ["<% CTX.dataA %>"],
          },
        },
      },
    },
  ],
});

const mockSetHighlightNodes = jest.fn();
const mockManager = {
  setHighlightNodes: mockSetHighlightNodes,
};
(useBuilderDataManager as jest.Mock).mockReturnValue(mockManager);

describe("DataView", () => {
  it("should work", () => {
    const onContextUpdate = jest.fn();
    const wrapper = shallow(<DataView onContextUpdate={onContextUpdate} />);
    expect(wrapper.find(ContextItem).length).toBe(3);
    wrapper.find(SearchComponent).invoke("onSearch")("dataA");
    expect(wrapper.find(ContextItem).length).toBe(2);
    wrapper.find(SearchComponent).invoke("onSearch")("");
    expect(wrapper.find(ContextItem).length).toBe(3);

    wrapper
      .find(Button)
      .filter("[data-testid='add-data-btn']")
      .simulate("click");
    expect(wrapper.find(ContextItemFormModal).prop("visible")).toBe(true);
    wrapper.find(ContextItemFormModal).invoke("onContextItemUpdate")({
      name: "data-c",
      value: {
        id: 2,
      },
    });
    expect(onContextUpdate).toBeCalled();

    wrapper.find(ContextItem).at(1).invoke("handleItemClick")();
    expect(wrapper.find(ContextItemFormModal).prop("visible")).toBe(true);
    wrapper.find(ContextItemFormModal).invoke("onOk")();
    wrapper.find(ContextItemFormModal).invoke("onContextItemUpdate")({
      name: "dataB",
      value: {
        id: 3,
      },
    });
    expect(onContextUpdate).toBeCalled();
    expect(wrapper.find(ContextItemFormModal).prop("visible")).toBe(false);
    wrapper.find(ContextItemFormModal).invoke("onCancel")();
    const mockStopPropagation = jest.fn();
    wrapper.find(ContextItem).at(0).invoke("handleItemDelete")({
      stopPropagation: mockStopPropagation,
    } as any);
    expect(mockStopPropagation).toBeCalled();
  });

  it("should handleDropItem work", () => {
    const onContextUpdate = jest.fn();
    const wrapper = shallow(<DataView onContextUpdate={onContextUpdate} />);
    wrapper.find(ContextItem).at(0).invoke("handleDropItem")(1, 0);
    expect(onContextUpdate).toBeCalledWith([
      expect.objectContaining({ name: "dataB" }),
      expect.objectContaining({ name: "dataA" }),
      expect.objectContaining({ name: "dataC" }),
    ]);
    onContextUpdate.mockClear();
    wrapper.find(ContextItem).at(0).invoke("handleDropItem")(1, 1);
    expect(onContextUpdate).not.toBeCalled();
  });

  it("should set highlight nodes", () => {
    const wrapper = mount(<DataView />);
    expect(
      wrapper.find(ContextItem).filterWhere((node) => node.prop("highlighted"))
        .length
    ).toBe(0);
    wrapper.find(ContextItem).at(0).invoke("handleItemHover")("dataA");
    expect(mockSetHighlightNodes).toBeCalledWith(new Set([1, 3]));
    expect(
      wrapper
        .find(ContextItem)
        .filterWhere((node) => node.prop("highlighted"))
        .prop("data").name
    ).toBe("dataC");
  });
});
