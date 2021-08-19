import React from "react";
import { mount } from "enzyme";
import { BasicProgress } from "./BasicProgress";
import style from "./style.module.css";

describe("BasicProgress", () => {
  it("should work", () => {
    const value = 90;
    const description = "描述";
    const colorMap = [
      {
        progress: 60,
        color: "red",
      },
    ];
    const textColor = "green";
    const type = "circle";
    const wrapper = mount(
      <BasicProgress
        value={value}
        yat
        colorMap={colorMap}
        type={type}
        description={description}
        textColor={textColor}
      />
    );
    expect(wrapper.find(`.${style.showDescription}`).text()).toBe(description);
  });

  it("should work without", () => {
    const value = 90;
    const description = "描述";
    const type = "circle";
    const wrapper = mount(
      <BasicProgress value={value} type={type} description={description} />
    );
    expect(wrapper.find(`.${style.showDescription}`).text()).toBe(description);
  });
});
