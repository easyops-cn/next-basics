import React from "react";
import { mount } from "enzyme";
import { Form } from "@ant-design/compatible";
import { BrickForm } from "./BrickForm";

describe("ContractContainer", () => {
  const props = {
    showCancel: true,
    showConfirm: true,
    confirmText: "确定",
    fields: [
      {
        field: "name",
        label: "标签",
        component: "Input",
      },
    ],
    onBrickFormRef: jest.fn(),
  };
  it("should work", () => {
    const wrapper = mount(<BrickForm {...props} />);
    expect(wrapper.find(Form).length).toBe(1);
    expect(wrapper.find("WithWrapperItem").length).toBe(1);
    expect(wrapper.find("Button").length).toBe(2);
  });

  it("should trigger submit event", () => {
    const mockSubmit = jest.fn();
    const newProps = {
      ...props,
      onSubmit: mockSubmit,
    };
    const wrapper = mount(<BrickForm {...newProps} />);
    expect(props.onBrickFormRef).toHaveBeenCalled();

    const instance = wrapper.find("LegacyBrickForm").instance() as any;

    instance.props.form.validateFields = jest.fn((callback) => callback(true));
    wrapper.find(Form).simulate("submit", { preventDefault: jest.fn() });
    expect(mockSubmit).not.toHaveBeenCalled();

    instance.props.form.validateFields = jest.fn((callback) =>
      callback(false, { field: "name" })
    );
    wrapper.find(Form).simulate("submit", { preventDefault: jest.fn() });
    expect(mockSubmit).toHaveBeenCalledWith({ field: "name" });
  });

  it("should trigger field change event", () => {
    const mockFn = jest.fn();

    const wrapper = mount(<BrickForm {...props} onFieldChange={mockFn} />);

    wrapper.find("WithWrapperItem").invoke("onFieldChange")("new", "name");

    expect(mockFn).toHaveBeenCalled();
  });
});
