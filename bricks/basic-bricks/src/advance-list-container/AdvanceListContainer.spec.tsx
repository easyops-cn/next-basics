import React from "react";
import { mount } from "enzyme";
import { AdvanceListContainer } from "./AdvanceListContainer";
import style from "./style.module.css";

const data = {
  list: [
    {
      a: "部署主机",
      value: 2
    },
    {
      a: "上游应用",
      value: 80
    },
    {
      a: "下游游应用",
      value: 90
    }
  ]
};
const titleBrick = {
  useBrick: {
    brick: "div",
    transform: {
      textContent: "@{a}"
    }
  }
};

const suffixBrick = {
  useBrick: {
    brick: "div",
    transform: {
      textContent: "@{value}"
    }
  }
};

describe("AdvanceListContainer", () => {
  it("should work", () => {
    const wrapper = mount(
      <AdvanceListContainer
        data={[]}
        suffixBrick={suffixBrick}
        titleBrick={titleBrick}
        itemClick={jest.fn()}
        selectable={true}
      />
    );
    wrapper.setProps({ data });
    const item = wrapper.find(`.${style.itemContainer}`).first();
    item.simulate("click");
    expect(wrapper.props().itemClick).toHaveBeenCalled();
    expect(wrapper.find(`.${style.itemContainer}`).length).toBe(3);
  });
});
