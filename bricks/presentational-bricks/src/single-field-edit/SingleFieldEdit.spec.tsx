import React from "react";
import { shallow } from "enzyme";
import { Form } from "@ant-design/compatible";
import { Input, Modal, InputNumber, Radio, Select, Checkbox } from "antd";

import {
  SingleFieldEdit,
  WrappedSingleFieldEdit,
  SingleFieldEditProps,
} from "./SingleFieldEdit";
import { ControlType } from "./index";

const props = {
  title: "title",
  label: "label",
  initialValue: "value",
  placeholder: "placeholder",
  rules: [
    {
      required: true,
    },
  ],
};

describe("SingleFieldEdit", () => {
  it("should work", () => {
    const type: ControlType = ControlType.Text;
    const mockOnOk = jest.fn();
    const mockOnCancel = jest.fn();
    const wrapper = shallow(
      <SingleFieldEdit
        visible
        {...props}
        type={type}
        onOk={mockOnOk}
        onCancel={mockOnCancel}
      />
    )
      .find<SingleFieldEditProps>(WrappedSingleFieldEdit)
      .shallow();

    let modalProps = wrapper.find(Modal).props();
    modalProps.onOk();
    expect(mockOnOk).toBeCalledWith(props.initialValue);
    modalProps.onCancel();
    expect(mockOnCancel).toBeCalled();

    // text
    expect(wrapper.find(Input).prop("value")).toBe(props.initialValue);
    // textarea
    wrapper.setProps({ type: ControlType.Textarea });
    expect(wrapper.find(Input.TextArea).prop("value")).toBe(props.initialValue);
    // number
    wrapper.setProps({ type: ControlType.Number });
    expect(wrapper.find(InputNumber).prop("value")).toBe(props.initialValue);
    const options = [
      { label: "label1", value: "value1" },
      { label: "label1", value: "value1" },
    ];
    // radio
    wrapper.setProps({ type: ControlType.Radio, options });
    const radioGroup = wrapper.find(Radio.Group);
    expect(radioGroup.prop("value")).toBe(props.initialValue);
    const radios = radioGroup.children();
    expect(radios.length).toBe(options.length);
    radios.forEach((radio, index) => {
      const radioProps = radio.props();
      const option = options[index];

      expect(radioProps.value).toBe(option.value);
      expect(radioProps.children).toBe(option.label);
    });
    // select
    wrapper.setProps({ type: ControlType.Select });
    const select = wrapper.find(Select);
    expect(select.prop("value")).toBe(props.initialValue);
    const selectOptions = select.children();
    expect(selectOptions.length).toBe(options.length);
    selectOptions.forEach((selectOption, index) => {
      const selectOptionProps = selectOption.props();
      const option = options[index];

      expect(selectOptionProps.value).toBe(option.value);
      expect(selectOptionProps.children).toBe(option.label);
    });
    // select
    wrapper.setProps({
      type: ControlType.Checkbox,
      initialValue: true,
      options: undefined,
    });
    expect(wrapper.find(Checkbox).prop("value")).toBe(props.initialValue);

    wrapper.setProps({
      type: undefined,
      rules: undefined,
      onOk: undefined,
      onCancel: undefined,
    });
    modalProps = wrapper.find(Modal).props();
    const formItemProps = wrapper.find(Form.Item).props();
    modalProps.onOk();
    modalProps.onCancel();
    expect(formItemProps.children).toBe(null);
    expect(formItemProps.style).toEqual({ marginBottom: 0, paddingBottom: 0 });
  });
});
