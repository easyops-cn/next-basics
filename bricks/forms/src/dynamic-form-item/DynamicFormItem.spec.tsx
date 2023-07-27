import React from "react";
import { shallow } from "enzyme";
import { Form } from "@ant-design/compatible";
import { Select, Input, InputNumber } from "antd";
import { DynamicCommonItem } from "../dynamic-common-item/DynamicCommonItem";
import { DynamicFormItem, RowFormItem } from "./DynamicFormItem";

describe("DynamicFormItem", () => {
  it("should work", () => {
    const props = {
      name: "dynamic",
      columns: [
        {
          name: "type",
          rules: [
            {
              required: true,
              message: "请填写名称",
            },
          ],
          type: "select",
          selectProps: {
            options: [
              {
                label: "原始告警内容",
                value: "origin",
              },
              {
                label: "事件来源",
                value: "event",
              },
              {
                label: "告警指标",
                value: "alert",
              },
            ],
          },
        },
        {
          name: "operate",
          type: "select",
          selectProps: {
            placeholder: "比较器",
            options: [
              {
                label: "包含",
                value: "contain",
              },
              {
                label: "等于",
                value: "equal",
              },
            ],
          },
        },
        {
          name: "content",
          type: "input",
          inputProps: {
            placeholder: "填写相应的关键字",
          },
        },
      ],
    };
    const wrapper = shallow(<DynamicFormItem {...props} />);

    expect(wrapper.find(DynamicCommonItem).prop("columns")).toEqual([
      {
        name: "type",
        rules: [
          {
            required: true,
            message: "请填写名称",
          },
        ],
        type: "select",
        selectProps: {
          options: [
            {
              label: "原始告警内容",
              value: "origin",
            },
            {
              label: "事件来源",
              value: "event",
            },
            {
              label: "告警指标",
              value: "alert",
            },
          ],
        },
      },
      {
        name: "operate",
        type: "select",
        selectProps: {
          placeholder: "比较器",
          options: [
            {
              label: "包含",
              value: "contain",
            },
            {
              label: "等于",
              value: "equal",
            },
          ],
        },
      },
      {
        name: "content",
        type: "input",
        inputProps: {
          placeholder: "填写相应的关键字",
        },
      },
    ]);
  });

  it("should render different type form item", () => {
    const onChangeMock = jest.fn();
    const props = {
      prefixId: "dynamic[0]",
      row: {
        type: "origin",
        operate: "contain",
        content: ["a", "b"],
      },
      columns: [
        {
          name: "type",
          rules: [
            {
              required: true,
              message: "请填写名称",
            },
          ],
          type: "select",
          selectProps: {
            options: [
              {
                label: "原始告警内容",
                value: "origin",
              },
              {
                label: "事件来源",
                value: "event",
              },
              {
                label: "告警指标",
                value: "alert",
              },
            ],
          },
        },
        {
          name: "operate",
          type: "select",
          selectProps: {
            placeholder: "比较器",
            options: [
              {
                label: "包含",
                value: "contain",
              },
              {
                label: "等于",
                value: "equal",
              },
            ],
          },
        },
        {
          name: "content",
          type: "input",
          inputProps: {
            placeholder: "填写相应的关键字",
          },
        },
        {
          name: "count",
          type: "inputNumber",
          inputProps: {
            placeholder: "填写相应的数量",
          },
        },
        {
          name: "password",
          type: "password",
          encrypt: true,
          inputProps: {
            placeholder: "password input",
          },
        },
      ],
      form: {
        getFieldDecorator: () => (comp: React.Component) => comp,
      } as any,
      onChange: onChangeMock,
    };

    const wrapper = shallow(<RowFormItem {...props} />);
    expect(wrapper.find(Form.Item).at(0).children().type()).toEqual(Select);
    expect(wrapper.find(Form.Item).at(2).children().type()).toEqual(Input);

    wrapper.find(Select).at(0).invoke("onChange")("alert", null);
    expect(onChangeMock).toHaveBeenCalledWith("alert", "type");

    wrapper.find(Input).invoke("onChange")({ target: { value: "b" } });
    expect(onChangeMock).toHaveBeenCalledWith("b", "content");

    wrapper.find(Input.Password).invoke("onChange")({ target: { value: "A" } });
    expect(onChangeMock).toHaveBeenCalledWith("A", "password");

    wrapper.find(InputNumber).invoke("onChange")(3);
    expect(onChangeMock).toHaveBeenCalledWith(3, "count");
  });

  it("should diabled base on different condition", () => {
    const props = {
      prefixId: "dynamic[0]",
      rowIndex: 0,
      row: {
        type: "origin",
        operate: "contain",
        content: ["a", "b"],
      },
      columns: [
        {
          name: "operate",
          type: "select",
          selectProps: {
            placeholder: "比较器",
            options: [
              {
                label: "包含",
                value: "contain",
              },
              {
                label: "等于",
                value: "equal",
              },
            ],
          },
        },
        {
          name: "content",
          type: "input",
          inputProps: {
            disabledHandler: (row: any, index: number) => index === 0,
            placeholder: "填写相应的关键字",
          },
        },
        {
          name: "count",
          type: "inputNumber",
          inputProps: {
            placeholder: "填写相应的数量",
          },
        },
      ],
      form: {
        getFieldDecorator: () => (comp: React.Component) => comp,
      } as any,
    };

    const wrapper = shallow(<RowFormItem {...props} />);
    expect(wrapper.find(Input).prop("disabled")).toEqual(true);
  });
  it("should work base on different selectProps condition", () => {
    const props = {
      prefixId: "dynamic[1]",
      rowIndex: 1,
      row: {
        type: "origin",
        operate: "contain",
        content: ["a", "b"],
      },
      columns: [
        {
          name: "content",
          type: "input",
          inputProps: {
            placeholder: "填写相应的关键字",
          },
        },
        {
          name: "operate",
          type: "select",
          selectProps: {
            placeholder: "比较器",
            selectedHandler: (row: any, index: number) =>
              index === 0
                ? [
                    { lablel: "包含", value: "contain" },
                    { label: "不包含", value: "notContain" },
                  ]
                : [
                    { label: "正确", value: true },
                    { label: "错误", value: false },
                    { label: "有点正常", value: "test" },
                  ],
          },
        },
      ],
      form: {
        getFieldDecorator: () => (comp: React.Component) => comp,
      } as any,
    };

    const wrapper = shallow(<RowFormItem {...props} />);
    expect(wrapper.find(Form.Item).at(1).children().type()).toEqual(Select);
    expect(wrapper.find(Select).at(0).find(Select.Option).length).toBe(3);
  });
  it("Show user options", () => {
    const props = {
      prefixId: "dynamic[0]",
      name: "dynamic",
      label: "动态用户表单项",
      row: {
        user: "user",
      },
      columns: [
        {
          name: "user",
          rules: [
            {
              required: true,
              message: "请填写用户名称",
            },
          ],
          type: "userSelect",
        },
        {
          name: "address",
          rules: [
            {
              message: "级联菜单不能为空",
              required: true,
            },
          ],
          cascaderProps: {
            options: [
              {
                label: "zhejiang",
                value: "zhejiang",
                children: [
                  {
                    value: "hangzhou",
                    label: "hangzhou",
                    children: [
                      {
                        value: "xihu",
                        label: "xihu",
                      },
                    ],
                  },
                ],
              },
              {
                value: "guangdong",
                label: "guangdong",
                children: [
                  {
                    value: "guangzhou",
                    label: "guangzhou",
                  },
                ],
              },
            ],
            placeholder: "请选择级联菜单",
            disabled: false,
            expandTrigger: "hover",
            allowClear: true,
            showSearch: true,
          },
          type: "cascader",
        },
      ],
      form: {
        getFieldDecorator: () => (comp: React.Component) => comp,
      } as any,
    };
    const wrapper = shallow(<RowFormItem {...props} />);
    wrapper.find(Select).invoke("onSearch")("");
  });
});
