import React from "react";
import { shallow } from "enzyme";
import { Modal } from "antd";
import { SingleBrickAsComponent } from "@next-core/brick-kit";

import { FormModal } from "./FormModal";
import "../general-form";
import { GeneralFormElement } from "../general-form";

const form = {
  useBrick: {
    properties: {
      values: {},
    },
    events: {
      "validate.success": {
        action: "console.log",
      },
    },
  },
} as const;
const items = {
  useBrick: [
    {
      brick: "brick-a",
    },
  ],
};
const modalProps = {
  visible: true,
  title: "title",
  confirmLoading: true,
  closable: true,
  centered: true,
  width: 100,
  okText: "ok",
  okType: "default",
  cancelText: "cancel",
  maskClosable: true,
  forceRender: true,
  okButtonProps: {},
  cancelButtonProps: {
    type: "link"
  },
  destroyOnClose: true,
  onCancel: jest.fn(),
} as const;
const dataSource = {};
const mockOnOk = jest.fn();

describe("FormModal", () => {
  it("should work", async () => {
    const wrapper = shallow(
      <FormModal
        form={form}
        items={items}
        dataSource={dataSource}
        {...modalProps}
        onOk={mockOnOk}
      />
    );

    const formComponent = wrapper.find(SingleBrickAsComponent);
    const formElement = document.createElement(
      "forms.general-form"
    ) as GeneralFormElement;
    const spyOnSetInitValue = jest.spyOn(formElement, "setInitValue");
    spyOnSetInitValue.mockImplementation(() => null);
    expect(formComponent.prop("useBrick")).toEqual(
      expect.objectContaining({
        ...form.useBrick,
        properties: expect.objectContaining(form.useBrick.properties),
        slots: expect.objectContaining({
          items: expect.objectContaining({
            type: "bricks",
            bricks: items.useBrick,
          }),
        }),
      })
    );
    expect(formComponent.prop("data")).toBe(dataSource);
    expect(spyOnSetInitValue).not.toBeCalled();
    formElement.values = form.useBrick.properties.values;
    formComponent.invoke("refCallback")(formElement);
    await (global as any).flushPromises();
    expect(spyOnSetInitValue).toBeCalledWith(formElement.values);

    const spyOnLowLevelValidate = jest.spyOn(formElement, "lowLevelValidate");
    spyOnLowLevelValidate.mockImplementation((callback) => {
      callback?.();
    });
    const modal = wrapper.find(Modal);
    expect(modal.props()).toEqual(expect.objectContaining(modalProps));
    expect(mockOnOk).not.toBeCalled();
    modal.invoke("onOk")({} as React.MouseEvent<HTMLElement, MouseEvent>);
    expect(mockOnOk).toBeCalled();
  });
});
