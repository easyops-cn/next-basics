import React from "react";
import { shallow } from "enzyme";
import { CostTime } from "./CostTime";

describe("CostTime", () => {
  it("should work", () => {
    const wrapper = shallow(<CostTime cost={123} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should work when cost is undefined", () => {
    const wrapper = shallow(
      <CostTime startTime="2019-10-19 18:13:18" endTime="2019-10-19 18:13:21" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
