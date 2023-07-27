import React from "react";
import { shallow } from "enzyme";
import { Slider } from "antd";
import { GeneralSlider } from "./GeneralSlider";

describe("GeneralSlider", () => {
  it("should work", () => {
    const changeMock = jest.fn();
    const props = {
      value: 30,
      onChange: changeMock,
    };
    const wrapper = shallow(<GeneralSlider {...props} />);
    wrapper.find(Slider).invoke("onChange")(3);
    expect(changeMock).toHaveBeenCalledWith(3);
  });
});
