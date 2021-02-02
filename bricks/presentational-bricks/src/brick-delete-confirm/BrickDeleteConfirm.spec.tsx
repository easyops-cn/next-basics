import React from "react";
import { shallow, mount } from "enzyme";
import { BrickDeleteConfirm, CardBody } from "./BrickDeleteConfirm";

describe("BrickDeleteConfirm", () => {
  const deleteName = "console-w";

  const onDelete = jest.fn();
  const handleCancel = jest.fn();

  it("should work", () => {
    const wrapper = shallow(
      <BrickDeleteConfirm
        deleteName={deleteName}
        onDelete={onDelete}
        handleCancel={handleCancel}
        visible={true}
        loading={false}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should trigger onDelete when modal is ok", () => {
    const mockOnDelete = jest.fn();
    const wrapper = mount(
      <BrickDeleteConfirm
        deleteName={deleteName}
        onDelete={mockOnDelete}
        handleCancel={handleCancel}
        visible={true}
        loading={true}
      />
    );
    wrapper.find("Modal").invoke("onOk")();
    expect(mockOnDelete).toBeCalled();
    wrapper.find("Modal").invoke("onCancel")();
    expect(wrapper.find("CardBody").prop("content")).toBe("");
    wrapper.find("CardBody").invoke("handleChange")("123");
    expect(wrapper.find("CardBody").prop("content")).toBe("123");
  });

  it("should change the value", () => {
    const handleChange = jest.fn();

    const wrapper = mount(
      <CardBody name={deleteName} content="" handleChange={handleChange} />
    );

    wrapper
      .find("input")
      .simulate("change", { target: { value: "console-W" } });

    expect(handleChange).toHaveBeenCalled();
    expect(wrapper.find("input").props().value).toEqual("console-W");
  });
});
