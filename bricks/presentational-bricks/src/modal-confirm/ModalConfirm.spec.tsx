import React from "react";
import { Modal, Input } from "antd";
import { mount } from "enzyme";
import { ModalConfirm, ModalConfirmProps } from "./ModalConfirm";
import { BrickAsComponent } from "@next-core/brick-kit";

const mockUpdate = jest.fn();
const spyOnModalConfirm = jest.spyOn(Modal, "confirm");
spyOnModalConfirm.mockReturnValue({ update: mockUpdate, destroy: jest.fn() });

const props: any = {
  type: "confirm",
  dataSource: {
    key1: "value1",
    key2: "value2",
    key3: "value3",
  },
  title: "###{key1}$$",
  content: "## <strong>#{key2}</strong> $$",
  extraContent: "###{key3}$$",
  isDelete: true,
};
const mockOnOk = jest.fn();
const mockOnCancel = jest.fn();

describe("ModalConfirm", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should work", () => {
    const wrapper = mount<ModalConfirmProps>(
      <ModalConfirm
        visible
        {...props}
        onOk={mockOnOk}
        onCancel={mockOnCancel}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(spyOnModalConfirm).toBeCalled();
    const modalProps =
      spyOnModalConfirm.mock.calls[spyOnModalConfirm.mock.calls.length - 1][0];
    modalProps.onOk();
    expect(mockOnOk).toBeCalled();
    modalProps.onCancel();
    expect(mockOnCancel).toBeCalled();
    spyOnModalConfirm.mockClear();

    wrapper.setProps({
      visible: false,
      title: undefined,
      content: undefined,
      extraContent: undefined,
      isDelete: undefined,
      onOk: undefined,
      onCancel: undefined,
    });
    expect(wrapper).toMatchSnapshot();
    expect(spyOnModalConfirm).not.toBeCalled();
  });

  it("expect should work", () => {
    mockOnOk.mockClear();
    const wrapper = mount<ModalConfirmProps>(
      <ModalConfirm
        visible
        {...props}
        expect="foo"
        closeWhenOk={true}
        onOk={mockOnOk}
        onCancel={mockOnCancel}
      />
    );

    wrapper.setProps({ visible: false });
    wrapper.setProps({ visible: true });

    // const modalProps =
    //   spyOnModalConfirm.mock.calls[spyOnModalConfirm.mock.calls.length - 1][0];
    // expect(modalProps.okButtonProps.disabled).toBe(true);

    // const contentWrapper = mount(modalProps.content as React.ReactElement);
    // const inputNode = contentWrapper.find(Input);
    // inputNode.invoke("onChange")({ target: { value: "foo" } });
    // expect(mockUpdate).toBeCalledWith(
    //   expect.objectContaining({
    //     okButtonProps: expect.objectContaining({ disabled: false }),
    //   })
    // );
    // mockUpdate.mockClear();
    // inputNode.invoke("onChange")({ target: { value: "fo" } });
    // expect(mockUpdate).toBeCalledWith(
    //   expect.objectContaining({
    //     okButtonProps: expect.objectContaining({ disabled: true }),
    //   })
    // );
  });
  it("contentBrick should work", () => {
    const contentBrick = {
      useBrick: {
        brick: "div",
        properties: {
          textContent: "brick",
        },
      },
    };
    const props: any = {
      type: "success",
      contentBrick,
    };
    const wrapper = mount<ModalConfirmProps>(<ModalConfirm {...props} />);
    expect(wrapper).toBeTruthy();
  });
});
