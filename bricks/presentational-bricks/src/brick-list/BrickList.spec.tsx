import React from "react";
import { mount, shallow } from "enzyme";
import { BrickList } from "./BrickList";

describe("BrickList", () => {
  const configProps = {
    bordered: true
  };
  const itemList = [
    {
      content: "Australian walks 100km after outback crash."
    },
    {
      content: "Man charged over missing wedding girl.",
      meta: {
        src: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        title: "item title",
        description: "item description"
      }
    }
  ];
  it("should work", () => {
    const wrapper = mount(<BrickList configProps={configProps} />);
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({
      itemList,
      isCardList: false
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("should render custom element", async () => {
    const dataSource = [
      {
        text: "test"
      },
      {
        text: "good good study"
      },
      {
        text: "day day up"
      }
    ];
    const itemBrick = {
      brick: "input"
    };
    const wrapper = mount(
      <BrickList
        itemList={dataSource}
        itemBrick={itemBrick}
        isCardList={true}
      />
    );

    await (global as any).flushPromises();

    const instance = wrapper
      .find("input")
      .at(0)
      .instance();

    expect(instance.dataSource).toEqual({
      text: "test"
    });
  });
});
