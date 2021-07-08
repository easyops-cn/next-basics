import React from "react";
import { shallow, mount } from "enzyme";
import { InfoDisplayCardList } from "./InfoDisplayCardList";
import { infoList } from "./__mocks__/infoList";
import { Empty } from "antd";
import * as brickKit from "@next-core/brick-kit";

const spyOnWindowOpen = (window.open = jest.fn());
const spyOnHistoryPush = jest.fn();
jest.spyOn(brickKit, "getHistory").mockReturnValue({
  push: spyOnHistoryPush,
} as any);

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

  it("should render detailOfDescBrickConf", () => {
    const wrapper = mount(
      <InfoDisplayCardList
        dataSource={infoList}
        detailOfDescBrickConf={{ useBrick: { brick: "div" } }}
      />
    );
    expect(wrapper.find("BrickAsComponent").length).toBe(1);
  });

  it("should click CardItem to open new page", () => {
    const wrapper = mount(
      <InfoDisplayCardList
        dataSource={infoList}
        detailOfDescBrickConf={{ useBrick: { brick: "div" } }}
        urlTemplate="/management/list/detail?id=#{id}"
        target="_blank"
      />
    );
    wrapper.find(".infoCard").at(0).simulate("click");

    expect(spyOnWindowOpen).toHaveBeenCalledWith(
      "/management/list/detail?id=0",
      "_blank"
    );
  });

  it("should click CardItem to change history", () => {
    const wrapper = mount(
      <InfoDisplayCardList
        dataSource={infoList}
        detailOfDescBrickConf={{ useBrick: { brick: "div" } }}
        urlTemplate="/management/list/detail?id=#{id}"
      />
    );
    wrapper.find(".infoCard").at(0).simulate("click");

    expect(spyOnHistoryPush).toHaveBeenCalledWith(
      "/management/list/detail?id=0"
    );
  });

  it("should not response to  click CardItem", () => {
    const wrapper = mount(
      <InfoDisplayCardList
        dataSource={infoList}
        detailOfDescBrickConf={{ useBrick: { brick: "div" } }}
        urlTemplate="/management/list/detail?id=#{id}"
        optionConf={{ useBrick: { brick: "div" } }}
      />
    );
    spyOnHistoryPush.mockClear();
    wrapper.find(".infoCardRightSection").at(0).childAt(1).simulate("click");
    expect(spyOnHistoryPush).not.toBeCalled();
  });
});
