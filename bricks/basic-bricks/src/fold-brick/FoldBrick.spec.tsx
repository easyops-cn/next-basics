import React from "react";
import { shallow } from "enzyme";
import { FoldBrick } from "./FoldBrick";
import style from "./style.module.css";

describe("FoldBrick", () => {
  it("should work", () => {
    const wrapper = shallow(<FoldBrick useBrick={{}} foldName={"xxx"} />);
    expect(wrapper.text()).toContain("xxx");
    wrapper.find(`.${style.foldContainer}`).simulate("click");
    expect(wrapper.find(`.${style.foldActive}`).length).toEqual(1);
  });
});
