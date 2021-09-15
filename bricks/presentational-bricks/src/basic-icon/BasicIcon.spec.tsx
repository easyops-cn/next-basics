import React from "react";
import { mount } from "enzyme";
import { BasicIcon } from "./BasicIcon";
import cssStyle from "./BasicIcon.module.css";
import { MenuIcon } from "@next-core/brick-types";

describe("BasicIcon", () => {
  it("should work", () => {
    const icon: MenuIcon = {
      lib: "fa",
      icon: "angle-left",
      prefix: "fas",
      color: "#167be0",
    };
    const renderBg = true;
    const itemClick = jest.fn();
    const wrapper = mount(
      <BasicIcon icon={icon} renderBg={renderBg} itemClick={itemClick} />
    );
    expect(wrapper.find(`.${cssStyle.iconWrapper}`)).toHaveLength(1);
    wrapper.setProps({ renderBg: false });
    wrapper.update();
    expect(wrapper.find(`.${cssStyle.iconWrapper}`)).toHaveLength(0);
    wrapper.find("BasicIcon").simulate("click");
    expect(itemClick).toBeCalled();
    expect(wrapper.find("img")).toHaveLength(0);
    wrapper.setProps({
      icon: {
        imgSrc: "test_img.jpg",
      },
    });
    wrapper.update();
    expect(wrapper.find("img")).toHaveLength(1);
  });
});
