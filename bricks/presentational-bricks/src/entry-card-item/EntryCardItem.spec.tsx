import React from "react";
import { shallow } from "enzyme";
import { EntryCardItem } from "./EntryCardItem";

describe("EntryCardItem", () => {
  it("should work", () => {
    const wrapper = shallow(
      <EntryCardItem
        cardTitle="卡片标题"
        description="卡片描述"
        iconColor="brightOrange"
        hoverHighLight={true}
        icon={{
          lib: "easyops",
          category: "model",
          icon: "host",
        }}
        url="/123"
      />
    );
    expect(wrapper.find("Link").length).toBe(1);
    wrapper.setProps({
      showCard: true,
      target: "_blank",
      url: undefined,
    });
    wrapper.update();
    expect(wrapper.find("Card").length).toBe(1);
    expect(wrapper.find(".cardTitle").length).toBe(1);
    expect(wrapper.find(".cardTitle").at(0).props().title).toBe("卡片标题");
  });
  it("should work when set tip and disabled ", () => {
    const wrapper = shallow(
      <EntryCardItem
        cardTitle="卡片标题"
        description="卡片描述"
        iconColor="brightOrange"
        hoverHighLight={true}
        icon={{
          lib: "easyops",
          category: "model",
          icon: "host",
        }}
        url="/123"
      />
    );
    expect(wrapper.find("Link").length).toBe(1);
    wrapper.setProps({
      showCard: true,
      target: "_blank",
      tip: "测试测试",
      disabled: true,
    });
    wrapper.update();
    expect(wrapper.find("Tooltip").length).toBe(1);
    expect(wrapper.find("Link").length).toBe(0);
  });
});
