import React from "react";
import { shallow } from "enzyme";
import { DesktopCell } from "./DesktopCell";
import { DesktopItem, DesktopItemCustom } from "@next-core/brick-types";
import { DesktopCustom } from "../DesktopCustom/DesktopCustom";
import { launchpadService } from "../LaunchpadService";
import { DesktopApp } from "../DesktopApp/DesktopApp";

jest.mock("../LaunchpadService", () => {
  return {
    launchpadService: {
      pushVisitor: jest.fn(),
      setAsFavorite: jest.fn(),
      isFavorite: () => false,
      getFavoritesLength: () => 16,
    },
  };
});
describe("DesktopCell", () => {
  it("should work with app", () => {
    const item: DesktopItem = {
      type: "app",
      id: "hello",
      app: {
        id: "hello",
        name: "world",
      } as any,
    };
    const wrapper = shallow(<DesktopCell item={item} />);
    expect(wrapper.find("DesktopApp").prop("app")).toEqual({
      id: "hello",
      name: "world",
    });
    expect(wrapper.find(".cellItem").hasClass("active")).toBe(false);

    wrapper.find(DesktopApp).invoke("onClick")();
    wrapper.find(DesktopApp).invoke("onAddClick")();
    expect(launchpadService.pushVisitor).toHaveBeenCalledWith("app", item.app);
    expect(launchpadService.setAsFavorite).toHaveBeenCalledWith({
      microAppId: item.id,
      launchpadCollection: {
        type: "microApp",
        name: item.app.name,
      },
    });
  });

  it("should render a dir", () => {
    const item: DesktopItem = {
      type: "dir",
      id: "hello",
      name: "world",
      items: [
        {
          type: "app",
          id: "nihao",
          app: {
            id: "nihao",
            name: "shijie",
          } as any,
        },
      ],
    };
    const wrapper = shallow(<DesktopCell item={item} active={true} />);
    expect(wrapper.find("DesktopDir").props()).toMatchObject({
      name: item.name,
      items: item.items,
    });
    expect(wrapper.find(".cellItem").hasClass("active")).toBe(true);
  });

  it("should work with custom item", () => {
    const item: DesktopItemCustom = {
      type: "custom",
      id: "hello",
      name: "world",
      url: "/hello",
    };
    const wrapper = shallow(
      <DesktopCell item={item} showAddIcon={true} position={"left"} />
    );
    expect(wrapper.find("DesktopCustom").props()).toMatchObject({
      name: "world",
      url: "/hello",
    });
    expect(wrapper.find(".cellItem").hasClass("active")).toBe(false);

    wrapper.find(DesktopCustom).invoke("onClick")();
    wrapper.find(DesktopCustom).invoke("onAddClick")();
    expect(launchpadService.pushVisitor).toHaveBeenCalledWith("custom", item);
    expect(launchpadService.setAsFavorite).toHaveBeenCalledWith({
      customItemId: "hello",
      launchpadCollection: {
        name: "world",
        type: "customItem",
      },
    });
  });
});
