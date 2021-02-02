import React from "react";
import { shallow } from "enzyme";
import { BrickDivider } from "./BrickDivider";

describe("BrickDivider", () => {
  it("should work", () => {
    const wrapper = shallow(
      <BrickDivider type="horizontal" dashed={false} dividerStyle={{}} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
