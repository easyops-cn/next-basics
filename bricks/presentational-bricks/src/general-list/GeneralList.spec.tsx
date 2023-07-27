import React from "react";
import { shallow } from "enzyme";
import { GeneralList } from "./GeneralList";

describe("GeneralList", () => {
  it("should work", () => {
    const wrapper = shallow(<GeneralList isCardList={true} />);
    expect(wrapper).toMatchSnapshot();
  });
});
