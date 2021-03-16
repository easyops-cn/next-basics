import React from "react";
import { shallow } from "enzyme";
import { DataView } from "./DataView";
import { Button } from "antd";
import { useBuilderUIContext } from "../BuilderUIContext";

jest.mock("../BuilderUIContext");

jest.mock("@next-core/editor-bricks-helper", () => ({
  useBuilderNode: jest.fn().mockReturnValue({
    context: [
      {
        name: "data-a",
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
        name: "data-b",
        value: {
          id: 1,
        },
      },
    ],
  }),
}));

describe("DataView", () => {
  it("should work", () => {
    (useBuilderUIContext as jest.Mock).mockReturnValue({
      brickList: [
        {
          type: "brick",
          name: "brick-a",
        },
        {
          type: "provider",
          name: "provider-a",
        },
        {
          type: "provider",
          name: "provider-b",
        },
      ]
    });
    const onContextUpdate = jest.fn();
    const wrapper = shallow(
      <DataView
        onContextUpdate={onContextUpdate}
      />
    );
    expect(wrapper.find("ContextItem").length).toBe(2);
    wrapper.find("SearchComponent").invoke("onSearch")("data-a");
    expect(wrapper.find("ContextItem").length).toBe(1);
    wrapper.find("SearchComponent").invoke("onSearch")("");
    expect(wrapper.find("ContextItem").length).toBe(2);

    wrapper
      .find(Button)
      .filter("[data-testid='add-data-btn']")
      .simulate("click");
    expect(wrapper.find("ContextItemFormModal").prop("visible")).toBe(true);
    wrapper.find("ContextItemFormModal").invoke("onContextItemUpdate")({
      name: "data-c",
      value: {
        id: 2,
      },
    });
    expect(onContextUpdate).toBeCalled();

    wrapper.find("ContextItem").at(1).invoke("handleItemClick")();
    expect(wrapper.find("ContextItemFormModal").prop("visible")).toBe(true);
    wrapper.find("ContextItemFormModal").invoke("onOk")();
    expect(wrapper.find("ContextItemFormModal").prop("visible")).toBe(false);
    wrapper.find("ContextItemFormModal").invoke("onContextItemUpdate")({
      name: "data-b",
      value: {
        id: 3,
      },
    });
    expect(onContextUpdate).toBeCalled();
    wrapper.find("ContextItemFormModal").invoke("onCancel")();
    const mockStopPropagation = jest.fn();
    wrapper.find("ContextItem").at(0).invoke("handleItemDelete")({
      stopPropagation: mockStopPropagation,
    } as any);
    expect(mockStopPropagation).toBeCalled();
  });

  it("should handleDropItem work", () => {
    (useBuilderUIContext as jest.Mock).mockReturnValue({
      brickList: [
        {
          type: "provider",
          name: "provider-a",
        },
        {
          type: "provider",
          name: "provider-b",
        },
      ]
    });
    const onContextUpdate = jest.fn();
    const wrapper = shallow(
      <DataView
        onContextUpdate={onContextUpdate}
      />
    );
    wrapper.find("ContextItem").at(0).invoke("handleDropItem")(1, 0);
    expect(onContextUpdate).toBeCalledWith([
      expect.objectContaining({ name: "data-b" }),
      expect.objectContaining({ name: "data-a" }),
    ]);
    onContextUpdate.mockClear();
    wrapper.find("ContextItem").at(0).invoke("handleDropItem")(1, 1);
    expect(onContextUpdate).not.toBeCalled();
  });
});
