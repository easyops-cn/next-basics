import React from "react";
import { shallow, mount } from "enzyme";
import {
  CmdbObjectAttrValue,
  CmdbObjectAttrValueItem,
  defaultValueMap,
} from "./CmdbObjectAttrValue";
import { Select, Input, Row, Col, Radio, Empty } from "antd";
const Option = Select.Option;

describe("CmdbObjectAttrValue", () => {
  it("should work", () => {
    const props = {
      formElement: {
        formUtils: {
          getFieldDecorator: () => (comp: React.Component) => comp,
        },
      } as any,
      value: {
        type: "str",
        default: "",
      },
    };
    const wrapper = mount(<CmdbObjectAttrValue {...props} />);
    expect(
      wrapper.find(Select).at(0).children().props()["children"].length
    ).toBe(13);
  });

  it("should work with valueType input", () => {
    const props = {
      valueType: ["int", "date", "ip"],
      formElement: {
        formUtils: {
          getFieldDecorator: () => (comp: React.Component) => comp,
        },
      } as any,
      value: {
        type: "str",
        default: "",
      },
    };
    const wrapper = mount(<CmdbObjectAttrValue {...props} />);
    expect(
      wrapper.find(Select).at(0).children().props()["children"].length
    ).toBe(3);
  });

  it.each([
    ["int"],
    ["date"],
    ["datetime"],
    ["enum"],
    ["enums"],
    ["arr"],
    ["struct"],
    ["structs"],
    ["ip"],
    ["bool"],
    ["float"],
  ])("should change value type %s", (type: string) => {
    const props = {
      formElement: {
        formUtils: {
          getFieldDecorator: () => (comp: React.Component) => comp,
        },
      } as any,
      value: {
        type: "str",
        default: "",
      },
      onChange: jest.fn(),
    };
    const wrapper = shallow(<CmdbObjectAttrValueItem {...props} />);
    wrapper.find(Select).at(0).invoke("onChange")(type, null);
    expect(props.onChange).toBeCalledWith({
      ...defaultValueMap.get(type),
      type,
    });
  });
});
