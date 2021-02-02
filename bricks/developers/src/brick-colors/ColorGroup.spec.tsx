import React from "react";
import { shallow } from "enzyme";
import { ColorGroup, ColorCube } from "./ColorGroup";

describe("ColorGroup", () => {
  it("should work", () => {
    const wrapper = shallow(
      <ColorGroup title="redTheme" group={["pink", "red"]} />
    );
    expect(wrapper.find("div").text()).toBe(
      "redTheme<ColorCube /><ColorCube />"
    );

    const wrapper2 = shallow(<ColorGroup title="redTheme" />);
    expect(wrapper2.find("div").text()).toEqual("redTheme");
  });

  it("ColorCube should work", () => {
    const wrapper = shallow(<ColorCube color="--theme-red-color" />);
    wrapper.find("Clipboard").invoke("onCopy")("text");
    expect(wrapper.find("Clipboard").prop("text")).toEqual(
      "var(--theme-red-color)"
    );
  });
});
