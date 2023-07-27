import React from "react";
import { shallow, mount } from "enzyme";
import { ObjectAttrDatetime } from "./ObjectAttrDatetime";
import moment from "moment";

const defaultValue = {
  default: "",
};

describe("ObjectAttrDatetime", () => {
  it("should work", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = mount(<ObjectAttrDatetime {...props} />);
    expect(wrapper.find("Row").at(1).children(0).props().value).toBe(undefined);
  });

  it("should change default", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrDatetime {...props} />);
    wrapper.find("Row").at(1).children(0).invoke("onChange")(
      moment("2020-05-14"),
      "2020-05-14"
    );
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      default: "2020-05-14",
    });
  });
});
