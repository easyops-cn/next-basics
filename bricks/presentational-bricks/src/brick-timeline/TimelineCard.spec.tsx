import React from "react";
import moment from "moment";
import { shallow } from "enzyme";
import { TimelineBaseCard, TimelineExtensionCard } from "./TimelineCard";

describe("TimelineCard", () => {
  it("TimelineBaseCard should work", () => {
    const wrapper = shallow(
      <TimelineBaseCard
        timestamp={moment(1555050451000)}
        title="easyops"
        description="编辑name属性"
        link="/developers"
      />
    );

    expect(wrapper.find(".dateTime").text()).toEqual("2019/04/12 14:27");
  });

  it("TimelineExtensionCard should work", () => {
    const wrapper = shallow(
      <TimelineExtensionCard
        timestamp={moment(1555050451000)}
        title="easyops"
        description="编辑name属性"
        link="/developers"
        showLeftDate={true}
      />
    );

    expect(wrapper.find(".month").text()).toEqual("4月");
    expect(wrapper.find(".day").text()).toEqual("12");

    wrapper.setProps({
      showLeftDate: false,
    });

    wrapper.update();

    expect(wrapper.find(".dateContainer").length).toEqual(0);
  });

  it("should trigger click event", () => {
    const clickFn = jest.fn();
    const wrapper = shallow(
      <TimelineBaseCard
        timestamp={moment(1555050451000)}
        title="easyops"
        description="编辑name属性"
        onClick={clickFn}
      />
    );

    wrapper.find(".link").simulate("click");
    expect(clickFn).toHaveBeenCalled();
  });
});
