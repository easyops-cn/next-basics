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

    const span1 = wrapper.find("span").at(0);

    expect(wrapper.text()).toBe("def");
    expect(span1.prop("style")).toEqual({
      fontSize: 16,
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

    const span2 = wrapper.find("span").at(0);

    expect(wrapper.text()).toBe("def");
    expect(span2.prop("style")).toEqual({
      fontSize: 20,
      fontWight: 100,
      color: "#def",
      lineHeight: "20px",
    });
  });
});
