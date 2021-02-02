import React from "react";
import { shallow, mount } from "enzyme";
import { ObjectAttrDate } from "./ObjectAttrDate";
import moment from "moment";

const defaultValue = {
  default: "",
};

describe("ObjectAttrDate", () => {
  it("should work", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = mount(<ObjectAttrDate {...props} />);
    expect(wrapper.find("Row").at(1).children(0).props().value).toBe(undefined);
  });

  it("should change default", () => {
    const props = {
      value: defaultValue,
      onChange: jest.fn(),
    };
    const wrapper = shallow(<ObjectAttrDate {...props} />);
    wrapper.find("Row").at(1).children(0).invoke("onChange")(
      moment("2020-05-14"),
      "2020-05-14"
    );
    expect(props.onChange).toBeCalledWith({
      ...defaultValue,
      default: moment("2020-05-14").format("YYYY-MM-DD"),
    });
  });
});
