import React from "react";
import { shallow } from "enzyme";
import { Modal } from "antd";
import { SingleBrickAsComponent } from "@next-core/brick-kit";
import { GeneralIcon } from "@next-libs/basic-components";
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
const titleContent = {
  title: "title",
  titleIcon: {
    imgSrc:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
};
const titleObj = (
  <div style={{ alignItems: "center", display: "flex" }}>
    <GeneralIcon
      icon={{
        imgSrc:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        imgStyle: { marginRight: "8px" },
      }}
      size={20}
    />
    title
  </div>
);
const modalProps = {
  visible: true,
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
    type: "link",
  },
  destroyOnClose: true,
  onCancel: jest.fn(),
} as const;
const dataSource = {};
const mockOnOk = jest.fn();

describe("FormModal", () => {
  it("should work", async () => {
    const testId = "test-id";
    const wrapper = shallow(
      <FormModal
        form={form}
        items={items}
        dataSource={dataSource}
        testId={testId}
        {...modalProps}
        {...titleContent}
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
    expect(modal.props()).toEqual(
      expect.objectContaining({
        ...modalProps,
        cancelButtonProps: expect.objectContaining(
          modalProps.cancelButtonProps
        ),
        okButtonProps: expect.objectContaining(modalProps.okButtonProps),
      })
    );
    expect(mockOnOk).not.toBeCalled();
    modal.invoke("onOk")({} as React.MouseEvent<HTMLElement, MouseEvent>);
    expect(mockOnOk).toBeCalled();
    expect(
      (modal.invoke("modalRender")(<div />) as React.ReactElement).props[
        "data-testid"
      ]
    ).toBe(`${testId}-content`);
    expect(modal.prop("title")).toMatchObject(titleObj);
  });
});
