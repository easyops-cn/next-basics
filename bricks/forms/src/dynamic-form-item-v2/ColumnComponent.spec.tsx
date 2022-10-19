import React from "react";
import { shallow } from "enzyme";
import { Cascader, Form, Input, InputNumber, Select } from "antd";
import { ColumnComponent } from "./ColumnComponent";
import { CodeEditorItem } from "@next-libs/code-editor-components";
import { Column, ComponentType } from "../interfaces";

const field = {
  name: 0,
  key: 0,
  fieldKey: 0,
};

const inputColumn = {
  name: "input",
  label: "input",
  // type: ComponentType.INPUT,
  type: "input",
  props: {
    placeholder: "input",
  },
} as Column;

const selectColumn = {
  name: "select",
  label: "select",
  // type: ComponentType.SELECT,
  type: "select",
  props: {
    options: [{ label: "a", value: "a" }],
  },
} as Column;

const inputNumberColumn = {
  name: "inputNumber",
  label: "inputNumber",
  // type: ComponentType.INPUT_NUMBER,
  type: "inputNumber",
  props: {},
} as Column;

const inputPasswordColumn = {
  name: "inputPassword",
  label: "inputPassword",
  // type: ComponentType.INPUT_PASSWORD,
  type: "inputPassword",
  props: {},
} as Column;

const cascaderColumn = {
  name: "cascader",
  label: "cascader",
  // type: ComponentType.CASCADER,
  type: "cascader",
  props: {
    options: [{ label: "a", value: "a" }],
  },
} as Column;

const editorColumn = {
  name: "editor",
  label: "editor",
  type: "editor",
  props: {
    mode: "yaml",
  },
} as Column;

describe("ColumnComponent", () => {
  it("default should work", () => {
    const wrapper = shallow(
      <ColumnComponent column={{} as Column} field={field} />
    );
    expect(wrapper.find(Form.Item)).toHaveLength(0);
  });

  it("input should work", () => {
    const wrapper = shallow(
      <ColumnComponent column={inputColumn} field={field} />
    );
    expect(wrapper.find(Input)).toHaveLength(1);
  });

  it("select should work", () => {
    const wrapper = shallow(
      <ColumnComponent column={selectColumn} field={field} />
    );
    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(Select.Option)).toHaveLength(1);
    expect(wrapper.find(Select.OptGroup)).toHaveLength(0);

    wrapper.setProps({
      column: {
        ...selectColumn,
        props: {
          ...selectColumn.props,
          groupBy: "label",
          popoverPositionType: "parent",
        },
      },
    });
    wrapper.update();
    expect(wrapper.find(Select.Option)).toHaveLength(1);
    expect(wrapper.find(Select.OptGroup)).toHaveLength(1);

    expect(wrapper.find(Select).prop("filterOption")).toBeFalsy();
    wrapper.setProps({
      column: {
        ...selectColumn,
        props: { ...selectColumn.props, showSearch: true },
      },
    });
    wrapper.update();
    expect(wrapper.find(Select).prop("filterOption")).not.toBeFalsy();
  });

  it("inputNumber should work", () => {
    const wrapper = shallow(
      <ColumnComponent column={inputNumberColumn} field={field} />
    );
    expect(wrapper.find(InputNumber)).toHaveLength(1);
  });

  it("inputPassword should work", () => {
    const wrapper = shallow(
      <ColumnComponent column={inputPasswordColumn} field={field} />
    );
    expect(wrapper.find(Input.Password)).toHaveLength(1);
  });

  it("cascader should work", () => {
    const wrapper = shallow(
      <ColumnComponent column={cascaderColumn} field={field} />
    );
    expect(wrapper.find(Cascader)).toHaveLength(1);
  });

  it("editor should work", () => {
    const wrapper = shallow(
      <ColumnComponent column={editorColumn} field={field} />
    );

    expect(wrapper.find(CodeEditorItem)).toHaveLength(1);
  });

  it("label should work", () => {
    const wrapper = shallow(
      <ColumnComponent
        column={inputColumn}
        field={field}
        rowIndex={0}
        hasLabel={true}
      />
    );
    expect(wrapper.find(Form.Item).prop("label")).toBeTruthy();

    wrapper.setProps({
      rowIndex: 1,
      hasLabel: true,
    });
    expect(wrapper.find(Form.Item).prop("label")).toBeFalsy();

    wrapper.setProps({
      rowIndex: 1,
      hasLabel: false,
    });
    expect(wrapper.find(Form.Item).prop("label")).toBeFalsy();

    wrapper.setProps({
      rowIndex: 0,
      hasLabel: false,
    });
    expect(wrapper.find(Form.Item).prop("label")).toBeFalsy();
  });

  it("disabled should work", () => {
    const wrapper = shallow(
      <ColumnComponent
        column={inputColumn}
        field={field}
        rowIndex={0}
        hasLabel={true}
      />
    );

    wrapper.setProps({
      column: {
        ...inputColumn,
        props: {
          ...inputColumn.props,
          disabled: (row: Record<string, any>, index: number) =>
            row?.input === "input",
        },
      },
    });
    expect(wrapper.find(Input).prop("disabled")).toBeFalsy();
    wrapper.setProps({
      formValue: [{ input: "input" }],
    });
    expect(wrapper.find(Input).prop("disabled")).toBeTruthy();
  });

  it("unique should work", () => {
    const column = {
      ...inputColumn,
      rules: [
        { unique: true, message: "unique" },
        { required: true, message: "这个是必填项" },
      ],
    };
    const wrapper = shallow(
      <ColumnComponent
        column={column}
        field={field}
        rowIndex={0}
        hasLabel={true}
        formValue={[{ input: "a" }, { input: "a" }]}
      />
    );

    const validatorFn = jest.fn();
    const customValidator = wrapper.find(Form.Item).prop("rules")[0].validator;
    customValidator({ message: "unique" }, "a", validatorFn);
    expect(validatorFn).toBeCalledWith("unique");
  });

  it("validator should work", () => {
    const column = {
      ...inputColumn,
      rules: [
        {
          validator: (rule, value, cb, fullValue) => cb(fullValue),
        },
      ],
    };
    const formValue = [{ input: "a" }, { input: "b" }];
    const rowIndex = 0;
    const wrapper = shallow(
      <ColumnComponent
        column={column}
        field={field}
        rowIndex={rowIndex}
        hasLabel={true}
        formValue={formValue}
      />
    );

    const validatorFn = jest.fn();
    const customValidator = wrapper.find(Form.Item).prop("rules")[0].validator;
    customValidator({ message: "validator" }, "a", validatorFn);
    expect(validatorFn).toBeCalledWith({
      formValue,
      rowIndex,
      rowValue: formValue[rowIndex],
    });
  });
});
