import React from "react";
import { shallow } from "enzyme";
import { Slider } from "antd";
import { GeneralSlide } from "./GeneralSlide";

describe("GeneralSlide", () => {
  it("should work", () => {
    const changeMock = jest.fn();
    const props = {
      value: 30,
      onChange: changeMock,
    };
    const wrapper = shallow(<GeneralSlide {...props} />);
    wrapper.find(Slider).invoke("onChange")(3);
    expect(changeMock).toHaveBeenCalledWith(3);
    wrapper.setProps({ uiType: "dashboard" });
    expect(wrapper.find(".dashboardSlider").length).toBe(1);
  });
});
