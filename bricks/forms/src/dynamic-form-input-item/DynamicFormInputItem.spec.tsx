import React from "react";
import { shallow } from "enzyme";
import { Form } from "@ant-design/compatible";
import { Input } from "antd";
import { DynamicFormInputItem, RowInput } from "./DynamicFormInputItem";

describe("DynamicFormInputItem", () => {
  it("DynamicFormInputItem should work", () => {
    const props = {
      name: "dynamic",
      columns: [
        {
          name: "name",
          label: "名称",
          rules: [{ required: true, message: "这个是必填项" }],
        },
        { name: "port", label: "端口" },
        { name: "type", label: "类型" },
      ],
    };
    const wrapper = shallow(<DynamicFormInputItem {...props} />);
    expect(wrapper.find(RowInput).prop("columns")).toEqual([
      {
        name: "name",
        label: "名称",
        rules: [{ required: true, message: "这个是必填项" }],
      },
      { name: "port", label: "端口" },
      { name: "type", label: "类型" },
    ]);
  });

  it("RowInput should work", () => {
    const onChangeMock = jest.fn();
    const props = {
      prefixId: "dynamic[0]",
      row: {
        name: "test",
        port: "80",
        type: "tcp",
      },
      columns: [
        {
          name: "name",
          label: "名称",
          rules: [{ required: true, message: "这个是必填项" }],
        },
        { name: "port", label: "端口" },
        { name: "type", label: "类型" },
      ],
      form: {
        getFieldDecorator: () => (comp: React.Component) => comp,
      } as any,
      onChange: onChangeMock,
    };
    const wrapper = shallow(<RowInput {...props} />);

    wrapper.find(Form.Item).at(2).find(Input).invoke("onChange")({
      target: { value: "TCP" },
    });

    expect(onChangeMock).toHaveBeenCalledWith("TCP", "type");
  });
});
