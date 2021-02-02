import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { getRuntime, getHistory } from "@next-core/brick-kit";
import { LaunchpadButton } from "./LaunchpadButton";
import {
  LaunchpadPortal,
  LaunchpadPortalProps,
} from "../LaunchpadPortal/LaunchpadPortal";

jest.mock("@next-core/brick-kit");

type ListenerFn = () => void;

const listeners = new Set<ListenerFn>();
const spyOnHistoryUnListen = jest.fn();
const spyOnHistoryListen = jest.fn((listener: ListenerFn): (() => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    spyOnHistoryUnListen();
  };
});
(getHistory as jest.Mock).mockReturnValue({
  listen: spyOnHistoryListen,
});

const spyOnToggleLaunchpadEffect = jest.fn();
const spyOnIsMenuBarCollapsed = jest.fn();
const spyOnIsMenuBarSoftExpanded = jest.fn();
(getRuntime as jest.Mock).mockReturnValue({
  menuBar: {
    isCollapsed: spyOnIsMenuBarCollapsed,
    isSoftExpanded: spyOnIsMenuBarSoftExpanded,
  },
  toggleLaunchpadEffect: spyOnToggleLaunchpadEffect,
});
jest.mock("../LaunchpadService", () => {
  return {
    launchpadService: {
      fetchFavoriteList: () => [],
    },
  };
});

describe("LaunchpadButton", () => {
  let wrapper: ShallowWrapper;
  const getPortal = (): ShallowWrapper<LaunchpadPortalProps> =>
    wrapper.find(LaunchpadPortal);

  beforeEach(() => {
    wrapper = shallow(<LaunchpadButton />);
  });

  afterEach(() => {
    spyOnToggleLaunchpadEffect.mockClear();
  });

  it("should work", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should open launchpad", async () => {
    //await (global as any).flushPromises();
    expect(getPortal().prop("visible")).toBe(false);
    wrapper.find("a").simulate("click");
    await (global as any).flushPromises();
    expect(getPortal().prop("visible")).toBe(true);
  });

  it("should toggle filter of blur to false", () => {
    getPortal().invoke("onWillClose")();
    expect(spyOnToggleLaunchpadEffect).toBeCalledWith(false);
  });

  it("should set visible to false", () => {
    getPortal().invoke("onClose")();
    expect(getPortal().prop("visible")).toBe(false);
  });
});
