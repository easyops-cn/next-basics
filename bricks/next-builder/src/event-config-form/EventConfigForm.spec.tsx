import React from "react";
import { shallow } from "enzyme";
import { Form, Radio } from "antd";
import { EventConfigForm } from "./EventConfigForm";

describe("EventConfigForm", () => {
  it("should work", () => {
    const wrapper = shallow(<EventConfigForm />);
    expect(wrapper.find(Form.Item).at(0).find(Radio).length).toEqual(4);
  });
});
