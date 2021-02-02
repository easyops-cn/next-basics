import React from "react";
import { mount } from "enzyme";
import { createHistory } from "@next-core/brick-kit";

import { StatisticCard } from "./StatisticCard";

createHistory();

describe("StatisticCard", () => {
  it("should work", () => {
    const wrapper = mount(
      <StatisticCard title="title" icon={{ lib: "fa", icon: "fa-plus" }} />
    );
    expect(wrapper.find("GeneralIcon").length).toBe(1);
    wrapper.setProps({
      value: "value",
      iconType: "fa",
      icon: "fa-plus",
      url: "url",
      tip: "tip",
    });
    expect(wrapper.find("GeneralIcon").length).toBe(0);
    expect(wrapper.find("Link").length).toBe(1);
    wrapper.setProps({
      iconType: "svg",
      icon: "<svg><g></g></svg>",
      disabled: true,
    });
    expect(wrapper.find("Link").length).toBe(0);
  });
});
