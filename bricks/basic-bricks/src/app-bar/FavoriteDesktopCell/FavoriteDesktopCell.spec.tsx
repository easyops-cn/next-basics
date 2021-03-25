import React from "react";
import { shallow } from "enzyme";
const mockOnDelete = jest.fn();
import { FavoriteDesktopCell } from "./FavoriteDesktopCell";
import { GeneralIcon, Link } from "@next-libs/basic-components";

jest.mock("../LaunchpadService", () => {
  return {
    launchpadService: {
      pushVisitor: jest.fn(),
      setAsFavorite: jest.fn(),
      isFavorite: () => false,
      setFavoriteAsVisitor: jest.fn(),
    },
  };
});
const spyOnWindowOpen = (window.open = jest.fn());
const preventDefault = jest.fn();

describe("FavoriteDesktopCell", () => {
  it("should work", () => {
    const item = {
      microAppId: "hello",
      launchpadCollection: {
        type: "microApp",
        instanceId: "hello",
        name: "world",
        link: "/home",
        icon: {
          category: "app",
          icon: "default-app",
          lib: "easyops",
          prefix: "",
          theme: "",
          type: "",
        },
      } as any,
    };
    const wrapper = shallow(
      <FavoriteDesktopCell item={item} onDelete={mockOnDelete} />
    );
    expect(wrapper.find(GeneralIcon).prop("icon")).toEqual(
      item.launchpadCollection.icon
    );
    expect(wrapper.find(".name").text()).toBe("world");

    wrapper.find(Link).invoke("onClick")({
      preventDefault,
    } as any);
    expect(wrapper.find(Link).prop("to")).toBe("/home");

    wrapper.setProps({
      item: {
        customItemId: "custom1",
        launchpadCollection: {
          type: "customItem",
          instanceId: "hello",
          name: "custom item 1",
          link: "http://www.baidu.com",
          icon: {
            category: "app",
            icon: "default-app",
            lib: "easyops",
            prefix: "",
            theme: "",
            type: "",
          },
        } as any,
      },
    });

    wrapper.update();

    wrapper.find(Link).invoke("onClick")({
      preventDefault,
    } as any);
    expect(wrapper.find(Link).prop("to")).toBe("http://www.baidu.com");
    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(spyOnWindowOpen).toHaveBeenCalledWith(
      "http://www.baidu.com",
      "_blank"
    );
  });
});
