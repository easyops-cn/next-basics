import React from "react";
import { shallow } from "enzyme";
import { Form, Radio } from "antd";
import * as brickKit from "@next-core/brick-kit";
import { EventConfigForm } from "./EventConfigForm";

describe("EventConfigForm", () => {
  jest.spyOn(brickKit, "getRuntime").mockReturnValue({
    hasInstalledApp: jest.fn().mockReturnValue(true),
  } as any);

  it("should work", () => {
    const props = {
      onValuesChange: jest.fn(),
    };
    const wrapper = shallow(<EventConfigForm {...props} />);
    expect(wrapper.find(Form.Item).at(0).find(Radio).length).toEqual(4);
  });
});
