import React from "react";
import { shallow, mount } from "enzyme";
import { Form } from "@ant-design/compatible";
import { BrickForm, LegacyBrickForm } from "./BrickForm";

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
    const wrapper = shallow(<BrickForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should trigger submit event", () => {
    const mockFn = jest
      .fn()
      .mockImplementationOnce((fn) => fn(true))
      .mockImplementation((fn) => fn(false, { field: "name" }));
    const mockSubmit = jest.fn();
    const newProps = {
      ...props,
      form: {
        validateFields: mockFn,
      },
      onSubmit: mockSubmit,
    };
    const wrapper = shallow(<LegacyBrickForm {...newProps} />);
    expect(props.onBrickFormRef).toHaveBeenCalled();

    wrapper.find(Form).simulate("submit", { preventDefault: jest.fn() });
    expect(mockFn).toHaveBeenCalled();

    wrapper.find(Form).simulate("submit", { preventDefault: jest.fn() });
    expect(mockSubmit).toHaveBeenCalledWith({ field: "name" });
  });

  it("should trigger field change event", () => {
    const mockFn = jest.fn();

    const form = {
      getFieldDecorator: () => jest.fn(),
    };

    const wrapper = mount(
      <LegacyBrickForm {...props} onFieldChange={mockFn} form={form} />
    );

    wrapper.find("WithWrapperItem").invoke("onFieldChange")("new", "name");

    expect(mockFn).toHaveBeenCalled();
  });
});
