import React from "react";
import { Row, Input } from "antd";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { DynamicCommonItem } from "./DynamicCommonItem";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

describe("DynamicCommonItem", () => {
  const TestInput = (props: any) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      props.onChange?.(value, "name");
    };

    return <Input onChange={handleChange} />;
  };

  it("should render empty row default", () => {
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
      formElement: {
        formUtils: {
          getFieldValue: jest.fn(),
        },
      } as any,
    };
    const wrapper = shallow(
      <DynamicCommonItem {...props}>
        <TestInput />
      </DynamicCommonItem>
    );
    expect(wrapper.find(TestInput).length).toEqual(0);
  });

  it("should work with add/remove item", () => {
    const setFieldsValueMock = jest.fn();
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
      formElement: {
        formUtils: {
          getFieldValue: () => [
            { name: "jack", port: "80", type: "tcp" },
            { name: "lucy", port: "50", type: "udp" },
          ],
          setFieldsValue: setFieldsValueMock,
        },
      } as any,
      onRemove: jest.fn(),
      onChange: jest.fn(),
    };
    const wrapper = shallow(
      <DynamicCommonItem {...props}>
        <TestInput />
      </DynamicCommonItem>
    );

    wrapper.find(TestInput).at(0).invoke("onChange")("abc", "name");

    expect(props.onChange).toBeCalledWith([
      { name: "abc", port: "80", type: "tcp" },
      { name: "lucy", port: "50", type: "udp" },
    ]);

    wrapper.find({ type: "link" }).at(1).simulate("click");

    expect(setFieldsValueMock).toHaveBeenCalledWith({
      dynamic: [{ name: "abc", port: "80", type: "tcp" }],
    });

    wrapper.find({ type: "dashed" }).simulate("click");

    expect(setFieldsValueMock).toHaveBeenCalledWith({
      dynamic: [
        { name: "abc", port: "80", type: "tcp" },
        { name: undefined, port: undefined, type: undefined },
      ],
    });

    expect(wrapper.find(MinusCircleOutlined)).toHaveLength(2);
    expect(wrapper.find(PlusOutlined)).toHaveLength(1);

    wrapper.setProps({
      hideAddButton: true,
      hideDeleteButton: true,
    });

    expect(wrapper.find(MinusCircleOutlined)).toHaveLength(0);
    expect(wrapper.find(PlusOutlined)).toHaveLength(0);
  });

  it("custom Validator", async () => {
    const props = {
      columns: [
        {
          name: "name",
          label: "名称",
          rules: [
            { required: true, message: "这个是必填项" },
            { uniq: true, message: "名称必须唯一" },
          ],
        },
        { name: "port", label: "端口" },
        { name: "type", label: "类型" },
      ],
      formElement: {
        formUtils: {
          getFieldValue: () => [
            { name: "jack", port: "80", type: "tcp" },
            { name: "jack", port: "90", type: "udp" },
          ],
          setFieldsValue: jest.fn(),
          getFieldDecorator: () => (comp: React.Component) => comp,
          validateFields: jest.fn(),
        },
      } as any,
      onRemove: jest.fn(),
      onChange: jest.fn(),
    };

    const wrapper = mount(
      <DynamicCommonItem {...props}>
        <TestInput />
      </DynamicCommonItem>
    );
    wrapper.find(Input).at(0).simulate("change", {
      target: "lucy",
    });
    const ValidatorFn = jest.fn();

    const customValidator = wrapper.find(TestInput).at(0).prop("columns")[0]
      .rules[1].validator;

    act(() => {
      customValidator({ field: "dynamic[0].name" }, "jack", ValidatorFn);
    });

    expect(ValidatorFn).toHaveBeenCalled();
  });

  it("should set dynamic value", () => {
    const setFieldsValueMock = jest.fn();
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
      formElement: {
        formUtils: {
          getFieldValue: jest.fn(),
          setFieldsValue: setFieldsValueMock,
        },
      } as any,
    };
    const wrapper = mount(
      <DynamicCommonItem {...props}>
        <TestInput />
      </DynamicCommonItem>
    );
    wrapper.setProps({
      manualEditedValue: [{ name: "test", port: "70", type: "udp" }],
    });

    expect(setFieldsValueMock).toHaveBeenCalledWith({
      dynamic: [{ name: "test", port: "70", type: "udp" }],
    });
  });
  it("hidden delete button if the dynamic value only one element", () => {
    const props = {
      name: "dynamic",
      oneRowRequired: true,
      columns: [
        {
          name: "name",
          label: "名称",
          rules: [{ required: true, message: "这个是必填项" }],
        },
        { name: "port", label: "端口" },
        { name: "type", label: "类型" },
      ],
      formElement: {
        formUtils: {
          getFieldValue: () => [
            { name: "jack", port: "80", type: "tcp" },
            { name: "lucy", port: "50", type: "udp" },
          ],
          setFieldsValue: jest.fn(),
        },
      } as any,
    };

    const wrapper = shallow(
      <DynamicCommonItem {...props}>
        <TestInput />
      </DynamicCommonItem>
    );

    expect(wrapper.find(MinusCircleOutlined)).toHaveLength(2);

    wrapper.find({ type: "link" }).at(0).simulate("click");

    wrapper.update();

    expect(wrapper.find(MinusCircleOutlined)).toHaveLength(0);
  });

  it("disabled removed button of the specified row ", () => {
    const props = {
      name: "dynamic",
      rowDisabledhandler: (row: any, index: number) => index === 0,
      columns: [
        {
          name: "name",
          label: "名称",
          rules: [{ required: true, message: "这个是必填项" }],
        },
        { name: "port", label: "端口" },
        { name: "type", label: "类型" },
      ],
      formElement: {
        formUtils: {
          getFieldValue: () => [
            { name: "jack", port: "80", type: "tcp" },
            { name: "lucy", port: "50", type: "udp" },
          ],
          setFieldsValue: jest.fn(),
        },
      } as any,
    };

    const wrapper = shallow(
      <DynamicCommonItem {...props}>
        <TestInput />
      </DynamicCommonItem>
    );
    expect(wrapper.find({ type: "link" }).at(0).prop("disabled")).toEqual(true);
  });
});
