import React from "react";
import { mount } from "enzyme";
import { Button, Modal, Table } from "antd";
import { ForwardRefSingleBrickAsComponent } from "@next-core/brick-kit";
import { UseSingleBrickConf } from "@next-core/brick-types";
import update from "immutability-helper";

import {
  GeneralStructsFormItemV2,
  GeneralStructsFormItemV2Props,
} from "./GeneralStructsFormItemV2";

jest.mock("@next-core/brick-kit", () => {
  const { forwardRef, useImperativeHandle, useState } = jest.requireActual(
    "react"
  ) as typeof React;

  let extraRef: Record<string, unknown>;

  const ForwardRefSingleBrickAsComponent = forwardRef<
    HTMLElement,
    { useBrick: UseSingleBrickConf }
  >(function ForwardRefSingleBrickAsComponent(props, ref) {
    const [element, setElement] = useState<HTMLElement>();

    useImperativeHandle(
      ref,
      () =>
        ({
          ...element,
          ...extraRef,
        } as HTMLDivElement)
    ),
      [element];

    return (
      <div
        ref={(_element) => {
          if (_element !== element) {
            setElement(_element);
          }
        }}
        data-testid="mock-brick"
      />
    );
  });

  (ForwardRefSingleBrickAsComponent as any)._setExtraRef = (
    ref: Record<string, unknown>
  ) => {
    extraRef = ref;
  };

  return {
    ForwardRefSingleBrickAsComponent,
  };
});
jest.mock("@next-libs/forms", () => ({
  FormItemWrapper: function FormItemWrapper({ children }) {
    return <div data-testid="mock-form-item-wrapper">{children}</div>;
  },
}));

describe("GeneralStructsFormItemV2", () => {
  const value = [
    {
      name: "param1",
      type: "string",
      description: "参数说明1",
    },
    {
      name: "param2",
      type: "int",
      description: "参数说明2",
    },
  ];
  const fieldsMap = {
    name: "参数名",
    type: "参数类型",
    description: "参数说明",
  };
  const props: GeneralStructsFormItemV2Props = {
    value,
    fieldsMap,
  };

  it("should work", () => {
    const wrapper = mount<GeneralStructsFormItemV2Props>(
      <GeneralStructsFormItemV2 {...props} />
    );

    expect(wrapper.find(Table).prop("columns")[0]?.title).toBe("参数名");

    expect(
      wrapper
        .find(Modal)
        .filter("[data-testid='add-and-edit-modal']")
        .prop("visible")
    ).toBe(false);

    wrapper.find(Button).filter("[data-testid='add-button']").invoke("onClick")(
      {} as React.MouseEvent<HTMLElement, MouseEvent>
    );

    const modalNode = wrapper
      .find(Modal)
      .filter("[data-testid='add-and-edit-modal']");

    expect(modalNode.prop("visible")).toBe(true);

    modalNode.invoke("onCancel")(
      {} as React.MouseEvent<HTMLElement, MouseEvent>
    );

    expect(
      wrapper
        .find(Modal)
        .filter("[data-testid='add-and-edit-modal']")
        .prop("visible")
    ).toBe(false);
  });

  it("structItemShowRenderFN should work", () => {
    const renderFn = jest.fn((text: string) => text + "***");
    const props: GeneralStructsFormItemV2Props = {
      value,
      fieldsMap,
      structItemShowRenderFN: renderFn,
    };
    const wrapper = mount<GeneralStructsFormItemV2Props>(
      <GeneralStructsFormItemV2 {...props} />
    );

    expect(renderFn).toBeCalledWith("param1", value[0], 0, "name");
    expect(renderFn).toReturnWith("param1***");
  });

  it("structInnerTableColumnsOrder should work", () => {
    const props: GeneralStructsFormItemV2Props = {
      value,
      fieldsMap,
      structInnerTableColumnsOrder: ["type", "name", "description"],
    };
    const wrapper = mount<GeneralStructsFormItemV2Props>(
      <GeneralStructsFormItemV2 {...props} />
    );

    expect(wrapper.find(Table).prop("columns")[0].key).toBe("type");
  });

  it("modalVisible should work", () => {
    const wrapper = mount<GeneralStructsFormItemV2Props>(
      <GeneralStructsFormItemV2 {...props} />
    );

    expect(wrapper.find(Modal).prop("visible")).toBe(false);
    wrapper.setProps({ modalVisible: true });
    wrapper.update();
    expect(wrapper.find(Modal).prop("visible")).toBe(true);
  });

  it("modalContentBrick should work", () => {
    const modalContentBrick = {
      brick: "forms.general-form",
    };
    const handleChange = jest.fn();
    const props: GeneralStructsFormItemV2Props = {
      value,
      fieldsMap,
      modalContentBrick,
      onChange: handleChange,
    };
    const setInitValue = jest.fn();
    const reset = jest.fn();
    const newItemValues = {
      name: "new",
      type: "int",
      description: "new value",
    };
    const lowLevelValidate = jest.fn((callback) => callback?.(newItemValues));
    const extraRef = {
      setInitValue,
      reset,
      lowLevelValidate,
    };

    (ForwardRefSingleBrickAsComponent as any)._setExtraRef(extraRef);

    const wrapper = mount<GeneralStructsFormItemV2Props>(
      <GeneralStructsFormItemV2 {...props} />
    );

    expect(
      wrapper.find(ForwardRefSingleBrickAsComponent).prop("useBrick")
    ).toBe(modalContentBrick);

    // add
    wrapper.find(Button).filter("[data-testid='add-button']").invoke("onClick")(
      {} as React.MouseEvent<HTMLElement, MouseEvent>
    );

    expect(reset).toBeCalled();

    wrapper
      .find(Modal)
      .filter("[data-testid='add-and-edit-modal']")
      .invoke("onOk")({} as React.MouseEvent<HTMLElement, MouseEvent>);

    expect(handleChange).toBeCalledWith(
      expect.arrayContaining([...value, newItemValues])
    );
    expect(
      wrapper
        .find(Modal)
        .filter("[data-testid='add-and-edit-modal']")
        .prop("visible")
    ).toBe(false);

    // edit
    wrapper
      .find(Button)
      .filter("[data-testid='edit-button']")
      .at(0)
      .invoke("onClick")({} as React.MouseEvent<HTMLElement, MouseEvent>);

    expect(setInitValue).toBeCalledWith(value[0]);

    wrapper
      .find(Modal)
      .filter("[data-testid='add-and-edit-modal']")
      .invoke("onOk")({} as React.MouseEvent<HTMLElement, MouseEvent>);

    expect(handleChange).toBeCalledWith(
      expect.arrayContaining(update(value, { 0: { $set: newItemValues } }))
    );
    expect(
      wrapper
        .find(Modal)
        .filter("[data-testid='add-and-edit-modal']")
        .prop("visible")
    ).toBe(false);

    // delete
    const spiedOnModalConfirm = jest.spyOn(Modal, "confirm");

    wrapper
      .find(Button)
      .filter("[data-testid='delete-button']")
      .at(0)
      .invoke("onClick")({} as React.MouseEvent<HTMLElement, MouseEvent>);

    expect(spiedOnModalConfirm).toBeCalled();

    spiedOnModalConfirm.mock.calls[0][0].onOk();

    expect(handleChange).toBeCalledWith(
      expect.arrayContaining(update(value, { $splice: [[0, 1]] }))
    );
  });
});
