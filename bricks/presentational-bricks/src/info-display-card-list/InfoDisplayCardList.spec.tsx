import React from "react";
import { shallow, mount } from "enzyme";
import { InfoDisplayCardList } from "./InfoDisplayCardList";
import { infoList } from "./__mocks__/infoList";
import { Empty } from "antd";
import { BrickAsComponent } from "@next-core/brick-kit";

describe("InfoDisplayCardList", () => {
  it("should work", () => {
    const wrapper = mount(<InfoDisplayCardList dataSource={infoList} />);
    expect(wrapper.find(".infoCardWrapper").length).toBe(8);
  });
  it("should render empty", () => {
    const wrapper = shallow(<InfoDisplayCardList dataSource={[]} />);
    expect(wrapper.find(Empty).length).toBe(1);
  });

  it("should render iconBrickConf", () => {
    const wrapper = mount(
      <InfoDisplayCardList
        dataSource={infoList}
        iconBrickConf={{ useBrick: { brick: "div" } }}
      />
    );
    expect(wrapper.find("BrickAsComponent").length).toBe(infoList.length);
  });

  it("should render titleBrickConf", () => {
    const wrapper = mount(
      <InfoDisplayCardList
        dataSource={infoList}
        titleBrickConf={{ useBrick: { brick: "div" } }}
      />
    );
    expect(wrapper.find("BrickAsComponent").length).toBe(infoList.length);
  });

  it("should render optionConf", () => {
    const wrapper = mount(
      <InfoDisplayCardList
        dataSource={infoList}
        optionConf={{ useBrick: { brick: "div" } }}
      />
    );
    expect(wrapper.find("BrickAsComponent").length).toBe(infoList.length);
  });
});
