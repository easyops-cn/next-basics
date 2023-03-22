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
import { Modal, Select, Input, TimePicker } from "antd";

const props = {
  originOptions: [
    {
      label: "INPUT(aaa)",
      value: "INPUT(aaa)",
    },
  ],
  operationOptions: [
    {
      label: "equal",
      value: "equal",
    },
  ],
  onChange: jest.fn(),
  formChildren: [
    {
      brick: "forms.general-input",
      properties:
        '{"dataset":{"testid":"demo-name-input"},"label":"name","name":"name"}',
    },
  ],
  value: {
    groups: [
      {
        conditions: [
          {
            conditionId: "condition_39",
            op: "and",
            operation: "contain",
            origin: "INPUT(aaa)",
            value: "aaa",
            compareValType: "fixed",
          },
          {
            conditionId: "condition_40",
            op: "and",
            operation: "contain",
            origin: "INPUT(bbb)",
            value: "aaa",
            compareValType: "fixed",
          },
        ],
        groupId: "group_38",
      },
      {
        conditions: [
          {
            origin: "INPUT(ccc)",
            operation: "equal",
            value: "bbba",
            op: "and",
            compareValType: "fixed",
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
    wrapper.find(Modal).find(Select).invoke("onChange")("INPUT(aaa)");
    wrapper.update();
    wrapper.find(Modal).invoke("onOk")();
    wrapper.update();
    expect(wrapper.find(Modal).props().visible).toBeFalsy();
  });

  it("should cancel work", () => {
    const wrapper = mount(<ConditionalFormatAdapter {...props} />);
    wrapper.find(PlusOutlined).at(0).simulate("click");
    wrapper.update();
    wrapper.find(Modal).find(Select).invoke("onChange")("INPUT(aaa)");
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
    wrapper.find(Modal).find(Select).invoke("onChange")("INPUT(aaa)");
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
                origin: "INPUT(aaa)",
                value: "aaa",
              },
              {
                op: "and",
                operation: "contain",
                origin: "INPUT(bbb)",
                value: "aaa",
              },
            ],
          },
          {
            conditions: [
              {
                origin: "INPUT(ccc)",
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

  it("should render correctly based on form item type", () => {
    const newProps = {
      ...props,
      formChildren: [
        {
          brick: "forms.general-input",
          properties:
            '{"dataset":{"testid":"demo-name-input"},"label":"aaa","name":"aaa"}',
        },
        {
          brick: "forms.general-select",
          properties:
            '{"dataset":{"testid":"demo-name-input"},"label":"bbb","name":"bbb"}',
        },
        {
          brick: "forms.general-select",
          properties:
            '{"dataset":{"testid":"demo-name-input"},"label":"ccc","name":"ddd","mode":"multiple"}',
        },
      ],
      value: {
        groups: [
          {
            conditions: [
              {
                op: "and",
                operation: "contain",
                origin: "INPUT(aaa)",
                value: "aaa",
              },
              {
                op: "and",
                operation: "contain",
                origin: "SELECT(bbb)",
                value: "aaa",
              },
              {
                op: "and",
                operation: "contain",
                origin: "SELECT(ccc)",
                value: "aaa",
              },
              {
                op: "and",
                operation: "contain",
                origin: "RADIO(ddd)",
                value: "aaa",
              },
              {
                op: "and",
                operation: "contain",
                origin: "EDITOR(eee)",
                value: "aaa",
              },
              {
                op: "and",
                operation: "contain",
                origin: "SLIDE(fff)",
                value: 10,
              },
              {
                op: "and",
                operation: "contain",
                origin: "SWITCH(ggg)",
                value: false,
              },
              {
                op: "and",
                operation: "contain",
                origin: "DATE(hhh)",
                value: "2000-12-1",
              },
              {
                op: "or",
                operation: "contain",
                origin: "TIME(iii)",
                value: "10:22:11",
              },
              {
                op: "or",
                operation: "isNull",
                origin: "USER(jjj)",
                value: "aaa",
              },
              {
                op: "or",
                operation: "startWith",
                origin: "AUTO-COMPLETE(kkk)",
                value: "aaa",
              },
              {
                op: "or",
                operation: "larger",
                origin: "INPUT-NUMBER(lll)",
                value: 32,
              },
              {
                op: "or",
                operation: "endWith",
                origin: "TEXTAREA(mmm)",
                value: "aaa",
              },
              {
                op: "and",
                operation: "contain",
                origin: "INPUT(nnn)",
                value: "aaa",
                compareValType: "field",
                fieldValue: "TEXTAREA(mmm)",
              },
              {
                op: "or",
                operation: "notWithinNumericalRange",
                origin: "INPUT-NUMBER(ooo)",
                rangeValue: [32, 44],
              },
            ],
          },
          {
            conditions: [
              {
                origin: "CHECKBOX(zzz)",
                operation: "equal",
                value: ["bbba"],
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
    expect(wrapper.find(Input).length).toBe(7);
    expect(wrapper.find(Select).length).toBe(48);
  });

  it("should render correctly based on form item type 2", () => {
    const newProps = {
      ...props,
      formChildren: [
        {
          brick: "forms.general-input",
          properties: '{"label":"aaa","name":"aaa"}',
        },
        {
          brick: "forms.general-select",
          properties: '{"label":"bbb","name":"bbb"}',
        },
        {
          brick: "forms.general-select",
          properties: '{"label":"ccc","name":"ccc","mode":"multiple"}',
        },
        {
          brick: "forms.general-slide",
          properties: '{"label":"fff","name":"fff","range":false}',
        },
      ],
      value: {
        groups: [
          {
            conditions: [
              {
                op: "and",
                operation: "contain",
                origin: "INPUT(aaa)",
                value: "aaa",
                compareValType: "fixed",
              },
              {
                op: "and",
                operation: "contain",
                origin: "SELECT(bbb)",
                value: "aaa",
                compareValType: "fixed",
              },
              {
                op: "and",
                operation: "contain",
                origin: "SELECT(ccc)",
                value: "aaa",
                compareValType: "fixed",
              },
              {
                op: "and",
                operation: "in",
                origin: "RADIO(ddd)",
                value: "aaa",
                compareValType: "fixed",
              },
              {
                op: "and",
                operation: "contain",
                origin: "EDITOR(eee)",
                value: "aaa",
                compareValType: "fixed",
              },
              {
                op: "and",
                operation: "contain",
                origin: "SLIDE(fff)",
                value: 10,
                compareValType: "fixed",
              },
              {
                op: "and",
                operation: "contain",
                origin: "SWITCH(ggg)",
                value: false,
                compareValType: "fixed",
              },
              {
                op: "and",
                operation: "withinTimeRange",
                origin: "DATE(hhh)",
                value: "2000-12-1",
                compareValType: "fixed",
                rangeValue: ["2000-12-1", "2000-12-3"],
              },
              {
                op: "or",
                operation: "withinTimeRange",
                origin: "TIME(iii)",
                value: "10:22:11",
                compareValType: "fixed",
                rangeValue: ["10:22:11", "10:22:13"],
              },
              {
                op: "or",
                operation: "isNull",
                origin: "USER(jjj)",
                value: "aaa",
                compareValType: "fixed",
              },
              {
                op: "or",
                operation: "startWith",
                origin: "AUTO-COMPLETE(kkk)",
                value: "aaa",
                compareValType: "fixed",
              },
              {
                op: "or",
                operation: "larger",
                origin: "INPUT-NUMBER(lll)",
                value: 32,
                compareValType: "fixed",
              },
              {
                op: "or",
                operation: "endWith",
                origin: "TEXTAREA(mmm)",
                value: "aaa",
                compareValType: "fixed",
              },
              {
                op: "and",
                operation: "contain",
                origin: "INPUT(nnn)",
                value: "aaa",
                compareValType: "field",
                fieldValue: "TEXTAREA(mmm)",
              },
              {
                op: "or",
                operation: "notWithinNumericalRange",
                origin: "INPUT-NUMBER(ooo)",
                rangeValue: [32, 44],
                compareValType: "fixed",
              },
            ],
          },
          {
            conditions: [
              {
                origin: "CHECKBOX(ppp)",
                operation: "equal",
                value: ["bbba"],
                op: "and",
                compareValType: "fixed",
              },
            ],
          },
        ],
        op: "and",
      },
    };
    const wrapper = mount(<ConditionalFormatAdapter {...newProps} />);
    expect(wrapper.find(Modal).props().visible).toBeFalsy();
    expect(wrapper.find(Input).length).toBe(5);
    expect(wrapper.find(Select).length).toBe(50);
  });
});
