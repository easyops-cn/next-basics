import React from "react";
import { shallow, mount } from "enzyme";
import { InfoDisplayCardList } from "./InfoDisplayCardList";
import { infoList } from "./__mocks__/infoList";
import { List, Avatar, Empty } from "antd";

describe("InfoDisplayCardList", () => {
  it("should work", () => {
    const wrapper = mount(<InfoDisplayCardList dataSource={infoList} />);
    expect(wrapper.find(".infoCardWrapper").length).toBe(8);
  });
  it("should render empty", () => {
    const wrapper = shallow(<InfoDisplayCardList dataSource={[]} />);
    expect(wrapper.find(Empty).length).toBe(1);
  });
});
