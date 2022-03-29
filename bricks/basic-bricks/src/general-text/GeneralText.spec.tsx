import React from "react";
import { shallow } from "enzyme";
import { GeneralText } from "./GeneralText";

describe("GeneralText", () => {
  it("should work", () => {
    const wrapper = shallow(<GeneralText text="abc" />);
    expect(wrapper.text()).toBe("abc");

    wrapper.setProps({
      text: "def",
      fontSize: 16,
    });

    expect(wrapper.text()).toBe("def");
    expect(wrapper.find("span").prop("style")).toEqual({
      fontSize: 16,
      fontWight: 700,
      color: "#abc",
      lineHeight: "16px",
    });

    wrapper.setProps({
      fontSize: 18,
      customStyle: {
        fontSize: 20,
        fontWight: 100,
        color: "#def",
        lineHeight: "20px",
      },
    });

    expect(wrapper.find("span").prop("style")).toEqual({
      fontSize: 20,
      fontWight: 100,
      color: "#def",
      lineHeight: "20px",
    });
  });
});
