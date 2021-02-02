import React from "react";
import { mount, shallow } from "enzyme";
import { GeneralCarousel } from "./GeneralCarousel";

describe("GeneralCarousel", () => {
  const clickHandler = jest.fn();
  it("should work if component is falsy", () => {
    const useBrick = {
      brick: "div",
    };
    const dataSource = [
      { textContent: "第一组轮播" },
      { textContent: "第二组轮播" },
    ];
    const wrapper = shallow(
      <GeneralCarousel
        dotsTheme="dark"
        useBrick={useBrick}
        components={undefined}
        dataSource={dataSource}
        autoplay={true}
        onHandleClick={clickHandler}
      />
    );
    expect(wrapper).toBeTruthy();
  });
  it("should work if useBrick is falsy", () => {
    const components = {
      brick: "div",
      properties: {
        textContent: "第一组轮播",
      },
    };

    const wrapper = shallow(
      <GeneralCarousel
        dotsTheme="dark"
        useBrick={undefined}
        components={components}
        dataSource={undefined}
        autoplay={true}
        onHandleClick={clickHandler}
      />
    );
    expect(wrapper).toBeTruthy();
  });

  it("should render multiple element", () => {
    const components = [
      {
        brick: "div",
        properties: {
          textContent: "第一组轮播",
        },
      },
      {
        brick: "div",
        properties: {
          textContent: "第二组轮播",
        },
      },
      {
        brick: "div",
        properties: {
          textContent: "第三组轮播",
        },
        events: {
          click: {
            action: "console.log",
          },
        },
      },
    ];

    const wrapper = mount(
      <GeneralCarousel
        onHandleClick={clickHandler}
        components={components}
        useBrick={undefined}
        dataSource={undefined}
        dots={true}
        slidesToShow={1}
        slidesToScroll={1}
      />
    );
    expect(wrapper.find(".slick-dots li").length).toEqual(3);
  });

  it("should change the value", () => {
    const components = [
      {
        brick: "div",
        properties: {
          textContent: "第一组轮播",
        },
      },
      {
        brick: "div",
        properties: {
          textContent: "第二组轮播",
        },
      },
      {
        brick: "div",
        properties: {
          textContent: "第三组轮播",
        },
        events: {
          click: {
            action: "console.log",
          },
        },
      },
    ];

    const wrapper = mount(
      <GeneralCarousel
        onHandleClick={clickHandler}
        components={components}
        useBrick={undefined}
        dataSource={undefined}
        dots={true}
        slidesToShow={1}
        slidesToScroll={1}
      />
    );

    wrapper.find(".customContainer").at(0).invoke("onClick")();

    expect(clickHandler).toHaveBeenCalledWith(0);
  });
});
