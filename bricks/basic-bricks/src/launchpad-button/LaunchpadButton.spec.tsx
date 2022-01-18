import React from "react";
import { shallow } from "enzyme";
import { LaunchpadButton } from "./LaunchpadButton";
import { getRuntime, getHistory } from "@next-core/brick-kit";
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

jest.mock("../app-bar/LaunchpadService", () => {
  return {
    launchpadService: {
      fetchFavoriteList: () => [],
    },
  };
});

describe("LaunchpadButton", () => {
  it("should work", () => {
    const wrapper = shallow(<LaunchpadButton />);
    expect(wrapper.html()).toBe(
      '<a role="button" class="launchpadLink"><svgr-mock className="launchpadIcon" width="16" height="16"></svgr-mock></a>'
    );
  });
});
