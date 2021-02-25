import React from "react";
import { shallow } from "enzyme";
import { DataView } from "./DataView";
import { Input, Button } from "antd";

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
    const onContextUpdate = jest.fn();
    const wrapper = shallow(
      <DataView
        brickList={[
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
        ]}
        onContextUpdate={onContextUpdate}
      />
    );
    expect(wrapper.find(".varItem").length).toBe(2);
    wrapper.find(Input).invoke("onChange")({
      target: { value: "data-a" },
    } as React.ChangeEvent<HTMLInputElement>);
    expect(wrapper.find(".varItem").length).toBe(1);
    wrapper.find(Input).invoke("onChange")({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
    expect(wrapper.find(".varItem").length).toBe(2);

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

    wrapper.find(".varItem").at(1).simulate("click");
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
    wrapper.find(".deleteIcon").at(0).invoke("onClick")({
      stopPropagation: mockStopPropagation,
    } as any);
    expect(mockStopPropagation).toBeCalled();
  });
});
