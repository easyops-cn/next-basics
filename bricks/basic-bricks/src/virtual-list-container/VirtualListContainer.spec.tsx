import React from "react";
import { mount } from "enzyme";
import { VirtualListContainer2 } from "./VirtualListContainer";
import { List } from "antd";
import VirtualList from "rc-virtual-list";

const data = [
  {
    a: "部署主机",
    value: 2,
  },
  {
    a: "上游应用",
    value: 80,
  },
  {
    a: "下游游应用",
    value: 90,
  },
];
const titleBrick = {
  useBrick: {
    brick: "div",
    transform: {
      textContent: "@{a}",
    },
  },
};

const suffixBrick = {
  useBrick: {
    brick: "div",
    transform: {
      textContent: "@{value}",
    },
  },
};

describe("AdvanceListContainer", () => {
  it("should work", () => {
    const wrapper = mount(
      <VirtualListContainer2
        data={[]}
        suffixBrick={suffixBrick}
        titleBrick={titleBrick}
        oHeight={"500px"}
        total={50}
      />
    );
    wrapper.setProps({ data });
    expect(wrapper.find(List).length).toBe(1);
  });

  it("should onScroll work", () => {
    const wrapper = mount(
      <VirtualListContainer2
        data={[]}
        suffixBrick={suffixBrick}
        titleBrick={titleBrick}
        oHeight={"500px"}
        total={50}
      />
    );
    wrapper.setProps({ data });
    wrapper.find(VirtualList).invoke("onScroll")({
      currentTarget: {
        scrollHeight: 100,
        scrollTop: 100,
      },
    } as any);
    expect(wrapper.find(VirtualList).length).toBe(1);
  });
});
