import React from "react";
import { shallow } from "enzyme";
import { DesktopItem, DesktopItemCustom } from "@next-core/brick-types";
import * as service from "../LaunchpadService";
const mockOnDelete = jest.fn();
const mockSetAsFavorite = jest.fn();
import { launchpadService } from "../LaunchpadService";
import { DesktopApp } from "../DesktopApp/DesktopApp";
import { FavoriteDesktopCell } from "./FavoriteDesktopCell";
import { GeneralIcon, Link } from "@next-libs/basic-components";
import { CloseCircleFilled } from "@ant-design/icons";

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
const spyOnWindowOpen = jest.spyOn(window, "open");
const stopPropagation = jest.fn();
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

    wrapper.find(CloseCircleFilled).invoke("onClick")({
      stopPropagation,
      preventDefault,
    } as any);
    expect(mockOnDelete).toHaveBeenCalledWith(item);
    expect(stopPropagation).toHaveBeenCalled();

    wrapper.find(Link).invoke("onClick")({
      stopPropagation,
      preventDefault,
    } as any);
    expect(wrapper.find(Link).prop("to")).toBe("/home");
    expect(stopPropagation).toHaveBeenCalledTimes(1);

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
      stopPropagation,
      preventDefault,
    } as any);
    expect(wrapper.find(Link).prop("to")).toBe("http://www.baidu.com");
    expect(stopPropagation).toHaveBeenCalledTimes(1);
    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(spyOnWindowOpen).toHaveBeenCalledWith(
      "http://www.baidu.com",
      "_blank"
    );
  });
});
