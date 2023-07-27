import React from "react";
import { shallow } from "enzyme";
import { BrickColors } from "./BrickColors";

describe("BrickColors", () => {
  it("should work", () => {
    const list = [
      {
        title: "redTheme",
        group: ["pink", "red"]
      },
      {
        title: "greenTheme",
        group: ["green"]
      }
    ];
    const wrapper = shallow(<BrickColors list={list} />);

    expect(wrapper.find("div").text()).toBe("<ColorGroup /><ColorGroup />");
  });
});
