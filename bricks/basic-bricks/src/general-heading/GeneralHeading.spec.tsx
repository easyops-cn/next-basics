import React from "react";
import { shallow } from "enzyme";
import { GeneralHeading } from "./GeneralHeading";

describe("GeneralHeading", () => {
  it("should work", () => {
    const wrapper = shallow(<GeneralHeading text="abc" />);
    expect(wrapper.text()).toBe("abc");
    expect(wrapper.at(0).find("h1").exists()).toBeTruthy();

    wrapper.setProps({
      text: "def",
      type: "h6",
    });
    const h6 = wrapper.find("h6").at(0);
    expect(wrapper.text()).toBe("def");
    expect(h6.prop("style")).toEqual({
      fontSize: "16px",
    });

    wrapper.setProps({
      text: "def",
      type: "h5",
    });
    const h5 = wrapper.find("h5").at(0);
    expect(h5.prop("style")).toEqual({
      fontSize: "20px",
    });

    wrapper.setProps({
      text: "def",
      type: "h4",
    });
    const h4 = wrapper.find("h4").at(0);
    expect(h4.prop("style")).toEqual({
      fontSize: "24px",
    });

    wrapper.setProps({
      text: "def",
      type: "h3",
    });
    const h3 = wrapper.find("h3").at(0);
    expect(h3.prop("style")).toEqual({
      fontSize: "28px",
    });

    wrapper.setProps({
      text: "def",
      type: "h2",
      customStyle: {
        fontSize: 20,
        fontWight: 100,
        color: "#def",
        lineHeight: "20px",
      },
    });

    const h2 = wrapper.at(0).find("h2");
    expect(wrapper.text()).toBe("def");
    expect(h2.prop("style")).toEqual({
      fontSize: 20,
      fontWight: 100,
      color: "#def",
      lineHeight: "20px",
    });
  });
});
