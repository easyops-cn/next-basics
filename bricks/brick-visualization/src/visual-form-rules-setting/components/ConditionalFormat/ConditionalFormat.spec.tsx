import React from "react";
import "@testing-library/jest-dom";
import {
  ConditionalFormatAdapter,
  ConditionalFormat,
} from "./ConditionalFormat";
import { shallow, mount } from "enzyme";
import {
  PlusOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Modal, Select, Input } from "antd";

const props = {
  originOptions: [
    {
      label: "1",
      value: "1",
    },
  ],
  operationOptions: [
    {
      label: "1",
      value: "1",
    },
  ],
  onChange: jest.fn(),
  value: {
    groups: [
      {
        conditions: [
          {
            conditionId: "condition_39",
            op: "and",
            operation: "contain",
            origin: "表单项1",
            value: "aaa",
            comparisonValType: "fixed",
          },
          {
            conditionId: "condition_40",
            op: "and",
            operation: "contain",
            origin: "表单项1",
            value: "aaa",
            comparisonValType: "fixed",
          },
        ],
        groupId: "group_38",
      },
      {
        conditions: [
          {
            origin: "表单项1",
            operation: "equal",
            value: "bbba",
            op: "and",
            comparisonValType: "fixed",
            conditionId: "condition_41",
          },
        ],
        groupId: "group_40",
      },
    ],
    op: "and",
  },
};

describe("ConditionalFormat", () => {
  it("should work", () => {
    const wrapper = shallow(<ConditionalFormatAdapter {...props} />);
    expect(wrapper.find(ConditionalFormat).length).toBe(1);
  });

  it("should PlusOutlined work", () => {
    const wrapper = mount(<ConditionalFormatAdapter {...props} />);
    wrapper.find(PlusOutlined).at(0).simulate("click");
    wrapper.update();
    wrapper.find(Modal).find(Select).invoke("onChange")(["1"]);
    wrapper.update();
    wrapper.find(Modal).invoke("onOk")();
    wrapper.update();
    expect(wrapper.find(Modal).props().visible).toBeFalsy();
  });

  it("should cancel work", () => {
    const wrapper = mount(<ConditionalFormatAdapter {...props} />);
    wrapper.find(PlusOutlined).at(0).simulate("click");
    wrapper.update();
    wrapper.find(Modal).find(Select).invoke("onChange")(["1"]);
    wrapper.update();
    wrapper.find(Modal).invoke("onCancel")();
    wrapper.update();
    expect(wrapper.find(Modal).props().visible).toBeFalsy();
  });

  it("should PlusOutlined1 work", () => {
    const newProps = {
      ...props,
      value: null,
    };
    const wrapper = mount(<ConditionalFormatAdapter {...newProps} />);
    wrapper.find(PlusOutlined).at(0).simulate("click");
    wrapper.find(Modal).find(Select).invoke("onChange")(["1"]);
    wrapper.update();
    wrapper.find(Modal).invoke("onOk")();
    wrapper.update();
    expect(wrapper.find(Modal).props().visible).toBeFalsy();
  });

  it("should CloseCircleOutlined work", () => {
    const wrapper = mount(<ConditionalFormatAdapter {...props} />);
    wrapper.find(CloseCircleOutlined).at(0).simulate("click");
    expect(wrapper.find(DeleteOutlined).length).toBe(2);
  });

  it("should add Group work", () => {
    const newProps = {
      ...props,
      value: null,
    };
    const wrapper = mount(<ConditionalFormatAdapter {...newProps} />);
    wrapper.find(PlusOutlined).at(1).simulate("click");
    wrapper.find(PlusOutlined).at(2).simulate("click");
    expect(wrapper.find(DeleteOutlined).length).toBe(0);
  });

  it("should handleConditionOpChange work", () => {
    const wrapper = mount(<ConditionalFormatAdapter {...props} />);
    wrapper.find(Select).at(0).invoke("onChange")(["and", 0], null);
    wrapper.find(Select).at(1).invoke("onChange")(["or", 0], null);
    wrapper.find(Select).at(2).invoke("onChange")(["or", 0], null);
    wrapper.find(Input).at(0).invoke("onChange")(
      { target: { value: "55" } },
      0,
      0
    );
    expect(wrapper.find(DeleteOutlined).length).toBe(3);
  });

  it("should deleteCondition work", () => {
    const wrapper = mount(<ConditionalFormatAdapter {...props} />);
    wrapper.find(DeleteOutlined).at(0).invoke("onClick")();
    expect(wrapper.find(DeleteOutlined).length).toBe(2);
  });

  it("should noGroup work", () => {
    const newProps = {
      ...props,
      value: {
        groups: [
          {
            conditions: [
              {
                op: "and",
                operation: "contain",
                origin: "表单项1",
                value: "aaa",
              },
              {
                op: "and",
                operation: "contain",
                origin: "表单项1",
                value: "aaa",
              },
            ],
          },
          {
            conditions: [
              {
                origin: "表单项1",
                operation: "equal",
                value: "bbba",
                op: "and",
              },
            ],
          },
        ],
        op: "and",
      },
    };
    const wrapper = mount(<ConditionalFormatAdapter {...newProps} />);
    expect(wrapper.find(Modal).props().visible).toBeFalsy();
  });
});
